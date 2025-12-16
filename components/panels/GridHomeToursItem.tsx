'use client';

import { useCurrencyFormatter } from "@/utils/formats";
import { Calendar, MapPin, Star, Users } from "lucide-react";

import placeholder from './../../assets/images/placeholder.png';
import Image from "next/image";
import { IExperienceZ } from "@/interface/Interface";
import ButtonViewTour from "../buttons/ButtonViewTour";


// export interface IExperience { }

export interface IGridHomeToursItem {
  /*tour: {
    id: string,
    name: string,
    location: string,
    duration: string,
    price: number,
    rating: number,
    image: any,
    participants: number,
    tags: string[],
    vendor: {
      id: number,
      title: string
    },
    descirption: {
      excerpt: string,
      summary: string
    }
  }*/
  tour: IExperienceZ
}

export default function GridHomeToursItem(data: IGridHomeToursItem) {

  console.log("data.tour for the thumbnail:", data.tour);

  return <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
    <div className="relative">
      {/*<img
        src={data.tour.image === "" ? placeholder : data.tour.image}
        alt={data.tour.name}
        className="w-full h-64 object-cover"
      />*/}
      <Image src={data.tour.image === "" ? placeholder : data.tour.image}
        alt={data.tour.name}
        className="w-full h-64 object-cover" width={660} height={660} />


      <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center space-x-1">
        <Star className="w-4 h-4 text-yellow-500 fill-current" />
        <span className="text-sm font-semibold">{data.tour.rating}</span>
      </div>
    </div>

    <div className="p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-2">{data.tour.name}</h3>

      <div className="flex items-center text-gray-600 mb-3">
        <MapPin className="w-4 h-4 mr-2" />
        <span>{data.tour.location}</span>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{data.tour.duration}</span>
        </div>
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-1" />
          <span>{data.tour.participants} spots left</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold text-blue-600">{
          useCurrencyFormatter(data.tour.price, { currency: "EUR" })}</span>
        {/*<button
          onClick={() => {


          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-300 cursor-pointer">
          View Details
        </button>*/}
        <ButtonViewTour style="for-home-page" tour={data.tour} />
      </div>
    </div>
  </div>
}