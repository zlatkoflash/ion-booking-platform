import { zconfig } from "@/config/config";
import { SupabaseEdgeFetchPost } from "./supabase";
import { IGridHomeToursItem } from "@/components/panels/GridHomeToursItem";
import { IBokunAvailability, IExperienceBokunTourSharedInterface, IExperienceCompleteZ } from "@/interface/Interface";
import { normalizeDateToYYYYMMDD } from "./dateUtils";
import { IPaymentBookingFeedback } from "@/interface/payment.booking";
import { IStripePaymentIntent, IStripePaymentMethod } from "@/interface/payment.stripe";
import { IDBPayment } from "@/app/interface/db";

/*interface IBokunItemPhoto {
  originalUrl: string,
  derived: {
    name: "thumbnail" | "preview" | "large",
    url: string,
    cleanUrl: string
  }[],
  description?: string
}*/

export interface IBokunItem extends IExperienceBokunTourSharedInterface {
  // id: string,
  // title: string,
  price: number,
  reviewRating: number,
  vendor: {
    id: number,
    title: string
  },
  /*durationText: string,
  keyPhoto: IBokunItemPhoto,
  photos: IBokunItemPhoto[],*/

  // googlePlace is the place where the experience will be 
  /*googlePlace: {
    city: string,
    cityCode: string,
    country: string,
    countryCode: string,
    geoLocationCenter: { lat: number, lng: number }
    name: string
  },*/
  //places are the places where the tour will be
  /*places: {
    id: number,
    title: string,
    location: {
      address: string,
      city: string,
      countryCode: string,
      latitude: number,
      longitude: number,
      origin: any,
      originId: any,
      postCode: string,
      wholeAddress: string,
      zoomLevel: number
    }
  }[],*/

  // description parts
  // you will find them in the description section in the experience
  excerpt: string, // Short description
  summary: string, //Description

  // this is in categories & themes section
  // activityCategories: string[],
}

export const BokunSearch = async (data: any) => {


  let resultText = "";
  try {
    const result = await SupabaseEdgeFetchPost("/bokun/search", data);
    resultText = await result.text();
  }
  catch (error) {
    return {
      ok: false,
      error: error,
      message: "fetching supabase bokun/search have errors",
      items: []
    };
  }

  try {
    const json = JSON.parse(resultText);
    console.log("Bokun search data:", json);

    const bokunItems: IBokunItem[] = json.bokun.items;
    const dataForReturn: any = {
      ok: true,
      bokunOriginalData: json,
      items: []
    };

    const dataForThumbs: IGridHomeToursItem[] = [];
    for (const ItemBokun of bokunItems) {
      // const Photo
      dataForThumbs.push({
        tour: {
          ...ItemBokun,
          ...{
            id: ItemBokun.id,
            duration: ItemBokun.durationText,
            image: ItemBokun.keyPhoto !== undefined ? ItemBokun.keyPhoto.derived[2].url : "",
            location: ItemBokun.googlePlace === undefined ? "-Bokun Location Not Set-" : `${ItemBokun.googlePlace.city}, ${ItemBokun.googlePlace.country}`,
            name: ItemBokun.title,
            participants: 0,
            price: ItemBokun.price,
            rating: ItemBokun.reviewRating,
            vendor: ItemBokun.vendor,
            descirption: {
              excerpt: ItemBokun.excerpt,
              summary: ItemBokun.summary
            },
            tags: ItemBokun.activityCategories !== undefined ? ItemBokun.activityCategories : [],

          }
        }
      });
    }
    if (bokunItems.length > 0) {
      console.log("latestBokun example:", bokunItems[bokunItems.length - 1]);
    }
    dataForReturn.items = dataForThumbs;

    return dataForReturn;
  }
  catch (error) {
    return {
      ok: false,
      error: error,
      message: "Not valid json data from bokun/search",
      items: [],
    };
  }


}

