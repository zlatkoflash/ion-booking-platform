/**
 * bookingCalendarSlice will hold the calendar data or details related for the booking calendar and the booking
 */

import { IBookPricingEngine } from "@/app/TourView/[[...slug]]/content/BookingSidebarProvider";
import { IBokunActivityRate, IBokunAvailability } from "@/interface/Interface";
import { IBookingDatabaseNet } from "@/interface/payment.booking";
import { RootState } from "@/libs/store";
import { IBokunBooking, IBokunGetExperienceById } from "@/utils/bokun";
import { BokunAvailabilityRateTotalPrice, FPriceEngine_ObjectForCount, FTotalCountPerRate } from "@/utils/FPriceEngine";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ClientMode = "booking" | "booking-editor";

export interface IBookingCalendarState {

  dataForExperience: IBokunGetExperienceById | null,

  availablilitesForDateRange: IBokunAvailability[],

  /**
   * avaialability is object that hold the startTimeId, that is important
   */
  selectedAvailability: IBokunAvailability,

  selectedRate: IBokunActivityRate,

  // it will hold the year month and the date YYYY-MM-DD
  // calendarActiveMonth: Date,
  calendarActiveMonth: string,

  /**
   * selectedDate is the Date selected on the calendar,
   * the format will be YYYY-MM-DD
   */
  selectedDate: string | null,

  priceEngine: IBookPricingEngine,

  // now for the editor / administrator of the booking we need variables
  editor: {
    clientType: ClientMode,
    bokunBookingForediting: IBokunBooking | null,
    bookingDBNet: IBookingDatabaseNet | null
    bookingPayments: any[],
    bookingRefunds: any[],
    isModalSuccessOpen: boolean,
    iCanCancel: boolean,
    BookingDB: any | null,
    // setIsModalSuccessOpen:
  }
}


const initialState: IBookingCalendarState = {

  dataForExperience: null,

  availablilitesForDateRange: [],
  selectedAvailability: {} as IBokunAvailability,
  selectedRate: {} as IBokunActivityRate,

  // calendarActiveMonth: new Date(),
  calendarActiveMonth: new Date().toISOString().split('T')[0],

  selectedDate: null,

  priceEngine: {
    counts: [],
    total: 0

  } as IBookPricingEngine,

  editor: {
    clientType: "booking",
    bokunBookingForediting: null,
    bookingDBNet: null,
    bookingPayments: [],
    bookingRefunds: [],
    isModalSuccessOpen: false,
    iCanCancel: false,
    BookingDB: null
  }
}

