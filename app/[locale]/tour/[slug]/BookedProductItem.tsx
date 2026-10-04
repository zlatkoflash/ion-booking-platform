"use client";

import ZIcon from "@/components/icons/ZIcon";
import ZPicture from "@/components/illustrations/ZPicture";
import Title from "@/components/typography/Title";
import { IBookingParticipants, ISingleActivityPrice, initialState, setActiveTimeSlot, setFilterParticipantsCount, setInitialHydratingData, setPrice } from "@/redux/booking/bookingSlice";
import { getArrayOfParticipantsForUpdateTheBooking, getParticipantsLabel } from "@/utils/booking-client";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import SmallDescriptionForTheTour from "./SmallDescriptionForTheTour";
import EditButtonsForTour from "../../booking/components/EditButtonsForTour";
import CartItemsLines from "@/components/typography/CartItemsLines";
import { IBookingTimeActivitySlot } from "@/utils/interface-booking";
import { getApiData } from "@/utils/api";
import { slotDateTimeToSupabaseTimeZone00 } from "@/utils/dates-times";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateUrlParam } from "@/utils/navigation";
import IconText from "@/components/buttons/IconText";
import { EBookingStatus, IDBBookingDetails, IDBTourIncludeDetails } from "@/utils/interface-database";
import ButtonDefault from "@/components/buttons/ButtonDefault";
import { IBookedProductDetails } from "../../booking/components/BookingItemsCheckout";

