import IconText from "@/components/buttons/IconText";
import { PaymentElement } from "@stripe/react-stripe-js";
import iconPayPalNoSpace from '@/assets/images/icons/icon-PayPal-no-space.svg';

export default function PaymentFormPaypal() {
  return (
    <div>
      {
        // <h2>Paypal</h2>
      }
      <div className="d-none">
        <PaymentElement options={{
          layout: 'accordion', // Options: 'tabs', 'accordion'
          paymentMethodOrder: ['paypal'],
        }} />
      </div>

      <IconText type="booking-whats-next" text="After submission, you will be redirected to securely complete next steps." type2="type2-default" subText="You will be temporarily taken to PayPal to authorize your payment method. Once approved, you will automatically return here to finalize your booking confirmation." iconSrc={iconPayPalNoSpace.src} />

    </div>
  );
}