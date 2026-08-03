"use client";

import ButtonDefault from "@/components/buttons/ButtonDefault";
import { getApiData } from "@/utils/api";
import { IBokunCheckoutOptions } from "@/utils/interface-booking";

export default function BtnActionsCheckout() {



  return <>
    <BtnGetCheckoutOptions />
    <DoCheckoutSubmit />
    <DoCheckoutSubmitWithoutContactDetails />
    <BtnConfirmReservation />
  </>


}


function BtnGetCheckoutOptions() {
  const action = async () => {
    const result = await getApiData(`/administrator/test-get-checkout-options`, "POST", {
      sessionId: "Example"
    }, "authorize", "application/json");
    console.log("result: ", result);
  }
  return <>
    <ButtonDefault label="Get Checkout Options" onClick={() => {
      action();
    }} />
  </>
}

function DoCheckoutSubmit() {


  const details: IBokunCheckoutOptions = {
    checkoutOption: "CUSTOMER_FULL_PAYMENT",
    paymentMethod: "RESERVE_FOR_EXTERNAL_PAYMENT",
    source: "DIRECT_REQUEST",
    sendNotificationToMainContact: false,
    showPricesInNotification: false,
    note: "Testing booking creation",
    currency: "EUR",
    user: {
      id: "",
      email: "test@test.com",
      customer_email: "test@test.com",
      customer_name: "Zlatko Derkoski",
      customer_phone: "+373336933990822",
    },
    directBooking: {
      mainContactDetails: [
        { questionId: "firstName", values: ["Zlatko"] },
        { questionId: "lastName", values: ["Derkoski"] },
        { questionId: "email", values: ["test@gmail.com"] },
        // phone number must be valid:
        { questionId: "phoneNumber", values: ["+38970667667"] },
        { questionId: "address", values: ["Test Address"] },
        { questionId: "city", values: ["Test City"] },
        { questionId: "country", values: ["MKD"] },
        { questionId: "nationality", values: ["MKD"] },
      ],
      activityBookings: [
        {
          activityId: 914000,
          rateId: 1762438,
          startTimeId: 3218822,
          date: "2026-07-30",
          note: "Booking from WIT-3.0 web application",
          passengers: [
            {
              groupSize: 3, // not working
              quantity: 3, // not working
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
            }
          ],

          answers: [],
          pickupAnswers: [],
          dropoffAnswers: []
        }
      ]
    }
  }


  const action = async () => {

    console.log("details for testing:", details);

    const result = await getApiData(`/administrator/test-doCheckout`, "POST", {
      details: details
    }, "authorize", "application/json");
    console.log("result: ", result);
  }

  return <>
    <ButtonDefault label="Do Checkout Submit" onClick={() => {
      action();
    }} />
  </>
}



function BtnConfirmReservation() {

  const bookingId = "97688570";
  const confirmationCode = "WAL-97688570";

  const action = async () => {
    const result = await getApiData(`/administrator/test-confirm-reserved-with-checkout`, "POST", {
      bookingId: bookingId,
      confirmationCode: confirmationCode
    }, "authorize", "application/json");
    console.log("result: ", result);
  }

  return <>
    <ButtonDefault label="Confirm The Reservation" onClick={() => {
      action();
    }} />
  </>
}



function DoCheckoutSubmitWithoutContactDetails() {


  const details: IBokunCheckoutOptions = {
    checkoutOption: "CUSTOMER_FULL_PAYMENT",
    paymentMethod: "RESERVE_FOR_EXTERNAL_PAYMENT",
    source: "DIRECT_REQUEST",
    sendNotificationToMainContact: false,
    showPricesInNotification: true,
    note: "Testing booking creation",
    currency: "EUR",
    user: {
      id: "",
      email: "test@test.com",
      customer_email: "test@test.com",
      customer_name: "Zlatko Derkoski",
      customer_phone: "+373336933990822",
    },
    directBooking: {
      /**/
      mainContactDetails: [
        { questionId: "firstName", values: ["Zlatko"] },
        { questionId: "lastName", values: ["Derkoski"] },
        { questionId: "email", values: ["test@gmail.com"] },
        // phone number must be valid:
        { questionId: "phoneNumber", values: ["+38970667667"] },
        { questionId: "address", values: ["Test Address"] },
        { questionId: "city", values: ["Test City"] },
        { questionId: "country", values: ["MKD"] },
        { questionId: "nationality", values: ["MKD"] },
      ],
      activityBookings: [
        {
          activityId: 914000,
          rateId: 1762475,
          startTimeId: 3218824,
          date: "2026-07-25",
          note: "Booking from WIT-3.0 web application",
          passengers: [
            {
              groupSize: 3, // not working
              quantity: 3, // not working
              pricingCategoryId: 753166,
              passengerDetails: [],
              answers: []
            },
            /*{
              groupSize: 3,
              quantity: 3,
              pricingCategoryId: 753166,
              passengerDetails: [],
              answers: []
            }*/
          ],

          answers: [],
          pickupAnswers: [],
          dropoffAnswers: []
        }
      ]
    }
  }


  const action = async () => {

    console.log("details for testing:", details);

    const result = await getApiData(`/administrator/test-doCheckout`, "POST", {
      details: details
    }, "authorize", "application/json");
    console.log("result: ", result);
  }

  return <>
    <ButtonDefault label="Do Checkout Submit Without Customer Details" onClick={() => {
      action();
    }} />
  </>
}