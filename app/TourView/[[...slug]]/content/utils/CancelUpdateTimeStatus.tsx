import { useSelector } from "react-redux";
import { RootState } from "@/libs/store";
import { formatToClientTime, getTimeDifference } from "@/utils/dateUtils";

export default function CancelUpdateTimeStatus() {
  // Logic placeholders (You'll replace these with real props/state)

  const bookingCalendarState = useSelector((state: RootState) => state.bookingCalendar);
  // bookingCalendarState.
  const bookingForEditing = bookingCalendarState.editor.bokunBookingForediting;
  console.log("bookingForEditing Status Booking:", bookingForEditing);
  const ActivityBookingDate = new Date(bookingForEditing?.activityBookings[0].date as number);
  console.log("ActivityBookingDate:", ActivityBookingDate);
  const bookingDBNet = bookingCalendarState.editor.bookingDBNet;
  /*const selectedAvailability = bookingCalendarState.selectedAvailability;
  const selectedDate = bookingCalendarState.selectedDate;
  const experience = bookingCalendarState.dataForExperience?.experience;*/

  const timeDifference = getTimeDifference(
    new Date().getTime(),
    bookingForEditing?.activityBookings[0].date as number,
  );

  const hoursRemaining = timeDifference.totalHours;
  const isEligible = hoursRemaining >= 24 && bookingDBNet?.booking_status === "CONFIRMED";

  return (
    /* Removed shadow-xl, added border-gray-200 */
    <div className="max-w-md mx-auto bg-white rounded-2xl border border-gray-200 overflow-hidden">

      {/* Header: Removed bg-indigo-600, kept it clean with a bottom border */}
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-gray-900 font-semibold text-lg">
          Booking Status
          <span className={`ml-2 text-sm ${bookingDBNet?.booking_status === "CONFIRMED" ? "text-green-500" : "text-red-500"}`}>{bookingDBNet?.booking_status}</span>
        </h3>
      </div>

      <div className="p-6 space-y-6">
        {/* Event Time */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500 font-bold">Last Booked Event Time</p>
            <p className="text-gray-900 font-medium">{
              formatToClientTime(
                bookingForEditing?.activityBookings[0].date as number
              )
            }</p>
          </div>
          <div className="bg-indigo-50 p-2 rounded-lg border border-indigo-100">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        {/* Time Now */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-500 font-bold">Time Now</p>
            <p className="text-gray-900 font-medium">{
              formatToClientTime(
                new Date().getTime()
              )
            }</p>
          </div>
          <div className="bg-amber-50 p-2 rounded-lg border border-amber-100">
            <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Difference Display */}
        <div className="text-center">
          <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Time Remaining for the event</p>
          {
            bookingDBNet?.booking_status === "CANCELLED" ? (
              <div className="text-3xl font-bold text-gray-900">
                -
              </div>
            ) : timeDifference.totalHours >= 0 ? (
              <div className="text-3xl font-bold text-gray-900">
                {timeDifference.days}d {timeDifference.hours}h <span className="text-gray-400 text-xl font-normal">{timeDifference.minutes}m</span>
              </div>
            ) : (
              <div className="text-3xl font-bold text-gray-900">
                0h
              </div>
            )
          }

          <div className={`mt-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${isEligible ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
            }`}>
            <span className={`w-2 h-2 inline-block rounded-full mr-2 ${isEligible ? 'bg-green-500' : 'bg-red-500'
              }`}></span>
            {isEligible ? 'Eligible for Edits' : 'Locked (No Edits)'}
          </div>
        </div>

        {/* Progress Bar */}
        {
          /*
          <div className="relative pt-1">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-100">
            <div
              style={{ width: "75%" }}
              className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${isEligible ? 'bg-indigo-500' : 'bg-red-400'
                }`}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>Booking Made</span>
            <span className="font-bold text-indigo-600">24h Limit</span>
            <span>Event</span>
          </div>
        </div>
          */
        }
      </div>
    </div>
  );
}