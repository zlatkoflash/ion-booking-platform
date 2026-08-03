"use client";

import { IBookingParticipants, IBookingPrice, setActiveTimeSlot, setBooking, setFilterParticipantsCount, setInitialHydratingData, setPrice, setTour } from "@/redux/booking/bookingSlice";
import { useAppDispatch } from "@/redux/hooks";
import { IBookingTimeActivitySlot } from "@/utils/interface-booking"
import { IDBBooking, IDBBookingDetails, IDBTourIncludeDetails } from "@/utils/interface-database"
import { useEffect, useLayoutEffect, useState } from "react";

export default function BookingDetailsHidration(
  {
    children,
    tour,
    timeSlotStart,
    price,
    participants,
    booking
  }
    :
    {
      children: React.ReactNode;
      tour: IDBTourIncludeDetails;
      timeSlotStart: IBookingTimeActivitySlot;
      price: IBookingPrice,
      participants: IBookingParticipants,
      booking: IDBBookingDetails
    }
) {


  const dispatch = useAppDispatch();
  const [isHydrated, setIsHydrated] = useState(false);

  useLayoutEffect(() => {
    /*dispatch(setTour(tour));
    dispatch(setActiveTimeSlot(timeSlotStart));
    dispatch(setPrice(price));
    dispatch(setFilterParticipantsCount(participants));
    dispatch(setBooking(booking));*/

    dispatch(setInitialHydratingData({
      activeTimeSlot: timeSlotStart,
      tour,
      price,
      participants,
      booking
    }));

    setIsHydrated(true);

  }, [dispatch, tour, timeSlotStart, price, participants, booking]);


  if (!isHydrated) return <></>

  return <>
    {children}
  </>
}