export interface IBokunGetExperienceById {
  ok: boolean,
  error?: any,
  message?: string,
  experience?: IExperienceCompleteZ,
  // data: { ok: boolean, experience: IExperienceCompleteZ }
}
export const BokunGetExperienceById = async (experienceId: any, experienceSlug?: any): Promise<IBokunGetExperienceById> => {

  let resultText = "";

  console.log("BokunGetExperienceById init...");

  try {
    console.log("resultText Before:", resultText);
    const result = await SupabaseEdgeFetchPost(
      '/bokun/GetExperienceById',
      {
        experienceId: experienceId,
        experienceSlug: experienceSlug !== undefined ? experienceSlug : "",
      }
    );
    resultText = await result.text();
    // console.log("resultText:", resultText);
  }
  catch (error) {
    console.log("Fetching experience by id error:", error);
    return {
      ok: false,
      error: error,
      message: "fetching supabase bokun/GetExperienceById have errors",
      experience: undefined
    };
  }

  console.log("Trying to get the data");

  try {
    const json = JSON.parse(resultText);
    console.log("json:", json);
    return {
      ok: true,
      message: "Getting the data for experience",
      // experience: 
      // serverData:json,
      experience: json.data?.experience,
    };
  }
  catch (error) {
    return {
      ok: false,
      error: error,
      message: "converting text result to json while bokun/GetExperienceById have errors",
      experience: undefined
    };
  }

}

export const BokunGetExperienceByIdOrSlug = async (idOrSlug: string | number): Promise<IBokunGetExperienceById> => {
  if (isNaN(Number(idOrSlug))) {
    const ResultById = await BokunGetExperienceById(idOrSlug, "");
    return ResultById;
  }
  else {
    const ResultBySlug = await BokunGetExperienceById("", idOrSlug);
    return ResultBySlug;
  }

}


/**
 * 
 * @param experienceId 
 * @param dateForMonth 
 * @returns 
 */
export const BokunGetAvailabilitiesForExperience = async (experienceId: any, dateStart: string, dateEnd: string): Promise<{
  ok: boolean,
  message: string,
  error?: any,
  availabilities: IBokunAvailability[]
}> => {

  let resultText = "";

  try {
    const result = await SupabaseEdgeFetchPost(
      '/bokun/GetAvailabilitiesForExperience',
      {
        experienceId: experienceId,
        details: {
          startDate: dateStart,
          endDate: dateEnd
        }
      }
    );
    // console.log(result);
    resultText = await result.text();
    // console.log("BokunGetAvailabilitiesForExperience resultText:", resultText);
    /*const resultText = await result.text();
    const json = JSON.parse(resultText);
    return {
      ok: true,
      message: "Getting the data for experience",
      // experience: 
      experience: json.data?.experience,
    };*/
  }
  catch (error) {
    return {
      ok: false,
      error: error,
      message: "fetching supabase bokun/GetAvailabilitiesForExperience have errors",
      availabilities: []
    };
  }


  try {
    const json = JSON.parse(resultText);
    console.log("json:", json);
    return {
      ok: true,
      message: "Getting the data for experience",
      // experience: 
      // experience: json,
      serverData: json,
      ...json.data,
    };
  }
  catch (error) {
    return {
      ok: false,
      error: error,
      message: "converting text result to json while bokun/GetAvailabilitiesForExperience have errors",
      availabilities: []
    };
  }

}

export const GetDetailsForBooking = async (details: any) => {
  try {
    const result = await SupabaseEdgeFetchPost('/bokun/GetDetailsForBooking', details);
    console.log("GetDetailsForBooking result:", result);
    const resultText = await result.text();
    const jsonResult = JSON.parse(resultText);
    return {
      ok: true,
      // dataForBooking: jsonResult
      ...jsonResult
    }
  }
  catch (error) {
    return {
      ok: false,
      error: error,
      message: 'Booking details don\'t match with the query.'
    }
  }
}



