"use server";

import MainFooter from "@/components/footers/MainFooter";
import HeaderHome from "@/components/headers/HeaderHome";
// import HeroHome from "@/components/heroes/HeroHome";
import HeroSearchExperiences from "@/components/heroes/HeroSearchExperiences";
import SubscribeBanner from "@/components/sections/SubscribeBanner";
import SliderExperiences from "@/components/sliders/SliderExperiences";
import photo_for_yello_banner from "@/assets/images/illustrations-cards-search-result.png";
import TravellersStories from "@/components/sections/TravellersStories";
import ContentPhoto from "@/components/sections/ContentPhoto";
import photo_people from "@/assets/images/banner-content-picture-happy-people.png";
import FAQs from "@/components/sections/FAQs";
import { getApiData } from "@/utils/api";
import { IBookingParticipants, ISearchFilters } from "@/redux/booking/bookingSlice";
import { IDBTour, IDBTourIncludeDetails } from "@/utils/interface-database";
import { ICardExperience } from "@/components/sliders/CardExperience";
import SliderExperienceNoItems from "./SliderExperienceNoItems";
import CardExperienceLabels from "@/components/sliders/CardExperienceLabels";
import { getLoggedUser } from "@/utils/supabaseServer";
import { getTranslations } from "next-intl/server";

// 2. Next.js incoming searchParams type signature
interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}



/**
 * Pure server utility function to convert Next.js page searchParams into a clean object.
 * @param searchParams - The raw, awaited searchParams object from the server page context
 */
export async function parseServerParams(searchParams: Record<string, any>): Promise<ISearchFilters> {
  // Helper to extract clean single strings
  const getStr = (key: string): string => {
    const val = searchParams[key];
    return Array.isArray(val) ? val[0] : val || "";
  };

  // Helper to safely parse stringified arrays or objects
  const parseJson = <T,>(key: string, fallback: T): T => {
    const val = searchParams[key];
    const raw = Array.isArray(val) ? val[0] : val;
    if (!raw) return fallback;
    try {
      return JSON.parse(decodeURIComponent(raw)) as T;
    } catch {
      return fallback;
    }
  };

  return {
    availability: getStr("availability"),
    category: getStr("category"),
    price_range: getStr("price_range"),
    duration: getStr("duration"),
    city: getStr("city"),
    selectedDates: parseJson<string[]>("selectedDates", []),
    participantsCount: parseJson<IBookingParticipants>("participantsCount", {
      adults: 0,
      children: 0,
      infants: 0
    }),
    timeSlot: getStr("timeSlot")
  };
}

