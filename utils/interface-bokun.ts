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

export interface IBokunBookingCancellPolicy {
  id: number;
  title: string;
  penaltyRules: any[];
  tax: any | null;
  defaultPolicy: boolean;
  policyType: string;
  simpleCutoffHours: number | null;
  policyTypeEnum: string;
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
/*export interface IBokunBookingVendor {
  id: number;
  title: string;
  currencyCode: string;
  timeZone: string;
  showInvoiceIdOnTicket: boolean;
  showAgentDetailsOnTicket: boolean;
  showPaymentsOnInvoice: boolean;
  companyEmailIsDefault: boolean;
}*/

// --- 2. CUSTOMER & CONTACT DETAILS ---

/*interface IBokunBookingCustomer {
  contactDetailsHidden: boolean;
  id: number;
  uuid: string;
  email: string;
  firstName: string;
  lastName: string;
  // Reduced for brevity; includes all fields like phoneNumber, address, etc.
  phoneNumber: string | null;
  country: string | null;
}*/

export interface IBokunBookingCustomer {
  contactDetailsHidden: boolean;
  contactDetailsHiddenUntil: null | number;
  id: number;
  created: null | number;
  uuid: string;
  email: string;
  title: null | string;
  firstName: string;
  lastName: string;
  personalIdNumber: null | string;
  clcEmail: boolean;
  language: null | string;
  nationality: null | string;
  sex: null | string;
  dateOfBirth: null | string;
  phoneNumber: null | string;
  phoneNumberCountryCode: null | string;
  address: null | string;
  postCode: null | string;
  state: null | string;
  place: null | string;
  country: null | string;
  organization: null | string;
  passportId: null | string;
  passportExpDay: null | number;
  passportExpMonth: null | number;
  passportExpYear: null | number;
  credentials: null | any;
  acceptsMarketing: boolean;
  tags: null | any[];
  octoNote: null | string;
  phoneNumberLinkable: null | boolean;
}

// --- 3. PRICING & INVOICE LINE ITEMS ---

/*interface IBokunBookingPricingCategory {
  id: number;
  title: 'Adults' | 'Children' | string;
  ticketCategory: 'ADULT' | 'CHILD' | string;
  occupancy: number;
  fullTitle: string;
  // Reduced for brevity
}*/
export interface IBokunBookingPricingCategory {
  id: number;
  title: string;
  ticketCategory: string;
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
  flags: any[];
  defaultCategory: boolean;
  fullTitle: string;
}

/*interface IBokunBookingLineItem {
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
}*/
export interface IBokunBookingLineItem {
  id: number;
  title: string;
  currency: string;
  unitPriceDate: number;
  quantity: number;
  unitPrice: number;
  calculatedDiscount: number;
  customDiscount: number;
  calculatedDiscountAmount: number;
  taxAmount: number;
  taxesAsMoney: any[];
  strikeThroughTotal: IBokunBookingMoney;
  pricingCategoryId: number;
  itemBookingId: string;
  costItemId: number;
  costItemTitle: string;
  costGroupTitle: string;
  supportsDiscount: boolean;
  people: number;
  total: number;
  totalDueAsMoney: IBokunBookingMoney;
  totalDue: number;
  totalDiscountedAsMoney: IBokunBookingMoney;
  unitPriceAsMoney: IBokunBookingMoney;
  totalAsMoney: IBokunBookingMoney;
  discount: number;
  totalDiscounted: number;
  taxAsMoney: IBokunBookingMoney;
  discountedUnitPriceAsMoney: IBokunBookingMoney;
  discountedUnitPrice: number;
  discountAmountAsMoney: IBokunBookingMoney;
  taxAsText: string;
  discountedUnitPriceAsText: string;
  unitPriceAsText: string;
  calculatedDiscountAmountAsMoney: IBokunBookingMoney;
  discountAmountAsText: string;
  totalAsText: string;
  totalDiscountedAsText: string;
  totalDueAsText: string;
}

/*interface IBokunBookingProductInvoice {
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
}*/

export interface IBokunBookingProductInvoice {
  id: number;
  currency: string;
  includedAppliedTaxes: any[];
  excludedAppliedTaxes: any[];
  productBookingId: number;
  title: string;
  product: {
    id: number;
    title: string;
    flags: any[];
    vendor: IBokunBookingSeller;
    isPassProduct: boolean;
    rateTitle: string;
    offers: any[];
    keyPhoto: IBokunBookingKeyPhoto;
  };
  productCategory: string;
  productConfirmationCode: string;
  dates: string;
  timestamp: number;
  hasFees: boolean;
  customLineItems: any[];
  lineItems: IBokunBookingLineItem[];
  appliedFees: any[];
  totalFeesAsMoney: IBokunBookingMoney;
  totalFeesAsText: string;
  free: boolean;
  totalDueAsMoney: IBokunBookingMoney;
  totalDiscountedAsMoney: IBokunBookingMoney;
  totalAsMoney: IBokunBookingMoney;
  totalExcludedTaxAsMoney: IBokunBookingMoney;
  totalIncludedTaxAsMoney: IBokunBookingMoney;
  totalDiscountAsMoney: IBokunBookingMoney;
  totalTaxAsMoney: IBokunBookingMoney;
  strikeThroughTotalAsMoney: IBokunBookingMoney;
  excludedTaxes: boolean;
  includedTaxes: boolean;
  totalAsText: string;
  totalWithExcludedTaxAsMoney: IBokunBookingMoney;
  totalDiscountedAsText: string;
  totalDiscountAsText: string;
  totalDueAsText: string;
  totalExcludedTaxAsText: string;
  totalIncludedTaxAsText: string;
  totalTaxAsText: string;
  strikeThroughTotalAsText: string;
}



/*interface IBokunBookingInvoice {
  id: number;
  issueDate: number;
  currency: string;
  issuerName: string;
  recipientName: string;
  productInvoices: IBokunBookingProductInvoice[];
  totalDueAsMoney: IBokunBookingMoney;
  invoiceNumber: string;
  // Reduced for brevity
}*/
export interface IBokunBookingInvoice {
  id: number;
  issueDate: number;
  currency: string;
  includedAppliedTaxes: any[];
  excludedAppliedTaxes: any[];
  issuer: {
    id: number;
    title: string;
    externalId: string;
    flags: any[];
  };
  issuerCompany: {
    registrationNumber: string;
    vatRegistrationNumber: string;
  };
  recipient: IBokunBookingCustomer;
  customLineItems: any[];
  productInvoices: IBokunBookingProductInvoice[];
  payments: any[];
  appliedFees: any[];
  issuerName: string;
  totalDueAsMoney: IBokunBookingMoney;
  totalBookingFeePercent: number;
  totalFeesAsMoney: IBokunBookingMoney;
  invoiceNumber: string;
  lodgingTaxes: any[];
  totalDueWithoutExcludedTaxAsMoney: IBokunBookingMoney;
  recipientName: string;
  totalFeesAsText: string;
  totalBookingFeeAsMoney: IBokunBookingMoney;
  free: boolean;
  totalDiscountedAsMoney: IBokunBookingMoney;
  totalAsMoney: IBokunBookingMoney;
  totalExcludedTaxAsMoney: IBokunBookingMoney;
  totalIncludedTaxAsMoney: IBokunBookingMoney;
  totalDiscountAsMoney: IBokunBookingMoney;
  totalTaxAsMoney: IBokunBookingMoney;
  strikeThroughTotalAsMoney: IBokunBookingMoney;
  excludedTaxes: boolean;
  includedTaxes: boolean;
  totalAsText: string;
  totalWithExcludedTaxAsMoney: IBokunBookingMoney;
  totalDiscountedAsText: string;
  totalDiscountAsText: string;
  totalDueAsText: string;
  totalExcludedTaxAsText: string;
  totalIncludedTaxAsText: string;
  totalTaxAsText: string;
  strikeThroughTotalAsText: string;
}

// --- 4. PRODUCT (ACTIVITY) DETAILS ---



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
  excerpt: string;
  googlePlace: IBokunBookingGooglePlace
}

