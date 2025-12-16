'use client'

import { Lightbox, ZLBImage } from "@/components/Lightbox/ZLightbox";
import { IExperienceCompleteZ } from "@/interface/Interface"
import Image from "next/image";
import { useState } from "react";

export interface IExperienceViewGallery {
  experience: IExperienceCompleteZ
}

export default function TourViewGallery(data: IExperienceViewGallery) {

  const [lightBoxOpen, set_lightBoxOpen] = useState<boolean>(false)
  const __images = (): ZLBImage[] => {
    let images: ZLBImage[] = [];
    data.experience.photos.slice(0, 6).forEach(c => {
      images.push({
        src: c.originalUrl,
        alt: c.description || data.experience.title
      })
    });
    return images;
  }

  if (!data.experience.photos || data.experience.photos.length === 0) return null;
  return <>
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Photo Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.experience.photos.slice(0, 6).map((photo, index) => (
          <div key={index} className="aspect-video rounded-lg overflow-hidden" onClick={() => {
            set_lightBoxOpen(true)
          }}>
            <Image
              src={photo.originalUrl}
              alt={`${photo.description || data.experience.title}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              width={300} height={200}
            />
          </div>
        ))}
      </div>
    </div>
    {
      lightBoxOpen && (<Lightbox

        images={__images()} onClose={() => {
          set_lightBoxOpen(false)
        }} />)
    }

  </>
}