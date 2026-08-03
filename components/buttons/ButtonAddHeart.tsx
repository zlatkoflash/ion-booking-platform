"use client";

import { useEffect, useState } from "react";
import ButtonCircleArrow from "./ButtonCircleArrow";
import { ZIconType } from "../icons/ZIcon";
import { Button } from "react-bootstrap";
import IconText from "./IconText";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setShowModalAuth } from "@/redux/auth/authSlice";
import { getApiData } from "@/utils/api";
import { useTranslations } from "next-intl";

export default function ButtonAddHeart(
  {
    type = "type-cirlce-heart-button",
    isClicked = false,
    onChangeState,
    isFor = "experience",
    id = "",
    likeType = "heart",
    hideTextOnMobile = false
  }
    :
    {
      type?: "type-cirlce-heart-button" | "type-icon-text-button",
      isClicked?: boolean,
      onChangeState?: (state: boolean) => void,
      isFor?: "experience" | "city",
      id?: number | string,
      likeType?: "like" | "heart",
      hideTextOnMobile?: boolean
    }
) {

  // console.log("isClicked:", isClicked);

  const [itIsClicked, set_itIsClicked] = useState<boolean>(isClicked);
  const loggedUser = useAppSelector((state) => state.auth.user);
  const modalShowAuth = useAppSelector((state) => state.auth.modalAuth.show);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);

  const [classesAnimations, setClassesAnimations] = useState<string>("");


  const SaveStateHeart = async () => {
    setLoading(true);

    const resultAfterClickingHeart = await getApiData<{
      ok: boolean
    }>("/booking-client/add-remove-like", "POST", {

      clicked: itIsClicked,
      subject_id: id,
      target_type: isFor,
      like_type: likeType

    }, "authorize", "application/json");

    console.log("resultAfterClickingHeart:", resultAfterClickingHeart);

    setLoading(false);
  }

  const tForms = useTranslations("Forms");


  useEffect(() => {
    if (!modalShowAuth && !loggedUser) {
      // we remove the heart-filled icon when the modal is closed and the user is not logged in
      // set_itIsClicked(false);
    }
  }, [
    modalShowAuth,
    loggedUser
  ]);

  useEffect(() => { }, [
    loggedUser
  ]);

  const ChangeHeartState = () => {
    if (!loggedUser) {
      // when is not logged in open the modal auth
      dispatch(setShowModalAuth({ show: true, contentType: "login" }));
    }
    else {
      const newStateIsClicked = !itIsClicked;
      if (newStateIsClicked) {
        setClassesAnimations("play-animation");
      }
      else {
        setClassesAnimations("");
      }
      set_itIsClicked(newStateIsClicked);
      SaveStateHeart();
    }

    console.log("It is working");
  }

  if (type === "type-icon-text-button") {
    return <>
      {
        // isClicked ? 'is-clicked' : 'is-not-clicked'
      }
      <button className={`button-add-heart-${type} component button-subheader-share ${type} ${itIsClicked ? "active" : ""} ${classesAnimations}`} type="button" onClick={ChangeHeartState}>
        {
          itIsClicked === true ?
            <IconText type="subheader-share" text={tForms("add_to_wishlist")} iconType="heart" hideTextOnMobile={hideTextOnMobile} />
            :
            <IconText type="subheader-share" text={tForms("add_to_wishlist")} iconType="heart-outline" hideTextOnMobile={hideTextOnMobile} />
        }
      </button>
    </>
  }

  return <>

    {
      // `[${id}]`
    }



    <ButtonCircleArrow
      className={`button-add-heart ${type} ${itIsClicked ? "active" : ""} ${classesAnimations}`}
      iconType={itIsClicked ? "heart" : "heart-outline"}
      onClick={ChangeHeartState}
    />
  </>
}