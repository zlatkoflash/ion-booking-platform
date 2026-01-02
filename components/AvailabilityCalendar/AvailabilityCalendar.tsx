'use client'

import React, { useState, useEffect, use } from 'react';
import {
  Calendar, Clock, Users, Euro, AlertCircle, Loader2,
  // ChevronLeft, ChevronRight
} from 'lucide-react';
import { formatDate, formatDateString, formatDateStringWithoutDashes, getMonthBoundaries, normalizeDateToYYYYMMDD } from '../../utils/dateUtils';
import ZCalendarWidget from './ZCalendarWidget';
// import { IBokunSlot } from '@/app/interface/interface';
import { BokunGetAvailabilitiesForExperience } from '@/utils/bokun';
import { IBokunAvailability } from '@/interface/Interface';
import AvailableTimes from './AvailableTimes';
import { useBookingSidebar } from '@/app/TourView/[[...slug]]/content/BookingSidebarProvider';
import { useBookingEditor } from '@/app/TourView/[[...slug]]/BookingEditorProvider';

/*export interface IBokunSlot {
  startTimeId: number;
  startTime: string;
  date: string;
  availabilityCount: number;
  rates: Array<{
    id: number;
    pricingCategoryIds: number[];
  }>;
  pricesByRate: Array<{
    activityRateId: number;
    pricePerCategoryUnit: Array<{
      id: number;
      amount: {
        amount: number;
        currency: string;
      };
    }>;
  }>;
}*/

