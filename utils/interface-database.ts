/** ENUMS derived from CHECK constraints **/

import { IBookingParticipants } from "@/redux/booking/bookingSlice";

// CHECK (financial_status = ANY (ARRAY['unpaid'::text, 'paid_in_full'::text, 'partially_refunded'::text, 'refunded'::text]))
export type IDBBookingFinancialStatus = 'unpaid' | 'paid_in_full' | 'partially_refunded' | 'refunded';

// CHECK (status = ANY (ARRAY['requires_payment'::text, 'processing'::text, 'succeeded'::text, 'partially_refunded'::text, 'refunded'::text, 'failed'::text, 'canceled'::text]))
export type IDBPaymentStatus = 'requires_payment' | 'processing' | 'succeeded' | 'partially_refunded' | 'refunded' | 'failed' | 'canceled';

// CHECK (refund_status = ANY (ARRAY['none'::text, 'partial'::text, 'full'::text]))
export type IDBPaymentRefundStatus = 'none' | 'partial' | 'full';

// CHECK (status = ANY (ARRAY['pending'::text, 'succeeded'::text, 'failed'::text]))
export type IDBRefundStatus = 'pending' | 'succeeded' | 'failed';


export interface ICity {
  id: number;
  created_at: string; // ISO Timestamp string from Postgres
  name: string | null;
  slug: string | null;
  photo_url: string | null;
  coming_soon: boolean; // Evaluates to true/false (defaults to false in DB)
}
export interface ICityCounts extends ICity {
  count_experiences: number
}


// Excellent for Form submissions or Insert operations where id and created_at aren't generated yet
export type ICreateCityInput = Omit<ICity, 'id' | 'created_at'>;

// Excellent for Update operations where you only pass a subset of data along with the ID
export type IUpdateCityInput = Partial<ICreateCityInput> & Pick<ICity, 'id'>;


export interface IDBUser {
  id: string;
  email: string | null;
  name: string | null;
  credits_balance?: number;
  wallet_address?: string | null;
  created_at?: string;
  keyForLogin10letters?: string;
  role?: string;
}


export type DurationUnitType = 'MINUTES' | 'HOURS' | 'DAYS' | 'WEEKS';

export interface ITourDuration {
  durationType: DurationUnitType; // Matches your specific 'HOURS' value
  duration: number;               // Raw active duration value
  durationMinutes: number;        // Minute breakdown component
  durationHours: number;          // Hour breakdown component
  durationDays: number;           // Day breakdown component
  durationWeeks: number;          // Week breakdown component
  durationText: string;           // Pre-formatted human-readable string (e.g., "2 hours")
}

export interface IAgendaLocation {
  address: string;
  city: string;
  countryCode: string;
  postCode: string;
  latitude: number;
  longitude: number;
  zoomLevel: number;
  origin: string | null;
  originId: string | null;
  wholeAddress: string;
}

export interface IAgendaItem {
  id: number;
  index: number;
  title: string;
  excerpt: string | null;
  body: string;
  day: number;
  flags: string[]; // Adjust type if flags contain concrete objects later
  location: IAgendaLocation;
  address: string | null;
  keyPhoto: {
    id: number;
    originalUrl: string;
    description: string | null;
    alternateText: string | null;
    height: string;
    width: string;
    fileName: string;
    flags: string[];
    derived: {
      name: string;
      url: string;
      cleanUrl: string;
    }[];
  } | null; // Adjust type if keyPhoto structure is defined elsewhere
  photos: string[]; // Adjust type if photos array contains nested objects
}
export interface IDBTour {
  id: string;
  title: string | null;
  description: string | null;
  description_short: string | null;
  photos: string[] | null;
  price?: number | null;
  tags?: string[] | null;
  created_at?: string;
  api_experience_id: number;
  categories: string[];
  cover: string;
  location: {
    city: string;
    country: string;
    cityCode: string;
    countryCode: string;
    name: string;
    geoLocationCenter: {
      lat: number;
      lng: number
    }
  };
  vendor: { id: number, title: string },
  duration_label: string;
  slug: string;
  api_ref_sync: string;

  pricing_categories: {
    id: number,
    title: string,
    fullTitle: string,
  }[];

  city_slug: string;
  country_slug: string;

  discount: number;
  agenda_items: IAgendaItem[];
  what_is_included: string[];
  what_is_included_description: string;

  duration: ITourDuration;
}

