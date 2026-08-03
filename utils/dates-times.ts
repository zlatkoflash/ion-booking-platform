import { ITourDuration } from "./interface-database";

// Format YYYY-MM-DD string to user-friendly MM/DD for display snippet pills
export const formatDateSnippet = (dateStr: string) => {
  const [_, month, day] = dateStr.split("-");
  return `${month}/${day}`;
};

export function formatTourDate(dateString: string, locale: string): string {
  if (!dateString) return "";

  // Split the YYYY-MM-DD string manually to avoid timezone shifting bugs
  const [year, month, day] = dateString.split("-").map(Number);

  // Note: JavaScript months are 0-indexed (0 = January, 4 = May)
  const date = new Date(year, month - 1, day);

  // Format the month to long text name ("May", "June", etc.)
  const monthName = date.toLocaleDateString(locale, { month: "long" });

  // Returns exact format: "1 May, 2026"
  return `${day} ${monthName}, ${year}`;
}
// Example usage:
// formatTourDate("2026-05-01") -> "1 May, 2026"
// formatTourDate("2026-06-14") -> "14 June, 2026"

export function formatMultipleDates(dateStrings: string[], locale: string): string {
  if (!dateStrings || dateStrings.length === 0) return "";

  // Map through the array utilizing the single date function directly
  return dateStrings
    .map((dateStr) => formatTourDate(dateStr, locale))
    .join(", ");
}


// for this type of array: const durations = ['3 hours', '2 hours and 30 minutes', '2 hours', '2 days', '1 hour and 30 minutes', '1 hour'];
export const parseToMinutes = (durationStr: string) => {
  let totalMinutes = 0;

  // Regular expressions to match numbers followed by days, hours, or minutes
  const daysMatch = durationStr.match(/(\d+)\s*day/);
  const hoursMatch = durationStr.match(/(\d+)\s*hour/);
  const minutesMatch = durationStr.match(/(\d+)\s*minute/);

  if (daysMatch) {
    totalMinutes += parseInt(daysMatch[1], 10) * 24 * 60; // 1 day = 1440 minutes
  }
  if (hoursMatch) {
    totalMinutes += parseInt(hoursMatch[1], 10) * 60;      // 1 hour = 60 minutes
  }
  if (minutesMatch) {
    totalMinutes += parseInt(minutesMatch[1], 10);
  }

  return totalMinutes;
};


// 1783036800000 -> Saturday, Mar 21, 2026
export const formatLongDate = (dateInput: number | string, locale: string = 'en-US') => {
  let dateObj: Date;

  if (typeof dateInput === 'number') {
    // JavaScript expects milliseconds. If it's a 10-digit Unix timestamp (seconds), multiply by 1000.
    const isSeconds = dateInput.toString().length === 10;
    dateObj = new Date(isSeconds ? dateInput * 1000 : dateInput);
  } else {
    // Supabase often returns "YYYY-MM-DD HH:mm:ss" without the 'T'.
    // Replacing the space with 'T' makes it a strictly valid ISO 8601 string for the Date constructor.
    const normalizedString = dateInput.includes(' ') ? dateInput.replace(' ', 'T') : dateInput;
    dateObj = new Date(normalizedString);
  }

  // Fallback check if the input was completely mangled or invalid
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  return dateObj.toLocaleDateString(locale, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

// Wed, March 25 2026
export const supabaseDateToDayOfWeekMonthDD = (dateInput: string | number): string => {
  let dateObj: Date;

  console.log("dateInput:", dateInput);

  if (typeof dateInput === 'number') {
    // JavaScript expects milliseconds. If it's a 10-digit Unix timestamp (seconds), multiply by 1000.
    const isSeconds = dateInput.toString().length === 10;
    dateObj = new Date(isSeconds ? dateInput * 1000 : dateInput);
  } else {
    // Supabase often returns "YYYY-MM-DD HH:mm:ss" without the 'T'.
    // Replacing the space with 'T' makes it a strictly valid ISO 8601 string.
    const normalizedString = dateInput.includes(' ') ? dateInput.replace(' ', 'T') : dateInput;
    dateObj = new Date(normalizedString);
  }

  // Fallback check if the input was mangled or invalid
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  // Formatting to match: "Wed, March 25 2026"
  return dateObj.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};


export const formatTo12HourTime = (timeString: string): string => {
  if (!timeString) return '';

  // Split the string into hours and minutes
  const [hoursStr, minutesStr] = timeString.split(':');
  let hours = parseInt(hoursStr, 10);
  const minutes = minutesStr || '00';

  // Determine AM or PM
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours from 24-hour to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'

  // Always return the consistent HH:MM AM/PM format
  return `${hours}:${minutes} ${ampm}`;
};

// Examples:
// formatTo12HourTime("08:00") -> "8:00 AM"
// formatTo12HourTime("11:00") -> "11:00 AM"
// formatTo12HourTime("13:00") -> "1:00 PM"
// formatTo12HourTime("12:30") -> "12:30 PM"

// Examples:
// formatTo12HourTime("13:00") -> "1:00 PM"
// formatTo12HourTime("08:00") -> "8 AM"
// formatTo12HourTime("18:30") -> "6:30 PM"
// formatTo12HourTime("00:15") -> "12:15 AM"




export const formatDateStart_plus_duration = (
  timeStart: string = "13:00",
  additional_duration: ITourDuration
): string => {
  // Use a base date reference to cleanly parse and manipulate the times
  const start = new Date(`2026-01-01T${timeStart}:00`);
  const end = new Date(start.getTime());

  // Add the hours and minutes directly
  end.setHours(end.getHours() + (additional_duration.durationHours || 0));
  end.setMinutes(end.getMinutes() + (additional_duration.durationMinutes || 0));

  const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: '2-digit', hour12: true };

  // Returns "1:00 PM - 3:00 PM"
  return `${start.toLocaleTimeString('en-US', options)} - ${end.toLocaleTimeString('en-US', options)}`;
};


export const supabaseDateToYYYMMDD = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
}

