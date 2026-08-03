"use client";

import { loadStripe } from "@stripe/stripe-js";
import RadioSlidingPanels from "./RadioSlidingPanels";
import { Elements } from "@stripe/react-stripe-js";
import PaymentFormApplePay from "./PaymentFormApplePay";
import PaymentFormCreditCards from "./PaymentFormCreditCards";
import PaymentFormPaypal from "./PaymentFormPaypal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { bookingSlice, setPayWith } from "@/redux/booking/bookingSlice";
import BookingCheckoutFooter from "./BookingCheckoutFooter";
import { useTranslations } from "next-intl";

// 2. Initialize Stripe outside of your component render tree
// This ensures you don't recreate the Stripe instance on every state refresh
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK!);

export default function PaymentFormX3Options() {


  const stripeOptions = {
    mode: "payment" as const,
    currency: "eur",
    amount: 1099,
    payment_method_types: [
      "card", "paypal",
      // "apple_pay"
    ],
  };

  const tForms = useTranslations("Forms");

  // let activePaymentType = "debit-credit-card";
  // activePaymentType = "apple-pay";
  const payWith = useAppSelector((state) => state.booking.payWith);
  const dispatch = useAppDispatch();

  return (
    <>

      <Elements stripe={stripePromise} options={stripeOptions}>
        <RadioSlidingPanels
          panelId="payment-forms"
          title={tForms("pay_with")}
          activeRadio={payWith}
          afterChange={(slug: string) => {
            dispatch(setPayWith(slug))
          }}
          panels={[
            {
              slug: "apple-pay",
              leftTitle: tForms("apple_pay"),
              content: payWith === "apple-pay" ? <PaymentFormApplePay /> : null
            },
            {
              slug: "debit-credit-card",
              leftTitle: tForms("debit_credit_card"),
              content: payWith === "debit-credit-card" ? <PaymentFormCreditCards /> : null
            },
            {
              slug: "paypal",
              leftTitle: tForms("paypal"),
              content: payWith === "paypal" ? <PaymentFormPaypal /> : null
            }
          ]} />


        <BookingCheckoutFooter />

      </Elements>

    </>
  )
}