"use client";

import ButtonDefault from "@/components/buttons/ButtonDefault";
import { getApiData } from "@/utils/api";

export default function BtnsBooking() {
  return <>
    <BtnFetchBooking />
    <BtnGetBookingSummary />
    <BtnAbortReservedBooking />
    <BtnCancelTheBooking />
  </>
}



function BtnFetchBooking() {

  /// cart.json/{sessionId}
  const bookingId = 'WAL-97733951';

  const action = async () => {
    const result = await getApiData(`/administrator/test-fetch-booking`, "POST", {
      bookingId: bookingId
    }, "authorize", "application/json");
    console.log("result: ", result);
  }

  return <>
    <ButtonDefault label={`Fetch Booking ${bookingId}`} onClick={() => {
      action();
    }} />
  </>
}



function BtnGetBookingSummary() {

  const bookingId = 97681510;

  const action = async () => {
    const result = await getApiData(`/administrator/test-summary-booking`, "POST", {
      bookingId: bookingId
    }, "authorize", "application/json");
    console.log("result: ", result);
  }

  return <>
    <div>
      <ButtonDefault className="d-flex w-100" label={`Get Booking Summary ${bookingId}`} onClick={() => {
        action();
      }} />
      <small>It is returning some encrypted text it is some file</small>
    </div>
  </>
}


function BtnAbortReservedBooking() {

  const bookingId = 97694162;

  const action = async () => {
    const result = await getApiData(`/administrator/test-abort-reserved-bokun-booking`, "POST", {
      bookingId: bookingId
    }, "authorize", "application/json");
    console.log("result: ", result);
  }

  return <>
    <div>
      <ButtonDefault className="d-flex w-100" label={`Abort Reserved Booking ${bookingId}`} onClick={() => {
        action();
      }} />
    </div>
  </>
}


function BtnCancelTheBooking() {
  const bookingId = "WAL-97694162";

  const action = async () => {
    const result = await getApiData(`/administrator/test-cancel-bokun-booking`, "POST", {
      bookingId: bookingId
    }, "authorize", "application/json");
    console.log("result: ", result);
  }

  return <>
    <div>
      <ButtonDefault className="d-flex w-100" label={`Cancel The Booking ${bookingId}`} onClick={() => {
        action();
      }} />
    </div>
  </>
}