

/** ENUMS derived from CHECK constraints **/

// CHECK (financial_status = ANY (ARRAY['unpaid'::text, 'paid_in_full'::text, 'partially_refunded'::text, 'refunded'::text]))
export type IDBBookingFinancialStatus = 'unpaid' | 'paid_in_full' | 'partially_refunded' | 'refunded';

// CHECK (status = ANY (ARRAY['requires_payment'::text, 'processing'::text, 'succeeded'::text, 'partially_refunded'::text, 'refunded'::text, 'failed'::text, 'canceled'::text]))
export type IDBPaymentStatus = 'requires_payment' | 'processing' | 'succeeded' | 'partially_refunded' | 'refunded' | 'failed' | 'canceled';

// CHECK (refund_status = ANY (ARRAY['none'::text, 'partial'::text, 'full'::text]))
export type IDBPaymentRefundStatus = 'none' | 'partial' | 'full';

// CHECK (status = ANY (ARRAY['pending'::text, 'succeeded'::text, 'failed'::text]))
export type IDBRefundStatus = 'pending' | 'succeeded' | 'failed';

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
export interface IDBTour {
  id: string;
  title: string | null;
  description: string | null;
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
}


export interface IDBBooking {
  id: string;
  user_id: string | null;
  tour_id: string | null;
  status: string | null;
  payment_ref?: string | null;
  cancelled_at?: string | null;
  cancel_reason?: string | null;
  financial_status?: IDBBookingFinancialStatus;
  bokun_confirmation_code?: string | null;
  supplier_confirmation_code?: string | null;
  supplier_status?: string | null;
  customer_email?: string | null;
  customer_phone?: string | null;
  customer_name?: string | null;
  created_at?: string;
  checkout_session_id?: string | null;
  bookingId: number;
  creationDate: number;
  currency: string;
  language: string;
  paymentType: string;
  totalPaid: number;
  totalPrice: number;
  totalPriceConverted: number;
  default_payment_id?: string;
  default_payment_card_x4_last_numbers?: string,
}
export interface IDBPayment {
  id: number;
  booking_id?: string;
  stripe_payment_intent_id?: string;
  amount_cents?: number;
  currency?: string;
  status?: IDBPaymentStatus;
  bokun_payment_id?: string | null;
  created_at?: string;
  refunded_amount_cents?: number;
  refund_status?: IDBPaymentRefundStatus;
  last_refund_reason?: string | null;
  updated_at?: string;
  bokun_invoice_id?: number,
  payment_method_id?: string
}
export interface IDBRefund {
  id: number | string;
  booking_id?: string;
  payment_intent_id?: string;
  stripe_refund_id?: string | null;
  amount_cents?: number;
  currency?: string;
  reason?: string | null;
  status?: IDBRefundStatus;
  request_key?: string | null;
  created_at?: string;
  idempotency_key?: string | null;
  metadata?: Record<string, any> | null;
}
export interface IDBReview {
  id: string;
  user_id: string | null;
  tour_id: string | null;
  video_url: string | null;
  rating: number | null;
  likes: number;
  created_at: string;
}