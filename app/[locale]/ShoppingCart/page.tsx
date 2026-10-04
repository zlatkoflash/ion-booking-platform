import HeaderHome from "@/components/headers/HeaderHome";
import BookingAndRefundsHeading from "../Client/BookingsAndRefunds/components/BookingAndRefundsHeading";
import TourContainerX2Columns from "@/components/sections/TourContainerX2Columns";
import { getApiData } from "@/utils/api";
import { getLoggedUser } from "@/utils/supabaseServer";
import { EBookingStatus, IDBBookingDetails, IDBTourIncludeDetails } from "@/utils/interface-database";
import NoContentIllustration from "../Client/BookingsAndRefunds/components/NoContentIllustration";
import CartItemsWrap from "./components/CartItem";
import { ISingleActivityPrice } from "@/redux/booking/bookingSlice";
import BookingPendingCounter from "../booking/[booking_id]/details/BookingPendingCounter";
import FormSectionChecksItems from "../tour/[slug]/FormSectionChecksItemst";
import BookingFormTotalPanel from "./components/BookingFormTotalPanel";
import { getTranslations } from "next-intl/server";
import { IBokunCart } from "@/utils/interface-bokun";
import { getCartSessionId } from "@/utils/cart-server";
import { getCartDetails } from "@/utils/cart";
import CartItems from "./components/CartItems";
import BookingFormCartItems from "./components/BookingFormCartItems";

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

  const tCommon = await getTranslations("Common");

  const loggedUser = await getLoggedUser();

  /*const details = await getApiData<{
    ok: boolean,
    message: string,
    booking: IDBBookingDetails | null,
    tour: IDBTourIncludeDetails,
    price: ISingleActivityPrice
  }>("/booking-public/get-reserved-booking", "POST", {
    browser_id: params.session
  },
    loggedUser === null ? "not-authorize" : "authorize", "application/json");

  console.log("bookingReserved details:", details);*/

  const cart_session_id = await getCartSessionId();
  /*const cartDetails = await getApiData<{
    ok: boolean,
    detailsCart: IBokunCart
  }>('/booking-public/get-cart-details', "POST", {
    sessionId: cart_session_id
  }, "not-authorize", "application/json");*/
  const cartDetails = await getCartDetails(cart_session_id);

  // console.log("cartDetails:::", cartDetails);

  const RightContent = () => {

    // if (details.booking === null) return <></>

    return <>
      {
        /*<BookingPendingCounter
        key={'holding-spot'}
        expiring_date={details.booking.date_expire_after_creating}
      />*/
      }

      <BookingFormCartItems />

      <FormSectionChecksItems key={"check-items-about-booking"} showStrict={true} />
    </>
  }

  if (cartDetails.ok === false || cartDetails.detailsCart.activityBookings.length === 0) {
    return <>
      <HeaderHome />

      <BookingAndRefundsHeading title={tCommon("shopping_cart")} />
      <NoContentIllustration type="no-items-in-cart"
        title={tCommon("your_cart_is_empty")}
        paragraph={tCommon("looks_like_you_havent_added_anything_yet")}
      />
    </>
  }



  return <>

    <HeaderHome />

    <BookingAndRefundsHeading title={tCommon("shopping_cart")} />


    {
      /*(details.booking === null || details.booking.status !== EBookingStatus.RESERVED || details.booking.is_expired) && <>
        <NoContentIllustration type="no-items-in-cart"
          title={tCommon("your_cart_is_empty")}
          paragraph={tCommon("looks_like_you_havent_added_anything_yet")}
        />
      </>*/
    }


    {<>
      <TourContainerX2Columns
        type="for-shopping-cart"
        leftChildren={<>
          <div className="mobile-left-content">
            {RightContent()}
          </div>
          {/*<CartItemsWrap booking={details.booking} key={`${details.booking.id}`} tour={details.tour} price={details.price} />*/}
          <CartItems />
        </>}

        rightChildren={RightContent()}
      />
    </>
    }



  </>
}