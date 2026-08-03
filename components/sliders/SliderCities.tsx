"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper"; // Import types if needed
// import required modules
// import { Pagination } from "swiper/modules";
import HeadingContentWidgets from "../headers/HeadingContentWidgets";
import SectionContainerCards from "../sections/SectionContainerCards";
import Title from "../typography/Title";

import ButtonsCirclesNavigation from "./ButtonsCirclesNavigation";
import CardCity from "./CardCity";
import CardCityCommingSoon from "./CardCityCommingSoon";
import CardCityWhatIsComming from "./CardCityWhatIsComming";
import { useEffect, useState } from "react";

export interface ICardCity {
  image_url?: string;
  title?: string;
  subTitle?: string;
  link?: string;
  coming_soon?: boolean;
}

export default function SliderCities({ items = [], title = "Where will you walk next?", subTitle = "What other travelers are booking this week" }: { items?: ICardCity[], title?: string, subTitle?: string }) {

  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true)
  }, []);

  return (
    <SectionContainerCards hiddenOverflow={true}>
      <HeadingContentWidgets
        // className="hide-widgets-on-mobile"
        hideWidgetsOnMobile={true}
        children_content={
          <>
            <Title
              headingType="h2"
              headingStyle="Display-md-Semibold"
              color="--color-text-fg"
            >
              {title}
            </Title>
            <Title
              headingType="p"
              headingStyle="Text-lg-Regular"
              color="--color-text-fg-subtle"
            >
              {subTitle}
            </Title>
          </>
        }
        children_widget={
          <>
            <ButtonsCirclesNavigation swiperInstance={swiperInstance} />
          </>
        }
      />
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
                  (() => {
                    if (itemObject.coming_soon) {
                      return <CardCityCommingSoon details={itemObject} />
                    }
                    return <CardCity details={itemObject} />
                  })()
                }
              </SwiperSlide>
            ))
            /*<SwiperSlide>
              <CardCity />
            </SwiperSlide>
            <SwiperSlide>
              <CardCityCommingSoon />
            </SwiperSlide>
            <SwiperSlide>
              <CardCityCommingSoon />
            </SwiperSlide>
            <SwiperSlide>
              <CardCityWhatIsComming />
            </SwiperSlide>
            <SwiperSlide>
              <CardCity />
            </SwiperSlide>
            <SwiperSlide>
              <CardCity />
            </SwiperSlide>
            <SwiperSlide>
              <CardCity />
            </SwiperSlide>*/
          }
          <SwiperSlide>
            <CardCityWhatIsComming />
          </SwiperSlide>
        </Swiper>
      }

      <ButtonsCirclesNavigation swiperInstance={swiperInstance} className="for-mobile-only" />

    </SectionContainerCards>
  );
}
