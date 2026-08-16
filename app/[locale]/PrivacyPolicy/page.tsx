import MainFooter from "@/components/footers/MainFooter";
import HeaderHome from "@/components/headers/HeaderHome";
import AboutUsHeadingContent from "@/components/sections/AboutUsHeadingContent";
import TermsAndConditionsContent from "@/components/sections/TermsAndConditionsContent";
import { useTranslations } from "next-intl";

export default function PagePrivacyPolicy() {

  const tPrivacyPolicy = useTranslations("TemplatePrivacyPolicy");

  return <>


    <HeaderHome />


    <AboutUsHeadingContent
      badgeText={tPrivacyPolicy("privacy-policy-heading.updated-date")}
      title={tPrivacyPolicy("privacy-policy-heading.title")}
      paragraph={tPrivacyPolicy("privacy-policy-heading.subtitle")}
    />

    <TermsAndConditionsContent
      headingParagraph={tPrivacyPolicy("heading-paragraph")}
      content={tPrivacyPolicy.raw("content")}
    />



    <MainFooter />

  </>
}