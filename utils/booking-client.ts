import { IBookingParticipants } from "@/redux/booking/bookingSlice";
import { IBookingTimeActivitySlot } from "./interface-booking";
import { IDBBooking, IDBBookingDetails, IDBTour, IDBTourIncludeDetails } from "./interface-database";
import { getApiData } from "./api";
import { ISupabaseUser } from "./interface-auth";


export const getPriceForCategory = (tour: IDBTourIncludeDetails | IDBTour, timeSlot: IBookingTimeActivitySlot, priceCategory: "adult" | "children"): number => {
  let index = 0; // for adults
  if (priceCategory === "children") index = 1;
  const priceCategoryObj = tour.pricing_categories[index];
  const slotRate = timeSlot.pricesByRate.find((r) => r.activityRateId === timeSlot.defaultRateId);
  const priceFinalCategory = slotRate?.pricePerCategoryUnit.find((r) => r.id === priceCategoryObj?.id);

  return priceFinalCategory?.amount.amount as number;
}

export const getTotalCountFromParticipantObject = (participants: IBookingParticipants) => {
  let total = 0;
  if (participants.adults && !isNaN(participants.adults)) {
    total += participants.adults;
  }
  if (participants.children && !isNaN(participants.children)) {
    total += participants.children;
  }
  if (participants.infants && !isNaN(participants.infants)) {
    total += participants.infants;
  }
  // console.log("total from group:", total);
  return total;
}

export const getParticipantsLabel = (
  participants: IBookingParticipants,
  translations: {
    adults: string,
    adult: string,
    children: string,
    child: string,
    infants: string,
    infant: string
  }
): string => {
  const parts: string[] = [];

  if (participants.adults > 0) parts.push(`${participants.adults} ${participants.adults > 1 ? translations.adults : translations.adult}`);
  if (participants.children > 0) parts.push(`${participants.children} ${participants.children > 1 ? translations.children : translations.child}`);
  if (participants.infants > 0) parts.push(`${participants.infants} ${participants.infants > 1 ? translations.infants : translations.infant}`);

  return parts.join(', ');
};


export const getArrayOfParticipantsForUpdateTheBooking = (
  tour: IDBTourIncludeDetails,
  // booking: IDBBookingDetails,
  participants: IBookingParticipants
): {
  pricingCategoryBooking: { pricingCategoryId: number }
}[] => {

  const arrayNewParticipants: { pricingCategoryBooking: { pricingCategoryId: number } }[] = []

  for (let i = 0; i < participants.adults; i++) {
    arrayNewParticipants.push({
      pricingCategoryBooking: {
        pricingCategoryId: tour.pricing_categories[0].id
      }
    })
  }

  for (let i = 0; i < participants.children; i++) {
    arrayNewParticipants.push({
      pricingCategoryBooking: {
        pricingCategoryId: tour.pricing_categories[1].id
      }
    })
  }

  for (let i = 0; i < participants.infants; i++) {
    arrayNewParticipants.push({
      pricingCategoryBooking: {
        pricingCategoryId: tour.pricing_categories[2].id
      }
    })
  }

  return arrayNewParticipants;
}



export const ProcessTheCartToReservedBooking = async (
  userAuth: ISupabaseUser | null,
  cart_session_id: string,
  locale: string,
  browserGuestId: string,
): Promise<{
  ok: boolean;
  message: string;
  booking: IDBBooking
}> => {

  const details = await getApiData<{
    ok: boolean;
    message: string;
    booking: IDBBooking
  }>("/booking-public/reserve-the-booking", "POST", {
    // sessionId: cart.cart_session_id,
    sessionId: cart_session_id,
    language: locale,
    browser_id: browserGuestId,
  }, userAuth !== null ? "authorize" : "not-authorize", "application/json");

  return details;

}


export const AddCustomerBookingDetails = async (
  customer_details: {
    first_name: string,
    second_name: string,
    email_address: string,
    phone_number: string,
    address: string,
    city: string,
    country: string,
  },
  booking_order_id: string,
  userAuth: ISupabaseUser | null
): Promise<{
  ok: boolean;
  message: string;
}> => {
  const result = await getApiData<{
    ok: boolean;
    message: string;
  }>("/booking-public/add-customer-booking-details", "POST",
    {
      customer_details: customer_details,
      booking_id: booking_order_id
    },
    userAuth === null ? "not-authorize" : "authorize",
    "application/json");

  return result;
}

/**
 * IT will add payment method to the parent booking and all child booking products
 */
export const AttachDefaultPaymentForBooking = async (
  bookingParentId: string,
  paymentMethodId: string,
  userAuth: ISupabaseUser | null
): Promise<{
  ok: boolean;
  message: string;
}> => {
  const result = await getApiData<{
    ok: boolean;
    message: string;
  }>("/booking-public/attach-default-payment-for-booking", "POST", {
    bookingParentId,
    paymentMethodId
  }, userAuth === null ? "not-authorize" : "authorize", "application/json");

  return result;
}


export const ConfirmReservedBooking = async (

  parentBookingId: string,
  whenToPay: "payment-type-pay-now" | "payment-later-reserve-now",
  locale: string,
  authUser: ISupabaseUser | null

): Promise<{
  ok: boolean,
  message: string,
  bookingHash: string | null
}> => {
  const resultAfterConfirming = await getApiData<{
    ok: boolean,
    message: string,
    bookingHash: string | null
  }>(
    "/booking-public/book-the-experience",
    "POST",
    {
      // booking_id: parentBooking?.id,
      booking_id: parentBookingId,
      whenToPay: whenToPay,
      language: locale
    },
    authUser !== null ? "authorize" : "not-authorize",
    "application/json"
  );

  console.log("resultAfterConfirming::::", resultAfterConfirming);

  return resultAfterConfirming
}



export const updateBookedProduct = async (
  payload: {
    productConfirmationCode: string,
    participants_new: IBookingParticipants,
    sessionCartTemporaryProduct: string,
    date: string,
    startTimeId: number,
    startTimeLabel: string,
    startTime: string,
    rateId: number,
    language: string
  }
): Promise<{
  ok: boolean,
  message: string,
}> => {
  const resultUpdating = await getApiData<{
    ok: boolean,
    message: string,
  }>(
    "/booking-client/update-booked-product",
    "POST",
    payload,
    "authorize",
    "application/json"
  );
  return resultUpdating;
}