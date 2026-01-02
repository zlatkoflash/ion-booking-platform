import React, { useState } from 'react';
// import { info, x } from 'lucide-react'; // Or use SVGs below

export const AlertInfoMessage = ({ message }: { message: string }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      className="flex items-center p-4 mb-4 text-blue-800 rounded-lg bg-blue-50 border border-blue-200 shadow-sm"
      role="alert"
    >
      {/* Info Icon */}
      <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>

      <span className="sr-only">Info</span>

      {/* Message Text */}
      <div className="ml-3 text-sm font-medium">
        {message || "Default info message: 4 refunds successful, 2 pending."}
      </div>

      {/* Close Button */}
      <button
        type="button"
        onClick={() => setIsVisible(false)}
        className="ml-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-100 inline-flex items-center justify-center h-8 w-8"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
        </svg>
      </button>
    </div>
  );
};