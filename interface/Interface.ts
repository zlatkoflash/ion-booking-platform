import { IBokunItem } from "@/utils/bokun"


interface IBokunItemPhoto {
  originalUrl: string,
  derived: {
    name: "thumbnail" | "preview" | "large",
    url: string,
    cleanUrl: string
  }[],
  description?: string
}

export interface IExperienceBokunTourSharedInterface {
  id: string,
  title: string,
  durationText: string,

  keyPhoto: IBokunItemPhoto,
  photos: IBokunItemPhoto[],

  excerpt: string,
  description: string,

  googlePlace: {
    city: string,
    cityCode: string,
    country: string,
    countryCode: string,
    geoLocationCenter: { lat: number, lng: number }
    name: string
  },

  places: {
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
  }[],

  inclusions: string[],

  // this is in categories & themes section
  activityCategories: string[],
}

/**
 * Use this for the thumbnails
 */
export interface IExperienceZ extends IExperienceBokunTourSharedInterface {

  id: string,
  name: string,
  location: string,
  duration: string,
  price: number,
  rating: number,
  image: any,
  participants: number,
  tags: string[],
  vendor: {
    id: number,
    title: string
  },

  summary: string,
  descirption: {
    excerpt: string,
    summary: string
  }
}

/**
 * Use this for complete data
 */
export interface IExperienceCompleteZ extends IExperienceBokunTourSharedInterface {
  slug: string,

  actualVendor: {
    companyEmailIsDefault: boolean,
    currencyCode: string,
    id: number,
    showAgentDetailsOnTicket: boolean,
    showInvoiceIdOnTicket: boolean,
    showPaymentsOnInvoice: boolean,
    timeZone: string
    title: string
  },

  /**
   * this is holding the details for the prices
   */
  pricingCategories: {
    id: number;
    title: string;
    ticketCategory: 'ADULT' | string; // Use a literal type if limited, or string for flexibility
    occupancy: number;
    groupSize: number | null;
    ageQualified: boolean;
    minAge: number | null;
    maxAge: number | null;
    dependent: boolean;
    masterCategoryId: number | null;
    maxPerMaster: number;
    sumDependentCategories: boolean;
    maxDependentSum: number;
    internalUseOnly: boolean;
    flags: any[]; // Use a specific type here if you know what the flags contain
    defaultCategory: boolean;
    fullTitle: string;
  }[],

  rates: IBokunActivityRate[];

  // when load by slug or id, name don't work, it is working title
  // title: string,
  // photos: {}[],
}


interface IBokunCancellationPolicy {
  id: number;
  title: string; // e.g., "Non refundable"
  penaltyRules: any[];
  tax: string | null;
  defaultPolicy: boolean;
  policyType: string; // e.g., "NON_REFUNDABLE"
  simpleCutoffHours: number | null;
  policyTypeEnum: string; // e.g., "NON_REFUNDABLE"
}

interface IBokunRateTextItem {
  id: number;
  created: number[]; // Represents date array [year, month, day, hour, min, sec, ms]
  language: string; // e.g., "en_GB"
  title: string;
  activityRateId: number;
  description: string | null;
}

interface IBokunPriceByRate {
  activityRateId: number;
  pricePerCategoryUnit: IBokunPricePerCategoryUnit[];
  extraPricePerUnit: any[];
  extraPricePerCategoryUnit: any[];
}

interface IBokunPricePerCategoryUnit {
  id: number;
  amount: IBokunPriceDetails;
  minParticipantsRequired: number;
}

interface IBokunPriceDetails {
  amount: number; // e.g., 5634
  currency: string; // e.g., "ISK" (Icelandic Króna)
}

export interface IBokunActivityRate {
  id: number;
  title: string;
  description: string | null;
  index: number;
  rateCode: string | null;
  pricedPerPerson: boolean;
  minPerBooking: number;
  maxPerBooking: number;
  cancellationPolicy: IBokunCancellationPolicy;
  fixedPassExpiryDate: string | null;
  passValidForDays: number | null;
  pickupSelectionType: string; // e.g., "UNAVAILABLE"
  pickupPricingType: string; // e.g., "INCLUDED_IN_PRICE"
  pickupPricedPerPerson: boolean;
  dropoffSelectionType: string; // e.g., "UNAVAILABLE"
  dropoffPricingType: string; // e.g., "INCLUDED_IN_PRICE"
  dropoffPricedPerPerson: boolean;
  extraConfigs: any[];
  startTimeIds: any[];
  allStartTimes: boolean;
  tieredPricingEnabled: boolean;
  tiers: any[];
  pricingCategoryIds: number[]; // e.g., [1086130, 1086132]
  allPricingCategories: boolean;
  details: any[];
  textItems: IBokunRateTextItem[];
}

export interface IBokunAvailability {
  id: string; // e.g., "4460872_20251201"
  activityId: number; // e.g., 1119226
  activityTitle: string; // e.g., "Skopje Walking"
  activityOwnerId: number; // e.g., 129962
  activityOwnerTitle: string; // e.g., "TEsting Supplier(Vendor)"
  startTime: string; // e.g., "12:00"
  startTimeId: number; // e.g., 4460872
  startTimeLabel: string;
  flexible: boolean;
  date: number; // Unix timestamp in milliseconds, e.g., 1764547200000
  localizedDate: string; // e.g., "Mon 01.Dec'25"
  availabilityCount: number; // e.g., 15
  bookedParticipants: number; // e.g., 0
  minParticipants: number; // e.g., 1
  minParticipantsToBookNow: number; // e.g., 1
  productGroupId: number | null;
  recurrenceId: number; // e.g., 10373255
  pickupAllotment: boolean;
  pickupAvailabilityCount: number;
  unlimitedAvailability: boolean;
  defaultRateId: number; // e.g., 2224483
  rates: IBokunActivityRate[];
  pricesByRate: IBokunPriceByRate[];
  comboActivity: boolean;
  comboStartTimes: any[]; // Assuming an array of related start times, type unknown
  flags: any[]; // Assuming an array of flags, type unknown
  defaultPrice: IBokunPriceDetails | null;
  pricesByCategory: Record<string, any>; // Assuming key-value object of prices, structure unknown
  pickupPrice: IBokunPriceDetails | null;
  pickupPricesByCategory: Record<string, any>;
  dropoffPrice: IBokunPriceDetails | null;
  dropoffPricesByCategory: Record<string, any>;
  extraPrices: Record<string, any>;
  guidedLanguages: any[];
  unavailable: boolean;
  pickupSoldOut: boolean;
  soldOut: boolean;
}