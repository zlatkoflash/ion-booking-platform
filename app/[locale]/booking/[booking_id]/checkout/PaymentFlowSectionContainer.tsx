"use client";

import IconText from "@/components/buttons/IconText";
import Title from "@/components/typography/Title";
import { useState } from "react";
import { Collapse } from "react-bootstrap";

export default function PaymentFlowSectionContainer(
  {
    children,
    title,
    subtitle = "",
    showContent = false,
    topRightIconText,
    headingAdditionalContent = null,
    className = ""
  }
    :
    {
      children?: React.ReactNode;
      title: string;
      subtitle?: string;
      showContent?: boolean;
      topRightIconText?: React.ReactNode;
      headingAdditionalContent?: React.ReactNode | React.ReactNode[] | null,
      className?: string
    }) {

  //const [contentIsVisible, setContentIsVisible] = useState(false);

  return (
    <>
      <div className={`payment-flow-section-container ${className}`}>
        <div className="heading">
          <Title headingType="h2" headingStyle="Display-xs-Medium" color="--color-text-fg" className={
            (subtitle === "") && !headingAdditionalContent ? "mb-0" : ""
          }>{title}</Title>
          {
            subtitle !== "" && <Title headingType="p" headingStyle="Text-md-Regular" color="--color-text-fg-subtle">{subtitle}</Title>
          }


          {
            headingAdditionalContent
          }


          {
            // <IconText type="payment-flow-secure-form" iconType="lock-outline" text="Secure Form" className="secure-form-label" />
          }
          {topRightIconText}
        </div>
        {
          children && <Collapse in={showContent}>
            <div>
              <div className="content-container">
                {children}
              </div>
            </div>
          </Collapse>
        }

      </div>
    </>
  )
}