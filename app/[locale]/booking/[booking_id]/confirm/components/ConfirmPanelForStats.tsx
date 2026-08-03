"use client";

import ZIcon from "@/components/icons/ZIcon";
import Title from "@/components/typography/Title"
import { useState } from "react";
import { Col, Collapse, Container, Row } from "react-bootstrap"

export default function ConfirmPanelForStats(
  {
    children = <></>,
    title = "Booking Confirmation",
    headingRightContent = null,
    headingTitleType = "h3",
    typeContent = "default",
    initCollapseOpen = false,
    headingColumnOpositeInMobile = false
  }
    :
    {
      children?: React.ReactNode | null,
      title?: string,
      headingRightContent?: React.ReactNode | null,
      headingTitleType?: "div" | "a" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "paragraphs";
      typeContent?: 'default' | "collapse-content",
      initCollapseOpen?: boolean,
      headingColumnOpositeInMobile?: boolean
    }
) {

  const [collapseIsOpen, setCollapseIsOpen] = useState(initCollapseOpen);

  return <>

    <div className={`confirm-panel-for-stats ${typeContent}`}>
      <Container>
        <Row>
          <Col>
            <div className="inner-content-wrap">
              <div className={`heading ${headingColumnOpositeInMobile ? 'column-oposite-in-mobile' : ''}`} onClick={() => {
                if (typeContent === "collapse-content") {
                  setCollapseIsOpen(!collapseIsOpen);
                }
              }}>
                {
                  headingTitleType === "h3" && <Title headingType="h3" headingStyle="Display-xs-Medium" color="--color-text-fg">
                    {title}
                  </Title>
                }
                {
                  headingTitleType === "h4" && <Title headingType="h4" headingStyle="Text-lg-Semibold" color="--color-text-fg">
                    {title}
                  </Title>
                }

                {
                  headingRightContent !== null &&
                  <div className="right-content">
                    {headingRightContent}
                  </div>
                }

                {
                  typeContent === "collapse-content" && <ZIcon type="arrow-right" className={collapseIsOpen ? 'is-opened' : ''} />
                }
              </div>

              {
                typeContent === "default" && <>
                  {children}
                </>
              }

              {
                typeContent === 'collapse-content' && <Collapse in={collapseIsOpen}>
                  <div className="payment-history-collapse">
                    <div className="final-content-holder">
                      <div>
                        {/* Payment history details go here */}
                        {children}
                      </div>
                    </div>
                  </div>
                </Collapse>
              }

            </div>
          </Col>
        </Row>
      </Container>
    </div>

  </>
}