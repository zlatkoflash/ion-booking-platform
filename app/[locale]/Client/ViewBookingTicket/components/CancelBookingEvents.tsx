"use client";

import ButtonDefault from "@/components/buttons/ButtonDefault";
import { useRouter } from "@/translations-engine/routing";
import { IDBBookingDetails } from "@/utils/interface-database";
import { useTranslations } from "next-intl";

export default function CancelBookingEvents(
  {
    // booking_parent, 
    booking_product
  }
    :
    {
      // booking_parent: IDBBookingDetails, 
      booking_product: IDBBookingDetails
    }
) {

  console.log("booking_product::::", booking_product);

  const router = useRouter();
  const tCommon = useTranslations("Common");

  return <>
    {
      /*booking.initial_payment_is_done !== true && <div className="cancel-booking-events mb-3">
        <p className="mb-2">
          Click the button below to pay for the booking and confirm it.
        </p>
        <ButtonDefault label={"Settle Outstanding Balance"} variant="primary" className="w-100 d-flex" onClick={() => {
          router.push(`/Client/CancelTour/${booking.id}`)
        }} />
      </div>*/
    }
    <div className="cancel-booking-events">
      <ButtonDefault label={tCommon("cancel_booking")} variant="outline-danger" className="w-100 d-flex" onClick={() => {
        router.push(`/Client/CancelTour/${booking_product.id}?productCode=${booking_product.confirmation_code_product}`)
      }} />
    </div>
  </>
}