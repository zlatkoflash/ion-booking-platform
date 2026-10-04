import PriceGroup from "@/components/typography/PriceGroup";
import { useTranslations } from "next-intl";
import { IBookedOrderPrice } from "@/redux/booking/bookingSlice";
import Title from "@/components/typography/Title";

export default function BookingTotalPanel(
  { price_booking }
    :
    { price_booking: IBookedOrderPrice }) {

  const tForms = useTranslations("Forms");

  return <>
    <div className="form-booking-selection">
      <div className="cart-items-lines mt-0">

        <Title headingType="h5" headingStyle="Text-md-Medium">Order Summary</Title>

        <PriceGroup price={0} text={tForms("booking_fee")} type="cart-item" badgeText={tForms('no_fees')} />

        <PriceGroup
          price={price_booking.total}
          // discountPercent={0} 
          text={tForms('total').toLocaleUpperCase()} type="cart-item" bolder={true} />

      </div>
    </div>
  </>
}