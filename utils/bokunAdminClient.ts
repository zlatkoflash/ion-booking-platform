"use server"

import { IDBPayment } from "@/app/interface/db";
import { IBokunBooking } from "./bokun";
import { SupabaseEdgeFetchPost } from "./supabase"
import { getStripeServer } from "./stripe-server";
import Stripe from "stripe";

export const GetBookingsFromDB = async (payload: {
  p_user_id: string | null,
  p_tour_id: string | null,
  p_user_email: string | null,
  p_user_name: string | null,
  p_from_date: string | null,
  p_to_date: string | null,
  p_limit: number,
  p_offset: number,
  p_global_search: string | null
}) => {

  const result = await SupabaseEdgeFetchPost("/bokun-admin-client/GetBookingsFromDB", payload, true);
  const resultText = await result.text();
  const resultJSON = JSON.parse(resultText);

  return resultJSON;

}


export const GetBookingDetailsByBookingId = async (payload: {
  dbBookingId: string
}) => {

  const result = await SupabaseEdgeFetchPost("/bokun-admin-client/get-booking-details-for-client-by-id", payload, true);
  const resultText = await result.text();

  const resultJSON = JSON.parse(resultText);



  return resultJSON;
}

export const CancelBooking = async (payload: {
  dbBookingId: string
}) => {

  const result = await SupabaseEdgeFetchPost("/bokun-admin-client/cancel-booking", payload, true);
  const resultText = await result.text();

  const resultJSON = JSON.parse(resultText);



  return resultJSON;
}

export const UpdateBooking = async (payload: {
  // dbBookingId: string,
  // activityBookingId: number,
  dbBookingId: string,
  paymentTotal: number,
  dateTimeChange: {
    date: string,
    activityBookingId: number,
    startTimeId: number,
    // dateLocalString: string
  },
  participantsToBeRemoved: { id: number }[],
  participantsToBeAdded: { pricingCategoryId: number }[]

}) => {

  const result = await SupabaseEdgeFetchPost("/bokun-admin-client/update-booking", payload, true);
  const resultText = await result.text();

  const resultJSON = JSON.parse(resultText);



  return resultJSON;
}


export const RefundPartialForBooking = async (payload: {
  dbBookingId: string,
  amount_cents: number,
  reason: string,
  note: string
}) => {

  const result = await SupabaseEdgeFetchPost("/bokun-admin-client/refund-partial-for-booking", payload, true);
  const resultText = await result.text();

  const resultJSON = JSON.parse(resultText);



  return resultJSON;
}


export const GetStripeClientSecret = async (payload?: {
  dbBookingId: string
}) => {

  const result = await SupabaseEdgeFetchPost("/bokun-admin-client/get-stripe-client-secret", payload, true);
  const resultText = await result.text();

  const resultJSON = JSON.parse(resultText);



  return resultJSON;
}
export async function createSetupIntentAction(customerId: string) {
  try {
    const setupIntent = await getStripeServer().setupIntents.create({
      customer: customerId,
      payment_method_types: ['card'],
    });

    return { success: true, clientSecret: setupIntent.client_secret };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}


export const AttachThePaymentMethodToTheCustomerDefault = async (customerId: string, paymentMethodId: string, dbBookingId: string, cardDetails: string) => {
  const stripeServer = getStripeServer();
  try {
    // 1. Attach the payment method to the customer (if not already attached)
    await stripeServer.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });
    await stripeServer.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    const attachPaymentMethod = await SupabaseEdgeFetchPost("/bokun-admin-client/attach-payment-method-on-booking", {
      customerId: customerId, paymentMethodId: paymentMethodId,
      dbBookingId: dbBookingId,
      cardDetails: cardDetails
    }, true);
    console.log("attachPaymentMethod:", attachPaymentMethod);
    // return {};
    const resultText = await attachPaymentMethod.text();

    const resultJSON = JSON.parse(resultText);

    return {
      success: true, attachPaymentMethod: resultJSON
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export const getStripePaymentMethods = async (customerId: string): Promise<Stripe.PaymentMethod[]> => {
  const paymentMethods = await getStripeServer().paymentMethods.list({
    customer: customerId,
  });
  return paymentMethods.data;
}