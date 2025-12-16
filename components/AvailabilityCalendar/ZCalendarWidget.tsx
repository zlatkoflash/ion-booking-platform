'use client';

import { useBookingSidebar } from '@/app/TourView/[[...slug]]/content/BookingSidebarProvider';
import { IBokunAvailability } from '@/interface/Interface';
// import { IBokunSlot } from '@/app/interface/interface';
import { formatDateString, normalizeDateToYYYYMMDD } from '@/utils/dateUtils';
import {
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { useEffect, useState } from 'react';


export interface IZCalendarWidget {
  // slots: IBokunAvailability[],
  availablilitesForDateRange: IBokunAvailability[],
  selectedDate: string | null,
  onDateClick: (dateString: string, availability: IBokunAvailability) => void,
  onMonthChange?: (date: Date) => void,
  // calendarActiveMonth: Date,
  // set_calendarActiveMonth: (date: Date) => void,
}

export default function ZCalendarWidget(
  data: IZCalendarWidget
) {

  const {
    // slots,
    availablilitesForDateRange,
    selectedDate,
    onDateClick,
    onMonthChange,
    // calendarActiveMonth,
    // set_calendarActiveMonth,
  } = data;

  const {
    calendarActiveMonth,
    set_calendarActiveMonth
  } = useBookingSidebar();

  // const [currentMonth, setCurrentMonth] = useState(new Date());
  /*useEffect(() => {
    // onMonthChange && onMonthChange(currentMonth);
  }, [currentMonth, onMonthChange]);*/
  /*const handleDateClick = (dateString: string) => {
    // setSelectedDate(dateString);
    console.log("setSelectedDate(dateString)");


    // Find slots for this date
    const slotsForDate = slots.filter(slot => normalizeDateToYYYYMMDD(slot.date) === dateString);
    if (slotsForDate.length > 0) {
      // Auto-select first available slot for the date
      // handleSlotClick(slotsForDate[0]);
      console.log("handleSlotClick(slotsForDate[0]);");
    }
  };*/


  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };



  const navigateMonth = (direction: 'prev' | 'next') => {
    // onMonthChange && onMonthChange(new Date());
    let newDateChanged: Date;
    console.log("calendarActiveMonth:", calendarActiveMonth);
    if (direction === 'prev') {
      newDateChanged = new Date(calendarActiveMonth.getFullYear(), calendarActiveMonth.getMonth() - 1, 1);
    } else {
      newDateChanged = new Date(calendarActiveMonth.getFullYear(), calendarActiveMonth.getMonth() + 1, 1);
    }
    console.log("newDateChanged:", newDateChanged);
    set_calendarActiveMonth(newDateChanged)
    /*setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });*/
  };

  /**
   * 
   * @param date 
   * @returns By the date, will return availabilities for that date,
   * usually availabilities are with time of the date.
   */
  const getAvailabilitiesForDate = (date: Date) => {
    const dateString = formatDateString(date);
    // console.log("dateString:", dateString);
    // return true;
    // console.log('normalizeDateToYYYYMMDD(slot.date) === dateString):', `${normalizeDateToYYYYMMDD(slot.date)} === ${dateString}`);
    // return slots.filter(slot => normalizeDateToYYYYMMDD(slot.date) === dateString);
    return availablilitesForDateRange.filter(availibility => normalizeDateToYYYYMMDD(availibility.date) === dateString);
  };

  console.log("calendarActiveMonth inside ZCalendarWidget:", calendarActiveMonth);

  return <div className="z-calendar-widget">
    {/* Calendar Header */}
    <div className="flex items-center justify-between mb-6">
      <button
        onClick={() => {
          navigateMonth('prev');
          console.log("navigateMonth('prev');");
          if (onMonthChange !== undefined) {
            onMonthChange(calendarActiveMonth)
          }

        }}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </button>

      <h4 className="text-lg font-semibold text-gray-800">
        {calendarActiveMonth.toLocaleDateString('en', { month: 'long', year: 'numeric' })}
      </h4>

      <button
        onClick={() => {
          navigateMonth('next');
          console.log("navigateMonth('next');");
          if (onMonthChange !== undefined) {
            onMonthChange(calendarActiveMonth)
          }
        }}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <ChevronRight className="w-5 h-5 text-gray-600" />
      </button>
    </div>


    <div className="mb-6">
      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1">
        {getDaysInMonth(calendarActiveMonth).map((date, index) => {
          if (!date) {
            return <div key={index} className="h-12"></div>;
          }

          // console.log("date:", date, normalizeDateToYYYYMMDD(date), new Date());

          const dateString = formatDateString(date);
          // const availability = getAvailabilitiesForDate(date);
          const availabilitiesForDate = getAvailabilitiesForDate(date);
          // console.log("availability", availability);
          const hasAvailability = availabilitiesForDate.length > 0 && availabilitiesForDate.some(slot => slot.availabilityCount > 0);
          // const hasAvailability = true;
          const isSelected = selectedDate === dateString;
          const isToday = dateString === new Date().toISOString().split('T')[0];

          return (
            <button
              key={dateString}
              onClick={() =>
                hasAvailability
                  ?
                  // handleDateClick(dateString) 
                  // onDateClick(dateString, availability[0])
                  onDateClick(dateString, availabilitiesForDate[0])
                  :
                  null}
              disabled={!hasAvailability}
              className={`
                  h-12 rounded-lg text-sm font-medium transition-all duration-200 relative ${hasAvailability ? 'cursor-pointer' : ''}
                  ${hasAvailability
                  ? isSelected
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-green-50 text-green-800 hover:bg-green-100 border border-green-200'
                  : 'text-gray-300 cursor-not-allowed'
                }
                  ${isToday && !isSelected ? 'ring-2 ring-blue-300' : ''}
                `}
            >
              {date.getDate()}
              {hasAvailability && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>

  </div>
}