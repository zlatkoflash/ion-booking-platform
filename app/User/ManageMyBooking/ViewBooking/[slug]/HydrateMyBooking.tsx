"use client";

import { BookingCalendarActions } from "@/libs/features/BookingCalendar/bookingCalendarSlice";
import { IBokunBooking, IBokunGetExperienceById } from "@/utils/bokun";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function HydrateMyBooking({
  dataForExperience,
  bokunBooking
}: {
  dataForExperience: IBokunGetExperienceById;
  bokunBooking: IBokunBooking;
}) {

  const dispatch = useDispatch();


  useEffect(() => {

    if (!bokunBooking.activityBookings || bokunBooking.activityBookings.length === 0) return;

    console.log("bokunBooking.activityBookings[0].date:", bokunBooking.activityBookings[0].date, new Date(bokunBooking.activityBookings[0].date as number));
    dispatch(BookingCalendarActions.set_calendarActiveMonth(
      (new Date(bokunBooking.activityBookings[0].date as number)).toISOString().split('T')[0]
    ));

    dispatch(BookingCalendarActions.setSelectedDate(
      (new Date(bokunBooking.activityBookings[0].date as number)).toISOString().split('T')[0]
    ));


  }, [bokunBooking]);

  return null;
}