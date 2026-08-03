"use client";

import { useAppSelector } from "@/redux/hooks";
import PaymentFlowSectionContainer from "./PaymentFlowSectionContainer";
import PaymentFormX3Options from "./PaymentFormX3Options";
import RadioSlidingPanels from "./RadioSlidingPanels";
import { useAppDispatch } from "@/redux/hooks";
import { setWhenToPay } from "@/redux/booking/bookingSlice";
import BookingCheckoutFooter from "./BookingCheckoutFooter";
import IconText from "@/components/buttons/IconText";
import { useTranslations } from "next-intl";

export default function PaymentFlowSectionPayment() {

  const whenToPay = useAppSelector((state) => state.booking.whenToPay);
  const dispatch = useAppDispatch();
  const price = useAppSelector((state) => state.booking.price);
  const userAuth = useAppSelector((state) => state.auth.user);
  const tForms = useTranslations("Forms");

  return (
    <PaymentFlowSectionContainer
      title={tForms("payment_details")}
      showContent={true}
      topRightIconText={<IconText type="payment-flow-secure-form" iconType="lock-outline" text={tForms("secure_payment")} className="secure-form-label" showOnlyOnDesktop={true} />}
      headingAdditionalContent={
        userAuth === null && <IconText type="icon-text-alert" iconType="power-solid" variation="warning" text={tForms("login_or_signup")} />
      }
    >
      <RadioSlidingPanels
        panelId="payment-types"
        title={tForms("choose_when_to_pay")}
        activeRadio={whenToPay}
        afterChange={(slug) => {
          dispatch(setWhenToPay(slug))
        }}
        panels={[
          {
            slug: "payment-type-pay-now",
            leftTitle: tForms("pay_now"),
            // leftSubtitle:"Pay the full amount today",
            // content:"Pay now",
            rightTitle: `€${price.total_discount.toFixed(2)}`
          },
          {
            slug: "payment-later-reserve-now",
            leftTitle: tForms("reserve_now_and_pay_later"),
            leftSubtitle: tForms("no_extra_fees_you_ll_be_charged", { price: price.total_discount.toFixed(2), date: "Apr 8" }),
            rightTitle: "€0.00",
            rightSubtitle: tForms("now"),
            // content:"Reserve now, pay later",

          }
        ]} />

      {
        // whenToPay === "payment-type-pay-now" && 
        <PaymentFormX3Options />
      }


    </PaymentFlowSectionContainer>
  )
}