export const BokunReserveBooking = async (
  {
    contactDetailsArray,
    activityId,
    rateId,
    startTimeId,
    date,
    passengers,
    user
    // amount
  }: {
    contactDetailsArray: {
      questionId: string,
      values: string[]
    }[],
    activityId: number,
    rateId: number,
    startTimeId: number,
    date: string,
    passengers: {
      pricingCategoryId: number,
      groupSize: number
    }[],
    user: { id: string, email: string },
    // amount: number,
  }) => {
  try {

    const bookingRequest = {

      mainContactDetails: contactDetailsArray/*[
        { questionId: "firstName", values: ["Zlatko"] },
        { questionId: "lastName", values: ["Derkoski"] },
        { questionId: "email", values: ["zlatkoflash@gmail.com"] },
        { questionId: "phoneNumber", values: ["+38970526556"] }
      ]*/,
      activityBookings: [{
        activityId: activityId,
        rateId: rateId,
        startTimeId: startTimeId,
        date: date,
        /*"pickup": true,
        "pickupPlaceId": 0,
        "pickupDescription": "string",
        "dropoff": true,
        "dropoffPlaceId": 0,
        "dropoffDescription": "string",
        "checkedIn": true,*/
        "note": "Booking from WIT-3.0 web application",
        // "customized": true,
        // "customizedTime": "string",
        // "customizedPrice": 0,
        // passengers: [],
        passengers: passengers,
        answers: [],
        pickupAnswers: [],
        dropoffAnswers: [],

      }],

    };

    const bookingReservationPayload = {
      checkoutOption: "CUSTOMER_FULL_PAYMENT",
      paymentMethod: "RESERVE_FOR_EXTERNAL_PAYMENT",
      source: "DIRECT_REQUEST",
      sendNotificationToMainContact: false,
      showPricesInNotification: true,
      note: "Reserved from Bolt (pre-payment)",
      directBooking: bookingRequest,

      user: user
      // shoppingCart: {}
      // amount: amount
    };

    console.log("bookingReservationPayload:", bookingReservationPayload);

    const result = await SupabaseEdgeFetchPost('/bokun/ReserveBooking', bookingReservationPayload);
    console.log("GetDetailsForBooking result:", result);
    const resultText = await result.text();
    const bookingResevationData = JSON.parse(resultText);
    return {
      ok: true,
      bookingResevationData: bookingResevationData,
      message: "Booking reservation feedback"
    }
  }
  catch (error) {
    return {
      ok: false,
      error: error,
      message: 'Reservation can\'t be completed.'
    }
  }
}


export const StripePaymentIntentForTheBooking = async (paymentIntent: {
  amount: number,
  currency: string,
  paymentMethodId: string,

  // 👇 Your Custom Data Fields 👇
  bookingHash: string,
  bookingId: string,
  confirmationCode: string,
  customerEmail: string,

  // this is the id of the bookings in the database
  bookingDBId: string,

  /*billing_details: {
    name: string,
    email: string,
    phone: string,
    address: {
      line1: string,
      line2?: string,
      city: string,
      state?: string,
      country: string,
      postal_code?: string
    }
  }*/
}) => {
  try {
    const result = await SupabaseEdgeFetchPost('/bokun/CreatePaymentIntentForReservedBooking', {
      paymentIntent: paymentIntent
    });
    // console.log("StripePaymentIntentForTheBooking result:", result);
    const resultText = await result.text();
    const bookingIntentData = JSON.parse(resultText);
    return {
      ok: true,
      // bookingIntentData: bookingIntentData,
      ...bookingIntentData,
      message: "Payment intent for the booking"
    }
  }
  catch (error) {
    return {
      ok: false,
      error: error,
      message: 'Payment intent for the booking can\'t be completed.'
    }
  }
}


/**
 * Interface for the Transaction Details object.
 * This holds specific payment information after a charge is processed.
 */
export interface ITransactionDetails {
  /** The date the transaction occurred (e.g., "2025-12-7"). */
  transactionDate: string;
  /** The unique ID assigned to the transaction by the payment processor. */
  transactionId: string;
  /** The brand of the card used (e.g., "VISA", "MASTERCARD"). */
  cardBrand: string;
  /** The last four digits of the credit card number. */
  last4: string;
}
/**
 * Interface for the main Booking Metadata and Payment Summary.
 */
export interface IBookingMetadata {
  /** A unique reference ID from the external system (your system). */
  externalBookingReference: string;
  /** The name of the entity that created the external reference. */
  externalBookingEntityName: string;
  /** A code identifying the external entity. */
  externalBookingEntityCode: string;

  /** Flag to include pricing details in the confirmation notification. */
  showPricesInNotification: boolean;
  /** Flag to send a confirmation notification to the main contact. */
  sendNotificationToMainContact: boolean;

  /** Details about the payment transaction. */
  transactionDetails: ITransactionDetails;

  /** The total monetary amount of the booking. */
  amount: number;
  /** The currency code for the amount (e.g., "USD", "EUR"). */
  currency: string;
}

