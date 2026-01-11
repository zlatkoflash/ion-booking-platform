"use client";

import {
  // ArrowLeft, MapPin, 
  Calendar,
  // Users, Star, Clock, 
  Shield, Wifi,
  // Camera, 
  AlertCircle,
  User, Mail, Phone
} from 'lucide-react';

import { redirect } from 'next/navigation';


import { IContactDetails } from '@/app/interface/interface';
import { IBokunGetExperienceById } from '@/utils/bokun';
import { useBookingSidebar } from '../BookingSidebarProvider';
import BookingParticipants from './BookingParticipants';
import { normalizeDateToYYYYMMDD } from '@/utils/dateUtils';
import { useBookingEditor } from '../../BookingEditorProvider';
import { useEffect, useState } from 'react';
import { UpdateBooking } from '@/utils/bokunAdminClient';
import { useBookingSingleItem } from '@/app/User/ManageMyBooking/ViewBooking/[slug]/BookingProvider';
import BookingCancelButton from './BookingCancelButton';
import BookingEditorPriceDifference from './BookingEditorPriceDifference';
import ChangePaymentMethod from './AdminChangePaymentMethod';
import AdminChangePaymentMethodWrap from './AdminChangePaymentMethodWrap';

export default function BookingCardForm() {

  const { clientType, bokunBookingForediting, bookingDBNet, isModalSuccessOpen, setIsModalSuccessOpen, iCanCancel } = useBookingEditor();

  // const { setIsModalSuccessOpen } = useBookingSingleItem();

  const {
    selectedAvailability,
    selectedDate,
    selectedRate,
    selectedRate_countParticipants,
    selectedRate_totalSum,
    bookedTotalSum,
    experience,
    priceEngine,

  } = useBookingSidebar();

  console.log("selectedAvailability:", selectedAvailability);
  const [updatingBooking, setUpdatingBooking] = useState(false);
  const [statusErrorUpdatingDateTimeBookingMessage, set_statusErrorUpdatingDateTimeBookingMessage] = useState('');
  const [statusSuccessUpdatingDateTimeBookingMessage, set_statusSuccessUpdatingDateTimeBookingMessage] = useState('');



  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    if (selectedAvailability) {
      setIsReady(true);
    }
  }, []);



  if (!isReady) {
    return null;
  }

  const ___UpdateTheBooking = async () => {
    // console.log("priceEngine:", priceEngine); return;

    set_statusSuccessUpdatingDateTimeBookingMessage('');
    set_statusErrorUpdatingDateTimeBookingMessage('');

    const participantsToBeAdded: { pricingCategoryId: number }[] = [];
    for (const priceEngCounts of priceEngine.counts) {
      for (let ic = 0; ic < priceEngCounts.count; ic++) {
        participantsToBeAdded.push({
          pricingCategoryId: priceEngCounts.priceCategoryId
        });
      }
    }
    setUpdatingBooking(true);
    console.log("selectedAvailability:", selectedAvailability);
    console.log("!!!2PRICE MUST BE GENRATED BY THE BOKUN API NOT SEND FROM HERE2!!!");
    const payload = {
      dbBookingId: bookingDBNet?.booking_id as string,
      paymentTotal: Math.round(selectedRate_totalSum() * 100), // we parce in cents
      dateTimeChange: {
        // date: normalizeDateToYYYYMMDD(selectedAvailability.date),
        date: selectedDate as string,
        activityBookingId: bokunBookingForediting?.activityBookings[0].bookingId as number,
        startTimeId: selectedAvailability.startTimeId,
      },
      participantsToBeRemoved: bokunBookingForediting?.activityBookings[0].pricingCategoryBookings as { id: number }[],
      participantsToBeAdded: participantsToBeAdded
    };
    console.log("payload for updating the booking:", payload);
    const resultsAfterUpdating = await UpdateBooking(payload);
    console.log("resultsAfterUpdating:", resultsAfterUpdating);
    if (resultsAfterUpdating.stripeCustomerNotFound === true) {
      set_statusErrorUpdatingDateTimeBookingMessage("Stripe customer not found!");
    }
    else if (resultsAfterUpdating.refundingError === true) {
      set_statusErrorUpdatingDateTimeBookingMessage("Refunding error!");
    }
    else if (resultsAfterUpdating.paymentAdditionalError === true) {
      set_statusErrorUpdatingDateTimeBookingMessage("Payment additional error!");
    }
    else if (resultsAfterUpdating.updatingDateTime.status === "FINISHED") {
      set_statusSuccessUpdatingDateTimeBookingMessage("Booking Date/Time updated successfully");
      if (setIsModalSuccessOpen) {
        setIsModalSuccessOpen(true);
      }
    }
    else {
      set_statusErrorUpdatingDateTimeBookingMessage("Booking Date/Time update failed!");
    }
    setUpdatingBooking(false);
  }


  return <div className="bg-white rounded-2xl p-8 shadow-lg sticky top-8">


    {
      // selectedSlot.isSet ? 
      // selectedSlot ?
      selectedAvailability ?
        (
          <div className="space-y-6">


            {/* Participant Selector */}
            {
              //selectedRateId && selectedAvailability.rates?.find(r => r.id === selectedRateId)?.pricingCategoryIds 
              // selectedAvailability.
              selectedAvailability.rates !== undefined
              && (
                <BookingParticipants />

              )}

            <div className={`${clientType === "booking" ? "border-t pt-6" : "pt-4"
              } `}>
              {
                clientType === "booking" && (<div className="flex justify-between text-lg font-semibold text-gray-800 mb-2">
                  <span>Total ({
                    // getTotalParticipants()
                    selectedRate_countParticipants()
                  } participants)</span>
                  <span>€{
                    selectedRate_totalSum().toFixed(2)
                    // computeTotal().toFixed(2)
                  }</span>
                </div>)
              }

              {
                clientType === "booking-editor" && (
                  <>
                    {
                      // <hr className="my-2" />
                    }
                    <div className="flex justify-between text-lg font-semibold text-gray-800 mb-2">
                      <span>Last Booked ({
                        // getTotalParticipants()
                        // selectedRate_countParticipants()
                        bokunBookingForediting?.activityBookings[0].pricingCategoryBookings.length
                      } participants)</span>
                      <span>€{
                        bookedTotalSum().toFixed(2)
                        // computeTotal().toFixed(2)
                      }</span>
                    </div>

                    {
                      /*
                      <hr className="my-2" />
                      <div className="flex justify-between text-lg font-semibold text-gray-800 mb-4">
                      <span>Difference</span>
                      <span>€{
                        (selectedRate_totalSum() - bookedTotalSum()).toFixed(2)
                        // computeTotal().toFixed(2)
                      }</span>
                    </div>*/
                    }
                    <BookingEditorPriceDifference />
                    <div className="my-2 mb-6" />
                  </>
                )
              }

              {
                clientType === "booking-editor" && bookingDBNet?.booking_status !== "CANCELLED" && (
                  <>

                    {
                      // <ChangePaymentMethod bookingId={bookingDBNet?.booking_id as string} />
                    }
                    <AdminChangePaymentMethodWrap bookingId={bookingDBNet?.booking_id as string} />

                    <button
                      type='button'
                      disabled={
                        updatingBooking
                        ||
                        selectedRate_countParticipants() === 0
                      }
                      onClick={() => {
                        console.log('Update the booking event');
                        ___UpdateTheBooking();
                      }}
                      className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-full transition-colors cursor-pointer disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-default disabled:pointer-events-none disabled:opacity-50">
                      {
                        updatingBooking ?
                          'Updating...'
                          :
                          'Update The Booking'
                      }
                    </button>
                    {
                      statusErrorUpdatingDateTimeBookingMessage !== "" && (
                        <p className="text-sm text-gray-500 mt-2 text-center text-red-500">
                          {statusErrorUpdatingDateTimeBookingMessage}
                        </p>
                      )
                    }
                    {
                      statusSuccessUpdatingDateTimeBookingMessage !== "" && (
                        <p className="text-sm text-gray-500 mt-2 text-center text-green-500">
                          {statusSuccessUpdatingDateTimeBookingMessage}
                        </p>
                      )
                    }
                  </>
                )
              }
              {
                clientType !== "booking-editor" && (
                  <button
                    // onClick={() => {
                    // console.log("handleBookNow event");
                    // }}
                    onClick={() => {

                      /**
                       * filteredCounts are the engine counts with category for [selectedAvailability, selectedRate]
                      */
                      const filteredCounts = priceEngine.counts.filter(count => {
                        return count.availabilityId === selectedAvailability.id
                          &&
                          count.rateId === selectedRate.id
                      });
                      // console.log("filteredCounts:", filteredCounts, priceEngine); return;


                      const detailsForCheckout = {
                        rate: selectedRate.id.toString(),
                        // a: selectedAvailability.activityId.toString(),
                        // availability: selectedAvailability.id.toString(),
                        // selectedAvailability.activityId is actually experience.id 
                        activity: selectedAvailability.activityId.toString(),
                        availability: selectedAvailability.id,
                        experience: experience.id,
                        participants: selectedRate_countParticipants().toString(),
                        // total must match with the server calculated sum, if it don't match it should produce error
                        total: selectedRate_totalSum().toString(),
                        counts: JSON.stringify(filteredCounts),
                        date: normalizeDateToYYYYMMDD(selectedAvailability.date),
                        startTimeId: selectedAvailability.startTimeId.toString(),
                        startTimeString: selectedAvailability.startTime,
                        dateLocalString: selectedAvailability.localizedDate
                      };
                      // console.log("detailsForCheckout:", detailsForCheckout); return;
                      const paramsForCheckout = new URLSearchParams(detailsForCheckout);
                      redirect(`/Checkout?${paramsForCheckout.toString()}`)
                    }}
                    disabled={
                      // processingPayment
                      // || getTotalParticipants() === 0
                      // || 
                      selectedRate_countParticipants() === 0
                    }
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:transform-none disabled:cursor-not-allowed mb-3 cursor-pointer"
                  >
                    {updatingBooking ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processing...
                      </div>
                    ) :
                      // getTotalParticipants() === 0 
                      selectedRate_countParticipants() === 0
                        ? (
                          'Select Participants'
                        ) : (
                          'Book Now'
                        )}
                  </button>
                )
              }

              {
                clientType !== "booking-editor" && (
                  <button
                    type='button'
                    onClick={() => {
                      console.log('Add to watch list event');
                    }}
                    className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-full transition-colors cursor-pointer">
                    Add to Wishlist
                  </button>
                )
              }

              {
                clientType === "booking-editor" && iCanCancel && (
                  <BookingCancelButton />
                )
              }


            </div>

            <div className="text-center text-sm text-gray-500">
              <div className="flex items-center justify-center mb-2">
                <Shield className="w-4 h-4 mr-2" />
                Free cancellation up to 24 hours
              </div>
              <div className="flex items-center justify-center">
                <Wifi className="w-4 h-4 mr-2" />
                Instant confirmation
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">Select a date and time</p>
            <p className="text-sm text-gray-400">Choose from available slots above</p>
          </div>
        )}
  </div>;
}