"use client";

import ButtonDefault from "@/components/buttons/ButtonDefault";
import { useRouter } from "@/translations-engine/routing";
import { IDBBookingDetails } from "@/utils/interface-database";
import { useTranslations } from "next-intl";

export default function CancelBookingEvents(
  { booking }
    :
    { booking: IDBBookingDetails }
) {

  const router = useRouter();
  const tCommon = useTranslations("Common");

  return <>
    <div className="cancel-booking-events">
      <ButtonDefault label={tCommon("cancel_booking")} variant="outline-danger" className="w-100 d-flex" onClick={() => {
        router.push(`/Client/CancelTour/${booking.id}`)
      }} />
    </div>
  </>
}