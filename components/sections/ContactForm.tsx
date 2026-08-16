"use client";

import { useLocale, useTranslations } from "next-intl";
import InputsGridForBooking from "../forms/forms-sections/InputsGridForBooking";
import InputText from "../forms/inputs/InputText";
import SectionContainerCards from "./SectionContainerCards";
import { useState } from "react";
import ButtonDefault from "../buttons/ButtonDefault";
import ZPicture from "../illustrations/ZPicture";
import photo_contact from "@/assets/images/contact-image.jpg";
import Title from "../typography/Title";
import InputTextPhone from "../forms/inputs/InputTextPhone";
import IconText from "../buttons/IconText";
import { getApiData } from "@/utils/api";

export default function ContactForm() {

  const tForms = useTranslations('Forms');
  const tContact = useTranslations("TemplateContact");
  const locale = useLocale();

  const [first_name, set_first_name] = useState("");
  const [email, set_email] = useState("");
  const [phone_number, set_phone_number] = useState("");
  const [subject, set_subject] = useState("");
  const [message, set_message] = useState("");
  const [loading, setLoading] = useState(false);

  const [emailIsSend, setEmailIsSend] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string>("");


  const sendMessage = async () => {


    setLoading(true);
    setErrorMessage("");

    const details = await getApiData<{
      ok: boolean;
      message: string;
    }>("/booking-public/contact-form-email", "POST", {
      language: locale,
      details: {
        firstName: first_name,
        emailAddress: email,
        phoneNumber: phone_number,
        subject: subject,
        message: message,
      }
    }, "not-authorize", "application/json");

    setLoading(false);

    if (details.ok) {
      setEmailIsSend(true);
    }
    else {
      setErrorMessage(details.message)
    }

  };


  return (
    <div className="contact-form">
      <SectionContainerCards className="pt-0">

        <div className="content-wrap">
          <form action="" className={`left-contact-form ${emailIsSend === true ? "success" : ""}`}>

            <div className="heading">
              <Title color="--color-text-fg" headingType="h2" headingStyle="Display-md-Semibold">{tContact("send_us_a_message")}</Title>
              <Title headingType="p" headingStyle="Text-lg-Regular" color="--color-text-fg-subtle">
                {tContact("fill_out_the_form")}
              </Title>
            </div>

            <InputsGridForBooking>
              <InputText
                id="first-name"
                label={tForms("first_name")}
                name="first-name"
                value={first_name}
                placeholder={tForms("Enter_your_First_Name")}
                showLabelIconText={true}
                // labelIconType="person"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  set_first_name(e.target.value);
                }}
                validation={{
                  required: true
                }}

              />
              <InputText
                id="email-address"
                label={tForms("email_address")}
                name="email-address"
                value={email}
                placeholder={tForms("Enter_your_Email_Address")}
                showLabelIconText={true}
                // labelIconType="mail"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  set_email(e.target.value);
                }}
                validation={{
                  required: true
                }}
                type="email"
              />


              <InputTextPhone
                id="phone-number"
                label={tForms("phone_number")}
                name="phone-number"
                value={phone_number}
                placeholder={tForms("Enter_your_Phone_Number")}
                showLabelIconText={true}
                // labelIconType="person"
                onChange={(phone_number: string) => {
                  set_phone_number(phone_number);
                }}
                validation={{
                  required: true
                }}
                className="w-100"
                showLabelIconPhone={false}
              />

              <InputText
                id="subject"
                label={<>{tForms("subject")} <small>({tForms("optional")})</small></>}
                name="subject"
                value={subject}
                placeholder={tForms("booking_question_group_tour_feedback")}
                showLabelIconText={true}
                // labelIconType="person"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  set_subject(e.target.value);
                }}
                className="w-100"
              />
              <InputText
                id="message"
                label={<>{tForms("message")} <small>({tForms("optional")})</small></>}
                name="message"
                value={message}
                placeholder={tForms("tell_us_how_we_can_help")}
                showLabelIconText={true}
                // labelIconType="person"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  set_message(e.target.value);
                }}
                className="w-100"
                type="textarea"
              />
            </InputsGridForBooking>
            <ButtonDefault
              label={tContact("send_message")}
              className="w-100"
              disabled={emailIsSend}
              onClick={(e) => {
                sendMessage()
              }} loading={loading} />

            {
              emailIsSend && <IconText className="success-alert" iconType="check"
                text={tContact("contact_form_send_successfully")}
                subText={tContact("contact_form_send_successfully_subtext")}
                type="icon-text-alert"
                variation="success" />
            }

            {
              errorMessage !== "" && <IconText iconType="warning-shield"
                text={tForms("error_occurred")}
                subText={errorMessage}
                type="icon-text-alert"
                variation="warning-solid" fullWidthCentered={true} />
            }


          </form>

          <ZPicture pictureUrl={photo_contact.src} alt="Walk In Town - Contact Form" paralaxEffect="vertical-up" />



        </div>

      </SectionContainerCards>
    </div>
  )
}