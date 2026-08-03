import { IBookingTimeActivitySlot } from "@/utils/interface-booking";
import { IDBBookingDetails, IDBTour, IDBTourIncludeDetails } from "@/utils/interface-database"
import { createSlice } from "@reduxjs/toolkit"
import { fetchLivePrice } from "./bookingTunk";




export interface IBookingPrice {
  loading: boolean;
  fees: number;
  adults: number;
  children: number;
  subtotal: number;
  total: number;
  total_discount: number;
  taxes: number;
  adult_x1_price: number;
  child_x1_price: number;
  infant_x1_price: number;
}

export interface IBookingParticipants {
  adults: number;
  children: number;
  infants: number;
}

export interface ISearchFilters {
  availability: string;
  category: string;
  price_range: string;
  duration: string;
  city: string;
  selectedDates: string[];
  participantsCount: IBookingParticipants;
  timeSlot?: string | number;
}

interface IBookingSlice {

  tour: IDBTourIncludeDetails | null,

  whenToPay: "payment-type-pay-now" | "payment-later-reserve-now",
  payWith: "apple-pay" | "debit-credit-card" | "paypal",
  cardHolderName: string,

  filters: ISearchFilters;

  activeTimeSlot: IBookingTimeActivitySlot | null;

  price: IBookingPrice;

  booking: IDBBookingDetails | null;
}



export const initialState: IBookingSlice = {

  tour: null,

  booking: null,

  whenToPay: "payment-type-pay-now",
  payWith: "debit-credit-card",
  cardHolderName: "",

  // filters
  filters: {
    // selectedTour: null,
    city: "",
    selectedDates: [],
    participantsCount: {
      adults: 0,
      children: 0,
      infants: 0
    },

    availability: "",
    category: "",
    price_range: "",
    duration: "",

    timeSlot: ""
  },

  activeTimeSlot: null,

  price: {
    loading: false,
    fees: 0,
    adults: 0,
    children: 0,
    subtotal: 0,
    total: 0,
    total_discount: 0,
    taxes: 0,
    adult_x1_price: 0,
    child_x1_price: 0,
    infant_x1_price: 0,
  }
}

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {

    setInitialHydratingData: (state, action: {
      payload: {
        tour: IDBTourIncludeDetails | null;
        activeTimeSlot: IBookingTimeActivitySlot | null;
        price: IBookingPrice;
        participants: IBookingParticipants;
        booking: IDBBookingDetails | null;
      }
    }) => {
      state.tour = action.payload.tour;
      state.activeTimeSlot = action.payload.activeTimeSlot;
      state.price = action.payload.price;
      state.filters.participantsCount = action.payload.participants;
      state.booking = action.payload.booking;
    },

    // paymet start
    setWhenToPay: (state, action) => {
      state.whenToPay = action.payload
    },
    setPayWith: (state, action) => {
      state.payWith = action.payload
    },
    setCardHolderName: (state, action) => {
      state.cardHolderName = action.payload
    },
    // payment end


    // filters start
    /*setPartialFilter: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload
      }
    },*/
    setFilters: (state, action) => {
      state.filters = action.payload
    },
    /*setFilterSelectedTour: (state, action) => {
      state.filters.selectedTour = action.payload
    },*/
    setFilterSelectedDates: (state, action) => {
      state.filters.selectedDates = action.payload
    },
    setFilterParticipantsCount: (state, action) => {
      state.filters.participantsCount = action.payload
    },
    setFilterParticipantCountAdults: (state, action) => {
      state.filters.participantsCount.adults = action.payload
    },
    setFilterParticipantCountChildren: (state, action) => {
      state.filters.participantsCount.children = action.payload
    },

    setFilterAvailability: (state, action) => {
      state.filters.availability = action.payload
    },
    setFilterCategory: (state, action) => {
      state.filters.category = action.payload
    },
    setFilterPriceRange: (state, action) => {
      state.filters.price_range = action.payload
    },
    setFilterDuration: (state, action) => {
      state.filters.duration = action.payload
    },
    setFilterCity: (state, action) => {
      state.filters.city = action.payload
    },
    // filters end

    // active time slot start
    setTour: (state, action) => {
      state.tour = action.payload
    },
    setBooking: (state, action) => {
      state.booking = action.payload
    },
    setActiveTimeSlot: (state, action) => {
      state.activeTimeSlot = action.payload
    },
    setActiveTimeSlotAndTour: (state, action: {
      payload: {
        activeTimeSlot: IBookingTimeActivitySlot | null,
        tour: IDBTourIncludeDetails | null,
        filters: ISearchFilters
      }
    }) => {
      state.activeTimeSlot = action.payload.activeTimeSlot;
      state.tour = action.payload.tour;
      state.filters = action.payload.filters;
    },
    // active time slot end


    // Resetting slice
    doResetOfTheSlice: (state) => {
      state.tour = initialState.tour;
      state.whenToPay = initialState.whenToPay;
      state.payWith = initialState.payWith;
      state.filters = initialState.filters;
      state.activeTimeSlot = initialState.activeTimeSlot;
      state.price = initialState.price;
    },

    setPriceLoading: (state, action: { payload: boolean }) => {
      state.price.loading = action.payload
    },

    setPrice: (state, action: { payload: IBookingPrice }) => {
      state.price = action.payload
    }

  },


  extraReducers: (builder) => {
    builder
      .addCase(fetchLivePrice.pending, (state) => {
        state.price.loading = true;
      })
      .addCase(fetchLivePrice.fulfilled, (state, action) => {
        state.price.loading = false;
        state.price = action.payload;
      })
      .addCase(fetchLivePrice.rejected, (state, action) => {
        state.price.loading = false;
        // state.price = initialState.price;
      })
  }
})

export const {
  setInitialHydratingData,

  setPayWith,
  setWhenToPay,
  setCardHolderName,

  // filters start
  setFilters,
  // setFilterSelectedTour,
  setFilterSelectedDates,
  setFilterParticipantsCount,
  setFilterParticipantCountAdults,
  setFilterParticipantCountChildren,
  setFilterAvailability,
  setFilterCategory,
  setFilterPriceRange,
  setFilterDuration,
  setFilterCity,
  // filters end

  // active time slot start
  setActiveTimeSlot,
  setActiveTimeSlotAndTour,
  setTour,
  setBooking,
  // active time slot end

  // Resetting slice
  doResetOfTheSlice,
  setPriceLoading,
  setPrice

} = bookingSlice.actions;
