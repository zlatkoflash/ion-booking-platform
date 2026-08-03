"use client"
import ButtonDefault from "@/components/buttons/ButtonDefault";
import { getApiData } from "@/utils/api";
import { useState } from "react";

export default function ButtonSyncExperiences() {

  const [loading, setLoading] = useState(false);

  const syncTheExperiences = async () => {
    setLoading(true);

    const dataSyncFeedback = await getApiData("administrator/sync-db", "POST", {}, "authorize", "application/json")

    // console.log("dataSyncFeedback: ", dataSyncFeedback)

    setLoading(false);
  }

  return (
    <>
      <ButtonDefault label="Sync Experiences" loading={loading} onClick={() => {
        syncTheExperiences();
      }} />
    </>
  )
}