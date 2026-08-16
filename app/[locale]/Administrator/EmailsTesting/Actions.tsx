"use client";

import ButtonDefault from "@/components/buttons/ButtonDefault"
import { getApiData } from "@/utils/api";

export default function EmailsTestingActions() {
  return <>
    <div className="d-flex flex-wrap gap-3 p-5">
      <BtnSendX6CodesForResettingPassword />
      <BtnSend_ConfirmationEmailAfterSignup />
      <BtnSend_WelcomeOnBoardEmail />
      <BtnSend_PaymetSuccess_BookingCOnfirmFail />
      <BtnSend_PaymentSuccess_BookingSuccess />
      <BtnSend_BookingCancelledByClient_BookingCancelledByAdmin />
      <BtnSend_UpdateConfirmedBooking />
    </div>
  </>
}


function BtnSendX6CodesForResettingPassword() {

  const action = async () => {
    const details = await getApiData("/administrator/test-email-x6-code-password-reset", "POST", {}, "authorize", "application/json");
    console.log("details", details);
  }

  return <>

    <ButtonDefault
      label="Send X6 Codes For Resetting Password"
      variant="primary"
      onClick={() => {

        action()

      }}
    />

  </>
}

function BtnSend_ConfirmationEmailAfterSignup() {
  const action = async () => {
    const details = await getApiData("/administrator/test-email-confirmation-signup", "POST", {}, "authorize", "application/json");
    console.log("details", details);
  }

  return <>

    <ButtonDefault
      label="Send Confirmation Email After Signup"
      variant="primary"
      onClick={() => {

        action()

      }}
    />

  </>
}


function BtnSend_WelcomeOnBoardEmail() {
  const action = async () => {
    const details = await getApiData("/administrator/test-email-welcome-onboard", "POST", {}, "authorize", "application/json");
    console.log("details", details);
  }

  return <>

    <ButtonDefault
      label="Send Welcome OnBoard Email"
      variant="primary"
      onClick={() => {

        action()

      }}
    />

  </>
}

function BtnSend_PaymetSuccess_BookingCOnfirmFail() {

  const action = async () => {
    const details = await getApiData("/administrator/test-email-booking-paymentSuccess-confirmationFailed", "POST", {}, "authorize", "application/json");
    console.log("details", details);
  }

  return <>

    <ButtonDefault
      label="Send Payment Success_Booking Confirm Fail Email (client+admin) and email for initial payment"
      variant="primary"
      onClick={() => {

        action()

      }}
    />

  </>
}

function BtnSend_PaymentSuccess_BookingSuccess() {

  const action = async () => {
    const details = await getApiData("/administrator/test-email-paymentSuccess-confirmationSuccess", "POST", {}, "authorize", "application/json");
    console.log("details", details);
  }

  return <>
    <ButtonDefault
      label="Send Payment Success + Booking Success"
      variant="primary"
      onClick={() => {

        action()

      }}
    />

  </>
}


function BtnSend_BookingCancelledByClient_BookingCancelledByAdmin() {

  const action = async () => {
    const details = await getApiData("/administrator/test-email-booking-cancelled-client-admin", "POST", {}, "authorize", "application/json");
    console.log("details", details);
  }
  return <>

    <ButtonDefault
      label="Send Booking Cancelled By Client + Booking Cancelled By Admin"
      variant="primary"
      onClick={() => {

        action()

      }}
    />
  </>
}


function BtnSend_UpdateConfirmedBooking() {

  const action = async () => {
    const details = await getApiData("/administrator/test-email-update-confirmed-booking", "POST", {}, "authorize", "application/json");
    console.log("details", details);
  }

  return <>
    <ButtonDefault
      label="Send Update Confirmed Booking ( date time + participants ) + error changing participans"
      variant="primary"
      onClick={() => {

        action()

      }}
    />
  </>
}