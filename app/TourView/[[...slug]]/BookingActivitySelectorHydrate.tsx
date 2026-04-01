"use client"

import { BookingCalendarActions } from "@/libs/features/BookingCalendar/bookingCalendarSlice";
// import { IBokunGetExperienceById } from "@/utils/bokun";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { IDBTour } from "@/utils/interface/interfaceDatabase";

export default function BookingActivitySelectorHydrate({
  //dataForExperience,
  tourDetailsInit
}: {
  // dataForExperience: IBokunGetExperienceById;
  tourDetailsInit: { tour: IDBTour }


}) {

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(BookingCalendarActions.setDataForExperience(dataForExperience));
    dispatch(BookingCalendarActions.setTourDetails(tourDetailsInit));
  }, []);

  return null;
}