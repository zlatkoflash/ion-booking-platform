'use client';

import { AlertCircle, MapPin, Users } from "lucide-react";
import { IGridHomeToursItem } from "../panels/GridHomeToursItem"
import Image from "next/image";

export interface IExperiencesForToursPage {
  tours: IGridHomeToursItem[],
  ok: boolean,
  error: any
}


import placeholder from './../../assets/images/placeholder.png';
import Link from "next/link";
import ButtonViewTour from "../buttons/ButtonViewTour";
import { GetBokunConstantsAsGoodText } from "@/utils/formats";
// import { BokunSearch } from "@/utils/bokun";

export default function ToursForToursPage(
  data: IExperiencesForToursPage
) {

  // const error = "Error is there";


  return <>

    {
      // 1 === 1 ||
      !data.ok && (
        <div className="max-w-2xl mx-auto mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-yellow-600 mr-3" />
            <div>
              <div className="font-semibold text-yellow-800">Using Demo Data</div>
              <div className="text-sm text-yellow-700">
                Bokun API: {data.error}
              </div>
            </div>
          </div>
        </div>
      )}

    {data.tours === undefined || data.tours.length === 0 ? (
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
        {data.tours.map((tour: IGridHomeToursItem, key: number) => {
          return <div
            key={`tour-item-${key}-${tour.tour.id}`}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="relative">
              {/*<img
                src={Array.isArray(tour.images_url) ? tour.images_url[0] : tour.images_url || 'https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=800'}
                alt={tour.title}
                className="w-full h-48 object-cover"
              />*/}
              <Image
                src={tour.tour.image !== "" ? tour.tour.image : placeholder}
                width={660}
                height={660}
                loading="eager"
                alt={tour.tour.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4">
                {
                  tour.tour.tags.length > 0 ?
                    tour.tour.tags.map((tag, index) => (
                      <Link
                        href={`/Tours/${tag}`}
                        key={index}
                        className="inline-block bg-white bg-opacity-90 text-gray-800 text-xs px-2 py-1 rounded-full mr-1 mb-1 font-medium"
                      >
                        {GetBokunConstantsAsGoodText(tag)}
                      </Link>
                    ))
                    :
                    <></>
                }
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                {tour.tour.name}
              </h2>

              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">{tour.tour.location}</span>
              </div>

              {
                // tour.vendor
                1 === 1
                && (
                  <div className="flex items-center text-gray-500 mb-3">
                    <Users className="w-4 h-4 mr-2" />
                    <span className="text-sm">by {tour.tour.vendor.title}</span>
                  </div>
                )}

              <div className="text-gray-600 text-sm mb-4 line-clamp-3">
                <div dangerouslySetInnerHTML={{ __html: tour.tour.descirption.summary }} />
              </div>

              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-green-600">
                  €{typeof tour.tour.price === 'number' ? tour.tour.price.toFixed(2) : '49.99'}
                </div>
                {/*<button
                  onClick={() => {
                    window.location.href = `/tour/${tour.tour.id}`
                  }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer hover:opacity-70"
                >
                  View Details
                </button>*/}
                <ButtonViewTour style="for-tours-page" tour={tour.tour} />
              </div>
            </div>
          </div>
        })}
      </div>
    )}

  </>
}