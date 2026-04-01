'use client';

import { AlertCircle, MapPin, Users } from "lucide-react";
import { IGridHomeToursItem } from "../panels/GridHomeToursItem"
import Image from "next/image";



import placeholder from './../../assets/images/placeholder.png';
import Link from "next/link";
import ButtonViewTour from "../buttons/ButtonViewTour";
import { GetBokunConstantsAsGoodText } from "@/utils/formats";
import { IDBTour } from "@/utils/interface/interfaceDatabase";
// import { BokunSearch } from "@/utils/bokun";

export default function ToursForToursPageV2(
  { ToursData }: {
    ToursData: {
      tour: IDBTour
    }[]
  }
) {

  // const error = "Error is there";


  return <>


    {ToursData === undefined || ToursData.length === 0 ? (
      <div className="text-center py-12">
        <div className="space-y-4">
          <p className="text-gray-500 text-lg">No tours found</p>
          <button
            onClick={(e) => {
              console.log("Add function for fetching the tours again...");
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-colors cursor-pointer"
          >
            Try Again
          </button>
        </div>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {ToursData.map((tourData: { tour: IDBTour }, key: number) => {

          // tour.tour.


          return <div
            key={`tour-item-${key}-${tourData.tour.id}`}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="relative">
              <Image
                src={tourData.tour.cover !== "" ? tourData.tour.cover : placeholder}
                width={660}
                height={660}
                loading="eager"
                alt={tourData.tour.title as string}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4">
                {
                  tourData.tour.categories !== null ?
                    tourData.tour.categories?.map((category, index) => (
                      <Link
                        href={`/Tours/${category}`}
                        key={index}
                        className="inline-block bg-white bg-opacity-90 text-gray-800 text-xs px-2 py-1 rounded-full mr-1 mb-1 font-medium"
                      >
                        {GetBokunConstantsAsGoodText(category)}
                      </Link>
                    ))
                    :
                    <></>
                }
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                {tourData.tour.title}
              </h2>

              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">{tourData.tour.location.city}</span>
              </div>

              {
                <div className="flex items-center text-gray-500 mb-3">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="text-sm">by {tourData.tour.vendor.title}</span>
                </div>
              }

              <div className="text-gray-600 text-sm mb-4 line-clamp-3">
                <div dangerouslySetInnerHTML={{ __html: tourData.tour.description as string }} />
              </div>

              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-green-600">
                  €{tourData.tour.price?.toFixed(2)}
                </div>
                {/*<ButtonViewTour style="for-tours-page" tour={tourData.tour} />*/}
                <Link className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer hover:opacity-70" href={`/TourView/${tourData.tour.slug && tourData.tour.slug !== "" ? tourData.tour.slug : tourData.tour.id}`}>
                  View Details
                </Link>
              </div>
            </div>
          </div>
        })}
      </div>
    )}

  </>
}