export enum ETypeTourInclusion {
  BUS_FARE = "BUS_FARE",
  TIP_OR_GRATUITY = "TIP_OR_GRATUITY",
  NATIONAL_PARK_ENTRANCE_FEE = "NATIONAL_PARK_ENTRANCE_FEE",
  FUEL_SURCHARGE = "FUEL_SURCHARGE",
  DEPARTURE_TAX = "DEPARTURE_TAX",
  PARKING_FEES = "PARKING_FEES",
  ENTRY_TAX = "ENTRY_TAX",
  FOOD_AND_DRINKS = "FOOD_AND_DRINKS",
  LANDING_AND_FACILITY_FEES = "LANDING_AND_FACILITY_FEES",
  ENTRY_OR_ADMISSION_FEE = "ENTRY_OR_ADMISSION_FEE",
  WIFI = "WIFI",
  GOODS_AND_SERVICES_TAX = "GOODS_AND_SERVICES_TAX"
}


export interface IDBTourIncludeDetails extends IDBTour {
  haveHeart?: boolean; // only have value when user is logged
  reviews_count?: number;
  reviews_sum_values?: number;
  booked_tours_today?: number;
  booked_tours_yesterday: number;
  occupied_spots_count: number;
}



export interface IDBReview {
  id: string;
  user_id: string | null;
  tour_id: string | null;
  video_url: string | null;
  rating: number | null;
  likes: number;
  created_at: string;
  comments: string | null;
  type: "experience" | "platform" | "vendor";
}



export interface ICustomerDetails {
  first_name: string;
  second_name: string;
  email_address: string;
  phone_number: string;
  address: string;
  country: string;
  city: string;
  x3_code: string;
}


export enum EBookingStatus {
  FORBIDDEN_BY_USER = 'FORBIDDEN_BY_USER',
  ERROR_CREATING_BOKUN_RESERVATION = 'ERROR_CREATING_BOKUN_RESERVATION',
  // 1. Local Checkout Layer (The 15-minute buffer)
  PENDING_HOLD = 'PENDING_HOLD',   // User clicked checkout, seats are temporarily locked in Supabase
  EXPIRED = 'EXPIRED',             // 15-minute countdown ran out; seats are automatically freed

  // 2. Operational Lifecycle Layer
  RESERVED = 'RESERVED',           // "Reserve Now & Pay Later" path (Bokun hold active, unpaid)
  CONFIRMED = 'CONFIRMED',         // Fully paid upfront or background charge succeeded (Bokun booked)

  // 3. Termination Layer
  CANCELLED = 'CANCELLED',         // Booking cancelled by user or operator
}

export enum EBookingCancellationReason {
  TRIP_CANCELLED = "TRIP_CANCELLED",
  I_FOUND_A_CHEAPER_PRICE = "I_FOUND_A_CHEAPER_PRICE",
  I_DID_NOT_RECEIVE_MY_CONFIRMATION_ON_TIME = "I_DID_NOT_RECEIVE_MY_CONFIRMATION_ON_TIME",
  THE_ACTIVITY_PROVIDER_ASKED_ME_TO_CANCEL = "THE_ACTIVITY_PROVIDER_ASKED_ME_TO_CANCEL",
  MY_TRAVEL_DATES_CHANGED = "MY_TRAVEL_DATES_CHANGED",
  MY_PREFERRED_OPTIONS_WERE_NOT_AVAILABLE = "MY_PREFERRED_OPTIONS_WERE_NOT_AVAILABLE",
  I_BOOKED_THE_WRONG_DATE = "I_BOOKED_THE_WRONG_DATE",
  I_BOOKED_THE_WRONG_NUMBER_OF_PARTICIPANTS = "I_BOOKED_THE_WRONG_NUMBER_OF_PARTICIPANTS",
  OTHER_REASON = "OTHER_REASON",
}

