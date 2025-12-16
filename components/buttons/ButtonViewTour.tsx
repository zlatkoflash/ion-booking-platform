'use client';

import { IExperienceZ } from "@/interface/Interface"
import { BokunGetExperienceById, IBokunGetExperienceById } from "@/utils/bokun";
import { useState } from "react";
import { redirect } from 'next/navigation';
import { ArrowLeft } from "lucide-react";
// import { IGridHomeToursItem } from "../panels/GridHomeToursItem"


export interface IButtonViewTour {
  tour?: IExperienceZ,
  tourId?: string,
  style: 'for-home-page' | 'for-tours-page' | 'for-header'
}

// A simple SVG spinner component using Tailwind CSS for animation
const ButtonViewTourSpinner = ({
  spinnerClassName
}
  :
  {
    spinnerClassName?: string
  }) => {
  return (
    <svg
      className={`animate-spin h-5 w-5 ${spinnerClassName}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )
};

export default function ButtonViewTour(data: IButtonViewTour) {

  const [loading, set_loading] = useState<boolean>(false);

  const ViewTheTour = async () => {

    if (data.tourId === undefined && data.tour === undefined) return;

    set_loading(true);

    const dataForBokunProduct: IBokunGetExperienceById = await BokunGetExperienceById(
      data.tourId ? data.tourId : data?.tour?.id
    );
    console.log("dataForBokunProduct 2:", dataForBokunProduct);
    // return;
    if (dataForBokunProduct.experience !== undefined) {
      if (dataForBokunProduct.experience.slug === null) {
        console.log("Slug don't exist");
        redirect(`/TourView/${dataForBokunProduct.experience.id}`)
      }
      else {
        console.log("Slug exist");
        redirect(`/TourView/${dataForBokunProduct.experience.slug}`)
      }
    }
    else { }


    set_loading(false);

  }

  return <div className={`relative ${loading ? 'pointer-events-none' : ''}`}>

    {
      (() => {
        if (data.style === 'for-home-page') return <>
          <button
            disabled={loading}
            onClick={() => {
              ViewTheTour()
            }}
            className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-300 cursor-pointer ${loading ? 'opacity-50' : ''}`}>
            View Details
          </button>
        </>
        else if (data.style === 'for-header') return <>
          <button
            onClick={() => {
              ViewTheTour()
            }}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Tour
          </button>
        </>
        else return <>
          <button
            disabled={loading}
            onClick={() => {
              // window.location.href = `/tour/${tour.tour.id}`
              ViewTheTour()
            }}
            className={`bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer hover:opacity-70 ${loading ? 'opacity-50' : ''}`}
          >
            View Details
          </button>
        </>
      })()
    }
    {/*<button
      onClick={() => {
        window.location.href = `/tour/${data.tour.id}`
      }}
      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer hover:opacity-70"
    >
      View Details
    </button>*/}

    {
      loading ?
        <ButtonViewTourSpinner spinnerClassName="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        :
        <></>
    }

  </div>
}