import IconText from "@/components/buttons/IconText";
import { ExpressCheckoutElement, PaymentElement } from "@stripe/react-stripe-js"

export default function PaymentFormApplePay() {
  return (
    <>
      <IconText type="booking-whats-next" text="Instant digital wallet checkout." type2="type2-default" subText="A secure Apple Pay or Google Pay popup will appear to authorize your initial payment and save your card for future charges. Once approved, your booking confirmation will load instantly right here." />

      {
        /*<PaymentElement options={{
        layout: 'accordion', // Options: 'tabs', 'accordion'
        paymentMethodOrder: ['apple_pay'],
      }} />*/
      }
    </>
  );
}