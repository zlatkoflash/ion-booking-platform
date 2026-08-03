"use client";

import { Accordion } from "react-bootstrap";
import Title from "../typography/Title";
import SectionContainerCards from "./SectionContainerCards";
import ZIcon from "../icons/ZIcon";
import { useTranslations } from "next-intl";

export default function FAQs({
  items = []
}: {
  items?: {
    title: string,
    content: React.ReactNode | string
  }[]
}) {

  const tCommon = useTranslations('Common');

  const itemsFor = (): {
    title: string,
    content: React.ReactNode | string
  }[] => {
    if (items.length > 0)
      return items;

    return tCommon.raw("faqs");
  }

  return <>
    <div className="component faqs">
      <SectionContainerCards>
        <div className="heading">

          <Title headingType="h3" headingStyle="Display-md-Semibold" color="--color-text-fg">
            Plan your visit
          </Title>

          <Title headingType="p" headingStyle="Text-lg-Regular" color="--color-text-fg-subtle">
            Frequently asked questions
          </Title>

        </div>

        <Accordion defaultActiveKey="0" className="component">
          {
            itemsFor().map((item, index) => {
              return (
                <Accordion.Item eventKey={index.toString()} key={`item-${index}`}>
                  <Accordion.Header>
                    <span>{item.title}</span>
                    <div className="plus-minus-wrap">
                      <ZIcon type="plus-circle" />
                      <ZIcon type="minus-circle" />
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    {item.content}
                  </Accordion.Body>
                </Accordion.Item>
              )
            })
          }
        </Accordion>

      </SectionContainerCards>
    </div>
  </>
}