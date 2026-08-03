"use client";

import {
  doResetOfTheSlice,
  ISearchFilters,
  setActiveTimeSlot,
  setActiveTimeSlotAndTour,
  setFilters
} from "@/redux/booking/bookingSlice";
import { fetchLivePrice } from "@/redux/booking/bookingTunk";
import { useAppDispatch } from "@/redux/hooks";
import { IBookingTimeActivitySlot } from "@/utils/interface-booking";
import { IDBTourIncludeDetails } from "@/utils/interface-database";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function HidrateTheSystem(
  {
    filters,
    slots,
    tour
  }
    :
    {
      filters: ISearchFilters,
      slots: IBookingTimeActivitySlot[],
      tour: IDBTourIncludeDetails
    }
) {

  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {

    // dispatch(setFilters(filters));
    dispatch(setActiveTimeSlotAndTour(
      {
        activeTimeSlot: slots.find((slot) => slot.id === filters.timeSlot) ?? null,
        tour,
        filters
      }
    ));
    console.log("slots.find((slot) => slot.id === filters.timeSlot) ?? null:", slots.find((slot) => slot.id === filters.timeSlot) ?? null, "filters.timeSlot:", filters.timeSlot, "slots:", slots, "filters:", filters);

    /*dispatch(fetchLivePrice({
      tourId: tour.id,
      startDate: filters.selectedDates.length > 0 ? filters.selectedDates[0] : "",
      participants: filters.participantsCount,
      slotId: filters.timeSlot as string
    }));*/
    dispatch(fetchLivePrice());

    return () => {
      // dispatch(doResetOfTheSlice());
    }

  }, [pathname, searchParams, dispatch]);

  return null;
}