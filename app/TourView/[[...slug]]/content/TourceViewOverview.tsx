"use client";

import { IExperienceCompleteZ } from "@/interface/Interface"
import { GetBokunConstantsAsGoodText } from "@/utils/formats";
import { Calendar, Clock, Shield, Users } from "lucide-react"
import Link from "next/link";
import { useBookingEditor } from "../BookingEditorProvider";
import EditorTableRefunds from "./editor/EditorTableRefunds";
import EditorTablePayments from "./editor/EditorTablePayments";

export interface IExperienceceViewOverview {
  experience: IExperienceCompleteZ
}

export default function TourceViewOverview(data: IExperienceceViewOverview) {
  console.log("TourceViewOverview:", data);

  const {
    clientType
  } = useBookingEditor();

  return <>
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      {
        clientType === "booking-editor" && <h2 className="text-3xl font-bold text-gray-800 mb-6">WIT-3.0 Booking Editor</h2>
      }
      {
        clientType !== "booking-editor" && <h2 className="text-3xl font-bold text-gray-800 mb-6">Overview</h2>
      }

      <div className="text-gray-600 text-lg leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: `${data.experience.description || data.experience.excerpt || 'Discover this amazing experience'}` }} />

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="flex items-center">
          <Calendar className="w-6 h-6 text-blue-600 mr-3" />
          <div>
            <div className="font-semibold text-gray-800">Duration</div>
            <div className="text-gray-600">{data.experience.durationText}</div>
          </div>
        </div>
        <div className="flex items-center">
          <Users className="w-6 h-6 text-blue-600 mr-3" />
          <div>
            <div className="font-semibold text-gray-800">Group Size</div>
            <div className="text-gray-600">Max 15 people</div>
          </div>
        </div>
        <div className="flex items-center">
          <Clock className="w-6 h-6 text-blue-600 mr-3" />
          <div>
            <div className="font-semibold text-gray-800">Start Time</div>
            <div className="text-gray-600">Multiple times</div>
          </div>
        </div>
      </div>

      {data.experience.activityCategories && data.experience.activityCategories.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {data.experience.activityCategories.map((category, index) => (
              <Link
                href={`/Tours/${category}`}
                key={index}
                className="inline-block bg-white bg-opacity-90 text-gray-800 text-xs px-2 py-1 rounded-full mr-1 mb-1 font-medium"
              >
                <span
                  key={`category-index-${index}`}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {GetBokunConstantsAsGoodText(category)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {
        data.experience.inclusions && data.experience.inclusions.length > 0
          ?
          <>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">What's Included</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {data.experience.inclusions.map((item, index) => (
                <div key={index} className="flex items-center">
                  <Shield className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">{GetBokunConstantsAsGoodText(item)}</span>
                </div>
              ))}
            </div>
          </>
          :
          <></>
      }


      {
        clientType === "booking-editor" && (
          <>
            <EditorTablePayments />
            <EditorTableRefunds />
          </>
        )
      }

    </div>
  </>
}