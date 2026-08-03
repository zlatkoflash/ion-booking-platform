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
import { useTranslations } from "next-intl";
import IconText from "@/components/buttons/IconText";
import { createClient } from "@/utils/supabaseClient";
import { useRouter } from "@/translations-engine/routing";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setAuthState, setShowModalAuth } from "@/redux/auth/authSlice";
// import { useRouter } from "next/navigation";


export default function LoginForm(

) {


  const clientSupabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const tValidation = useTranslations("Validation");
  const router = useRouter();

  const dispatch = useAppDispatch();
  const modalAuth = useAppSelector((state) => state.auth.modalAuth);

  const TryLogin = async () => {
    setLoading(true);
    setErrorMessage("");

    const resultAfterLogin = await getApiData<{
      ok: boolean;
      message: string;
      resultsLogin: AuthResponse
    }>("/auth-public/login", "POST", {
      email,
      password
    }, "not-authorize", "application/json");


    console.log("resultAfterLogin:", resultAfterLogin);

    if (!resultAfterLogin.ok) {
      // we do not put here general we will 
      setErrorMessage(tValidation("general"));
      // setErrorMessage(tValidation("wrongCredentials"));
    } else {
      // router.push(`/${locale}/bookings/my-bookings`);
      if (resultAfterLogin.resultsLogin.userDb === null) {
        setErrorMessage(tValidation("userDoNotExistByEmail"));
      }
      else if (resultAfterLogin.resultsLogin.session === null) {
        setErrorMessage(tValidation("wrongCredentials"));
      }
      else {
        const { data, error } = await clientSupabase.auth.setSession({
          // access_token: result.data.session.access_token,
          access_token: resultAfterLogin.resultsLogin.session.access_token,
          refresh_token: resultAfterLogin.resultsLogin.session.refresh_token,
        })

        console.log("supabase data after login:", data);
        console.log("error after login:", error);

        if (error === null) {

          if (modalAuth.show) {
            // close the popup window
            dispatch(setShowModalAuth({
              show: false,
              contentType: "login"
            }));

            router.refresh();
          }
          else {
            // redirect to administrator home page
            // router.push(`/${locale}/bookings/my-bookings`);
            dispatch(setAuthState(resultAfterLogin.resultsLogin.user as ISupabaseUser));
            if (resultAfterLogin.resultsLogin.user?.user_metadata.role === "administrator") {
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
            <Title headingType="h1" headingStyle="Display-xs-Medium" color="--color-text-fg">Log In</Title>

            <InputsGridForBooking>
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
                onChange={(e) => setEmail(e.target.value)} />
              <InputText
                id=""
                label="Password"
                type="password"
                name=""
                value={password}
                className="w-100"
                placeholder="Enter your Password"
                showLabelIconText={true}
                labelIconType="key-outline"
                onChange={(e) => setPassword(e.target.value)} />


              <div className="auth-form-bottom-question">
                <Title headingType="a" headingStyle="Text-xs-Regular" color="--color-text-fg-subtle" href="/user/auth/forgot-password" className="" onClick={(e) => {
                  if (modalAuth.show) {
                    e.preventDefault();
                    dispatch(setShowModalAuth({
                      show: true,
                      contentType: "forgot-password"
                    }));
                  }
                }}>Forgot Password?</Title>
              </div>

            </InputsGridForBooking>

            <div className="auth-form-footer">
              <ButtonDefault label="Log in" loading={loading} onClick={() => {
                TryLogin();
              }} />



              {errorMessage != "" &&
                <IconText type="icon-text-alert" iconType="info-circle-outline" variation="danger" fullWidthCentered={true} text={errorMessage} />
              }

              <div className="question-link">
                <Title headingType="p" headingStyle="Text-sm-Regular" color="--color-text-fg-subtle">Don`t have an account? </Title>
                <Title headingType="a" headingStyle="Text-sm-Medium" color="--color-text-fg-subtle" href="/user/auth/signup" onClick={(e) => {
                  if (modalAuth.show === true) {
                    e.preventDefault();
                    dispatch(setShowModalAuth({
                      show: true,
                      contentType: "signup"
                    }));
                  }
                }}>Sign Up</Title>
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