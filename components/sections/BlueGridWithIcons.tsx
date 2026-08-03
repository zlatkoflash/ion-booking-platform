import { useTranslations } from "next-intl";
import IconText from "../buttons/IconText";
import Title from "../typography/Title";
import BlueGridIcons from "./BlueGridIcons";
import SectionContainerCards from "./SectionContainerCards";
import IllustrationX2Pictures from "@/assets/images/illustration-x2-pictures.svg";

export default function BlueGridWithIcons() {

  const tCommon = useTranslations("Common");

  return (
    <>
      <div className="component blue-grid-with-icons">
        <SectionContainerCards>
          <Title headingType="h3" headingStyle="Display-md-Semibold">{tCommon("more_than_just_a_tour")}</Title>
          <BlueGridIcons />
          <hr />
          <IconText type="illustration-title-subtitle" iconSrc={IllustrationX2Pictures.src} text={`${tCommon("our_mission")}:`} subText={tCommon("turning_every_mile_into_a_smile")} />
        </SectionContainerCards>
      </div>
    </>
  );
}