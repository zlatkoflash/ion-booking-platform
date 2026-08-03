"use client"

import ButtonDefault from "@/components/buttons/ButtonDefault";
import InputText from "../inputs/InputText";
import { useState } from "react";
import { useTranslations } from "next-intl";
import IconText from "@/components/buttons/IconText";
import { getApiData } from "@/utils/api";
import { INewsletterEmail } from "@/utils/interface-database";

export default function FormNewsLetter() {

  const [email, setEmail] = useState("");
  const tCommon = useTranslations("Common");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [disable, setTheFormDisabed] = useState(false);

  const sendTheNewsLetter = async () => {
    setLoading(true);
    // setErrorMessage(null);
    // setSuccessMessage(null);
    const results = await getApiData<{
      ok: boolean,
      message: string,
      item: INewsletterEmail
    }>("/booking-public/subscribe-for-newsletters", "POST", {
      email
    }, "not-authorize", "application/json");

    console.log("results:", results);

    if (!results.ok) {
      setErrorMessage(results.message);

    } else {
      setErrorMessage(null);
      setSuccessMessage(results.message);
      setEmail("");
      setTheFormDisabed(true);
    }
    setLoading(false);
  }

  return (
    <>
      <div className="component form-subscribe-newsletter">
        <div className="wrap-the-elements">
          <InputText
            id="newsletter-email"
            name="newsletter-email"
            type="text"
            label="Email"
            value={email}
            placeholder={tCommon("subscribtionForm.inputPlaceholder")}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            showLabel={false}
            disabled={disable}
          />

          <ButtonDefault
            disabled={disable}
            loading={loading}
            label={tCommon("subscribtionForm.subscribe")} onClick={() => {
              sendTheNewsLetter()
            }} addArrowOnTheEnd={true} />
        </div>

        {(errorMessage !== null && errorMessage !== "") && <IconText iconType="warning-shield" type="icon-text-alert" variation="warning" text={errorMessage} className="w-100" />}
        {(successMessage !== null && successMessage !== "") && <IconText iconType="check" type="icon-text-alert" variation="success" text={"Thank you for subscribing to our newsletter!"} className="w-100" />}

      </div>

    </>
  );
}