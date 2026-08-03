"use client";


import IconText from "@/components/buttons/IconText";
import CartItemsLines from "@/components/typography/CartItemsLines";
import SmallDescriptionForTheTour from "@/app/[locale]/tour/[slug]/SmallDescriptionForTheTour";
import EditButtonsForTour from "@/app/[locale]/booking/components/EditButtonsForTour";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IBookingTimeActivitySlot } from "@/utils/interface-booking";
import { IBookingParticipants, IBookingPrice, setActiveTimeSlot, setFilterParticipantsCount } from "@/redux/booking/bookingSlice";
import { updateUrlParam } from "@/utils/navigation";
import { getApiData } from "@/utils/api";
import { useEffect, useState } from "react";
import { slotDateTimeToSupabaseTimeZone00, supabaseDateToDayOfWeekMonthDD } from "@/utils/dates-times";
import Title from "@/components/typography/Title";
import { EBookingStatus, IDBBookingDetails } from "@/utils/interface-database";
import TimeRemainingCounter from "./TimeRemainingCounter";
import FormSelectedValuesStatusHeading from "./FormSelectedValuesStatusHeading";
import ModalCancelEdit from "../../CancelTour/components/ModalCancelEdit";
import ZIcon from "@/components/icons/ZIcon";
import ButtonDefault from "@/components/buttons/ButtonDefault";
import PriceGroup from "@/components/typography/PriceGroup";
import { getArrayOfParticipantsForUpdateTheBooking } from "@/utils/booking-client";
import { useRouter } from "@/translations-engine/routing";
import { useTranslations } from "next-intl";

