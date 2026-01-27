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



export const formatToYYYYMMDD = (date: Date): string => {
  // Use padStart to ensure month and day are two digits (e.g., 01, 09)
  const year = date.getFullYear();
  // JavaScript months are 0-indexed (0=Jan, 11=Dec), so add 1
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
/**
 * Takes a Date object and returns the first and last days of that month 
 * in the YYYY-MM-DD format.
 * * @param selectedMonth A Date object representing any day within the desired month.
 * @returns An object containing the firstDate and lastDate strings.
 */
export const getMonthBoundaries = (selectedMonth: Date | string)
  : {
    firstDate: string, lastDate: string
  } => {
  // Helper function to format a Date object into YYYY-MM-DD string


  if (typeof selectedMonth === 'string') {
    selectedMonth = new Date(selectedMonth);
  }

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


export const formatToClientTime = (ms: number) => {
  const date = new Date(ms);

  // Format the date part (e.g., Jan 27, 2026)
  const datePart = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Format the time part (e.g., 10:00 AM)
  const timePart = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return `${datePart} • ${timePart}`;
};


export const getTimeDifference = (date1: number, date2: number) => {
  // Use let because we will subtract from it as we go
  let diff = date2 - date1;

  // Calculate the total hours before "diff" is modified
  // We use Math.trunc to see the full hours regardless of direction
  const totalHours = Math.trunc(diff / (1000 * 60 * 60));

  const msInYear = 1000 * 60 * 60 * 24 * 365.25;
  const msInDay = 1000 * 60 * 60 * 24;
  const msInHour = 1000 * 60 * 60;
  const msInMinute = 1000 * 60;

  const years = Math.trunc(diff / msInYear);
  diff -= years * msInYear;

  const days = Math.trunc(diff / msInDay);
  diff -= days * msInDay;

  const hours = Math.trunc(diff / msInHour);
  diff -= hours * msInHour;

  const minutes = Math.trunc(diff / msInMinute);

  return {
    years,
    days,
    hours,
    minutes,
    totalHours // Added this
  };
};

// Example 1: Event is 1h 30m in the PAST
// Result: { years: 0, days: 0, hours: -1, minutes: -30 }

// Example 2: Event is 25 hours in the FUTURE
// Result: { years: 0, days: 1, hours: 1, minutes: 0 }

// Example usage:
// const time = getTimeDifference(new Date().getTime(), "2026-01-28T10:00:00");
// console.log(`${time.days}d ${time.hours}h ${time.minutes}m`);
// Output example: "01d 08h 12m"

// Example usage with milliseconds:
// console.log(formatToClientTime(1737942279000)); 
// Output: "Jan 27, 2026 • 1:44 AM" (based on the user's local clock)