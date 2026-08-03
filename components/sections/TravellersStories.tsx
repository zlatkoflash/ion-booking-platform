"use client";

import { useEffect, useState } from "react";
import ButtonDefault from "../buttons/ButtonDefault";
import ZBadge from "../buttons/ZBadge";
import ZBadgeGroup from "../buttons/ZBadgeGroup";
import HeadingContentWidgets from "../headers/HeadingContentWidgets";
import Title from "../typography/Title";
import CardsStoriesGrid from "./CardsStoriesGrid";
import SectionContainerCards from "./SectionContainerCards";
import TripAdvisorBanner from "./TripAdvisorBanner";
import { Swiper, SwiperSlide } from "swiper/react";

export default function TravellersStories() {

  const tCommon = useTranslations("Common");

  return (
    <div className="component travellers-stories">
      <SectionContainerCards>
        <HeadingContentWidgets
          // className="hide-widgets-on-mobile"
          hideWidgetsOnMobile={true}
          children_content={<>
            <ZBadgeGroup>
              <ZBadge label={tCommon("social_proof")} />
            </ZBadgeGroup>
            <Title
              headingType="h3"
              headingStyle="Display-md-Semibold"
              color="--color-text-fg"
            >
              {tCommon("real_stories_from_real_walks")}
            </Title>
          </>}
          children_widget={<>
            <ButtonDefault
              label={`${tCommon("see_all")} 4433+ ${tCommon("reviews")}`}
              variant="outline-primary"
              addArrowOnTheEnd={true}
            />
          </>}
        />

        <CardsStoriesGrid />

        <TripAdvisorBanner />

        <MobileSliderStories />

        <div className="bottom-buttons-mobile">
          <ButtonDefault label="See all 4433+ reviews" variant="outline-primary" addArrowOnTheEnd={true} />
        </div>

      </SectionContainerCards>
    </div>
  );
}

import type { Swiper as SwiperType } from "swiper"; // Import types if needed
import CardStory from "./CardStory";
import ButtonsCirclesNavigation from "../sliders/ButtonsCirclesNavigation";
import { useTranslations } from "next-intl";

function MobileSliderStories() {

  const [isMounted, setIsMounted] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  useEffect(() => {
    setIsMounted(true)
  }, []);

  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return <>
    <div className="mobile-slider-stories">

      {
        isMounted && <Swiper
          slidesPerView={4}
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
            1300: {
              slidesPerView: 4,
              spaceBetween: 0,
            }
          }}
          onSwiper={(swiper) => setSwiperInstance(swiper)}
          /*pagination={{
            clickable: true,
          }}*/
          // modules={[Pagination]} it works but we don't need here
          className="component z-swiper overflow-visible"
        >
          {
            items.map((itemObject, index) => (
              <SwiperSlide key={index}>
                {
                  // reactItem
                  <CardStory key={`card-story-${index}`} />
                }
              </SwiperSlide>
            ))
          }
        </Swiper>
      }

      <ButtonsCirclesNavigation swiperInstance={swiperInstance} className="for-mobile-only" />

    </div>
  </>
}