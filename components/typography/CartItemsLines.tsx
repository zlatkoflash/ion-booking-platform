"use client";

import { useAppSelector } from "@/redux/hooks";
import PriceGroup from "./PriceGroup";
import { IBookingParticipants, IBookingPrice } from "@/redux/booking/bookingSlice";
import { IDBTourIncludeDetails } from "@/utils/interface-database";
import { useTranslations } from "next-intl";

export default function CartItemsLines(
  {
    price = null,
    participants = null,
    tourOut = null,
    className = ""
  }
    :
    {
      price?: IBookingPrice | null,
      participants?: IBookingParticipants | null,
      tourOut?: IDBTourIncludeDetails | null,
      className?: string
    }
) {

  const tForms = useTranslations("Forms");

  const participantsRedux = useAppSelector((state) => state.booking.filters.participantsCount);
  const participantsCount = participants !== null ? participants : participantsRedux;
  const priceRedux = useAppSelector((state) => state.booking.price);
  const bookingPrice = price !== null ? price : priceRedux;
  const tourRedux = useAppSelector((state) => state.booking.tour);
  const tour = tourOut !== null ? tourOut : tourRedux;






  console.log("participantsCount:", participantsCount);

  if (bookingPrice.total === 0) return <></>

  return <>
    <div className={`cart-items-lines ${className}`}>
      {
        participantsCount.adults > 0 && <PriceGroup price={bookingPrice.adults} text={`${participantsCount.adults === 1 ? tForms("adult") : `x${participantsCount.adults} ${tForms("adults")}`} `} type="cart-item" />
      }

      {
        participantsCount.children > 0 && <PriceGroup price={bookingPrice.children} text={participantsCount.children === 1 ? tForms("child") : `x${participantsCount.children} ${tForms("children")}`} type="cart-item" />
      }

      {
        bookingPrice.fees === 0 && <PriceGroup price={bookingPrice.fees} text={tForms("booking_fee")} type="cart-item" badgeText={tForms('no_fees')} />
      }

      <PriceGroup price={bookingPrice.total} discountPercent={tour !== null ? tour.discount : 0} text={tForms('total').toLocaleUpperCase()} type="cart-item" bolder={true} />
    </div>
  </>
}