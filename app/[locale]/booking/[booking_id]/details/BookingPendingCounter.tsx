"use client";

import { useEffect, useState } from "react";
import IconText from "@/components/buttons/IconText";
import ButtonDefault from "@/components/buttons/ButtonDefault";
import { useRouter } from "@/translations-engine/routing";
import { useAppSelector } from "@/redux/hooks";
import { useTranslations } from "next-intl";

interface BookingPendingCounterProps {
  expiring_date?: string;
}

export default function BookingPendingCounter({
  expiring_date = "2026-07-18 12:50:41.324153+00",
}: BookingPendingCounterProps) {

  const router = useRouter();
  const booking = useAppSelector((state) => state.booking.booking);
  const tour = useAppSelector((state) => state.booking.tour);

  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isExpired, setIsExpired] = useState<boolean>(false);

  const tForms = useTranslations("Forms");

  useEffect(() => {
    const targetDate = new Date(expiring_date).getTime();

    // Safety fallback if the provided date string is completely invalid
    if (isNaN(targetDate)) {
      setTimeLeft("00:00");
      setIsExpired(true);
      return;
    }

    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft("00:00");
        setIsExpired(true);
        return true; // Tells the caller to stop the timer loop
      }

      // Convert millisecond differences to clean minutes and seconds strings
      const minutes = Math.floor(difference / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      const paddedMinutes = String(minutes).padStart(2, "0");
      const paddedSeconds = String(seconds).padStart(2, "0");

      setTimeLeft(`${paddedMinutes}:${paddedSeconds}`);
      return false;
    };

    // Run once immediately on mount to prevent layout shifts (showing blank values)
    const initialExpired = calculateTimeRemaining();
    if (initialExpired) return;

    // Set up the interval tick
    const intervalId = setInterval(() => {
      const shouldStop = calculateTimeRemaining();
      console.log("Counter expiration pending booking");
      if (shouldStop) {
        clearInterval(intervalId);
      }
    }, 1000);

    // CRITICAL CLEANUP: Clears the timer memory footprint instantly when component unmounts
    return () => clearInterval(intervalId);
  }, [expiring_date]);

  // If time has completely run out, render the expired warning state
  if (isExpired) {
    return (
      <>
        <IconText
          type="icon-text-alert"
          text={tForms("your_reservation_hold_has_expired")}
          iconType="clock-alarm-outline"
          fullWidthCentered={true}
          key="expired-spot"
          variation="danger" // Swapped variation to mirror a systemic warning layout
        />
        {
          tour !== null && <>
            <ButtonDefault
              variant="outline-primary"
              className="w-100 mb-4"
              label={tForms("view_the_tour_and_book_a_new_date")}
              onClick={(e) => {
                router.push(`/tour/${tour?.slug}`);
              }}
            />
            <div></div>
          </>

        }

      </>
    );
  }

  // Normal execution state rendering active counter parameters
  return (
    <IconText
      type="icon-text-alert"
      text={tForms("holding_your_spot_for_minutes", { minutes: timeLeft })}
      iconType="clock-alarm-outline"
      fullWidthCentered={true}
      key="holding-spot"
      variation="success"
    />
  );
}