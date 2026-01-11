'use client';

import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { AttachThePaymentMethodToTheCustomerDefault, createSetupIntentAction, getStripePaymentMethods } from '@/utils/bokunAdminClient';
import { useAuth } from '@/app/User/AuthProvider';
import Stripe from 'stripe';
import { useBookingEditor } from '../../BookingEditorProvider';

const ChangePaymentForm = ({ bookingId }: { bookingId: string }) => {

  const {
    stripeCustomerId,
    user,
  } = useAuth();

  const {
    bookingDBNet,
    BookingDB
  } = useBookingEditor();

  const [defaultPaymentCardDetails, setDefaultPaymentCardDetails] = useState<string>("");

  const stripe = useStripe();
  const elements = useElements();

  const [isChanging, setIsChanging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [stripePaymentMethods, setStripePaymentMethods] = useState<Stripe.PaymentMethod[]>([]);

  const handleUpdateClick = async () => {
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    setLoading(true);
    setErrorMessage(null);
    setMessage(null);

    try {
      // 1. CREATE SETUP INTENT (Server-Side Action)
      // Ensure createSetupIntentAction is a "use server" function 
      // that uses your SECRET KEY safely.
      const intent = await createSetupIntentAction(stripeCustomerId as string);


      if (!intent?.clientSecret) {
        throw new Error("Failed to initialize security handshake.");
      }

      // 2. CONFIRM CARD SETUP (Client-Side)
      // We pass the clientSecret from the server to the client's Stripe instance
      const { setupIntent, error: stripeError } = await stripe.confirmCardSetup(
        intent.clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              email: user?.email || undefined,
              name: user?.name || undefined,
            },
          },
        }
      );
      console.log("setupIntent:", setupIntent);

      if (stripeError) {
        setErrorMessage(stripeError.message ?? 'An error occurred');
        setLoading(false);
        return;
      }

      if (setupIntent?.status === 'succeeded') {
        setMessage('Success! Card saved.');


        // 4. REFRESH LIST (Server-Side Action)
        const updatedMethods = await getStripePaymentMethods(stripeCustomerId as string);
        setStripePaymentMethods(updatedMethods);
        console.log("updatedMethods:", updatedMethods);
        const paymentMethodById = updatedMethods.find((method) => method.id === setupIntent.payment_method);
        console.log("paymentMethodById:", paymentMethodById);

        const cardDetails = `${paymentMethodById?.card?.brand} ...${paymentMethodById?.card?.last4}`;

        setDefaultPaymentCardDetails(cardDetails);
        // 3. ATTACH & SET DEFAULT (Server-Side Action)
        const attachResult = await AttachThePaymentMethodToTheCustomerDefault(
          stripeCustomerId as string,
          setupIntent.payment_method as string,
          bookingId,
          cardDetails
        );
        console.log("attachResult:", attachResult);


        // Optional: Close the edit mode after success
        setIsChanging(false);
      }
    } catch (err: any) {
      console.log("Error: ", err);
      setErrorMessage(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-4">
      {!isChanging ? (
        <div className="flex flex-col space-y-2">
          <p className="text-sm text-gray-600">
            Payment will be processed using your <strong>latest payment method</strong>{
              BookingDB.default_payment_card_x4_last_numbers !== "" || defaultPaymentCardDetails !== "" ?
                <strong className="text-black">({
                  defaultPaymentCardDetails !== "" ? defaultPaymentCardDetails : BookingDB.default_payment_card_x4_last_numbers
                })</strong>
                : ""
            }.
          </p>
          <button
            type="button"
            onClick={() => setIsChanging(true)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium underline text-left w-fit"
          >
            Click here to add another card
          </button>
        </div>
      ) : (
        <div className="space-y-4"> {/* Changed from form to div */}
          <div className="flex justify-between items-center">
            <h3 className="text-md font-semibold text-gray-800">Add New Payment Method</h3>
            <button
              type="button"
              onClick={() => setIsChanging(false)}
              className="text-xs text-gray-500 hover:underline"
            >
              Cancel
            </button>
          </div>

          <div className="border border-gray-200 p-3 rounded">
            <CardElement options={{
              hidePostalCode: true,
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': { color: '#aab7c4' },
                },
                invalid: { color: '#9e2146' },
              },
            }} />
          </div>

          {errorMessage && (
            <div className="text-red-500 text-xs mt-2">{errorMessage}</div>
          )}

          <button
            type="button" // Important: not 'submit'
            disabled={!stripe || loading}
            onClick={handleUpdateClick} // Attached onClick here
            className="w-full bg-black text-white py-2 rounded-md font-medium hover:bg-gray-800 disabled:bg-gray-400 transition-colors"
          >
            {loading ? "Verifying Card..." : "Update Payment Method"}
          </button>
        </div>
      )}
    </div>
  );
};

export default function ChangePaymentMethod({ bookingId }: { bookingId: string }) {
  // Reminder: This component MUST still be inside an <Elements> provider 
  // further up the tree to provide the 'stripe' and 'elements' hooks.
  return (
    <ChangePaymentForm bookingId={bookingId} />
  );
}