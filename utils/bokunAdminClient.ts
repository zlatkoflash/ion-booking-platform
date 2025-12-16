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