export const BokunConfirmTheBooking = async (
  reservation_bookingHash: string,
  paymentDetails: IBookingMetadata
) => {
  try {
    const result = await SupabaseEdgeFetchPost('/bokun/ConfirmTheBooking', {
      reservation_bookingHash: reservation_bookingHash,
      paymentDetails: paymentDetails
    });
    // console.log("BokunConfirmTheBooking result:", result);
    const resultText = await result.text();
    const bookingConfirmData = JSON.parse(resultText);
    return {
      ok: true,
      bookingConfirmData: bookingConfirmData,
      message: "Booking confirm reserveation feedback"
    }
  }
  catch (error) {
    return {
      ok: false,
      error: error,
      message: 'Reservation can\'t be completed.'
    }
  }
}



// --- 1. CORE UTILITY TYPES ---
/**
 * Bokun booking money interface
 */
interface IBokunBookingMoney {
  amount: number;
  currency: string;
}

interface IBokunBookingImageDerived {
  name: 'thumbnail' | 'preview' | 'large';
  url: string;
  cleanUrl: string;
}

interface IBokunBookingKeyPhoto {
  id: number;
  originalUrl: string;
  description: string | null;
  alternateText: string | null;
  height: string;
  width: string;
  fileName: string;
  flags: any[];
  derived: IBokunBookingImageDerived[];
}

interface IBokunBookingCancellPolicy {
  id: number;
  title: string;
  policyType: 'NON_REFUNDABLE' | string;
  // Reduced for brevity
}

interface IBokunBookingVendor {
  id: number;
  title: string;
  currencyCode: string;
  countryCode?: string;
  timeZone?: string;
  showInvoiceIdOnTicket: boolean;
  showAgentDetailsOnTicket: boolean;
  showPaymentsOnInvoice: boolean;
  companyEmailIsDefault: boolean;
  // Reduced for brevity
}

// --- 2. CUSTOMER & CONTACT DETAILS ---

interface IBokunBookingCustomer {
  contactDetailsHidden: boolean;
  id: number;
  uuid: string;
  email: string;
  firstName: string;
  lastName: string;
  // Reduced for brevity; includes all fields like phoneNumber, address, etc.
  phoneNumber: string | null;
  country: string | null;
}

// --- 3. PRICING & INVOICE LINE ITEMS ---

export interface IBokunBookingPricingCategory {
  id: number;
  title: 'Adults' | 'Children' | string;
  ticketCategory: 'ADULT' | 'CHILD' | string;
  occupancy: number;
  fullTitle: string;
  // Reduced for brevity
}

interface IBokunBookingLineItem {
  id: number;
  title: 'Adults' | 'Children' | string;
  currency: string;
  quantity: number;
  unitPrice: number;
  total: number;
  totalAsMoney: IBokunBookingMoney;
  totalAsText: string;
  pricingCategoryId: number;
  people: number;
  discount: number;
  // Reduced for brevity
}

interface IBokunBookingProductInvoice {
  id: number;
  currency: string;
  productBookingId: number;
  title: string;
  product: {
    id: number;
    title: string;
    keyPhoto: IBokunBookingKeyPhoto;
    vendor: IBokunBookingVendor;
    rateTitle: string;
  };
  productCategory: 'ACTIVITIES' | string;
  dates: string;
  lineItems: IBokunBookingLineItem[];
  totalAsMoney: IBokunBookingMoney;
  totalDueAsMoney: IBokunBookingMoney;
  totalAsText: string;
  totalDueAsText: string;
  // Reduced for brevity
}

interface IBokunBookingInvoice {
  id: number;
  issueDate: number;
  currency: string;
  issuerName: string;
  recipientName: string;
  productInvoices: IBokunBookingProductInvoice[];
  totalDueAsMoney: IBokunBookingMoney;
  invoiceNumber: string;
  // Reduced for brevity
}

// --- 4. PRODUCT (ACTIVITY) DETAILS ---

export interface IBokunBookingPricingCategoryBooking {
  id: number;
  pricingCategoryId: number;
  pricingCategory: IBokunBookingPricingCategory;
  quantity: number;
  bookedTitle: string;
  // Includes partial customer/passenger info
  passengerInfo: IBokunBookingCustomer;
}

interface IBokunBookingActivityDetail {
  id: number;
  title: string;
  productCategory: 'ACTIVITIES';
  keyPhoto: IBokunBookingKeyPhoto;
  vendor: IBokunBookingVendor;
  cancellationPolicy: IBokunBookingCancellPolicy;
  // Includes rates, startTimes, duration, etc.
  durationText: string;
  difficultyLevel: string;
  activityCategories: string[];
  description: string;

