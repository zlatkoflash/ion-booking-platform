import Image from "next/image";
import Title from "../typography/Title";
import ButtonDefault from "../buttons/ButtonDefault";
import city_example from "@/assets/images/city-example.png";
import IconText from "../buttons/IconText";
import CardHeadingElements from "./CardHeadingElements";
import { ICardCity } from "./SliderCities";
import { useTranslations } from "next-intl";

export default function CardCityCommingSoon({ details = {
  image_url: "",
  title: "Rome",
  subTitle: "Be first to walk with us",
  link: "/",
  coming_soon: true
} }: { details: ICardCity }) {

  const tCommon = useTranslations("Common");

  return (
    <>
      <div className="component card-city">
        <Image src={details.image_url ? details.image_url : city_example} alt={details.title ? details.title : "City example"} width={400} height={400} />
        <div className="content">
          <Title headingType="h4" headingStyle="Display-sm-Semibold" color="--color-text-fg">
            {details.title}
          </Title>
          <Title headingType="p" headingStyle="Text-lg-Medium" color="--color-text-fg-subtle">{tCommon("be_first_to_walk_with_us")}</Title>
          <ButtonDefault label={tCommon("join_waitlist")} variant="outline-primary" link={details.link} />
        </div>

        {
          /*<div className="component card-city-heading-elements">
          <div className="left-content">
            <IconText text="Coming soon" iconType="hourglass-top" type="card-city-label" />
          </div>
          <div className="right-content">

          </div>
        </div>*/
        }
        <CardHeadingElements
          leftContent={<IconText text="Coming soon" iconType="hourglass-top" type="card-city-label" />}
          rightContent={<></>}
        />

      </div>
    </>
  );
}