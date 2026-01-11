import Stripe from 'stripe';

// 1. Tell TypeScript about the global variable
const globalForStripe = global as unknown as { stripe: Stripe | undefined };

export const getStripeServer = () => {
  // 2. Return the existing instance if it's already there
  if (globalForStripe.stripe) {
    return globalForStripe.stripe;
  }

  const key = process.env.STRIPE_SK;

  if (!key) {
    console.error("❌ STRIPE_SK is missing in the current environment.");
    throw new Error("Missing STRIPE_SK");
  }

  // 3. Create the instance once
  const stripe = new Stripe(key, {
    apiVersion: '2025-10-29.clover' as any,
  });

  // 4. Save it to the global object (in dev, this survives reloads)
  if (process.env.NODE_ENV !== 'production') {
    globalForStripe.stripe = stripe;
  }

  return stripe;
};

// Also export a shorthand constant if you prefer
export const stripeServer = getStripeServer();