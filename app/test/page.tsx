
import PanelTestWithButtons from "@/components/testing/PanelTestWithButtons";
import { zconfig } from "@/config/config";


export default async function PageTest() {

  /*const data = await fetch(
    `${zconfig.supabase.api_link}/hello-world`,
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
    }
  );
  const json = await data.json();*/
  //console.log("json: ", json);


  /*const dataBokunProducts = await fetch(`${zconfig.supabase.api_link}/bokun-products`,
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
  const jsonDataBokunProducts = await dataBokunProducts.json();
  //console.log("jsonDataBokunProducts:", jsonDataBokunProducts);*/

  /*
  const vendorBokun = await fetch('https://api.bokuntest.com/restapi/v2.0/marketplace/vendor/self/', {
    method: "POST",
    headers: {
      // "X-Bokun-Date": bokunDate,
      "X-Bokun-AccessKey": "7c6fe713fa46404487b7dd94080b8599",
      // "X-Bokun-AccessKey": 'test',
      // "X-Bokun-Signature": signature,
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(body) 
  })
  const vendorBokunjson = await vendorBokun.text();
  console.log("vendorBokunjson:", vendorBokunjson);*/

  return <>
    Testing...
    <PanelTestWithButtons />
  </>
}