import IconTextsYellowPanel from "@/components/buttons/IconTextsYellowPanel";
import MainFooter from "@/components/footers/MainFooter";
import HeaderHome from "@/components/headers/HeaderHome";
import HeroHome from "@/components/heroes/HeroHome";
import CitySkeleton from "@/components/preloading-skeletons/CitiesSkeleton";
import BlueGridWithIcons from "@/components/sections/BlueGridWithIcons";
import ContentPhoto from "@/components/sections/ContentPhoto";
import SectionContainerCards from "@/components/sections/SectionContainerCards";
import SubscribeBanner from "@/components/sections/SubscribeBanner";
import TravellersStories from "@/components/sections/TravellersStories";
import SliderCities from "@/components/sliders/SliderCities";
import SliderExperiences from "@/components/sliders/SliderExperiences";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Suspense } from "react";
import SliderCitiesAsync from "./page-components/SliderCitiesAsync";
import SliderExperiencesAsync from "./page-components/SliderExperiencesAsync";

export default async function Home() {

  const tHome = await getTranslations("TemplateHome");
  const tCommon = await getTranslations("Common");
  // const tCommon = (s: string) => { return "" }

  return (
    <>
      <HeaderHome />
      <HeroHome />
      <IconTextsYellowPanel />

      {
        // <SliderCities />
      }
      <Suspense fallback={
        <SliderCities items={[]} title={tCommon("where_will_you_walk_next")} subTitle={tCommon("what_other_travelers_are_booking_this_week")} />
      }>
        <SliderCitiesAsync />
      </Suspense>

      <Suspense>
        <SliderExperiencesAsync />
      </Suspense>

      <BlueGridWithIcons />

      <TravellersStories />

      <ContentPhoto
        badgesStrings={tHome.raw("content_photo.badges_strings")}
        title={tHome("content_photo.title")}
        paragraphs={tHome.raw("content_photo.paragraphs")}
        blueParagraph={tHome("content_photo.blue_paragraph")}
        buttonDetails={{
          label: tHome("content_photo.button_details.label"),
          link: "/OurGuides",
          addArrowOnTheEnd: true
        }}
      />

      <SubscribeBanner />


      <MainFooter />


    </>
  );
}
