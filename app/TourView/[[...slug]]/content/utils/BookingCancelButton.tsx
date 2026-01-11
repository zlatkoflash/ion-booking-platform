"use client";

import { useBookingSingleItem } from "@/app/User/ManageMyBooking/ViewBooking/[slug]/BookingProvider";
import { CancelBooking } from "@/utils/bokunAdminClient";
import { useState } from "react";
import { useBookingEditor } from "../../BookingEditorProvider";
import { isWithinPast24Hours } from "@/utils/dateUtils";
import ErrorMessage, { BookingCancellingError } from "@/components/ErrorMessages/ErrorMessage";
import { ModalCancelApprove } from "@/components/Modals/ModalCancelApprove";

export default function BookingCancelButton() {
  // isWithinPast24Hours
  const {
    bookingDBNet,

  } = useBookingEditor()
  // bookingDBNet.

  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState(false);

  const ___CancelTheBooking = async () => {

    /*if (!confirm("Are you sure you want to cancel this booking?")) {
      return;
    }*/


    setError(false);
    console.log('Cancel');

    const result = await CancelBooking({
      dbBookingId: bookingDBNet?.booking_id as string,
    });
    if (result.ok === false) {
      setError(true);
    }
    else {

      window.location.reload();
    }

    console.log("result:", result);

    setCancelling(false);
  }


  if (bookingDBNet?.booking_status === "CANCELLED") {
    return <p className="text-red-600 text-center">The booking is cancelled</p>
  }

  if (!isWithinPast24Hours(bookingDBNet?.booking_created_at as string) || bookingDBNet?.booking_status === "CANCELLED") {
    return null;
  }

  return (<>
    <button
      type='button'
      onClick={() => {
        // ___CancelTheBooking();
        setCancelling(true);
      }}
      className={cancelling ? "w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-full transition-colors cursor-pointer bg-red-600 text-white mt-3" : "w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-full transition-colors cursor-pointer bg-red-600 text-white mt-3"}
      disabled={cancelling}
    >
      {cancelling ? "Canceling..." : "Cancel The Booking"}
    </button>
    {error && <ErrorMessage error={BookingCancellingError} />}

    <ModalCancelApprove
      isOpen={cancelling}
      onClose={() => setCancelling(false)}
      onApprove={___CancelTheBooking}
      title="Cancel The Booking"
      description="Are you sure you want to cancel this booking?"
    />
  </>);
}