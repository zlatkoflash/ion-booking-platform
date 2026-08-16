"use client"

import IconText from "../buttons/IconText";
import Title from "../typography/Title";
import SectionContainerCards from "./SectionContainerCards";

import ImageLucaMoretti from "@/assets/images/team/luca.jpg"
import ImageGiuliaBianchi from "@/assets/images/team/giulia.jpg"
import ImageMarcoConti from "@/assets/images/team/marco.jpg"
import ImageSofiaRomano from "@/assets/images/team/sofia.jpg"
import ImageMatteoRicci from "@/assets/images/team/matteo.jpg"
import ImageElenaFerraro from "@/assets/images/team/elena.jpg"
import ZPicture from "../illustrations/ZPicture";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ButtonsCirclesNavigation from "../sliders/ButtonsCirclesNavigation";
import { useTranslations } from "next-intl";

export default function OurTeam() {

  const tAboutTranslations = useTranslations("TemplateAboutUs");
  const teamRawData = tAboutTranslations.raw("our_team")

  const TheTeamItems: {
    imageSrc: string;
    name: string;
    role: string;
  }[] = [
      {
        imageSrc: ImageLucaMoretti.src,
        name: teamRawData.people[0].name,
        role: teamRawData.people[0].role,
      },
      {
        imageSrc: ImageGiuliaBianchi.src,
        name: teamRawData.people[1].name,
        role: teamRawData.people[1].role,
      },
      {
        imageSrc: ImageMarcoConti.src,
        name: teamRawData.people[2].name,
        role: teamRawData.people[2].role,
      },
      {
        imageSrc: ImageSofiaRomano.src,
        name: teamRawData.people[3].name,
        role: teamRawData.people[3].role,
      },
      {
        imageSrc: ImageMatteoRicci.src,
        name: teamRawData.people[4].name,
        role: teamRawData.people[4].role,
      },
      {
        imageSrc: ImageElenaFerraro.src,
        name: teamRawData.people[5].name,
        role: teamRawData.people[5].role,
      },
    ];

  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);


  return <>

    <div className="our-team" id="our-team">
      <SectionContainerCards>
        <div className="heading">
          <IconText text={teamRawData.badge_label} type="badge-style" variation="primary" />
          <Title headingType="h2" headingStyle="Display-lg-Semibold" color="--color-text-fg">{teamRawData.title}</Title>
          <Title headingType="p" headingStyle="Text-xl-Regular" color="--color-text-fg-subtle">{teamRawData.paragraph}</Title>
        </div>

        <ul className="grid-team">
          {
            TheTeamItems.map((item, index) => (
              <li key={index}>
                <div className="item-member-wrap">
                  <ZPicture
                    alt={item.name}
                    pictureUrl={item.imageSrc}
                  />
                  <Title headingType="h4" headingStyle="Display-xs-Medium" color="--color-text-fg">{item.name}</Title>
                  <Title headingType="p" headingStyle="Text-md-Medium" color="--color-text-fg-info">{item.role}</Title>
                </div>
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
              TheTeamItems.map((itemObject, index) => (
                <SwiperSlide key={index}>
                  {
                    // reactItem
                    <div className="item-member-wrap">
                      <ZPicture
                        alt={itemObject.name}
                        pictureUrl={itemObject.imageSrc}
                      />
                      <Title headingType="h4" headingStyle="Display-xs-Medium" color="--color-text-fg">{itemObject.name}</Title>
                      <Title headingType="p" headingStyle="Text-md-Medium" color="--color-text-fg-info">{itemObject.role}</Title>
                    </div>
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