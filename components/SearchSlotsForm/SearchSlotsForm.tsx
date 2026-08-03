"use client";

import { useState, FormEvent, useRef, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import CalendardInputPopover from "../forms/popovers/CalendardInputPopover";
import SearchDestinationsToursPopover from "../forms/popovers/SearchDestinationsToursPopover";
import ParticipantsCountPopover from "../forms/popovers/ParticipantsCountPopover";
import ButtonSearch from "../buttons/ButtonSearch";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "@/translations-engine/routing";
import HIdrateSearchingPanel from "./HIdrateSearchingPanel";
import { ISearchFilters, setFilterSelectedDates } from "@/redux/booking/bookingSlice";
import ButtonDefault from "../buttons/ButtonDefault";
import { setModalFiltersShow } from "@/redux/controls/controlsSlice";


export const performSearch = (router: any, filters: ISearchFilters) => {

  // const router = useRouter();
  // const filters = useAppSelector((state) => state.booking.filters);

  router.push({
    pathname: `/experiences-search`,
    query: {
      availability: filters.availability,
      category: filters.category,
      price_range: filters.price_range,
      duration: filters.duration,
      selectedDates: JSON.stringify(filters.selectedDates),
      // selectedTour: filters.selectedTour ? filters.selectedTour.id : "",
      participantsCount: JSON.stringify(filters.participantsCount),
      city: filters.city
    }
  })
}

export default function SearchSlotsForm(
  { type = "home-hero", AfterChangeAnyFilter }
    :
    {
      type?: "home-hero" | "search-experiences-hero",
      AfterChangeAnyFilter?: () => void,
    }
) {

  const router = useRouter();
  const dispatch = useAppDispatch();

  // const whoDropdownRef = useRef<HTMLDivElement>(null);

  const filters = useAppSelector((state) => state.booking.filters);


  const handleSearch = (e: any) => {
    e.preventDefault();

  };



  return (
    <>
      <Form onSubmit={handleSearch} className={`component search-slots-form ${type}`}>
        <SearchDestinationsToursPopover onChange={() => {
          AfterChangeAnyFilter?.()
        }} />
        <CalendardInputPopover onChange={() => {
          AfterChangeAnyFilter?.()
        }} />
        <ParticipantsCountPopover onChange={() => {
          AfterChangeAnyFilter?.()
        }} />
        <ButtonSearch
          className="btn-search-show-on-desktop"
          onClick={() => {
            // doSearch()
            performSearch(router, filters);
          }}
        />
        <ButtonDefault label="Sarch"
          iconType="search"
          iconPosition="after-text"
          className="btn-search-show-on-mobile" onClick={() => {
            dispatch(setModalFiltersShow(false))
            performSearch(router, filters);
          }} />
      </Form>
    </>
  );
}
