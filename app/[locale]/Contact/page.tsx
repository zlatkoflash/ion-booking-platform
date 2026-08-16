import MainFooter from "@/components/footers/MainFooter";
import HeaderHome from "@/components/headers/HeaderHome";
import AboutUsHeadingContent from "@/components/sections/AboutUsHeadingContent";
import ContactForm from "@/components/sections/ContactForm";
import ContactReachUsGreedDetails from "@/components/sections/ContactReachUsGreedDetails";
import FAQs from "@/components/sections/FAQs";
import SubscribeBanner from "@/components/sections/SubscribeBanner";
import { getTranslations } from "next-intl/server";

export default async function Contact() {

  const tContact = await getTranslations("TemplateContact");

  return <>

    <HeaderHome />

    <AboutUsHeadingContent
      badgeText={tContact("heading_content.badge")}
      title={tContact("heading_content.title")}
      paragraph={tContact("heading_content.paragraph")}
    />

    <ContactForm />

    <ContactReachUsGreedDetails />

    <FAQs
      badge={tContact('faqs_badge')}
      title={tContact('faqs_title')}
      items={tContact.raw('faqs')}
    />

    <SubscribeBanner />
    <MainFooter />
  </>
}