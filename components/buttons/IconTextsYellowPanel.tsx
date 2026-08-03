"use client";

import { Col, Container, Row } from "react-bootstrap";
import IconText from "./IconText";
import { useTranslations } from "next-intl";

export default function IconTextsYellowPanel() {

  const tCommon = useTranslations("Common");

  return (
    <>
      <section className="component icon-texts-yellow-panel">
        <Container>
          <Row>
            <Col className="icons-wrap">
              <IconText
                iconType="warning-shield"
                text={tCommon("verified_guided")}
                type="for-yellow-panel"
              />
              <IconText
                iconType="star-outline"
                text={tCommon("skip_line")}
                type="for-yellow-panel"
              />
              <IconText
                iconType="people"
                text={tCommon("small_groups")}
                type="for-yellow-panel"
              />
              <IconText
                iconType="backward"
                text={tCommon("free_cancelation")}
                type="for-yellow-panel"
              />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
