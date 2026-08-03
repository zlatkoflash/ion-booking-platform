import MainFooter from "@/components/footers/MainFooter";
import HeaderHome from "@/components/headers/HeaderHome";
import TourSubheader from "@/components/headers/TourSubheader";
import TourContainerX2Columns from "@/components/sections/TourContainerX2Columns";
import PaymentFlowSectionDetails from "../checkout/PaymentFlowSectionDetails";
import PaymentFlowSectionPayment from "../checkout/PaymentFlowSectionPayment";
import IconText from "@/components/buttons/IconText";
import FormSelectedValues from "@/app/[locale]/booking/components/FormSelectedValues";
import FormSectionChecksItems from "@/app/[locale]/tour/[slug]/FormSectionChecksItemst";
import PaymentFlowSectionLabel from "../checkout/PaymentFlowSectionLabel";
import { getApiData } from "@/utils/api";
import BookingPendingCounter from "./BookingPendingCounter";
import { EBookingStatus, IDBBookingDetails, IDBTourIncludeDetails } from "@/utils/interface-database";
import BookingDetailsHidration from "./BookingDetailsHidration";
import { IBookingTimeActivitySlot } from "@/utils/interface-booking";
import { IBookingPrice } from "@/redux/booking/bookingSlice";
// import WarningMessageWhenBookingNotGood from "../../components/WarningMessageWhenBookingNotGood";

export default async function BookingDetailsPage(
  {
    params,
    searchParams
  }
    :
    {
      params: Promise<{
        booking_id: string
      }>,
      searchParams: Promise<{ newDate?: string }>;
    }
) {

  const getParams = await searchParams;


  const resolvedParams = await params;
  const booking_id = resolvedParams.booking_id;

  const details = await getApiData<{
    ok: boolean;
    message: string;
    booking: IDBBookingDetails | null;
    tour: IDBTourIncludeDetails;
    timeSlot: IBookingTimeActivitySlot;
    price: IBookingPrice;
    slots: IBookingTimeActivitySlot[];
    // slotsForView: IBookingTimeActivitySlot[];
  }>("/booking-public/get-booking-details", "POST", {
    booking_id,
    newDate: getParams?.newDate
  }, "not-authorize", "application/json");

  console.log("details for reserved booking:", details);

  const rightContent = () => {

    if (details.booking === null) {
      return <></>;
    }

    return <>
      <BookingPendingCounter
        key={'holding-spot'}
        expiring_date={details.booking.date_expire_after_creating}
      />

      <FormSelectedValues
        key={'selected-values'}
        slots={details.slots}
      // slots={details.slotsForView}
      />

      <FormSectionChecksItems key={'checks-items'} hideInMobile={true} />

      {
        details?.tour?.booked_tours_today && details.tour.booked_tours_today >= 5 ? <IconText iconType="danger-outline" type="icon-text-alert" variation="danger" text={`High demand – booked ${details.tour.booked_tours_today} times today`} key={'alert-for-hight-demand'} fullWidthCentered={true} />
          :
          <span key={'no-demand'} />
      }
    </>
  }


  if (details.booking === null || details.booking.status !== EBookingStatus.RESERVED) {
    return <>
      <HeaderHome type="for-payment-flow" />

      <TourSubheader
        type="for-not-valid-booking"
        activeStep="booking-information"
        completedSteps={[]} />

      <MainFooter />
    </>
  }


  return <>

    <BookingDetailsHidration
      tour={details.tour}
      timeSlotStart={details.timeSlot}
      price={details.price}
      participants={details.booking.count_participants}
      booking={details.booking}
    >

      <HeaderHome type="for-payment-flow" />

      <TourSubheader
        type="for-payment-flow"
        activeStep="booking-information"
        completedSteps={[]} />



      <TourContainerX2Columns
        type="for-payment-flow"
        /*leftChildren={[

          <PaymentFlowSectionDetails key={'details'} />,
          // <PaymentFlowSectionPayment key={'payment'} />
          <PaymentFlowSectionLabel key={'payment-details'} />

        ]}*/
        leftChildren={<>
          <div className="mobile-right-form-on-top">
            {rightContent()}
          </div>

          <IconText type="payment-flow-secure-form" iconType="lock-outline" text="Secure Form" className="secure-form-label" showOnlyOnMobile={true} />

          <PaymentFlowSectionDetails key={'details'} />
          <PaymentFlowSectionLabel key={'payment-details'} hideInMobile={true} />

          <div className="mobile-right-form-on-top">
            <FormSectionChecksItems key={'checks-items'} />
          </div>

        </>}
        /*rightChildren={[

          <BookingPendingCounter
            key={'holding-spot'}
            expiring_date={details.booking.date_expire_after_creating}
          />,

          <FormSelectedValues
            key={'selected-values'}
            slots={details.slots}
          // slots={details.slotsForView}
          />,

          <FormSectionChecksItems key={'checks-items'} />,

          details?.tour?.booked_tours_today && details.tour.booked_tours_today >= 5 ? <IconText iconType="danger-outline" type="icon-text-alert" variation="danger" text={`High demand – booked ${details.tour.booked_tours_today} times today`} key={'alert-for-hight-demand'} fullWidthCentered={true} />
            :
            <span key={'no-demand'} />


        ]}*/
        rightChildren={rightContent()}
      />

      <MainFooter />
    </BookingDetailsHidration>


  </>
}