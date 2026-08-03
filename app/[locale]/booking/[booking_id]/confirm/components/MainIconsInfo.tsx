"use client";

import IconsTextInlineGroup from "@/components/buttons/IconsTextInlineGroup";
import IconText from "@/components/buttons/IconText";
import { getParticipantsLabel } from "@/utils/booking-client";
import { formatTo12HourTime, supabaseDateToDayOfWeekMonthDD } from "@/utils/dates-times";
import { IDBBookingDetails, IDBTour } from "@/utils/interface-database";
import { generateGoogleMapLink } from "@/utils/maps";
import { useTranslations } from "next-intl";


export default function MainIconsInfo(
  { tour, booking }
    :
    {
      tour: IDBTour,
      booking: IDBBookingDetails
    }
) {

  const tCommon = useTranslations("Common");
  const tForms = useTranslations("Forms");

  return <>
    <IconsTextInlineGroup type="for-tour-stats" gridType="x3-in-a-row">
      <IconText type="for-tour-stat" iconType="location-on-pin" text={tCommon("place")} subText={tour.location.name} href={generateGoogleMapLink(tour.location.geoLocationCenter.lat, tour.location.geoLocationCenter.lng, true)} hrefTarget="_blank" />
      <IconText type="for-tour-stat" iconType="calendar-check-outline" text={tCommon("booking_date")} subText={`${supabaseDateToDayOfWeekMonthDD(booking.date_tour_start)} - ${formatTo12HourTime(booking.time_tour_start_string)} - ${booking.start_time_label}`} />
      <IconText type="for-tour-stat" iconType="people" text={tForms("participants")} subText={getParticipantsLabel(booking.count_participants, tForms.raw("participantsObjectTranslation"))} />
    </IconsTextInlineGroup>
  </>
}