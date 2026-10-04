"use client";

import { useAppSelector } from "@/redux/hooks";
import PriceGroup from "./PriceGroup";
import { IBookingParticipants, ISingleActivityPrice } from "@/redux/booking/bookingSlice";
import { IDBTourIncludeDetails } from "@/utils/interface-database";
import { useTranslations } from "next-intl";
import Title from "./Title";

// this is for single booking
export default function CartItemsLines(
  {
    price = null,
    participants = null,
    tourOut = null,
    className = "",
    bookedProductPriceDetails = null
  }
    :
    {
      price?: ISingleActivityPrice | null,
      participants?: IBookingParticipants | null,
      tourOut?: IDBTourIncludeDetails | null,
      className?: string,
      bookedProductPriceDetails?: {
        participants: IBookingParticipants;
        price: ISingleActivityPrice;
      } | null
    }
) {

  const tForms = useTranslations("Forms");

  const participantsRedux = useAppSelector((state) => state.booking.filters.participantsCount);
  const participantsCount = participants !== null ? participants : participantsRedux;
  const priceRedux = useAppSelector((state) => state.booking.price_active_product);
  const bookingPrice = price !== null ? price : priceRedux;
  const tourRedux = useAppSelector((state) => state.booking.tour);
  const tour = tourOut !== null ? tourOut : tourRedux;



  const contentForPrice = (type: "editable-product-price" | "booked-product-price" = "editable-product-price") => {

    let priceFor = bookingPrice;
    let participantsCountFor = participantsCount;

    if (type === "booked-product-price" && bookedProductPriceDetails !== null) {
      participantsCountFor = bookedProductPriceDetails.participants;
      priceFor = bookedProductPriceDetails.price;
    }

    return <div className={`cart-items-lines ${className}`}>
      {
        participantsCountFor.adults > 0 && <PriceGroup price={priceFor.adults} text={`${participantsCountFor.adults === 1 ? tForms("adult") : `x${participantsCountFor.adults} ${tForms("adults")}`} `} type="cart-item" />
      }

      {
        participantsCountFor.children > 0 && <PriceGroup price={priceFor.children} text={participantsCountFor.children === 1 ? tForms("child") : `x${participantsCountFor.children} ${tForms("children")}`} type="cart-item" />
      }

      {
        priceFor.fees === 0 && <PriceGroup price={priceFor.fees} text={tForms("booking_fee")} type="cart-item" badgeText={tForms('no_fees')} />
      }

      <PriceGroup
        price={priceFor.total}
        // discountPercent={tour !== null ? tour.discount : 0} 
        text={tForms('total').toLocaleUpperCase()} type="cart-item" bolder={true} />
    </div>
  }



  console.log("participantsCount:", participantsCount);

  if (bookingPrice.total === 0 && bookedProductPriceDetails === null) return <></>

  return <>
    {
      (bookedProductPriceDetails !== null && bookingPrice.total !== 0) &&
      <>
        <Title headingType="h5" headingStyle="Text-lg-Regular">
          Actual Price Details
        </Title>
      </>
    }
    {bookedProductPriceDetails !== null && contentForPrice("booked-product-price")}
    {
      (bookedProductPriceDetails !== null && bookingPrice.total !== 0) &&
      <>
        <hr />
        <Title headingType="h5" headingStyle="Text-lg-Regular">
          New Price Details
        </Title>
      </>
    }
    {
      bookingPrice.total > 0 && contentForPrice("editable-product-price")
    }
  </>
}


// this is for card
export function CartItemsLinesForCart(
  {
    className = ""
  }
    :
    {
      className?: string
    }
) {
  const tForms = useTranslations("Forms");


  const cart = useAppSelector((state) => state.booking.cart);
  const cartDetails = cart.cartDetails;

  if (cartDetails === null) return <></>

  return <>
    <div className={`cart-items-lines ${className}`}>


      {
        cartDetails.activityBookings.map((activityBooking, index) => {
          return <PriceGroup key={`index-${index}`} price={activityBooking.totalPrice} text={activityBooking.activity.title} type="cart-item" />
        })
      }

      <PriceGroup price={0} text={tForms("booking_fee")} type="cart-item" badgeText={tForms('no_fees')} />

      <PriceGroup
        price={cartDetails.totalPrice}
        // discountPercent={0} 
        text={tForms('total').toLocaleUpperCase()} type="cart-item" bolder={true} />
    </div>
  </>
}


export function CartLineItemsForUpdatingBookingProduct({
  className = "",
  bookedProductPrice,
  bookedParticipants,
  title
}
  :
  {
    className?: string,
    bookedProductPrice: ISingleActivityPrice,
    bookedParticipants: IBookingParticipants,
    title?: string
  }) {

  console.log("bookedProductPrice:", bookedProductPrice);

  const tForms = useTranslations("Forms");

  return <>
    <div className={`cart-items-lines ${className}`}>



      <Title headingType="h5" headingStyle="Text-lg-Regular">
        {title !== undefined ? title : "Actual Price"}
      </Title>

      {
        bookedParticipants.adults > 0 && <PriceGroup price={bookedProductPrice.adults} text={`${bookedParticipants.adults === 1 ? tForms("adult") : `x${bookedParticipants.adults} ${tForms("adults")}`}`} type="cart-item" />
      }
      {
        bookedParticipants.children > 0 && <PriceGroup price={bookedProductPrice.children} text={`${bookedParticipants.children === 1 ? tForms("child") : `x${bookedParticipants.children} ${tForms("children")}`}`} type="cart-item" />
      }
      {
        bookedParticipants.infants > 0 && <PriceGroup price={bookedProductPrice.infants} text={`${bookedParticipants.infants === 1 ? tForms("infant") : `x${bookedParticipants.infants} ${tForms("infants")}`}`} type="cart-item" />
      }


      <PriceGroup price={0} text={tForms("booking_fee")} type="cart-item" badgeText={tForms('no_fees')} />

      <PriceGroup
        price={bookedProductPrice.priceWithDiscount}
        // discountPercent={0} 
        text={tForms('total').toLocaleUpperCase()} type="cart-item" bolder={true} />
    </div>
  </>
}