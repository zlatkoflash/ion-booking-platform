import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CreditCard, Lock, Shield, AlertCircle } from 'lucide-react';
import StripePaymentForm from './CheckoutStripePaymentCard';
import { Elements } from '@stripe/react-stripe-js';
import { zconfig } from '@/config/config';
import CheckoutStripeElements from './CheckoutStripeElements';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK || '');

interface PaymentFormProps {
  tourTitle: string;
  price: number;
  onSuccess?: () => void;
  onError?: (error: string) => void;
  metadata?: Record<string, any>;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  tourTitle,
  price,
  onSuccess,
  onError,
  metadata = {}
}) => {

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Load Stripe outside of render to avoid recreating Stripe object on every render
  // const stripePromise = loadStripe(zconfig.stripe.pk);

  /*const handlePayment = async () => {
    setProcessing(true);
    setError(null);

    try {
      // Create checkout session
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify({
            tourTitle,
            price,
            ...metadata
          })
        }
      );

      const { id: sessionId, error: sessionError } = await response.json();

      if (sessionError) {
        throw new Error(sessionError);
      }*/

  // Redirect to Stripe Checkout
  // const stripe = await stripePromise;
  /*if (stripe) {
    console.log("ai vibed stripe.redirectToCheckout, but stripe.redirectToCheckout is old way");*/
  // 
  /*
  this code is not good: const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });redirectToCheckout is old stripe way for redirection");
  if (stripeError) {
      throw new Error(stripeError.message);
    }*/

  /**
   * The Correct Client-Side Flow:
      Your Next.js Client Component: Calls your server/Edge Function (e.g., your Deno function) to create the session.

      Your Server/Edge Function: Calls stripe.checkout.sessions.create() and gets back an object containing the unique URL: session.url.

      Your Server/Edge Function: Sends that session.url back to the client.

      Your Next.js Client Component: Directly redirects the user using native browser JavaScript.

      So this is with redirection, make the payment with stripe elements
   * 
   */
  /*}
} catch (err) {
  const errorMessage = err instanceof Error ? err.message : 'Payment failed';
  setError(errorMessage);
  onError?.(errorMessage);
} finally {
  setProcessing(false);
}
};*/

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Payment Details</h3>
        <div className="flex items-center text-green-600">
          <Shield className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">Secure Payment</span>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-gray-800 mb-2">Order Summary</h4>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">{tourTitle}</span>
          <span className="font-bold text-gray-800 text-4xl">€{price.toFixed(2)}</span>
        </div>
      </div>


      {/*<Elements stripe={stripePromise}>
        <StripePaymentForm />
      </Elements>*/}
      {
        // the form for payment
      }
      <CheckoutStripeElements />


      {/* Security Features */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center text-sm text-gray-600 justify-center">
          <Lock className="w-4 h-4 mr-2 text-green-600" />
          <span>SSL Encrypted</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 justify-center">
          <CreditCard className="w-4 h-4 mr-2 text-green-600" />
          <span>Secure Checkout</span>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
            <div>
              <div className="font-semibold text-red-800">Payment Error</div>
              <div className="text-sm text-red-700">{error}</div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Button */}
      {/*<button
        onClick={() => {
          // handlePayment
        }}
        disabled={processing}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:transform-none disabled:cursor-not-allowed"
      >
        {processing ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing Payment...
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Pay €{price.toFixed(2)} with Stripe
          </div>
        )}
      </button>*/}

      <div className="text-center text-xs text-gray-500 mt-4">
        <p>Powered by Stripe • Your payment information is secure</p>
        <p className="mt-1">Free cancellation up to 24 hours before the tour</p>
      </div>
    </div>
  );
};

export default PaymentForm;