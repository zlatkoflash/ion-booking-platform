"use client";

import IconText from "@/components/buttons/IconText";
import PriceGroup from "@/components/typography/PriceGroup";
import SelectorDate from "./SelectorDate";
import SelectorTime from "./SelectorTime";
import SelectorParticipants from "./SelectorParticipants";
import CartItemsLines from "@/components/typography/CartItemsLines";
import TourFormSubmitButtons from "./TourFormSubmitButtons";
import FormSectionChecksItems from "./FormSectionChecksItemst";
import { IDBTourIncludeDetails } from "@/utils/interface-database";
import { IBookingTimeActivitySlot } from "@/utils/interface-booking";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getPriceForCategory } from "@/utils/booking-client";
import AvailableSlotsLabel from "./AvailableSlotsLabel";
import { updateUrlParam } from "@/utils/navigation";
import { setActiveTimeSlot, setFilterParticipantsCount, setPriceLoading } from "@/redux/booking/bookingSlice";
import { useTranslations } from "next-intl";

export default function FormSelectionTourDetails(
  {
    tour = null,
    initialSelectedDates = [],
    initialParticipants = {
      adults: 0,
      children: 0
    },
    slots = []
  }
    :
    {
      tour?: IDBTourIncludeDetails | null,
      initialSelectedDates?: string[],
      initialParticipants?: {
        adults: number;
        children: number;
      },
      slots: IBookingTimeActivitySlot[]
    }
) {

  const tCommon = useTranslations("Common");

  const selectedTimeSlot = useAppSelector((state) => state.booking.activeTimeSlot);
  const updateUrlParamFor = updateUrlParam();
  const dispatch = useAppDispatch()


  const startTimeSlot = useAppSelector((state) => state.booking.activeTimeSlot);


  let max_participants = 999;
  if (tour !== null && startTimeSlot !== null) {
    max_participants = startTimeSlot.availabilityCount - tour.occupied_spots_count;
  }
  if (max_participants < 0) {
    max_participants = 0;
  }


  if (tour === null) {
    return <></>
  }





  return <>

    <form className="form-booking-selection">

      <PriceGroup price={tour.price as number} discountPercent={tour.discount} currencySign="€" type="price-group-for-tour-page" />



      {
        (selectedTimeSlot !== null && tour !== null) &&
        <AvailableSlotsLabel
          ocupiedSlots={tour.occupied_spots_count}
          availableSlotsFromTimeSlot={selectedTimeSlot?.availabilityCount || 0}
        />
      }


      {
        (
          selectedTimeSlot !== null && getPriceForCategory(
            tour,
            selectedTimeSlot,
            "children"
          ) < getPriceForCategory(
            tour,
            selectedTimeSlot,
            "adult"
          )
        ) &&
        <IconText iconType="ticket" text={tCommon("discounted_rates_for_kids")} type="label-for-form" />
      }


      <SelectorDate initialSelectedDates={initialSelectedDates} onUpdateDates={(dates: string[]) => {
        updateUrlParamFor("selectedDates", dates, [
          //'participantsCount', 
          'timeSlot'
        ]);
        dispatch(setPriceLoading(true));
      }} />
      <SelectorTime
        isForExistingBooking={false}
        slots={slots}
        onUpdateTimeSlot={(timeslot: IBookingTimeActivitySlot) => {
          updateUrlParamFor("timeSlot", timeslot?.id as string);
          dispatch(setPriceLoading(true));
          dispatch(setActiveTimeSlot(timeslot))
        }} />
      <SelectorParticipants
        // initialParticipants={initialParticipants} 
        max_participants={max_participants}
        onUpdateParticipants={(participants) => {
          updateUrlParamFor("participantsCount", participants);
          dispatch(setPriceLoading(true));
          dispatch(setFilterParticipantsCount(
            participants
          ));
        }}
      />

      {
        tour.booked_tours_yesterday > 5 &&
        <IconText iconType="info-circle-outline" type="info-form" text={`${tCommon("booked")} ${tour.booked_tours_yesterday} ${tCommon("times_yesterday")}`} />
      }

      <CartItemsLines />

      <TourFormSubmitButtons />

      <FormSectionChecksItems />

    </form>

  </>
}