"use client";

import { useTranslations } from "next-intl";
import RatingStars from "./RatingStars";
import X4PeopleThatRate from "./X4PeopleThatRate";

export default function RatingWidget({ type = "for-header" }: { type?: "for-header" | "for-banner-newsletter" }) {

  const tCommon = useTranslations("Common");

  return (
    <>
      <div className={`component rating-widget ${type}`}>
        <X4PeopleThatRate type={type === "for-header" ? "default" : "for-the-banner"} />
        <RatingStars
          sumValues={21000}
          countReviews={4433}
          type={type === "for-header" ? "star-text" : "banner-newsletter-star"}
          textAfterPoint={
            <>
              {tCommon('from')} <strong>4,433+</strong> {tCommon('happy_guests')}
            </>
          }
        />
      </div>
    </>
  );
}
