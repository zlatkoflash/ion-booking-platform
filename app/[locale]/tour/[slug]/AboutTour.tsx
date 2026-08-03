"use client";

import IconText from "@/components/buttons/IconText";
import Title from "@/components/typography/Title";
import { IDBTourIncludeDetails } from "@/utils/interface-database";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function AboutTour(
  {
    tour = null
  }
    :
    {
      tour?: IDBTourIncludeDetails | null
    }
) {

  const [showMore, set_showMore] = useState(false);

  /*const tourCategories = [
    "WALKING_TOUR",
    "CULTURAL_AND_THEME_TOURS",
    "LUXURY_AND_SPECIAL_OCCASIONS",
    "MUSEUMS_AND_EXHIBITIONS",
    "SIGHTSEEING_ATTRACTION",
    "SKIP_THE_LINE",
    "CITY_TOURS",
    "SIGHTSEEING",
    "EDUCATIONAL_TOUR"
  ];*/


  const tCommon = useTranslations("Common");


  /*const activeCategory = () => {
    if (!tour?.categories?.length) return "WALKING_TOUR";
    return tour.categories[Math.floor(Math.random() * tour.categories.length)];
  }*/


  // 1. Set a reliable default state string that matches what the server can output
  const [selectedCategory, set_selectedCategory] = useState("WALKING_TOUR");


  // 2. Safely pick the random category only after the client mounts
  useEffect(() => {
    if (tour?.categories?.length) {
      const randomCat = tour.categories[Math.floor(Math.random() * tour.categories.length)];
      set_selectedCategory(randomCat);
    }
  }, [tour]);



  if (tour === null)
    return (
      <div className="component content-about-tour-block">
        <div className="heading">
          <Title color="--color-text-fg" headingType="h2" headingStyle="Display-xs-Medium">About Tour</Title>
          <IconText iconType="pin-distance-outline" type="card-city-label-content-heading" text={`Florence, Italy • Renaissance Art Guide`} />
        </div>
        <div className={`content-paragraphs-wrap ${showMore === true ? 'show-more-yes' : ""}`}>
          <Title headingType="paragraphs" headingStyle="Text-md-Medium" color="--color-text-fg-subtle">
            <p>Embark on an unforgettable guided tour through the heart of Florence, exploring the magnificent monuments of the Santa Maria del Fiore Cathedral complex. Start your journey at the Baptistery, where you'll marvel at the stunning mosaics and the original "Gates of Paradise" bronze doors. Next, head to the Cathedral Museum, home to priceless works of Renaissance art, including Michelangelo's Pietà and Donatello's masterpieces. As you admire these incredible pieces, your expert guide will unravel the fascinating stories and secrets behind their creation.</p>
            <p>
              After experiencing the museum, take in the breathtaking exterior of the Florence Cathedral. Learn about its unique architecture and the centuries-long effort to complete this masterpiece. Then, prepare for the highlight of the tour: a visit to the dome, where you'll ascend to the top for panoramic views of the city. This exclusive access to the dome is a rare opportunity not available to most tourists.
            </p>
          </Title>

          <div className="bottom-button">
            <Title href="#" headingType="a" headingStyle="Text-md-Medium" color="--color-text-fg-on-accent" onClick={(e) => {
              e.preventDefault();
              set_showMore(true);
              console.log("is working");
            }}>{tCommon("more")}</Title>
          </div>
        </div>
      </div>
    );



  return (
    <div className="component content-about-tour-block" data-section="section-overview">
      <div className="heading">
        <Title color="--color-text-fg" headingType="h2" headingStyle="Display-xs-Medium">{tCommon("about_tour")}</Title>
        <IconText iconType="pin-distance-outline" type="card-city-label-content-heading" text={`${tour.location.city}, ${tour.location.country} • ${tCommon(`tour_categories.${selectedCategory}`)}`} />
      </div>
      <div className={`content-paragraphs-wrap ${showMore === true ? 'show-more-yes' : ""}`}>
        <Title headingType="paragraphs" headingStyle="Text-md-Medium" color="--color-text-fg-subtle">
          <div dangerouslySetInnerHTML={{ __html: tour.description as string }} />
        </Title>

        <div className="bottom-button">
          <Title href="#" headingType="a" headingStyle="Text-md-Medium" color="--color-text-fg-on-accent" onClick={(e) => {
            e.preventDefault();
            set_showMore(true);
            console.log("is working");
          }}>{tCommon("more")}</Title>
        </div>
      </div>
    </div>
  );
}