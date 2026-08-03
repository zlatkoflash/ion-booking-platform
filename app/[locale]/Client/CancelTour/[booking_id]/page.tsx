import HeaderHome from "@/components/headers/HeaderHome";
import TourSubheader from "@/components/headers/TourSubheader";
import TourContainerX2Columns from "@/components/sections/TourContainerX2Columns";
import FormSelectedValuesForCancelling from "../components/FormSelectedValuesForCancelling";
import BookingDetailsHidration from "@/app/[locale]/booking/[booking_id]/details/BookingDetailsHidration";
import { getApiData } from "@/utils/api";
import { IDBBookingDetails, IDBPaymentDetails, IDBRefundDetails, IDBTourIncludeDetails } from "@/utils/interface-database";
import { IBookingTimeActivitySlot } from "@/utils/interface-booking";
import { IBookingPrice } from "@/redux/booking/bookingSlice";
import BookingAndRefundsHeading from "../../BookingsAndRefunds/components/BookingAndRefundsHeading";
import NoContentIllustration from "../../BookingsAndRefunds/components/NoContentIllustration";
import IconText from "@/components/buttons/IconText";
import FormCancellation from "../components/FormCancellation";
import TopLabelAboutCancelling from "../components/TopLabelAboutCancelling";
import { getTranslations } from "next-intl/server";

export default async function CancelTour(
  { params }: {
    params: Promise<{ booking_id: string, detailType: "tour-detail" | "payment-detail" }>
  }
) {

  const { booking_id } = await params;


  const details = await getApiData<{
    ok: boolean,
    message: string,
    booking: IDBBookingDetails | null,
    tour: IDBTourIncludeDetails | null,
    payments: IDBPaymentDetails[],
    refunds: IDBRefundDetails[],
    timeSlot: IBookingTimeActivitySlot,
    price: IBookingPrice,
    slots: IBookingTimeActivitySlot[]
  }>("/booking-client/get-booking-ticket-details", "POST", {
    booking_id: booking_id
  }, "authorize", "application/json");

  console.log("details for the booking:", details);

  const tCommon = await getTranslations("Common");


  if (details.booking === null || details.tour === null || details.ok === false) {
    return <>
      <HeaderHome />

      <BookingAndRefundsHeading title={tCommon("error_404")} />
      <NoContentIllustration type="no-items-after-searching"
        title={tCommon("tour_unavailable")}
        paragraph={details.message || tCommon("we_couldnt_find_any_booking_with_this_id")}
      />
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

      <HeaderHome />
      <TourSubheader
        title={tCommon("cancel_booking")}
        subject_id={1}
        // wishlistHeartClicked={false}
        showTheBadges={false}
        showTheHeartAndShare={false}
      />


      <TourContainerX2Columns type="for-payment-flow"
        importantShowRightColumnInMobile={true}
        leftChildren={
          [
            <FormCancellation
              key={booking_id + "-form-cancellation"}
              booking={details.booking}
            />
          ]
        }
        rightChildren={
          [
            <TopLabelAboutCancelling key={'label' + booking_id} booking={details.booking} />,
            <FormSelectedValuesForCancelling slots={details.slots} key={booking_id + "-form-selected-values-for-cancelling"} />
          ]
        }
      />

    </BookingDetailsHidration>

  </>
}