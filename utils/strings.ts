export function stripHtml(htmlString: string): string {
  if (!htmlString) return "";

  return htmlString
    .replace(/<[^>]*>/g, "") // Strips all HTML tags
    .replace(/&nbsp;/g, " ") // Replaces common spaces
    .replace(/&amp;/g, "&")  // Fixes ampersands
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}


type CurrencyCode = 'EUR' | 'USD' | 'MKD';

/**
 * Formats a numeric value into a localized currency string.
 * 
 * @param amount - The numeric value to format (e.g., 37.49)
 * @param currency - The uppercase target currency code ('EUR' | 'USD' | 'MKD')
 * @returns A properly formatted currency string (e.g., "€37.49", "$37.49", "37,49 ден.")
 */
export function formatPrice(amount: number, currency: CurrencyCode): string {
  // Fallback check for missing or invalid numbers
  const safeAmount = typeof amount === 'number' && !isNaN(amount) ? amount : 0;

  // Set localizations to match specific currency standards
  const localeMapping: Record<CurrencyCode, string> = {
    EUR: 'de-DE', // Gives you €37.49 style. Change to 'en-IE' or 'fr-FR' depending on layout preferences
    USD: 'en-US', // Gives you $37.49
    MKD: 'mk-MK', // Gives you 37,49 ден.
  };

  const selectedLocale = localeMapping[currency] || 'en-US';

  return new Intl.NumberFormat(selectedLocale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(safeAmount);
}

export const checkEmail = (email: string): boolean => {
  if (!email) return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}


export function formatPaymentLabel(supabaseDate: string, paymentId: string): string {
  // 1. Format the date (e.g., "Mar 5")
  const dateFormatted = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric'
  }).format(new Date(supabaseDate));

  // 2. Mask the Payment ID (e.g., pi_3Y...789)
  // Keeps the first 5 chars + "..." + last 3 chars
  const maskedId = paymentId.slice(0, 5) + "..." + paymentId.slice(-3);

  // 3. Combine with the "26" suffix
  return `${dateFormatted},${maskedId}26`;
}

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toLocaleUpperCase() + string.slice(1);
}