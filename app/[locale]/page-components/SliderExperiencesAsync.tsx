import { ICardExperience } from "@/components/sliders/CardExperience";
import CardExperienceLabels from "@/components/sliders/CardExperienceLabels";
import SliderExperiences from "@/components/sliders/SliderExperiences";
// import { useAppSelector } from "@/redux/hooks";
import { getApiData } from "@/utils/api";
import { IBookingTimeActivitySlot } from "@/utils/interface-booking";
import { IDBTour, IDBTourIncludeDetails } from "@/utils/interface-database";
import { getLoggedUser } from "@/utils/supabaseServer";
// import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export default async function SliderExperiencesAsync() {


  const tCommon = await getTranslations("Common");
  // const loggedUser = useAppSelector((state) => state.auth.user);
  const loggedUser = await getLoggedUser();
  let data: {
    ok: boolean,
    tours: IDBTourIncludeDetails[],
    // slots: IBookingTimeActivitySlot[]
  } = {
    ok: false,
    tours: [],
    // slots: []
  };

  data = await getApiData<{
    ok: boolean,
    tours: IDBTourIncludeDetails[],
    // slots: IBookingTimeActivitySlot[]
  }>("booking-public/get-experiences", "POST", {},
    loggedUser === null ? "not-authorize" : "authorize",
    "application/json");

  // console.log("data experiences: ", data);

  return (


    <>
      <SliderExperiences
        badgesStrings={tCommon.raw("sliderExperiences.badgesStrings")}
        title={tCommon("sliderExperiences.title")}
        subtitle={tCommon("sliderExperiences.subtitle")}
        items={data.tours.map((tour: IDBTourIncludeDetails) => {

          // console.log("tour.tour:", tour);

          const item: ICardExperience = {
            image_url: tour.cover || "",
            location: `${tour.location.city}, ${tour.location.country}`,
            // location: tour.tour.location || "",
            // rating: tour.tour.rating || 0,
            // review_count: tour.tour.review_count || 0,
            title: tour.title || "",
            description: tour.description || "",
            bottomLabel: `by ${tour.vendor.title} • ${tour.duration_label}`,
            // price: tour.tour.price || 0,
            coverURL: tour.cover || "",
            priceFrom: tour.price || 0,
            discountPercent: tour.discount,
            id: tour.id,
            isFor: "experience",
            haveHeart: tour.haveHeart,
            elementForLeftLabelPLace: <CardExperienceLabels bookingDetails={tour} />,
            link: `/tour/${tour.slug}`
            /*onClickHeart(state) {
              console.log("state", state);
            },*/
          };

          // console.log("item: item", item);

          return item;
        })}
      />
    </>
  )
}