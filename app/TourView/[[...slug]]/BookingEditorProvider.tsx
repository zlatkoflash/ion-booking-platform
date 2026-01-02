"use client";
import { IBookingDatabaseNet } from '@/interface/payment.booking';
import { IBokunBooking } from '@/utils/bokun';
import React, { createContext, useContext, useState, ReactNode } from 'react';

// 1. Define the union type for the mode
type ClientMode = "booking" | "booking-editor";

// 2. Define the shape of the context value
interface BookingEditorContextType {
  clientType?: ClientMode;
  bokunBookingForediting?: IBokunBooking
  bookingDBNet?: IBookingDatabaseNet,
  bookingPayments?: any[],
  bookingRefunds?: any[],
  isModalSuccessOpen?: boolean,
  setIsModalSuccessOpen?: (isOpen: boolean) => void
  // setClientType: (type: ClientMode) => void;
}


// 3. Create the context with an undefined default
const BookingEditorContext = createContext<BookingEditorContextType | undefined>(undefined);

// 4. Create the Provider component
export const BookingEditorProvider = ({ children, clientType, bokunBookingForediting, bookingDBNet, bookingPayments, bookingRefunds }: { children: ReactNode, clientType?: ClientMode, bokunBookingForediting?: IBokunBooking, bookingDBNet?: IBookingDatabaseNet, bookingPayments?: any[], bookingRefunds?: any[] }) => {
  // const [clientType, setClientType] = useState<ClientMode>("booking");

  const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);

  return (
    <BookingEditorContext.Provider value={{
      clientType,
      bokunBookingForediting,
      bookingDBNet,
      bookingPayments,
      bookingRefunds,
      isModalSuccessOpen,
      setIsModalSuccessOpen
    }}>
      {children}
    </BookingEditorContext.Provider>
  );
};

// 5. Custom hook for easy consumption
export const useBookingEditor = () => {
  const context = useContext(BookingEditorContext);
  if (context === undefined) {
    throw new Error('useBookingEditor must be used within a BookingEditorProvider');
  }
  return context;
};