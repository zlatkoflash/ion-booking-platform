"use client";

import ButtonDefault from "@/components/buttons/ButtonDefault";
import CartItemsLines from "@/components/typography/CartItemsLines";
import Title from "@/components/typography/Title";
import { IBookingParticipants, IBookingPrice } from "@/redux/booking/bookingSlice";
import { useRouter } from "@/translations-engine/routing";
import { IDBBookingDetails, IDBTourIncludeDetails } from "@/utils/interface-database";

export default function BookingFormTotalPanel(
  {
    participants,
    price,
    tour,
    booking
  }
    :
    {
      participants: IBookingParticipants,
      price: IBookingPrice,
      tour: IDBTourIncludeDetails,
      booking: IDBBookingDetails
    }
) {

  const countItems = participants.adults + participants.children + participants.infants;
  const router = useRouter();

  return <>
    <form className="form-booking-selection">


      <Title headingType="h3" headingStyle="Text-xl-Semibold" color="--color-text-fg">
        Subtotal ({countItems}) {countItems === 1 ? "item" : "items"}
      </Title>

      <CartItemsLines
        participants={participants}
        price={price}
        tourOut={tour}
      />

      <ButtonDefault label="Go to checkout" variant="primary" onClick={() => {
        router.push(`/booking/${booking.id}/details`);
      }} className="d-flex w-100" disabled={booking.is_expired} />


    </form>

  </>
}