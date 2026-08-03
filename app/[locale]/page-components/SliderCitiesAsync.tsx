import SliderCities, { ICardCity } from "@/components/sliders/SliderCities";
import { getApiData } from "@/utils/api";
import { ICity, ICityCounts } from "@/utils/interface-database";
// import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export default async function SliderCitiesAsync() {


  const tCommon = await getTranslations("Common");

  const data = await getApiData<{
    ok: boolean,
    message: string,
    cities: ICityCounts[]
  }>("booking-public/get-cities");

  // console.log("data:", data);

  let citiesData: ICardCity[] = [];

  if (data.ok === true) {
    citiesData = data.cities.map((city: ICityCounts) => {

      let link = `/city/${city.coming_soon ? "coming-soon/" : ""}${city.slug}`;
      if (city.count_experiences > 0) {
        link = `/experiences-search?city=${city.slug}`;
      }

      return {
        coming_soon: city.coming_soon || false,
        image_url: city.photo_url || undefined,
        link: link,
        subTitle: city.coming_soon ? tCommon("be_first_to_walk_with_us") : `${city.count_experiences > 20 ? "20+" : city.count_experiences} ${tCommon("tours")}`,
        title: city.name || undefined
      }
    })
  }

  return <SliderCities
    items={citiesData}
    title={tCommon("where_will_you_walk_next")}
    subTitle={tCommon("what_other_travelers_are_booking_this_week")}
  />
}