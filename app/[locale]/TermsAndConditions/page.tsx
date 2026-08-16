import MainFooter from "@/components/footers/MainFooter";
import HeaderHome from "@/components/headers/HeaderHome";
import AboutUsHeadingContent from "@/components/sections/AboutUsHeadingContent";
import TermsAndConditionsContent from "@/components/sections/TermsAndConditionsContent";
import { getTranslations } from "next-intl/server";

export default async function TermsAndConditionsPage() {

  const tTerms = await getTranslations("TemplateTermsAndConditions");

  return <>

    <HeaderHome />

    <AboutUsHeadingContent
      badgeText={tTerms("about-us-heading.updated-date")}
      title={tTerms("about-us-heading.title")}
      paragraph={tTerms("about-us-heading.subtitle")}
    />

    <TermsAndConditionsContent
      headingParagraph={tTerms("heading-paragraph")}
      content={tTerms.raw("content")}
    />

    <MainFooter />

  </>
}
