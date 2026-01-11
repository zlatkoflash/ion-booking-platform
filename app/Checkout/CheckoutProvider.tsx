'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { IBokunActivityRate, IBokunAvailability, IExperienceCompleteZ } from "@/interface/Interface";
import { ISearchParamsForBooking } from './page';
import { IBookPriceEngineCount } from '../TourView/[[...slug]]/content/BookingSidebarProvider';
import { BokunConfirmTheBooking, BokunReserveBooking, IBokunBooking, IBookingMetadata, ITransactionDetails } from '@/utils/bokun';
import { IContactDetails } from '../interface/interface';

// 1. Context State Type
interface BookingCheckoutContextState {
  // Note: The prompt listed 'experience' twice, I'll assume one is for the product
  // and the other is a typo, or perhaps intended for a different complex object.
  // I'll stick to a standard set for a booking checkout flow.
  experience: IExperienceCompleteZ;
  rate: IBokunActivityRate;
  availability: IBokunAvailability;

  counts: IBookPriceEngineCount[],

  step: string,
  setStep: (step: string) => void,


  searchParamsFor: ISearchParamsForBooking,

  totalPrice: number,

  // Actions (for updating the state from components)
  /*setExperience: (exp: IExperienceCompleteZ) => void;
  setRate: (rate: IBokunActivityRate) => void;
  setAvailability: (avail: IBokunAvailability) => void;*/



  reservation_bookingHash: string,
  set_reservation_bookingHash: (bookingHash: string) => void,

  /**
   * reserved_booking and confirmed_booking are the same with same values
   * reserved_booking have status RESERVED and confirmed_booking have status CONFIRMED they both must exist so we will know when to pay the booking
   */
  reserved_booking: IBokunBooking,
  set_reserved_booking: (booking: IBokunBooking) => void,

  confirmed_booking: IBokunBooking,
  set_confirmed_booking: (booking: IBokunBooking) => void,

  ___ReserveTheBooking: (user: { id: string, email: string }) => Promise<{ ok: boolean, bookingHash: string, booking: IBokunBooking, bookingDB: any }>,
  ___ConfirmTheBooking: (paymentMethodId: string, confirmationCode?: string, transactionDetails?: ITransactionDetails, bookingToken?: string) => Promise<{ ok: boolean, bookingHash: string, booking: IBokunBooking, bookingToken: string }>,

  contactDetails: IContactDetails,
  setContactDetails: (contactDetails: IContactDetails) => void,


  // bookingProcessStatus: "not-started" | "start" | "reserve" | "confirm" | "pay",
  processBooking: {

    reserved: boolean, reservedError: boolean,
    confirmed: boolean, confirmedError: boolean,
    paid: boolean, paidError: boolean,
    savedDataToDB: boolean, savedDataToDBError: boolean,
    userSetInSystem: boolean, userSetInSystemError: boolean
  },
  set_processBooking: (processBooking: { reserved: boolean, confirmed: boolean, paid: boolean, savedDataToDB: boolean, reservedError: boolean, confirmedError: boolean, paidError: boolean, savedDataToDBError: boolean, userSetInSystem: boolean, userSetInSystemError: boolean, }) => void,
}


// Initial context state (using a non-null assertion 'as' for function types, 
// as they will be defined in the provider)
const BookingCheckoutContext = createContext<BookingCheckoutContextState>({
  experience: {} as IExperienceCompleteZ,
  rate: {} as IBokunActivityRate,
  availability: {} as IBokunAvailability,
  counts: [],
  /*setExperience: () => { },
  setRate: () => { },
  setAvailability: () => { },*/

  setStep: (s: string) => { },
  step: 'checkout',

  searchParamsFor: {} as ISearchParamsForBooking,
  totalPrice: 0,

  reservation_bookingHash: "",
  set_reservation_bookingHash: () => { },

  reserved_booking: {} as IBokunBooking,
  set_reserved_booking: () => { },

  confirmed_booking: {} as IBokunBooking,
  set_confirmed_booking: () => { },

  ___ReserveTheBooking: async (): Promise<{ ok: boolean, bookingHash: string, booking: IBokunBooking, bookingDB: any }> => { return { ok: true, bookingHash: "", booking: {} as IBokunBooking, bookingDB: {} } },
  ___ConfirmTheBooking: async (paymentMethodId: string, confirmationCode?: string, transactionDetails?: ITransactionDetails): Promise<{ ok: boolean, bookingHash: string, booking: IBokunBooking, bookingToken: string }> => { return { ok: true, bookingHash: "", booking: {} as IBokunBooking, bookingToken: "" } },

  contactDetails: {} as IContactDetails,
  setContactDetails: () => { },

  processBooking: {
    reserved: false, reservedError: false,
    confirmed: false, confirmedError: false,
    paid: false, paidError: false,
    savedDataToDB: false, savedDataToDBError: false,
    userSetInSystem: false, userSetInSystemError: false,
  },
  set_processBooking: (processBooking: { reserved: boolean, confirmed: boolean, paid: boolean, savedDataToDB: boolean, reservedError: boolean, confirmedError: boolean, paidError: boolean, savedDataToDBError: boolean }) => { },
});

