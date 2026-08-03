"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setFilters } from "@/redux/booking/bookingSlice";
// Import your actual Redux action here (e.g., setFilters)
// import { setFilters } from "@/redux/slices/filterSlice";

export default function HIdrateSearchingPanel() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // 1. Extract string parameters directly
    const availability = searchParams.get("availability"); // "LUXURY"
    const category = searchParams.get("category");         // "LUXURY_AND_SPECIAL_OCCASIONS"
    const price_range = searchParams.get("price_range");   // "under-50"
    const duration = searchParams.get("duration");         // "1 hour and 30 minutes"
    const city = searchParams.get("city");                 // "Firenze"

    // 2. Safe parsing for JSON objects and arrays
    let selectedDates = [];
    const datesRaw = searchParams.get("selectedDates");
    if (datesRaw) {
      try {
        selectedDates = JSON.parse(decodeURIComponent(datesRaw)); // []
      } catch (e) {
        console.error("Failed to parse selectedDates from URL", e);
      }
    }

    let participantsCount = { adults: 0, children: 0 };
    const participantsRaw = searchParams.get("participantsCount");
    if (participantsRaw) {
      try {
        participantsCount = JSON.parse(decodeURIComponent(participantsRaw)); // { adults: 3, children: 4 }
      } catch (e) {
        console.error("Failed to parse participantsCount from URL", e);
      }
    }

    // 3. Assemble your state payload
    const urlFilters = {
      availability: availability || "",
      category: category || "",
      price_range: price_range || "",
      duration: duration || "",
      city: city || "",
      selectedDates: selectedDates || [],
      participantsCount: participantsCount || { adults: 0, children: 0 },
    };
    console.log("urlFilters:", urlFilters);

    dispatch(setFilters(urlFilters))

    // 4. Dispatch directly to Redux
    // dispatch(setFilters(urlFilters));
    console.log("Hydrating Redux Store with URL parameters:", urlFilters);

  }, [searchParams, dispatch]); // Triggers smoothly if the user changes the URL parameters

  return null; // This is a logic-only orchestrator component, it doesn't need markup
}