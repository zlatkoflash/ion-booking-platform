"use client";

import { getApiData } from "@/utils/api";
import { useEffect } from "react";
import IconText from "../buttons/IconText";
import { IDBTourIncludeDetails } from "@/utils/interface-database";
import { useTranslations } from "next-intl";

export default function CardExperienceLabels({
  bookingDetails
}: {
  bookingDetails: IDBTourIncludeDetails
}) {


  const tCommon = useTranslations("Common");

  useEffect(() => {
    // LoadTheLabelsForExperience()
  }, []);

  const labels = () => {
    let result = [];

    if (bookingDetails.discount > 0) {
      result.push(<IconText key={3} text={`${bookingDetails.discount}% off`} iconType="percent-outline" type="card-city-label" />);
    }
    if (typeof bookingDetails.booked_tours_today === "number" &&
      bookingDetails.booked_tours_today > 10) {
      result.push(<IconText key={1} text="Likely to sell out" iconType="fire-outline" type="card-city-label" />);
    }
    if (typeof bookingDetails.booked_tours_today === "number" && bookingDetails.booked_tours_today > 0 &&
      bookingDetails.booked_tours_today <= 10) {
      result.push(<IconText key={2} text={`${tCommon("booked")} ${bookingDetails.booked_tours_today} ${tCommon("times_today")}`} iconType="power-outline" type="card-city-label" />);
    }

    return result;
  }


  return <>


    {
      labels()
    }

  </>
}