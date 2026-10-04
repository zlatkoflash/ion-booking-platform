"use client";

import HeaderHome from "@/components/headers/HeaderHome";
import BookingAndRefundsHeading from "@/app/[locale]/Client/BookingsAndRefunds/components/BookingAndRefundsHeading";
import NoContentIllustration from "@/app/[locale]/Client/BookingsAndRefunds/components/NoContentIllustration";
import { useTranslations } from "next-intl";

export default function NotFound() {

  const tCommon = useTranslations("Common");

  return <>

    <HeaderHome />

    <BookingAndRefundsHeading title={tCommon("not_found.title")} />
    <NoContentIllustration
      type="page-not-found"
      title={tCommon("not_found.title2")}
      paragraph={tCommon("not_found.paragraph")}

    />

  </>
}
