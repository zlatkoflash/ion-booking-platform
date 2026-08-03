"use client";

import ButtonDefault from "@/components/buttons/ButtonDefault";
import { getApiData } from "@/utils/api";

export default function BtnBookingEdit() {
  return <>
    <BtnUpdateParticipants />
    <ButtonAddPayment />
    <ButtonUpdateTheDateForTheBooking />
  </>
}

function BtnUpdateParticipants() {
  const bookingId = 97665817;
  const bookingActivityId = 138308695;

  const action = async () => {
    const result = await getApiData(`/administrator/test-change-participants`, "POST", {
      // bookingId: bookingId,
      bookingId: bookingId,
      bookingActivityId: bookingActivityId,
      participantsToBeRemoved: [
        { pricingCategoryBookingId: 354425801 },
        { pricingCategoryBookingId: 354425802 },
      ],
      participantsToBeAdded: [
        { pricingCategoryBooking: { pricingCategoryId: 753166 } },
        { pricingCategoryBooking: { pricingCategoryId: 753166 } },
        { pricingCategoryBooking: { pricingCategoryId: 753166 } },
        { pricingCategoryBooking: { pricingCategoryId: 753166 } },
        { pricingCategoryBooking: { pricingCategoryId: 753166 } },
        { pricingCategoryBooking: { pricingCategoryId: 753166 } },
        { pricingCategoryBooking: { pricingCategoryId: 753166 } },
        { pricingCategoryBooking: { pricingCategoryId: 753167 } },
        { pricingCategoryBooking: { pricingCategoryId: 753167 } },
      ],
    }, "authorize", "application/json");
    console.log("result: ", result);
  }
  return <>
    <ButtonDefault label={`Update Participants ${bookingId} booking acitivity id:${bookingActivityId}`} onClick={() => {
      action();
    }} />
  </>
}


function ButtonAddPayment() {

  const bookingId = 97733951;

  const action = async () => {
    const result = await getApiData(`/administrator/test-edit-booking-add-payment`, "POST", {
      bookingId: bookingId,
    }, "authorize", "application/json");
    console.log("result: ", result);
  }

  return <ButtonDefault label={`Add Payment ${bookingId}`} onClick={() => {
    action();
  }} />
}


function ButtonUpdateTheDateForTheBooking() {
  const bookingId = 98123140;

  const action = async () => {
    const result = await getApiData(`/administrator/test-edit-booking-update-the-date`, "POST", {
      bookingId: bookingId,
    }, "authorize", "application/json");
    console.log("result: ", result);
  }

  return <ButtonDefault label={`Update the date for ${bookingId}`} onClick={() => {
    action();
  }} />

}