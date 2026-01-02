/*import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
export const stripePromise = loadStripe(
  import.meta.env.STRIPE_PK || ''
);

// Create a checkout session
export const createCheckoutSession = async (params: {
  tourTitle: string;
  price: number;
  confirmationCode?: string;
  contactDetails?: any;
  bokun?: any;
}) => {
  const response = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout-session`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify(params)
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to create checkout session');
  }

  return result;
};

// Redirect to Stripe Checkout
export const redirectToCheckout = async (sessionId: string) => {
  const stripe = await stripePromise;

  if (!stripe) {
    throw new Error('Stripe not loaded');
  }

  const { error } = await stripe.redirectToCheckout({ sessionId });

  if (error) {
    throw new Error(error.message);
  }
};

// Format price for display
export const formatPrice = (amount: number, currency = 'EUR') => {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

// Convert price to cents for Stripe
export const toCents = (amount: number) => {
  return Math.round(amount * 100);
};

// Convert cents back to euros
export const fromCents = (cents: number) => {
  return cents / 100;
};*/


export const truncateId = (id: string) => {
  if (!id) return "";
  if (id.length <= 10) return id; // Don't truncate if it's already short

  // Takes the first 6 characters and the last 3 characters
  return `${id.slice(0, 6)}...${id.slice(-3)}`;
};