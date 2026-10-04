"use client";

import IconsTextInlineGroup from "@/components/buttons/IconsTextInlineGroup";
import IconText from "@/components/buttons/IconText";
import { getParticipantsLabel } from "@/utils/booking-client";
import { formatTo12HourTime, supabaseDateToDayOfWeekMonthDD } from "@/utils/dates-times";
import { IBokunBookingActivityBooking } from "@/utils/interface-bokun";
import { IDBBookingDetails, IDBTour } from "@/utils/interface-database";
import { generateGoogleMapLink } from "@/utils/maps";
import { useTranslations } from "next-intl";


export default function MainIconsInfo(
  {
    // tour, 
    booking,
    bookedActivity
  }
    :
    {
      // tour: IDBTour,
      booking: IDBBookingDetails,
      bookedActivity: IBokunBookingActivityBooking
    }
) {

  const tCommon = useTranslations("Common");
  const tForms = useTranslations("Forms");

  let participantsText = ``;
  bookedActivity.invoice.lineItems.map((lineItem) => {
    participantsText = `${participantsText}${participantsText !== "" ? ', ' : ''}${lineItem.title} ${lineItem.quantity}`;
  })

  return <>
    <IconsTextInlineGroup type="for-tour-stats" gridType="x3-in-a-row">
      <IconText type="for-tour-stat" iconType="location-on-pin" text={tCommon("place")} subText={bookedActivity.activity.googlePlace.name} href={generateGoogleMapLink(bookedActivity.activity.googlePlace.geoLocationCenter.lat, bookedActivity.activity.googlePlace.geoLocationCenter.lng, true)} hrefTarget="_blank" />
      <IconText type="for-tour-stat" iconType="calendar-check-outline" text={tCommon("booking_date")} subText={`${bookedActivity.dateString}`} />
      <IconText type="for-tour-stat" iconType="people" text={tForms("participants")}
        // subText={getParticipantsLabel(booking.count_participants, tForms.raw("participantsObjectTranslation"))}
        subText={participantsText}
      />
    </IconsTextInlineGroup>
  </>
}