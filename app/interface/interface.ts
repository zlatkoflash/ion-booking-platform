/*export interface IExperience {
  id: string;
  title: string;
  description: string;
  images_url: string[] | string;
  price: number;
  tags: string[] | string;
  location?: string;
  vendor?: string;
  bokun_activity_id?: string;
}*/



/*export interface IBokunTour {
  id: number;
  title: string;
  description?: string;
  excerpt?: string;
  keyPhoto?: {
    originalUrl: string;
  };
  photos?: Array<{
    fullSizeUrl: string;
  }>;
  price?: number;
  location?: {
    city: string;
    country: string;
  };
  vendor?: {
    title: string;
  };
  categories?: Array<{
    title: string;
  }>;
}*/

/**
 * IBokunSlot is using for availabilities for experience
 */
/*export interface IBokunSlot {
  startTimeId: number;
  startTime: string;
  date: string;
  availabilityCount: number;
  rates: Array<{
    id: number;
    pricingCategoryIds: number[];
  }>;
  pricesByRate: Array<{
    activityRateId: number;
    pricePerCategoryUnit: Array<{
      id: number; // pricingCategoryId
      amount: {
        amount: number;
        currency: string;
      };
    }>;
  }>;
}*/


export interface IContactDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  country?: string;
}


export interface IBooking {
  bookingId: string,
  tourName: string,
  location: string,
  date: string,
  duration: string,
  travelers: number,
  customerEmail: string,
  confirmationSent: boolean
}



export interface IAdminItem {
  booking_id: string;
  customer_name: string | null;
  customer_email: string | null;
  supplier_status: string | null;
  financial_status: string;
  currency: string;
  paid_total_cents: number;
  refunded_total_cents: number;
  net_cents: number;
  last_money_event_at: string | null;
  latest_payment_id: number | null;
  latest_payment_intent_id: string | null;
  remaining_cents: number;
};




/*export interface IContactDetails {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}*/