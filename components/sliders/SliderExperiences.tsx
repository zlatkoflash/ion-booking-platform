"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper"; // Import types if needed
import HeadingContentWidgets from "../headers/HeadingContentWidgets";
import SectionContainerCards from "../sections/SectionContainerCards";
import Title from "../typography/Title";
import ButtonsCirclesNavigation from "./ButtonsCirclesNavigation";
import CardCity from "./CardCity";
import CardCityCommingSoon from "./CardCityCommingSoon";
import CardCityWhatIsComming from "./CardCityWhatIsComming";
import { useState } from "react";
import ZBadgeGroup from "../buttons/ZBadgeGroup";
import ZBadge from "../buttons/ZBadge";
import CardExperience, { ICardExperience } from "./CardExperience";
import { useAppSelector } from "@/redux/hooks";

export default function SliderExperiences({
  badgesStrings = ["Trending experiences"],
  title = "Trending experiences",
  subtitle = "What other travelers are booking this week",
  items = [],
  isFor = "experience"
}: {
  badgesStrings?: string[]
  title?: string
  subtitle?: string
  items?: ICardExperience[];
  isFor?: "experience"
}) {

  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const loggedUser = useAppSelector((state) => state.auth.user);

  return <>
    <SectionContainerCards hiddenOverflow={true}>
      <HeadingContentWidgets
        // className="hide-widgets-on-mobile"
        hideWidgetsOnMobile={true}
        children_content={
          <>
            {
              (badgesStrings && badgesStrings.length > 0) && <ZBadgeGroup>
                {
                  badgesStrings.map((badgeString, index) => {
                    return <ZBadge key={`badge-${index}`} label={badgeString} />
                  })
                }
              </ZBadgeGroup>
            }

            {
              title !== "" && <Title
                headingType="h2"
                headingStyle="Display-md-Semibold"
                color="--color-text-fg"
              >
                {title}
              </Title>
            }
            {
              subtitle !== "" && <Title
                headingType="p"
                headingStyle="Text-lg-Regular"
                color="--color-text-fg-subtle"
              >
                {subtitle}
              </Title>
            }
          </>
        }
        children_widget={
          <>
            <ButtonsCirclesNavigation swiperInstance={swiperInstance} />
          </>
        }
      />

      <Swiper
        slidesPerView={3}
        spaceBetween={0}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          // When window width is >= 768px
          769: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          // When window width is >= 1024px
          1024: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
        }}
        onSwiper={(swiper) => setSwiperInstance(swiper)}
        /*pagination={{
          clickable: true,
        }}*/
        // modules={[Pagination]} it works but we don't need here
        className="component z-swiper overflow-visible"
      >


        {
          items.map((item, index) => {
            return <SwiperSlide key={`experience-${index}-${item.id}-${loggedUser !== null ? "-logged" : ""}`}>
              <CardExperience details={item} />
            </SwiperSlide>
          })
        }



      </Swiper>

      <ButtonsCirclesNavigation swiperInstance={swiperInstance} className="for-mobile-only" />

    </SectionContainerCards>
  </>;
}