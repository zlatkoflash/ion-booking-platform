"use client";

import ZIcon from "@/components/icons/ZIcon";
import Title from "@/components/typography/Title";
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { getCartDetails } from "@/utils/cart";
import { IBokunCart, IBokunCartActivity } from "@/utils/interface-bokun";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import BookingGroupStats from "./BookingGroupStats";
import PriceGroup from "@/components/typography/PriceGroup";
import { DateTimeIntegerToDateStringWithTime, formatTo12HourTime, longDateTimeForBookingItem } from "@/utils/dates-times";
import IconText from "@/components/buttons/IconText";
import { getApiData } from "@/utils/api";
import { ON_CART_UPDATED } from "@/utils/window-events";
import { updateUrlParam } from "@/utils/navigation";
import { setCartDetails } from "@/redux/booking/bookingSlice";

export default function CartItems() {

  /*const [cartDetails, setCartDetails] = useState<IBokunCart | null>(null)

  const LoadTheCartDetails = async () => {
   

    const cartDetails = await getCartDetails(cart.cart_session_id);
    if (cartDetails.ok) {
      setCartDetails(cartDetails.detailsCart);
    }
  }


  useEffect(() => {

    LoadTheCartDetails()

    // 2. Listen for your custom add-to-cart event across the app
    window.addEventListener(ON_CART_UPDATED, LoadTheCartDetails);

    // 3. Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener(ON_CART_UPDATED, LoadTheCartDetails);
    };

  }, []);*/

  const cart = useAppSelector((state) => state.booking.cart);
  const cartDetails = cart.cartDetails;

  if (cartDetails === null) return null;

  return <>
    <div className="booking-list-table cart-items">
      {
        cartDetails.activityBookings.map((activity, index) => {
          return <CartItem key={`activity-${activity.id}`} cartActivity={activity} />
        })
      }
    </div>
  </>
}




function CartItem(
  { cartActivity }
    :
    { cartActivity: IBokunCartActivity }
) {

  // const updateUrlParamFor = updateUrlParam();

  const dispatch = useAppDispatch();

  const locale = useLocale();
  const tCommon = useTranslations("Common");
  const tForms = useTranslations("Forms");

  const cart = useAppSelector((state) => state.booking.cart);

  const activityGroupStatsItems = () => {
    return [
      <IconText key="tour-date" text={`${cartActivity.dateString}`} type="icon-text-stat-for-booking-item" iconType="calendar-check-outline" />,
      <IconText key="guest-type" text={
        `${5} guests`
      } type="icon-text-stat-for-booking-item" iconType="person" />,
      <IconText key="date-reserved" text={`${`Added`} ${DateTimeIntegerToDateStringWithTime(cartActivity.creationDate, locale)}`} type="icon-text-stat-for-booking-item" iconType="calendar-outline" />
    ]
  }

  const RemoveTheCartItem = async () => {

    const cartDetails = await getApiData<{
      ok: boolean,
      cartDetails: IBokunCart,
      message: string
    }>('/booking-public/remove-item-from-cart', "POST", {
      sessionId: cart.cart_session_id,
      activityBookingId: cartActivity.id
    }, "not-authorize", "application/json");

    console.log("Cart item removed:", cartDetails);

    // window.dispatchEvent(new CustomEvent(ON_CART_UPDATED))
    // updateUrlParamFor('refresh', (new Date()).valueOf());
    if (cartDetails.ok === true) {
      dispatch(setCartDetails({ cart: cartDetails.cartDetails }))
    }

  }

  return <>
    <div className="booking-table-item">
      <div className="left-content">
        <Image src={cartActivity.activity.keyPhoto.derived.find(x => x.name === "preview")?.url ?? ""} alt={cartActivity.activity.title} width={120} height={120} />
        <div className="content-inner">


          <div className="title-label">

            <div className="titles-content">
              <Title headingType="h3" headingStyle="Text-lg-Medium" color="--color-text-fg-on-accent">
                {cartActivity.activity.title}
              </Title>
              <Title headingType="p" headingStyle="Text-xs-Regular" color="--color-text-fg-subtle" > {cartActivity.activity.excerpt}</Title>
            </div>


            <div className="title-actions">
              <ZIcon type="pencil-outline" variant="secondary" onClick={() => {
                // alert(12);
              }} />
              <ZIcon type="trash-outline" variant="danger" onClick={() => {
                // alert(13);
                RemoveTheCartItem()
              }} />

              <Dropdown align="end">
                <Dropdown.Toggle variant="light" className="p-1">
                  <ZIcon type="x3-dots-actions" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/edit">{tForms("edit")}</Dropdown.Item>
                  {
                    // <Dropdown.Item href="#/archive">Archive</Dropdown.Item>
                  }
                  <Dropdown.Divider />
                  <Dropdown.Item href="#/delete" className="text-danger" onClick={(e) => {
                    e.preventDefault()
                    RemoveTheCartItem()
                  }}>
                    {tForms("delete")}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

            </div>

          </div>

          <BookingGroupStats items={activityGroupStatsItems()} showOnlyOnDesktop={true} />

          <hr />

          <div className="price-content-wrap">
            <PriceGroup type="shopping-cart-item" price={cartActivity.totalPrice}
            // discountPercent={0}
            />
          </div>


        </div>


        <div className="mobile-content">
          <BookingGroupStats items={activityGroupStatsItems()} showOnlyOnMobile={true} />
          <hr />

          <div className="price-content-wrap">
            <PriceGroup type="shopping-cart-item" price={cartActivity.totalPrice}
            // discountPercent={0}
            />
          </div>
        </div>

      </div>
    </div>
  </>
}