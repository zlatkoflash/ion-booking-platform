import HeaderHome from "@/components/headers/HeaderHome";
import BookingAndRefundsHeading from "../Client/BookingsAndRefunds/components/BookingAndRefundsHeading";
import TourContainerX2Columns from "@/components/sections/TourContainerX2Columns";
import { getApiData } from "@/utils/api";
import { getLoggedUser } from "@/utils/supabaseServer";
import { EBookingStatus, IDBBookingDetails, IDBTourIncludeDetails } from "@/utils/interface-database";
import NoContentIllustration from "../Client/BookingsAndRefunds/components/NoContentIllustration";
import CartItemsWrap from "./components/CartItem";
import { IBookingPrice } from "@/redux/booking/bookingSlice";
import BookingPendingCounter from "../booking/[booking_id]/details/BookingPendingCounter";
import FormSectionChecksItems from "../tour/[slug]/FormSectionChecksItemst";
import BookingFormTotalPanel from "./components/BookingFormTotalPanel";

export default async function ShoppingCart(
  {
    searchParams
  }
    :
    {
      searchParams: { session?: string };
    }
) {

  const params = await searchParams;


  const loggedUser = await getLoggedUser();

  const details = await getApiData<{
    ok: boolean,
    message: string,
    booking: IDBBookingDetails | null,
    tour: IDBTourIncludeDetails,
    price: IBookingPrice
  }>("/booking-public/get-reserved-booking", "POST", {
    browser_id: params.session
  },
    loggedUser === null ? "not-authorize" : "authorize", "application/json");

  console.log("bookingReserved details:", details);

  const RightContent = () => {

    if (details.booking === null) return <></>

    return <>
      <BookingPendingCounter
        key={'holding-spot'}
        expiring_date={details.booking.date_expire_after_creating}
      />

      <BookingFormTotalPanel
        key={`booking-form-total-panel-${details.booking.id}`}
        participants={details.booking.count_participants}
        price={details.price}
        tour={details.tour}
        booking={details.booking}
      />

      <FormSectionChecksItems key={"check-items-about-booking"} showStrict={true} />
    </>
  }

  if (details.ok === false) {
    return <>
      <HeaderHome />

      <BookingAndRefundsHeading title="Shipping Cart" />
      <NoContentIllustration type="no-items-in-cart"
        title="Your cart is empty"
        paragraph="Looks like you haven’t added anything yet."
      />
    </>
  }



  return <>

    <HeaderHome />

    <BookingAndRefundsHeading title="Shipping Cart" />


    {
      (details.booking === null || details.booking.status !== EBookingStatus.RESERVED || details.booking.is_expired) && <>
        <NoContentIllustration type="no-items-in-cart"
          title="Your cart is empty"
          paragraph="Looks like you haven’t added anything yet."
        />
      </>
    }


    {
      (details.booking !== null && details.booking.status === EBookingStatus.RESERVED && !details.booking.is_expired) && <>
        <TourContainerX2Columns
          type="for-shopping-cart"
          leftChildren={<>
            <div className="mobile-left-content">
              {RightContent()}
            </div>
            <CartItemsWrap booking={details.booking} key={`${details.booking.id}`} tour={details.tour} price={details.price} />
          </>}
          /*rightChildren={[
            <BookingPendingCounter
              key={'holding-spot'}
              expiring_date={details.booking.date_expire_after_creating}
            />,

            <BookingFormTotalPanel
              key={`booking-form-total-panel-${details.booking.id}`}
              participants={details.booking.count_participants}
              price={details.price}
              tour={details.tour}
              booking={details.booking}
            />,

            <FormSectionChecksItems key={"check-items-about-booking"} showStrict={true} />
          ]}*/
          rightChildren={RightContent()}
        />
      </>
    }



  </>
}