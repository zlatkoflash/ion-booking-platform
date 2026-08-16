"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import GalleryTour, { GalleryLightbox } from "../galleries/GalleryTour";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export default function ZPicture(
  {
    pictureUrl,
    type = "default-rounded",
    alt = "Picture",
    className = "",
    onClick,
    width = 800,
    height = 800,
    paralaxEffect = "none"
  }
    :
    {
      pictureUrl: string | StaticImport,
      type?: 'default-rounded' | "contain" | "for-auth-form",
      alt?: string,
      className?: string,
      onClick?: () => void,
      width?: number,
      height?: number,
      onClickShowModal?: boolean,
      paralaxEffect?: "none" | "vertical-up" | "vertical-up-when-top-is-minus",
    }) {

  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Existing effect for "vertical-up" (untouched)
  useEffect(() => {
    if (paralaxEffect !== "vertical-up") return;

    let isVisible = false;

    const calculateScale = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const screenHalf = window.innerHeight / 2;

      if (rect.top <= screenHalf) {
        const scrollDistance = screenHalf - rect.top;
        let calculatedScale = 1 + (scrollDistance * 0.0002);

        if (calculatedScale > 2) calculatedScale = 2;
        setScale(calculatedScale);
      } else {
        setScale(1);
      }
    };

    const handleScroll = () => {
      if (!isVisible) return;
      calculateScale();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          calculateScale();
        }
      },
      { threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
      calculateScale();
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [paralaxEffect]);

  // New effect for "vertical-up-when-top-is-minus" (triggers when top goes into negative scroll position)
  useEffect(() => {
    if (paralaxEffect !== "vertical-up-when-top-is-minus") return;

    let isVisible = false;

    const calculateScale = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const triggerPoint = 0; // Top of the viewport

      if (rect.top <= triggerPoint) {
        const scrollDistance = triggerPoint - rect.top;
        let calculatedScale = 1 + (scrollDistance * 0.0002);

        if (calculatedScale > 2) calculatedScale = 2;
        setScale(calculatedScale);
      } else {
        setScale(1);
      }
    };

    const handleScroll = () => {
      if (!isVisible) return;
      calculateScale();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          calculateScale();
        }
      },
      { threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
      calculateScale();
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [paralaxEffect]);

  let styleForEffect: any = {};

  if (paralaxEffect !== "none") {
    styleForEffect = {
      transform: `scale(${scale})`,
      transition: 'transform 0.05s ease-out'
    };
  }

  return (
    <div
      ref={containerRef}
      className={`component z-picture ${type} ${className} ${onClick !== undefined ? "cursor-pointer" : ""}`}
      // style={{ overflow: paralaxEffect === "none" ? "visible" : 'hidden' }}
      onClick={() => {
        onClick?.();
      }}
    >
      <Image
        src={pictureUrl}
        alt={alt || "Picture"}
        width={width || 800}
        height={height || 800}
        style={paralaxEffect !== "none" ? styleForEffect : {}}
      />
    </div>
  );
}