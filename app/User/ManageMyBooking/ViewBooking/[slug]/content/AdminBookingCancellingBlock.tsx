"use client";

import { CancelBooking } from "@/utils/bokunAdminClient";
import { useState } from "react";
import { useBookingSingleItem } from "../BookingProvider";

export default function AdminBookingCancellingBlock() {

  const {
    bookingDB,
    state,
    dispatch
  } = useBookingSingleItem();

  /*const {
    state,
    dispatch
  } = useBookingSingleItem();*/

  // console.log("state.bookingItem:", state.bookingItem);
  console.log("bookingDB:", bookingDB);

  // let status = "SUCCESS";

  const [loading, setLoading] = useState(false);



  const handleCancelBooking = async () => {
    console.log("Cancel Booking");

    setLoading(true);

    const result = await CancelBooking({ dbBookingId: bookingDB.id });
    console.log("result:", result);

    setLoading(false);

    // dispatch({ type: BookingActionType.CANCELL_THE_BOOKING, payload: result });
  }

  return (

    < div className="p-6 border border-red-300 rounded-lg shadow-md bg-red-50" >

      {/* --- 3. Cancel Booking Section --- */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Full Booking Cancellation</h2>
      <p className="text-red-700 mb-4">
        <span className="font-bold">Warning:</span> This action is usually irreversible and should only be performed after checking cancellation policies.
      </p>
      <button
        onClick={handleCancelBooking}
        type="button"
        // disabled={currentStatus === 'CANCELED'}
        className={`w-full py-3 font-bold rounded-lg shadow-md transition duration-150 ${loading ? 'cursor-default opacity-50 disabled ' : 'cursor-pointer'} 
            ${bookingDB.status === 'CANCELLED' ? 'bg-red-400 text-red-900 cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-700'}`}
        disabled={loading}
      >
        {bookingDB.status === 'CANCELLED' ? 'BOOKING ALREADY CANCELED' : 'Permanently Cancel Booking'}
      </button>
    </div >
  )
}