export const bookingCalendarSlice = createSlice({
  name: 'bookingCalendar',
  initialState: initialState,
  reducers: {
    setAvailablilitesForDateRange: (state, action) => {
      state.availablilitesForDateRange = action.payload;
    },
    setSelectedAvailability: (state, action) => {
      state.selectedAvailability = action.payload;
    },
    setSelectedRate: (state, action) => {
      state.selectedRate = action.payload;
    },
    set_calendarActiveMonth: (state, action) => {
      state.calendarActiveMonth = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },

    setSelectedAvailabilityAndTheRate: (state, action: PayloadAction<IBokunAvailability>) => {
      const availability = action.payload;

      state.selectedAvailability = action.payload;
      const defaultRate = availability.rates.find(r => { return r.id === availability.defaultRateId });
      console.log("defaultRate:", defaultRate);
      // setSelectedRate(defaultRate as IBokunActivityRate);
      // dispatch(BookingCalendarActions.setSelectedRate(defaultRate as IBokunActivityRate));
      state.selectedRate = defaultRate as IBokunActivityRate;
      console.log("availablility:", availability);

    },

    setDataForExperience: (state, action: PayloadAction<IBokunGetExperienceById>) => {
      state.dataForExperience = action.payload;
    },


    setIsModalSuccessOpen: (state, action: PayloadAction<boolean>) => {
      state.editor.isModalSuccessOpen = action.payload;
    },

    hydrateMyAdminEditor: (state, action: PayloadAction<{
      clientType: ClientMode,
      bokunBookingForediting: IBokunBooking, bookingDBNet: IBookingDatabaseNet, bookingPayments: any[], bookingRefunds: any[], iCanCancel: boolean, BookingDB: any, isModalSuccessOpen: boolean
    }>) => {
      state.editor = action.payload;
    },

    set_priceEngine: (state, action: PayloadAction<IBookPricingEngine>) => {
      state.priceEngine = action.payload;
    },


    /**
     * this reducer is used to update the participant count
     */
    updatePriceEngine: (state, { payload }) => {
      // 1. Destructure the data from the payload
      const {
        addRemoveParticipant,
        priceCategoryId,
        selectedAvailability,
        rate
      } = payload;

      console.log("======================================");
      console.log("priceCategoryId:", priceCategoryId);
      console.log("availability:", selectedAvailability);
      console.log("rate:", rate);
      console.log("payload:", payload);

      console.log('state:', state);

      // 2. Use your helper function (pass state.priceEngine instead of a local copy)
      let objectForCount = FPriceEngine_ObjectForCount(
        priceCategoryId,
        selectedAvailability,
        rate,
        state.priceEngine
      );

      // 3. If object doesn't exist, push a new one (Immer handles the "mutation")
      if (objectForCount === undefined || objectForCount === null) {
        state.priceEngine.counts.push({
          availabilityId: selectedAvailability.id,
          priceCategoryId: priceCategoryId,
          rateId: rate.id,
          count: 0,
        });

        // Refresh the reference to the object we just added
        objectForCount = FPriceEngine_ObjectForCount(
          priceCategoryId,
          selectedAvailability,
          rate,
          state.priceEngine
        );
      }

      // 4. Update the count directly on the state object
      if (objectForCount !== undefined) {
        if (addRemoveParticipant === '-' && objectForCount.count > 0) {
          objectForCount.count--;
        }
        else if (
          addRemoveParticipant === '+' &&
          objectForCount.count < selectedAvailability.availabilityCount
        ) {
          objectForCount.count++;
        }
      }

      // NOTE: You don't need set_priceEngine or return state; 
      // Redux Toolkit saves the changes automatically!
    }


  },
  extraReducers: (builder) => {

  }
})


export const BookingCalendarActions = bookingCalendarSlice.actions;
export default bookingCalendarSlice.reducer;



/**
   * 
   * @returns availiabilityCount will show the count for availiability, someitmes it must be included the availability from the booked booking for editing
   */
export const availiabilityCount = (state: IBookingCalendarState, availability: IBokunAvailability): number => {
  const clientType = state.editor.clientType;
  const bokunBookingForediting = state.editor.bokunBookingForediting;
  let count_availablitiy = availability.availabilityCount;
  if (clientType === "booking-editor") {
    const availibailityFromBooking = bokunBookingForediting?.activityBookings[0];


    // console.log("availability.startTimeId === availibailityFromBooking?.startTimeId:", availability.startTimeId, availibailityFromBooking?.startTimeId);

    if (availability.startTimeId === availibailityFromBooking?.startTimeId) {

      // console.log("availability.startTimeId === availibailityFromBooking?.startTimeId:", availability.startTimeId, availibailityFromBooking?.startTimeId);

      count_availablitiy += bokunBookingForediting?.activityBookings[0].pricingCategoryBookings.length || 0;
    }
  }
  return count_availablitiy;
}

export const bookedTotalSum = (state: IBookingCalendarState): number => {
  const bookingDBNet = state.editor.bookingDBNet;
  if (bookingDBNet === null) return 0;
  return (bookingDBNet?.total_paid_cents - bookingDBNet?.total_refunded_cents) / 100;
}
export const selectedRate_totalSum = (state: IBookingCalendarState): number => {
  const selectedAvailability = state.selectedAvailability;
  const selectedRate = state.selectedRate;
  const priceEngine = state.priceEngine;
  return BokunAvailabilityRateTotalPrice(
    selectedAvailability,
    selectedRate,
    priceEngine
  )
}
export const differenceWhenEditingBooking = (state: IBookingCalendarState): number => {
  const newTotal = selectedRate_totalSum(state);
  const oldTotal = bookedTotalSum(state);
  return (newTotal - oldTotal);
}

export const selectedRate_countParticipants = (state: IBookingCalendarState): number => {

  console.log("Returning the count of the participants: selectedRate_countParticipants");
  const selectedAvailability = state.selectedAvailability;
  const selectedRate = state.selectedRate;
  const priceEngine = state.priceEngine;

  return FTotalCountPerRate(
    selectedAvailability,
    selectedRate,
    priceEngine
  );
}