// 09 Jul 2026, 17:13
export const longDateTimeForBookingItem = (utcDate: string | null) => {
  // const utcDate = "2026-07-12T19:00:00Z"; // Your UTC string
  if (!utcDate || utcDate === "") return "N/A";

  const date = new Date(utcDate);

  // Use Intl.DateTimeFormat for exact control over the format
  const formatted = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(date);

  return formatted;
}



/**
 * Converts a JS Date object (or a date string) into a YYYY-MM-DD string.
 * Uses local time to ensure the date matches the user's timezone.
 * * @param {Date|string} dateInput - The date to format
 * @returns {string} The formatted date string (YYYY-MM-DD)
 */
export const formatDateToYYYYMMDD = (dateInput: Date): string => {
  const date = new Date(dateInput);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return '1970-01-01';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}



/**
 * Checks if a string matches the format YYYY-MM-DD-to-YYYY-MM-DD
 * @param {string} rangeString - The string to validate
 * @returns {boolean}
 */
export function isValidDateRangeFormat(rangeString: string | null): boolean {
  if (rangeString === null) return false;

  // Regex Breakdown:
  // ^\d{4}-\d{2}-\d{2} : Starts with YYYY-MM-DD
  // -to-               : Followed by the literal string "-to-"
  // \d{4}-\d{2}-\d{2}$ : Ends with YYYY-MM-DD
  const regex = /^\d{4}-\d{2}-\d{2}-to-\d{4}-\d{2}-\d{2}$/;

  return regex.test(rangeString);
}


// 2026-07-12 20:59:11.57037+00
// date is 2026-07-12 format, time is 14:30 format
export function slotDateTimeToSupabaseTimeZone00(date: string, time: string): string {
  // 1. Create a date string that represents the Italian time clearly
  // We use the 'Z' (UTC) indicator, but we will treat the numbers as Italy's time
  // and manually adjust the offset.
  const isoString = `${date}T${time}:00.000`;
  const localDate = new Date(isoString);

  // 2. Get the offset for Europe/Rome for that specific date
  // This handles the switch between CET (+01:00) and CEST (+02:00) automatically
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Rome',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  // Calculate the difference in minutes between Italy and UTC
  const italyDate = new Date(formatter.format(localDate));
  const offsetMinutes = (localDate.getTime() - italyDate.getTime()) / 60000;

  // 3. Create the actual UTC Date object by applying the offset
  const utcDate = new Date(localDate.getTime() + offsetMinutes * 60000);

  // 4. Format to YYYY-MM-DD HH:MM:SS.mmm+00
  const year = utcDate.getUTCFullYear();
  const month = String(utcDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(utcDate.getUTCDate()).padStart(2, '0');
  const hours = String(utcDate.getUTCHours()).padStart(2, '0');
  const minutes = String(utcDate.getUTCMinutes()).padStart(2, '0');
  const seconds = String(utcDate.getUTCSeconds()).padStart(2, '0');
  const ms = String(utcDate.getUTCMilliseconds()).padStart(3, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${ms}+00`;
}


//Mar 5,2026
export function DateToFormatMar52026(
  supabaseDateZ00: string,
  language = 'en-US'
): string {
  const date = new Date(supabaseDateZ00);

  // Use Intl.DateTimeFormat to format as "Mar 5, 2026"
  return new Intl.DateTimeFormat(language, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

//11:20 PM
export function DateToTimeAMPM(supabaseDateZ00: string, language = 'en-US'): string {
  const date = new Date(supabaseDateZ00);
  return date.toLocaleTimeString(language, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}