"use client";


import IconText from "@/components/buttons/IconText";
import CartItemsLines from "@/components/typography/CartItemsLines";
import SmallDescriptionForTheTour from "@/app/[locale]/tour/[slug]/SmallDescriptionForTheTour";
import EditButtonsForTour from "@/app/[locale]/booking/components/EditButtonsForTour";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IBookingTimeActivitySlot } from "@/utils/interface-booking";
import { IBookingParticipants, IBookingPrice, setActiveTimeSlot, setFilterParticipantsCount, setPrice } from "@/redux/booking/bookingSlice";
import { updateUrlParam } from "@/utils/navigation";
import { getApiData } from "@/utils/api";
import { useState } from "react";
import { slotDateTimeToSupabaseTimeZone00 } from "@/utils/dates-times";
import { EBookingStatus } from "@/utils/interface-database";
import { getArrayOfParticipantsForUpdateTheBooking } from "@/utils/booking-client";
import ZIcon from "@/components/icons/ZIcon";
import { useTranslations } from "next-intl";

export default function FormSelectedValues(
  {
    slots
  }
    :
    {
      slots: IBookingTimeActivitySlot[]
    }
) {

  const price = useAppSelector((state) => state.booking.price);
  // const dates = useAppSelector((state) => state.booking.filters.selectedDates);
  // const timeSlot = useAppSelector((state) => state.booking.activeTimeSlot);
  // const filters = useAppSelector((state) => state.booking.filters);
  const booking = useAppSelector((state) => state.booking.booking);
  const tour = useAppSelector((state) => state.booking.tour);
  const dispatch = useAppDispatch();
  const updateUrlParamFor = updateUrlParam();
  const [selectedDate, setSelectedDate] = useState(booking?.date_tour_start?.substring(0, 10)); // YYYY-MM-DD 
  const activeTimeSlot = useAppSelector((state) => state.booking.activeTimeSlot);
  const authUser = useAppSelector((state) => state.auth.user);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [localSlots, setLocalSlots] = useState<IBookingTimeActivitySlot[]>([]);

  const [formIsOpened, setFormIsOpened] = useState(false);

  const [loading, setLoading] = useState(false);
  const tForms = useTranslations("Forms");


  const LoadTheSlotsForTheDate = async (date: string) => {
    setLoading(true);
    const slots = await getApiData<{
      ok: boolean;
      slots: IBookingTimeActivitySlot[];
      message: string;
    }>(
      '/booking-public/get-availabilities',
      "POST",
      {
        dateFor: date,
        api_experience_id: booking?.api_experience_id,
        defaultRateId: activeTimeSlot !== null ? activeTimeSlot.defaultRateId : null
      },
      "not-authorize"
    );
    console.log("New loaded slots:", slots);
    setLocalSlots(slots.slots);
    setLoading(false);
  }
  const updateDateTimeForBooking = async (newSlot: IBookingTimeActivitySlot) => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    // update booking date and time slot
    // call the update booking api
    // update the url params
    // update the booking state
    console.log("updateDateTimeForBooking", newSlot, selectedDate);

    const finalDateStart = typeof selectedDate === "string" && selectedDate !== "" ? selectedDate : booking?.date_tour_start?.substring(0, 10) as string;

    console.log("finalDateStart:", finalDateStart);

    const payload = {
      bookingId: booking?.id,
      dateStart: selectedDate,
      timeStartId: newSlot.startTimeId,
      timeStartIdFull: newSlot.id,
      time_tour_start_string: newSlot.startTime,
      date_tour_start_zone_0: slotDateTimeToSupabaseTimeZone00(
        finalDateStart, newSlot.startTime as string
      ),
      start_time_label: `${newSlot.startTimeLabel}`
    };
    console.log("payload:", payload);

    const result = await getApiData<{
      ok: boolean,
      message: string,
    }>(
      "/booking-public/update-time-slot-for-reserved-booking",
      "POST",
      payload,
      "not-authorize",
      "application/json"
    );

    console.log("Result after updating time/date:", result);

    if (!result.ok) {
      setErrorMessage(result.message);
    } else {
      // update booking state
      dispatch(setActiveTimeSlot(newSlot));
      // updateUrlParamFor("slot", newSlot.id);
      // refresh
      updateUrlParamFor('refresh', (new Date()).valueOf());
      setSuccessMessage(tForms("date_and_time_updated_successfully"));
    }

  }

  console.log("Form update the detais...");

  const updateTheParticipants = async (newParticipants: IBookingParticipants) => {

    if (tour === null || booking === null) {
      setErrorMessage(tForms("tour_or_booking_not_found"));
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    console.log("tour, booking", tour, booking);

    const detailsAfterUpdating = await getApiData<
      {
        ok: boolean,
        message: string,
        feedback: any,
        price: IBookingPrice
      }
    >('/booking-public/update-participants-for-reserved-booking', "POST", {
      participants: getArrayOfParticipantsForUpdateTheBooking(
        tour,
        // booking, 
        newParticipants
      ),
      bookingId: booking.id,
      participantsCounts: newParticipants
    }, "not-authorize", "application/json");

    console.log("detailsAfterUpdating participants:", detailsAfterUpdating);

    if (!detailsAfterUpdating.ok) {
      setErrorMessage(detailsAfterUpdating.message);
    } else {
      // update booking state
      // dispatch(setFilterParticipantsCount(newParticipants));
      // dispatch(setPrice(detailsAfterUpdating.price));
      // updateUrlParamFor("participantsCount", newParticipants);
      // refresh
      updateUrlParamFor('refresh', (new Date()).valueOf());
      setSuccessMessage(tForms("participants_updated_successfully"));
    }
    setLoading(false);

  }

  return <>
    <form className={`form-booking-selection ${formIsOpened ? 'mobile-content-opened' : ''}`} onClick={() => {
      if (!formIsOpened) {
        setFormIsOpened(!formIsOpened);
      }
    }}>


      <div className={`booking-content-wrapper hide-on-desktop ${formIsOpened ? 'it-is-closed-in-mobile' : ""}`}>
        <SmallDescriptionForTheTour type="description-for-mobile" />
      </div>

      <div className={`booking-content-wrapper hide-on-mobile ${formIsOpened ? 'it-is-opened-in-mobile' : ""}`}>

        <SmallDescriptionForTheTour />

        {
          booking !== null &&
          <>
            <EditButtonsForTour
              slots={localSlots.length > 0 ? localSlots : slots}
              onUpdateDates={(dates: string[]) => {

                setSelectedDate(dates[0]);
                // LoadTheSlotsForTheNew
                LoadTheSlotsForTheDate(dates[0]);
              }}
              onUpdateTimeSlot={(slot: IBookingTimeActivitySlot) => {

                updateDateTimeForBooking(slot);

                console.log("Selected slot:", slot);
              }}
              onUpdateParticipants={(participants: IBookingParticipants) => {

                // dispatch(setFilterParticipantsCount(participants))
                // updateBooking("count_participants", participants);

                updateTheParticipants(participants)

              }}

              includeEditsButtons={booking.status === EBookingStatus.RESERVED && !booking.is_expired}

            />

            {
              errorMessage !== "" && <IconText subText={errorMessage} text={tForms("error_occurred")} type="icon-text-alert" variation="warning-solid" fullWidthCentered={true} iconType="danger-outline" />
            }

            {
              successMessage !== "" && <IconText subText={successMessage} text={tForms("success")} type="icon-text-alert" variation="success" fullWidthCentered={true} iconType="calendar-check-outline" />
            }

          </>
        }


        <hr />

        <CartItemsLines />


        {
          price.total > price.total_discount && <IconText text={tForms("save_with_this_special_offer", {
            price: `€${(price.total - price.total_discount).toFixed(2)}`
          })} type="icon-text-alert" variation="success" fullWidthCentered={true} iconType="sell-outline" />
        }


      </div>





      <div className="controls-top-right-mobile">
        <ZIcon type="keyboard-arrow-left" className={`arrow-for ${formIsOpened ? 'active' : ''}`} onClick={() => {
          setFormIsOpened(!formIsOpened);
        }} />
      </div>

    </form>
  </>
}