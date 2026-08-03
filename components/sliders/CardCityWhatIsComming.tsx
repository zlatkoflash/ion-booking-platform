import ButtonDefault from "../buttons/ButtonDefault";
import Title from "../typography/Title";
import illustration_more_cities from "@/assets/images/illustration-more-cities.svg";
import { useTranslations } from "next-intl";

export default function CardCityWhatIsComming() {

  const tCommon = useTranslations("Common");

  return (
    <>
      <div className="component card-city comming-soon">
        <div className="illustration-wrap">
          <img src={illustration_more_cities.src} alt="See what’s coming" />
        </div>
        <div className="content">
          <Title headingType="h4" headingStyle="Display-sm-Semibold" color="--color-text-fg">
            {tCommon("more_cities")}
          </Title>
          <Title headingType="p" headingStyle="Text-lg-Medium" color="--color-text-fg-subtle">{tCommon("were_expanding")}</Title>
          <ButtonDefault label={tCommon("see_what_is_comming")} variant="outline-primary" />
        </div>
      </div>
    </>
  );
}