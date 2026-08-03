"use client";

import ButtonDefault from "@/components/buttons/ButtonDefault";
import IconText from "@/components/buttons/IconText";
import { useTranslations } from "next-intl";
import { Col, Container, Row } from "react-bootstrap";

export default function SectionContactSupport() {

  const tCommon = useTranslations("Common");

  return (
    <>
      <div className="contact-support-panel">
        <Container>
          <Row>
            <Col>
              <div className="content-inner-wrap">


                <IconText
                  type="for-yellow-panel"
                  text={tCommon('need_to_change_or_cancel_your_booking')}
                  iconType="quiz"
                />

                <ButtonDefault label={tCommon('contact_support')} link="#" addArrowOnTheEnd={true} variant="link" />

              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}