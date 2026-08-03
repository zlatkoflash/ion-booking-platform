import { IBookingParticipants } from "@/redux/booking/bookingSlice";
import { IBookingTimeActivitySlot } from "./interface-booking";
import { IDBBookingDetails, IDBTour, IDBTourIncludeDetails } from "./interface-database";


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