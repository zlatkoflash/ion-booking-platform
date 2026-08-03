"use client";

import Image from "next/image";
import experience_example from "@/assets/images/experience-example.png";
import Title from "../typography/Title";
import ButtonDefault from "../buttons/ButtonDefault";
import CardHeadingElements from "./CardHeadingElements";
import IconText from "../buttons/IconText";
import ButtonAddHeart from "../buttons/ButtonAddHeart";
import RatingStars from "../Rating/RatingStars";
import CardCityFooter from "./CardCityFooter";
import PriceGroup from "../typography/PriceGroup";
import { useTranslations } from "next-intl";
import { formatPrice, stripHtml } from "@/utils/strings";
// import React from "react";

export interface ICardExperience {
  id?: string | number;
  image_url?: string;
  location?: string;
  // rating?: number;
  // review_count?: number;
  title?: string;
  description?: string;
  bottomLabel?: string;
  // price?: number;
  coverURL?: string;
  priceFrom?: number;
  discountPercent?: number;
  onClickHeart?: (state: boolean) => void;
  isFor?: "experience" | "city",
  haveHeart?: boolean,
  reviews?: {
    count: number;
    sumValues: number;
  },
  elementForLeftLabelPLace?: React.ReactNode;
  link?: string;
}

export default function CardExperience({ details = {
  image_url: "",
  location: "",
  // rating: 0,
  // review_count: 0,
  title: "",
  description: "",
  bottomLabel: "by Walks in town srl • 3h 30m",
  // price: 0,
  coverURL: "",
  priceFrom: 0,
  discountPercent: 0,
  onClickHeart: (state: boolean) => { },
  isFor: "experience",
  haveHeart: false,
  reviews: {
    count: 0,
    sumValues: 0
  },
  elementForLeftLabelPLace: undefined,
  link: ""
} }: { details?: ICardExperience }) {

  const tCommon = useTranslations("Common");

  // console.log("Final Details:", details);

  return (
    <>
      <div className={`component card-city card-experience `} data-id={details.id}>
        <Image src={details.coverURL || experience_example} alt={details.title || "City example"} width={400} height={400} />
        <div className="content">

          <CardHeadingElements

            leftContent={<IconText
              // text="Florence, Italy" 
              text={details.location || "-"}
              iconType="pin-outline" type="card-city-label-content-heading" />}

            rightContent={<RatingStars type="star-count-reviews" text={`(${details.reviews?.count} ${tCommon("reviews")})`} sumValues={details.reviews?.sumValues || 0} countReviews={details.reviews?.count} colorsType="warning-style" />}

            type="heading-static"

          />


          <Title headingType="h4" headingStyle="Text-xl-Medium" color="--color-text-fg">
            {details.title}
          </Title>
          <Title headingType="p" headingStyle="Text-md-Regular" color="--color-text-fg-subtle" className="paragraph">
            {stripHtml(details.description || "")}
          </Title>
          <Title headingType="p" headingStyle="Text-sm-Regular" color="--color-text-fg">
            {details.bottomLabel}
          </Title>
          <CardCityFooter
            leftChildren={<>
              <PriceGroup
                price={details.priceFrom as number}
                discountPercent={details.discountPercent}
                type="standard"
              />
            </>}
            rigthChildren={<>
              <ButtonDefault label={tCommon("view_details")} link={details.link} />
            </>}
          />
        </div>

        <CardHeadingElements
          leftContent={
            details.elementForLeftLabelPLace
              ?
              details.elementForLeftLabelPLace :
              <IconText text={tCommon("likely_to_sell_out")} iconType="fire-outline" type="card-city-label" />
          }
          rightContent={
            <ButtonAddHeart
              onChangeState={details.onClickHeart}
              isFor={details.isFor}
              id={details.id}
              isClicked={details.haveHeart}
            />
          }
        />
      </div>
    </>
  );
}
