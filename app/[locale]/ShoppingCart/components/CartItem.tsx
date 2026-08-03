"use client";

import Image from "next/image";
import Title from "@/components/typography/Title";
import IconText from "@/components/buttons/IconText";
import { EBookingStatus, IDBBookingDetails, IDBTourIncludeDetails } from "@/utils/interface-database";
import { formatTo12HourTime, longDateTimeForBookingItem, supabaseDateToDayOfWeekMonthDD } from "@/utils/dates-times";
import PriceGroup from "@/components/typography/PriceGroup";
import { IBookingPrice } from "@/redux/booking/bookingSlice";
import ZIcon from "@/components/icons/ZIcon";
import BookingGroupStats from "./BookingGroupStats";
import { Dropdown } from "react-bootstrap";




export default function CartItemsWrap(
  {
    booking,
    tour,
    price
  }
    :
    {
      booking: IDBBookingDetails,
      tour: IDBTourIncludeDetails,
      price: IBookingPrice
    }
) {



  return <>
    <div className="booking-list-table cart-items">
      {
        Array.from({ length: booking.count_participants.adults }, (_, index) => (
          <CartItem
            key={`adult-${index}`}
            booking={booking}
            tour={tour}
            guestType="adult"
            price={price}
          />
        ))
      }
      {
        Array.from({ length: booking.count_participants.children }, (_, index) => (
          <CartItem
            key={`youth-${index}`}
            booking={booking}
            tour={tour}
            guestType="child"
            price={price}
          />
        ))
      }
      {
        Array.from({ length: booking.count_participants.infants }, (_, index) => (
          <CartItem
            key={`infant-${index}`}
            booking={booking}
            tour={tour}
            guestType="infant"
            price={price}
          />
        ))
      }
    </div>
  </>
}



function CartItem(
  {
    booking,
    tour,
    guestType,
    price
  }
    :
    {
      booking: IDBBookingDetails,
      tour: IDBTourIncludeDetails,
      guestType: "adult" | "child" | "infant",
      price: IBookingPrice
    }
) {

  const X1Price = () => {
    if (guestType === "adult") return price.adult_x1_price;
    if (guestType === "child") return price.child_x1_price;
    if (guestType === "infant") return price.infant_x1_price;
    return 0;
  }

  const bookingGroupStatsItems = () => {
    return [
      <IconText key="tour-date" text={`Tour date ${supabaseDateToDayOfWeekMonthDD(booking.date_tour_start)}, ${formatTo12HourTime(booking.time_tour_start_string)}`} type="icon-text-stat-for-booking-item" iconType="calendar-check-outline" />,
      <IconText key="guest-type" text={
        `${guestType.charAt(0).toUpperCase() + guestType.slice(1)}`
      } type="icon-text-stat-for-booking-item" iconType="person" />,
      <IconText key="date-reserved" text={`Reserved ${longDateTimeForBookingItem(booking.date_reserved as string)}`} type="icon-text-stat-for-booking-item" iconType="calendar-outline" />
    ]
  }

  return <>
    <div className="booking-table-item">
      <div className="left-content">
        <Image src={tour.cover} alt={booking.tour_title} width={120} height={120} />
        <div className="content-inner">


          <div className="title-label">
            <div className="titles-content">
              <Title headingType="h3" headingStyle="Text-lg-Medium" color="--color-text-fg-on-accent">
                {booking.tour_title}
              </Title>
              <Title headingType="p" headingStyle="Text-xs-Regular" color="--color-text-fg-subtle" > Here we will put the tour description</Title>
            </div>


            <div className="title-actions">
              <ZIcon type="pencil-outline" variant="secondary" onClick={() => {
                // alert(12);
              }} />
              <ZIcon type="trash-outline" variant="danger" onClick={() => {
                // alert(13);
              }} />

              <Dropdown align="end">
                <Dropdown.Toggle variant="light" className="p-1">
                  <ZIcon type="x3-dots-actions" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/edit">Edit</Dropdown.Item>
                  {
                    // <Dropdown.Item href="#/archive">Archive</Dropdown.Item>
                  }
                  <Dropdown.Divider />
                  <Dropdown.Item href="#/delete" className="text-danger">
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

            </div>


          </div>


          <BookingGroupStats items={bookingGroupStatsItems()} showOnlyOnDesktop={true} />

          <hr />

          <div className="price-content-wrap">
            <PriceGroup type="shopping-cart-item" price={X1Price()} discountPercent={tour.discount} />
          </div>

        </div>

        <div className="mobile-content">
          <BookingGroupStats items={bookingGroupStatsItems()} showOnlyOnMobile={true} />
          <hr />

          <div className="price-content-wrap">
            <PriceGroup type="shopping-cart-item" price={X1Price()} discountPercent={tour.discount} />
          </div>
        </div>

      </div>
    </div>
  </>
}