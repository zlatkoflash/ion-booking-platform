"use client";


import IconText from "@/components/buttons/IconText";
import CartItemsLines from "@/components/typography/CartItemsLines";
import SmallDescriptionForTheTour from "@/app/[locale]/tour/[slug]/SmallDescriptionForTheTour";
import EditButtonsForTour from "@/app/[locale]/booking/components/EditButtonsForTour";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IBookingTimeActivitySlot } from "@/utils/interface-booking";
import { IBookingParticipants, setActiveTimeSlot, setFilterParticipantsCount } from "@/redux/booking/bookingSlice";
import { updateUrlParam } from "@/utils/navigation";
import { getApiData } from "@/utils/api";
import { useState } from "react";
import { slotDateTimeToSupabaseTimeZone00 } from "@/utils/dates-times";
import FormSelectedValuesStatusHeading from "../../ViewBookingTicket/components/FormSelectedValuesStatusHeading";
import { IDBBookingDetails } from "@/utils/interface-database";

export default function FormSelectedValuesForCancelling(
  {
    slots
  }
    :
    {
      slots: IBookingTimeActivitySlot[]
    }
) {

  const price = useAppSelector((state) => state.booking.price);
  const dates = useAppSelector((state) => state.booking.filters.selectedDates);
  const timeSlot = useAppSelector((state) => state.booking.activeTimeSlot);
  const filters = useAppSelector((state) => state.booking.filters);
  const booking = useAppSelector((state) => state.booking.booking);
  const dispatch = useAppDispatch();
  const updateUrlParamFor = updateUrlParam();

  const [loading, setLoading] = useState(false);

  /*const updateBooking = async (prop: string, value: any) => {
    setLoading(true);

    let valueFor: any = value;
    if (prop === "date_tour_start") {
      // value is YYYY-mm-dd i need date for supabase
      valueFor = `${value} 00:00:00`;
    }
    console.log("valueFor:", valueFor);

    const result = await getApiData("/booking-public/update-booking-item", "POST", {
      prop,
      value: valueFor,
      booking_id: booking?.id
    }, "not-authorize", "application/json");


    console.log("Result after updating the booking:", result);

    updateUrlParamFor('refresh', (new Date()).valueOf())
    setLoading(false);
  }*/

  return <>
    <form className="form-booking-selection">


      <FormSelectedValuesStatusHeading booking={booking as IDBBookingDetails} />

      <SmallDescriptionForTheTour includeSlotsAvailability={false} />

      {
        booking !== null &&
        <EditButtonsForTour
          slots={slots}
          includeEditsButtons={false}
          onUpdateDates={(dates: string[]) => {
            /*dispatch(setActiveTimeSlot(null));
            // updateUrlParamFor('refresh', (new Date()).valueOf())
            console.log("dates:", dates);
            updateBooking("date_tour_start", dates[0]);*/
          }}
          onUpdateTimeSlot={(slot: IBookingTimeActivitySlot) => {

            // 2026-07-12 20:59:11.57037+00
            // const dateTime

            /*dispatch(setActiveTimeSlot(slot));
            updateBooking("slot_details", {
              time_slot_id: slot.id,
              time_tour_start_string: slot.startTime,
              start_time_label: slot.startTimeLabel,
              // time_tour_start_string: 
              date_tour_start_zone_0: slotDateTimeToSupabaseTimeZone00(
                dates[0], slot.startTime
              )
            });*/
          }}
          onUpdateParticipants={(participants: IBookingParticipants) => {
            /*dispatch(setFilterParticipantsCount(participants))
            updateBooking("count_participants", participants);*/
          }}
        />
      }


      <hr />

      <CartItemsLines />

      <hr />

      <IconText text="Cancellation policy" subText="Full refund: Get back 100% of what you paid." type="icon-text-cancellation-info" iconType="info-circle-outline" />



    </form>
  </>
}