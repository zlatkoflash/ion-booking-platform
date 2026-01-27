import AdminChangePaymentMethodWrap from "./AdminChangePaymentMethodWrap";
import { useSelector } from "react-redux";
import { RootState } from "@/libs/store";
import { useState } from "react";
import { BookingCalendarActions, differenceWhenEditingBooking, selectedRate_countParticipants, selectedRate_totalSum } from "@/libs/features/BookingCalendar/bookingCalendarSlice";
import { UpdateBooking } from "@/utils/bokunAdminClient";
import { useDispatch } from "react-redux";
import { getTimeDifference } from "@/utils/dateUtils";

export default function AdminUpdateBooking() {

  const dispatch = useDispatch();

  const bookingCalendarState = useSelector((state: RootState) => state.bookingCalendar);
  const priceEngine = bookingCalendarState.priceEngine;
  const bookingDBNet = bookingCalendarState.editor.bookingDBNet;
  const selectedAvailability = bookingCalendarState.selectedAvailability;
  const selectedRate = bookingCalendarState.selectedRate;
  const selectedDate = bookingCalendarState.selectedDate;
  const bokunBookingForediting = bookingCalendarState.editor.bokunBookingForediting;
  // const updatingBooking = bookingCalendarState.editor.updatingBooking;
  // const statusErrorUpdatingDateTimeBookingMessage = bookingCalendarState.editor.statusErrorUpdatingDateTimeBookingMessage;
  // const statusSuccessUpdatingDateTimeBookingMessage = bookingCalendarState.editor.statusSuccessUpdatingDateTimeBookingMessage;

  const [updatingBooking, setUpdatingBooking] = useState(false);

  const [statusErrorUpdatingDateTimeBookingMessage, set_statusErrorUpdatingDateTimeBookingMessage] = useState('');
  const [statusSuccessUpdatingDateTimeBookingMessage, set_statusSuccessUpdatingDateTimeBookingMessage] = useState('');


  const timeDifference = getTimeDifference(
    new Date().getTime(),
    bokunBookingForediting?.activityBookings[0].date as number,
  );

  const hoursRemaining = timeDifference.totalHours;
  const isEligible = hoursRemaining >= 24;
  // const isEligible = true; // debugging

  const difference = differenceWhenEditingBooking(bookingCalendarState);


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
      paymentTotal: Math.round(selectedRate_totalSum(bookingCalendarState) * 100), // we parce in cents
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
      /*if (setIsModalSuccessOpen) {
        setIsModalSuccessOpen(true);
      }*/
      dispatch(BookingCalendarActions.setIsModalSuccessOpen(true));
    }
    else {
      set_statusErrorUpdatingDateTimeBookingMessage("Booking Date/Time update failed!");
    }
    setUpdatingBooking(false);
  }

  if (!isEligible) {
    return <div className="max-w-md mx-auto overflow-hidden rounded-xl border border-amber-200 bg-amber-50 shadow-sm">
      <div className="flex p-5">
        {/* Warning Icon */}
        <div className="flex-shrink-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
            <svg
              className="h-6 w-6 text-amber-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="ml-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-amber-900">
            Modifications Locked
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-amber-800">
            This booking has entered the <span className="font-bold text-amber-900 underline decoration-amber-300">24-hour window</span> prior to the event.
          </p>
          <p className="mt-2 text-xs text-amber-700/80 italic">
            Per our policy, cancellations and time updates are no longer available for this slot.
          </p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-amber-100/50 px-5 py-3 text-center">
        <span className="text-xs font-semibold text-amber-900">
          Status: Finalized
        </span>
      </div>
    </div>;
  }

  return <>

    {
      // <ChangePaymentMethod bookingId={bookingDBNet?.booking_id as string} />
    }
    <AdminChangePaymentMethodWrap bookingId={bookingDBNet?.booking_id as string} />

    <button
      type='button'
      disabled={
        updatingBooking
        ||
        // selectedRate_countParticipants(bookingCalendarState) === 0
        difference === 0
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
}