export default async function PageExperienceSearch({ searchParams }: PageProps) {
  // 1. Await the params from the Next.js server context
  const resolvedParams = await searchParams;
  const filters = await parseServerParams(resolvedParams);
  const loggedUser = await getLoggedUser();

  // console.log('filters.participantsCount:', resolvedParams.participantsCount, 'filters.selectedDates:', resolvedParams.selectedDates);
  const paramsForExperienceAdditional = `?participantsCount=${encodeURIComponent(JSON.stringify(filters.participantsCount))}&selectedDates=${encodeURIComponent(JSON.stringify(filters.selectedDates))}`;
  // const participantsCount = filters.participantsCount;

  // console.log("filters for server:", filters);

  const experiencesData = await getApiData<{
    ok: boolean,
    experiences: IDBTourIncludeDetails[]
    experiencesOther: IDBTourIncludeDetails[]
  }>(
    "/booking-public/get-experiences-by-filters", "POST", {
    filters: filters
  },
    loggedUser === null ? "not-authorize" : "authorize",
    "application/json"
  );
  // console.log("experiencesData:", experiencesData);
  //const 

  const tTemplateSearch = await getTranslations("TemplateSearch");
  const tCommon = await getTranslations('Common');

  return <>
    <HeaderHome />
    <HeroSearchExperiences />

    {
      experiencesData?.experiences?.length > 0 && <SliderExperiences
        badgesStrings={[tTemplateSearch("based_on_your_filters")]}
        title={`${tTemplateSearch("the_walks_you_cannot_miss_in")} ${experiencesData?.experiences?.[0]?.location?.city}`}
        subtitle={tTemplateSearch('handpicked_experiences_travelers_are_booking_right_now')}
        items={experiencesData?.experiences?.map((tour: IDBTourIncludeDetails) => {

          // console.log("tour.tour:", tour);

          const item: ICardExperience = {
            image_url: tour.cover || "",
            location: `${tour.location.city}, ${tour.location.country}`,
            // location: tour.tour.location || "",
            // rating: tour.tour.rating || 0,
            // review_count: tour.tour.review_count || 0,
            title: tour.title || "",
            description: tour.description || "",
            bottomLabel: `${tCommon('by')} ${tour.vendor.title} • ${tour.duration_label}`,
            // price: tour.tour.price || 0,
            coverURL: tour.cover || "",
            priceFrom: tour.price || 0,
            discountPercent: tour.discount || 0,
            id: tour.id,
            isFor: "experience",
            haveHeart: tour.haveHeart,
            elementForLeftLabelPLace: <CardExperienceLabels bookingDetails={tour} />,
            link: `/tour/${tour.slug}${paramsForExperienceAdditional}`
            /*onClickHeart(state) {
              console.log("state", state);
            },*/
          };

          // console.log("item: item", item);

          return item;
        })}
      />
    }

    {
      experiencesData?.experiences?.length === 0 && <SliderExperienceNoItems />
    }

    {
      experiencesData?.experiencesOther?.length > 0 && <SliderExperiences
        badgesStrings={tTemplateSearch.raw("experienceOther.badgesStrings")}
        title={tTemplateSearch("experienceOther.title")}
        subtitle={tTemplateSearch("experienceOther.subtitle")}
        items={experiencesData?.experiencesOther?.map((tour: IDBTourIncludeDetails) => {

          // console.log("tour.tour:", tour);

          const item: ICardExperience = {
            image_url: tour.cover || "",
            location: `${tour.location.city}, ${tour.location.country}`,
            // location: tour.tour.location || "",
            // rating: tour.tour.rating || 0,
            // review_count: tour.tour.review_count || 0,
            title: tour.title || "",
            description: tour.description || "",
            bottomLabel: `${tCommon('by')} ${tour.vendor.title} • ${tour.duration_label}`,
            // price: tour.tour.price || 0,
            coverURL: tour.cover || "",
            priceFrom: tour.price || 0,
            discountPercent: tour.discount,
            id: tour.id,
            isFor: "experience",
            haveHeart: tour.haveHeart,
            elementForLeftLabelPLace: <CardExperienceLabels bookingDetails={tour} />,
            link: `/tour/${tour.slug}${paramsForExperienceAdditional}`
            /*onClickHeart(state) {
              console.log("state", state);
            },*/
          };

          // console.log("item: item", item);

          return item;
        })}
      />
    }


    <SubscribeBanner type="show-only-yellow-content"
      yellowContent={{
        title: tTemplateSearch("subscribtionBanner.title"),
        subtitle: tTemplateSearch("subscribtionBanner.subtitle"),
        photoPath: photo_for_yello_banner.src,
        buttons: [
          {
            addArrowOnTheEnd: true,
            label: tTemplateSearch("subscribtionBanner.button_label"),
            link: "/request-your-private-tour",
            variant: "warning"
          }
        ]
      }}
    />

    <TravellersStories />

    <ContentPhoto
      type="type-blue"
      badgesStrings={tTemplateSearch.raw("contentPhotoBottom.badgesStrings")}
      title={tTemplateSearch("contentPhotoBottom.title")}
      paragraphs={tTemplateSearch.raw("contentPhotoBottom.paragraphs")}
      blueParagraph={""}
      pictureUrl={photo_people.src}
    />

    <FAQs
      title={tCommon('plan_your_visit')}
      subtitle={tCommon('frequently_asked_questions')}
      items={tCommon.raw('faqs')}
    />

    <SubscribeBanner />

    <MainFooter />
  </>
}