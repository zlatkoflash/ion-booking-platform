import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Col, Container, Row } from "react-bootstrap";
import Logo from "../headers/Logo";
import Title from "../typography/Title";
import ZIcon from "../icons/ZIcon";
import IconText from "../buttons/IconText";

import image_payment_method_1 from "@/assets/images/payment-method-1.png"
import image_payment_method_2 from "@/assets/images/payment-method-2.png"
import image_payment_method_3 from "@/assets/images/payment-method-3.png"
import image_payment_method_4 from "@/assets/images/payment-method-4.png"
import image_payment_method_5 from "@/assets/images/payment-method-5.png"
import image_payment_method_6 from "@/assets/images/payment-method-6.png"
import image_payment_method_7 from "@/assets/images/payment-method-7.png"
import { useTranslations } from "next-intl";

export default function MainFooter() {

  const tCommon = useTranslations("Common");

  const contentCompany = () => {
    return <>
      <IconText text="Walks in Town Srl" type="footer-info" iconType="business-center" />
      <IconText text="Viale Giuseppe Mazzini,40 50123 Firenze (FI), Italy" type="footer-info" iconType="location-on-pin" />
      <IconText text={`${tCommon("vat_number")} IT 07264710489`} type="footer-info" iconType="approval" />
      <IconText text={`${tCommon("chamber_of_commerce")}: FI-691303`} type="footer-info" iconType="bookmark-check" />
      <IconText text={tCommon('license_authorized_tour_operator_italian')} type="footer-info" iconType="verified" />
    </>
  }
  const contentMenu = () => {
    return <>
      <ul className="footer-links">
        <li>
          <Title headingType="a" headingStyle="Text-sm-Semibold" color="--color-text-fg-inverted" href="/AboutUs">
            {tCommon("about_us")}
          </Title>
        </li>
        <li>
          <Title headingType="a" headingStyle="Text-sm-Semibold" color="--color-text-fg-inverted" href="/Contact">
            {tCommon("contact")}
          </Title>
        </li>
        <li>
          <Title headingType="a" headingStyle="Text-sm-Semibold" color="--color-text-fg-inverted" href="/TermsAndConditions">
            {tCommon("terms_and_conditions")}
          </Title>
        </li>
        <li>
          <Title headingType="a" headingStyle="Text-sm-Semibold" color="--color-text-fg-inverted" href="/PrivacyPolicy">
            {tCommon("privacy_policy")}
          </Title>
        </li>
      </ul>
    </>
  }
  const contentContact = () => {
    return <>
      <IconText text="info@walkintown.com" type="footer-info" iconType="mail" href="mailto:info@walkintown.com" />
      <IconText text="+39 347 320 4889" type="footer-info" iconType="call" href="tel:+393473204889" />
      <IconText text={`+39 347 320 4889 (${tCommon("for_quick_inquiries")})`} type="footer-info" iconType="social-whatsapp" href="https://wa.me/393473204889" />
    </>
  }

  return <>
    <footer>
      <Container>
        <Row>
          <Col>

            <div className="footer-content">
              <div className="social-section">
                <Logo type="yellow-white" />
                <Title headingType="h4" headingStyle="Text-md-Regular" color="--color-text-fg-inverted">
                  {tCommon("design_amazing_digital_experiences")}
                </Title>
                <div className="component social-icons-group">
                  <ZIcon type="social-facebook" href="https://facebook.com" />
                  <ZIcon type="social-x" href="https://x.com" />
                  <ZIcon type="social-instagram" href="https://instagram.com" />
                  <ZIcon type="social-linkedin" href="https://linkedin.com" />
                  <ZIcon type="social-youtube" href="https://youtube.com" />
                  <ZIcon type="social-tiktok" href="https://tiktok.com" />
                </div>
              </div>
              <div className="company-section">
                <Title headingType="h4" headingStyle="Text-lg-Regular" color="--color-text-fg-inverted">
                  {tCommon("company")}
                </Title>
                {
                  /*<IconText text="Walks in Town Srl" type="footer-info" iconType="business-center" />
                <IconText text="Viale Giuseppe Mazzini,40 50123 Firenze (FI), Italy" type="footer-info" iconType="location-on-pin" />
                <IconText text="VAT Number: IT 07264710489" type="footer-info" iconType="approval" />
                <IconText text="Chamber of Commerce: FI-691303" type="footer-info" iconType="bookmark-check" />
                <IconText text="License: Authorized Tour Operator (Italian Ministry of Tourism)" type="footer-info" iconType="verified" />*/
                }
                {
                  contentCompany()
                }
              </div>
              <div className="policies-section">
                <Title headingType="h4" headingStyle="Text-lg-Regular" color="--color-text-fg-inverted">{tCommon('policies')}</Title>


                {
                  contentMenu()
                }


              </div>
              <div className="contact-section">
                <Title headingType="h4" headingStyle="Text-lg-Regular" color="--color-text-fg-inverted">{tCommon('contact')}</Title>
                {
                  /*
                   <IconText text="info@walkintown.com" type="footer-info" iconType="mail" href="mailto:info@walkintown.com" />
                  <IconText text="+39 347 320 4889" type="footer-info" iconType="call" href="tel:+393473204889" />
                  <IconText text="+39 347 320 4889 (for quick inquiries)" type="footer-info" iconType="social-whatsapp" href="https://wa.me/393473204889" />
                  */
                }
                {
                  contentContact()
                }
              </div>
            </div>



            <MobileAccordionContent items={[
              {
                title: tCommon('company'),
                content: contentCompany()
              },
              {
                title: tCommon('policies'),
                content: contentMenu()
              },
              {
                title: tCommon('contact'),
                content: contentContact()
              }
            ]}

            />



            <hr />

            <div className="powered-by">
              <Title headingType="p" headingStyle="Text-md-Regular" color="--color-text-fg-inverted">
                {tCommon('powered_by_stripe')}
              </Title>
              <div className="stripe-logos">
                <img src={image_payment_method_1.src} alt="Visa" />
                <img src={image_payment_method_2.src} alt="MasterCard" />
                <img src={image_payment_method_3.src} alt="Amex" />
                <img src={image_payment_method_4.src} alt="ApplePay" />
                <img src={image_payment_method_5.src} alt="GooglePay" />
                <img src={image_payment_method_6.src} alt="PayPal" />
                <img src={image_payment_method_7.src} alt="Stripe" />
              </div>
            </div>

            <div className="copyright-line">
              {
                // <Logo type="yellow-white" />
              }
              <Title headingType="p" headingStyle="Text-sm-Regular" color="--color-text-fg-inverted">
                © 2026 {tCommon("copyright_text")}
              </Title>
            </div>

          </Col>
        </Row>
      </Container>
    </footer>
  </>
}


function MobileAccordionContent(
  {
    items
  }
    :
    {
      items: {
        title: string,
        content: React.ReactNode
      }[]
    }
) {
  return <>
    <div className="mobile-footer-accordion-content">
      <Accordion defaultActiveKey="menu-items-block-0">
        {
          items.map((item, index) => {
            return <AccordionItem eventKey={`menu-items-block-${index}`} key={`item-${index}`}>
              <AccordionHeader>
                {item.title}
                <ZIcon type="keyboard-arrow-left" />
              </AccordionHeader>
              <AccordionBody>
                {
                  item.content
                }
              </AccordionBody>
            </AccordionItem>
          })
        }
      </Accordion>
    </div>
  </>
}