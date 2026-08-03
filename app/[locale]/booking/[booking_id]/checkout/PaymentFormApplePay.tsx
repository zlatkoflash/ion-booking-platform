import { ExpressCheckoutElement } from "@stripe/react-stripe-js"

export default function PaymentFormApplePay() {
  return (
    <>
    {/* Stripe injects the native Apple Pay button directly inside this wrapper */}
        <ExpressCheckoutElement 
          options={{
            paymentMethods: {
              applePay: "always",
              googlePay: "never", // Ensure Google Pay doesn't slip into this specific Apple tab
            },
            buttonHeight: 48, // Forces Stripe's button to perfectly match your 48px input design layout
          }}
          onConfirm={()=>{}}
        />
    </>
  );
}