"use client";


import IconText from "@/components/buttons/IconText";
import CartItemsLines from "@/components/typography/CartItemsLines";
import SmallDescriptionForTheTour from "@/app/[locale]/tour/[slug]/SmallDescriptionForTheTour";
import EditButtonsForTour from "@/app/[locale]/booking/components/EditButtonsForTour";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IBookedItems, IBookingTimeActivitySlot } from "@/utils/interface-booking";
import { IBookedOrderPrice, IBookingParticipants, ISingleActivityPrice, setActiveTimeSlot, setFilterParticipantsCount, setPrice } from "@/redux/booking/bookingSlice";
import { updateUrlParam } from "@/utils/navigation";
import { getApiData } from "@/utils/api";
import { useEffect, useState } from "react";
import { slotDateTimeToSupabaseTimeZone00 } from "@/utils/dates-times";
import { EBookingStatus, IDBBookingDetails, IDBTourIncludeDetails } from "@/utils/interface-database";
import { getArrayOfParticipantsForUpdateTheBooking } from "@/utils/booking-client";
import ZIcon from "@/components/icons/ZIcon";
import { useTranslations } from "next-intl";
import BookedProductItem from "../../tour/[slug]/BookedProductItem";
import { useSearchParams } from "next/navigation";
import BookingTotalPanel from "../../tour/[slug]/BookingTotalPanel";


export interface IBookedProductDetails {
  booking: IDBBookingDetails,
  tour: IDBTourIncludeDetails,
  highDemandForToday: boolean,
  booked_today: number,
  price: ISingleActivityPrice,
  slots: IBookingTimeActivitySlot[],
  activeTimeSlot: IBookingTimeActivitySlot,
  ok: boolean,
  message: string,
}

export default function BookingItemsCheckout(
  {
    // slots,
    booked_prouducts,
    single_product_view_details,
    price_booking
  }
    :
    {
      // slots: IBookingTimeActivitySlot[],
      booked_prouducts: IBookedItems[],
      single_product_view_details: IBookedProductDetails | null,
      price_booking: IBookedOrderPrice
    }
) {





  // console.log("booked_prouducts:", booked_prouducts);

  const searchParams = useSearchParams()
  const bookedProduct = searchParams.get('view-booked-product')

  /*const [openedProductId, setOpenedProductId] = useState<string | null>(
    bookedProduct
    // "WAL-T147917034"
  );*/

  /*useEffect(() => {
    if (bookedProduct) {
      setOpenedProductId(bookedProduct)
    }
  }, [bookedProduct])*/



  return <>

    {
      booked_prouducts.map((product_item, index) => {
        return <BookedProductItem key={`product-item-${product_item.productConfirmationCode}`}
          title={product_item.title}
          description={product_item.description}
          thumbnail_url={product_item.photo}
          price_total={product_item.total_price}
          participants={product_item.participants}
          productConfirmationCode={product_item.productConfirmationCode}
          // toggleTheProduct={setOpenedProductId}
          // activeProductId={openedProductId}
          dateString={product_item.dateString}
          single_product_view_details={
            bookedProduct === product_item.productConfirmationCode ?
              single_product_view_details
              :
              null
          }
        />
      })
    }

    <BookingTotalPanel price_booking={price_booking} />


  </>
}