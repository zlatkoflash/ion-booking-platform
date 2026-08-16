import IconText from "@/components/buttons/IconText";
import Title from "@/components/typography/Title";
import { EBookingStatus, IDBBookingDetails } from "@/utils/interface-database";
import { useTranslations } from "next-intl";

export default function FormSelectedValuesStatusHeading(
  { booking }
    :
    { booking: IDBBookingDetails }
) {

  const tCommon = useTranslations("Common");

  return <>
    <div className="status-heading">
      <Title headingType="h3" headingStyle="Text-xl-Semibold" color="--color-text-fg">
        {
          tCommon("booking_status")
        }
      </Title>

      {
        booking?.status === EBookingStatus.CONFIRMED &&
        <IconText text={tCommon("confirmed")} type="badge-style-item-booking-boxed" variation="success" />
      }
      {
        booking?.status !== EBookingStatus.CONFIRMED &&
        <IconText text={booking?.status && (booking?.status as string) !== "" ? tCommon(booking.status.toLocaleLowerCase() as string) : "undefined status"} type="badge-style-item-booking-boxed" variation="danger" />
      }
    </div>
  </>
}