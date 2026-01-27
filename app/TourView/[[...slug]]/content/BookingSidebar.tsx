'use client'


import AvailabilityCalendar from "@/components/AvailabilityCalendar/AvailabilityCalendar";
import { useBookingSidebar } from './BookingSidebarProvider';
import BookingCardForm from './utils/BookingCard';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/libs/store";
import { getTimeDifference } from "@/utils/dateUtils";

/*export interface IBookingSidebar {
  // showContactForm: boolean;,
  dataForExperience: IBokunGetExperienceById
}*/

/**
 * 
 * @param data 
 * @returns 
 * This is the widget for booking a tour
 */
export default function BookingSidebar() {

  const {
    // dataForExperience,
    // selectedSlot,
    // setSelectedSlot,
    // selectedAvailability,
    // setSelectedAvailability
  } = useBookingSidebar();


  const bookingCalendarState = useSelector((state: RootState) => state.bookingCalendar);
  const selectedAvailability = bookingCalendarState.selectedAvailability;
  const dataForExperience = bookingCalendarState.dataForExperience;
  const clientType = bookingCalendarState.editor.clientType;
  const bookingForEditing = bookingCalendarState.editor.bokunBookingForediting;
  const bookingDBNet = bookingCalendarState.editor.bookingDBNet;

  /**
   * When is administrator we need to check the time difference between the booking date and the current date
   */
  let differenceHourseForEditingMode = 0;
  let isEligibleForEditingMode = false;
  if (clientType === "booking-editor") {
    const timeDifference = getTimeDifference(
      new Date().getTime(),
      bookingForEditing?.activityBookings[0].date as number,
    );
    differenceHourseForEditingMode = timeDifference.totalHours;
    isEligibleForEditingMode = timeDifference.totalHours >= 24 && bookingDBNet?.booking_status === "CONFIRMED";
  }


  const [isReady, setIsReady] = useState(false);


  console.log("Check when selectedSlot have data how the html react");

  useEffect(() => {
    if (selectedAvailability) {
      setIsReady(true);
    }
  }, []);


  if (!isReady || dataForExperience === null) {
    return null;
  }

  return (
    <div className="lg:col-span-1 space-y-8">
      {/* Availability Calendar */}
      {
        (clientType === "booking"
          || (
            clientType === "booking-editor"
            && isEligibleForEditingMode
          )

        ) &&
        <AvailabilityCalendar
          activityId={dataForExperience.experience?.id as string}

        />
      }


      <BookingCardForm />

    </div>
  )
}