import { Elements } from "@stripe/react-stripe-js";
import StripePaymentForm from "./CheckoutStripePaymentCard";
import { loadStripe } from "@stripe/stripe-js";
import { zconfig } from "@/config/config";

export default function CheckoutStripeElements() {

  const stripePromise = loadStripe(zconfig.stripe.pk);

  return (
    <Elements stripe={stripePromise}>
      <StripePaymentForm />
    </Elements>
  );
}