// --- 3. Create the Provider Component ---

interface BookingCheckoutProviderProps {
  children: ReactNode;
  experience: IExperienceCompleteZ;
  rate: IBokunActivityRate;
  availability: IBokunAvailability;
  searchParamsFor: ISearchParamsForBooking
  totalPrice: number,
  counts: IBookPriceEngineCount[]
}

export const BookingCheckoutProvider: React.FC<BookingCheckoutProviderProps> = ({ children, experience, rate, availability, searchParamsFor, totalPrice, counts }) => {

  // State initialization
  /*const [experience, setExperience] = useState<IExperienceCompleteZ | null>(null);
  const [rate, setRate] = useState<IBokunActivityRate | null>(null);
  const [availability, setAvailability] = useState<IBokunAvailability | null>(null);*/

  const [step, setStep] = useState<string>('contact');
  const [reservation_bookingHash, set_reservation_bookingHash] = useState<string>("");

  const [reserved_booking, set_reserved_booking] = useState<IBokunBooking>({} as IBokunBooking);
  const [confirmed_booking, set_confirmed_booking] = useState<IBokunBooking>({} as IBokunBooking);

  const [contactDetails, setContactDetails] = useState<IContactDetails>(
    {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      country: ''
    }
    /*{
      // debugging data
      firstName: 'Zlatko',
      lastName: 'Derkoski',
      email: 'zlatkoflas1sddassa@gmail.com',
      phone: '072222222',
      address: 'Address',
      city: 'City',
      country: 'Country'
    }*/

  );

  const [processBooking, set_processBooking] = useState<{ reserved: boolean, confirmed: boolean, paid: boolean, savedDataToDB: boolean, reservedError: boolean, confirmedError: boolean, paidError: boolean, savedDataToDBError: boolean, userSetInSystem: boolean, userSetInSystemError: boolean }>({
    reserved: false, confirmed: false, paid: false, savedDataToDB: false, reservedError: false, confirmedError: false, paidError: false, savedDataToDBError: false, userSetInSystem: false, userSetInSystemError: false
  });

  // const [step, setStep] = useState<'contact' | 'payment'>('contact');


  const ___ReserveTheBooking = async (user: { id: string, email: string }): Promise<{ ok: boolean, bookingHash: string, booking: IBokunBooking, bookingDB: any }> => {
    // const countsJson = searchParamsF
    const passangers: {
      pricingCategoryId: number,
      groupSize: number,
      passengerDetails: any[],
      answers: any[]
    }[] = [];
    for (const countFor of counts) {
      console.log(countFor);
      // groupSize don't work, for example when is groupSize:5 for adults and groupSize:2 for children, it is calculating like 2 people, so i will try parsing by groupSize: 1
      /*passangers.push({
        groupSize: countFor.count,
        pricingCategoryId: countFor.priceCategoryId,
        passengerDetails: [],
        answers: []
      });*/
      for (let kk = 0; kk < countFor.count; kk++) {
        passangers.push({
          // groupSize: countFor.count,
          groupSize: 1,
          pricingCategoryId: countFor.priceCategoryId,
          passengerDetails: [],
          answers: []
        });
      }
    }
    console.log("passangers:", passangers);
    const resultsAfterReserve = await BokunReserveBooking(
      {
        contactDetailsArray: [
          { questionId: "firstName", values: [contactDetails.firstName], },
          { questionId: "lastName", values: [contactDetails.lastName], },
          { questionId: "email", values: [contactDetails.email], },
          { questionId: "phoneNumber", values: [contactDetails.phone], },
          { questionId: "address", values: [contactDetails.address as string], },
          { questionId: "city", values: [contactDetails.city as string], },
          { questionId: "country", values: [contactDetails.country as string], }
        ],
        activityId: Number(searchParamsFor.activity),
        date: searchParamsFor.date,
        rateId: Number(searchParamsFor.rate),
        startTimeId: Number(searchParamsFor.startTimeId),
        passengers: passangers,

        // price is autocalculated by boku
        // amount: totalPrice,

        user: user
      },
    );
    console.log("resultsAfterReserve:", resultsAfterReserve);
    console.log("resultsAfterReserve data:", resultsAfterReserve.bookingResevationData.data);

    if (resultsAfterReserve.bookingResevationData.data.bookingHash !== undefined) {
      const bookingHash = resultsAfterReserve.bookingResevationData.data.bookingHash;
      const booking = resultsAfterReserve.bookingResevationData.data.booking;
      // set_reservation_bookingHash(bookingHash);
      // set_reserved_booking(booking);
      return {
        ok: true,
        bookingHash: bookingHash,
        booking: booking,
        bookingDB: resultsAfterReserve.bookingResevationData.data.bookingDB
      };
    }
    else {
      // set_reservation_bookingHash("");
      // set_reserved_booking({} as IBokunBooking);
      return {
        ok: false,
        bookingHash: "",
        booking: {} as IBokunBooking,
        bookingDB: undefined
      };
    }

  }


  const ___ConfirmTheBooking = async (
    paymentMethodId: string,
    confirmationCode?: string,
    transactionDetails?: ITransactionDetails
  ): Promise<{ ok: boolean, bookingHash: string, booking: IBokunBooking, bookingToken: string }> => {
    // console.log("Confirmation the booking for reservation code:", reservation_bookingHash);
    // console.log("Confirmation the booking for transaction details:", transactionDetails);

    const paymentDetails: IBookingMetadata = {
      "externalBookingReference": "string",
      "externalBookingEntityName": "string",
      "externalBookingEntityCode": "string",
      "showPricesInNotification": true,
      // this is sending notification after confirmation, so check it to false so it will not send this email
      "sendNotificationToMainContact": false,
      "transactionDetails": transactionDetails !== undefined
        ?
        // live purposes
        transactionDetails
        :
        // testing purposes
        {
          "transactionDate": "2025-12-9",
          "transactionId": "trans-id",
          "cardBrand": "VISA",
          "last4": "0004",
          // "paymentMethodId": "payment-method-not-defined"
        },
      "amount": totalPrice,
      "currency": "string"
    }
    const resultsAfterConfirmation = await BokunConfirmTheBooking(
      // reservation_bookingHash,
      paymentMethodId,
      confirmationCode !== "" && confirmationCode !== undefined
        ?
        confirmationCode
        :
        reserved_booking.confirmationCode,
      paymentDetails
    ); // continue here
    // console.log("bookingConfirmData:", resultsAfterConfirmation);
    // console.log("bookingConfirmData data:", resultsAfterConfirmation.bookingConfirmData.data);

    if (resultsAfterConfirmation.bookingConfirmData.data.bookingHash !== undefined) {
      return { ok: true, bookingHash: resultsAfterConfirmation.bookingConfirmData.data.bookingHash, booking: resultsAfterConfirmation.bookingConfirmData.data.booking as IBokunBooking, bookingToken: resultsAfterConfirmation.bookingConfirmData.data.bookingToken }
    }
    else {
      return { ok: false, bookingHash: "", booking: {} as IBokunBooking, bookingToken: "" }
    }
  }

  // Value object passed to the context consumers
  const contextValue: BookingCheckoutContextState = {
    experience,
    rate,
    availability,

    counts,

    step,
    setStep,

    searchParamsFor,

    totalPrice,

    reservation_bookingHash,
    set_reservation_bookingHash,

    reserved_booking,
    set_reserved_booking,

    confirmed_booking,
    set_confirmed_booking,

    // Setter functions
    /*setExperience,
    setRate,
    setAvailability,*/

    contactDetails,
    setContactDetails,

    ___ReserveTheBooking,
    ___ConfirmTheBooking,

    processBooking,
    set_processBooking,
  };

  return (
    <BookingCheckoutContext.Provider value={contextValue}>
      {children}
    </BookingCheckoutContext.Provider>
  );
};



// --- 4. Custom Hook for Consumption ---

export const useBookingCheckout = () => {
  const context = useContext(BookingCheckoutContext);

  // Ensure the hook is used inside the provider
  if (!context) {
    throw new Error('useBookingCheckout must be used within a BookingCheckoutProvider');
  }

  return context;
};