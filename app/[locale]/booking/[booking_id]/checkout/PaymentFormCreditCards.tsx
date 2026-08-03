"use client";

import InputsGridForBooking from "@/components/forms/forms-sections/InputsGridForBooking";
import InputText from "@/components/forms/inputs/InputText";
import { setCardHolderName } from "@/redux/booking/bookingSlice";
import { useAppDispatch } from "@/redux/hooks";
import { CardCvcElement, CardExpiryElement, CardNumberElement } from "@stripe/react-stripe-js";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function PaymentFormCreditCards() {

  const dispatch = useAppDispatch();

  // 1. STRIPE ELEMENT TEXT STYLING OBJECT (Mapped directly from your CSS specs)
  const stripeElementOptions = {
    style: {
      base: {
        fontFamily: 'Inter, "Inter Fallback", sans-serif',
        fontSize: "16px",
        fontSmoothing: "antialiased",
        color: "rgb(33, 37, 41)", // Match your font color specs
        fontWeight: "400",
        lineHeight: "24px",
        "::placeholder": {
          color: "rgb(173, 181, 189)", // Custom subtle placeholder color
        },
      },
      invalid: {
        color: "rgb(220, 53, 69)", // Bootstrap error red if validation fails
      },
    },
  };

  const [cardName, setCardName] = useState("");

  const tForms = useTranslations("Forms");

  return (
    <>
      <InputsGridForBooking>
        <InputText value={cardName} onChange={(e) => {
          setCardName(e.target.value)
          dispatch(setCardHolderName(e.target.value))
        }} label={tForms("cardholder_name")} placeholder={tForms("enter_your_cardholder_name")} showLabel={true} />
        <InputText
          onChange={() => { }}
          value=""
          showLabel={true}
          label={tForms("card_number")}
          placeholder={tForms("enter_your_card_number")}
          stripeElement={<CardNumberElement options={stripeElementOptions} />}
        />
        <InputText
          onChange={() => { }}
          value=""
          showLabel={true}
          label={tForms("cvc")}
          placeholder={tForms("enter_cvc")}
          stripeElement={<CardCvcElement options={stripeElementOptions} />}
        />
        <InputText
          onChange={() => { }}
          value=""
          showLabel={true}
          label={tForms("expiration_date")}
          placeholder={tForms("enter_expiration_date")}
          stripeElement={<CardExpiryElement options={stripeElementOptions} />}
        />
      </InputsGridForBooking>
    </>
  );
}