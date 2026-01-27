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
import { getTimeDifference, normalizeDateToYYYYMMDD } from '@/utils/dateUtils';
import { useBookingEditor } from '../../BookingEditorProvider';
import { useEffect, useState } from 'react';
import { UpdateBooking } from '@/utils/bokunAdminClient';
import { useBookingSingleItem } from '@/app/User/ManageMyBooking/ViewBooking/[slug]/BookingProvider';
import BookingCancelButton from './BookingCancelButton';
import BookingEditorPriceDifference from './BookingEditorPriceDifference';
import ChangePaymentMethod from './AdminChangePaymentMethod';
import AdminChangePaymentMethodWrap from './AdminChangePaymentMethodWrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/libs/store';
import { bookedTotalSum, BookingCalendarActions, selectedRate_countParticipants, selectedRate_totalSum } from '@/libs/features/BookingCalendar/bookingCalendarSlice';
import CancelUpdateTimeStatus from './CancelUpdateTimeStatus';
import AdminUpdateBooking from './AdminUpdateBooking';

export default function BookingCardForm() {

  /*const { clientType, bokunBookingForediting, bookingDBNet, isModalSuccessOpen, setIsModalSuccessOpen, iCanCancel } = useBookingEditor();*/

  const bookingCalendarState = useSelector((state: RootState) => state.bookingCalendar);
  const clientType = bookingCalendarState.editor.clientType;
  const bokunBookingForediting = bookingCalendarState.editor.bokunBookingForediting;
  const bookingDBNet = bookingCalendarState.editor.bookingDBNet;
  const isModalSuccessOpen = bookingCalendarState.editor.isModalSuccessOpen;
  // const setIsModalSuccessOpen = useSelector((state: RootState) => state.bookingCalendar.editor.setIsModalSuccessOpen);
  const iCanCancel = bookingCalendarState.editor.iCanCancel;
  let isEligibleForEditingMode = false;
  let differenceHourseForEditingMode = 0;
  if (clientType === "booking-editor") {
    const timeDifference = getTimeDifference(
      new Date().getTime(),
      bokunBookingForediting?.activityBookings[0].date as number,
    );
    differenceHourseForEditingMode = timeDifference.totalHours;
    isEligibleForEditingMode = timeDifference.totalHours >= 24 && bookingDBNet?.booking_status === "CONFIRMED";
  }

  // const { setIsModalSuccessOpen } = useBookingSingleItem();

  /*const {
    // selectedAvailability,
    selectedDate,
    // selectedRate,
    selectedRate_countParticipants,
    selectedRate_totalSum,
    bookedTotalSum,
    experience,
    priceEngine,

  } = useBookingSidebar();*/
  const dispatch = useDispatch();
  // const bookingState = useSelector((state: RootState) => state.bookingCalendar);
  const selectedAvailability = bookingCalendarState.selectedAvailability;
  const selectedRate = bookingCalendarState.selectedRate;
  const priceEngine = bookingCalendarState.priceEngine;
  const selectedDate = bookingCalendarState.selectedDate;
  // const experience = useSelector((state: RootState) => state.bookingCalendar.);
  const dataForExperience = bookingCalendarState.dataForExperience;
  const experience = dataForExperience?.experience;

  console.log("selectedAvailability:", selectedAvailability);
  const [updatingBooking, setUpdatingBooking] = useState(false);




  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    if (selectedAvailability) {
      setIsReady(true);
    }
  }, []);



  if (!isReady) {
    return null;
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
              && (clientType === "booking" || (clientType === "booking-editor" && isEligibleForEditingMode))
              && (
                <BookingParticipants />

              )}

            <div className={`${clientType === "booking" ? "border-t pt-6" : "pt-4"
              } `}>
              {
                clientType === "booking" && (<div className="flex justify-between text-lg font-semibold text-gray-800 mb-2">
                  <span>Total ({
                    // getTotalParticipants()
                    selectedRate_countParticipants(bookingCalendarState)
                  } participants)</span>
                  <span>€{
                    selectedRate_totalSum(bookingCalendarState).toFixed(2)
                    // computeTotal().toFixed(2)
                  }</span>
                </div>)
              }

              {
                (clientType === "booking-editor" && isEligibleForEditingMode) && (
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
                        bookedTotalSum(bookingCalendarState).toFixed(2)
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
                    {
                      isEligibleForEditingMode && (
                        <BookingEditorPriceDifference />
                      )
                    }
                    <div className="my-2 mb-6" />
                  </>
                )
              }


              {
                clientType === "booking-editor" && bookingDBNet?.booking_status !== "CANCELLED" &&
                (
                  <AdminUpdateBooking />
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
                        experience: experience?.id as string,
                        participants: selectedRate_countParticipants(bookingCalendarState).toString(),
                        // total must match with the server calculated sum, if it don't match it should produce error
                        total: selectedRate_totalSum(bookingCalendarState).toString(),
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
                      selectedRate_countParticipants(bookingCalendarState) === 0
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
                      selectedRate_countParticipants(bookingCalendarState) === 0
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
                clientType === "booking-editor"
                // && isEligibleForEditingMode 

                && (
                  <BookingCancelButton />
                )
              }


            </div>

            {
              (clientType === "booking" || (clientType === "booking-editor" && isEligibleForEditingMode)) && (
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
              )
            }



            {
              clientType === "booking-editor" && (
                <CancelUpdateTimeStatus />
              )
            }

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