"use client";

import ButtonDefault from "@/components/buttons/ButtonDefault";
import { getApiData } from "@/utils/api";

export default function BtnActionsQuestion() {
  return <>
    <BtnGetBookingQuestion />
    <BtnUpdateBookingQuestions />
  </>
}

function BtnGetBookingQuestion() {
  const action = async () => {
    const result = await getApiData(`/administrator/test-get-booking-questions`, "POST", {
      bookingId: "97661188"
    }, "authorize", "application/json");
    console.log("result: ", result);
  }
  return <>
    <ButtonDefault label={`Get Booking Questions ${97661188}`} onClick={() => {
      action();
    }} />
  </>
}

function BtnUpdateBookingQuestions() {

  const bookingId = 97663683;

  const action = async () => {
    const result = await getApiData(`/administrator/test-update-booking-questions`, "POST", {
      bookingId: bookingId,
      payload: {
        // working
        mainContactDetails: [
          { questionId: "firstName", values: ["Zlatko333"] },
          /*{ questionId: "lastName", values: ["Derkoski"] },
          { questionId: "email", values: ["test@gmail.com"] },
          // phone number must be valid:
          { questionId: "phoneNumber", values: ["+38970667667"] },
          { questionId: "address", values: ["Test Address"] },
          { questionId: "city", values: ["Test City"] },
          { questionId: "country", values: ["MKD"] },
          { questionId: "nationality", values: ["MKD"] },*/
        ],
        // not working
        /*activityBookings: [
          {
            bookingId: 138306007,
            activityId: 914000,
            rateId: 1762438,
            startTimeId: 3218822,
            date: "2026-07-31",
            note: "Booking from WIT-3.0 web application 777",
            passengers: [
              {
                groupSize: 3,
                quantity: 3,
                pricingCategoryId: 753166,
                passengerDetails: [],
                answers: []
              },
              {
                groupSize: 3,
                quantity: 3,
                pricingCategoryId: 753166,
                passengerDetails: [],
                answers: []
              },
              {
                groupSize: 3,
                quantity: 3,
                pricingCategoryId: 753166,
                passengerDetails: [],
                answers: []
              },
              {
                groupSize: 3,
                quantity: 3,
                pricingCategoryId: 753166,
                passengerDetails: [],
                answers: []
              },
              {
                groupSize: 3,
                quantity: 3,
                pricingCategoryId: 753166,
                passengerDetails: [],
                answers: []
              },
              {
                groupSize: 3,
                quantity: 3,
                pricingCategoryId: 753166,
                passengerDetails: [],
                answers: []
              }],

            answers: [],
            pickupAnswers: [],
            dropoffAnswers: []

          }
        ]*/
      }
    }, "authorize", "application/json");
    console.log("result: ", result);
  }
  return <>
    <ButtonDefault label={`Answer Booking Questions ${bookingId}`} onClick={() => {
      action();
    }} />
  </>
}