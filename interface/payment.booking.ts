/** Base Interfaces for Reusability */

interface IMonetaryValue {
  amount: number;
  currency: string;
}

interface ITextMonetaryValue extends IMonetaryValue {
  totalAsText: string;
  totalDiscountedAsText: string;
  totalDueAsText: string;
  totalExcludedTaxAsText: string;
  totalIncludedTaxAsText: string;
  totalTaxAsText: string;
  strikeThroughTotalAsText: string;
}

interface IContact {
  contactDetailsHidden: boolean;
  contactDetailsHiddenUntil: number | null;
  id: number;
  created: number | null;
  uuid: string;
  email: string | null;
  title: string | null;
  firstName: string | null;
  lastName: string | null;
  personalIdNumber: string | null;
  clcEmail: boolean;
  language: string | null;
  nationality: string | null;
  sex: string | null;
  dateOfBirth: string | null;
  phoneNumber: string | null;
  phoneNumberCountryCode: string | null;
  address: string | null;
  postCode: string | null;
  state: string | null;
  place: string | null;
  country: string | null;
  organization: string | null;
  passportId: string | null;
  passportExpDay: number | null;
  passportExpMonth: number | null;
  passportExpYear: number | null;
  credentials: any; // null in example
  acceptsMarketing: boolean;
  tags: any; // null in example
  octoNote: string | null;
  phoneNumberLinkable: string | null;
}

