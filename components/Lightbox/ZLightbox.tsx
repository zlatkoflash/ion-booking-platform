'use client'

import React, { useState, useCallback, useEffect } from 'react';

// Define the shape for an individual image
export interface ZLBImage {
  src: string;
  alt: string;
}

// Define the props for the Lightbox component
interface LightboxProps {
  images: ZLBImage[];
  onClose: () => void;
  initialIndex?: number;
}

/**
 * The Lightbox component displays an array of images in a full-screen modal
 * with navigation controls.
 */
export const Lightbox: React.FC<LightboxProps> = ({ images, onClose, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Guard clause for safety, though the parent App should ensure images exist
  if (images.length === 0) return null;

  const showNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const showPrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  const currentZLBImage = images[currentIndex];
  const hasMultipleZLBImages = images.length > 1;

  // ---------------------------------------------
  // Keyboard Navigation Effect
  // ---------------------------------------------
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (hasMultipleZLBImages && event.key === 'ArrowRight') {
        showNext();
      } else if (hasMultipleZLBImages && event.key === 'ArrowLeft') {
        showPrev();
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [onClose, showNext, showPrev, hasMultipleZLBImages]);

  // ---------------------------------------------
  // Render
  // ---------------------------------------------
  return (
    // Overlay: Fixed, dark backdrop
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-90 transition-opacity duration-300"
      onClick={onClose} // Close on backdrop click
    >
      {/* Content Container: Center the image and controls */}
      <div
        className="relative max-w-[95vw] max-h-[95vh] flex flex-col justify-center items-center"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
      >
        {/* ZLBImage Display */}
        <img
          src={currentZLBImage.src}
          alt={currentZLBImage.alt}
          className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
        />

        {/* Caption */}
        <p className="mt-4 text-white text-lg font-medium select-none">
          {currentZLBImage.alt} ({currentIndex + 1} of {images.length})
        </p>

        {/* Close Button (X) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-8 md:right-8 p-3 text-white text-3xl font-light leading-none bg-gray-800 bg-opacity-50 hover:bg-opacity-80 rounded-full transition duration-150 z-10"
          aria-label="Close Lightbox (Escape)"
        >
          &times;
        </button>

        {/* Navigation Arrows (Left/Right) - Shown only for multiple images */}
        {hasMultipleZLBImages && (
          <>
            {/* Left Arrow */}
            <button
              onClick={showPrev}
              className="absolute left-0 md:-left-16 top-1/2 transform -translate-y-1/2 p-4 text-white text-4xl bg-transparent md:bg-gray-800 md:bg-opacity-50 hover:bg-opacity-80 rounded-full transition duration-150 z-10 opacity-70 hover:opacity-100"
              aria-label="Previous ZLBImage (Arrow Left)"
            >
              &larr;
            </button>
            {/* Right Arrow */}
            <button
              onClick={showNext}
              className="absolute right-0 md:-right-16 top-1/2 transform -translate-y-1/2 p-4 text-white text-4xl bg-transparent md:bg-gray-800 md:bg-opacity-50 hover:bg-opacity-80 rounded-full transition duration-150 z-10 opacity-70 hover:opacity-100"
              aria-label="Next ZLBImage (Arrow Right)"
            >
              &rarr;
            </button>
          </>
        )}
      </div>
    </div>
  );
};