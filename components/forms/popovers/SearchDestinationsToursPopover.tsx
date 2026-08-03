"use client";

import ButtonDefault from "@/components/buttons/ButtonDefault";
import {
  setFilterCity,
  // setFilterSelectedTour 
} from "@/redux/booking/bookingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getApiData } from "@/utils/api";
import { IDBTour } from "@/utils/interface-database";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { OverlayTrigger, Popover, Form } from "react-bootstrap";

export default function SearchDestinationsToursPopover(
  { onChange }
    :
    {
      onChange?: () => void
    }
) {
  // const [searchTerm, setSearchTerm] = useState("");
  // const [selectedTour, setSelectedTour] = useState<IDBTour | null>(null)
  const [isOpen, setIsOpen] = useState(false);

  // const selectedTour = useAppSelector((state) => state.booking.filters.selectedTour);
  const filterSearchCity = useAppSelector((state) => state.booking.filters.city);


  const tForms = useTranslations("Forms")

  const dispatch = useAppDispatch();

  // 10 Demo items for tours and destinations
  /*const demoItems = [
    "Transylvania Dracula Castle Tour",
    "Bucharest City Center Walking Tour",
    "Brasov Old Town Experience",
    "Constanta Black Sea Day Trip",
    "Sibiu Cultural Heritage Walk",
    "Maramures Traditional Village Tour",
    "Sighisoara Medieval Citadel Excursion",
    "Peles Royal Castle Day Trip",
    "Donau Delta Wildlife Cruise",
    "Fagaras Mountains Hiking Experience",
  ];

  // Filter items based on user search input
  const filteredItems = demoItems.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase()),
  );*/
  // const [filteredItems, set_filteredItems] = useState<IDBTour[]>([]);
  const [cities, set_cities] = useState<string[]>([]);

  const handleSelectDestination = (
    // tour: IDBTour
    city_name: string
  ) => {
    // setSearchTerm(city_name);
    // setSelectedTour(tour);
    // dispatch(setFilterSelectedTour(tour))
    dispatch(setFilterCity(city_name))
    setIsOpen(false); // Closes the popover panel upon item selection

    onChange?.()
  };




  useEffect(() => {
    // 1. Only search if the search panel/modal is actually open
    if (!isOpen || !filterSearchCity.trim()) return;

    // 2. Set up the delay (e.g., 400ms debounce window)
    const delayDebounceFn = setTimeout(async () => {
      console.log("Firing server search for:", filterSearchCity);

      try {
        // Call your Next.js Server Action or API Route
        /*const results = await searchToursOnServer(searchTerm);
        // Update your UI state with the fresh data
        setSearchResults(results);*/

        const results = await getApiData<{
          ok: boolean,
          // tours: IDBTour[]
          locations: string[]
        }>(
          // '/booking-public/get-experiences-for-search-list',
          '/booking-public/get-locations-for-search',
          "POST", {
          search: filterSearchCity
        }, "not-authorize", "application/json");

        console.log("results:", results);

        // dispatch(setFilterSelectedTour(null))

        if (results.ok) {
          // set_filteredItems(results.tours)
          set_cities(results.locations)
        }
        else {
          // set_filteredItems([])
          set_cities([])
        }

      } catch (error) {
        console.error("Search failed:", error);
        // set_filteredItems([])
        set_cities([]);
      }
    }, 400); // Waits for 400ms of typing silence before hitting the server

    // 3. CRUCIAL CLEANUP: If the user types another character before the 400ms is up,
    // this cleanup function runs automatically, killing the previous timer.
    return () => clearTimeout(delayDebounceFn);
  }, [filterSearchCity, isOpen]);




  // The Popover Content Template (Filtered suggestion items)
  const destinationsPopover = (
    <Popover
      placement="right"
      id="destinations-widget-popover"
      className="component custom-destinations-popover border-0 shadow"
    >
      {/* Top Header Banner with Close Button */}
      {
        /*<div className="popover-widget-header d-flex align-items-center justify-content-between p-3 border-bottom">
        <span className="popover-header-title m-0">Where to?</span>
        <button
          type="button"
          className="btn-close custom-close-btn"
          aria-label="Close"
          onClick={() => setIsOpen(false)}
        ></button>
      </div>*/
      }

      <Popover.Body className="p-2 custom-popover-body">
        <ul className="list-unstyled m-0 suggestions-list px-1">
          {/*<li className="dropdown-header-text px-3 py-1">
            Popular Destinations
          </li>*/}

          {cities.map((city_name, index) => (
            <li
              key={index}
              className="suggestion-item rounded d-flex align-items-center gap-2 py-2 px-2"
              onClick={() => handleSelectDestination(city_name)}
            >
              {
                // <i className="bi bi-geo-alt-fill text-muted icon-scale"></i>
              }
              <span>{city_name}</span>
            </li>
          ))}

          {/* Fallback view if no items match the query search filter string */}
          {cities.length === 0 && (
            <li className="no-results-text px-3 py-3 text-muted">
              {tForms("no_destinations_found_matching")} "{filterSearchCity}"
            </li>
          )}
        </ul>
      </Popover.Body>


    </Popover >
  );

  return (
    <div className="component search-destinations-tours-popover">
      <OverlayTrigger
        trigger={[]}
        rootClose
        placement="bottom"
        show={isOpen}
        onToggle={(nextShow) => setIsOpen(nextShow)}
        overlay={destinationsPopover}
      >
        {/* Clickable Area Containing Text Input */}
        <div className="input-field-wrapper">
          <Form.Group controlId="destinationsSearchInput">
            <div className="field-micro-label">{tForms("where").toUpperCase()}</div>
            <Form.Control
              type="text"
              placeholder={tForms("enter_by_location_title")}
              value={filterSearchCity}
              onChange={(e) => {
                // setSearchTerm(e.target.value);
                dispatch(setFilterCity(e.target.value))
                setIsOpen(true); // Forces popover back open if user starts typing
              }}
              // onFocus={() => setIsOpen(true)}
              // onClick={() => setIsOpen(true)}
              className="search-text-input border-0 p-0 shadow-none"
              autoComplete="off"
            />
          </Form.Group>
        </div>
      </OverlayTrigger>
    </div>
  );
}
