import { IBookingTimeActivitySlot } from "@/utils/interface-booking";
import { IDBTourIncludeDetails } from "@/utils/interface-database";

// ⚡️ Shared helper that processes both Slot rules and Database Tour configurations
// will load the data from server or from api
export const calculateSlotData = (
  state: any,
  slot: IBookingTimeActivitySlot | null,
  tour: IDBTourIncludeDetails | null
) => {
  if (slot) {
    /*// 1. Core Bokun API data extraction
    state.activeRateId = slot.defaultRateId;

    const activeRateConfig = slot.rates.find((rate: any) => rate.id === slot.defaultRateId);
    state.activePricingCategoryIds = activeRateConfig ? activeRateConfig.pricingCategoryIds : [];

    const activePrices = slot.pricesByRate.find((p: any) => p.activityRateId === slot.defaultRateId);
    if (activePrices) {
      state.activePricesByCategory = activePrices.pricePerCategoryUnit.reduce((acc: any, currentUnit: any) => {
        acc[currentUnit.id] = {
          amount: currentUnit.amount.amount,
          currency: currentUnit.amount.currency
        };
        return acc;
      }, {});
    }

    // 2. Cross-reference processing using the 'tour' configuration from database
    if (tour) {
      // Example: Cross-reference ticket category labels from your database 
      // with Bokun's raw category IDs to make building ticket forms easier.
      // e.g., if (tour.ticketTypes) { ... map labels to state ... }
    }*/
  } else {
    /*// Clean up all dynamic states when slot is wiped
    state.activeRateId = null;
    state.activePricingCategoryIds = [];
    state.activePricesByCategory = {};*/
  }
};