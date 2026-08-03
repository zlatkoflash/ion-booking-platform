"use client";

import { useEffect, useState } from "react";
import ButtonCircleArrow from "../buttons/ButtonCircleArrow";
import type { Swiper as SwiperType } from "swiper";

interface ButtonsCirclesNavigationProps {
  swiperInstance: SwiperType | null;
  className?: string
}

export default function ButtonsCirclesNavigation({ swiperInstance, className = "" }: ButtonsCirclesNavigationProps) {
  // 1. Initialize boundary states
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (!swiperInstance) return;

    // 2. Define a handler to sync the instance boundaries with local state
    const handleSlideChange = () => {
      setIsBeginning(swiperInstance.isBeginning);
      setIsEnd(swiperInstance.isEnd);
    };

    // Run once on mount/initialization to catch the initial state
    handleSlideChange();

    // 3. Attach listeners to Swiper events
    swiperInstance.on("slideChange", handleSlideChange);
    swiperInstance.on("update", handleSlideChange); // Catch updates if slides are added dynamically

    // 4. Clean up listeners when component unmounts
    return () => {
      swiperInstance.off("slideChange", handleSlideChange);
      swiperInstance.off("update", handleSlideChange);
    };
  }, [swiperInstance]);

  return (
    <div className={`component buttons-circles-slider-navigation ${className}`}>
      <ButtonCircleArrow
        orientation="orientation-left"
        disabled={isBeginning} // Disable if at the first slide
        onClick={() => {
          swiperInstance?.slidePrev();
        }}
      />
      <ButtonCircleArrow
        disabled={isEnd} // Disable if at the last slide
        onClick={() => {
          swiperInstance?.slideNext();
        }}
      />
    </div>
  );
}