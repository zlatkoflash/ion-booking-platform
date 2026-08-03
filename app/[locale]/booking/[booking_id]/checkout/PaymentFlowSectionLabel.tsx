import IconText from "@/components/buttons/IconText";
import PaymentFlowSectionContainer from "./PaymentFlowSectionContainer";
import { useTranslations } from "next-intl";

export default function PaymentFlowSectionLabel(
  { hideInMobile = false }
    :
    { hideInMobile?: boolean }
) {

  const tForms = useTranslations("Forms");

  return <>
    <PaymentFlowSectionContainer
      title={tForms("payment_details")}
      className={`${hideInMobile ? 'hide-in-mobile' : ''}`}
      showContent={true}
      topRightIconText={<IconText type="payment-flow-secure-form" iconType="lock-outline" text={tForms("secure_payment")} className="secure-form-label" />}
    >
      <></>
    </PaymentFlowSectionContainer>
  </>
}