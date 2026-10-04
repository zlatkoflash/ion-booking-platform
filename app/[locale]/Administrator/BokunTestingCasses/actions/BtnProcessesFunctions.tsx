"use client";

import ButtonDefault from "@/components/buttons/ButtonDefault"
import { IBookingParticipants } from "@/redux/booking/bookingSlice";
import { useAppSelector } from "@/redux/hooks";
import { getApiData } from "@/utils/api";
import { AddCustomerBookingDetails, AttachDefaultPaymentForBooking, ConfirmReservedBooking, ProcessTheCartToReservedBooking, updateBookedProduct } from "@/utils/booking-client";
import { AddActivityToCart } from "@/utils/cart";
import { IBookingTimeActivitySlot } from "@/utils/interface-booking";
import { IDBTourIncludeDetails } from "@/utils/interface-database";
import { useLocale } from "next-intl";

export default function BtnsProcessesFunctions() {
  return <>


    <BtnCartToBookingConfirmation />
    <BtnAddRemoveParticipantToConfirmedBooking />

  </>
}


function BtnCartToBookingConfirmation() {

  const cart = useAppSelector((state) => state.booking.cart);
  const browserGuestId = useAppSelector((state) => state.auth.browser_user_id);
  const locale = useLocale();
  const userAuth = useAppSelector((state) => state.auth.user);

  const ProcessCartToConfirmation = async () => {

    const date = '2026-11-04'


    const detailsForProcess = await getApiData<{
      ok: boolean,
      tour: IDBTourIncludeDetails,
      timeSlot: IBookingTimeActivitySlot,
      message: string
    }>("/booking-public/get-details-for-testing-processing", "POST", {

      date: date

    }, "not-authorize", "application/json");
    console.log("detailsForProcess:", detailsForProcess);

    if (detailsForProcess.ok !== true) {
      console.error("Error getting details for process", detailsForProcess.message);
      return;
    }


    let resultAddActivityToCart = await AddActivityToCart(
      cart.cart_session_id,
      detailsForProcess.tour as IDBTourIncludeDetails,
      detailsForProcess.timeSlot as IBookingTimeActivitySlot,
      { adults: 1, children: 0, infants: 0 },
      date,
      browserGuestId as string,
      locale as string
    );
    resultAddActivityToCart = await AddActivityToCart(
      cart.cart_session_id,
      detailsForProcess.tour as IDBTourIncludeDetails,
      detailsForProcess.timeSlot as IBookingTimeActivitySlot,
      { adults: 0, children: 2, infants: 0 },
      date,
      browserGuestId as string,
      locale as string
    );

    console.log("resultAddActivityToCart:", resultAddActivityToCart);

    const detailsProcessConvertingToReservedBooking = await ProcessTheCartToReservedBooking(
      userAuth,
      cart.cart_session_id,
      locale,
      browserGuestId as string
    );

    console.log("detailsProcessConvertingToReservedBooking:", detailsProcessConvertingToReservedBooking);

    const resultAddingDetailsForBooking = await AddCustomerBookingDetails(
      {
        address: "Lazo Trposki 24",
        city: "Ohrid",
        country: "Macedonia",
        email_address: "zlatkoflash@gmail.com",
        first_name: "Zlatko",
        phone_number: "+389 70 529 556",
        second_name: "Derkoski"
      },
      detailsProcessConvertingToReservedBooking.booking.id,
      userAuth
    );

    console.log("resultAddingDetailsForBooking:", resultAddingDetailsForBooking);

    const resultAttachPMToBooking = await AttachDefaultPaymentForBooking(
      detailsProcessConvertingToReservedBooking.booking.id as string,
      // setupIntent?.payment_method as string,
      "pm_1UL18ZC620g9DkpzeynG68CX",
      userAuth
    );

    console.log("resultAttachPMToBooking:", resultAttachPMToBooking);


    const resultAfterConfirmation = await ConfirmReservedBooking(
      detailsProcessConvertingToReservedBooking.booking?.id as string,
      "payment-type-pay-now",
      locale,
      userAuth
    );

    console.log("resultAfterConfirmation:", resultAfterConfirmation);


  }

  return <>
    <ButtonDefault
      // onClick={() => bookTheExperience(bookingData.slot, priceData.price, priceData.price_with_extras, booked_products)}
      onClick={() => ProcessCartToConfirmation()}
      // onMouseEnter={() => bookTheExperience(bookingData.slot, priceData.price, priceData.price_with_extras, booked_products)}
      // onMouseLeave={() => bookTheExperience(bookingData.slot, priceData.price, priceData.price_with_extras, booked_products)}
      className="btn-primary"
      label="Process Cart To Confirmation"
    />
  </>
}



function BtnAddRemoveParticipantToConfirmedBooking() {

  const productConfirmationCode = "WAL-T148753170";
  const date = "2026-11-09";
  const session_temporary_single = useAppSelector((state) => state.booking.cart.cart_session_id_single_product_check_price)
  const local = useLocale();

  const ChangeParticipants = async (
    participants_new: IBookingParticipants
  ) => {


    const detailsForProcess = await getApiData<{
      ok: boolean,
      tour: IDBTourIncludeDetails,
      timeSlot: IBookingTimeActivitySlot,
      message: string
    }>("/booking-public/get-details-for-testing-processing", "POST", {

      date: date

    }, "not-authorize", "application/json");

    const resultUpdating = await updateBookedProduct({
      productConfirmationCode,
      date: date,
      participants_new: participants_new,
      rateId: detailsForProcess.timeSlot.defaultRateId,
      sessionCartTemporaryProduct: session_temporary_single,
      startTime: detailsForProcess.timeSlot.startTime,
      // timeSlotId: detailsForProcess.timeSlot.id,
      startTimeId: detailsForProcess.timeSlot.startTimeId,
      startTimeLabel: detailsForProcess.timeSlot.startTimeLabel,
      language: local
    });

    console.log("resultUpdating:", resultUpdating);

  }

  return <>
    <ButtonDefault
      onClick={() => ChangeParticipants(
        { adults: 3, children: 2, infants: 0 }
      )}
      className="btn-primary"
      label={`Add Participant To Confirmed Booking ${productConfirmationCode}`}
    />
    <ButtonDefault
      onClick={() => ChangeParticipants({ adults: 1, children: 1, infants: 0 })}
      className="btn-primary"
      label={`Remove Participant From Confirmed Booking ${productConfirmationCode}`}
    />
  </>
}