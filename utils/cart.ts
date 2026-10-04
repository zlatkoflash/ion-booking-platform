import { IBookingParticipants } from "@/redux/booking/bookingSlice";
import { getApiData } from "./api";
import { slotDateTimeToSupabaseTimeZone00 } from "./dates-times";
import { IBokunCart } from "./interface-bokun";
import { IBookingTimeActivitySlot } from "./interface-booking";
import { IDBTourIncludeDetails } from "./interface-database";


export const BOOKING_CART_SESSION_COOKIE = 'bokun_cart_session_id';

export async function getCartDetails(sessionId: string): Promise<{
  ok: boolean,
  detailsCart: IBokunCart
}> {
  // const sessionId = await getCartSessionId();
  return await getApiData('/booking-public/get-cart-details', "POST", {
    sessionId: sessionId
  }, "not-authorize", "application/json");
}


export async function AddActivityToCart(
  cart_session_id: string,
  tour: IDBTourIncludeDetails,
  timeSlot: IBookingTimeActivitySlot,
  participantsCount: IBookingParticipants,
  date: string, // YYYY-MM-DD
  browserGuestId: string,
  locale: string
): Promise<{
  ok: boolean,
  detailsAddingToCartSC: IBokunCart,
  message: string
}> {
  const result = await getApiData<{
    ok: boolean,
    detailsAddingToCartSC: IBokunCart,
    message: string
  }>("/booking-public/add-activity-to-cart", "POST", {
    // sessionId: cart.cart_session_id,
    sessionId: cart_session_id,
    tour_id: tour?.id,
    startTimeId: timeSlot?.startTimeId,
    // participantsCount: bookingFilters.participantsCount,
    participantsCount: participantsCount,
    // date_start: bookingFilters.selectedDates[0],
    date_start: date,
    start_time: timeSlot?.startTime,
    browser_id: browserGuestId,
    language: locale,
    start_time_label: timeSlot?.startTimeLabel,
    date_tour_start_zone_0: slotDateTimeToSupabaseTimeZone00(
      // bookingFilters.selectedDates[0],
      date,
      timeSlot?.startTime as string
    ),
    rateId: timeSlot?.defaultRateId
  }, "not-authorize", "application/json");

  return result;
}