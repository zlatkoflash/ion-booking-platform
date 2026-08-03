"use client";

import IconText from "@/components/buttons/IconText";
import { useAppSelector } from "@/redux/hooks";
import { useTranslations } from "next-intl";

export default function FormSectionChecksItems(
  {
    showStrict = false,
    hideInMobile = false,
    hideInDesktop = false
  }
    :
    {
      showStrict?: boolean,
      hideInMobile?: boolean,
      hideInDesktop?: boolean
    }
) {

  const tForms = useTranslations("Forms");
  const bookingPrice = useAppSelector((state) => state.booking.price)
  if (bookingPrice.total === 0 && !showStrict) return <></>

  return (
    <div className={`form-section-checks-items ${hideInMobile ? 'hide-in-mobile' : ''} ${hideInDesktop ? 'hide-in-desktop' : ''}  `}>
      <IconText iconType="check-circle" type="tour-form-checks" text={tForms("free_cancellation")} subText={tForms("cancel_up_to_24_hours_in_advance")} />
      <IconText iconType="check-circle" type="tour-form-checks" text={tForms("reserve_now_and_pay_later")} subText={tForms("secure_your_spot_with_no_upfront_payment")} />
    </div>
  )
}