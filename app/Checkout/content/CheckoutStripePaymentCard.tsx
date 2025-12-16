'use client';

import React, { useState } from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import {
  ITransactionDetails,
  //PaymentProcess_SaveThePaymentDetails,
  // PaymentProcess_SaveTheReservedBookingDetails,
  //SaveTheBookingData, 
  StripePaymentIntentForTheBooking
} from '@/utils/bokun';
import { CreditCard, Loader2 } from 'lucide-react';
import { useBookingCheckout } from '../CheckoutProvider';
import ErrorMessage, { BookingConfirmationFailedError, BookingReservationFailedError, PaymentStripeFailedError, UserSetInSystemFailError } from '@/components/ErrorMessages/ErrorMessage';
import { formatDateString } from '@/utils/dateUtils';
import { IPaymentBookingFeedback } from '@/interface/payment.booking';
import { IStripePaymentIntent, IStripePaymentMethod } from '@/interface/payment.stripe';
import { signupUserIfNotExist } from '@/utils/user';
import { redirect } from 'next/navigation';
// Import your necessary utilities/interfaces here

const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};


const StripePaymentForm: React.FC = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardHolderName, setCardHolderName] = useState('');

  // Hooks provided by @stripe/react-stripe-js
  const stripe = useStripe();
  const elements = useElements();

  const {
    totalPrice,
    // reserved_booking,
    contactDetails,

    processBooking,
    set_processBooking,

    ___ReserveTheBooking,
    ___ConfirmTheBooking
  } = useBookingCheckout();
  // Your booking data (replace with actual context/props)
  // const totalPrice = 21726; // price in cents
  const currency = 'EUR';
  const bookingHash = 'YOUR_BOKUN_RESERVATION_HASH';
  const externalRef = 'YOUR_UNIQUE_ORDER_ID';
  // ---

  /**
   * 
   * @param event 
   * @returns this function reserve, confirm and pay the booking
   */
  const handleSubmit = async (event: React.FormEvent) => {

    event.preventDefault();
    setLoading(true);
    setError(null);
    set_processBooking({
      confirmed: false,
      reserved: false,
      paid: false,
      // saved: false,
      savedDataToDB: false,
      savedDataToDBError: false,
      confirmedError: false,
      reservedError: false,
      paidError: false,
      // savedError: false,
      userSetInSystem: false,
      userSetInSystemError: false
    });

    /**
     * Before booking to start we must get the user from database or create if it is not existing
     * Get / Generate the user by email
     */
    const dataSignupUserIfNotExist = await signupUserIfNotExist(contactDetails.email, `${contactDetails.firstName} ${contactDetails.lastName}`);
    console.log("dataSignupUserIfNotExist:", dataSignupUserIfNotExist);
    console.log("dataSignupUserIfNotExist.data.userRaw:", dataSignupUserIfNotExist.data.userRaw);
    if (dataSignupUserIfNotExist.data === undefined ||
      dataSignupUserIfNotExist.data.data === undefined
      || dataSignupUserIfNotExist.data.data.userRaw === undefined) {
      setLoading(false);
      setError("User not found or user not created");
      set_processBooking({ ...processBooking, userSetInSystemError: true });
      return;
    }
    const userRaw = dataSignupUserIfNotExist.data.data.userRaw as {
      id: string, email: string
    };


    console.log("userRaw:", userRaw);
    /**
     * First we reserve the booking,
     * we must reserve the booking, before we can confirm it
     * after payment we will confirm it
     */
    const { bookingHash, booking, bookingDB } = await ___ReserveTheBooking(userRaw);
    if (bookingHash === "" || booking === null || booking === undefined) {
      set_processBooking({ ...processBooking, reservedError: true });
      setLoading(false);
      console.log("Reservation failed");
      return;
    }
    console.log("payment, reserved booking details:", bookingHash, booking);
    // const bookingDB = bookingResevationData.data.bookingDB;
    // return setLoading(false); // debugging

    /**
     * Now we will save the reservation booking in the system related to the user
     */
    /*const { ok, bookingResevationData, message } = await PaymentProcess_SaveTheReservedBookingDetails(userRaw, booking);
    if (!ok || bookingResevationData === null || bookingResevationData === undefined || bookingResevationData.data === null || bookingResevationData.data === undefined || bookingResevationData.data.bookingDB === null || bookingResevationData.data.bookingDB === undefined) {
      set_processBooking({ ...processBooking, savedDataToDBError: true });
      setLoading(false);
      console.log("Reservation failed");
      return;
    }
    console.log("payment, saved booking details:", bookingResevationData);
    const bookingDB = bookingResevationData.data.bookingDB;*/
    // setLoading(false); return; // debuging


    if (!stripe || !elements) {
      setError("Payment system failed to load.");
      setLoading(false);
      // set_processBooking({ ...processBooking, paidError: true });
      set_processBooking({ ...processBooking, paidError: true });
      return;
    }

    if (!cardHolderName.trim()) {
      setError("Please enter the cardholder's name.");
      setLoading(false);
      return;
    }

    /**
     * If all okay we create the payment method
     */
    // 1. Create Payment Method (Using the individual elements)
    const cardElement = elements.getElement(CardNumberElement);
    const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement!,
      billing_details: {
        name: contactDetails.firstName + " " + contactDetails.lastName,
        email: contactDetails.email,
        phone: contactDetails.phone,
        address: {
          line1: contactDetails.address as string,
          city: contactDetails.city as string,
          state: "",
          // country can be passed only with 2 characters
          // country: contactDetails.country as string,
          postal_code: ""
        }
      }

    });

    // console.log("paymentMethod after init:", paymentMethod);
    console.log("payment, paymentMethod:", paymentMethod);


    if (paymentMethodError) {
      setError(paymentMethodError.message || "An unknown error occurred during payment.");
      setLoading(false);
      set_processBooking({ ...processBooking, paidError: true });
      return;
    }

    // 2. Call your secure server endpoint to finalize the payment and confirm the booking
    // This function remains the same as in the previous example (running on your server)
    // await finalizePaymentAndBooking(paymentMethod.id);
    // console.log("paymentMethod:", paymentMethod);
    const paymentIntent = await StripePaymentIntentForTheBooking({
      // if totalPrice = 100euros, i must multiply by 100 to get 10000 cents for stripe
      amount: totalPrice * 100,
      currency: currency,
      paymentMethodId: paymentMethod.id,

      bookingDBId: bookingDB.id,

      // 👇 Your Custom Data Fields 👇
      bookingHash: "bookingHashConfirm",
      bookingId: booking.bookingId.toString(),
      confirmationCode: booking.confirmationCode,
      customerEmail: booking.customer.email,

    });
    console.log("payment, paymentIntent:", paymentIntent);
    if (paymentIntent.ok && paymentIntent.data !== undefined && paymentIntent.data.status === "requires_action") {

      console.log("Payment requires additional action");

      // --- THIS IS WHERE YOUR CODE SNIPPET BELONGS ---
      const { paymentIntent: paymentIntent_require_action, error: confirmError_require_action } = await stripe.confirmCardPayment(paymentIntent.data.intent.client_secret, /*{
        elements:elements,
      }*/);

      if (confirmError_require_action) {
        // Handle other unexpected statuses
        console.log("Confirm error, another casses");
        set_processBooking({ ...processBooking, paidError: true });
        setError("Payment Intent failed, required action validation failed - other casses");
        setLoading(false);
        console.log("Payment Intent failed, required action validation failed - other casses");
        return;
      } else if (paymentIntent_require_action.status === 'succeeded') {
        // Handle success after verification
        // setMessage("Payment Confirmed successfully after authentication!");
        console.log("confirm success");
      } else {
        // Handle other unexpected statuses
        console.log("Confirm error, another casses");
        setError("Payment Intent failed, required action validation failed - other casses");
        set_processBooking({ ...processBooking, paidError: true });
        setLoading(false);
        console.log("Payment Intent failed, required action validation failed - other casses");
        return;
      }
      // ----------------------------------------------

      // setLoading(false); return;
    }
    else if (!paymentIntent.ok || paymentIntent.data === undefined || paymentIntent.data.status !== "succeeded") {
      set_processBooking({ ...processBooking, paidError: true });
      console.log("paymentIntent.data.status:", paymentIntent.data.status);
      if (paymentIntent.data.status === 'failed') {
        setError("Payment is declined, please check your card details.");
      }
      setLoading(false);
      console.log("Payment Intent failed");
      return;
    }
    // console.log("paymentIntent:", paymentIntent);
    /**
     * After payment intent we should save the payment Details For the booking
     */
    /*
    Payment saving will be processed in the background when doing the intent
    const paymentSavingDetails = await PaymentProcess_SaveThePaymentDetails(
      bookingDB.id,
      paymentIntent.data
    );
    // details.ok
    if (!paymentSavingDetails.ok) {
      set_processBooking({ ...processBooking, paidError: true });
      setLoading(false);
      console.log("Saving Payment Details failed");
      return;
    }
    console.log("payment, saved payment details:", paymentSavingDetails);
    setLoading(false); return; //debugging*/



    /**
     * We confirm the booking after payment
     */
    const { bookingHash: bookingHashConfirm, booking: bookingConfirm, bookingToken } = await ___ConfirmTheBooking(
      booking.confirmationCode, {
      "transactionDate": formatDateString(new Date()),
      "transactionId": paymentIntent.data.id,
      "cardBrand": paymentMethod.card?.brand as string,
      "last4": paymentMethod.card?.last4 as string
    });
    if (bookingHashConfirm === "") {
      set_processBooking({ ...processBooking, confirmedError: true });
      setLoading(false);
      return;
    }
    console.log("payment, bookingHashConfirm, bookingConfirm:", bookingConfirm, bookingHashConfirm);
    console.log("bookingToken:", bookingToken);

    /**
     * Finally after reserveation, creating the payment, payment and confimration the booking we should save the data
     */

    /* const feedbackAfter = await SaveTheBookingData(
       {
         email: booking.customer.email,
         name: booking.customer.firstName + " " + booking.customer.lastName,
         // booking: bookingConfirm
       },
       bookingConfirm as IPaymentBookingFeedback,
       paymentMethod as unknown as IStripePaymentMethod,
       paymentIntent as unknown as IStripePaymentIntent
     );
     console.log("payment, feedbackAfter:", feedbackAfter);*/


    // setLoading(false);


    /**
     * Finally we redirect to the success booking page
     */
    redirect(`/Checkout/BookingSuccess/?bookingToken=${bookingToken}`);

  };

  // NOTE: finalizePaymentAndBooking function is omitted here for brevity, 
  // but it should be implemented as shown in the previous answer, 
  // making a SECURE server-side call.

  return (
    <form onSubmit={handleSubmit} className="p-6 border border-gray-300 rounded-lg shadow-md bg-white mb-4">
      <h3 className="text-lg font-semibold mb-4">Card Details</h3>

      <div className={`${loading ? "opacity-50 pointer-events-none" : ""}`}>
        {/* 1. Cardholder Name (Custom Input) */}
        <div className="mb-4">
          <label htmlFor="cardholder-name" className="block text-sm font-medium text-gray-700 mb-1">
            Cardholder Name
          </label>
          <input
            id="cardholder-name"
            type="text"
            placeholder="Jane Doe"
            required
            value={cardHolderName}
            onChange={(e) => setCardHolderName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* 2. Card Number (Stripe Element) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Card Number
          </label>
          <div className="p-3 border border-gray-300 rounded-md">
            <CardNumberElement options={cardElementOptions} />
          </div>
        </div>

        {/* 3. Expiry Date & CVC (Stripe Elements - Side-by-Side) */}
        <div className="flex space-x-4 mb-6">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiration Date
            </label>
            <div className="p-3 border border-gray-300 rounded-md">
              <CardExpiryElement options={cardElementOptions} />
            </div>
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CVC
            </label>
            <div className="p-3 border border-gray-300 rounded-md">
              <CardCvcElement options={cardElementOptions} />
            </div>
          </div>
        </div>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <button
        type="submit"
        disabled={!stripe || !cardHolderName.trim()}
        className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:transform-none disabled:cursor-not-allowed cursor-pointer ${loading ? "pointer-events-none" : ""}`}
      >
        {
          // loading ? 'Processing...' : `Pay ${currency} ${(totalPrice / 100).toFixed(2)}`
        }
        {
          !loading && (<span className="flex items-center justify-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Pay €{totalPrice.toFixed(2)} with Stripe
          </span>)
        }

        {
          loading ? (
            <span className="flex items-center justify-center">
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Processing...
            </span>
          ) : null
        }


      </button>

      {
        processBooking.reservedError && (
          <ErrorMessage error={BookingReservationFailedError} />
        )
      }
      {
        processBooking.confirmedError && (
          <ErrorMessage error={BookingConfirmationFailedError} />
        )
      }
      {
        processBooking.paidError && (
          <ErrorMessage error={PaymentStripeFailedError} />
        )
      }
      {
        processBooking.userSetInSystemError && (
          <ErrorMessage error={UserSetInSystemFailError} />
        )
      }


    </form>
  );
};

export default StripePaymentForm;