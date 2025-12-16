/** Nested Interface for Address */
interface IAddress {
  city: string | null;
  country: string | null;
  line1: string | null;
  line2: string | null;
  postal_code: string | null;
  state: string | null;
}

/** Nested Interface for Billing Details */
interface IBillingDetails {
  address: IAddress;
  email: string | null;
  name: string | null;
  phone: string | null;
  tax_id: string | null;
}

/** Nested Interface for Card Checks */
interface ICardChecks {
  address_line1_check: string | null;
  address_postal_code_check: string | null;
  cvc_check: string | null;
}

/** Nested Interface for Card Details */
interface ICard {
  brand: string;
  checks: ICardChecks;
  country: string;
  display_brand: string;
  exp_month: number;
  exp_year: number;
  funding: string;
  generated_from: any | null; // Placeholder: could be a related object
  last4: string;
  networks: {
    available: string[];
    preferred: string | null;
  };
  regulated_status: string;
  three_d_secure_usage: {
    supported: boolean;
  };
  wallet: any | null; // Placeholder: could be an IWallet object
}

/** Root Interface */
export interface IStripePaymentMethod {
  id: string;
  object: 'payment_method';
  allow_redisplay: 'unspecified' | string;
  billing_details: IBillingDetails;
  card: ICard;
  created: number;
  customer: string | null; // Typically the Stripe Customer ID if attached
  customer_account: string | null;
  livemode: boolean;
  radar_options: Record<string, any>; // Empty object in example, often used for risk info
  type: 'card' | string;
}



export interface IStripePaymentIntent {
  /**
   * Unique identifier for the object.
   * Format: pi_...
   */
  id: string;

  /**
   * String representing the object's type.
   */
  object: 'payment_intent';

  /**
   * Amount intended to be collected by this PaymentIntent (in cents/smallest currency unit).
   */
  amount: number;

  /**
   * Three-letter ISO currency code (lowercase).
   */
  currency: string;

  /**
   * Status of the PaymentIntent, indicating what action is next.
   */
  status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'succeeded' | 'canceled' | string;

  /**
   * The client secret of this PaymentIntent. Used for client-side confirmation.
   * Format: pi_..._secret_...
   */
  clientSecret: string;

  /**
   * Indicates whether a customer must take an action before the payment can be completed.
   */
  requiresAction: boolean;

  /**
   * Error message if the PaymentIntent encountered a failure.
   */
  errorMessage: string | null;

  // Note: Your example is a minimalist view. A full Stripe PaymentIntent
  // contains many more properties (e.g., payment_method, charges, created, etc.).
}