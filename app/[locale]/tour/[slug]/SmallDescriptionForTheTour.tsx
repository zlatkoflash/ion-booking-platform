"use client";

import example_city_3 from "@/assets/images/example-city-3.png";
import ZBadge from "@/components/buttons/ZBadge";
import ZPicture from "@/components/illustrations/ZPicture";
import Title from "@/components/typography/Title";
import Image from "next/image";
import AvailableSlotsLabel from "./AvailableSlotsLabel";
import { useAppSelector } from "@/redux/hooks";
import { stripHtml } from "@/utils/strings";
import { getParticipantsLabel, getTotalCountFromParticipantObject } from "@/utils/booking-client";
import { useTranslations } from "next-intl";

export default function SmallDescriptionForTheTour(
  {
    includeSlotsAvailability = true,
    type = "default-description"
  }
    :
    {
      includeSlotsAvailability?: boolean,
      type?: "default-description" | "description-for-mobile"
    }
) {

  const tour = useAppSelector((state) => state.booking.tour);
  const activeTimeSlot = useAppSelector((state) => state.booking.activeTimeSlot);
  const booking = useAppSelector((state) => state.booking.booking);
  const price = useAppSelector((state) => state.booking.price)

  const tForms = useTranslations("Forms")

  // console.log("activeTimeSlot:", activeTimeSlot);

  if (tour === null) return <></>
  // console.log("tour:::", tour);


  let slots_from_booking = 0;
  if (booking !== null) {
    slots_from_booking = getTotalCountFromParticipantObject(booking.count_participants);
  }

  if (type === "description-for-mobile") {
    return <>
      <div className="small-description-for-tour only-for-mobile">
        <ZPicture pictureUrl={example_city_3.src} alt={tour.title as string} width={300} height={300} />
        <div className="small-description-content">
          <Title headingType="p" headingStyle="Text-md-Medium" color="--color-text-fg">{tour.title}</Title>
        </div>
        {
          booking !== null && <Title headingType="h3" headingStyle="Text-md-Semibold" color="--color-text-fg" className="price-title">
            TOTAL (<Title headingType="span" headingStyle="Text-md-Regular">{
              getParticipantsLabel(booking?.count_participants, tForms.raw("participantsObjectTranslation"))
            }</Title>) €{price.total_discount.toFixed(2)}
          </Title>
        }
      </div>
    </>
  }

  return <>
    <div className="small-description-for-tour">
      <ZPicture pictureUrl={example_city_3.src} alt={tour.title as string} width={300} height={300} />
      <div className="small-description-content">
        {/*<ZBadge label="Only 3 sport left" type="form-badge" variant="warning" />*/}
        {
          includeSlotsAvailability &&
          <AvailableSlotsLabel
            ocupiedSlots={tour.occupied_spots_count}
            availableSlotsFromTimeSlot={(activeTimeSlot?.availabilityCount || 0)}
          />
        }
        <Title headingType="h1" headingStyle="Text-md-Medium" color="--color-text-fg">{tour.title}</Title>
        <Title headingType="p" headingStyle="Text-xs-Regular" color="--color-text-fg-subtle">{
          tour.description_short && tour.description_short !== "" ? tour.description_short : stripHtml(tour.description || "").substring(0, 200) + '...'
        }</Title>
      </div>
    </div>
  </>
}