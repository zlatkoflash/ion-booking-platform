'use client';

// import { IExperienceCompleteZ } from "@/interface/Interface"
import { MapPin, Star, Users } from "lucide-react"

/*export interface IExperienceHero {
  experience: IExperienceCompleteZ
}*/

import heroPlaceholder from './../../../../assets/images/traveling-placeholder.png';
import Image from "next/image";
import { IDBTour } from "@/utils/interface/interfaceDatabase";

export default function TourHeroV2({
  tour
}: {
  tour: IDBTour
}) {

  // const heroImage = tour.keyPhoto?.originalUrl || tour.photos?.[0]?.fullSizeUrl || 'https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=1200';

  // const heroImage = 'https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=1200';

  // if(data.experience===undefined)


  return <div className="relative h-96 md:h-[500px]">
    <Image
      src={tour.cover.length === 0 ? heroPlaceholder : tour.cover}
      width={1920} height={500}
      alt={`${tour.title}`}
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black opacity-30"></div>
    <div className="absolute bottom-8 left-8 text-white">
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center bg-white bg-opacity-20 rounded-full px-3 py-1 text-black">
          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
          <span className="font-semibold">4.8</span>
          <span className="text-sm ml-1">(142 reviews)</span>
        </div>
      </div>
      <h1 className="text-4xl md:text-6xl font-bold mb-2">{tour.title}</h1>
      <div className="flex items-center text-xl">
        <MapPin className="w-5 h-5 mr-2" />
        <span>{tour.location.city}, {tour.location.country}</span>
      </div>

      {
        <div className="flex items-center text-lg mt-2 opacity-90">
          <Users className="w-4 h-4 mr-2" />
          <span>by {tour.vendor.title}</span>
        </div>
      }
    </div>
  </div>
}