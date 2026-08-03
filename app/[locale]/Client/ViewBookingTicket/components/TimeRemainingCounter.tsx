"use client";

import Title from "@/components/typography/Title";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function TimeRemainingCounter(
  { expireDate = "2026-11-10 23:59:59" }
    :
    { expireDate?: string }
) {

  // console.log("expireDate:", expireDate);

  const tCommon = useTranslations("Common");

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  // Helper function to calculate time differences
  const calculateTimeLeft = () => {
    // 1. Ensure we are working with a valid timestamp
    const targetTime = new Date(expireDate).getTime();
    const now = new Date().getTime();
    const difference = targetTime - now;

    // 2. Default to "00" if time has passed or input is invalid
    if (isNaN(targetTime) || difference <= 0) {
      return { days: "00", hours: "00", minutes: "00", seconds: "00" };
    }

    // 3. Mathematical conversion
    const seconds = Math.floor((difference / 1000) % 60);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    return {
      days: String(days).padStart(2, "0"),
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    };
  };

  useEffect(() => {
    // 2. This ONLY runs on the client. Calculate the real time immediately on mount.
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [expireDate]);

  const dateTimeIsExpired = () => {
    const date = new Date(expireDate)
    const now = new Date()
    const diff = date.getTime() - now.getTime()
    return diff <= 0;
  }

  return <>
    <div className="time-remaining-counter">

      {
        !dateTimeIsExpired() && <>
          <Title headingType="h4" color="--color-text-fg-subtle" headingStyle="Text-sm-CAPS">{tCommon("time_remaining_for_the_event")}</Title>
          <div className="counting-values">
            {
              timeLeft.days !== "00" && <>
                <div className="item">
                  <Title headingType="h5" headingStyle="Text-xl-Semibold" color="--color-text-fg-on-accent">
                    {timeLeft.days}
                  </Title>
                  <Title headingType="h5" headingStyle="Text-xs-CAPS" color="--color-text-fg-subtle">
                    {tCommon("days")}
                  </Title>
                </div>
                <div className="item">
                  <Title headingType="div" headingStyle="Text-xl-Semibold" color="--color-text-fg">
                    :
                  </Title>
                </div>
              </>
            }
            <div className="item">
              <Title headingType="h5" headingStyle="Text-xl-Semibold" color="--color-text-fg-on-accent">
                {timeLeft.hours}
              </Title>
              <Title headingType="h5" headingStyle="Text-xs-CAPS" color="--color-text-fg-subtle">
                {tCommon("hours")}
              </Title>
            </div>
            <div className="item">
              <Title headingType="div" headingStyle="Text-xl-Semibold" color="--color-text-fg">
                :
              </Title>
            </div>
            <div className="item">
              <Title headingType="h5" headingStyle="Text-xl-Semibold" color="--color-text-fg-on-accent">
                {timeLeft.minutes}
              </Title>
              <Title headingType="h5" headingStyle="Text-xs-CAPS" color="--color-text-fg-subtle">
                {tCommon("minutes")}
              </Title>
            </div>
            <div className="item">
              <Title headingType="div" headingStyle="Text-xl-Semibold" color="--color-text-fg">
                :
              </Title>
            </div>
            <div className="item">
              <Title headingType="h5" headingStyle="Text-xl-Semibold" color="--color-text-fg-on-accent">
                {timeLeft.seconds}
              </Title>
              <Title headingType="h5" headingStyle="Text-xs-CAPS" color="--color-text-fg-subtle">
                {tCommon("seconds")}
              </Title>
            </div>
          </div>
        </>
      }



      {
        dateTimeIsExpired() && <Title headingType="h4" color="--color-text-fg-subtle" headingStyle="Text-sm-CAPS">{tCommon("event_started")}</Title>
      }

    </div>
  </>
}