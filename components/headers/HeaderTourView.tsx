'use client'

import { ArrowLeft } from "lucide-react";
import { redirect } from 'next/navigation';

export default function HeaderTourView() {
  return < div className="bg-white shadow-sm border-b" >
    <div className="max-w-7xl mx-auto px-6 py-4">
      <button
        onClick={() => {
          // window.history.back()
          redirect('/Tours')
        }}
        className="flex items-center text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Tours
      </button>
    </div>
  </div >;
}