import Title from "../typography/Title";
import SectionContainerCards from "./SectionContainerCards";

export default function TermsAndConditionsContent(

  {
    headingParagraph = "By accessing our website or completing a booking, you confirm that you have read, understood, and agreed to these Terms and Conditions. Please read them carefully before making a reservation.",
    content = []
  }
    :
    {
      headingParagraph?: string,
      content?: {
        title: string,
        paragraphs: (string | {
          type: "list", items: string[]
        })[],
        subcontent?: {
          title: string,
          paragraphs: string[]
        }
      }[]
    }

) {


  const itemsContentData: {
    title: string,
    paragraphs: (string | {
      type: "list", items: string[]
    })[],
    subcontent?: {
      title: string,
      paragraphs: string[]
    }
  }[] = content !== undefined && content.length > 0 ? content : [
    {
      title: "About Walks in Town and Scope of Services",
      paragraphs: [
        "Walks in Town Srl is an authorized Italian tour operator based in Florence.",
        "Services may be provided directly by Walks in Town or together with selected guides, transport providers, attractions, and other travel partners.",
        "Company details:",
        "Walks in Town Srl<br/> Viale Giuseppe Mazzini, 40<br/> 50123 Firenze (FI), Italy<br/> VAT Number: IT 07264710489<br/> Chamber of Commerce: FI-691303"
      ]
    },
    {
      title: "Booking and Confirmation",
      paragraphs: [
        "Customers must provide accurate information when making a booking.",
        "A booking is confirmed only after payment has been successfully completed and a confirmation email has been issued.",
        "Please check the tour, date, time, number of participants, and meeting point immediately after booking.",
        `Any errors should be reported to <a href="mailto:info@walkintown.com">info@walkintown.com</a> as soon as possible.`
      ]
    },
    {
      title: "Prices and Payments",
      paragraphs: [
        "Prices and any mandatory fees are displayed before payment.",
        "Payments are processed through the available payment methods shown at checkout.",
        "Walks in Town may correct obvious pricing or technical errors and will contact affected customers when necessary."
      ]
    },
    {
      title: "Cancellations and Refunds",
      paragraphs: [
        "Cancellation conditions depend on the selected experience and are shown during booking.",
        "Cancellations made within the free-cancellation period may qualify for a full refund.",
        "Late cancellations, no-shows, and late arrivals may be non-refundable.",
        "Approved refunds are returned to the original payment method."
      ]
    },
    {
      title: "Changes and Cancellations by Walks in Town",
      paragraphs: [
        "Walks in Town may change or cancel an experience due to weather, safety issues, operational reasons, local restrictions, or other circumstances beyond reasonable control.",
        "Affected customers may be offered another date, an alternative experience, credit, or a refund, depending on the booking conditions."
      ]
    },
    {
      title: "Traveller Responsibilities",
      paragraphs: [
        "Customers must review the meeting point, starting time, participation requirements, and included services before the tour.",
        "Participants must arrive on time, carry any required documents, and follow the instructions of guides and staff.",
        "Walks in Town may refuse participation where behaviour creates a safety risk or seriously disrupts the experience."
      ]
    },
    {
      title: "Travel Documents, Health and Accessibility",
      paragraphs: [
        "Travellers are responsible for carrying valid identification, passports, visas, and any other required travel documents.",
        "Some tours may include walking, stairs, uneven surfaces, or other physical requirements.",
        "Customers with accessibility needs should contact Walks in Town before booking.",
        `For assistance, contact <a href="mailto:info@walkintown.com">info@walkintown.com</a> or call <a href="tel:+39 347 320 4889">+39 347 320 4889</a>.`
      ]
    },
    {
      title: "Liability and Travel Insurance",
      paragraphs: [
        "Walks in Town provides its services with reasonable care and in accordance with applicable law.",
        "We are not responsible for losses caused by incorrect customer information, late arrival, failure to follow instructions, or circumstances outside our reasonable control.",
        "Customers are advised to obtain suitable travel insurance."
      ]
    },
    {
      title: "Personal Data and Privacy",
      paragraphs: [
        "Walks in Town processes personal data in accordance with applicable data protection laws, including GDPR.",
        "Personal data may be used to manage bookings, process payments, provide support, and share necessary booking details with service providers.",
        `More information is available in our <a href="/en/PrivacyPolicy">Privacy Policy</a>.`
      ]
    },
    {
      title: "Complaints, Governing Law and Contact",
      paragraphs: [
        "If you experience a problem during a tour or activity, please inform your Walks in Town guide, representative, or support team as soon as possible. This allows us an opportunity to review and, where possible, resolve the issue promptly.",
        "Formal complaints should include the booking reference, the date of the experience, and a clear description of the issue.",
        "These Terms and Conditions are governed by the laws of Italy, without prejudice to any mandatory consumer protection rights that may apply under Italian or European Union law.",
        "For questions, booking assistance, or complaints, please contact:",
        "Walks in Town Srl<br/> Viale Giuseppe Mazzini, 40<br/> 50123 Firenze (FI), Italy",
        `Email: <a href=""mailto:info@walkintown.com" > info@walkintown.com</a > <br /> Phone: <a href="tel:+39 347 320 4889">+39 347 320 4889</a><br/> WhatsApp: <a href="tel:+39 347 320 4889">+39 347 320 4889</a><br/><br/> VAT Number: IT 07264710489 <br/> Chamber of Commerce: FI - 691303 <br/> Authorized Tour Operator — Italian Ministry of Tourism`
      ]
    }
  ];


  return <>

    <div className="terms-and-conditions-content">
      <SectionContainerCards className="pt-0">

        {
          headingParagraph !== "" &&
          <div className="heading">
            <Title headingType="p" headingStyle="Text-lg-Regular" color="--color-text-fg-subtle" >
              {headingParagraph}
            </Title>
          </div>
        }

        <div className="content">
          <ul>
            {
              itemsContentData.map((item, index) => {
                return (
                  <li key={index}>
                    <Title headingType="h3" headingStyle="Display-sm-Semibold" color="--color-text-fg">{item.title}</Title>
                    {item.paragraphs.map((paragraph, index_paragraph) => {

                      if (typeof paragraph === "object" && paragraph.type === "list") {
                        return (
                          <ul key={`list-${index}-${index_paragraph}`}>
                            {paragraph.items.map((item, index_item) => {
                              return (
                                <li key={`list-item-${index}-${index_paragraph}-${index_item}`}>
                                  <Title headingType="span" headingStyle="Text-lg-Regular" color="--color-text-fg-subtle">
                                    {item}
                                  </Title>
                                </li>
                              )
                            })}
                          </ul>
                        )
                      }

                      if (typeof paragraph === "string")
                        return (
                          <Title key={index_paragraph} headingType="p" headingStyle="Text-lg-Regular" color="--color-text-fg-subtle">
                            <span dangerouslySetInnerHTML={{ __html: paragraph }} />
                          </Title>
                        )
                      return <>[Undefined content data]</>
                    })}


                    {
                      item.subcontent !== undefined && <div className="sub-content">
                        <Title headingType="h5" headingStyle="Text-xl-Medium" color="--color-text-fg">{item.subcontent.title}</Title>

                        {
                          item.subcontent.paragraphs.map((paragraphSub: string, index_paragraphSub) => {
                            return (
                              <Title key={`sub-paragraph-${index}-${index_paragraphSub}`} headingType="p" headingStyle="Text-lg-Regular" color="--color-text-fg-subtle">
                                <span dangerouslySetInnerHTML={{ __html: paragraphSub }} />
                              </Title>
                            )
                          })
                        }
                      </div>
                    }

                  </li>
                )
              })
            }
          </ul>
        </div>


      </SectionContainerCards>
    </div>

  </>
}