// Helper function to normalize dates to YYYY-MM-DD format
export const normalizeDateToYYYYMMDD = (dateString: any): string => {
  if (!dateString) return '';

  // Handle numeric timestamps
  if (typeof dateString === 'number') {
    return new Date(dateString).toISOString().split('T')[0];
  }

  // Handle Date objects by converting to ISO string
  if (dateString instanceof Date) {
    return dateString.toISOString().split('T')[0];
  }

  // Ensure we have a string before calling split
  const dateStr = String(dateString);

  // Handle YYYY-MM-DD format with explicit UTC parsing to prevent timezone shifts
  if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
    // For YYYY-MM-DD format, parse as UTC to prevent timezone shifts
    return new Date(dateStr + 'T00:00:00Z').toISOString().split('T')[0];
  }

  // Handle ISO strings and other formats
  return dateStr.split('T')[0];
};

export const formatDateString = (date: Date) => {
  // Use local date components to avoid timezone shifts
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
export const formatDateStringWithoutDashes = (date: Date) => {
  // Use local date components to avoid timezone shifts
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
};

export const formatDate = (dateString: string) => {
  // Parse as UTC to avoid timezone shifts
  const date = new Date(dateString + 'T00:00:00Z');
  return {
    day: date.getDate(),
    month: date.toLocaleDateString('en', { month: 'short' }),
    weekday: date.toLocaleDateString('en', { weekday: 'short' })
  };
};


export const AbbreviatedMonthDate = (dateString: string) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  });
};

export const FormatTimeFromDate = (dateString: string) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true // This ensures AM/PM instead of 24-hour time
  });
};




/**
 * Takes a Date object and returns the first and last days of that month 
 * in the YYYY-MM-DD format.
 * * @param selectedMonth A Date object representing any day within the desired month.
 * @returns An object containing the firstDate and lastDate strings.
 */
export const getMonthBoundaries = (selectedMonth: Date): { firstDate: string, lastDate: string } => {
  // Helper function to format a Date object into YYYY-MM-DD string
  const formatToYYYYMMDD = (date: Date): string => {
    // Use padStart to ensure month and day are two digits (e.g., 01, 09)
    const year = date.getFullYear();
    // JavaScript months are 0-indexed (0=Jan, 11=Dec), so add 1
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  // --- 1. Get the First Day of the Month ---
  // Create a new Date object based on the input month, but set the day to 1.
  // By using the 'Date' constructor with YYYY, MM, and 1, we ensure the time component is reset.
  const firstDay = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);

  // --- 2. Get the Last Day of the Month ---
  // The trick: Set the month to the NEXT month (selectedMonth.getMonth() + 1)
  // and set the day to 0. This magically rolls the date back to the last day 
  // of the PREVIOUS month.
  const lastDay = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0);

  return {
    firstDate: formatToYYYYMMDD(firstDay),
    lastDate: formatToYYYYMMDD(lastDay),
  };
}


export const isWithinPast24Hours = (createdAt: string) => {
  if (!createdAt) return false;

  const createdDate = new Date(createdAt).getTime(); // Convert to milliseconds
  const now = new Date().getTime(); // Current time in milliseconds
  const twentyFourHoursInMs = 24 * 60 * 60 * 1000;

  // Check if the difference is less than 24 hours 
  // AND ensure the date isn't somehow in the future
  return (now - createdDate) < twentyFourHoursInMs && (now - createdDate) >= 0;
};