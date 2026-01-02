import { IDBPayment } from "@/app/interface/db";
import { IBokunBooking } from "./bokun";
import { SupabaseEdgeFetchPost } from "./supabase"

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