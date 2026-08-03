"use client";

import ButtonDefault from "@/components/buttons/ButtonDefault"
import { getApiData } from "@/utils/api"

export default function BtnActivityFunctions() {
  return <>

    <BtnFetchAllActivities />
    <BtnFetchSingleActivity />
    <BtnGetAvailabilityPriceList />

  </>
}


function BtnFetchAllActivities() {

  const action = async () => {
    const data = await getApiData("/administrator/test-get-availabilities/fetch-activity-from-source", "POST", {}, "authorize", "application/json")
    console.log(data)
  }

  return <>
    <ButtonDefault label={"Fetch All Activities"} onClick={() => {
      action()
    }} />
  </>
}

function BtnFetchSingleActivity() {

  const activityId = "914000";

  const action = async () => {
    const data = await getApiData("/administrator/test-fetch-single-activity", "POST", {
      activityId
    }, "authorize", "application/json")
    console.log(data)
  }

  return <>
    <ButtonDefault label={`Fetch Single Activity ${activityId}`} onClick={() => {
      action()
    }} />
  </>
}


function BtnGetAvailabilityPriceList() {

  const availabilityId = "914000";

  const action = async () => {
    const data = await getApiData(`/administrator/test-get-availability-price-list/get-availability-price-list`, "POST", {
      availabilityId: availabilityId
    }, "authorize", "application/json")
    console.log(data)
  }

  return <>
    <ButtonDefault label={`Get Availability PriceList ${availabilityId}`} onClick={() => {
      action()
    }} />
  </>
}