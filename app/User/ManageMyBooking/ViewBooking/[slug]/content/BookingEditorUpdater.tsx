"use client";

import { useState } from "react";
import { useBookingSingleItem } from "../BookingProvider";

export default function BookingEditorUpdater() {

  const { bokunBooking } = useBookingSingleItem();
  console.log("bokunBooking:", bokunBooking);

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="mb-8 p-6 border rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Adjust Participant Counts</h2>
      <div className="grid grid-cols-2 gap-8 border-b pb-4 mb-4">


        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">Adults ({12.00} usd/pax)</label>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                // handleCountChange('adults', -1)
                console.log("handleCountChange('adults', -1)");
              }}
              disabled={
                // counts.adults <= 0 || currentStatus === 'CANCELED'
                false
              }
              className="p-3 border rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg>
            </button>
            <span className="w-12 text-center text-3xl font-extrabold text-indigo-600">{10}</span>
            <button
              onClick={() => {
                // handleCountChange('adults', 1)
                console.log("handleCountChange('adults', 1)");
              }}
              disabled={
                false
              }
              className="p-3 border rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between w-full  pb-4 bg-white border-b mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Current Net:</span>
          <span className="text-xl font-medium text-slate-600">$450.00</span>
        </div>

        <div className="text-slate-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
          </svg>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-500">Final Net:</span>
          <span className="text-2xl font-bold text-blue-700">$600.00</span>
        </div>
      </div>


      <div className="">
        <button
          onClick={() => { }}
          type="button"
          // disabled={currentStatus === 'CANCELED'}
          className={`w-full py-3 font-bold rounded-lg shadow-md transition duration-150 ${isLoading
            ? 'cursor-default opacity-50 disabled ' : 'cursor-pointer'} 
            ${isLoading
              // bookingDB.status === 'CANCELLED'
              ? 'bg-blue-600 text-white cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          disabled={isLoading}
        >
          {
            !isLoading
              ? 'Updated Booking' : 'Booking is updating...'
          }
        </button>

      </div>



    </div>
  );
}