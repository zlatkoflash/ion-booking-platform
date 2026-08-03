"use client";

import { getApiData } from "@/utils/api";
import { useEffect } from "react";
import IconText from "../buttons/IconText";
import { IDBTourIncludeDetails } from "@/utils/interface-database";

export default function CardExperienceLabels({
  bookingDetails
}: {
  bookingDetails: IDBTourIncludeDetails
}) {


  /*const LoadTheLabelsForExperience = async () => {

    console.log("start loading labels... ", experience_id);

    const result = await getApiData<{
      ok: boolean,
      labels: {}
    }>(
      "/booking-public/get-info-about-experience",
      "POST",
      {
        id_database,
        experience_id,
        date_start,
        date_end,
        number_of_people
      }
    );

    console.log("Result after loading: ", result);

    console.log("end loading labels... ", experience_id);

  }*/

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
      result.push(<IconText key={2} text={`Booked ${bookingDetails.booked_tours_today} times today`} iconType="power-outline" type="card-city-label" />);
    }

    return result;
  }


  return <>


    {
      labels()
    }

  </>
}