export interface IBokunBookingActivityBooking {
  bookingId: number;
  parentBookingId: number;
  confirmationCode: string;
  productConfirmationCode: string;
  status: 'RESERVED' | 'CONFIRMED' | string;
  title: string;

  discountAmount: number;
  discountPercentage: number;
  priceWithDiscount: number;

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
  // Reduced for brevity

  rateId: number;
  startTimeId: number;

}


// --- 5. MAIN BOOKING INTERFACE ---

export interface IBokunBooking {
  ok: boolean;
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


export interface IBokunBookingBaseDetails {
  booking_id: number;
  main_activity_booking_id: number;
  main_activity_participants_categories_booked_ids: number[];
}




export interface IBokunPriceList {
  activityId: number;
  isPriceConverted: boolean;
  conversionRate: number;
  defaultCurrency: string;
  pricesByDateRange: IBokunPricesByDateRange[];
}

export interface IBokunPricesByDateRange {
  from: string; // ISO Date String
  to: string;   // ISO Date String
  rates: IBokunRate[];
}

export interface IBokunRate {
  rateId: number;
  title: string;
  passengers: IBokunPassenger[];
  extras: any[];
}

export interface IBokunPassenger {
  pricingCategoryId: number;
  title: string;
  ticketCategory: 'ADULT' | 'CHILD' | 'YOUTH' | 'SENIOR' | 'INFANT' | string;
  price: IBokunPriceDetail;
  tieredPrices: any[];
  extras: any[];
}

export interface IBokunPriceDetail {
  currency: string;
  amount: number;
  ofWhichTax: number;
  converted: boolean;
  conversionRate: number;
  inferred: boolean;
}






export interface IBokunBookingRoot {
  creationDate: number;
  bookingId: number;
  language: string;
  confirmationCode: string;
  status: string;
  currency: string;
  totalPrice: number;
  totalPaid: number;
  totalDue: number;
  totalDueAsText: string;
  totalPriceConverted: number;
  customer: IBokunBookingCustomer;
  invoice: IBokunBookingInvoice;
  customerPayments: any[];
  paymentType: string;
  seller: IBokunBookingSeller;
  bookingChannel: IBokunBookingChannel;
  accommodationBookings: any[];
  activityBookings: IBokunBookingActivity[];
  routeBookings: any[];
  giftCardBookings: any[];
  bookingFields: any[];
}








export interface IBokunBookingActivity {
  bookingId: number;
  parentBookingId: number;
  confirmationCode: string;
  productConfirmationCode: string;
  barcode: {
    value: string;
    barcodeType: string;
  };
  hasTicket: boolean;
  boxBooking: boolean;
  startDateTime: number;
  endDateTime: number;
  status: string;
  includedOnCustomerInvoice: boolean;
  title: string;
  totalPrice: number;
  priceWithDiscount: number;
  totalPriceAsText: string;
  priceWithDiscountAsText: string;
  discountPercentage: number;
  discountAmount: number;
  productCategory: string;
  paidType: string;
  product: IBokunBookingProductDetails;
  productId: number;
  linksToExternalProducts: any[];
  answers: any[];
  invoice: IBokunBookingProductInvoice;
  notes: IBokunBookingNote[];
  supplierContractFlags: any[];
  sellerContractFlags: any[];
  cancellationPolicy: IBokunBookingCancellPolicy;
  bookingRoles: string[];
  refundProtectionSelected: boolean;
  refundProtectionOffered: boolean;
  date: number;
  dateString: string;
  startTime: string;
  startTimeId: number;
  startTimeExternalLabel: string;
  rateId: number;
  rateTitle: string;
  // activity: IBokunBookingActivity;
  bookingAnswers: any[];
  pickupAnswers: any[];
  dropoffAnswers: any[];
  flexible: boolean;
  customized: boolean;
  customizedDurationMinutes: number;
  customizedDurationHours: number;
  customizedDurationDays: number;
  customizedDurationWeeks: number;
  ticketPerPerson: boolean;
  offerApplied: boolean;
  pricingCategoryBookings: IBokunBookingPricingCategoryBooking[];
  extras: any[];
  bookingFields: any[];
  pickup: boolean;
  dropoff: boolean;
  inventoryConfirmFailed: boolean;
  channelId: string;
  guidedLanguages: any[];
  quantityByPricingCategory: { [key: string]: number };
  bookedPricingCategories: IBookedPricingCategory[];
  totalParticipants: number;
  savedAmount: number;
}

export interface IBokunBookingProductDetails {
  id: number;
  title: string;
  flags: any[];
  vendor: IBokunBookingSeller;
  productCategory: string;
  isPassProduct: boolean;
  offers: any[];
  cancellationPolicy: IBokunBookingCancellPolicy;
}

/*export interface IBokunBookingCancellationPolicy {
  id: number;
  title: string;
  penaltyRules: any[];
  tax: null | any;
  defaultPolicy: boolean;
  policyType: string;
  simpleCutoffHours: null | number;
  policyTypeEnum: string;
}*/



export enum EBokunPersonCategory {
  ADULT = 'ADULT',
  CHILD = 'CHILD',
  YOUTH = 'YOUTH',
  SENIOR = 'SENIOR',
  INFANT = 'INFANT'
}

export interface IBokunBookingPricingCategoryBooking {
  id: number;
  pricingCategoryId: number;
  pricingCategory: IBokunBookingPricingCategory;
  leadPassenger: boolean;
  age: number;
  passengerInfo: IBokunBookingCustomer;
  bookingAnswers: any[];
  bookedTitle: string;
  occupancy: number;
  quantity: number;
  extras: any[];
  answers: any[];
  flags: any[];
  ticketCategory: EBokunPersonCategory
}
/*interface IBokunBookingPricingCategoryBooking {
  id: number;
  pricingCategoryId: number;
  pricingCategory: IBokunBookingPricingCategory;
  quantity: number;
  bookedTitle: string;
  // Includes partial customer/passenger info
  passengerInfo: IBokunBookingCustomer;
}*/

export interface IBokunBookingSeller {
  id: number;
  title: string;
  currencyCode: string;
  countryCode?: string;
  phoneNumber?: string;
  emailAddress?: string;
  website?: string;
  invoiceIdNumber?: string;
  timeZone?: string;
  showInvoiceIdOnTicket: boolean;
  showAgentDetailsOnTicket: boolean;
  showPaymentsOnInvoice: boolean;
  companyEmailIsDefault: boolean;
}

export interface IBokunBookingChannel {
  id: number;
  uuid: string;
  title: string;
  backend: boolean;
  overrideVoucherHeader: boolean;
  type: string;
  paymentProviderAdded: boolean;
  flags: any[];
  shoppingCartPosition: string;
}

export interface IBokunBookingNote {
  body: string;
  type: string;
  sentAsEmail: boolean;
  voucherAttached: boolean;
  voucherPricesShown: boolean;
}

/*export interface IBokunBookingMoney {
  amount: number;
  currency: string;
}*/


export interface IBokunBookingActivity {
  id: number;
  externalId: string | null;
  productGroupId: number | null;
  productCategory: string;
  box: boolean;
  price: number;
  inventoryLocal: boolean;
  inventorySupportsPricing: boolean;
  inventorySupportsAvailability: boolean;
  creationDate: string;
  lastModified: string;
  lastPublished: string;
  published: boolean;
  title: string;
  description: string | null;
  excerpt: string | null;
  cancellationPolicy: IBokunBookingCancellPolicy;
  overrideBarcodeFormat: boolean;
  barcodeType: string;
  timeZone: string | null;
  mainContactFields: any[];
  requiredCustomerFields: any[];
  keywords: string[];
  flags: string[];
  slug: string | null;
  baseLanguage: string;
  languages: string[];
  paymentCurrencies: string[];
  customFields: any[];
  tagGroups: any[];
  categories: any[];
  keyPhoto: any | null;
  photos: any[];
  videos: any[];
  vendor: IBokunBookingVendor;
  boxedVendor: any | null;
  storedExternally: boolean;
  pluginId: string | null;
  reviewRating: number | null;
  reviewCount: number | null;
  activityType: string;
  bookingType: string;
  scheduleType: string;
  cutoffType: string;
  cutoffReferenceHour: number | null;
  cutoffReferenceMinute: number | null;
  earlyBookingLimitType: string;
  earlyBookingLimitSpecificDateTime: string | null;
  earlyBookingLimitDaysBefore: number | null;
  earlyBookingLimitMonthsBefore: number | null;
  earlyBookingLimitTime: string | null;
  capacityType: string;
  passExpiryType: string | null;
  fixedPassExpiryDate: string | null;
  meetingType: string;
  privateActivity: boolean;
  passCapacity: number;
  passValidForDays: number | null;
  passesAvailable: number;
  affiliateHubProduct: boolean;
  dressCode: boolean;
  passportRequired: boolean;
  supportedAccessibilityTypes: any[];
  startPoints: any[];
  bookingQuestions: any[];
  passengerFields: any[];
  inclusions: any[];
  included: string | null;
  exclusions: any[];
  excluded: string | null;
  requirements: string | null;
  knowBeforeYouGoItems: any[];
  attention: string | null;
  locationCode: string | null;
  googlePlace: IBokunBookingGooglePlace;
  tripadvisorReview: any | null;
  resourceSlots: any[];
  bookingCutoffMinutes: number;
  bookingCutoffHours: number;
  bookingCutoffDays: number;
  bookingCutoffWeeks: number;
  requestDeadlineMinutes: number;
  requestDeadlineHours: number;
  requestDeadlineDays: number;
  requestDeadlineWeeks: number;
  boxedActivityId: number | null;
  comboActivity: boolean;
  comboParts: any[];
  returnProduct: any | null;
  offers: any[];
  ticketPerComboComponent: boolean;
  ticketComboComponents: any[];
  pickupActivityId: number | null;
  allowCustomizedBookings: boolean;
  reservationTimeout: number | null;
  vendorReservationTimeout: number | null;
  dayBasedAvailability: boolean;
  selectFromDayOptions: boolean;
  dayOptions: any[];
  activityCategories: any[];
  activityAttributes: any[];
  guidanceTypes: any[];
  defaultRateId: number;
  rates: IBokunBookingRate[];
  ticketPerPerson: boolean;
  durationType: string;
  duration: number;
  durationMinutes: number;
  durationHours: number;
  durationDays: number;
  durationWeeks: number;
  durationText: string;
  minAge: number;
  originalDefaultPrice: number | null;
  nextDefaultPrice: number | null;
  nextDefaultPriceMoney: any | null;
  pickupService: boolean;
  pickupAllotment: boolean;
  pickupAllotmentType: string;
  useComponentPickupAllotments: boolean;
  pickupFlags: any[];
  customPickupAllowed: boolean;
  pickupMinutesBefore: number | null;
  pickupTimeWindowInMinutes: number;
  pickupTimeLocationBased: boolean;
  pickupTimeByLocations: any[];
  noPickupMsg: string | null;
  ticketMsg: string | null;
  showGlobalPickupMsg: boolean;
  showNoPickupMsg: boolean;
  pickupPlaceGroups: any[];
  dropoffService: boolean;
  dropoffFlags: any[];
  customDropoffAllowed: boolean;
  useSameAsPickUpPlaces: boolean;
  dropoffPlaceGroups: any[];
  difficultyLevel: string;
  pricingCategories: IBokunBookingPricingCategory[];
  activityPriceCatalogs: IBokunBookingPriceCatalog[];
  agendaItems: any[];
  startTimes: IBokunBookingStartTime[];
  bookableExtras: any[];
  route: any | null;
  widgetSettings: any | null;
  hasOpeningHours: boolean;
  defaultOpeningHours: any | null;
  seasonalOpeningHours: any[];
  displaySettings: IBokunBookingDisplaySettings;
  hasBoxes: boolean;
  bookingLabels: any[];
  marketplaceVisibilityType: string;
  requestDeadline: number;
  bookingCutoff: number;
  actualId: number;
  nextDefaultPriceAsText: string;
  actualVendor: IBokunBookingVendor;
}



export interface IBokunBookingGooglePlace {
  id: number;
  country: string;
  countryCode: string;
  city: string;
  cityCode: string;
  state: string;
  stateCode: string;
  name: string;
  placeId: string;
  geoLocationCenter: {
    lat: number;
    lng: number;
  };
  addressTypes: string[];
}

export interface IBokunBookingRate {
  id: number;
  title: string;
  description: string | null;
  index: number;
  rateCode: string | null;
  pricedPerPerson: boolean;
  minPerBooking: number;
  maxPerBooking: number | null;
  cancellationPolicy: IBokunBookingCancellPolicy;
  fixedPassExpiryDate: string | null;
  passValidForDays: number | null;
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
  textItems: IBokunBookingTextItem[];
}

export interface IBokunBookingTextItem {
  id: number;
  created: number[]; // Format: [year, month, day, hour, minute, second, nanoseconds]
  language: string;
  title: string;
  activityRateId: number;
  description: string | null;
}



export interface IBokunBookingPriceCatalog {
  catalog: {
    id: number;
    title: string;
    defaultCurrency: string;
    isVendorDefaultCatalog: boolean;
    currencies: string[];
  };
  catalogId: number;
  currencies: {
    currency: string;
    currencyId: number;
    default: boolean;
  }[];
}

export interface IBokunBookingStartTime {
  id: number;
  label: string;
  externalLabel: string;
  hour: number;
  minute: number;
  overrideTimeWhenPickup: boolean;
  pickupHour: number;
  pickupMinute: number;
  durationType: string;
  voucherPickupMsg: string;
  externalId: string;
  duration: number;
  durationMinutes: number;
  durationHours: number;
  durationDays: number;
  durationWeeks: number;
  flags: any[];
}

export interface IBokunBookingDisplaySettings {
  showPickupPlaces: boolean;
  showRouteMap: boolean;
  selectRateBasedOnStartTime: boolean;
  customFields: any[];
}


export interface IBookedPricingCategory {
  id: number;
  title: string;
  ticketCategory: string | null;
  occupancy: number;
  groupSize: number;
  ageQualified: boolean;
  minAge: number | null;
  maxAge: number | null;
  dependent: boolean;
  masterCategoryId: number | null;
  maxPerMaster: number;
  sumDependentCategories: boolean;
  maxDependentSum: number;
  internalUseOnly: boolean;
  flags: any[];
  defaultCategory: boolean;
  fullTitle: string;

}


export interface IBokunCart {
  sellerId: string;
  sessionId: string;
  singleAllowedCurrency: string;
  size: number;
  totalPrice: number;
  totalPriceInInvoiceCurrency: number;
  lastAccessDate: number;
  ok: boolean;
  promoCode: null;
  reservationTimeout: number;
  reservationTimeoutDefined: boolean;
  customerInvoiceInInvoiceCurrency: null;
  customerUUID: null;
  giftCard: null;

