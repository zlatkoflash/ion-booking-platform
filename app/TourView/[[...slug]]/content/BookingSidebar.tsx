'use client'


import AvailabilityCalendar from "@/components/AvailabilityCalendar/AvailabilityCalendar";
import { useBookingSidebar } from './BookingSidebarProvider';
import BookingCardForm from './utils/BookingCard';
import { useEffect, useState } from "react";

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
    dataForExperience,
    // selectedSlot,
    // setSelectedSlot,
    selectedAvailability,
    setSelectedAvailability
  } = useBookingSidebar();

  const [isReady, setIsReady] = useState(false);


  console.log("Check when selectedSlot have data how the html react");

  useEffect(() => {
    if (selectedAvailability) {
      setIsReady(true);
    }
  }, []);


  if (!isReady) {
    return null;
  }

  return (
    <div className="lg:col-span-1 space-y-8">
      {/* Availability Calendar */}
      <AvailabilityCalendar
        activityId={dataForExperience.experience?.id as string}

      />

      <BookingCardForm />

    </div>
  )
}