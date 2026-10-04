"use client";

import ButtonDefault from "@/components/buttons/ButtonDefault";
import IconText from "@/components/buttons/IconText";
import CartItemsLines, { CartItemsLinesForCart } from "@/components/typography/CartItemsLines";
import Title from "@/components/typography/Title";
import { IBookingParticipants, ISingleActivityPrice, setCartDetails } from "@/redux/booking/bookingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "@/translations-engine/routing";
import { getApiData } from "@/utils/api";
import { ProcessTheCartToReservedBooking } from "@/utils/booking-client";
import { IDBBooking, IDBBookingDetails, IDBTourIncludeDetails } from "@/utils/interface-database";
import { error } from "console";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

export default function BookingFormCartItems(

) {

  // const countItems = participants.adults + participants.children + participants.infants;
  const router = useRouter();

  const tCommon = useTranslations("Common");

  const cart = useAppSelector((state) => state.booking.cart);
  const cartDetails = cart.cartDetails;
  const browserGuestId = useAppSelector((state) => state.auth.browser_user_id);
  const locale = useLocale();

  // cartDetails.id

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")

  const dispatch = useAppDispatch()

  const userAuth = useAppSelector((state) => state.auth.user);

  const ReserveTheBooking = async () => {

    setLoading(true)
    setErrorMessage("")


    const details = await ProcessTheCartToReservedBooking(

      userAuth,
      cart.cart_session_id,
      locale,
      browserGuestId as string

    );


    console.log('details:', details);

    if (!details.ok) {
      setErrorMessage("Failed Reserved Booking...");
    }
    else {
      dispatch(setCartDetails({ cart: null }))
      // window.location.href = `/${locale}/checkout/${details.booking.id}`
      router.push(`/booking/${details.booking.id}/details`);
    }

    setLoading(false);

  }


  if (cartDetails === null) return <></>

  return <>
    <form className="form-booking-selection">


      <Title headingType="h3" headingStyle="Text-xl-Semibold" color="--color-text-fg">
        {tCommon("subtotal")} ({cartDetails.activityBookings.length}) {cartDetails.activityBookings.length === 1 ? "item" : "items"}
      </Title>

      {/* <CartItemsLines
        participants={participants}
        price={price}
        tourOut={tour}
      /> */}
      <CartItemsLinesForCart />

      <ButtonDefault label={tCommon("go_to_checkout")}
        variant="primary"
        loading={loading}
        onClick={() => {
          // router.push(`/booking/${booking.id}/details`);

          ReserveTheBooking()

        }} className="d-flex w-100" disabled={cartDetails.activityBookings.length === 0} />

      {
        errorMessage !== "" && <IconText className="mt-3" type="icon-text-alert" iconType="danger-outline" text={errorMessage} variation="warning-solid" fullWidthCentered={true} />
      }


      <ButtonDefault label={"Continue Shopping"}
        variant="outline-primary"

        loading={loading}
        onClick={() => {
          // router.push(`/booking/${booking.id}/details`);
          router.push("/experiences-search")

        }} className="d-flex w-100 mt-3" />

    </form>

  </>
}