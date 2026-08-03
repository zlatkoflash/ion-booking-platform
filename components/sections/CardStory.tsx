import { DateToFormatMar52026 } from "@/utils/dates-times";
import RatingStars from "../Rating/RatingStars";
import Title from "../typography/Title"
import example_profile_image from "@/assets/images/example-profile-image.png";
import { useTranslations } from "next-intl";

export default function CardStory() {

  const tForms = useTranslations("Forms");

  return (
    <div className="component card-story">
      <RatingStars type="story-profile-stars" sumValues={4.5} countReviews={0} profileName="Lili Poppins" profileImageURL={example_profile_image.src} />
      <Title headingType="p" headingStyle="Text-md-Regular" color="--color-text-fg">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Title>
      <Title headingType="p" headingStyle="Text-sm-Regular" color="--color-text-fg-subtle">
        {DateToFormatMar52026("2026-05-05", tForms("locale_code"))}
      </Title>
    </div>
  );
}