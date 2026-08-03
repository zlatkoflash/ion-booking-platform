export interface ICancellationPenaltyRule {
  id: number;
  cutoffHours: number;
  charge: number;
  chargeType: 'percentage' | 'flat'; // expanded based on payload 'percentage'
  percentage: number;
}

export interface ICancellationPolicy {
  id: number;
  title: string;
  penaltyRules: ICancellationPenaltyRule[];
  tax: null | any;
  defaultPolicy: boolean;
  policyType: string;
  simpleCutoffHours: null | number;
  policyTypeEnum: string;
}

export interface IRateTextItem {
  id: number;
  created: [number, number, number, number, number, number, number]; // [year, month, day, hour, min, sec, ms]
  language: string;
  title: string;
  activityRateId: number;
  description: null | string;
}

export interface IRate {
  id: number;
  title: string;
  description: null | string;
  index: number;
  rateCode: string;
  pricedPerPerson: boolean;
  minPerBooking: number;
  maxPerBooking: number;
  cancellationPolicy: ICancellationPolicy;
  fixedPassExpiryDate: null | string;
  passValidForDays: null | number;
  pickupSelectionType: string;
  pickupPricingType: string;
  pickupPricedPerPerson: boolean;
  dropoffSelectionType: string;
  dropoffPricingType: string;
  dropoffPricedPerPerson: boolean;
  extraConfigs: any[];
  startTimeIds: number[];
  allStartTimes: boolean;
  tieredPricingEnabled: boolean;
  tiers: any[];
  pricingCategoryIds: number[];
  allPricingCategories: boolean;
  details: any[];
  textItems: IRateTextItem[];
}

export interface IAmount {
  amount: number;
  currency: string;
}

export interface IPricePerCategoryUnit {
  id: number;
  amount: IAmount;
  minParticipantsRequired: number;
  maxParticipantsRequired: number;
}

export interface IPriceByRate {
  activityRateId: number;
  pricePerCategoryUnit: IPricePerCategoryUnit[];
  extraPricePerUnit: any[];
  extraPricePerCategoryUnit: any[];
}

// ⚡️ Core Interface Requested
export interface IBookingTimeActivitySlot {
  id: string; // e.g., "4014588_20260705"
  activityId: number;
  activityTitle: string;
  activityOwnerId: number;
  activityOwnerTitle: string;
  startTime: string; // e.g., "08:15"
  startTimeId: number;
  startTimeLabel: string; // e.g., "English Tour"
  flexible: boolean;
  date: number; // Epoch timestamp
  localizedDate: string; // e.g., "Sun 05.Jul'26"
  availabilityCount: number;
  bookedParticipants: number;
  minParticipants: number;
  minParticipantsToBookNow: number;
  productGroupId: null | number | string;
  recurrenceId: number;
  pickupAllotment: boolean;
  pickupAvailabilityCount: number;
  unlimitedAvailability: boolean;
  defaultRateId: number;
  rates: IRate[];
  pricesByRate: IPriceByRate[];
  comboActivity: boolean;
  comboStartTimes: any[];
  flags: string[];
  defaultPrice: null | any;
  pricesByCategory: Record<string, any>;
  pickupPrice: null | any;
  pickupPricesByCategory: Record<string, any>;
  dropoffPrice: null | any;
  dropoffPricesByCategory: Record<string, any>;
  extraPrices: Record<string, any>;
  guidedLanguages: string[]; // Can be mapped to specific language locales later
  unavailable: boolean;
  pickupSoldOut: boolean;
  soldOut: boolean;
}




export interface IBokunCheckoutOptions {
  checkoutOption: "CUSTOMER_FULL_PAYMENT" | "CUSTOMER_PARTIAL_PAYMENT" | "CUSTOMER_NO_PAYMENT" | "AGENT_AFFILIATE" | "AGENT_RESELLER" | "AGENT_CUSTOMER",
  paymentMethod: "CARD" | "CASH" | "VOUCHER" | "RESERVE_FOR_EXTERNAL_PAYMENT",
  source: "SHOPPING_CART" | "DIRECT_REQUEST",
  sendNotificationToMainContact: boolean,
  showPricesInNotification: boolean,
  note: string,
  currency: string,
  user: {
    id: string;
    email: string;
    customer_email: string;
    customer_name: string;
    customer_phone: string;
  },
  directBooking: {
    mainContactDetails: {
      questionId: string,
      values: any[]
    }[],
    activityBookings: {
      activityId: number,
      rateId: number,
      startTimeId: number,
      date: string,
      note: string,
      passengers: {
        groupSize: number,
        quantity: number,
        pricingCategoryId: number,
        passengerDetails: any[],
        answers: any[]
      }[],
      answers: any[],
      pickupAnswers: any[],
      dropoffAnswers: any[],
    }[]
  }
}