/*
This should be deleted
*/

// /src/context/BookingSidebarContext.tsx
'use client'; // 👈 Essential for client-side state hooks

// import { IBokunActivityRate, IBokunAvailability, IExperienceCompleteZ } from '@/interface/Interface';
// import { IBokunGetExperienceById } from '@/utils/bokun';//
// import { BokunAvailabilityRateTotalPrice, FTotalCountPerRate } from '@/utils/FPriceEngine';
import
// React, 
{
  createContext, useContext,
  // useState, 
  ReactNode, useEffect, useEffectEvent
} from 'react';
// import { useBookingEditor } from '../BookingEditorProvider';
// import { formatDateString } from '@/utils/dateUtils';
import { useDispatch, useSelector } from 'react-redux';
import {
  BookingCalendarActions,
  // IBookingCalendarState 
} from '@/libs/features/BookingCalendar/bookingCalendarSlice';
import { RootState } from '@/libs/store';

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
  /*statusMessage: string;
  updateStatus: (newMessage: string) => void;*/

  /*isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;*/

  // dataForExperience: IBokunGetExperienceById,
  // experience: IExperienceCompleteZ,

  /***
   * When click on the calendar this slot is selected and by it it is showing some other details
   */
  // selectedSlot: IBokunAvailability,
  // setSelectedSlot: (slot: IBokunAvailability) => void,
  // selectedAvailability: IBokunAvailability,
  // setSelectedAvailability: (availability: IBokunAvailability) => void,
  // setSelectedAvailabilityAndTheRate: (availability: IBokunAvailability) => void,
  // availiabilityCount: (availability: IBokunAvailability) => number,

  // selectedRate: IBokunActivityRate,
  // setSelectedRate: (selectedRate: IBokunActivityRate) => void,

  /*calendarActiveMonth: Date,
  set_calendarActiveMonth: (d: Date) => void,*/

  /**
   * availablilitesForDateRange is the list of availabilities for the selected month on the calendar
   */
  // availablilitesForDateRange: IBokunAvailability[],
  // setAvailablilitesForDateRange: (availablilitesForDateRange: IBokunAvailability[]) => void,

  /**
   * selectedDate is the Date selected on the calendar
   */
  /*selectedDate: string | null,
  setSelectedDate: (date: string | null) => void,*/


  /*priceEngine: IBookPricingEngine,
  set_priceEngine: (priceEngine: IBookPricingEngine) => void,*/


  // selectedRate_countParticipants: () => number,
  // selectedRate_totalSum: () => number,
  // bookedTotalSum: () => number

}

// 2. Create the Context 
const BookingSidebarContext = createContext<BookingSidebarContextType>({
  // statusMessage: '',
  // updateStatus: () => { },
  /*isSidebarOpen: false,
  setSidebarOpen: () => { },*/
  // dataForExperience: {} as IBokunGetExperienceById,
  // experience: {} as IExperienceCompleteZ,
  // selectedSlot: {} as IBokunAvailability,
  // setSelectedSlot: () => { },
  // selectedAvailability: {} as IBokunAvailability,
  // setSelectedAvailability: () => { },
  // setSelectedAvailabilityAndTheRate: () => { },
  // availiabilityCount: () => { return 0 },



  // availablilitesForDateRange: [] as IBokunAvailability[],
  // setAvailablilitesForDateRange: () => { },

  /*selectedDate: null,
  setSelectedDate: () => { },*/

  /*calendarActiveMonth: new Date(),
  set_calendarActiveMonth: () => { },*/

  /*priceEngine: {} as IBookPricingEngine,
  set_priceEngine: () => { },*/


  // selectedRate: {} as IBokunActivityRate,
  // setSelectedRate: () => { },


  // selectedRate_countParticipants: () => { return 0 },
  // selectedRate_totalSum: () => { return 0; },
  // bookedTotalSum: () => { return 0; }



});

// 3. Define the Provider Component
interface BookingSidebarProviderProps {
  children: ReactNode; // Children prop type
  // dataForExperience: IBokunGetExperienceById
}

