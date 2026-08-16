"use client";

import ZPicture from "@/components/illustrations/ZPicture";
import picture_source from '@/assets/images/auth-picture-florence-small.jpg';
import Logo from "@/components/headers/Logo";
import Title from "@/components/typography/Title";
import InputsGridForBooking from "@/components/forms/forms-sections/InputsGridForBooking";
import InputText from "@/components/forms/inputs/InputText";
import ButtonDefault from "@/components/buttons/ButtonDefault";
import { useState } from "react";
import { getApiData } from "@/utils/api";
import { AuthResponse, ISupabaseUser } from "@/utils/interface-auth";
import { useLocale, useTranslations } from "next-intl";
import IconText from "@/components/buttons/IconText";
import { createClient } from "@/utils/supabaseClient";
import { useRouter } from "@/translations-engine/routing";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setAuthState, setShowModalAuth } from "@/redux/auth/authSlice";
import X6Inputs from "@/components/forms/inputs/X6Inputs";
// import { useRouter } from "next/navigation";


export default function ForgotPasswordForm() {


  const clientSupabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const tValidation = useTranslations("Validation");
  const tCommon = useTranslations("Common");
  const locale = useLocale();
  const router = useRouter();

  const dispatch = useAppDispatch();
  const modalAuth = useAppSelector((state) => state.auth.modalAuth);

  const [stateForm, setStateForm] = useState<"enter-email" | "enter-code" | "set-passwords" | "finished">("enter-email");

  const [activeToken, setActiveToken] = useState<string>("");


  const SendCodeForResettingPassword = async () => {
    setLoading(true);
    setErrorMessage("");
    const result = await getApiData<{
      ok: boolean;
      message: string;
      details: {
        ok: boolean;
        message: string;
        errorType: "invalidEmail" | "userDoNotExist";
        otherDetails: string;
        token: string;
      };
    }>("/auth-public/send-code-for-resetting-password", "POST", {
      email,
      locale: locale
    }, "not-authorize", "application/json");

    console.log("result:", result);
    if (!result.ok) {
      // setStateForm("enter-code");
      setErrorMessage(tValidation("general"))
    }
    else if (!result.details.ok) {
      if (result.details.errorType === "invalidEmail") {
        setErrorMessage(tValidation("emailNotValid"));
      }
      else if (result.details.errorType === "userDoNotExist") {
        setErrorMessage(tValidation("userDoNotExistByEmail"));
      }
      else {
        setErrorMessage(tValidation("general"));
      }
    }
    else {
      // setErrorMessage(tValidation("general"));
      setActiveToken(result.details.token);
      setStateForm("enter-code");
    }
    setLoading(false);
  }


  const CheckTheCode = async (codeString: string, codeArray: string[]) => {
    setLoading(true);
    setErrorMessage("");
    const result = await getApiData<{
      ok: boolean;
      message: string;
      details: {
        ok: boolean;
        message: string;
        errorType: "invalidEmail" | "invalidToken";
        otherDetails: string;
        token: string;
      };
    }>("/auth-public/check-the-code-for-resetting-password", "POST", {
      token: activeToken,
      code: codeString,
      email
    }, "not-authorize", "application/json");


    console.log("result:", result);
    if (!result.ok) {
      // setStateForm("enter-code");
      setErrorMessage(tValidation("general"))
    }
    else if (!result.details.ok) {
      if (result.details.errorType === "invalidEmail") {
        setErrorMessage(tValidation("emailNotValid"));
      }
      else if (result.details.errorType === "invalidToken") {
        setErrorMessage(tValidation("invalidToken"));
      }
      else {
        setErrorMessage(tValidation("general"));
      }
    }
    else {
      // setErrorMessage(tValidation("general"));
      // setActiveToken(result.details.token);
      setStateForm("set-passwords");
    }
    setLoading(false);
  }

  const UpdatePasswordFinally = async () => {
    setLoading(true);
    setErrorMessage("");

    if (password !== passwordRepeat) {
      setErrorMessage(tValidation("passwordsNotMatch"));
      setLoading(false);
      return;
    }

    const result = await getApiData<{
      ok: boolean;
      message: string;
      details: {
        ok: boolean;
        message: string;
        errorType: "invalidEmail" | "invalidToken" | "passwordNotValid" | "userDoNotExist" | "invalidPassword" | "userDoNotExist" | "errorUpdatingPassword";
        otherDetails: string;
        token: string;
        passwordErrorDetails: {
          errorType: "weak_length" | "weak_uppercase" | "weak_lowercase" | "no_special" | "no_number" | "ok";
          message: string;
        }
      };
    }>("/auth-public/change-password", "POST", {
      token: activeToken,
      password: password,
      passwordRepeat: passwordRepeat,
      email,
      language: locale
    }, "not-authorize", "application/json");

    console.log("result:", result);
    if (!result.ok) {
      // setStateForm("enter-code");
      setErrorMessage(tValidation("general"))
    }
    else if (!result.details.ok) {
      if (result.details.errorType === "invalidEmail") {
        setErrorMessage(tValidation("emailNotValid"));
      }
      else if (result.details.errorType === "invalidToken") {
        setErrorMessage(tValidation("invalidToken"));
      }
      else if (result.details.errorType === 'invalidPassword') {
        setErrorMessage(tValidation('passwordNotValid'));
      }
      else if (result.details.errorType === "userDoNotExist") {
        setErrorMessage(tValidation("userDoNotExistByEmail"));
      }
      else if (result.details.errorType === "errorUpdatingPassword") {
        setErrorMessage(tValidation("theServerCanNotUpdateYourPassword"));
      }
      else {
        setErrorMessage(tValidation("general"));
      }
    }
    else {
      // setErrorMessage(tValidation("general"));
      // setActiveToken(result.details.token);
      // router.push(`/${}`);
      // setStateForm("set-passwords");
      // here finally redirect to login page

      setStateForm("finished");
    }
    setLoading(false);
  }

  return (
    <>
      <div className="auth-form-section">
        <form action="">

          <div className="heading">
            <Logo type="for-auth" />
          </div>

          <div className="content-wrap">

            <div className="heading-content">

              {
                stateForm === "set-passwords" ?
                  <Title headingType="h1" headingStyle="Display-xs-Medium" color="--color-text-fg">{tCommon('set_new_password')}</Title>
                  :
                  <Title headingType="h1" headingStyle="Display-xs-Medium" color="--color-text-fg">{
                    stateForm === "finished" ? tCommon("password_reset") : tCommon('forgot_password')
                  }</Title>
              }
              {
                stateForm === "enter-email" && <Title headingType="p" headingStyle="Text-md-Regular" color="--color-text-fg-subtle">
                  {tCommon("no_problem_just_pop_your_email_below_and_well_help_you_reset_that_password")}
                </Title>
              }
            </div>

            <InputsGridForBooking>


              {
                stateForm === "finished" && <Title headingType="p" headingStyle="Text-md-Regular" color="--color-text-fg-subtle" className="w-100 text-center">
                  {tCommon("your_password_has_been_reset_successfully_you_can_now_log_in_with_your_new_password")}
                </Title>
              }

              {
                stateForm === "enter-email" && <InputText
                  id=""
                  label={tCommon("email_address")}
                  type="email"
                  name=""
                  value={email}
                  className="w-100"
                  placeholder={tCommon("subscribtionForm.inputPlaceholder")}
                  showLabelIconText={true}
                  labelIconType="mail"
                  onChange={(e) => setEmail(e.target.value)} />
              }

              {
                stateForm === "set-passwords" && <>
                  <InputText
                    id=""
                    label={tCommon("password")}
                    type="password"
                    name=""
                    value={password}
                    className="w-100"
                    placeholder={tCommon("enter_your_password")}
                    showLabelIconText={true}
                    labelIconType="key-outline"
                    onChange={(e) => setPassword(e.target.value)} />
                  <InputText
                    id=""
                    label={tCommon("confirm_password")}
                    type="password"
                    name=""
                    value={passwordRepeat}
                    className="w-100"
                    placeholder={tCommon("confirm_your_password")}
                    showLabelIconText={true}
                    labelIconType="key-outline"
                    onChange={(e) => setPasswordRepeat(e.target.value)} />
                </>
              }

              {
                stateForm === "enter-code" && <>
                  <Title headingType="h2" headingStyle="Text-md-Medium" className="w-100">{tCommon("complete_your_request")}</Title>
                  <Title headingType="p" headingStyle="Text-sm-Regular" className="w-100">{tCommon("we_sent_a_6_digit_activation_code_to")} <br />
                    <strong className="text-dark">{email}</strong>.
                    {tCommon("please_enter_it_below_to_continue")}</Title>
                  <X6Inputs
                    disabled={loading}
                    onComplete={(codeString: string, codeArray: string[]) => {
                      console.log("codeString:", codeString);
                      console.log("codeArray:", codeArray);
                      CheckTheCode(codeString, codeArray);
                    }}
                  />
                </>
              }


              {
                /*<InputText
                id=""
                label="Password"
                type="password"
                name=""
                value={password}
                className="w-100"
                placeholder="Enter your Password"
                showLabelIconText={true}
                labelIconType="key-outline"
                onChange={(e) => setPassword(e.target.value)} />*/
              }


              {
                /*<div className="auth-form-bottom-question">
                <Title headingType="a" headingStyle="Text-xs-Regular" color="--color-text-fg-subtle" href="/user/auth/forgot-password" className="">Forgot Password?</Title>
              </div>*/
              }

            </InputsGridForBooking>

            <div className="auth-form-footer">

              {
                stateForm === "enter-email" && <ButtonDefault label={tCommon("continue")} loading={loading} onClick={() => {
                  SendCodeForResettingPassword()
                }} />
              }
              {
                stateForm === "set-passwords" && <ButtonDefault label={tCommon("update_password")} loading={loading} onClick={() => {
                  UpdatePasswordFinally()
                }} />
              }
              {
                stateForm === "finished" && <ButtonDefault label={tCommon("log_in")} loading={loading} link="/user/auth/login" onClick={(e) => {

                  if (modalAuth.show === true) {
                    e.preventDefault();
                    dispatch(setShowModalAuth({
                      show: true,
                      contentType: "login"
                    }));
                  }
                }} />
              }

              {errorMessage != "" &&
                <IconText type="icon-text-alert" iconType="info-circle-outline" variation="danger" fullWidthCentered={true} text={errorMessage} />
              }

              <div className="question-link">
                <Title headingType="p" headingStyle="Text-sm-Regular" color="--color-text-fg-subtle">{tCommon("already_have_an_account")} </Title>
                <Title headingType="a" headingStyle="Text-sm-Medium" color="--color-text-fg-subtle" href="/user/auth/login" onClick={(e) => {
                  if (modalAuth.show === true) {
                    e.preventDefault();
                    dispatch(setShowModalAuth({
                      show: true,
                      contentType: "login"
                    }));
                  }
                }}>{tCommon("log_in")} </Title>
              </div>
            </div>
          </div>




        </form>
        <div className="right-content">
          <ZPicture pictureUrl={picture_source.src} type="for-auth-form" alt="WALKS IN TOWN - AUTH" />
        </div>
      </div>
    </>
  );
}