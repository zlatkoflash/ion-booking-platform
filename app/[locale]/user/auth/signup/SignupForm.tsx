"use client";

import ButtonDefault from "@/components/buttons/ButtonDefault";
import InputsGridForBooking from "@/components/forms/forms-sections/InputsGridForBooking";
import InputText from "@/components/forms/inputs/InputText";
import ZPicture from "@/components/illustrations/ZPicture";
import Title from "@/components/typography/Title";
import picture_source from '@/assets/images/auth-picture-florence-small.jpg';
import Logo from "@/components/headers/Logo";
import { useState } from "react";
import { getApiData } from "@/utils/api";
import IconText from "@/components/buttons/IconText";
import { useTranslations } from "next-intl";
import X6Inputs from "@/components/forms/inputs/X6Inputs";
import { AuthResponse, ISupabaseUser } from "@/utils/interface-auth";
import { createClient } from "@/utils/supabaseClient";
import { useRouter } from "@/translations-engine/routing";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setAuthState, setShowModalAuth } from "@/redux/auth/authSlice";


export default function SignupForm(

) {


  const clientSupabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showX6CodeValidation, setShowX6CodeValidation] = useState(false);

  const [token, setToken] = useState("");

  const tValidation = useTranslations("Validation");

  const dispatch = useAppDispatch();
  const stateModal = useAppSelector((state) => state.auth.modalAuth);

  const router = useRouter();
  // tValidation("")

  const InitSignup = async () => {
    setErrorMessage("")
    if (email == "" || password == "" || repeatPassword == "") {
      setErrorMessage("Please fill in all the fields");
      return;
    }
    if (password != repeatPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setLoading(true);
    // const results = await getApiData("/")
    const results = await getApiData<{
      ok: boolean,
      message: string,
      initSetup: {
        ok: boolean,
        message: string,
        errorType: "-" | "userExists" | "invalidEmail" | "passwordNotValid" | "general",
        errorType2: string,
        token: string
      }
    }>("/auth-public/init-signup", "POST", {
      email: email,
      password: password
    }, "not-authorize", "application/json");

    console.log("results for:", results);

    if (!results.ok) {
      setErrorMessage(tValidation("general"));
    }
    else if (results.initSetup.errorType === "invalidEmail") {
      setErrorMessage(tValidation("emailNotValid"));
    }
    else if (results.initSetup.errorType === "passwordNotValid") {
      setErrorMessage(tValidation("passwordNotValid"));
    }
    else if (results.initSetup.errorType === "userExists") {
      setErrorMessage(tValidation("userExists"));
    } else {
      // here need the code for showing the x6 numbers
      setShowX6CodeValidation(true);
      setToken(results.initSetup.token);
    }

    setLoading(false);
  }


  const TryFinalySignup = async (code: string) => {

    setLoading(true);
    setErrorMessage("");

    const signupResult = await getApiData<{
      ok: boolean,
      message: string,
      resultsSignup: {
        ok: boolean,
        message: string,
        authResponse: AuthResponse
      }
    }>("/auth-public/signup", "POST", {
      email: email,
      // email: "zlatkoflashccc666@gmail.com",
      password: password,
      token: token,
      code: code
    }, "not-authorize", "application/json");

    console.log("signupResult:", signupResult);

    if (!signupResult.ok) {
      setErrorMessage(tValidation("general"));
    }
    else if (!signupResult.resultsSignup.ok) {
      setErrorMessage(tValidation("invalidToken"));
    }
    else if (signupResult.resultsSignup.authResponse.session === null) {
      setErrorMessage(tValidation("wrongCredentials_afterSignup"));
    }
    else {
      const { data, error } = await clientSupabase.auth.setSession({
        // access_token: result.data.session.access_token,
        access_token: signupResult.resultsSignup.authResponse.session.access_token,
        refresh_token: signupResult.resultsSignup.authResponse.session.refresh_token,
      })

      dispatch(setAuthState(signupResult.resultsSignup.authResponse.user as ISupabaseUser));

      console.log("supabase data after login:", data);
      console.log("error after login:", error);


      if (error === null) {

        if (stateModal.show) {
          // close the popup window
          dispatch(setShowModalAuth({
            show: false,
            contentType: "signup"
          }));

          router.refresh()
        }
        else {
          // redirect to administrator home page
          // redirect to administrator home page
          // router.push(`/${locale}/bookings/my-bookings`);
          if (signupResult.resultsSignup.authResponse.user?.user_metadata.role === "administrator") {
            router.push("/Administrator/Home")
          }
          else {
            router.push("/Client/Home")
          }
        }
      }
      else {
        setErrorMessage(tValidation("wrongCredentials"));
      }

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
            <Title headingType="h1" headingStyle="Display-xs-Medium" color="--color-text-fg">Sign Up</Title>


            <InputsGridForBooking>


              {
                !showX6CodeValidation && <>
                  <InputText
                    id=""
                    label="Email Address"
                    type="email"
                    name=""
                    value={email}
                    className="w-100"
                    placeholder="Enter your Email Address"
                    showLabelIconText={true}
                    labelIconType="mail"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }} />
                  <InputText
                    id=""
                    label="Password"
                    name=""
                    type="password"
                    value={password}
                    className="w-100"
                    placeholder="Enter your Password"
                    showLabelIconText={true}
                    labelIconType="key-outline"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }} />
                  <InputText
                    id=""
                    label="Repeat Password"
                    name=""
                    type="password"
                    value={repeatPassword}
                    className="w-100"
                    placeholder="Enter your Repeat Password"
                    showLabelIconText={true}
                    labelIconType="key-outline"
                    onChange={(e) => {
                      setRepeatPassword(e.target.value);
                    }} />
                </>
              }


              {
                showX6CodeValidation && <>
                  <Title headingType="h2" headingStyle="Text-md-Medium" className="w-100">Complete Your Registration</Title>
                  <Title headingType="p" headingStyle="Text-sm-Regular" className="w-100">We sent a 6-digit activation code to <br />
                    <strong className="text-dark">{email}</strong>.
                    Please enter it below to complete your registration.</Title>
                  <X6Inputs
                    disabled={loading}
                    onComplete={(codeString: string, codeArray: string[]) => {
                      console.log("codeString:", codeString);
                      console.log("codeArray:", codeArray);
                      TryFinalySignup(codeString);
                    }}
                  />
                </>
              }

              {
                /*<div className="auth-form-bottom-question">
                <Title headingType="a" headingStyle="Text-xs-Regular" color="--color-text-fg-subtle" href="/user/auth/forgot-password" className="">Forgot Password?</Title>
              </div>*/
              }

            </InputsGridForBooking>

            <div className="auth-form-footer">

              {
                !showX6CodeValidation && <ButtonDefault label="Sign Up" loading={loading} onClick={() => {
                  InitSignup()
                }} />
              }

              {
                showX6CodeValidation && <ButtonDefault variant="outline-primary" label="Go back" loading={loading} onClick={() => {
                  setShowX6CodeValidation(false);
                }} />
              }

              {errorMessage != "" &&
                <IconText type="icon-text-alert" iconType="info-circle-outline" variation="danger" fullWidthCentered={true} text={errorMessage} />
              }

              <div className="question-link">
                <Title headingType="p" headingStyle="Text-sm-Regular" color="--color-text-fg-subtle">Do have an account? </Title>
                <Title headingType="a" headingStyle="Text-sm-Medium" color="--color-text-fg-subtle" href="/user/auth/login" onClick={(e) => {
                  if (stateModal.show === true) {
                    e.preventDefault();
                    dispatch(setShowModalAuth({
                      show: true,
                      contentType: "login"
                    }));
                  }
                }}>Log In</Title>
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