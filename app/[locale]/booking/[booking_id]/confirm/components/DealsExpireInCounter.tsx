"use client";

import Title from "@/components/typography/Title";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";


export default function DealsExpireInCounter({
  expireDate = "2026-11-10 23:59:59",
}: {
  expireDate?: string;
}) {

  const tCommon = useTranslations("Common");

  // 1. Start with a safe, static initial state that matches on both Server and Client
  const [timeLeft, setTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  // Helper function to calculate time differences
  const calculateTimeLeft = () => {
    const difference = +new Date(expireDate) - +new Date();
    let timeLeftValues = { hours: "00", minutes: "00", seconds: "00" };

    if (difference > 0) {
      const totalHours = Math.floor(difference / (1000 * 60 * 60));
      const totalMinutes = Math.floor((difference / 1000 / 60) % 60);
      const totalSeconds = Math.floor((difference / 1000) % 60);

      timeLeftValues = {
        hours: String(totalHours).padStart(2, "0"),
        minutes: String(totalMinutes).padStart(2, "0"),
        seconds: String(totalSeconds).padStart(2, "0"),
      };
    }

    return timeLeftValues;
  };

  useEffect(() => {
    // 2. This ONLY runs on the client. Calculate the real time immediately on mount.
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [expireDate]);

  return (
    <>
      <div className="deals-expire-in-counter">
        <Container>
          <Row>
            <Col>
              <div className="inner-content-elements">
                <Title headingType="h3" headingStyle="Text-lg-Semibold" color="--color-text-fg">
                  {tCommon("dont_forget_about_your_unlocked_deals")}
                </Title>

                <div className="panel-the-counter">
                  <Title headingType="h4" headingStyle="Text-md-Semibold" color="--color-text-fg">
                    {tCommon("deals_expire_in")}
                  </Title>

                  <div className="counter-elements">
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
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}