interface AvailabilityCalendarProps {
  activityId: string;
  // onSlotSelect?: (slot: IBokunAvailability) => void;
}

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  activityId,
  // onSlotSelect,
}) => {

  const {
    clientType,
    bokunBookingForediting
  } = useBookingEditor();

  const {
    availablilitesForDateRange,
    setAvailablilitesForDateRange,
    selectedDate,
    setSelectedDate,

    selectedAvailability,
    setSelectedAvailability,
    setSelectedAvailabilityAndTheRate,
    availiabilityCount,

    calendarActiveMonth,
    set_calendarActiveMonth,
  } = useBookingSidebar();

  // const [slots, setSlots] = useState<IBokunAvailability[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<IBokunAvailability | null>(null);
  // const [currentMonth, setCurrentMonth] = useState(new Date());
  // const [selectedDate, setSelectedDate] = useState<string | null>(null);
  /**
   * Selected month for the calendar, 
   * used to filter the slots based on the selected month
   */
  // const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());

  /*useEffect(() => {
    fetchAvailability();
  }, [activityId]);*/

  useEffect(() => {
    console.log(`Loading slots using "fetchAvailability" for selectedMonth: ${calendarActiveMonth}`);
    fetchAvailability();
  }, [calendarActiveMonth])
  /**
   * Fetching all availablilities for the months for all days
   */
  const fetchAvailability = async () => {
    setLoading(true);
    setError(null);
    const monthBoundaries = getMonthBoundaries(calendarActiveMonth);
    try {
      const avaialbilitesData = await BokunGetAvailabilitiesForExperience(
        activityId,
        monthBoundaries.firstDate,
        monthBoundaries.lastDate
      );
      console.log("avaialbilitesData:", avaialbilitesData);
      // setSlots(avaialbilitesData.availabilities);
      setAvailablilitesForDateRange(avaialbilitesData.availabilities);
      if (clientType === "booking-editor") {
        // we need to check activity with this type of id: 4541791_20260126
        // 4541791 is the time id, 20260126 is the date
        const idForEditorAvailability = `${bokunBookingForediting?.activityBookings[0]?.startTimeId}_${formatDateStringWithoutDashes(new Date(bokunBookingForediting?.activityBookings[0]?.date as number))}`;
        console.log("avaialbilitesData.availabilities:", avaialbilitesData.availabilities);
        console.log("bokunBookingForediting?.activityBookings[0].activity.id:", bokunBookingForediting?.activityBookings[0]);

        console.log("idForEditorAvailability:", idForEditorAvailability);

        if (selectedAvailability.id === undefined) {

          console.log("Editor availability selecting...");

          const selectedAvailablilityFromEditor = avaialbilitesData.availabilities.find((availability) => availability.id === idForEditorAvailability);
          console.log("selectedAvailablilityFromEditor:", selectedAvailablilityFromEditor);
          if (selectedAvailablilityFromEditor !== null && selectedAvailablilityFromEditor !== undefined) {

            setSelectedAvailabilityAndTheRate(selectedAvailablilityFromEditor);
          }
        }
        // console.log("availability.id:", availability.id);
        /*const bookingEditor_selectedAvailability = avaialbilitesData.availabilities.find((availability) => availability.id === bokunBookingForediting?.activityBookings[0].activity.id);
        if (bookingEditor_selectedAvailability !== null && bookingEditor_selectedAvailability !== undefined) {
          setSelectedAvailability(bookingEditor_selectedAvailability);
        }*/
      }

    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }


  const handleAvailabilityClick = (availability: IBokunAvailability) => {
    if (
      // availability.availabilityCount <= 0
      availiabilityCount(availability) <= 0
    ) return;

    console.log('🎯 Slot selected:', availability);
    setSelectedAvailability(availability);
    // onSlotSelect && onSlotSelect(slot);
  };





  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg relative">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Select Date & Time</h3>

      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-yellow-600 mr-3" />
            <div>
              <div className="font-semibold text-yellow-800">Using Demo Data</div>
              <div className="text-sm text-yellow-700">
                Bokun API: {error}
              </div>
            </div>
          </div>
        </div>
      )}


      <ZCalendarWidget

        // slots={slots}
        // calendarActiveMonth={calendarActiveMonth}
        // set_calendarActiveMonth={set_calendarActiveMonth}
        availablilitesForDateRange={availablilitesForDateRange}
        selectedDate={selectedDate}
        onDateClick={(dateString, firstSlotOfTheDay) => {
          /**
           * the availability is the first 
           */
          console.log("dateString:", dateString);
          setSelectedSlot(firstSlotOfTheDay);
          setSelectedDate(dateString);
          // setSelectedMonth(new Date(dateString));
          // console.log();
        }}
      /*onMonthChange={(date) => {
        console.log("onMonthChange(date):", date);
        // setSelectedMonth(formatDateString(date));
        // setSelectedMonth(date);
        set_calendarActiveMonth(date);
        set_calendarActiveMonth(date);
      }}*/
      />

      {/* Time Slots for Selected Date */}
      {selectedDate && (
        <AvailableTimes
        // slots={slots} 
        // selectedDate={selectedDate} 
        // selectedSlot={selectedSlot}
        // handleAvailabilityClick={handleAvailabilityClick} 
        />
      )}
      {
        // slots.length === 0 && !loading && 
        availablilitesForDateRange.length === 0 && !loading &&
        (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No availability found for the selected period</p>
            <button
              onClick={() => {
                // fetchAvailability();
              }}
              className="mt-4 text-blue-600 hover:text-blue-700 font-semibold"
            >
              Try Again
            </button>
          </div>
        )}

      {selectedSlot && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <div className="font-semibold text-blue-800">
                Selected: {formatDate(normalizeDateToYYYYMMDD(selectedSlot.date)).weekday}, {formatDate(normalizeDateToYYYYMMDD(selectedSlot.date)).month} {formatDate(normalizeDateToYYYYMMDD(selectedSlot.date)).day}
              </div>
              <div className="text-sm text-blue-700">
                Time: {selectedSlot.startTime}
              </div>
              <div className="text-sm text-blue-700">
                {
                  // selectedSlot.availabilityCount
                  availiabilityCount(selectedSlot)
                } spots available
              </div>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div
          className="absolute inset-0 flex items-center justify-center z-50"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.5)' // White background, 50% opacity
          }}
        >

          {/* Inner DIV: The centered loading icon.
        - w-8 h-8 creates a small square.
        - border-4 gives it thickness.
        - border-solid makes it a solid line.
        - border-gray-500 sets the color.
        - border-t-transparent makes the top border transparent, creating the spinning effect.
        - animate-spin applies the rotation.
      */}
          <div
            className="w-8 h-8 border-4 border-solid border-gray-500 border-t-transparent rounded-full animate-spin"
          />

        </div>
      )}
    </div>
  );
};

export default AvailabilityCalendar;