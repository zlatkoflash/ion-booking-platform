"use client"

import { BookingCalendarActions } from "@/libs/features/BookingCalendar/bookingCalendarSlice";
import { IBokunGetExperienceById } from "@/utils/bokun";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function BookingActivitySelectorHydrate({
  dataForExperience,
}: {
  dataForExperience: IBokunGetExperienceById;



}) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(BookingCalendarActions.setDataForExperience(dataForExperience));
  }, []);

  return null;
}