interface IVendor {
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

interface IProductPhoto {
  id: number;
  originalUrl: string;
  description: string | null;
  alternateText: string | null;
  height: string;
  width: string;
  fileName: string;
  flags: any[];
  derived: {
    name: 'thumbnail' | 'preview' | 'large';
    url: string;
    cleanUrl: string;
  }[];
}

interface ICancellationPolicy {
  id: number;
  title: string;
  penaltyRules: any[]; // Define IPolicyRule
  tax: any; // null in example
  defaultPolicy: boolean;
  policyType: string;
  simpleCutoffHours: number | null;
  policyTypeEnum: string;
}

interface ILineItem {
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
  taxesAsMoney: any[]; // Define IMonetaryValue
  strikeThroughTotal: IMonetaryValue;
  pricingCategoryId: number;
  itemBookingId: string;
  costItemId: number;
  costItemTitle: string;
  costGroupTitle: string;
  supportsDiscount: boolean;
  people: number;
  taxAsMoney: IMonetaryValue;
  discountedUnitPriceAsMoney: IMonetaryValue;
  total: number;
  totalDueAsMoney: IMonetaryValue;
  totalDiscountedAsMoney: IMonetaryValue;
  totalAsMoney: IMonetaryValue;
  discountedUnitPrice: number;
  discount: number;
  totalDue: number;
  unitPriceAsMoney: IMonetaryValue;
  totalDiscounted: number;
  discountAmountAsMoney: IMonetaryValue;
  taxAsText: string;
  discountedUnitPriceAsText: string;
  unitPriceAsText: string;
  calculatedDiscountAmountAsMoney: IMonetaryValue;
  discountAmountAsText: string;
  totalAsText: string;
  totalDiscountedAsText: string;
  totalDueAsText: string;
}

interface IProduct {
  id: number;
  title: string;
  flags: any[];
  keyPhoto: IProductPhoto;
  vendor: IVendor;
  isPassProduct: boolean;
  rateTitle: string;
  offers: any[];
  cancellationPolicy?: ICancellationPolicy;
  productCategory?: string;
}

interface IProductInvoice extends ITextMonetaryValue {
  id: number;
  currency: string;
  includedAppliedTaxes: any[]; // Define ITax
  excludedAppliedTaxes: any[]; // Define ITax
  productBookingId: number;
  title: string;
  product: IProduct;
  productCategory: string;
  productConfirmationCode: string;
  dates: string;
  timestamp: number;
  hasFees: boolean;
  customLineItems: any[]; // Define ICustomLineItem
  lineItems: ILineItem[];
  appliedFees: any[]; // Define IFee
  totalFeesAsMoney: IMonetaryValue;
  totalFeesAsText: string;
  totalIncludedTaxAsMoney: IMonetaryValue;
  totalDueAsMoney: IMonetaryValue;
  free: boolean;
  totalDiscountedAsMoney: IMonetaryValue;
  totalAsMoney: IMonetaryValue;
  totalExcludedTaxAsMoney: IMonetaryValue;
  totalDiscountAsMoney: IMonetaryValue;
  totalTaxAsMoney: IMonetaryValue;
  excludedTaxes: boolean;
  includedTaxes: boolean;
  strikeThroughTotalAsMoney: IMonetaryValue;
  totalWithExcludedTaxAsMoney: IMonetaryValue;
}

interface IInvoice extends ITextMonetaryValue {
  id: number;
  issueDate: number;
  currency: string;
  includedAppliedTaxes: any[]; // Define ITax
  excludedAppliedTaxes: any[]; // Define ITax
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
  recipient: IContact;
  customLineItems: any[]; // Define ICustomLineItem
  productInvoices: IProductInvoice[];
  payments: any[]; // Define IPayment
  appliedFees: any[]; // Define IFee
  issuerName: string;
  totalFeesAsMoney: IMonetaryValue;
  totalDueAsMoney: IMonetaryValue;
  lodgingTaxes: any[]; // Define ILodgingTax
  totalBookingFeePercent: number;
  invoiceNumber: string;
  totalDueWithoutExcludedTaxAsMoney: IMonetaryValue;
  recipientName: string;
  totalFeesAsText: string;
  totalBookingFeeAsMoney: IMonetaryValue;
  totalIncludedTaxAsMoney: IMonetaryValue;
  free: boolean;
  totalDiscountedAsMoney: IMonetaryValue;
  totalAsMoney: IMonetaryValue;
  totalExcludedTaxAsMoney: IMonetaryValue;
  totalDiscountAsMoney: IMonetaryValue;
  totalTaxAsMoney: IMonetaryValue;
  excludedTaxes: boolean;
  includedTaxes: boolean;
  strikeThroughTotalAsMoney: IMonetaryValue;
  totalWithExcludedTaxAsMoney: IMonetaryValue;
}

interface IActivityBooking {
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
  product: IProduct;
  productId: number;
  linksToExternalProducts: any[];
  answers: any[];
  invoice: IProductInvoice;
  notes: {
    body: string;
    type: string;
    sentAsEmail: boolean;
    voucherAttached: boolean;
    voucherPricesShown: boolean;
  }[];
  supplierContractFlags: any[];
  sellerContractFlags: any[];
  cancellationPolicy: ICancellationPolicy;
  bookingRoles: string[];
  refundProtectionSelected: boolean;
  refundProtectionOffered: boolean;
  date: number;
  dateString: string;
  startTime: string;
  startTimeId: number;
  rateId: number;
  rateTitle: string;
  activity: IActivity; // See IActivity definition below
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
  pricingCategoryBookings: IPricingCategoryBooking[]; // See IPricingCategoryBooking definition below
  extras: any[];
  bookingFields: any[];
  pickup: boolean;
  dropoff: boolean;
  inventoryConfirmFailed: boolean;
  channelId: string;
  guidedLanguages: any[];
  quantityByPricingCategory: { [key: string]: number };
  bookedPricingCategories: any[]; // Define IPricingCategory
  totalParticipants: number;
  savedAmount: number;
}

interface IPricingCategoryBooking {
  id: number;
  pricingCategoryId: number;
  pricingCategory: any; // Define IPricingCategory
  leadPassenger: boolean;
  age: number;
  passengerInfo: IContact;
  bookingAnswers: any[];
  bookedTitle: string;
  occupancy: number;
  quantity: number;
  extras: any[];
  answers: any[];
  flags: any[];
}

interface IActivity {
  id: number;
  externalId: string | null;
  productGroupId: string | null;
  productCategory: string;
  box: boolean;
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
  cancellationPolicy: any;
  overrideBarcodeFormat: boolean;
  barcodeType: string;
  timeZone: string | null;
  mainContactFields: any[];
  requiredCustomerFields: any[];
  keywords: any[];
  flags: any[];
  slug: string | null;
  baseLanguage: string;
  languages: string[];
  paymentCurrencies: string[];
  customFields: any[];
  tagGroups: any[];
  categories: any[];
  keyPhoto: IProductPhoto;
  photos: IProductPhoto[];
  videos: any[];
  vendor: IVendor;
  boxedVendor: any;
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
  earlyBookingLimitSpecificDateTime: any;
  earlyBookingLimitDaysBefore: any;
  earlyBookingLimitMonthsBefore: any;
  earlyBookingLimitTime: any;
  capacityType: string;
  passExpiryType: any;
  fixedPassExpiryDate: any;
  meetingType: string;
  privateActivity: boolean;
  passCapacity: number;
  passValidForDays: any;
  passesAvailable: number;
  affiliateHubProduct: boolean;
  dressCode: boolean;
  passportRequired: boolean;
  supportedAccessibilityTypes: any[];
  startPoints: any[];
  bookingQuestions: any[];
  passengerFields: any[];
  inclusions: any[];
  included: any;
  exclusions: any[];
  excluded: any;
  requirements: any;
  knowBeforeYouGoItems: any[];
  attention: any;
  locationCode: any;
  googlePlace: {
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
    addressTypes: any[];
  };
  tripadvisorReview: any;
  resourceSlots: any[];
  bookingCutoffMinutes: number;
  bookingCutoffHours: number;
  bookingCutoffDays: number;
  bookingCutoffWeeks: number;
  requestDeadlineMinutes: number;
  requestDeadlineHours: number;
  requestDeadlineDays: number;
  requestDeadlineWeeks: number;
  boxedActivityId: any;
  comboActivity: boolean;
  comboParts: any[];
  returnProduct: any;
  offers: any[];
  ticketPerComboComponent: boolean;
  ticketComboComponents: any[];
  pickupActivityId: any;
  allowCustomizedBookings: boolean;
  reservationTimeout: any;
  vendorReservationTimeout: any;
  dayBasedAvailability: boolean;
  selectFromDayOptions: boolean;
  dayOptions: any[];
  activityCategories: string[];
  activityAttributes: string[];
  guidanceTypes: any[];
  defaultRateId: number;
  rates: any[]; // Define IRate
  ticketPerPerson: boolean;
  durationType: string;
  duration: number;
  durationMinutes: number;
  durationHours: number;
  durationDays: number;
  durationWeeks: number;
  durationText: string;
  minAge: number;
  originalDefaultPrice: any;
  nextDefaultPrice: any;
  nextDefaultPriceMoney: any;
  pickupService: boolean;
  pickupAllotment: boolean;
  pickupAllotmentType: string;
  useComponentPickupAllotments: boolean;
  pickupFlags: any[];
  customPickupAllowed: boolean;
  pickupMinutesBefore: any;
  pickupTimeWindowInMinutes: number;
  pickupTimeLocationBased: boolean;
  pickupTimeByLocations: any[];
  noPickupMsg: any;
  ticketMsg: any;
  showGlobalPickupMsg: boolean;
  showNoPickupMsg: boolean;
  pickupPlaceGroups: any[];
  dropoffService: boolean;
  dropoffFlags: any[];
  customDropoffAllowed: boolean;
  useSameAsPickUpPlaces: boolean;
  dropoffPlaceGroups: any[];
  difficultyLevel: string;
  pricingCategories: any[]; // Define IPricingCategory
  activityPriceCatalogs: any[]; // Define IPriceCatalog
  agendaItems: any[];
  startTimes: any[]; // Define IStartTime
  bookableExtras: any[];
  route: any;
  widgetSettings: any;
  hasOpeningHours: boolean;
  defaultOpeningHours: any; // Define IOpeningHours
  seasonalOpeningHours: any[];
  displaySettings: any; // Define IDisplaySettings
  hasBoxes: boolean;
  bookingLabels: any[];
  marketplaceVisibilityType: string;
  actualId: number;
  requestDeadline: number;
  bookingCutoff: number;
  nextDefaultPriceAsText: string;
  actualVendor: IVendor;
}


/** Root Interface */

export interface IPaymentBookingFeedback {
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
  customer: IContact;
  invoice: IInvoice;
  customerPayments: any[]; // Array of IPayment
  paymentType: string;
  seller: IVendor;
  bookingChannel: {
    id: number;
    uuid: string;
    title: string;
    backend: boolean;
    overrideVoucherHeader: boolean;
    type: string;
    paymentProviderAdded: boolean;
    flags: any[];
    shoppingCartPosition: string;
  };
  accommodationBookings: any[]; // Array of IAccommodationBooking
  activityBookings: IActivityBooking[];
  routeBookings: any[]; // Array of IRouteBooking
  giftCardBookings: any[]; // Array of IGiftCardBooking
  bookingFields: any[];
}


export interface IBookingDatabaseNet {
  total_rows: number;
  booking_id: string;
  booking_status: "CONFIRMED" | "CANCELLED" | string;
  booking_financial_status: "paid_in_full" | "partially_paid" | "pending" | string;
  booking_created_at: string; // ISO 8601 string
  bokun_confirmation_code: string;
  tour_title: string;
  tour_price: number | null;
  user_name: string;
  user_email: string;
  payment_intent_id: string;
  payment_amount_cents: number;
  payment_status: "succeeded" | "failed" | "pending" | string;
  booking_currency: string;
  total_refunded_cents: number;
  total_paid_cents: number;
}