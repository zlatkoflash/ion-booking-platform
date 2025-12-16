/**
 * Custom React hook for formatting a number as a localized currency string.
 *
 * It uses Intl.NumberFormat for accurate, locale-aware price presentation.
 *
 * @param amount The numeric value to format. Can be null or undefined.
 * @param options Configuration object including currency code and optional locale.
 * @returns The formatted price string (e.g., "$1,234.56") or an empty string if amount is null/undefined.
 */

import { useMemo } from "react";

// --- Types for the Hook Options ---
type FormatterOptions = {
  /** The standard ISO 4217 currency code (e.g., 'USD', 'EUR', 'JPY', 'GBP'). */
  currency: string;
  /** The BCP 47 language tag (e.g., 'en-US', 'de-DE', 'ja-JP'). Defaults to 'en-US'. */
  locale?: string;
  /** Optional number of fraction digits to display. */
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};
export const useCurrencyFormatter = (
  amount: number | null | undefined,
  options: FormatterOptions
): string => {
  const {
    currency,
    locale = 'en-US',
    minimumFractionDigits = 2,
    maximumFractionDigits = 2
  } = options;

  // Use useMemo to cache the formatted string and only recalculate if
  // amount, currency, or locale changes. This is great for performance.
  return useMemo(() => {
    // Handle edge cases for amount
    if (amount === null || amount === undefined || isNaN(amount)) {
      return '';
    }

    try {
      // 1. Create the formatter instance
      const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: minimumFractionDigits,
        maximumFractionDigits: maximumFractionDigits,
      });

      // 2. Format and return
      return formatter.format(amount);

    } catch (e) {
      // Fallback for invalid currency/locale codes
      console.error('Error formatting currency. Check currency code or locale.', e);
      return `${currency} ${amount.toFixed(2)}`;
    }
  }, [amount, currency, locale, minimumFractionDigits, maximumFractionDigits]);
};


/**
 * 
 * @param for example inclusions or categoreis have this kind of texts:"NATIONAL_PARK_ENTRANCE_FEE"
 * this function for "NATIONAL_PARK_ENTRANCE_FEE" should return "National park entrance fee"
 */
export const GetBokunConstantsAsGoodText = (str: string): string => {
  return str.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, char => char.toUpperCase())
}