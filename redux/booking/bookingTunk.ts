import { createAsyncThunk } from "@reduxjs/toolkit";
import { IBookingParticipants, IBookingPrice, initialState } from "./bookingSlice";
import { getApiData } from "@/utils/api";
import { RootState } from "../store";



export const fetchLivePrice = createAsyncThunk<
  IBookingPrice, // Return type
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
        rateId: booking.activeTimeSlot?.defaultRateId
      };

      // 3. Perform the API call with the data from the state
      const resultForPrice = await getApiData<{
        ok: boolean;
        price: IBookingPrice;
      }>("/booking-public/get-live-price", "POST", payload, "not-authorize", "application/json");

      if (resultForPrice && resultForPrice.ok) {
        return resultForPrice.price;
      }
      return initialState.price;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch price");
    }
  }
);



/*export const reserveBooking = createAsyncThunk<
  IBookingPrice, // what need to return
  void,
  { state: RootState }
>(
  "booking/reserveBooking",
  async (_, { getState, dispatch, rejectWithValue }) => {

    const { booking, auth } = getState();
    const user = auth.user;
    const payload = {};

    try {

      const resultForPrice = await getApiData<{
        ok: boolean,
        message: string
      }>(
        "/booking-public/reserve-booking", 
        "POST", 
        payload, 
        "not-authorize", 
        "application/json"
      );

      console.log("resultForPrice:", resultForPrice);

      if (resultForPrice && resultForPrice.ok) {
        return resultForPrice.price;
      }
      return initialState.price;
    } catch (error: any) {

      return rejectWithValue(error.message || "Failed to fetch price");

    }

  }
);*/