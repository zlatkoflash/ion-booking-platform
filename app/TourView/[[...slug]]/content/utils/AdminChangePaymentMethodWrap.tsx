import { loadStripe } from "@stripe/stripe-js";
import ChangePaymentMethod from "./AdminChangePaymentMethod";
import { Elements } from "@stripe/react-stripe-js";
import { zconfig } from "@/config/config";
import { useEffect, useState } from "react";
import { GetStripeClientSecret } from "@/utils/bokunAdminClient";

export default function AdminChangePaymentMethodWrap({ bookingId }: {
  bookingId: string
}) {
  const stripePromise = loadStripe(zconfig.stripe.pk);

  /* const [clientSecret, setClientSecret] = useState<string | undefined>(undefined);
 
   const __LoadStripeClientSecret = async () => {
     const result = await GetStripeClientSecret();
     console.log("Results for secret:", result);
     console.log("result.clientSecret:", result.clientSecret);
     if (result.ok === true) {
       setClientSecret(result.clientSecret);
     }
     // setClientSecret(result.clientSecret);
   }
 
   useEffect(() => {
     __LoadStripeClientSecret();
   }, []);*/

  return (
    <Elements stripe={stripePromise}
    // options={{ clientSecret: clientSecret }}
    >
      <ChangePaymentMethod bookingId={bookingId} />
    </Elements>
  );
}