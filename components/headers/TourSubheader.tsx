import { Col, Container, Row } from "react-bootstrap";
import IconText from "../buttons/IconText";
import Title from "../typography/Title";
import ButtonAddHeart from "../buttons/ButtonAddHeart";
import ButtonShare from "../buttons/ButtonShare";
import ButtonBack from "../buttons/ButtonBack";
import gold_trophy from "@/assets/images/icon-gold-trophy.svg";
import gold_star from "@/assets/images/icon-google-star.svg";
import PaymentFlowProgress from "./PaymentFlowProgress";
import { useTranslations } from "next-intl";

export default function TourSubheader(
  {
    type = "default",
    title = "Duomo Area Tour with Brunelleschi's Dome Climb Ticket",
    subject_id = 0,
    wishlistHeartClicked = false,
    activeStep = "booking-information",
    completedSteps = [],
    showTheBadges = true,
    showTheHeartAndShare = true
  }
    :
    {
      type?: 'default' | "for-payment-flow" | "for-confirm-page" | "for-not-valid-booking";
      title?: string;
      subject_id?: string | number;
      wishlistHeartClicked?: boolean;
      activeStep?: "booking-information" | "payment-details";
      completedSteps?: string[];
      showTheBadges?: boolean;
      showTheHeartAndShare?: boolean;
    }
) {

  const tCommon = useTranslations("Common");
  const tForms = useTranslations("Forms");

  return <>
    <section className="component tour-subheader">
      <Container>
        <Row>
          <Col>
            {
              type === "default" && <>
                <div className="heading-navigation">
                  <div className="left-content">
                    <ButtonBack />
                  </div>
                  {
                    showTheHeartAndShare &&
                    <div className="right-content">
                      <ButtonAddHeart type="type-icon-text-button" isClicked={wishlistHeartClicked} isFor="experience" id={subject_id} hideTextOnMobile={true} />
                      <ButtonShare hideTextOnMobile={true} />
                    </div>
                  }
                </div>
                <div className="heading">

                  <Title headingType="h1" headingStyle="Display-sm-Medium" color="--color-text-fg-on-accent">
                    {title}
                  </Title>

                  {
                    showTheBadges && <div className="component subheader-group-icon-texts">
                      <IconText type="subheader-gold-trophies" text={tCommon("badge_of_exellence")} iconSrc={gold_trophy.src} />
                      <IconText type="subheader-gold-trophies" text={tCommon("recommended_by_travellers", { percent: 93 })} iconSrc={gold_star.src} />
                    </div>
                  }


                </div>
              </>
            }

            {
              type === "for-payment-flow" && <>
                <div className="heading-navigation">
                  <div className="left-content">
                    <ButtonBack />
                  </div>
                  <div className="right-content">
                  </div>
                </div>
                <PaymentFlowProgress
                  activeStep={activeStep} completedSteps={completedSteps}
                  hideOnMobile={true}
                />
                <PaymentFlowProgress
                  activeStep={activeStep} completedSteps={completedSteps}
                  hideOnDesktop={true}
                  steps={[
                    { label: "booking-information", title: tForms("contact_details"), subtitle: "" },
                    // { label: "booking-information-ticket-info", title: "Ticket Info", subtitle: "" },
                    { label: "payment-details", title: tForms("payment_details"), subtitle: "" },
                  ]}
                />
              </>
            }

            {
              type === "for-confirm-page" && <>
                <div className="heading-navigation">
                  <div className="left-content">
                    <ButtonBack />
                  </div>
                  <div className="right-content">
                  </div>
                </div>
              </>
            }
            {
              type === "for-not-valid-booking" && <>
                <>
                  <div className="heading-navigation">
                    <div className="left-content">
                      <ButtonBack />
                    </div>
                    <div className="right-content">
                    </div>
                  </div>

                  <IconText type="icon-text-alert" variation="warning" text="Booking Unavailable" iconType="danger-outline"
                    fullWidthCentered={true} className="my-5"
                  />

                  <div></div>

                </>
              </>
            }
          </Col>
        </Row>
      </Container>
    </section>
  </>;
}