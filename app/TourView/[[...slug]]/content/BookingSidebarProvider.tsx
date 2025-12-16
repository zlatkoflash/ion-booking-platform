// /src/context/BookingSidebarContext.tsx
'use client'; // 👈 Essential for client-side state hooks

import { IBokunActivityRate, IBokunAvailability, IExperienceCompleteZ } from '@/interface/Interface';
import { IBokunGetExperienceById } from '@/utils/bokun';
import { BokunAvailabilityRateTotalPrice, FTotalCountPerRate } from '@/utils/FPriceEngine';
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface IBookPriceEngineCount {
  availabilityId: string,
  rateId: number,
  priceCategoryId:
  number,
  count: number
}
export interface IBookPricingEngine {
  /**
   * When count is not existing for,
   * availabilityId:number, rateId:number, priceCategoryId: number,
   * counts must push
   */
  counts: IBookPriceEngineCount[],
  /**
   * if total don't exist for availabilityId: number, rateId: number,
   * it should be added
   */
  /*total: {
    availabilityId: number, rateId: number,
    amount: number
  }[]*/
}

// 1. Define the Shape of the Context Value
interface BookingSidebarContextType {
  statusMessage: string;
  updateStatus: (newMessage: string) => void;
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
  dataForExperience: IBokunGetExperienceById,
  experience: IExperienceCompleteZ,

  /***
   * When click on the calendar this slot is selected and by it it is showing some other details
   */
  // selectedSlot: IBokunAvailability,
  // setSelectedSlot: (slot: IBokunAvailability) => void,
  selectedAvailability: IBokunAvailability,
  setSelectedAvailability: (availability: IBokunAvailability) => void,

  selectedRate: IBokunActivityRate,
  setSelectedRate: (selectedRate: IBokunActivityRate) => void,

  calendarActiveMonth: Date,
  set_calendarActiveMonth: (d: Date) => void,

  /**
   * availablilitesForDateRange is the list of availabilities for the selected month on the calendar
   */
  availablilitesForDateRange: IBokunAvailability[],
  setAvailablilitesForDateRange: (availablilitesForDateRange: IBokunAvailability[]) => void,

  /**
   * selectedDate is the Date selected on the calendar
   */
  selectedDate: string | null,
  setSelectedDate: (date: string | null) => void,


  priceEngine: IBookPricingEngine,
  set_priceEngine: (priceEngine: IBookPricingEngine) => void,


  selectedRate_countParticipants: () => number,
  selectedRate_totalSum: () => number

}

// 2. Create the Context 
const BookingSidebarContext = createContext<BookingSidebarContextType>({
  statusMessage: '',
  updateStatus: () => { },
  isSidebarOpen: false,
  setSidebarOpen: () => { },
  dataForExperience: {} as IBokunGetExperienceById,
  experience: {} as IExperienceCompleteZ,
  // selectedSlot: {} as IBokunAvailability,
  // setSelectedSlot: () => { },
  selectedAvailability: {} as IBokunAvailability,
  setSelectedAvailability: () => { },

  availablilitesForDateRange: [] as IBokunAvailability[],
  setAvailablilitesForDateRange: () => { },

  selectedDate: null,
  setSelectedDate: () => { },

  calendarActiveMonth: new Date(),
  set_calendarActiveMonth: () => { },

  priceEngine: {} as IBookPricingEngine,
  set_priceEngine: () => { },


  selectedRate: {} as IBokunActivityRate,
  setSelectedRate: () => { },


  selectedRate_countParticipants: () => { return 0 },
  selectedRate_totalSum: () => { return 0; },



});

// 3. Define the Provider Component
interface BookingSidebarProviderProps {
  children: ReactNode; // Children prop type
  dataForExperience: IBokunGetExperienceById
}

export function BookingSidebarProvider({ children, dataForExperience }: BookingSidebarProviderProps) {
  // Example shared states
  const [statusMessage, setStatusMessage] = useState('Awaiting selection...');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  /***
   * When click on the calendar this slot is selected and by it it is showing some other details
   */
  const [selectedSlot, setSelectedSlot] = useState<IBokunAvailability>({} as IBokunAvailability);

  const updateStatus = (newMessage: string) => {
    setStatusMessage(newMessage);
  };

  const setSidebarOpen = (isOpen: boolean) => {
    setIsSidebarOpen(isOpen);
  };

  const [availablilitesForDateRange, setAvailablilitesForDateRange] = useState<IBokunAvailability[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const [selectedAvailability, setSelectedAvailability] = useState<IBokunAvailability>({} as IBokunAvailability);


  const [selectedRate, setSelectedRate] = useState<IBokunActivityRate>({} as IBokunActivityRate);

  const [priceEngine, set_priceEngine] = useState<IBookPricingEngine>({
    counts: [],
    total: []
  } as IBookPricingEngine);

  const [calendarActiveMonth, set_calendarActiveMonth] = useState<Date>(new Date());

  // selectedRate_countParticipants:()=>{return 0},
  // selectedRate_totalSum:()=>{return 0;}

  const selectedRate_countParticipants = (): number => {
    return FTotalCountPerRate(
      selectedAvailability,
      selectedRate,
      priceEngine
    );
  }
  const selectedRate_totalSum = (): number => {
    return BokunAvailabilityRateTotalPrice(
      selectedAvailability,
      selectedRate,
      priceEngine
    )
  }

  // The value object holds all shared states and setters/updaters
  const value: BookingSidebarContextType = {
    statusMessage,
    updateStatus, // Cleaner method for updates
    isSidebarOpen,
    setSidebarOpen,
    dataForExperience,
    experience: dataForExperience.experience as IExperienceCompleteZ,

    // selectedSlot,
    // setSelectedSlot,
    selectedAvailability,
    setSelectedAvailability,

    availablilitesForDateRange,
    setAvailablilitesForDateRange,

    selectedDate,
    setSelectedDate,

    calendarActiveMonth,
    set_calendarActiveMonth,

    priceEngine,
    set_priceEngine,

    selectedRate,
    setSelectedRate,


    selectedRate_countParticipants,
    selectedRate_totalSum

  };

  return (
    <BookingSidebarContext.Provider value={value}>
      {children}
    </BookingSidebarContext.Provider>
  );
}

// 4. Custom Hook to Consume the Context (Simplifies usage)
export function useBookingSidebar() {
  const context = useContext(BookingSidebarContext);

  if (context === undefined) {
    throw new Error('useBookingSidebar must be used within a BookingSidebarProvider');
  }

  return context;
}