export default function FormSelectedValuesClient(
  {
    slots
  }
    :
    {
      slots: IBookingTimeActivitySlot[]
    }
) {

  const router = useRouter();

  // const price = useAppSelector((state) => state.booking.price);
  // const dates = useAppSelector((state) => state.booking.filters.selectedDates);
  const activeTimeSlot = useAppSelector((state) => state.booking.activeTimeSlot);
  // const filters = useAppSelector((state) => state.booking.filters);
  const booking = useAppSelector((state) => state.booking.booking);
  const dispatch = useAppDispatch();
  const updateUrlParamFor = updateUrlParam();
  const [localSlots, setLocalSlots] = useState<IBookingTimeActivitySlot[]>(slots);
  const [showModalForUpdatingDateTime, setShowModalForUpdatingDateTime] = useState(false);
  const [temporaryNewSelectedDateTime, setTemporaryNewSelectedDateTime] = useState<IBookingTimeActivitySlot | null>(null);
  const [temporaryDate, setTemporaryDate] = useState<string>(
    booking?.date_tour_start?.substring(0, 10) || ""
  );
  const price = useAppSelector((state) => state.booking.price);
  const NETPrice = (booking !== null ? booking?.amount100_paid - booking?.amount100_refunded : 0) / 100;
  const tour = useAppSelector((state) => state.booking.tour);

  const [loading, setLoading] = useState(false);

  const [errorUpdatingDateTime, setErrorUpdatingDateTime] = useState<string | null>(null);
  const [errorUpdatingParticipants, setErrorUpdatingParticipants] = useState<string | null>(null);
  const [showModalForUpdatingParticipants, setShowModalForUpdatingParticipants] = useState(false);
  const [temporaryNewSelectedParticipants, setTemporaryNewSelectedParticipants] = useState<IBookingParticipants | null>(null);
  const [temporaryPrice, setTemporaryPrice] = useState<IBookingPrice | null>(null);

  const tForms = useTranslations("Forms");



  useEffect(() => {
    if (!showModalForUpdatingDateTime) {
      setErrorUpdatingDateTime(null);
    }
  }, [showModalForUpdatingDateTime]);

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

  const ChangeDateTime = async () => {
    setLoading(true);
    setErrorUpdatingDateTime(null);

    const finalDateStart = typeof temporaryDate === "string" && temporaryDate !== "" ? temporaryDate : booking?.date_tour_start?.substring(0, 10) as string;

    const payload = {
      bookingId: booking?.id,
      dateStart: temporaryDate,
      timeStartId: temporaryNewSelectedDateTime?.startTimeId,
      timeStartIdFull: temporaryNewSelectedDateTime?.id,
      time_tour_start_string: temporaryNewSelectedDateTime?.startTime,
      date_tour_start_zone_0: slotDateTimeToSupabaseTimeZone00(
        finalDateStart, temporaryNewSelectedDateTime?.startTime as string
      ),
      start_time_label: `${temporaryNewSelectedDateTime?.startTimeLabel}`
    };
    console.log("payload:", payload);

    const result = await getApiData<{
      ok: boolean,
      message: string,
    }>(
      "/booking-client/update-time-slot-for-confirmed-booking",
      "POST",
      payload,
      "authorize",
      "application/json"
    );

    console.log("Result after changing date / time:", result);

    if (result.ok && result.ok === true) {
      setShowModalForUpdatingDateTime(false);
      updateUrlParamFor('refresh', (new Date()).valueOf())
      // TODO: SHOW MESSAGE
    } else {
      // TODO: SHOW MESSAGE
      setErrorUpdatingDateTime(result.message);
    }

    setLoading(false);
  }

  const LoadTheNewPriceForTheParticipants = async (newParticipants: IBookingParticipants) => {

    setErrorUpdatingParticipants(null);

    const payload = {
      tourId: tour?.id,
      startDate: booking?.date_tour_start?.substring(0, 10),
      participants: newParticipants,
      // slotId: activeTimeSlot?.startTimeId,
      // bookingId: booking?.id,
      rateId: activeTimeSlot?.defaultRateId
    };

    const detailsPrice = await getApiData<{
      ok: boolean;
      message: string;
      price: IBookingPrice;
    }>("/booking-public/get-live-price", "POST", payload, "not-authorize", "application/json");

    console.log("The new list of prices:", detailsPrice, payload);

    if (!detailsPrice.ok) {
      setErrorUpdatingParticipants(`Loading new price error: ${detailsPrice.message}`);
    } else {
      // dispatch(setFilterParticipantsCount(newParticipants));
      setTemporaryPrice(detailsPrice.price)
    }

  }

  const UpdateTheParticipants = async () => {

    if (!tour || !booking || !temporaryNewSelectedParticipants) {
      setErrorUpdatingParticipants("Tour, booking or participants are null / not found.");
      return;
    }

    setErrorUpdatingParticipants(null);
    setLoading(true);

    const payload = {
      participants: getArrayOfParticipantsForUpdateTheBooking(
        tour,
        temporaryNewSelectedParticipants
      ),
      bookingId: booking.id,
      participantsCounts: temporaryNewSelectedParticipants
    };

    const detailsAfterUpdateParticipants = await getApiData<
      {
        ok: boolean,
        message: string,
        feedback: any,
        price: IBookingPrice
      }
    >(
      "/booking-client/update-participants-for-confirmed-booking",
      "POST",
      payload,
      "authorize",
      "application/json"
    );

    console.log("detailsAfterUpdateParticipants:", detailsAfterUpdateParticipants);

    if (!detailsAfterUpdateParticipants.ok) {
      setErrorUpdatingParticipants(detailsAfterUpdateParticipants.message);
    } else {
      // TODO: SHOW MESSAGE
      /*setShowModalForUpdatingParticipants(false);
      // updateUrlParamFor('refresh', (new Date()).valueOf())
      // setTemporaryPrice(detailsAfterUpdateParticipants.price)
      router.push(`/Client/ViewBookingTicket/${booking.id}/payment-detail`);*/

    }

    setLoading(false);
  }

  if (booking === null) {
    return <></>
  }

  return <>
    <form className="form-booking-selection">

      {
        // <SmallDescriptionForTheTour />
      }

      <FormSelectedValuesStatusHeading booking={booking as IDBBookingDetails} />

      {
        booking !== null &&
        <EditButtonsForTour
          slots={localSlots}
          includeEditsButtons={booking.status === EBookingStatus.CONFIRMED && !booking.x24_hours_period_expired}
          onUpdateDates={(dates: string[]) => {
            // dispatch(setActiveTimeSlot(null));
            // updateUrlParamFor('refresh', (new Date()).valueOf())
            console.log("dates:", dates);
            // updateBooking("date_tour_start", dates[0]);
            LoadTheSlotsForTheDate(dates[0]);
            setTemporaryDate(dates[0]);
          }}
          onUpdateTimeSlot={(slot: IBookingTimeActivitySlot) => {
            console.log("the slot: ", slot);
            setShowModalForUpdatingDateTime(true);
            setTemporaryNewSelectedDateTime(slot);
          }}
          onUpdateParticipants={(participants: IBookingParticipants) => {

            /* dispatch(setFilterParticipantsCount(participants))
            updateBooking("count_participants", participants); */

            setShowModalForUpdatingParticipants(true);
            setTemporaryNewSelectedParticipants(participants);

            LoadTheNewPriceForTheParticipants(participants);

          }}
        />
      }


      {
        (
          booking !== null && booking.status === EBookingStatus.CONFIRMED
        ) && <>
          <hr />

          {
            // <CartItemsLines />
          }


          <TimeRemainingCounter expireDate={booking?.date_tour_start_zone_0} />
        </>
      }



    </form>


    <ModalCancelEdit
      title={tForms("approve_date_time_change")}
      description={tForms("approve_date_time_change_desc")}
      handleClose={() => {
        setShowModalForUpdatingDateTime(false);
      }}
      show={showModalForUpdatingDateTime}
      bodyContent={
        <>
          <Title headingType="p" headingStyle="Text-lg-Regular" color="--color-text-fg-subtle" className="mb-0">
            {tForms("the_new_date_time_will_be")}:
          </Title>
          <IconText type="four-tour-item-check" text={`${supabaseDateToDayOfWeekMonthDD(temporaryDate)} ${temporaryNewSelectedDateTime && temporaryNewSelectedDateTime?.startTime}`} iconType="calendar-check-outline" />

          <Title headingType="p" headingStyle="Text-lg-Regular" color="--color-text-fg-subtle">{tForms('description_what_will_happen_after_approve')}</Title>
        </>
      }

      footerContent={
        <>
          <ButtonDefault
            label={tForms('update_date_time')}
            variant="primary"
            loading={loading}
            onClick={() => {
              ChangeDateTime();
            }} />

          {
            errorUpdatingDateTime !== null && <IconText
              className="w-100" type="icon-text-label-solid" variation="warning-solid"
              text={tForms("error_while_updating_the_date_time")}
              subText={errorUpdatingDateTime}
              iconType="danger-outline" />
          }

          <ButtonDefault label={tForms("cancel")} variant="light" onClick={() => {
            setShowModalForUpdatingDateTime(false)
          }} />
        </>
      }

    />


    <ModalCancelEdit
      title={tForms("participants_change")}
      description={tForms("participants_change_question")}
      handleClose={() => {
        setShowModalForUpdatingParticipants(false);
      }}
      show={showModalForUpdatingParticipants}
      bodyContent={
        <>




          <Title headingType="p" headingStyle="Text-lg-Regular" color="--color-text-fg-subtle" className="mb-0">{tForms('actual_paid')}</Title>
          <>
            <PriceGroup price={NETPrice} discountPercent={0} text={tForms("total_net")} type="cart-item" bolder={true} />
          </>

          <hr className="my-4" />

          <Title headingType="p" headingStyle="Text-lg-Regular" color="--color-text-fg-subtle" className="mb-0">{tForms("the_new_counts_of_participants")}:</Title>

          <CartItemsLines
            participants={temporaryNewSelectedParticipants}
            price={temporaryPrice}
            tourOut={tour}
            className="mt-3"
          />


          <hr className="my-4" />

          {
            temporaryPrice !== null && <>


              {
                temporaryPrice.total_discount > NETPrice ?
                  <>
                    <Title headingType="p" headingStyle="Text-lg-Regular" color="--color-text-fg-subtle" className="mb-3">{tForms("you_will_be_additional_charged")}:</Title>
                    <PriceGroup price={temporaryPrice.total_discount - NETPrice} discountPercent={0} text="TOTAL" type="cart-item" bolder={true} />
                  </>
                  : null
              }

              {
                temporaryPrice.total_discount < NETPrice ?
                  <>
                    <Title headingType="p" headingStyle="Text-lg-Regular" color="--color-text-fg-subtle" className="mb-3">{tForms("you_will_be_refunded")}:</Title>
                    <PriceGroup price={temporaryPrice.total_discount - NETPrice} discountPercent={0} text={tForms("total").toUpperCase()} type="cart-item" bolder={true} />
                  </>
                  : null
              }

              {
                temporaryPrice.total_discount === NETPrice ?
                  <>
                    <Title headingType="p" headingStyle="Text-lg-Regular" color="--color-text-fg-subtle" className="mb-3">{tForms("no_change_in_price")}</Title>
                  </>
                  : null
              }

            </>
          }


        </>
      }

      footerContent={
        <>
          <ButtonDefault
            label={tForms("update_participants")}
            variant="primary"
            loading={loading}
            onClick={() => {
              UpdateTheParticipants();
            }} />

          {
            errorUpdatingParticipants !== null && <IconText
              className="w-100" type="icon-text-label-solid" variation="warning-solid"
              text={tForms("error_changing_participants")}
              subText={errorUpdatingParticipants}
              iconType="danger-outline" />
          }

          <ButtonDefault label={tForms("cancel")} variant="light" onClick={() => {
            setShowModalForUpdatingParticipants(false)
          }} />
        </>
      }

    />



  </>
}