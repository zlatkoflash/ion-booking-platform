import MainFooter from "@/components/footers/MainFooter";
import HeaderHome from "@/components/headers/HeaderHome";
import TourSubheader from "@/components/headers/TourSubheader";
import TourContainerX2Columns from "@/components/sections/TourContainerX2Columns";
import PaymentFlowSectionDetails from "./PaymentFlowSectionDetails";
import PaymentFlowSectionPayment from "./PaymentFlowSectionPayment";
import IconText from "@/components/buttons/IconText";
// import FormSelectedValues from "@/app/[locale]/booking/components/FormSelectedValues";
import FormSectionChecksItems from "@/app/[locale]/tour/[slug]/FormSectionChecksItemst";
import CustomerDetailsPanel from "./CustomerDetailsPanel";
import { EBookingStatus, IDBBooking, IDBBookingDetails, IDBTourIncludeDetails } from "@/utils/interface-database";
import { IBookedItems, IBookingTimeActivitySlot } from "@/utils/interface-booking";
import { IBookedOrderPrice, ISingleActivityPrice } from "@/redux/booking/bookingSlice";
import { getApiData } from "@/utils/api";
import BookingDetailsHidration from "../details/BookingDetailsHidration";
import BookingPendingCounter from "../details/BookingPendingCounter";
import BookingItemsCheckout, { IBookedProductDetails } from "../../components/BookingItemsCheckout";

export default async function BookingCheckout(
  {
    params,
    searchParams
  }
    :
    {
      params: Promise<{
        booking_id: string
      }>,
      searchParams: Promise<{
        newDate?: string,
        "view-booked-product"?: string;
      }>;
    }
) {

  const getParams = await searchParams;

  const resolvedParams = await params;
  const booking_id = resolvedParams.booking_id;

  const details = await getApiData<{
    ok: boolean,
    message: string,
    // booking: IDBBookingDetails,
    // tour: IDBTourIncludeDetails,
    // timeSlot: IBookingTimeActivitySlot,
    // price: ISingleActivityPrice,
    // slots: IBookingTimeActivitySlot[],
    parentBooking: IDBBookingDetails,
    // bookingsProducts: IDBBookingDetails[];
    booked_prouducts: IBookedItems[];
    price_booking: IBookedOrderPrice
  }>("/booking-public/get-booking-details", "POST", {
    booking_id
  }, "not-authorize", "application/json");

  console.log("details checkout:", details);



  let bookedProductResult = null;
  if (typeof getParams["view-booked-product"] === "string") {

    bookedProductResult = await getApiData<IBookedProductDetails>("/booking-public/get-booked-product-details", "POST", {
      productConfirmationCode: typeof getParams["view-booked-product"] === "string" ? getParams["view-booked-product"] : null
    }, "not-authorize");
  }




  const rightContent = () => {
    return <>
      <BookingPendingCounter
        key={'holding-spot'}
        expiring_date={details.parentBooking.date_expire_after_creating}
      />

      <BookingItemsCheckout
        key={'selected-values'}
        // slots={details.slots}
        booked_prouducts={details.booked_prouducts}
        single_product_view_details={bookedProductResult?.ok !== true ? null : bookedProductResult}
        price_booking={details.price_booking}
      />

      <FormSectionChecksItems key={'checks-items'} hideInMobile={true} />

      {
        // <IconText iconType="danger-outline" type="icon-text-alert" variation="danger" text="High demand – booked 12 times today" key={'alert-for-hight-demand'} fullWidthCentered={true} />
        /*details?.tour?.booked_tours_today && details.tour.booked_tours_today >= 5 ? <IconText iconType="danger-outline" type="icon-text-alert" variation="danger" text={`High demand – booked ${details.tour.booked_tours_today} times today`} key={'alert-for-hight-demand'} fullWidthCentered={true} />
          :
          <span key={'no-demand'} />*/
      }
    </>
  }


  if (details.parentBooking === null || details.parentBooking.status !== EBookingStatus.RESERVED) {
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

    {
      /*<BookingDetailsHidration
      tour={details.tour}
      timeSlotStart={details.timeSlot}
      price={details.price}
      participants={details.booking.count_participants}
      booking={details.booking}
    >

      
    </BookingDetailsHidration>*/
    }

    <HeaderHome type="for-payment-flow" />

    <TourSubheader
      type="for-payment-flow"
      activeStep="payment-details"
      completedSteps={["booking-information"]}
    />

    <TourContainerX2Columns
      type="for-payment-flow"
      /*leftChildren={[

        <div className="mobile-right-form-on-top">
          {rightContent()}
        </div>
        // <PaymentFlowSectionDetails key={'details'} />,
        <CustomerDetailsPanel key={'details'} hideInMobile={true} />
        <PaymentFlowSectionPayment key={'payment'} />

      ]}*/
      leftChildren={
        <>
          <div className="mobile-right-form-on-top">
            {rightContent()}
          </div>
          <IconText type="payment-flow-secure-form" iconType="lock-outline" text="Secure Payment" className="secure-form-label" showOnlyOnMobile={true} />
          {
            // <PaymentFlowSectionDetails key={'details'} /> 
          }
          <CustomerDetailsPanel key={'details'} hideInMobile={true} />
          <PaymentFlowSectionPayment key={'payment'} price_booking={details.price_booking} parentBooking={details.parentBooking} />



          <div className="mobile-right-form-on-top">
            <FormSectionChecksItems key={'checks-items'} />
          </div>

        </>
      }
      /*rightChildren={[

        <BookingPendingCounter
          key={'holding-spot'}
          expiring_date={details.booking.date_expire_after_creating}
        />,

        <FormSelectedValues
          key={'selected-values'}
          slots={details.slots}
        />,

        <FormSectionChecksItems key={'checks-items'} />,

        // <IconText iconType="danger-outline" type="icon-text-alert" variation="danger" text="High demand – booked 12 times today" key={'alert-for-hight-demand'} fullWidthCentered={true} />
        details?.tour?.booked_tours_today && details.tour.booked_tours_today >= 5 ? <IconText iconType="danger-outline" type="icon-text-alert" variation="danger" text={`High demand – booked ${details.tour.booked_tours_today} times today`} key={'alert-for-hight-demand'} fullWidthCentered={true} />
          :
          <span key={'no-demand'} />

      ]}*/
      rightChildren={rightContent()}
    />


    <MainFooter />

  </>
}