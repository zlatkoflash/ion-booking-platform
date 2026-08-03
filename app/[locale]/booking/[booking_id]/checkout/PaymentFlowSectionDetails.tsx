"use client";

import IconText from "@/components/buttons/IconText";
import PaymentFlowSectionContainer from "./PaymentFlowSectionContainer";
import InputsGridForBooking from "@/components/forms/forms-sections/InputsGridForBooking";
import InputText from "@/components/forms/inputs/InputText";
import ButtonDefault from "@/components/buttons/ButtonDefault";
import { useEffect, useState } from "react";
import InputTextPhone from "@/components/forms/inputs/InputTextPhone";
import { useAppSelector } from "@/redux/hooks";
import { getApiData } from "@/utils/api";
import { useRouter } from "@/translations-engine/routing";
import { useTranslations } from "next-intl";

export default function PaymentFlowSectionDetails() {

  // const state = useAppSelector((state) => state);
  const booking = useAppSelector((state) => state.booking.booking);

  const tForms = useTranslations("Forms");

  // console.log("::::: state::::", state);
  // console.log("::::: booking::::", booking);


  const [first_name, set_first_name] = useState("");
  const [second_name, set_second_name] = useState("");
  const [email_address, set_email_address] = useState("");
  const [phone_number, set_phone_number] = useState("");
  const [address, set_address] = useState("");
  const [country, set_country] = useState("");
  const [city, set_city] = useState("");

  useEffect(() => {
    if (booking !== null && booking.customer_details.first_name !== "guest") {
      console.log("Adding the data from database...");
      set_first_name(booking.customer_details.first_name);
      set_second_name(booking.customer_details.second_name);
      set_email_address(booking.customer_details.email_address);
      set_phone_number(booking.customer_details.phone_number);
      set_address(booking.customer_details.address);
      set_country(booking.customer_details.country);
      set_city(booking.customer_details.city);
    }
  }, [booking]);

  const userAuth = useAppSelector((state) => state.auth.user);
  console.log("userAuth:::::::::::::", userAuth);
  const price = useAppSelector((state) => state.booking.price);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const SaveContactDetailsAndContinueToPayment = async () => {

    setLoading(true);
    setErrorMessage("")

    const result = await getApiData<{
      ok: boolean;
      message: string;
    }>("/booking-public/add-customer-booking-details", "POST",
      {
        customer_details: {
          first_name,
          second_name,
          email_address,
          phone_number,
          address,
          city,
          country,
        },
        booking_id: booking?.id
      },
      userAuth === null ? "not-authorize" : "authorize",
      "application/json");
    console.log("results after saving:", result);
    if (!result.ok) {
      setErrorMessage(result.message);
      setLoading(false);
    }
    else {
      router.push(`/booking/${booking?.id}/checkout`);
      setLoading(false);
    }

  }

  return (
    <PaymentFlowSectionContainer
      title={tForms('contact_details')}
      subtitle={tForms("contact_details_subtitle")}
      showContent={true}

      topRightIconText={<IconText type="payment-flow-secure-form" iconType="lock-outline" text={tForms("secure_form")} className="secure-form-label" />}

      headingAdditionalContent={
        userAuth === null && <IconText type="icon-text-alert" iconType="power-solid" variation="warning" text={tForms("login_or_signup_subtitle")} />
      }
    >

      <InputsGridForBooking>
        <InputText
          id="first-name"
          label={tForms("first_name")}
          name="first-name"
          value={first_name}
          placeholder={tForms("Enter_your_First_Name")}
          showLabelIconText={true}
          labelIconType="person"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            set_first_name(e.target.value);
          }}
          validation={{
            required: true
          }}
        />
        <InputText
          id="second-name"
          label={tForms("second_name")}
          name="second-name"
          value={second_name}
          placeholder={tForms("Enter_your_Second_Name")}
          showLabelIconText={true}
          labelIconType="person"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            set_second_name(e.target.value);
          }}
          validation={{
            required: true
          }}
        />
        <InputText
          id="email-address"
          label={tForms("email_address")}
          name="email-address"
          type="email"
          value={email_address}
          placeholder={tForms("Enter_your_Email_Address")}
          className="w-100"
          showLabelIconText={true}
          labelIconType="mail"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            set_email_address(e.target.value);
          }}
          validation={{
            required: true
          }}
        />
        {
          /*<InputText
          id="phone-number"
          label="Phone Number"
          name="phone-number"
          value={phone_number}
          placeholder="Enter your Phone Number"
          className="w-100"
          showLabelIconText={true}
          labelIconType="call"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            set_phone_number(e.target.value);
          }}
          validation={{ required: true }}
        />*/
        }
        <InputTextPhone
          id="phone-number"
          label={tForms("phone_number")}
          name="phone-number"
          value={phone_number}
          placeholder={tForms("Enter_your_Phone_Number")}
          className="w-100"
          showLabelIconText={true}
          labelIconType="call"
          onChange={(phone_number: string) => {
            set_phone_number(phone_number);
          }}
          validation={{ required: true }}
        />
        <InputText
          id="address"
          label={<>{tForms("address")} <small>({tForms("optional")})</small></>}
          name="address"
          value={address}
          placeholder={tForms("enter_your_address")}
          className="w-100 dont-show-label-icon"
          showLabelIconText={true}
          labelIconType="location-on-pin"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            set_address(e.target.value);
          }}
        />
        <InputText
          id="country"
          label={<>{tForms("country")}</>}
          name="country"
          value={country}
          placeholder={tForms("enter_your_country")}
          className="dont-show-label-icon"
          showLabelIconText={true}
          labelIconType="location-on-pin"
          validation={{ required: true }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            set_country(e.target.value);
          }}

        />
        <InputText
          id="city"
          label={<>{tForms("city")} <small>({tForms("optional")})</small></>}
          name="city"
          value={city}
          placeholder={tForms("enter_your_city")}
          showLabelIconText={true}
          className="dont-show-label-icon"
          labelIconType="location-on-pin"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            set_city(e.target.value);
          }}
        />
      </InputsGridForBooking>

      <ButtonDefault label={`${tForms("continue_to_payment")} €${price.total_discount.toFixed(2)}`} className="w-100" onClick={(e) => {
        SaveContactDetailsAndContinueToPayment()
      }} loading={loading} disabled={booking?.is_expired} />

      {
        errorMessage !== "" && <IconText
          type="icon-text-alert"
          text={errorMessage}
          iconType="danger-outline"
          fullWidthCentered={true}
          key="expired-spot"
          className="mb-3"
          variation="danger" // Swapped variation to mirror a systemic warning layout
        />
      }

      <IconText type="icon-text-booking-big" iconType="verified-shield-outline" text={tForms("you_re_booking_with_free_cancellation")} fullWidthCentered={true} />

    </PaymentFlowSectionContainer>
  )
}