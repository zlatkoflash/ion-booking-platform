
import { CardNumberElementComponent } from "@stripe/react-stripe-js";
import { SetupIntent, Stripe, StripeCardNumberElement, StripeElements } from "@stripe/stripe-js";
import { getApiData } from "./api";
import { ISupabaseUser } from "./interface-auth";

export const checkCardDetails = async (
  elements: StripeElements | null,
  CardNumberElement: CardNumberElementComponent
): Promise<{
  ok: boolean;
  cardElement: StripeCardNumberElement | null;
}> => {
  if (elements === null) {
    return { ok: false, cardElement: null };
  }
  const cardElement = elements.getElement(CardNumberElement);
  // const cvcElement = elements.getElement(CardCvcElement);
  // const expiryElement = elements.getElement(CardExpiryElement);
  if (!cardElement) {
    //// setLoading(false);
    //// setErrorMessage(tValidations("cardInfoNotAvailable"))
    return { ok: false, cardElement: null };
  }
  return { ok: true, cardElement };
}


export const setupCustomerPaymentMethod_card = async (
  stripe: Stripe,
  customerIntent: { clientSecret: string },
  cardElementDetails: { cardElement: StripeCardNumberElement | null },
  billing_details: any
): Promise<{
  ok: boolean,
  setupIntent: SetupIntent | null,
  message?: string
}> => {

  if (stripe === null) {
    return {
      ok: false,
      setupIntent: null
    }
  }

  const { setupIntent, error: setupError } = await stripe.confirmCardSetup(customerIntent.clientSecret, {
    payment_method: {

      card: cardElementDetails.cardElement as StripeCardNumberElement,
      billing_details: billing_details
    },
  });
  console.log("setupIntent:", setupIntent);
  if (setupError !== null && setupError !== undefined) {
    //// setLoading(false);
    //// setErrorMessage(setupError.message || tValidations("paymentGatewayNotAvailable"))
    return {
      ok: false,
      setupIntent: null,
      message: setupError.message
    };
  }

  return {
    ok: true,
    setupIntent
  };
}


export const getCustomerIntent = async (
  payWith: "debit-credit-card" | "paypal" | "apple-pay",
  stripe_customer_id: string
): Promise<{ ok: boolean, message: string, clientSecret: string }> => {
  const customerIntentDetails = await getApiData<{
    ok: boolean,
    message: string,
    clientSecret: string
  }>(`/booking-public/setup-intent-for-payment-method`, "POST", {
    customer_id: stripe_customer_id,
    payment_method_type: (() => {
      if (payWith === "debit-credit-card") {
        return "card";
      } else if (payWith === "paypal") {
        return "paypal";
      } else if (payWith === "apple-pay") {
        return "apple_pay";
      }
    })(),
  }, "not-authorize", "application/json");

  if (typeof customerIntentDetails.clientSecret !== "string" || customerIntentDetails.clientSecret === "") {
    //// setLoading(false);
    //// setErrorMessage(tValidations("paymentGatewayNotAvailable"))
    customerIntentDetails.ok = false;
    // return false;
  }

  if (customerIntentDetails.ok !== true) {
    //// setLoading(false);
    //// setErrorMessage(customerIntentDetails.message)
    // return false;
    customerIntentDetails.message = customerIntentDetails.message;
  }

  return customerIntentDetails;
}



export const setupCustomerPaymentMethod_paypal = async (
  stripe: Stripe,
  // payWith: "paypal" | "apple-pay",
  return_url: string,
  elements: StripeElements | null,
  customerIntent: {
    clientSecret: string
  },
  billing_details: any
): Promise<{
  ok: boolean,
  setupIntent: SetupIntent | null,
  message?: string
}> => {
  if (stripe === null) {
    return { ok: false, setupIntent: null };
  }
  if (elements === null) return { ok: false, setupIntent: null };
  const { error } = await stripe.confirmPayPalSetup(customerIntent.clientSecret, {
    payment_method: {
      billing_details: billing_details
    },
    // return_url: `${window.location.origin}/booking/${parentBooking?.id}/checkout?payWith=${payWith}`,
    return_url: return_url
  });


  if (error) {
    //// setErrorMessage(error.message ?? "An unexpected error occurred.");
    /// setLoading(false);
    return { ok: false, setupIntent: null, message: error.message ?? "An unexpected error occurred." };
  }
  return { ok: true, setupIntent: null };
}



/**
 * Capture the payment method to database and attach to the customer in stripe api
 * @param stripeCustomerId_details 
 * @param paymentMethodIntentDetails 
 * @param authUser 
 * @returns 
 */
export const attachPaymentMethodToCustomer = async (
  stripeCustomerId_details: {
    stripe_customer_id: string;
  },
  /*paymentMethodIntentDetails: {
    ok: boolean,
    setupIntent: SetupIntent | null
  },*/
  payment_method_id: string,
  authUser: ISupabaseUser | null
): Promise<{
  ok: boolean,
  message: string
}> => {



  const details = await getApiData<{
    ok: boolean,
    message: string
  }>(
    // `/booking-public/set-payment-method-for-booking`, 
    `/booking-public/attach-payment-method-to-customer`,
    "POST", {
    // booking_id: parentBooking?.id,
    customer_id: stripeCustomerId_details?.stripe_customer_id,
    // payment_method_id: paymentMethodIntentDetails.setupIntent?.payment_method,
    // payment_method_details: paymentMethodIntentDetails.setupIntent
    payment_method_id
  },
    authUser === null ? "not-authorize" : "authorize"
    , "application/json");

  console.log("Details after updating the payment method:", details);
  // stripeCustomerId_details.
  console.log("stripeCustomerId_details:", stripeCustomerId_details);

  if (details.ok !== true) {
    //// setLoading(false);
    //// setErrorMessage(details.message || tValidations("paymentGatewayNotAvailable"))
    return {
      ok: false,
      message: details.message
    };
  }
  return {
    ok: true,
    message: details.message
  };
}