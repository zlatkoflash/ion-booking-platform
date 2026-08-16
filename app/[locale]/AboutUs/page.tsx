import MainFooter from "@/components/footers/MainFooter";
import HeaderHome from "@/components/headers/HeaderHome";
import AboutUsHeadingContent from "@/components/sections/AboutUsHeadingContent";
import AboutUsX3Stats from "@/components/sections/AboutUsX3Stats";
import ContentPhoto from "@/components/sections/ContentPhoto";
import { getTranslations } from "next-intl/server";
import MeetOurGuidsPlacePhoto from "@/assets/images/about-us-content-photo.jpg";
import OurMissionPhoto from "@/assets/images/about-us-content-photo-our-mission.jpg";
import X6IconsGrid from "@/components/sections/X6IconsGrid";
import { Suspense } from "react";
import SliderCities from "@/components/sliders/SliderCities";
import SliderCitiesAsync from "../page-components/SliderCitiesAsync";
import SubscribeBanner from "@/components/sections/SubscribeBanner";
import OurTeam from "@/components/sections/OurTeam";

export default async function AboutUsPage() {

  const tAboutUs = await getTranslations("TemplateAboutUs");
  const tCommon = await getTranslations("Common");

  return <>


    <HeaderHome />

    <AboutUsHeadingContent
      badgeText={tAboutUs("about_us_heading.badge")}
      title={tAboutUs("about_us_heading.title")}
      paragraph={tAboutUs("about_us_heading.paragraph")}
    />

    <AboutUsX3Stats className="pt-0" />

    <ContentPhoto
      badgesStrings={tAboutUs.raw("content_photo.badges_strings")}
      title={tAboutUs("content_photo.title")}
      paragraphs={tAboutUs.raw("content_photo.paragraphs")}
      blueParagraph={tAboutUs("content_photo.blue_paragraph")}
      buttonDetails={{
        label: tAboutUs("content_photo.button_details.label"),
        link: "#our-team",
        addArrowOnTheEnd: true
      }}
      pictureUrl={MeetOurGuidsPlacePhoto.src}
    />

    <X6IconsGrid
      title={tAboutUs("trending_experiences")}
      subtitle={tAboutUs("what_other_travelers_are_booking_this_week")}
      items={tAboutUs.raw("x6_icons_texts")} />




    <ContentPhoto
      badgesStrings={tAboutUs.raw("content_photo_our_mission.badges_strings")}
      title={tAboutUs("content_photo_our_mission.title")}
      paragraphs={tAboutUs.raw("content_photo_our_mission.paragraphs")}
      blueParagraph={tAboutUs("content_photo_our_mission.blue_paragraph")}
      buttonDetails={{
        label: tAboutUs("content_photo_our_mission.button_details.label"),
        link: "/experiences-search",
        addArrowOnTheEnd: true
      }}
      pictureUrl={OurMissionPhoto.src}
      desktopRowReverse={true}
    />


    <Suspense fallback={
      <SliderCities items={[]} title={tCommon("where_will_you_walk_next")} subTitle={tCommon("what_other_travelers_are_booking_this_week")} />
    }>
      <SliderCitiesAsync />
    </Suspense>



    <OurTeam />


    <SubscribeBanner />

    <MainFooter />

  </>
}