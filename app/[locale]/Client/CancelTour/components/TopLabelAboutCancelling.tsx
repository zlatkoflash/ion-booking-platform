import IconText from "@/components/buttons/IconText";
import { IDBBookingDetails } from "@/utils/interface-database";

export default function TopLabelAboutCancelling(
  {
    booking
  }
    :
    {
      booking: IDBBookingDetails
    }
) {

  const labelFor = () => {

    const dateObject = new Date(booking.date_tour_start_zone_0);

    dateObject.setHours(dateObject.getHours() - 24);

    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    };

    const dateString = dateObject.toLocaleDateString('en-US', options);
    return `Cancel before ${dateString} for a full refund`;
  }

  if (booking.x24_hours_period_expired) {
    return <></>
  }

  return <>

    <IconText type="icon-text-alert" text={labelFor()} variation="warning-solid" iconType="verified" fullWidthCentered={true} />
  </>
}