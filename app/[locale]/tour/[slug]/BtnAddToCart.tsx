"use client";

import ButtonDefault from "@/components/buttons/ButtonDefault";
import IconText from "@/components/buttons/IconText";
import { ZIconType } from "@/components/icons/ZIcon";
import { setCartDetails } from "@/redux/booking/bookingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getApiData } from "@/utils/api";
import { AddActivityToCart } from "@/utils/cart";
// import { getCartSessionId } from "@/utils/cart-server";
import { slotDateTimeToSupabaseTimeZone00 } from "@/utils/dates-times";
import { IBokunCart } from "@/utils/interface-bokun";
import { IBookingTimeActivitySlot } from "@/utils/interface-booking";
import { IDBTourIncludeDetails } from "@/utils/interface-database";
import { updateUrlParam } from "@/utils/navigation";
import { ON_CART_UPDATED } from "@/utils/window-events";
import { useLocale, useTranslations } from "next-intl";

import { useState } from "react";

export default function BtnAddToCart() {


  const updateUrlParamFor = updateUrlParam();

  const dispatch = useAppDispatch()

  const tForms = useTranslations("Forms");
  const locale = useLocale();


  const tour = useAppSelector((state) => state.booking.tour);
  const timeSlot = useAppSelector((state) => state.booking.activeTimeSlot);
  const bookingFilters = useAppSelector((state) => state.booking.filters);
  const browserGuestId = useAppSelector((state) => state.auth.browser_user_id);
  const priceLoading = useAppSelector((state) => state.booking.price_active_product.loading)

  const [loading, setLoading] = useState(false);
  const [icon, setIcon] = useState<ZIconType>("cart");

  const [errorMessage, setErrorMessage] = useState<string>("");


  const cart = useAppSelector((state) => state.booking.cart);

  const AddToCart = async () => {
    setLoading(true);
    setErrorMessage("")


    /*const result = await getApiData<{
      ok: boolean,
      detailsAddingToCartSC: IBokunCart,
      message: string
    }>("/booking-public/add-activity-to-cart", "POST", {
      sessionId: cart.cart_session_id,
      tour_id: tour?.id,
      startTimeId: timeSlot?.startTimeId,
      participantsCount: bookingFilters.participantsCount,
      date_start: bookingFilters.selectedDates[0],
      start_time: timeSlot?.startTime,
      browser_id: browserGuestId,
      language: locale,
      start_time_label: timeSlot?.startTimeLabel,
      date_tour_start_zone_0: slotDateTimeToSupabaseTimeZone00(
        bookingFilters.selectedDates[0], timeSlot?.startTime as string
      ),
      rateId: timeSlot?.defaultRateId
    }, "not-authorize", "application/json");*/

    const result = await AddActivityToCart(
      cart.cart_session_id,
      tour as IDBTourIncludeDetails,
      timeSlot as IBookingTimeActivitySlot,
      bookingFilters.participantsCount,
      bookingFilters.selectedDates[0],
      browserGuestId as string,
      locale as string
    );

    if (result.ok) {
      setIcon("check");
      setTimeout(() => {
        setIcon("cart");

        // updateUrlParamFor('refresh', (new Date()).valueOf());

        if (result.ok) {
          dispatch(setCartDetails({ cart: result.detailsAddingToCartSC }))
        }

      }, 1 * 1000);
      // window.dispatchEvent(new CustomEvent(ON_CART_UPDATED))
    }
    else {
      setErrorMessage(result.message)
    }


    console.log("result:", result);

    setLoading(false);
  }

  return <>
    <ButtonDefault
      label={tForms("add_to_cart")}
      variant="dark"
      iconType={icon}
      loading={loading || priceLoading}
      onClick={(e) => {
        AddToCart()
      }}
    />
    {errorMessage !== "" && <IconText fullWidthCentered={true} type="icon-text-alert" iconType="danger-outline" text={errorMessage} variation="warning-solid" />}
  </>
}