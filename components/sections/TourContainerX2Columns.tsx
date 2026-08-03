"use client";

import { setTourMobileSectionActive } from "@/redux/controls/controlsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

export default function TourContainerX2Columns(
  {
    leftChildren, rightChildren, type = "default", hideRightColumnInMobile = false,
    initialMobileVisibleSection = "",
    importantShowRightColumnInMobile = false
  }
    :
    {
      leftChildren: React.ReactNode | React.ReactNode[], rightChildren: React.ReactNode | React.ReactNode[],
      type?: "default" | "for-payment-flow" | "for-shopping-cart",
      hideRightColumnInMobile?: boolean,
      initialMobileVisibleSection?: string,
      importantShowRightColumnInMobile?: boolean
    }) {

  // const [mobileSelectingVisibleInit, set_mobileSelectingVisibleInit] = useState(mobileVisibleSection);
  const tourMobileSectionActive = useAppSelector((state) => state.controls.tourMobileSectionActive);
  const dispatch = useAppDispatch();

  useEffect(() => {

    if (tourMobileSectionActive === "" && initialMobileVisibleSection && initialMobileVisibleSection !== "") {
      dispatch(setTourMobileSectionActive(initialMobileVisibleSection))
    }

  }, []);


  return (
    <section className={`component tour-container-x2-columns ${type}`} data-mobile-visible-section={tourMobileSectionActive}>
      <Container>
        <Row>
          <Col>
            <div className="left-wrap">{leftChildren}</div>
            <div className={`right-wrap ${hideRightColumnInMobile ? "hide-right-column-in-mobile" : ""} ${importantShowRightColumnInMobile ? "show-in-mobile" : ""}`}>{rightChildren}</div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}