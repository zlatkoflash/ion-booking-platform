/**
 * Interface representing a payment record retrieved from the database
 * or a specific payment API integration.
 */
export interface IDBPayment {
    /** The unique identifier for the payment record in your database. */
    id: number;

    /** The unique identifier of the corresponding booking in your system. */
    booking_id: string;

    /** The identifier for the payment intent created in Stripe. */
    stripe_payment_intent_id: string;

    /** The payment amount stored in the lowest currency unit (cents/pennies). */
    amount_cents: number;

    /** The currency code (e.g., 'eur', 'usd'). */
    currency: string;

    /** The status of the payment (e.g., 'succeeded', 'pending', 'failed'). */
    status: string;

    /** Identifier for the payment in the Bokun system, if applicable. Can be null. */
    bokun_payment_id: number | null; // Assuming Bokun IDs are numbers

    /** Timestamp of when the record was created. */
    created_at: string;

    /** The amount that has been refunded, in the lowest currency unit. */
    refunded_amount_cents: number;

    /** The current status of any refunds (e.g., 'none', 'pending', 'succeeded'). */
    refund_status: string;

    /** The reason for the last attempted refund, or null if none. */
    last_refund_reason: string | null;

    /** Timestamp of the last time the record was updated. */
    updated_at: string;

    /** The unique identifier for the corresponding invoice in the Bokun system. */
    bokun_invoice_id: number;
}