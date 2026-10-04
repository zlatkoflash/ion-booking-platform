"use client";

import HeaderHome from "@/components/headers/HeaderHome";
import BookingAndRefundsHeading from "./Client/BookingsAndRefunds/components/BookingAndRefundsHeading";
import NoContentIllustration from "./Client/BookingsAndRefunds/components/NoContentIllustration";
import { useTranslations } from "next-intl";

export default function ErrorPage() {

  const tCommon = useTranslations("Common");
  console.log("Error page!!!");

  return <>
    <HeaderHome />

    <BookingAndRefundsHeading title={tCommon("error_page.title")} />
    <NoContentIllustration
      type="error"
      title={tCommon("error_page.title2")}
      paragraph={tCommon("error_page.paragraph")}
      button={{
        label: tCommon("error_page.button"),
        onClick: () => {
          window.location.reload();
        }
      }}
    />
  </>
}