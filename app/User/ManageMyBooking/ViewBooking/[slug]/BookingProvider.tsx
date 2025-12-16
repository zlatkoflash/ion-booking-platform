import React, { createContext, useReducer, useContext, Dispatch, ReactNode, useState, useEffect } from 'react';

// --- 1. Type and State Definitions ---

/**
 * Type for any item (Booking, Payment, Refund). Replace 'any' with concrete interfaces later.
 */
export type BookingItem = any;

/**
 * Defines the shape of the entire state managed by the context/reducer.
 */
export interface BookingState {
  bookingItem: BookingItem;
  paymentItem: BookingItem;
  refunds: BookingItem[]; // Array of refunds
}

export const initialBookingState: BookingState = {
  bookingItem: null,
  paymentItem: null,
  refunds: [],
};

// --- 2. Action Definitions ---

export enum BookingActionType {

  SET_BOOKING_ITEM = 'SET_BOOKING_ITEM',
  SET_PAYMENT_ITEM = 'SET_PAYMENT_ITEM',
  ADD_REFUND = 'ADD_REFUND',
  REMOVE_REFUND = 'REMOVE_REFUND',
  UPDATE_REFUND = 'UPDATE_REFUND',
  RESET_STATE = 'RESET_STATE',
}

export type BookingAction =
  | { type: BookingActionType.SET_BOOKING_ITEM; payload: BookingItem }
  | { type: BookingActionType.SET_PAYMENT_ITEM; payload: BookingItem }
  | { type: BookingActionType.ADD_REFUND; payload: BookingItem }
  | { type: BookingActionType.REMOVE_REFUND; payload: { id: string | number } }
  | { type: BookingActionType.UPDATE_REFUND; payload: BookingItem }
  | { type: BookingActionType.RESET_STATE };


// --- 3. The Reducer Function ---

/**
 * The core reducer logic handles all state transitions.
 */
function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case BookingActionType.SET_BOOKING_ITEM:
      return { ...state, bookingItem: action.payload };

    case BookingActionType.SET_PAYMENT_ITEM:
      return { ...state, paymentItem: action.payload };

    case BookingActionType.ADD_REFUND:
      return { ...state, refunds: [...state.refunds, action.payload] };

    case BookingActionType.REMOVE_REFUND:
      return {
        ...state,
        refunds: state.refunds.filter((refund: any) => refund.id !== action.payload.id),
      };

    case BookingActionType.UPDATE_REFUND:
      return {
        ...state,
        refunds: state.refunds.map((refund: any) =>
          (refund.id === action.payload.id ? action.payload : refund)
        ),
      };

    case BookingActionType.RESET_STATE:
      return initialBookingState;

    default:
      return state;
  }
}

// --- 4. Context Definition and Provider Component ---

/**
 * Defines the structure of the value provided by the Context.
 */
interface BookingContextValue {
  state: BookingState;
  dispatch: Dispatch<BookingAction>;
  setBookingItem: (item: BookingItem) => void;
  addRefund: (item: BookingItem) => void;
  reset: () => void;
}

// Create the Context with a placeholder default value
export const BookingSingleItemContext = createContext<BookingContextValue | undefined>(undefined);

/**
 * The Provider component that wraps the application part needing the context.
 */
export const BookingSingleItemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialBookingState);

  // Helper functions to simplify common dispatch calls
  const setBookingItem = (item: BookingItem) => {
    dispatch({ type: BookingActionType.SET_BOOKING_ITEM, payload: item });
  };

  const addRefund = (item: BookingItem) => {
    dispatch({ type: BookingActionType.ADD_REFUND, payload: item });
  };

  const reset = () => {
    dispatch({ type: BookingActionType.RESET_STATE });
  };

  const contextValue: BookingContextValue = {
    state,
    dispatch,
    setBookingItem,
    addRefund,
    reset,
  };

  useEffect(() => {
    console.log("Booking Provider is set");
  }, []);

  return (
    <BookingSingleItemContext.Provider value={contextValue}>
      {children}
    </BookingSingleItemContext.Provider>
  );
};

// --- 5. Custom Hook for Consumers ---

/**
 * Custom hook to consume the BookingSingleItemContext.
 */
export const useBookingSingleItem = () => {
  const context = useContext(BookingSingleItemContext);
  if (!context) {
    throw new Error('useBookingSingleItem must be used within a BookingSingleItemProvider');
  }
  return context;
};