export function BookingSidebarProvider({ children,
  // dataForExperience
}: BookingSidebarProviderProps) {

  const dispatch = useDispatch();

  /*const {
    clientType,
    bokunBookingForediting,
    bookingDBNet
  } = useBookingEditor();*/

  // Example shared states
  // const [statusMessage, setStatusMessage] = useState('Awaiting selection...');
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  /***
   * When click on the calendar this slot is selected and by it it is showing some other details
   */
  // const [selectedSlot, setSelectedSlot] = useState<IBokunAvailability>({} as IBokunAvailability);

  /*const updateStatus = (newMessage: string) => {
    setStatusMessage(newMessage);
  };*/

  /*const setSidebarOpen = (isOpen: boolean) => {
    setIsSidebarOpen(isOpen);
  };*/

  // const [availablilitesForDateRange, setAvailablilitesForDateRange] = useState<IBokunAvailability[]>([]);
  /*if (bokunBookingForediting !== undefined)
     console.log("new Date(bokunBookingForediting.activityBookings[0].date):", new Date(bokunBookingForediting.activityBookings[0].date));*/
  /*const [selectedDate, setSelectedDate] = useState<string | null>(
    clientType === "booking-editor" && bokunBookingForediting !== undefined ?
      formatDateString(new Date(bokunBookingForediting.activityBookings[0].date))
      :
      null
  );*/

  /**
   * avaialability is object that hold the startTimeId, that is important
   */
  /* const [selectedAvailability, setSelectedAvailability] = useState<IBokunAvailability>(
  // continue here: 
  { } as IBokunAvailability
  );*/
  const bookingCalendarState = useSelector((state: RootState) => state.bookingCalendar);
  const selectedAvailability = bookingCalendarState.selectedAvailability;
  /*useEffect(() => {
    console.log("Latest selected availability:", selectedAvailability);
  }, [selectedAvailability]);*/

  /*const setSelectedAvailabilityAndTheRate = (availability: IBokunAvailability) => {
    // setSelectedAvailability(availability);
    dispatch(BookingCalendarActions.setSelectedAvailability(availability));
    const defaultRate = availability.rates.find(r => { return r.id === availability.defaultRateId });
    console.log("defaultRate:", defaultRate);
    // setSelectedRate(defaultRate as IBokunActivityRate);
    dispatch(BookingCalendarActions.setSelectedRate(defaultRate as IBokunActivityRate));
    console.log("availablility:", availability);
  }*/

  /**
   * 
   * @returns availiabilityCount will show the count for availiability, someitmes it must be included the availability from the booked booking for editing
   */
  /*const availiabilityCount = (availability: IBokunAvailability): number => {
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
  }*/


  // const [selectedRate, setSelectedRate] = useState<IBokunActivityRate>({} as IBokunActivityRate);
  const selectedRate = bookingCalendarState.selectedRate;

  /*const [priceEngine, set_priceEngine] = useState<IBookPricingEngine>({
    counts: [],
    total: []
  } as IBookPricingEngine);*/

  // console.log("Search this text: !!!LOOK HERE YOU NEED TO FEED THE CALENDAR ACTIVE MONTH!!! and feed for administrator booking editor");
  /* !!!LOOK HERE YOU NEED TO FEED THE CALENDAR ACTIVE MONTH!!!
  const [calendarActiveMonth, set_calendarActiveMonth] = useState<Date>(

    clientType === "booking-editor" ?
      new Date(
        bokunBookingForediting?.activityBookings[0].date as number
      )
      :
      new Date()

  );*/

  // selectedRate_countParticipants:()=>{return 0},
  // selectedRate_totalSum:()=>{return 0;}

  /*const selectedRate_countParticipants = (): number => {

    console.log("Returning the count of the participants: selectedRate_countParticipants");

    return FTotalCountPerRate(
      selectedAvailability,
      selectedRate,
      priceEngine
    );
  }*/
  /*const selectedRate_totalSum = (): number => {
    return BokunAvailabilityRateTotalPrice(
      selectedAvailability,
      selectedRate,
      priceEngine
    )
  }*/
  /*const bookedTotalSum = (): number => {
    if (bookingDBNet === undefined) return 0;
    return (bookingDBNet?.total_paid_cents - bookingDBNet?.total_refunded_cents) / 100;
  }*/

  // The value object holds all shared states and setters/updaters
  const value: BookingSidebarContextType = {
    // statusMessage,
    // updateStatus, // Cleaner method for updates
    // isSidebarOpen,
    // setSidebarOpen,
    // dataForExperience,
    // experience: dataForExperience.experience as IExperienceCompleteZ,

    // selectedSlot,
    // setSelectedSlot,
    // selectedAvailability,
    // setSelectedAvailability,
    // setSelectedAvailabilityAndTheRate,
    //availiabilityCount,

    // availablilitesForDateRange,
    // setAvailablilitesForDateRange,

    /*selectedDate,
    setSelectedDate,*/

    /*calendarActiveMonth,
    set_calendarActiveMonth,*/

    // priceEngine,
    // set_priceEngine,

    // selectedRate,
    // setSelectedRate,


    // selectedRate_countParticipants,
    // selectedRate_totalSum,
    // bookedTotalSum

  };

  const availablilitesForDateRange = bookingCalendarState.availablilitesForDateRange;
  const clientType = bookingCalendarState.editor.clientType;
  const bokunBookingForediting = bookingCalendarState.editor.bokunBookingForediting;

  useEffect(() => {
    // console.log("use Effect: availablilitesForDateRange:", availablilitesForDateRange);
    // now if is admin editor we must set the availability
    if (clientType === "booking-editor") {
      // setSelectedAvailability(availablilitesForDateRange[0]);
      const startTimeId = bokunBookingForediting?.activityBookings[0].startTimeId;
      console.log("startTimeId:", startTimeId);
      const selectedAvailabilityFromTheBooking = availablilitesForDateRange.find(
        (availability) => availability.startTimeId === startTimeId
      );
      console.log("selectedAvailabilityFromTheBooking:", selectedAvailabilityFromTheBooking);
      if (selectedAvailabilityFromTheBooking) {
        // setSelectedAvailability(selectedAvailabilityFromTheBooking);
        dispatch(BookingCalendarActions.setSelectedAvailability(selectedAvailabilityFromTheBooking));
      }

      /**
       * Those are the bookings 1 count per group type, 
       * for example if we have 2 children and 3 adults it should show 5 items
       */
      const BookedActivity = bokunBookingForediting?.activityBookings[0];
      const pricingCategoryBookings = BookedActivity?.pricingCategoryBookings;
      const BookedPriceEngine = {
        counts: []
      } as IBookPricingEngine;
      // BookedPriceEngine.counts.push({})
      if (pricingCategoryBookings !== undefined) {
        for (const pricingCategoryBooking of pricingCategoryBookings) {
          // console.log("pricingCategoryBooking:", pricingCategoryBooking);
          const CountObject = BookedPriceEngine.counts.find(count =>
            count.rateId === BookedActivity?.rateId
            && count.priceCategoryId === pricingCategoryBooking.pricingCategoryId
            && count.availabilityId === selectedAvailabilityFromTheBooking?.id
          )
          // const rateId = BookedActivity?.rateId;
          if (CountObject === null || CountObject === undefined) {

            BookedPriceEngine.counts.push({
              availabilityId: selectedAvailabilityFromTheBooking?.id as string,
              rateId: BookedActivity?.rateId as number,
              count: 1,
              priceCategoryId: pricingCategoryBooking.pricingCategoryId

            });
          }
          else {
            CountObject.count++;
          }
        }
      }
      console.log("BookedPriceEngine:", BookedPriceEngine);
      // set_priceEngine(BookedPriceEngine);
      dispatch(BookingCalendarActions.set_priceEngine(BookedPriceEngine));
    }
  }, [availablilitesForDateRange]);
  /*useEffect(() => {
    console.log("Price engine changed>>>", priceEngine);
  }, [priceEngine])*/


  /**
   * When is the editor we must st initial values
   */
  /*if (clientType === "booking-editor") {
    useEffect(() => {
      // console
      console.log("bokunBookingForediting:", bokunBookingForediting);
    }, []);
  }*/
  /*console.log("bokunBookingForediting>>>:", bokunBookingForediting);
  console.log("bokunBookingForediting?.activityBookings[0].pricingCategoryBookings:", bokunBookingForediting?.activityBookings[0].pricingCategoryBookings);*/

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