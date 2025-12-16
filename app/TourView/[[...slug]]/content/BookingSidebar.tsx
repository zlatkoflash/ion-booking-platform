'use client'


import AvailabilityCalendar from "@/components/AvailabilityCalendar/AvailabilityCalendar";
import { useBookingSidebar } from './BookingSidebarProvider';
import BookingCardForm from './utils/BookingCard';

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

  /*const showContactForm = false;

  const contactDetails: IContactDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  };
  const contactErrors: Partial<IContactDetails> = {};

  const quantities: Record<number, number> = {};*/
  // Pricing category mapping (you can expand this based on your needs)


  /*let selectedSlot: Partial<IBokunSlot & { isSet: boolean }> = {
    isSet: false
  };*/
  console.log("Check when selectedSlot have data how the html react");


  return (
    <div className="lg:col-span-1 space-y-8">
      {/* Availability Calendar */}
      <AvailabilityCalendar
        activityId={dataForExperience.experience?.id as string}
      /*onSlotSelect={(availability) => {
        console.log("last selected slot(availablility):", availability);
        setSelectedAvailability(availability)
      }}*/
      // onSlotSelect={(slot) => {}} // it is server component
      // onSlotSelect={() => {
      // console.log("This will be handleSlotSelect function, see in the old code.");
      // }}
      />

      <BookingCardForm />

    </div>
  )
}