  customerInvoice: IBokunBookingInvoice,

  accommodationBookings: any[],
  activityBookings: IBokunCartActivity[],
  giftCardBookings: any[],
  routeBookings: any[],
}


export interface IBokunCartActivity {
  id: number;
  productConfirmationCode: string;
  creationDate: number;
  lastModifiedDate: number;
  bookingStatus: string;
  totalPrice: number;
  includedOnCustomerInvoice: boolean;
  date: number;
  activity: {
    id: number;
    title: string;
    flags: any[];
    keyPhoto: IBokunBookingKeyPhoto;
    vendor: IBokunBookingVendor;
    productCategory: string;
    durationText: string;
    isPassProduct: boolean;
    excerpt: string;
    offers: any[];
    cancellationPolicy: IBokunBookingCancellPolicy;
    timezone: string;
  };
  startTime: IBokunBookingStartTime;
  rate: IBokunBookingRate;
  flexible: boolean;
  activityPrice: number;
  extrasPrice: number;
  pickup: boolean;
  dropoff: boolean;
  dateString: string;
  pickupPrice: number;
  dropoffPrice: number;
  maxBookableCount: number;
  unlimitedAvailability: boolean;
  firstLineItemDiscount: number;
  pricingCategoryBookings: {
    id: number;
    pricingCategoryId: number;
    pricingCategory: IBokunBookingPricingCategoryBooking;
    leadPassenger: boolean;
    age: number;
    bookingAnswers: any[];
    bookedTitle: string;
    occupancy: number;
    quantity: number;
    extras: any[];
    answers: any[];
    flags: any[];
  }[];
  extraBookings: any[];
}