  googlePlace: {
    name: string
  }
}

export interface IBokunBookingActivityBooking {
  bookingId: number;
  parentBookingId: number;
  confirmationCode: string;
  productConfirmationCode: string;
  status: 'RESERVED' | 'CONFIRMED' | string;
  title: string;
  totalPrice: number;
  totalPriceAsText: string;
  startDateTime: number;
  endDateTime: number;
  productCategory: 'ACTIVITIES' | string;
  dateString: string;
  startTime: string;
  activity: IBokunBookingActivityDetail; // Full activity details
  invoice: IBokunBookingProductInvoice;
  pricingCategoryBookings: IBokunBookingPricingCategoryBooking[];
  cancellationPolicy: IBokunBookingCancellPolicy;

  // this is working for booking activity after confirmed booking, I am not sure if it will work for booking activity for booking that is reserved
  totalParticipants: number;
  // key : number is the category id, and number is the participants quantity
  quantityByPricingCategory: { [key: number]: number };
  // Reduced for brevity
  product: {
    title: string
  };
}


// --- 5. MAIN BOOKING INTERFACE ---

export interface IBokunBooking {
  creationDate: number; // Unix timestamp
  bookingId: number;
  language: string;
  confirmationCode: string;
  status: 'RESERVED' | 'CONFIRMED' | string;
  currency: string;
  totalPrice: number;
  totalPaid: number;
  totalDue: number;
  totalDueAsText: string;
  totalPriceConverted: number;

  customer: IBokunBookingCustomer;
  invoice: IBokunBookingInvoice;

  paymentType: 'NOT_PAID' | 'PAID' | string;

  seller: IBokunBookingVendor & {
    phoneNumber: string;
    emailAddress: string;
  };

  bookingChannel: {
    id: number;
    title: string;
    type: 'OTHER' | string;
  };

  activityBookings: IBokunBookingActivityBooking[];
}



export const InsertDemoDataInTheCrud = async () => {
  try {
    const result = await SupabaseEdgeFetchPost('/bokun/InsertDemoDataInTheCrud', {});
    console.log("InsertDemoDataInTheCrud result:", result);
    const resultText = await result.text();
    const bookingResevationData = JSON.parse(resultText);
    return {
      ok: true,
      bookingResevationData: bookingResevationData,
      message: "Insert demo data in the crud"
    }
  }
  catch (error) {
    return {
      ok: false,
      error: error,
      message: 'Insert demo data in the crud can\'t be completed.'
    }
  }
}


/*export const PaymentProcess_SaveTheReservedBookingDetails = async (
  user: { id: string, email: string },
  booking: IBokunBooking,
) => {
  try {
    const result = await SupabaseEdgeFetchPost('/bokun/PaymentProcess_SaveTheReservedBookingDetails', {
      user: user,
      booking: booking,
      
      activityBookings: booking.activityBookings,
    });
    console.log("PaymentProcess_SaveTheReservedBookingDetails result:", result);
    const resultText = await result.text();
    const bookingResevationData = JSON.parse(resultText);
    return {
      ok: true,
      bookingResevationData: bookingResevationData,
      message: "Payment process save the reserved booking details"
    }
  }
  catch (error) {
    return {
      ok: false,
      error: error,
      message: 'Payment process save the reserved booking details can\'t be completed.'
    }
  }
}*/


/*export const PaymentProcess_SaveThePaymentDetails = async (
  // user: { id: string, email: string },
  // booking: IBokunBooking,
  bookingDBId: string,
  paymentIntent: IStripePaymentIntent
) => {
  try {
    const result = await SupabaseEdgeFetchPost('/bokun/PaymentProcess_SaveThePaymentDetails', {
      // user: user,
      // booking: booking,
      bookingDBId: bookingDBId,
      paymentIntent: paymentIntent

    });
    console.log("PaymentProcess_SaveThePaymentDetails result:", result);
    const resultText = await result.text();
    const bookingResevationData = JSON.parse(resultText);
    return {
      ok: true,
      ...bookingResevationData,
      message: "Payment process save the payment details"
    }
  }
  catch (error) {
    return {
      ok: false,
      error: error,
      message: 'Payment process save the payment details can\'t be completed.'
    }
  }
}*/



