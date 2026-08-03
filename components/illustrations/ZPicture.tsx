"use client";

import Image from "next/image";
import { useState } from "react";
import GalleryTour, { GalleryLightbox } from "../galleries/GalleryTour";

export default function ZPicture(
  {
    pictureUrl, type = "default-rounded", alt = "Picture", className = "", onClick, width = 800, height = 800,
    // onClickShowModal = false // not good, adding here gallery lightbox do unlimited recursion because gallery have ZPicture too and it is error
  }
    :
    {
      pictureUrl: string, type?: 'default-rounded' | "contain" | "for-auth-form", alt?: string, className?: string, onClick?: () => void, width?: number, height?: number,
      onClickShowModal?: boolean
    }) {

  const [showModal, setShowModal] = useState(false)

  return <>
    <div className={`component z-picture ${type} ${className} ${onClick !== undefined ? "cursor-pointer" : ""} `} onClick={() => {
      onClick?.();
    }}>
      <Image src={pictureUrl} alt={alt || "Picture"} width={width || 800} height={height || 800} />
    </div>



  </>;
}