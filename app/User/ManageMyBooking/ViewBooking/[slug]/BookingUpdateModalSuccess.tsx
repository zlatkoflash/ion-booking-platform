import { useBookingEditor } from '@/app/TourView/[[...slug]]/BookingEditorProvider';
import { RootState } from '@/libs/store';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const BookingUpdateModalSuccess = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [countdown, setCountdown] = useState(5);

  /*const {
    isModalSuccessOpen
  } = useBookingEditor();*/

  const bookingCalendarState = useSelector((state: RootState) => state.bookingCalendar);
  const isModalSuccessOpen = bookingCalendarState.editor.isModalSuccessOpen;

  useEffect(() => {
    if (!isModalSuccessOpen) return;

    // Countdown logic

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Auto-reload after 5 seconds
    const autoReload = setTimeout(() => {
      window.location.reload();
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(autoReload);
    };
  }, [isModalSuccessOpen]);

  if (!isModalSuccessOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 text-center shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Success Icon */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-900">Update Successful!</h2>
        <p className="mt-2 text-gray-600">
          The booking has been updated. This page will reload automatically in...
        </p>

        {/* Countdown Visual */}
        <div className="my-6 text-4xl font-extrabold text-indigo-600">
          {countdown}s
        </div>

        <button
          onClick={() => window.location.reload()}
          className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-indigo-700 active:bg-indigo-800 cursor-pointer"
        >
          Okay (Reload Now)
        </button>
      </div>
    </div>
  );
};

export default BookingUpdateModalSuccess;