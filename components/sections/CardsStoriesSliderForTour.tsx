"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import HeadingContentWidgets from "../headers/HeadingContentWidgets";
import ButtonsCirclesNavigation from "../sliders/ButtonsCirclesNavigation";
import Title from "../typography/Title";
import CardStory from "./CardStory";
import { useState } from "react";
import ButtonDefault from "../buttons/ButtonDefault";
import { useTranslations } from "next-intl";

export default function CardsStoriesSliderForTour() {

  const cards = [
    1, 2, 3, 4, 5, 6
  ];
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const tCommon = useTranslations("Common");

  return (
    <>
      <div className="cards-stories-slider-for-tour" data-section="section-testimonials">


        <HeadingContentWidgets
          // className="hide-widgets-on-mobile"
          hideWidgetsOnMobile={true}
          children_content={
            <>
              <Title
                headingType="h3"
                headingStyle="Display-xs-Medium"
                color="--color-text-fg"
              >
                {tCommon("testimonials")}
              </Title>
            </>
          }
          children_widget={
            <>
              <ButtonsCirclesNavigation swiperInstance={swiperInstance} />
            </>
          }
        />


        <Swiper
          slidesPerView={2}
          spaceBetween={0}



          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            // When window width is >= 768px
            850: {
              slidesPerView: 2,
              spaceBetween: 0,
            },
          }}

          pagination={{
            clickable: true,
          }}
          // modules={[Pagination]}
          className="mySwiper"
          onSwiper={(swiper) => {
            setSwiperInstance(swiper)
          }}
        >
          {
            cards.map((card, index) => (
              <SwiperSlide key={index}>
                <CardStory />
              </SwiperSlide>
            ))
          }
        </Swiper>

        {
          // <ButtonsCirclesNavigation swiperInstance={swiperInstance} className="for-mobile-only" />
        }

        <div className="mobile-story-cards">
          <div className="story-cards-wrap">
            {
              cards.map((card, index) => (
                <SwiperSlide key={index}>
                  <CardStory />
                </SwiperSlide>
              ))
            }
          </div>
          <div className="wrap-button-load-more">
            <ButtonDefault label="Show more" variant="outline-primary" />
          </div>
        </div>


      </div>
    </>
  );
}