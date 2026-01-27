"use client";

import { IBookPricingEngine } from "@/app/TourView/[[...slug]]/content/BookingSidebarProvider";
import { IBookingDatabaseNet } from "@/interface/payment.booking";
import { BookingCalendarActions } from "@/libs/features/BookingCalendar/bookingCalendarSlice";
import { RootState } from "@/libs/store";
import { IBokunBooking } from "@/utils/bokun";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

type ClientMode = "booking" | "booking-editor";

export default function HydrateMyBookingEditor({ clientType, bokunBookingForediting, bookingDBNet, bookingPayments, bookingRefunds, iCanCancel, BookingDB }: { clientType?: ClientMode, bokunBookingForediting?: IBokunBooking, bookingDBNet?: IBookingDatabaseNet, bookingPayments?: any[], bookingRefunds?: any[], iCanCancel?: boolean, BookingDB?: any }) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(BookingCalendarActions.hydrateMyAdminEditor({
      clientType: "booking-editor",
      bokunBookingForediting: bokunBookingForediting as IBokunBooking,
      bookingDBNet: bookingDBNet as IBookingDatabaseNet,
      bookingPayments: bookingPayments as any[],
      bookingRefunds: bookingRefunds as any[],
      iCanCancel: iCanCancel as boolean,
      BookingDB: BookingDB as any,
      isModalSuccessOpen: false
    }));
  }, [clientType]);

  const availablilitesForDateRange = useSelector((state: RootState) => state.bookingCalendar.availablilitesForDateRange);


  useEffect(() => {
    if (bokunBookingForediting === null || bokunBookingForediting === undefined) return;
    // setSelectedAvailability(availablilitesForDateRange[0]);
    const startTimeId = bokunBookingForediting?.activityBookings[0].startTimeId;
    console.log("startTimeId:", startTimeId);
    const selectedAvailabilityFromTheBooking = availablilitesForDateRange.find(
      (availability) => availability.startTimeId === startTimeId
    );
    console.log("selectedAvailabilityFromTheBooking:", selectedAvailabilityFromTheBooking);
    if (selectedAvailabilityFromTheBooking) {
      // setSelectedAvailability(selectedAvailabilityFromTheBooking);
      dispatch(BookingCalendarActions.setSelectedAvailability(selectedAvailabilityFromTheBooking));
    }

    /**
     * Those are the bookings 1 count per group type, 
     * for example if we have 2 children and 3 adults it should show 5 items
     */
    const BookedActivity = bokunBookingForediting?.activityBookings[0];
    const pricingCategoryBookings = BookedActivity?.pricingCategoryBookings;
    const BookedPriceEngine = {
      counts: []
    } as IBookPricingEngine;
    // BookedPriceEngine.counts.push({})
    if (pricingCategoryBookings !== undefined) {
      for (const pricingCategoryBooking of pricingCategoryBookings) {
        // console.log("pricingCategoryBooking:", pricingCategoryBooking);
        const CountObject = BookedPriceEngine.counts.find(count =>
          count.rateId === BookedActivity?.rateId
          && count.priceCategoryId === pricingCategoryBooking.pricingCategoryId
          && count.availabilityId === selectedAvailabilityFromTheBooking?.id
        )
        // const rateId = BookedActivity?.rateId;
        if (CountObject === null || CountObject === undefined) {

          BookedPriceEngine.counts.push({
            availabilityId: selectedAvailabilityFromTheBooking?.id as string,
            rateId: BookedActivity?.rateId as number,
            count: 1,
            priceCategoryId: pricingCategoryBooking.pricingCategoryId

          });
        }
        else {
          CountObject.count++;
        }
      }
    }
    console.log("BookedPriceEngine:", BookedPriceEngine);
    dispatch(BookingCalendarActions.set_priceEngine(BookedPriceEngine));
  }, [availablilitesForDateRange]);


  return null;
}