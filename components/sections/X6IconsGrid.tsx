"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import IconText from "../buttons/IconText";
import { ZIconType } from "../icons/ZIcon";
import ButtonsCirclesNavigation from "../sliders/ButtonsCirclesNavigation";
import Title from "../typography/Title";
import SectionContainerCards from "./SectionContainerCards";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";

export default function X6IconsGrid(
  { items = [], title = "Trending experiences", subtitle = "What other travelers are booking this week" }
    :
    { items?: { title: string, paragraph: string, icon: ZIconType }[], title?: string, subtitle?: string }
) {

  const itemsFor: {
    title: string,
    paragraph: string,
    icon: ZIconType
  }[] = items && items.length > 0 ? items : [
    {
      title: "Discover hidden corners",
      paragraph: "Go beyond the main landmarks and explore places most visitors miss.",
      icon: "location-on-pin"
    },
    {
      title: "Hear the city’s real stories",
      paragraph: "Learn about Florence through local stories, traditions, and everyday life.",
      icon: "import-contacts"
    },
    {
      title: "Enjoy a relaxed pace",
      paragraph: "Take your time, ask questions, and experience the city without rushing.",
      icon: "footprint"
    },
    {
      title: "Meet people, not just places",
      paragraph: "Connect with friendly local guides who make every tour feel personal.",
      icon: "handshake"
    },
    {
      title: "Choose experiences that fit you",
      paragraph: "Find cultural walks, food tours, day trips, and activities for every travel style.",
      icon: "heart-outline"
    },
    {
      title: "Book with confidence",
      paragraph: "Clear details, easy booking, and helpful support before and during your trip.",
      icon: "verified-shield-outline"
    }
  ];

  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  return <>

    <div className="x6-icons-grid">
      <SectionContainerCards>

        <div className="heading">
          <Title headingType="h3" headingStyle="Display-md-Semibold" color="--color-text-fg">{title}</Title>
          <Title headingType="p" headingStyle="Text-lg-Regular" color="--color-text-fg-subtle">
            {subtitle}
          </Title>
        </div>
        <ul className="grid-cards">
          {
            itemsFor.map((item, index) => (
              <li key={index}>
                <IconText type="icon-boxed-title-subttile-vertical" text={item.title} subText={item.paragraph} iconType={item.icon} />
              </li>
            ))
          }
        </ul>


        <div className="slider-mobile-wrap">

          <Swiper
            slidesPerView={1}
            spaceBetween={0}

            onSwiper={(swiper) => setSwiperInstance(swiper)}
            /*pagination={{
              clickable: true,
            }}*/
            // modules={[Pagination]} it works but we don't need here
            className="component z-swiper overflow-visible"
          >
            {
              itemsFor.map((itemObject, index) => (
                <SwiperSlide key={index}>
                  {
                    // reactItem
                    <IconText type="icon-boxed-title-subttile-vertical" text={itemObject.title} subText={itemObject.paragraph} iconType={itemObject.icon} />
                  }
                </SwiperSlide>
              ))
            }
          </Swiper>


          <ButtonsCirclesNavigation swiperInstance={swiperInstance} className="for-mobile-only" />

        </div>



      </SectionContainerCards>
    </div>

  </>
}