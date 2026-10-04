import { IBookingTimeActivitySlot } from "@/utils/interface-booking";
import { IDBBookingDetails, IDBTour, IDBTourIncludeDetails } from "@/utils/interface-database"
import { createSlice } from "@reduxjs/toolkit"
import { fetchLivePrice } from "./bookingTunk";
import { IBokunCart } from "@/utils/interface-bokun";



export interface IBookedOrderPrice {

  loading: boolean;

  /*fees: number;

  discountAmount: number;
  discountPercentage: number;
  priceWithDiscount: number;*/

  subtotal: number;
  taxes: number;
  total: number;
  totalDue: number;
  totalPaid: number;
}
export interface ISingleActivityPrice {
  loading: boolean;
  fees: number;
  adults: number;
  children: number;
  infants: number;

  subtotal: number;
  total: number;
  // total_discount: number;
  taxes: number;
  adult_x1_price: number;
  child_x1_price: number;
  infant_x1_price: number;

  discountAmount: number;
  discountPercentage: number;
  priceWithDiscount: number;
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

export type TPayWithMethod = "apple-pay" | "debit-credit-card" | "paypal";

interface IBookingSlice {

  tour: IDBTourIncludeDetails | null,

  whenToPay: "payment-type-pay-now" | "payment-later-reserve-now",
  payWith: TPayWithMethod,
  cardHolderName: string,

  filters: ISearchFilters;

  activeTimeSlot: IBookingTimeActivitySlot | null;

  price_booking: IBookedOrderPrice;
  price_active_product: ISingleActivityPrice;

  booked_product: IDBBookingDetails | null;


  cart: {
    cart_session_id: string;
    cart_session_id_single_product_check_price: string;
    cartDetails: IBokunCart | null
  }

}



export const initialState: IBookingSlice = {

  tour: null,

  booked_product: null,

  whenToPay: "payment-type-pay-now",
  // payWith: "debit-credit-card",
  payWith: "apple-pay",
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

  price_booking: {
    loading: false,
    // fees: 0,
    /*adults: 0,
    children: 0,
    infants: 0,*/

    subtotal: 0,
    total: 0,
    // total_discount: 0,
    taxes: 0,
    /*adult_x1_price: 0,
    child_x1_price: 0,
    infant_x1_price: 0,*/

    /*discountAmount: 0,
    discountPercentage: 0,
    priceWithDiscount: 0,*/

    totalDue: 0,
    totalPaid: 0
  },

  price_active_product: {
    loading: false,
    fees: 0,
    adults: 0,
    children: 0,
    infants: 0,
    subtotal: 0,
    total: 0,
    // total_discount: 0,
    taxes: 0,
    adult_x1_price: 0,
    child_x1_price: 0,
    infant_x1_price: 0,

    discountAmount: 0,
    discountPercentage: 0,
    priceWithDiscount: 0,
  },

  cart: {
    cart_session_id: "",
    cart_session_id_single_product_check_price: "",
    cartDetails: null
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
        price: ISingleActivityPrice;
        participants: IBookingParticipants;
        booking: IDBBookingDetails | null;
      }
    }) => {
      state.tour = action.payload.tour;
      state.activeTimeSlot = action.payload.activeTimeSlot;
      state.price_active_product = action.payload.price;
      state.filters.participantsCount = action.payload.participants;
      state.booked_product = action.payload.booking;
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
      state.booked_product = action.payload
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
      state.price_active_product = initialState.price_active_product;
    },

    setPriceLoading: (state, action: { payload: boolean }) => {
      state.price_active_product.loading = action.payload
    },

    setPrice: (state, action: { payload: ISingleActivityPrice }) => {
      state.price_active_product = action.payload
    },

    setCartDetails: (state, action: {
      payload: {
        cart: IBokunCart | null
      }
    }) => {
      state.cart.cartDetails = action.payload.cart
    }

  },


  extraReducers: (builder) => {
    builder
      .addCase(fetchLivePrice.pending, (state) => {
        state.price_active_product.loading = true;
      })
      .addCase(fetchLivePrice.fulfilled, (state, action) => {
        state.price_active_product.loading = false;
        state.price_active_product = action.payload;
      })
      .addCase(fetchLivePrice.rejected, (state, action) => {
        state.price_active_product.loading = false;
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
  setPrice,


  // cart
  setCartDetails

} = bookingSlice.actions;
