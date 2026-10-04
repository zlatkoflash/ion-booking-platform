import { createAsyncThunk } from "@reduxjs/toolkit";
import { IBookingParticipants, ISingleActivityPrice, initialState } from "./bookingSlice";
import { getApiData } from "@/utils/api";
import { RootState } from "../store";



export const fetchLivePrice = createAsyncThunk<
  ISingleActivityPrice, // Return type
  void,          // No arguments (payload is now void)
  { state: RootState } // Define state type for access
>(
  "booking/fetchLivePrice",
  async (_, { getState, rejectWithValue }) => {
    try {
      // 1. Access the entire state
      const { booking } = getState();

      // 2. Extract the data needed for the API from your state
      // (Ensure these fields match your slice structure)
      const payload = {
        tourId: booking.tour?.id,
        startDate: booking.filters.selectedDates.length > 0 ? booking.filters.selectedDates[0] : "",
        participants: booking.filters.participantsCount,
        // slotId: booking.filters.timeSlot,
        rateId: booking.activeTimeSlot?.defaultRateId,
        startTimeId: booking.activeTimeSlot?.startTimeId,
        cartSingleProductLiveSessionId: booking.cart.cart_session_id_single_product_check_price
      };

      // 3. Perform the API call with the data from the state
      const resultForPrice = await getApiData<{
        ok: boolean;
        price: ISingleActivityPrice;
      }>("/booking-public/get-live-price", "POST", payload, "not-authorize", "application/json");

      console.log("Loading live price...", resultForPrice);

      if (resultForPrice && resultForPrice.ok) {
        return resultForPrice.price;
      }
      return initialState.price_active_product;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch price");
    }
  }
);