export default function BookedProductItem(
  {
    title,
    description,
    thumbnail_url,
    price_total,
    participants,
    // toggleTheProduct,
    // activeProductId,
    productConfirmationCode,
    dateString,
    single_product_view_details
  }
    :
    {
      title: string;
      description: string;
      thumbnail_url: string;
      price_total: number;
      participants: IBookingParticipants;
      // toggleTheProduct: (id: string | null) => void;
      // activeProductId: string | null;
      productConfirmationCode: string;
      dateString: string;
      single_product_view_details: IBookedProductDetails | null;
    }
) {

  const tForms = useTranslations("Forms");

  // const [formIsOpened, setFormIsOpened] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [localSlots, setLocalSlots] = useState<IBookingTimeActivitySlot[]>([]);

  const [formIsOpened, setFormIsOpened] = useState(false);
  const [loading, setLoading] = useState(false);


  const dispatch = useAppDispatch();
  // const updateUrlParamFor = updateUrlParam();


  const activeTimeSlot = useAppSelector((state) => state.booking.activeTimeSlot);
  const booking = useAppSelector((state) => state.booking.booked_product);
  // const tour = useAppSelector((state) => state.booking.tour);
  // const dispatch = useAppDispatch();
  // const updateUrlParamFor = updateUrlParam();

  const [selectedDate, setSelectedDate] = useState(booking?.date_tour_start?.substring(0, 10)); // YYYY-MM-DD

  const [slots, setSlots] = useState<IBookingTimeActivitySlot[]>([]);

  const filters = useAppSelector((state) => state.booking.filters);

  const [loadingBookingProduct, setLoadingBookingProduct] = useState(false);

  const [highDemandForToday, setHighDemandForToday] = useState(false);
  const [booked_today, setBookedToday] = useState(0);

  const [showUpdateButton, setShowUpdateButton] = useState(false)

  const [bookedProductPrice, setBookedProductPrice] = useState<ISingleActivityPrice | null>(null)
  const [bookedParticipants, setBookedParticipants] = useState<IBookingParticipants | null>(null)

  const participantsRedux = useAppSelector((state) => state.booking.filters.participantsCount);


  const updateUrlParamFor = updateUrlParam();

  const authUser = useAppSelector((state) => state.auth.user);
  const sessionSingleTempProduct = useAppSelector((state) => state.booking.cart.cart_session_id_single_product_check_price);


  const LoadTheNewPrice = async (
    newParticipants: IBookingParticipants | null = null,
    timeSlotNew: IBookingTimeActivitySlot | null = null,
    dateNew: string | null = null
  ) => {
    setLoading(true);

    console.log("participantsRedux::::", participantsRedux);

    const timeSlowFor = timeSlotNew !== null ? timeSlotNew : activeTimeSlot;
    const dateFor = dateNew !== null ? dateNew : (
      selectedDate !== undefined ? selectedDate : booking?.date_tour_start?.substring(0, 10)
    );

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

    console.log("payload::::", payload);

    const result = await getApiData<{
      price_new: ISingleActivityPrice,
      ok: boolean,
      message: string
    }>("/booking-public/get-live-new-price-for-booked-product", "POST",
      /*{
      productConfirmationCode: productConfirmationCode,
      participants: newParticipants !== null ? newParticipants : participantsRedux
    },*/
      payload,
      "not-authorize", "application/json");



    console.log("result::::::", result);

    if (result.ok) {
      dispatch(setPrice(result.price_new));
      console.log("new Price: ", result.price_new);
    }
    else {
      console.error("Error loading the new price: ", result.message);
    }

    setLoading(false)
  }

  const [errorWhileUpdating, setErrorWhileUpdating] = useState("");
  const [successWhileUpdating, setSuccessWhileUpdating] = useState("");

  const UpdateReservedProduct = async () => {

    setErrorWhileUpdating("")
    setSuccessWhileUpdating("")
    setLoading(true)

    console.log("activeTimeSlot:::", activeTimeSlot);

    const payload = {
      productConfirmationCode: productConfirmationCode,
      participants_old: bookedParticipants,
      participants_new: participantsRedux,
      sessionCartTemporaryProduct: sessionSingleTempProduct,
      date: selectedDate !== undefined ? selectedDate : booking?.date_tour_start?.substring(0, 10),
      startTimeId: activeTimeSlot?.startTimeId,
      rateId: activeTimeSlot?.defaultRateId,
      startTimeLabel: activeTimeSlot?.startTimeLabel,
      startTime: activeTimeSlot?.startTime
    };
    console.log("Payload for updating reserved booking:", payload);

    const result = await getApiData<{
      ok: boolean,
      message: string
    }>("/booking-public/update-reserved-product", "POST", payload, authUser !== null ? "authorize" : "not-authorize", "application/json");

    if (result.ok === true) {
      setSuccessWhileUpdating(result.message);
      updateUrlParamFor("refresh", new Date().valueOf())
    }
    else {
      setErrorWhileUpdating(result.message)
    }

    console.log("result:", result);

    setLoading(false);
  }


  useEffect(() => {


    if (single_product_view_details === null) {
      return;
    }

    setHighDemandForToday(single_product_view_details.highDemandForToday);
    setBookedToday(single_product_view_details.booked_today);
    setSlots(single_product_view_details.slots)

    setBookedProductPrice(single_product_view_details.price);
    setBookedParticipants(participants);
    dispatch(setInitialHydratingData({
      activeTimeSlot: single_product_view_details.activeTimeSlot,
      tour: single_product_view_details.tour,
      // price: results.price,
      price: initialState.price_active_product,
      participants: participants,
      booking: single_product_view_details.booking
    }));

  }, [single_product_view_details]);

  console.log("Product code:", productConfirmationCode);

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


    LoadTheNewPrice(null, newSlot, null);


    dispatch(setActiveTimeSlot(newSlot));
    setShowUpdateButton(true)

  }

  console.log("Form update the detais...");

  const updateTheParticipants = async (newParticipants: IBookingParticipants) => {



    setShowUpdateButton(true);
    dispatch(setFilterParticipantsCount(newParticipants));
    LoadTheNewPrice(
      newParticipants
    );

  }


  return <>
    <div className={`form-booking-selection`}>
      {
        // <SmallDescriptionForTheTour />
      }


      <div className="controls-top-right-mobile d-block">
        <ZIcon type="keyboard-arrow-left" className={`arrow-for ${single_product_view_details !== null ? 'active' : ''}`} onClick={() => {
          // setFormIsOpened(!formIsOpened);
          // toggleTheProduct(activeProductId === productConfirmationCode ? null : productConfirmationCode)
          if (single_product_view_details === null)
            updateUrlParamFor("view-booked-product", productConfirmationCode)
          else
            updateUrlParamFor("view-booked-product", 'none')
        }} />
      </div>


      {
        single_product_view_details === null && <div className="small-description-for-tour only-for-mobile d-flex">
          <ZPicture pictureUrl={thumbnail_url} alt={title as string} width={300} height={300} />
          <div className="small-description-content">
            <Title headingType="p" headingStyle="Text-md-Medium" color="--color-text-fg">{title}</Title>
          </div>
          <Title headingType="span" headingStyle="Text-md-Regular" className="mb-0">
            {dateString}
          </Title>
          <Title headingType="h3" headingStyle="Text-md-Semibold" color="--color-text-fg" className="price-title mb-0" >
            TOTAL (<Title headingType="span" headingStyle="Text-md-Regular">{
              getParticipantsLabel(participants, tForms.raw("participantsObjectTranslation"))
            }</Title>) €{price_total.toFixed(2)}
          </Title>
        </div>
      }

      {
        /*(activeProductId === productConfirmationCode && loadingBookingProduct) && <>
          <IconText type="icon-text-alert" variation="warning-solid" text="Loading..." fullWidthCentered={true} />
        </>*/
      }



      {
        (

          single_product_view_details !== null

        ) && <>

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
                    setShowUpdateButton(true)
                    LoadTheNewPrice(null, null, dates[0]);
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

                  includeEditsButtons={
                    // booking.status === EBookingStatus.RESERVED && !booking.is_expired
                    true
                  }

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

            <CartItemsLines bookedProductPriceDetails={bookedParticipants !== null && bookedProductPrice !== null ? {
              participants: bookedParticipants,
              price: bookedProductPrice
            } : null} />



            {
              showUpdateButton === true && <>

                <hr />
                <ButtonDefault
                  label="Update The Reserved Product"
                  variant="primary"
                  className="w-100 f-flex"
                  loading={loading}
                  onClick={() => {
                    UpdateReservedProduct()
                  }}
                />

                {errorWhileUpdating !== "" && <IconText subText={errorWhileUpdating} text={tForms("error_occurred")} type="icon-text-alert" variation="warning-solid" fullWidthCentered={true} iconType="danger-outline" className="mt-3" />}
                {successWhileUpdating !== "" && <IconText subText={successWhileUpdating} text={tForms("success")} type="icon-text-alert" variation="success" fullWidthCentered={true} iconType="calendar-check-outline" className="mt-3" />}

                <hr />
              </>
            }


            {
              /*price.total > price.total && <IconText text={tForms("save_with_this_special_offer", {
                price: `€${(price.total - price.total).toFixed(2)}`
              })} type="icon-text-alert" variation="success" fullWidthCentered={true} iconType="sell-outline" />*/
            }


            {
              highDemandForToday ? <IconText iconType="danger-outline" type="icon-text-alert" variation="danger" text={`High demand – booked ${booked_today} times today`} key={'alert-for-hight-demand'} fullWidthCentered={true} />
                :
                <span key={'no-demand'} />
            }


          </div>

        </>
      }




    </div>
  </>
}