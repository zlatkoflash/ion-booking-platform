"use client"

import Image from "next/image";
import ButtonDefault from "../buttons/ButtonDefault";
import ZBadge from "../buttons/ZBadge";
import ZBadgeGroup from "../buttons/ZBadgeGroup";
import HeadingContentWidgets from "../headers/HeadingContentWidgets";
import Title from "../typography/Title";
import SectionContainerCards from "./SectionContainerCards";
import photo_people from "@/assets/images/example-people.png";
import ZPicture from "../illustrations/ZPicture";

export default function ContentPhoto({
  type = "type-default",
  badgesStrings = ["About us"],
  title = "More than just a tour - a better way to experience the city",
  paragraphs = [
    "We connect travelers with passionate local guides who turn ordinary walks into unforgettable experiences. From hidden cafés and quiet streets to iconic landmarks and cultural stories, every route is designed to help you discover the city like a local.",
    "Whether you’re exploring for a day or staying for a week, our curated walking experiences make travel more personal, authentic, and memorable."
  ],
  blueParagraph = "Real people. Real places. Real stories.",
  buttonDetails = {
    label: "Meet our guides",
    link: "https://website.com",
    addArrowOnTheEnd: true
  },
  pictureUrl = photo_people.src,
  desktopRowReverse = false
}: {
  type?: "type-default" | "type-blue"
  badgesStrings?: string[]
  title?: string,
  paragraphs?: string[],
  blueParagraph?: string,
  buttonDetails?: {
    label: string,
    link: string,
    addArrowOnTheEnd: boolean
  } | "do-not-show",
  pictureUrl?: string,
  desktopRowReverse?: boolean
}) {
  return <>
    <div className={`component content-photo ${type}`}>
      <SectionContainerCards>
        <div className={`content-wrap ${desktopRowReverse ? "desktop-row-reverse" : ""}`}>
          <div className="left-content">

            <HeadingContentWidgets
              children_content={<>
                {
                  badgesStrings.length > 0 && <ZBadgeGroup>
                    {
                      // <ZBadge label="About us" />
                    }
                    {
                      badgesStrings.map((badge, index) => (
                        <ZBadge key={index} label={badge} />
                      ))
                    }
                  </ZBadgeGroup>
                }
                <Title
                  headingType="h3"
                  headingStyle="Display-md-Semibold"
                  color="--color-text-fg"
                >
                  {title}
                </Title>
              </>}
            />

            {
              /*<Title
                headingType="p"
                headingStyle="Text-lg-Regular"
                color="--color-text-fg-subtle"
              >
                We connect travelers with passionate local guides who turn ordinary walks into unforgettable experiences. From hidden cafés and quiet streets to iconic landmarks and cultural stories, every route is designed to help you discover the city like a local.
              </Title>
              <Title
                headingType="p"
                headingStyle="Text-lg-Regular"
                color="--color-text-fg-subtle"
              >
                Whether you’re exploring for a day or staying for a week, our curated walking experiences make travel more personal, authentic, and memorable.
              </Title>*/
              paragraphs.map((paragraph, index) => (
                <Title
                  key={index}
                  headingType="p"
                  headingStyle="Text-lg-Regular"
                  color="--color-text-fg-subtle"
                >
                  {paragraph}
                </Title>
              ))
            }

            {
              (blueParagraph && blueParagraph !== "") && (
                <Title headingType="p" headingStyle="Text-xl-Semibold" color="--color-text-fg-on-accent">
                  {blueParagraph}
                </Title>
              )
            }

            {
              // <ButtonDefault label="Meet our guides" addArrowOnTheEnd={true} link="https://website.com" />
              buttonDetails !== "do-not-show" && (
                <ButtonDefault label={buttonDetails.label} addArrowOnTheEnd={buttonDetails.addArrowOnTheEnd} link={buttonDetails.link} />
              )
            }

          </div>

          <ZPicture pictureUrl={pictureUrl} alt={title || ""} />

        </div>
      </SectionContainerCards>
    </div>
  </>;
}