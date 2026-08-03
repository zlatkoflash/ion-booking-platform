"use client";

import { getApiData } from "@/utils/api";
import ButtonDefault from "@/components/buttons/ButtonDefault";

export default function BtnAddReservation() {

  const addReservation = async () => {
    const result = await getApiData<{ ok: boolean, message: string, data: any }>(`/administrator/test-reserve-booking`, "POST", {}, "authorize", "application/json");
    console.log("result: ", result.data);
  }

  return <>
    <span>
      <ButtonDefault label="Add Reservation" onClick={() => {
        addReservation();
      }} />
      <p>Not working checkout will use</p>
    </span>
  </>
}