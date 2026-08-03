"use client";
import { useTranslations } from "next-intl";
import IconText from "./IconText";
import { useRouter } from "@/translations-engine/routing";

export default function ButtonBack() {

  const router = useRouter();

  const tForms = useTranslations("Forms");

  const FGoBackward = () => {
    router.back();
  }

  return <>

    <div className="component button-back" onClick={FGoBackward}>
      <IconText iconType="keyboard-arrow-left" type="subheader-back" text={tForms('back')} />
    </div>

  </>
}