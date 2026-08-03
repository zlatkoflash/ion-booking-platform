"use client";

import { useEffect } from "react";

export default function ScrollListener() {
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        document.body.classList.add("is-scrolled");
      } else {
        document.body.classList.remove("is-scrolled");
      }
    };

    // passive: true keeps scrolling performance perfectly optimized
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial execution in case the page reloads already scrolled down
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null; // This component renders nothing visually
}
