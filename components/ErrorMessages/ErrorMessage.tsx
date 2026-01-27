import { AlertCircle } from "lucide-react";

/**
 * Converts a SCREAMING_SNAKE_CASE error code (e.g., "ERROR_BOOKING_RESERVATION_FAIL")
 * into a human-readable string (e.g., "Error booking reservation fail").
 * * @param errorCode The input error code string.
 * @returns The formatted string.
 */
function formatErrorCodeLocal(errorCode: string): string {
  if (!errorCode) {
    return "";
  }

  // 1. Convert to lowercase and replace underscores with spaces
  //    "ERROR_BOOKING_RESERVATION_FAIL" -> "error booking reservation fail"
  const formattedString = errorCode.toLowerCase().replace(/_/g, ' ');

  // 2. Capitalize the first letter of the first word
  //    "error booking reservation fail" -> "Error booking reservation fail"
  return formattedString.charAt(0).toUpperCase() + formattedString.slice(1);
}

export interface IAppError {
  /** A user-friendly message to display to the customer. */
  userMessage: string;
  /** A unique, internal code for logging and debugging. */
  errorCode: string;
  /** Suggestion for what the user can try next. */
  userAction: string;
}

export const BookingReservationFailedError: IAppError = {
  userMessage: "We couldn't reserve your spot at this time.",
  errorCode: "ERROR_BOOKING_RESERVATION_FAIL",
  userAction: "Please try the reservation process again, or contact support if the problem persists.",
};
export const BookingConfirmationFailedError: IAppError = {
  userMessage: "Your booking was reserved but failed to confirm.",
  errorCode: "ERR_BOOKING_CONFIRMATION_FAIL",
  userAction: "Check your email for a failed confirmation notice. Please wait a few minutes, or contact support with the exact time you attempted to book.",
};
export const PaymentStripeInitFailError: IAppError = {
  userMessage: "There was a problem loading the secure payment form.",
  errorCode: "ERR_STRIPE_INIT_FAIL",
  userAction: "Please refresh the page and try again. This may be due to an intermittent network issue.",
};
export const PaymentStripeFailedError: IAppError = {
  userMessage: "Your payment could not be processed at this time.",
  errorCode: "ERR_STRIPE_PAYMENT_FAIL",
  userAction: "Please double-check your card details, or try using a different payment method. Your card issuer may have declined the transaction.",
};
export const SavingToDatabaseFailError: IAppError = {
  userMessage: "Critical system error: We received your payment but could not save the final booking record.",
  errorCode: "ERR_DB_SAVE_FAIL",
  userAction: "Do NOT try to book again. Please contact support immediately with your payment confirmation details.",
};
export const UserSetInSystemFailError: IAppError = {
  userMessage: "System error: We can't set the user in the system.",
  errorCode: "ERR_USER_SET_IN_SYSTEM_FAIL",
  userAction: "Please refresh the page and try again later.",
};
export const BookingNotFound: IAppError = {
  userMessage: "Booking not found",
  errorCode: "ERR_BOOKING_NOT_FOUND",
  userAction: "Please refresh the page and try again later.",
}
export const BookingCancellingError: IAppError = {
  userMessage: "Booking cancelling error",
  errorCode: "ERR_BOOKING_CANCELLING_ERROR",
  userAction: "You can only cancell the booking that is confirmed and active.",
}


export default function ErrorMessage({ error, customErrorMessage }: { error: IAppError, customErrorMessage?: string }) {
  return <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 mt-5">
    <div className="flex items-start">
      <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
      <div>
        <div className="font-semibold text-red-800">{formatErrorCodeLocal(error.errorCode)}</div>
        <div className="text-sm text-red-700">
          {customErrorMessage !== undefined && customErrorMessage !== "" ? customErrorMessage : error.userMessage}
        </div>
        <div className="text-xs text-red-600 mt-1">
          {error.userAction}
        </div>
      </div>
    </div>
  </div>
}