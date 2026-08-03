"use client";

import { Col, Container, Row } from "react-bootstrap";
import SearchSlotsForm, { performSearch } from "../SearchSlotsForm/SearchSlotsForm";
import SearchSlotsFilters from "../SearchSlotsForm/SearchSlotsFilters";
import HIdrateSearchingPanel from "../SearchSlotsForm/HIdrateSearchingPanel";
import { useRouter } from "@/translations-engine/routing";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useRef, useState } from "react";
import { FiltersToursModal, SearchButtonForMobile } from "./HeroHome";

export default function HeroSearchExperiences() {

  const router = useRouter();
  // const whoDropdownRef = useRef<HTMLDivElement>(null);
  const filters = useAppSelector((state) => state.booking.filters);

  const isFirstRender = useRef(true);
  // Local state to hold the "settled" filters that are safe to search with
  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  // EFFECT 1: Handle the typing delay (Debounce)
  useEffect(() => {
    if (isFirstRender.current) {
      return; // Don't setup timers on initial mount
    }

    // Set a timer to update our debounced state after 500ms of no changes
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 500); // 500 milliseconds pause threshold

    // CRITICAL: Clean up the timer if the user types another letter before 500ms is up
    return () => clearTimeout(timer);
  }, [
    filters.city,
    filters.category,
    filters.price_range,
    filters.duration,
    filters.availability,
    JSON.stringify(filters.selectedDates),
    JSON.stringify(filters.participantsCount)
  ]);


  // EFFECT 2: Execute the actual search only when debounced filters change AND differ from current URL
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // --- PREVENT DUPLICATE REloads ---
    // Read the current live URL parameters
    const currentParams = new URLSearchParams(window.location.search);

    // Helper to safely parse JSON from the URL for deep comparison
    const getUrlJsonParse = (key: string, fallback: any) => {
      const raw = currentParams.get(key);
      if (!raw) return fallback;
      try {
        return JSON.parse(decodeURIComponent(raw));
      } catch {
        return fallback;
      }
    };

    // Parse the complex objects from the current URL
    const urlSelectedDates = getUrlJsonParse("selectedDates", []);
    const urlParticipants = getUrlJsonParse("participantsCount", { adults: 0, children: 0 });

    // Check if the current debounced filter state already matches the URL
    const matchesUrl =
      (currentParams.get("city") || "") === (debouncedFilters.city || "") &&
      (currentParams.get("category") || "") === (debouncedFilters.category || "") &&
      (currentParams.get("price_range") || "") === (debouncedFilters.price_range || "") &&
      (currentParams.get("duration") || "") === (debouncedFilters.duration || "") &&
      (currentParams.get("availability") || "") === (debouncedFilters.availability || "")
      &&
      // Compare arrays/objects by stringifying them consistently
      JSON.stringify(urlSelectedDates) === JSON.stringify(debouncedFilters.selectedDates || []) &&
      JSON.stringify(urlParticipants) === JSON.stringify(debouncedFilters.participantsCount || { adults: 0, children: 0 });

    // If they match perfectly, the change came from URL hydration, so do NOT trigger router.push
    if (matchesUrl) {
      console.log("Filters match current URL. Skipping redundant search.");
      return;
    }

    console.log("Executing search with debounced filters:", debouncedFilters);
    performSearch(router, debouncedFilters);

  }, [router, debouncedFilters]);

  return <>
    <HIdrateSearchingPanel />
    <div className="component search-experiences-hero">
      <Container>
        <Row>
          <Col>
            {
              // here on each change the filter panel should be updated immediately, but only after the server search will be implemented
            }
            <SearchSlotsForm type="search-experiences-hero" AfterChangeAnyFilter={() => {

            }} />
            <SearchButtonForMobile />
            <SearchSlotsFilters onAfterChangeAnyFilter={() => { }} showOnMobile={true} />
          </Col>
        </Row>
      </Container>
    </div>
    <FiltersToursModal />
  </>
}