export interface IDBBooking {
  id: string;
  user_id: string | null;
  browser_id: string | null;
  tour_id: string | null;
  status: EBookingStatus | null;
  // payment_ref?: string | null;
  // cancelled_at?: string | null;
  // cancel_reason?: string | null;
  // financial_status?: IDBBookingFinancialStatus;
  // bokun_confirmation_code?: string | null;
  supplier_confirmation_code?: string | null;
  confirmation_code?: string | null;
  hash_code?: string | null;
  supplier_status?: string | null;
  // customer_email?: string | null;
  // customer_phone?: string | null;
  // customer_name?: string | null;
  // created_at?: string;
  customer_details: ICustomerDetails,
  date_created?: string;
  date_updated?: string;
  // checkout_session_id?: string | null;
  bookingId: number;
  // creationDate: number;
  currency: string;
  language: string;
  // paymentType: string;
  // totalPaid: number;
  // totalPrice: number;
  // totalPriceConverted: number;
  // default_payment_id?: string; // changed
  payment_method_id?: string;
  // default_payment_card_x4_last_numbers?: string,
  date_tour_start: string;
  date_tour_start_zone_0: string;
  time_slot_id: string;
  start_time_label?: string;
  count_participants: IBookingParticipants;
  time_tour_start_string: string;
  date_expire_after_creating: string;
  date_reserved: string;
  date_confirmed: string;
  date_cancelled: string;
  initial_payment_is_done: boolean;
}

export interface IDBBookingDetails extends IDBBooking {
  is_expired: boolean;
  tour_title: string;
  tour_cover: string;
  tour_slug: string;
  api_experience_id: number;
  amount100_paid: number;
  amount100_refunded: number;
  ////////////////////////////
  // what you wait update the rest
  starts_in_48_to_72h: boolean;
  starts_in_24_to_48h: boolean;
  starts_within_24h: boolean;
  starts_in_12_to_24h: boolean;
  starts_in_1_to_6h: boolean;
  starts_in_30m_to_1h: boolean;
  starts_in_0_to_30m: boolean;
  x24_hours_period_expired: boolean;
  to_start_the_event_we_have_72hours_or_more: boolean;
}





export interface IStripePaymentMethod {
  id: string;
  object: "payment_method";
  allow_redisplay: "unspecified" | "always" | "limited";
  billing_details: {
    address: {
      city: string | null;
      country: string | null;
      line1: string | null;
      line2: string | null;
      postal_code: string | null;
      state: string | null;
    };
    email: string | null;
    name: string | null;
    phone: string | null;
    tax_id: any | null;
  };
  card: {
    brand: string;
    checks: {
      address_line1_check: string | null;
      address_postal_code_check: string | null;
      cvc_check: string | null;
    };
    country: string;
    display_brand: string;
    exp_month: number;
    exp_year: number;
    funding: "credit" | "debit" | "prepaid" | "unknown";
    generated_from: string | null;
    last4: string;
    networks: {
      available: string[];
      preferred: string | null;
    };
    regulated_status: string;
    three_d_secure_usage: {
      supported: boolean;
    };
    wallet: any | null;
  };
  created: number;
  customer: string | null;
  customer_account: string | null;
  livemode: boolean;
  shared_payment_granted_token: string | null;
  type: "card";
}

export interface IPaymentMethodRecord {
  id: number; // bigint maps to number in TS
  created_at: string; // timestamps are typically strings (ISO format)
  customer_id: string | null;
  payment_method_id: string | null;
  // We use the interface created earlier for the 'details' column
  details: IStripePaymentMethod | null;
  userid: string | null; // UUID is a string in TS
}


export interface IDBPayment {
  // Primary key (bigserial)
  id: number;

  // Mandatory foreign key
  booking_id: string; // Assuming UUID maps to string

  // Mandatory Stripe fields
  stripe_payment_intent_id: string;
  amount_cents: number;
  currency: string;

  // Status matches your check constraint
  status:
  | 'succeeded'
  | 'requires_action'
  | 'requires_confirmation'
  | 'requires_payment_method'
  | 'requires_source'
  | 'requires_capture'
  | 'processing'
  | 'canceled'
  | 'failed';

  // Timestamps
  created_at: string; // or Date if you parse it
  updated_at: string; // or Date if you parse it

  // Nullable field
  payment_method_id: string;

  notes_info: string;
  notes_error: string;
}

export interface IDBPaymentDetails extends IDBPayment {
  payment_type: "card" | string;
  payment_card_type: string;
  payment_card_last_x4_digits: string;
}



export interface IDBRefund {
  id: number | string;
  booking_id: string;
  payment_intent_id: string;
  stripe_refund_id: string | null;
  amount_cents: number;
  currency: string;
  reason: string | null;
  status: IDBRefundStatus;
  // request_key?: string | null; // removed column
  created_at: string;
  // idempotency_key?: string | null; // removed column
  metadata: Record<string, any> | null;
}
export interface IDBRefundDetails extends IDBRefund {

}


export interface INewsletterEmail {
  id: number;
  created_at: string; // Postgres timestamp with time zone
  email: string | null;
}