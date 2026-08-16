"use client"

import { useTranslations } from "next-intl";
import ZIcon, { ZIconType } from "../icons/ZIcon";
import Title from "../typography/Title";
import SectionContainerCards from "./SectionContainerCards"

export default function ContactReachUsGreedDetails() {

  const tContact = useTranslations("TemplateContact");

  const ItemsFor: {
    icon: ZIconType,
    title: string,
    link: {
      label: string,
      link: string
    },
    description: string
  }[] = tContact.raw("contact-items")/*[
      {
        icon: "call",
        title: "Call us",
        link: {
          label: "+39 347 320 4889",
          link: "tel:+39 347 320 4889"
        },
        description: "Mon–Sat, 9:00–19:00 CET"
      },
      {
        icon: "mail",
        title: "Email us",
        link: {
          label: "info@walkintown.com",
          link: "mailto:info@walkintown.com"
        },
        description: "We reply within 24 hours"
      },
      {
        icon: "social-whatsapp",
        title: "WhatsApp",
        link: {
          label: "+39 347 320 4889",
          link: "https://wa.me/393473204889"
        },
        description: "For quick inquiries"
      },
      {
        icon: "location-on-pin",
        title: "Visit us",
        link: {
          label: "Viale Giuseppe Mazzini, 40",
          link: "https://www.google.com/maps/place/Viale+Giuseppe+Mazzini,+40,+50136+Firenze+FI,+Italy/@43.774786,11.2705459,814m/data=!3m2!1e3!4b1!4m10!1m2!2m1!1sViale+Giuseppe+Mazzini,+40!3m6!1s0x132a540d673aaaab:0x39b91b96665f2a78!8m2!3d43.7747822!4d11.2731208!15sChpWaWFsZSBHaXVzZXBwZSBNYXp6aW5pLCA0MJIBCnN1YnByZW1pc2XgAQA!16s%2Fg%2F11q2x794bc?entry=ttu&g_ep=EgoyMDI2MDgxMi4wIKXMDSoASAFQAw%3D%3D"
        },
        description: "50123 Firenze (FI), Italy"
      }
    ]*/;

  return (
    <>

      <div className="contact-reach-us-greed-details">
        <SectionContainerCards>


          <div className="heading">
            <Title headingType="h3" headingStyle="Display-md-Semibold" color="--color-text-fg">{tContact("contact-items-title")}</Title>
          </div>

          <ul>
            {
              ItemsFor.map((item, index) => {
                return (
                  <li key={index}>
                    <ZIcon type={item.icon} />
                    <Title headingType="h5" headingStyle="Text-lg-Medium" color="--color-text-fg" >{item.title}</Title>
                    <Title headingType="a" headingStyle="Text-xl-Medium" color="--color-text-fg-on-accent" href={item.link.link} target="_blank" >{item.link.label}</Title>
                    <Title headingType="p" headingStyle="Text-md-Regular" color="--color-text-fg-subtle">{item.description}</Title>
                  </li>
                )
              })
            }
          </ul>

        </SectionContainerCards>
      </div>


    </>
  )
}