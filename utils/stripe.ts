"use server";

import Stripe from "stripe";
import { getApiData } from "./api";
import { IDBBookingDetails } from "./interface-database";
import { checkEmail } from "./strings";


// 🛑 Declared outside the function: This stays alive in the server's memory scope
let stripeInstance: Stripe | null = null;

export const getStripeServer = async (): Promise<Stripe> => {
  // If it already exists, return it instantly. No recreation, no performance hit.
  if (!stripeInstance) {
    console.log("Initializing Stripe Server Instance (Runs only once per container initialization)...");

    stripeInstance = new Stripe(process.env.STRIPE_SK!, {
      // apiVersion: "2025-01-27",
      apiVersion: "2026-06-24.dahlia"
      // The SDK handles HTTP Keep-Alive and connection pooling automatically under the hood
    });
  }

  return stripeInstance;
};


/**
 * Private function for getting the customer id by email
 * it create if not exist and return
 * if falure return null
 */
export const getStripeCustomerId = async (email: string): Promise<string | null> => {
  if (!email) return null;

  try {
    // 1. Initialize your server-side Stripe instance
    const stripe = await getStripeServer();

    // 2. Search Stripe to see if this email already exists
    const existingCustomers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      return existingCustomers.data[0].id;
    }

    // 3. IF NOT EXISTS: Create a brand new customer record
    const newCustomer = await stripe.customers.create({
      email: email,
    });

    return newCustomer.id;
  } catch (error) {
    console.error("Error in getStripeCustomerId:", error);
    return null; // Return null on failure to match your signature cleanly
  }
};

/**
 * 
 * @param booking_id 
 * This function get stripe customer id / or create customer if not exist
 * it is based on booking
 * reason, there we have customer email
 * reason, booking must be loaded so we check that is valid
 * after loading we process to getting the customer
 */
export const getStripeCustomerId_ByBooking = async (booking_id: string): Promise<{
  ok: boolean;
  stripe_customer_id?: string | null;
  message: string,
  booking?: IDBBookingDetails | null
}> => {

  const details = await getApiData<{
    ok: boolean;
    message: string;
    booking: IDBBookingDetails;
  }>("/booking-public/check-booking-validity", "POST", {
    booking_id,
  }, "not-authorize", "application/json");

  if (!details.ok || !checkEmail(details.booking.customer_details.email_address)) {
    return {
      ok: false,
      message: details.message,
    };
  }

  const stripeCustomerID = await getStripeCustomerId(details.booking.customer_details.email_address)

  return {
    ok: true,
    message: details.message,
    stripe_customer_id: stripeCustomerID,
    booking: details.booking
  };

}