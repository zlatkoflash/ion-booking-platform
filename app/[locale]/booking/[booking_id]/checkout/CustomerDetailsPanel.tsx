"use client";

import ButtonDefault from "@/components/buttons/ButtonDefault";
import Title from "@/components/typography/Title";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "@/translations-engine/routing";
import { useTranslations } from "next-intl";

export default function CustomerDetailsPanel(
  { hideInMobile = false }
    :
    { hideInMobile?: boolean }
) {

  const booking = useAppSelector((state) => state.booking.booking);
  const router = useRouter();
  const tForms = useTranslations("Forms");

  if (booking === null) return <></>

  return <>

    <div className={`customer-details-panel ${hideInMobile ? 'hide-widget-on-mobile' : ''}`}>
      <div className="heading">
        <Title headingType="h3" headingStyle="Text-lg-Medium" color="--color-text-fg">
          {tForms('contact_details')}
        </Title>
        <ButtonDefault label="Edit" variant="outline-primary" onClick={(e) => {
          router.push(`/booking/${booking.id}/details`)
        }} />
      </div>

      <ul>
        <li>
          <Title headingType="p" headingStyle="Text-md-Regular" color="--color-text-fg-subtle">
            {tForms("name")}: {`${booking.customer_details.first_name} ${booking.customer_details.second_name}`}
          </Title>
        </li>
        <li>
          <Title headingType="p" headingStyle="Text-md-Regular" color="--color-text-fg-subtle">
            {tForms("email")}: {`${booking.customer_details.email_address}`}
          </Title>
        </li>
        <li>
          <Title headingType="p" headingStyle="Text-md-Regular" color="--color-text-fg-subtle">
            {tForms("phone_number")}: {`${booking.customer_details.phone_number}`}
          </Title>
        </li>
        <li>
          <Title headingType="p" headingStyle="Text-md-Regular" color="--color-text-fg-subtle">
            {tForms("address")}: {`${booking.customer_details.address}, ${booking.customer_details.city}, ${booking.customer_details.country}`}
          </Title>
        </li>
      </ul>

    </div>

  </>
}