"use client";

import { useState, useEffect } from "react";
import ZIcon from "@/components/icons/ZIcon";
import Title from "@/components/typography/Title";

export default function BookingCounterIconText({
  supabaseDate = "2026-12-12T20:00:00Z",
  labelTimer = "Expires in",
  labelWhenExpired = "Booking time expired"
}: {
  supabaseDate?: string,
  labelTimer?: string,
  labelWhenExpired?: string
}) {
  const [timeLeft, setTimeLeft] = useState<{ days: number, hours: number, minutes: number, seconds: number, isExpired: boolean } | null>(null);

  useEffect(() => {
    const target = new Date(supabaseDate).getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isExpired: false,
      };

    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);

      if (remaining.isExpired) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [supabaseDate]);

  if (!timeLeft) return null;

  return (
    <div className={`booking-counter-icon-text ${timeLeft.isExpired ? 'expired' : ''}`}>
      <ZIcon type="clock-alarm-outline" />
      <span>
        {timeLeft.isExpired ? (
          <Title headingType="span" headingStyle="Text-sm-Bold" color="--color-text-fg-error">
            {labelWhenExpired}
          </Title>
        ) : (
          <>
            <Title headingType="span" headingStyle="Text-sm-Medium" color="--color-text-fg">
              {labelTimer}
            </Title>{" "}
            <Title headingType="span" headingStyle="Text-sm-Bold" color="--color-text-fg-on-accent">
              {timeLeft.days > 0 && `${timeLeft.days}d `}
              {String(timeLeft.hours).padStart(2, '0')}:
              {String(timeLeft.minutes).padStart(2, '0')}:
              {String(timeLeft.seconds).padStart(2, '0')}
            </Title>
          </>
        )}
      </span>
    </div>
  );
}