"use client"

import icon_star from "@/assets/images/icon-star.svg";
import Image from "next/image";
import ZIcon from "../icons/ZIcon";
import { useTranslations } from "next-intl";

export default function RatingStars({
  type = "star-text",
  // ratingReviews = 0,
  sumValues = 0,
  text,
  countReviews = 0,
  textAfterPoint = "rating",
  colorsType = "default-style",
  profileImageURL = "",
  profileName = ""
}: {
  type?: "star-text" | "stars" | "star-count-reviews" | "story-profile-stars" | "tripadvisor-stars"
  | "banner-newsletter-star";
  sumValues: number;
  // ratingReviews?: number;
  countReviews?: number;
  text?: React.ReactNode;
  textAfterPoint?: React.ReactNode;
  colorsType?: "default-style" | "warning-style";
  profileImageURL?: string;
  profileName?: string;
}) {


  const t = useTranslations("Common");
  let value = (countReviews == 0 ? 0 : (sumValues || 0) / countReviews);
  value = Math.round(value * 10) / 10;


  return (
    <div className={`component rating-stars ${type} ${colorsType}`}>
      {(() => {
        if (type === "star-count-reviews") {
          return (
            <>
              <img src={icon_star.src} alt="star" />
              <span className="rating mobile">{value}</span>
              <span className="rating desktop">({countReviews} {t("reviews")})</span>
            </>
          )
        }
        else if (type === "story-profile-stars") {
          return (
            <>
              <Image src={profileImageURL} alt="star" width={80} height={80} />
              <div className="right-content">
                <span className="user-name">{profileName}</span>
                <span className="rating"><RatingX5Stars value={value} /> {value}</span>
              </div>
            </>
          )
        }
        else if (type === "tripadvisor-stars") {
          return <>
            {t("excellent")} <RatingX5Stars value={value} /> 4.9
            <p>{t("based_on")} {countReviews} {t("reviews")}</p>
          </>
        }
        else if (type === "banner-newsletter-star") {
          return <>
            <ZIcon type="star-for-rating" />
            {
              // <span className="rating mobile">{value}</span>
            }
            <span className="rating desktop">{value}</span>
            {textAfterPoint && (
              <>
                <span className="separator">•</span>
                <span className="text-after-point">{textAfterPoint}</span>
              </>
            )}
          </>
        }
        return (
          <>
            <img src={icon_star.src} alt="star" />
            {
              // <span className="rating mobile">{value}</span>
            }
            <span className="rating desktop">{value} <span className="label-show-only-in-desktop">{t("rating")}</span></span>
            {textAfterPoint && (
              <>
                <span className="separator">•</span>
                <span className="text-after-point">{textAfterPoint}</span>
              </>
            )}
          </>
        );
      })()}
    </div>
  );
}

function RatingX5StarsBase() {
  return (
    <div className="base-stars">
      {
        [1, 2, 3, 4, 5].map((_, index) => (
          <ZIcon type="star-for-rating" key={index} />
        ))
      }
    </div>
  )
}
function RatingX5Stars({ value }: { value: number }) {
  return <>
    <div className="component x5-stars">
      <RatingX5StarsBase />
      <div className="overlay-stars" style={{ width: `${(value / 5) * 100}%` }}>
        <RatingX5StarsBase />
      </div>
    </div>
  </>
}
