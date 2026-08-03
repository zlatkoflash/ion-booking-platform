"use client";

import ButtonDefault from "@/components/buttons/ButtonDefault";
import IconText from "@/components/buttons/IconText";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "@/translations-engine/routing";
import { getApiData } from "@/utils/api";
import { slotDateTimeToSupabaseTimeZone00 } from "@/utils/dates-times";
import { IDBBooking } from "@/utils/interface-database";
import { updateUrlParam } from "@/utils/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

export default function TourFormSubmitButtons() {

  const price = useAppSelector((state) => state.booking.price);
  const authUser = useAppSelector((state) => state.auth.user);
  const browserGuestId = useAppSelector((state) => state.auth.browser_user_id);

  const [loading, setLoading] = useState(false);
  const tour = useAppSelector((state) => state.booking.tour);
  const timeSlot = useAppSelector((state) => state.booking.activeTimeSlot);
  const bookingFilters = useAppSelector((state) => state.booking.filters);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const locale = useLocale();

  const updateUrlParamFor = updateUrlParam();

  const tForms = useTranslations("Forms");


  const CreateBookingItem = async () => {



    setLoading(true);
    setErrorMessage("");



    const result = await getApiData<{
      ok: boolean,
      message: string,
      booking: IDBBooking
    }>("/booking-public/create-booking-item", "POST",
      {
        tour_id: tour?.id,
        time_slot_id: timeSlot?.id,
        participantsCount: bookingFilters.participantsCount,
        date_start: bookingFilters.selectedDates[0],
        start_time: timeSlot?.startTime,
        browser_id: browserGuestId,
        language: locale,
        start_time_label: timeSlot?.startTimeLabel,
        date_tour_start_zone_0: slotDateTimeToSupabaseTimeZone00(
          bookingFilters.selectedDates[0], timeSlot?.startTime as string
        )
      },
      authUser === null ? "not-authorize" : "authorize",
      "application/json");

    console.log("result:", result);

    if (!result.ok) {
      setErrorMessage(result.message);
      updateUrlParamFor("reload-experience", (new Date()).getTime());
      setLoading(false);
    }
    else {
      router.push(`/booking/${result.booking.id}/details`);
      // setLoading(false); // debugging
    }


  }

  if (price.total === 0) return <></>

  return <>
    <div className="tour-form-submit-buttons">
      <ButtonDefault
        label={tForms("reserve_now_and_pay_later")}
        variant="outline-primary"
        loading={price.loading || loading}
        disabled={price.total === 0}
        onClick={(e) => {
          CreateBookingItem()
        }}
      />
      <ButtonDefault
        label={tForms("book_tour_for", { price: `€${price.total_discount.toFixed(2)}` })}
        loading={price.loading || loading}
        disabled={price.total === 0}
        onClick={(e) => {
          CreateBookingItem()
        }}
      />
    </div>
    {
      errorMessage !== "" && <div className="my-3">
        <IconText iconType="danger-outline" type="icon-text-alert" variation="danger" text={errorMessage} key={'alert-for-hight-demand'} fullWidthCentered={true} />
      </div>
    }

  </>
}