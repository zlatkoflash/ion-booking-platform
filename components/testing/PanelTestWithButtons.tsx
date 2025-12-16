"use client"

import { zconfig } from "@/config/config";

export default function PanelTestWithButtons() {

  const ___LoaddBokunExperiences = async (customPath: string = "") => {
    const dataBokunTest = await fetch(
      customPath === "" ? `${zconfig.supabase.api_link}/bokun/search` : customPath,
      // 'http://127.0.0.1:54321/functions/v1/bokun-products',
      // 'http://127.0.0.1:54321/functions/v1/bokun/hello-world',
      // 'https://kteqrchatotypfdxrsum.supabase.co/functions/v1/bokun/search',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // for live need "Authorization"
          // "Authorization": `Bearer sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH`,
          // for localhost need "apikey"
          "apikey": "sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH"
        },
        body: JSON.stringify({
          // lang: autoLang,
          // currency: autoCurrency,
          pageSize: 50,
          name: "Zlatko Derkoski"
        })
      });

    const dataBokunTestJSON = await dataBokunTest.json()
    console.log("dataBokunTestJSON:", dataBokunTestJSON);
  }

  return <>
    <button style={{ padding: 20, backgroundColor: "#ccc" }} onClick={() => {
      ___LoaddBokunExperiences()
    }}>Load bokun products / expriences</button>
    <button style={{ padding: 20, backgroundColor: "#ccc" }} onClick={() => {
      ___LoaddBokunExperiences(`${zconfig.supabase.api_link}/bokun-products`)
    }}>Load bokun products / expriences 2</button>
  </>
}