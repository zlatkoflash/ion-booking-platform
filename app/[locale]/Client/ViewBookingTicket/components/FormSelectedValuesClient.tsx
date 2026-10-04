"use client";


import IconText from "@/components/buttons/IconText";
import CartItemsLines, { CartLineItemsForUpdatingBookingProduct } from "@/components/typography/CartItemsLines";
import SmallDescriptionForTheTour from "@/app/[locale]/tour/[slug]/SmallDescriptionForTheTour";
import EditButtonsForTour from "@/app/[locale]/booking/components/EditButtonsForTour";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IBookingTimeActivitySlot } from "@/utils/interface-booking";
import { IBookingParticipants, ISingleActivityPrice, setActiveTimeSlot, setFilterParticipantsCount, setPrice } from "@/redux/booking/bookingSlice";
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
import { getArrayOfParticipantsForUpdateTheBooking, updateBookedProduct } from "@/utils/booking-client";
import { useRouter } from "@/translations-engine/routing";
import { useLocale, useTranslations } from "next-intl";
import { setGlobalToaster } from "@/redux/controls/controlsSlice";

export default function FormSelectedValuesClient(
  {
    slots,
    bookedProductPrice,
    bookedParticipants,
    productConfirmationCode,
    productBooking
  }
    :
    {
      slots: IBookingTimeActivitySlot[];
      bookedProductPrice: ISingleActivityPrice;
      bookedParticipants: IBookingParticipants;
      productConfirmationCode: string;
      productBooking: IDBBookingDetails;
    }
) {

  const router = useRouter();

  // const price = useAppSelector((state) => state.booking.price_active_product);
  // const dates = useAppSelector((state) => state.booking.filters.selectedDates);
  const activeTimeSlot = useAppSelector((state) => state.booking.activeTimeSlot);
  // const filters = useAppSelector((state) => state.booking.filters);
  const booking = useAppSelector((state) => state.booking.booked_product);
  const dispatch = useAppDispatch();
  const updateUrlParamFor = updateUrlParam();
  const [localSlots, setLocalSlots] = useState<IBookingTimeActivitySlot[]>(slots);
  // const [showModalForUpdatingDateTime, setShowModalForUpdatingDateTime] = useState(false);
  // const [temporaryNewSelectedDateTime, setTemporaryNewSelectedDateTime] = useState<IBookingTimeActivitySlot | null>(null);
  const [temporaryDate, setTemporaryDate] = useState<string>(
    booking?.date_tour_start?.substring(0, 10) || ""
  );
  const productReduxPrice = useAppSelector((state) => state.booking.price_active_product);
  // const NETPrice = (booking !== null ? booking?.amount100_paid - booking?.amount100_refunded : 0) / 100;
  const tour = useAppSelector((state) => state.booking.tour);
  const participantsRedux = useAppSelector((state) => state.booking.filters.participantsCount);

  const sessionSingleTempProduct = useAppSelector((state) => state.booking.cart.cart_session_id_single_product_check_price);

  const [loading, setLoading] = useState(false);

  // const [errorUpdatingDateTime, setErrorUpdatingDateTime] = useState<string | null>(null);
  // const [errorUpdatingParticipants, setErrorUpdatingParticipants] = useState<string | null>(null);
  // const [showModalForUpdatingParticipants, setShowModalForUpdatingParticipants] = useState(false);
  const [temporaryNewSelectedParticipants, setTemporaryNewSelectedParticipants] = useState<IBookingParticipants | null>(null);
  const [temporaryPrice, setTemporaryPrice] = useState<ISingleActivityPrice | null>(null);

  const tForms = useTranslations("Forms");
  const tCommon = useTranslations("Common");
  const locale = useLocale();

  //  const sessionSingleProduct = useAppSelector((state) => state.booking.cart.cart_session_id_single_product_check_price);

  const [showButtonnsForUpdate, setShowButtonnsForUpdate] = useState(false);

  const [updatingErrorMessage, setUpdatingErrorMessage] = useState<string | null>(null);
  const [updatingSuccessMessage, setUpdatingSuccessMessage] = useState<string | null>(null);



  /*useEffect(() => {
    if (!showModalForUpdatingDateTime) {
      setErrorUpdatingDateTime(null);
    }
  }, [showModalForUpdatingDateTime]);*/

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

  /*const ChangeDateTime = async () => {
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
      start_time_label: `${temporaryNewSelectedDateTime?.startTimeLabel}`,
      language: locale
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
      updateUrlParamFor('dt', (new Date()).valueOf());
      dispatch(setGlobalToaster({
        show: true,
        title: tCommon("booking_updated_successfully"),
        message: tCommon("date_time_updated_successfully"),
        type: "info"
      }))
      // TODO: SHOW MESSAGE
    } else {
      // TODO: SHOW MESSAGE
      setErrorUpdatingDateTime(result.message);
    }

    setLoading(false);
  }*/

  const LoadPriceDifferences = async (
    newParticipants: IBookingParticipants | null,
    timeSlotNew: IBookingTimeActivitySlot | null = null,
    dateNew: string | null = null
  ) => {

    const timeSlowFor = timeSlotNew !== null ? timeSlotNew : activeTimeSlot;
    const dateFor = dateNew !== null ? dateNew : (
      temporaryDate !== undefined ? temporaryDate : booking?.date_tour_start?.substring(0, 10)
    );

    // setErrorUpdatingParticipants(null);

    const payload = {
      productConfirmationCode: productConfirmationCode,
      // participants_old: bookedParticipants,
      participants_new: newParticipants !== null ? newParticipants : participantsRedux,
      sessionCartTemporaryProduct: sessionSingleTempProduct,
      date: dateFor,
      startTimeId: timeSlowFor?.startTimeId,
      rateId: timeSlowFor?.defaultRateId,
      startTimeLabel: timeSlowFor?.startTimeLabel,
      startTime: timeSlowFor?.startTime
    };

    const detailsPrice = await getApiData<{
      ok: boolean;
      message: string;
      price_new: ISingleActivityPrice;
    }>("/booking-public/get-live-new-price-for-booked-product", "POST", payload, "not-authorize", "application/json");

    console.log("The new list of prices:", detailsPrice, payload);

    if (!detailsPrice.ok) {
      // setErrorUpdatingParticipants(`Loading new price error: ${detailsPrice.message}`);
    } else {
      // dispatch(setFilterParticipantsCount(newParticipants));
      setTemporaryPrice(detailsPrice.price_new);
      dispatch(setPrice(detailsPrice.price_new));
    }

  }

  /*const UpdateTheParticipants = async () => {

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
      participantsCounts: temporaryNewSelectedParticipants,
      language: locale
    };

    const detailsAfterUpdateParticipants = await getApiData<
      {
        ok: boolean,
        message: string,
        feedback: any,
        price: ISingleActivityPrice
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


      updateUrlParamFor('pc', (new Date()).valueOf());
      setShowModalForUpdatingParticipants(false);
      setErrorUpdatingParticipants(null);
      dispatch(setGlobalToaster({
        show: true,
        title: tCommon("booking_updated_successfully"),
        message: tCommon("participants_updated_successfully"),
        type: "info"
      }))
    }

    setLoading(false);
  }*/

  const UpdateTheBooking = async () => {

    setLoading(true);
    setUpdatingErrorMessage(null);
    setUpdatingSuccessMessage(null);

    /*const resultUpdating = await getApiData(
      "/booking-client/update-booked-product",
      "POST",
      {
        productConfirmationCode: productConfirmationCode
      },
      "authorize",
      "application/json"
    );*/
    const resultUpdating = await updateBookedProduct(
      // productConfirmationCode
      {
        productConfirmationCode: productBooking?.confirmation_code_product || '',
        language: locale,
        date: temporaryDate,
        startTimeId: activeTimeSlot?.startTimeId as number,
        participants_new: temporaryNewSelectedParticipants as IBookingParticipants,
        rateId: activeTimeSlot?.defaultRateId as number,
        sessionCartTemporaryProduct: sessionSingleTempProduct,
        startTime: activeTimeSlot?.startTime as string,
        startTimeLabel: activeTimeSlot?.startTimeLabel as string
      }
    );

    console.log("resultUpdating:", resultUpdating);
    if (resultUpdating.ok) {
      updateUrlParamFor('refresh', (new Date()).valueOf())
    }
    else {
      setUpdatingErrorMessage(resultUpdating.message || "Updating the booking failed")
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
            LoadPriceDifferences(null, null, dates[0]);

            setShowButtonnsForUpdate(true)
          }}
          onUpdateTimeSlot={(slot: IBookingTimeActivitySlot) => {
            console.log("the slot: ", slot);
            // setShowModalForUpdatingDateTime(true);
            // setTemporaryNewSelectedDateTime(slot);
            LoadPriceDifferences(null, slot, null)
            setShowButtonnsForUpdate(true)
          }}
          onUpdateParticipants={(participants: IBookingParticipants) => {

            /* dispatch(setFilterParticipantsCount(participants))
            updateBooking("count_participants", participants); */

            // setShowModalForUpdatingParticipants(true);
            setTemporaryNewSelectedParticipants(participants);
            LoadPriceDifferences(participants, null, null);
            setShowButtonnsForUpdate(true)
            dispatch(setFilterParticipantsCount(participants))

          }}
        />
      }



      {
        showButtonnsForUpdate === true && <>
          <CartLineItemsForUpdatingBookingProduct
            bookedProductPrice={bookedProductPrice}
            bookedParticipants={bookedParticipants}
          />
          <hr />
          <CartLineItemsForUpdatingBookingProduct
            bookedProductPrice={productReduxPrice}
            bookedParticipants={participantsRedux}
            title="New Price"
          />

          <hr />

          {
            productBooking.initial_payment_is_done === true && <>
              {

                productReduxPrice.priceWithDiscount - bookedProductPrice.priceWithDiscount < 0

                && <PriceGroup className="mb-2" price={productReduxPrice.priceWithDiscount - bookedProductPrice.priceWithDiscount} text={"You will be refunded difference"} type="cart-item" bolder={true} />
              }

              {
                productReduxPrice.priceWithDiscount - bookedProductPrice.priceWithDiscount > 0 && <PriceGroup className="mb-2" price={productReduxPrice.priceWithDiscount - bookedProductPrice.priceWithDiscount} text={"You will be charged difference"} type="cart-item" bolder={true} />
              }
            </>
          }



          <ButtonDefault
            label={"Update the booking"}
            variant="primary"
            loading={loading}
            onClick={() => {
              // ChangeDateTime();
              UpdateTheBooking();
            }}
            className="w-100"
          />

          {updatingErrorMessage !== null && <IconText
            className="w-100" type="icon-text-label-solid" variation="warning-solid"
            text={"Updating the booking failed"}
            subText={updatingErrorMessage}
            iconType="danger-outline" />}

          {updatingSuccessMessage !== null && <IconText
            className="w-100" type="icon-text-label-solid" variation="success"
            text={"Updating the booking was successful"}
            subText={updatingSuccessMessage}
            iconType="check" />}

        </>
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


    {
      /*<ModalCancelEdit
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
              // ChangeDateTime();
            }} />

          {
            errorUpdatingDateTime !== null && <IconText
              className="w-100" type="icon-text-label-solid" variation="warning-solid"
              text={tForms("error_while_updating_the_date_time")}
              subText={errorUpdatingDateTime}
              iconType="danger-outline" />
          }

          <ButtonDefault loading={loading} label={tForms("cancel")} variant="light" onClick={() => {
            setShowModalForUpdatingDateTime(false)
          }} />
        </>
      }

    />*/
    }


    {
      /*<ModalCancelEdit
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
            <PriceGroup
              price={NETPrice}
              // discountPercent={0} 
              text={tForms("total_net")} type="cart-item" bolder={true} />
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
                temporaryPrice.total > NETPrice ?
                  <>
                    <Title headingType="p" headingStyle="Text-lg-Regular" color="--color-text-fg-subtle" className="mb-3">{tForms("you_will_be_additional_charged")}:</Title>
                    <PriceGroup price={temporaryPrice.total - NETPrice}
                      // discountPercent={0} 
                      text={tForms("total").toLocaleUpperCase()} type="cart-item" bolder={true} />
                  </>
                  : null
              }

              {
                temporaryPrice.total < NETPrice ?
                  <>
                    <Title headingType="p" headingStyle="Text-lg-Regular" color="--color-text-fg-subtle" className="mb-3">{tForms("you_will_be_refunded")}:</Title>
                    <PriceGroup price={temporaryPrice.total - NETPrice}
                      // discountPercent={0} 
                      text={tForms("total").toLocaleUpperCase()} type="cart-item" bolder={true} />
                  </>
                  : null
              }

              {
                temporaryPrice.total === NETPrice ?
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
              // UpdateTheParticipants();
            }} />

          {
            errorUpdatingParticipants !== null && <IconText
              className="w-100" type="icon-text-label-solid" variation="warning-solid"
              text={tForms("error_changing_participants")}
              subText={errorUpdatingParticipants}
              iconType="danger-outline" />
          }

          <ButtonDefault loading={loading} label={tForms("cancel")} variant="light" onClick={() => {
            setShowModalForUpdatingParticipants(false)
          }} />
        </>
      }

    />*/
    }



  </>
}