export const __DELETE__SaveTheBookingData = async (
  user: { email: string, name: string },
  booking: IPaymentBookingFeedback,
  paymentMethod: IStripePaymentMethod,
  paymentIntent: IStripePaymentIntent
) => {
  try {
    const tours_activities_experiences: {
      title: string,
      description: string,
      images_url: string,
      // tags: string, // experience have categories
      categories: string, // experience have categories
      bokun_experience_id: number
      // created_at: 
    }[] = [];

    for (const activityBooking of booking.activityBookings) {
      tours_activities_experiences.push(
        {
          title: activityBooking.activity.title as string,
          // if the description change in bokun here will not change
          description: activityBooking.activity.description ? activityBooking.activity.description : "",
          bokun_experience_id: activityBooking.activity.actualId,
          images_url: "",
          categories: activityBooking.activity.activityCategories.join(","),
        }
      );
    }

    const bookingDetails = {
      /**
       * bokun variables:
       */
      bookingId: booking.bookingId,
      bokun_confirmation_code: booking.confirmationCode,
      creationDate: booking.creationDate, // creationDate is number
      currency: booking.currency,
      language: booking.language,
      paymentType: booking.paymentType,
      status: booking.status, // ok
      totalPaid: booking.totalPaid,
      totalPrice: booking.totalPrice,
      totalPriceConverted: booking.totalPriceConverted
    };

    const paymentDetails = {
      stripe_payment_intent_id: paymentIntent.id,
      amount_cents: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: paymentIntent.status,
      bokun_invoice_id: booking.invoice.id
    };

    const result = await SupabaseEdgeFetchPost('/bokun/SaveTheBookingDataAfterPayment', {
      /**
       * When the user don't exist by email create it
       */
      user: user,

      /**
       * With this data we save the experience / tour
       * We save only once, it is unique,
       * most important column is bokun_experience_id that represent the bokun experience id.
       * This is array of experience, one booking can have more activities while booking so that's why i add array, now we do only with 1 experience but in feature maybe we will do more
       */
      tours_activities_experiences: tours_activities_experiences,
      /**
       * booking details for bookings table
       */
      booking: bookingDetails,

      /**
       * payment details for payments table
       */
      payment: paymentDetails
    });
    console.log("SaveTheBookingData result:", result);
    const resultText = await result.text();
    const bookingResevationData = JSON.parse(resultText);
    return {
      ok: true,
      bookingResevationData: bookingResevationData,
      message: "Boooking save the data"
    }
  }
  catch (error) {
    return {
      ok: false,
      error: error,
      message: 'Boooking save the data can\'t be completed.'
    }
  }
}



export const GetBookingDetailsByToken = async (token: string): Promise<{
  data: {
    bookingDB: any,
    paymentDB: IDBPayment,
    bookingBokun: IBokunBooking
  }
} | null> => {
  try {
    const details = await SupabaseEdgeFetchPost('/bokun/GetBookingDetailsByToken', { token: token });
    try {
      const detailsText = await details.text();
      const detailsJSON = JSON.parse(detailsText);
      return detailsJSON;
    }
    catch (error) {
      return null;
    }
  }
  catch (error) {
    return null;
  }
}

export const SendTestEmail = async () => {
  try {
    const details = await SupabaseEdgeFetchPost('/bokun/SendTestEmail', {});
    try {
      const detailsText = await details.text();
      const detailsJSON = JSON.parse(detailsText);
      return detailsJSON;
    }
    catch (error) {
      return null;
    }
  }
  catch (error) {
    return null;
  }
}


export const Send2HoursTokenForSignInWithEmail = async (email: string) => {
  try {
    const details = await SupabaseEdgeFetchPost('/bokun/Send2HoursTokenForSignInWithEmail', { email: email });
    try {
      const detailsText = await details.text();
      const detailsJSON = JSON.parse(detailsText);
      return detailsJSON;
    }
    catch (error) {
      return null;
    }
  }
  catch (error) {
    return null;
  }
}

export const TryToLoginWithTheCode = async (email: string, code: string) => {
  try {
    const details = await SupabaseEdgeFetchPost('/bokun/TryToLoginWithTheCode', { email: email, code: code });
    try {
      const detailsText = await details.text();
      const detailsJSON = JSON.parse(detailsText);
      return detailsJSON;
    }
    catch (error) {
      return null;
    }
  }
  catch (error) {
    return null;
  }
}