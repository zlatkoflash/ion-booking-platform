'use client';

import { useCurrencyFormatter } from "@/utils/formats";
import { Calendar, MapPin, Star, Users } from "lucide-react";

import placeholder from './../../assets/images/placeholder.png';
import Image from "next/image";
import { IExperienceZ } from "@/interface/Interface";
import ButtonViewTour from "../buttons/ButtonViewTour";
import { IDBTour } from "@/utils/interface/interfaceDatabase";
import Link from "next/link";
import { IThumbanilData } from "@/utils/interface/interfaceFrontEnd";


// export interface IExperience { }


export default function GridHomeToursItemV2({ tourData }: {
  tourData: IThumbanilData
}) {


  const {
    tour
  } = tourData;

  // console.log("data.tour for the thumbnail:", data.tour);

  return <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
    <div className="relative">
      {/*<img
        src={data.tour.image === "" ? placeholder : data.tour.image}
        alt={data.tour.name}
        className="w-full h-64 object-cover"
      />*/}
      <Image src={tour.cover === "" ? placeholder : tour.cover}
        alt={tour.title as string}
        className="w-full h-64 object-cover" width={660} height={660} />


      <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center space-x-1">
        <Star className="w-4 h-4 text-yellow-500 fill-current" />
        <span className="text-sm font-semibold">{666}</span>
      </div>
    </div>

    <div className="p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-2">{tour.title}</h3>

      <div className="flex items-center text-gray-600 mb-3">
        <MapPin className="w-4 h-4 mr-2" />
        <span>{tour.location.city}</span>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{tour.duration_label}</span>
        </div>
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-1" />
          <span>{15} spots left</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold text-blue-600">{
          useCurrencyFormatter(tour.price, { currency: "EUR" })}</span>
        {/*<button
          onClick={() => {


          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-300 cursor-pointer">
          View Details
        </button>*/}
        {
          // <ButtonViewTour style="for-home-page" tour={data.tour} />
        }
        <Link className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer hover:opacity-70" href={`/TourView/${tour.slug && tour.slug !== "" ? tour.slug : tour.id}`}>
          View Details
        </Link>
      </div>
    </div>
  </div>
}