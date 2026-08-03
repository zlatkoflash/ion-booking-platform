"use client";

import ButtonDefault from "@/components/buttons/ButtonDefault";
import IconText from "@/components/buttons/IconText";
import Title from "@/components/typography/Title";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "@/translations-engine/routing";
import { getApiData } from "@/utils/api";
import { EBookingStatus } from "@/utils/interface-database";
import { getStripeCustomerId_ByBooking } from "@/utils/stripe";
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function BookingCheckoutFooter() {

  const price = useAppSelector((state) => state.booking.price);
  const booking = useAppSelector((state) => state.booking.booking);
  const whenToPay = useAppSelector((state) => state.booking.whenToPay);
  const payWith = useAppSelector((state) => state.booking.payWith);
  const cardHolderName = useAppSelector((state) => state.booking.cardHolderName);
  const authUser = useAppSelector((state) => state.auth.user);

  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const tForms = useTranslations("Forms");
  const tValidations = useTranslations("Validation");

  const processPayment = async () => {

    setLoading(true);
    setErrorMessage("");

    if (stripe === null) {
      setLoading(false);
      setErrorMessage(tValidations("paymentGatewayNotAvailable"))
      return;
    }

    if (elements === null) {
      setLoading(false);
      setErrorMessage(tValidations("paymentGatewayNotAvailable"))
      return;
    }

    // getting stripe customer id
    const stripeCustomerId_details = await getStripeCustomerId_ByBooking(booking?.id as string);

    const cardElement = elements.getElement(CardNumberElement);
    // const cvcElement = elements.getElement(CardCvcElement);
    // const expiryElement = elements.getElement(CardExpiryElement);
    if (!cardElement) {
      setLoading(false);
      setErrorMessage(tValidations("cardInfoNotAvailable"))
      return;
    }

    // getting method intent from customer for feature independent from booking flow
    const customerIntentDetails = await getApiData<{
      ok: boolean,
      message: string,
      clientSecret: string
    }>(`/booking-public/setup-intent-for-payment-method`, "POST", {
      customer_id: stripeCustomerId_details?.stripe_customer_id,
      payment_method_type: "card",
    }, "not-authorize", "application/json");

    if (typeof customerIntentDetails.clientSecret !== "string" || customerIntentDetails.clientSecret === "") {
      setLoading(false);
      setErrorMessage(tValidations("paymentGatewayNotAvailable"))
      return;
    }


    // now by that intent we create a payment method from card info
    const { setupIntent, error: setupError } = await stripe.confirmCardSetup(customerIntentDetails.clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: cardHolderName,
          email: booking?.customer_details.email_address,
          address: {
            line1: booking?.customer_details.address,
            city: booking?.customer_details.city,
          }
        },
      },
    });
    console.log("setupIntent:", setupIntent);
    if (setupError !== null && setupError !== undefined) {
      setLoading(false);
      setErrorMessage(setupError.message || tValidations("paymentGatewayNotAvailable"))
      return;
    }



    const details = await getApiData<{
      ok: boolean,
      message: string
    }>(`/booking-public/set-payment-method-for-booking`, "POST", {
      booking_id: booking?.id,
      customer_id: stripeCustomerId_details?.stripe_customer_id,
      payment_method_id: setupIntent?.payment_method,
      payment_method_details: setupIntent
    },
      authUser === null ? "not-authorize" : "authorize"
      , "application/json");

    console.log("Details after updating the payment method:", details);
    // stripeCustomerId_details.
    console.log("stripeCustomerId_details:", stripeCustomerId_details);

    if (details.ok !== true) {
      setLoading(false);
      setErrorMessage(details.message || tValidations("paymentGatewayNotAvailable"))
      return;
    }

    // const resultAfterReservation = await dispatch();
    const resultAfterReservation = await getApiData<{
      ok: boolean,
      message: string,
      bookingHash: string | null
    }>(
      "/booking-public/book-the-experience",
      "POST",
      {
        booking_id: booking?.id,
        whenToPay: whenToPay,
      },
      authUser !== null ? "authorize" : "not-authorize",
      "application/json"
    );

    console.log("resultAfterReservation:", resultAfterReservation);
    if (resultAfterReservation.ok === false) {
      setLoading(false);
      setErrorMessage(resultAfterReservation.message || tValidations("paymentGatewayNotAvailable"))
      return;
    }
    if (resultAfterReservation.ok === true && resultAfterReservation.bookingHash !== null && typeof resultAfterReservation.bookingHash === "string" && resultAfterReservation.bookingHash !== "") {
      router.push(`/booking/${booking?.id}/confirm`);
      // setLoading(false);// debugging
    }
    else {

      // now do reservation for the booking 
      setErrorMessage(tValidations('booking_not_created'));
      setLoading(false);
    }



  }

  return (
    <>
      <div className="booking-checkout-footer">
        <ButtonDefault
          label={
            whenToPay === "payment-type-pay-now" ?
              // `Pay €${price.total_discount.toFixed(2)} securely` 
              tForms("pay_price_securely", { price: `€${price.total_discount.toFixed(2)}` })
              :
              tForms("confirm_your_spot")
          } className="w-100 d-flex"
          // disabled={price.total_discount === 0 || booking?.is_expired !== false}
          onClick={(e) => {
            processPayment();
          }}
          loading={loading}
          disabled={booking?.is_expired}
        />

        {
          whenToPay === "payment-later-reserve-now" &&
          <div className="text-center mb-5">
            <Title headingType="p" headingStyle="Text-xs-Regular" color="--color-text-fg-muted">{tForms("your_booking_will_be_confirmed")}</Title>
          </div>
        }

        {
          booking?.is_expired === true && <>
            <IconText
              className="my-5"
              type="icon-text-alert"
              text={tForms("your_reservation_hold_has_expired")}
              iconType="clock-alarm-outline"
              fullWidthCentered={true}
              key="expired-spot"
              variation="danger" // Swapped variation to mirror a systemic warning layout
            />
          </>
        }

        {
          errorMessage !== "" && <div className="mb-3 text-center">
            <IconText
              type="icon-text-alert"
              iconType="danger-outline"
              variation="danger"
              text={errorMessage}
              className="w-100 justify-content-center"
            />
          </div>
        }


        <div className="icon-texts-groups">
          <IconText type="payment-flow-secure-form" iconType="lock-outline" text={tForms("instant_confirmation")} />
          <div className="separator"></div>
          <IconText type="payment-flow-secure-form" iconType="verified-shield-outline" text={tForms("protected_by_encryption")} />
        </div>



        <Title headingType="p" headingStyle="Text-xs-Regular" color="--color-text-fg-muted">{tForms("powered_by_stripe_secure_info")}</Title>
      </div>
    </>
  )
}