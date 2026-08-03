"use client";

import ButtonDefault from "../buttons/ButtonDefault";
import IconText from "../buttons/IconText";
import ZIcon from "../icons/ZIcon";
import ZPicture from "../illustrations/ZPicture";
import RatingWidget from "../Rating/RatingWidget";
import Title from "../typography/Title";
import SectionContainerCards from "./SectionContainerCards";
import illustration_x2_photos from "@/assets/images/illustrations-cards.png";
import illustration_nevelope_opening from "@/assets/images/illustration-envelope-opened-fixed-sizes.png";
import FormNewsLetter from "../forms/forms-sections/FormNewsLetter";
import { ButtonVariant } from "react-bootstrap/esm/types";
import { useTranslations } from "next-intl";

export default function SubscribeBanner({
  type,
  yellowContent = {
    // title: "Ready to Walk?",
    title: '',
    // subtitle: "Experience Florence the right way",
    subtitle: "",
    photoPath: illustration_x2_photos.src,
    /*buttons: [
      {
        label: "Book your Florence tour now",
        variant: "warning",
        link: "/",
        addArrowOnTheEnd: true
      },
      {
        label: "Join Rome & Venice waitlist",
        variant: "outline-primary",
        link: "/",
        addArrowOnTheEnd: true
      }
    ]*/
    buttons: []
  }
}: {
  type?: "default" | "show-only-yellow-content",
  yellowContent?: {
    title: string;
    subtitle: string;
    photoPath: string;
    buttons: {
      label: string;
      variant: ButtonVariant;
      link: string;
      addArrowOnTheEnd: boolean;
    }[];
    // rating?:boolean;
  }
}) {

  const tCommon = useTranslations("Common");

  const buttonsFor = () => {
    if (yellowContent.buttons.length > 0) {
      return yellowContent.buttons;
    }
    return [
      {
        label: tCommon("book_your_florence_tour_now"),
        variant: "warning",
        link: "/",
        addArrowOnTheEnd: true
      },
      {
        label: tCommon("join_rome_venice_waitlist"),
        variant: "outline-primary",
        link: "/",
        addArrowOnTheEnd: true
      }
    ];
  }

  return <>

    <div className={`component subscribe-banner ${type}`}>
      <SectionContainerCards>
        <div className="yellow-content">

          <div className="left-content">
            <Title headingType="h3" headingStyle="Display-md-Semibold" color="--color-text-fg">
              {
                yellowContent.title === "" ?
                  tCommon("ready_to_walk") : yellowContent.title
              }
            </Title>
            <Title headingType="p" color="--color-text-fg-subtle" headingStyle="Text-lg-Regular">
              {
                yellowContent.subtitle === "" ?
                  tCommon("experience_city_the_right_way") : yellowContent.subtitle
              }
            </Title>

            <div className="navigation-buttons">
              {
                /*<ButtonDefault label="Book your Florence tour now" variant="warning" link="https://webstite.com" addArrowOnTheEnd={true} />
              <ButtonDefault label="Join Rome & Venice waitlist" variant="outline-primary" link="https://webstite.com" addArrowOnTheEnd={true} />*/
                buttonsFor().length > 0 &&
                <>
                  {buttonsFor().map((button, index) => (
                    <ButtonDefault
                      key={'button-' + index}
                      label={button.label}
                      variant={button.variant}
                      link={button.link}
                      addArrowOnTheEnd={button.addArrowOnTheEnd}
                    />
                  ))}
                </>
              }
            </div>

            <RatingWidget type="for-banner-newsletter" />
          </div>

          <ZPicture pictureUrl={yellowContent.photoPath} type="contain" alt={yellowContent.title} />

        </div>
        <div className="component footer-subscribing">
          <IconText type="for-subscribe-panel" iconSrc={illustration_nevelope_opening.src} text={tCommon("subscribtionForm.label")} />
          <FormNewsLetter />
        </div>
      </SectionContainerCards>
    </div>

  </>;
}