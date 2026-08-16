"use client";

import Image from "next/image";
import img_booking_item from "@/assets/images/experience-example.png";
import Title from "@/components/typography/Title";
import IconText from "@/components/buttons/IconText";
import PriceGroup from "@/components/typography/PriceGroup";
import ButtonDefault from "@/components/buttons/ButtonDefault";
import BookingCounterIconText from "@/app/[locale]/booking/[booking_id]/details/BookingCounterIconText";
import { EBookingStatus, IDBBookingDetails } from "@/utils/interface-database";
import { useSearchParams } from "next/navigation";
import { formatTo12HourTime, longDateTimeForBookingItem, supabaseDateToDayOfWeekMonthDD } from "@/utils/dates-times";
import { getTotalCountFromParticipantObject } from "@/utils/booking-client";
import { useRouter } from "@/translations-engine/routing";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getApiData } from "@/utils/api";
import { useEffect, useState } from "react";
import BookingGroupStats from "@/app/[locale]/ShoppingCart/components/BookingGroupStats";
import { useLocale, useTranslations } from "use-intl";
import ModalCancelEdit from "../../CancelTour/components/ModalCancelEdit";
import { setShowModalForEarlyPayment } from "@/redux/controls/controlsSlice";
import { IBookingPrice } from "@/redux/booking/bookingSlice";

export default function BookingResultsListTable(
  {
    bookings
  }
    :
    {
      bookings: IDBBookingDetails[]
    }
) {

  /*const booking_items: any = [
    { index: 0 },
    { index: 1 },
    { index: 2 },
    { index: 3 },
  ];*/

  const [showModalPayEarly, setShowModalPayEarly] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<IDBBookingDetails | null>(null);

  return <>

    <div className="booking-list-table">
      {
        bookings.map((item: IDBBookingDetails, index: number) => {
          return <BookingTableItem key={index} item={item} />
        })
      }
    </div>


    <BookingPayEarlyModal />

  </>
}


function BookingTableItem(
  {
    item
  }
    :
    {
      item: IDBBookingDetails
    }
) {


  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

  const [btnIsLoading, setBtnIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const dispatch = useAppDispatch();

  const tCommon = useTranslations("Common");
  const locale = useLocale();
  // const [showModalForEarlyPayment, setShowModalForEarlyPayment] = useState(false);

  // 1. Define the split logic
  const getHighlightedTitle = (title: string, search: string) => {
    if (!search || !title) return [{ text: title || "-", bold: false }];

    // Create a case-insensitive regex to find the search term
    const parts = title.split(new RegExp(`(${search})`, 'gi'));

    return parts.map(part => ({
      text: part,
      // If the part matches the search (case-insensitive), make it bold
      bold: part.toLowerCase() === search.toLowerCase()
    }));
  };

  // 2. Use it in your component
  const titleParts = getHighlightedTitle(item.tour_title, search);
  const totalCountParticipants = getTotalCountFromParticipantObject(item.count_participants);

  const redirectToBookingPage = (booking: IDBBookingDetails) => {
    router.push(`/Client/ViewBookingTicket/${booking.id}/${window.innerWidth > 768 ? 'tour-detail' : 'booking-status'}`);
  }

  /*const PayForTheConfirmedBooking = async () => {

    setBtnIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    // router.push(`/booking/${item.id}/details`);
    const details = await getApiData<{
      ok: boolean,
      message: string
    }>('/booking-client/pay-initital-payment-for-confirmed-booking', "POST", {
      booking_id: item.id,
      language: locale
    }, "authorize", "application/json");

    if (!details.ok) {
      setErrorMessage(details.message);
    }
    if (details.ok) {
      // setSuccessMessage("You will be redirected to the confirmation page. Thank you!");
      router.push(`/booking/${item.id}/confirm`);
    }
    console.log(details);

    setBtnIsLoading(false);

  }*/

  const bookingGroupStuffItems = (): React.ReactNode[] => {
    return [
      <IconText key="date" text={`${tCommon("tour_date")} ${supabaseDateToDayOfWeekMonthDD(item.date_tour_start)}, ${formatTo12HourTime(item.time_tour_start_string)}`} type="icon-text-stat-for-booking-item" iconType="calendar-check-outline" />,
      <IconText key="guests" text={
        totalCountParticipants > 1 ? `${totalCountParticipants} ${tCommon("guests")}` : `${totalCountParticipants} ${tCommon("guest")}`

      } type="icon-text-stat-for-booking-item" iconType="people" />,
      [
        EBookingStatus.PENDING_HOLD, EBookingStatus.EXPIRED, EBookingStatus.FORBIDDEN_BY_USER
      ].includes(item.status!) ? <IconText key="created" text={`${tCommon("created")} ${longDateTimeForBookingItem(item.date_created as string)}`} type="icon-text-stat-for-booking-item" iconType="calendar-outline" /> : null,
      item.status === EBookingStatus.CONFIRMED ? <IconText key="confirmed" text={`${tCommon("confirmed")} ${longDateTimeForBookingItem(item.date_confirmed as string)}`} type="icon-text-stat-for-booking-item" iconType="calendar-outline" /> : null,
      (item.status === EBookingStatus.RESERVED && !item.is_expired) ? <IconText key="reserved" text={`${tCommon("reserved")} ${longDateTimeForBookingItem(item.date_reserved as string)}`} type="icon-text-stat-for-booking-item" iconType="calendar-outline" /> : null,
      item.status === EBookingStatus.CANCELLED ? <IconText key="cancelled" text={`${tCommon("cancelled")} ${longDateTimeForBookingItem(item.date_cancelled as string)}`} type="icon-text-stat-for-booking-item" iconType="calendar-outline" /> : null
    ];

  }


  const statusIconTextLabel = (showOnlyOnMobile: boolean) => {
    return <>
      {
        (item.status === EBookingStatus.CONFIRMED) && <IconText text={tCommon("confirmed")} type="badge-style-item-booking" variation="success" addPoint={true} showOnlyOnMobile={showOnlyOnMobile} />
      }
      {
        (item.status === EBookingStatus.RESERVED && !item.is_expired) && <IconText text={tCommon("reserved")} type="badge-style-item-booking" variation="primary" addPoint={true} showOnlyOnMobile={showOnlyOnMobile} />
      }
      {
        (item.status === EBookingStatus.RESERVED && item.is_expired) && <IconText text={tCommon("expired")} type="badge-style-item-booking" variation="danger" addPoint={true} showOnlyOnMobile={showOnlyOnMobile} />
      }
      {
        (item.status === EBookingStatus.PENDING_HOLD && item.is_expired) && <IconText text={tCommon("expired")} type="badge-style-item-booking" variation="danger" addPoint={true} showOnlyOnMobile={showOnlyOnMobile} />
      }
      {
        (item.status === EBookingStatus.PENDING_HOLD && !item.is_expired) && <IconText text={tCommon("pending_hold")} type="badge-style-item-booking" variation="primary" addPoint={true} showOnlyOnMobile={showOnlyOnMobile} />
      }
      {
        (item.status === EBookingStatus.CANCELLED) && <IconText text={tCommon("cancelled")} type="badge-style-item-booking" variation="danger" addPoint={true} showOnlyOnMobile={showOnlyOnMobile} />
      }
      {
        (item.status === EBookingStatus.FORBIDDEN_BY_USER) && <IconText text={tCommon("forbidden_by_user")} type="badge-style-item-booking" variation="danger" addPoint={true} showOnlyOnMobile={showOnlyOnMobile} />
      }
    </>
  }

  if (user === null) return <></>

  // confirmed
  return <>
    <div className="booking-table-item">
      <div className="left-content">
        <Image src={item.tour_cover ? item.tour_cover : img_booking_item} alt={item.tour_title} width={120} height={120} />
        <div className="content-inner">



          {statusIconTextLabel(true)}

          <Title headingType="h5" headingStyle="Text-xs-CAPS" color="--color-text-fg">{item.confirmation_code ? item.confirmation_code : "-"} - {`(${item.start_time_label})`}</Title>

          <div className="title-label">




            <Title headingType="h3" headingStyle="Text-lg-Medium" color="--color-text-fg-on-accent">
              {titleParts.map((part, index) => (
                <Title
                  key={index}
                  headingType="span"
                  headingStyle={part.bold ? "Text-lg-Bold" : "Text-lg-Medium"}
                >
                  {part.text}
                </Title>
              ))}
            </Title>

            {statusIconTextLabel(false)}
          </div>

          <BookingGroupStats items={bookingGroupStuffItems()} showOnlyOnDesktop={true} />
        </div>
      </div>


      <BookingGroupStats items={bookingGroupStuffItems()} showOnlyOnMobile={true} />

      <hr className="only-in-mobile" />

      <div className="price-content">
        <PriceGroup price={item.amount100_paid / 100} text={tCommon("paid")} type="booking-item" />
        <PriceGroup price={(item.amount100_paid - item.amount100_refunded) / 100} text={tCommon("net")} type="booking-item" />
      </div>
      <div className="actions-content">

        {
          (item.status === EBookingStatus.CONFIRMED && item.initial_payment_is_done) && <>
            <div className={`buttons ${user.user_metadata.role === "administrator" && 'buttons-half w-100'}`}>
              {
                user.user_metadata.role === "administrator" && <ButtonDefault variant="outline-primary" label={tCommon("refund")} />
              }
              <ButtonDefault variant="primary" label={tCommon("view")} className={`${user.user_metadata.role === "client" && 'w-100'}`} onClick={() => {
                // router.push(`/Client/ViewBookingTicket/${item.id}/tour-detail`)
                redirectToBookingPage(item)
              }} />
            </div>
            <BookingCounterIconText supabaseDate={item.date_tour_start_zone_0} labelTimer={tCommon("tour_starts_in")} labelWhenExpired={tCommon("tour_already_started")} />
          </>
        }
        {
          (item.status === EBookingStatus.CONFIRMED && !item.initial_payment_is_done) && <>
            <div className="buttons buttons-half">
              <Title headingType="p" headingStyle="Text-sm-Regular" color="--color-text-fg" className="w-100">{tCommon("payment_is_pending")}</Title>

              {
                errorMessage !== "" && <IconText text={errorMessage} type="icon-text-alert" variation="danger" iconType="warning-shield" className="w-100" />
              }
              {
                successMessage !== "" && <IconText text={successMessage} type="icon-text-alert" variation="success" iconType="check" className="w-100" />
              }

              <ButtonDefault loading={btnIsLoading} variant="outline-primary" label={tCommon("pay")} onClick={() => {
                // router.push(`/booking/${item.id}/details`);
                // PayForTheConfirmedBooking()
                dispatch(setShowModalForEarlyPayment({
                  show: true,
                  booking: item
                }))
              }} />
              <ButtonDefault variant="primary" label={tCommon("view")} className={`${user.user_metadata.role === "client" && 'w-100'}`} onClick={() => {
                // router.push(`/Client/ViewBookingTicket/${item.id}/tour-detail`)
                redirectToBookingPage(item)
              }} />
            </div>
            <BookingCounterIconText supabaseDate={item.date_tour_start} labelTimer={tCommon("tour_starts_in")} labelWhenExpired={tCommon("tour_already_started")} />
          </>
        }
        {
          (item.status === EBookingStatus.RESERVED && !item.is_expired) && <>
            <div className="buttons w-100">
              <ButtonDefault label={tCommon("complete_payment")} variant="primary" className="w-100" onClick={() => {
                router.push(`/booking/${item.id}/details`)
              }} />
            </div>
            <BookingCounterIconText supabaseDate={item.date_expire_after_creating} />
          </>
        }
        {
          (item.status === EBookingStatus.PENDING_HOLD) && <>
            {
              !item.is_expired && <div className="buttons w-100">
                <ButtonDefault label={tCommon("complete_the_booking")} variant="primary" className="w-100" onClick={() => {
                  router.push(`/booking/${item.id}/details`)
                }} />
              </div>
            }
            <BookingCounterIconText supabaseDate={item.date_expire_after_creating} />
          </>
        }
        {
          (item.status === EBookingStatus.FORBIDDEN_BY_USER) && <div className="buttons w-100">
            <ButtonDefault label={tCommon("book_again")} variant="primary" className="w-100" onClick={() => {
              router.push(`/tour/${item.tour_slug}`)
            }} />
          </div>
        }
        {
          (item.status === EBookingStatus.CANCELLED) && <div className="buttons w-100">
            <ButtonDefault label={tCommon("view")} variant="primary" className="w-100" onClick={() => {
              // router.push(`/Client/ViewBookingTicket/${item.id}/tour-detail`)
              redirectToBookingPage(item)
            }} />
          </div>
        }

      </div>
    </div>
  </>
}




function BookingPayEarlyModal() {


  const showModalForEarlyPayment = useAppSelector((state) => state.controls.showModalForEarlyPayment);
  const dispatch = useAppDispatch();

  const [bookingPrice, setBookingPrice] = useState<IBookingPrice | null>();
  const [btnIsLoading, setBtnIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  // const [payingNow, setPayingNow] = useState(false);
  const tForms = useTranslations("Forms");
  const tCommon = useTranslations("Common");
  const locale = useLocale();

  const route = useRouter();

  const PayForTheConfirmedBooking = async () => {

    if (showModalForEarlyPayment.booking === null) return;

    setBtnIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    // router.push(`/booking/${item.id}/details`);
    const details = await getApiData<{
      ok: boolean,
      message: string
    }>('/booking-client/pay-initital-payment-for-confirmed-booking', "POST", {
      booking_id: showModalForEarlyPayment.booking.id,
      language: locale
    }, "authorize", "application/json");

    if (!details.ok) {
      setErrorMessage(details.message);
    }
    if (details.ok) {
      // setSuccessMessage("You will be redirected to the confirmation page. Thank you!");
      dispatch(setShowModalForEarlyPayment({ show: false, booking: null }));
      route.push(`/booking/${showModalForEarlyPayment.booking.id}/confirm`);
    }
    console.log(details);

    setBtnIsLoading(false);

  }

  const LoadBookingPrice = async () => {
    if (showModalForEarlyPayment.booking === null) { return; }

    setBookingPrice(null);
    setErrorMessage("");
    setBtnIsLoading(true);

    const apiData = await getApiData<{
      ok: boolean,
      message: string,
      price: IBookingPrice
    }>('/booking-client/get-booking-price-from-api', "POST", {
      booking_id: showModalForEarlyPayment.booking.id,
      language: locale
    }, "authorize", "application/json");

    console.log("apiData while loading the price:", apiData);

    if (apiData.ok) {
      setBookingPrice(apiData.price);
    }
    else {
      setErrorMessage(apiData.message);
      setBookingPrice(null);
    }
    setBtnIsLoading(false);
  }

  useEffect(() => {
    if (showModalForEarlyPayment.booking === null) {
      return;
    }
    setErrorMessage("");
    setSuccessMessage("");

    LoadBookingPrice()

  }, [
    showModalForEarlyPayment.booking
  ]);


  if (showModalForEarlyPayment.booking === null) {
    return <></>
  }

  return (
    <>

      <ModalCancelEdit
        disable={btnIsLoading}
        title={tCommon("pay_early")}
        description={tCommon("confirm_payment")}
        // booking={booking}
        show={showModalForEarlyPayment.show}
        handleClose={() => { dispatch(setShowModalForEarlyPayment({ show: false, booking: showModalForEarlyPayment.booking })) }}
        bodyContent={
          <>
            <Title headingType="h4" headingStyle="Text-xl-Medium" color="--color-text-fg-success">{tCommon("you_are_about_to_pay_early")} €{bookingPrice?.total_discount.toFixed(2)}.</Title>
            <Title headingType="p" headingStyle="Text-lg-Regular" color="--color-text-fg-subtle">{tCommon("pay_early_info")}</Title>
          </>
        }
        footerContent={<>
          <ButtonDefault label={tCommon("pay_early")} variant="primary" onClick={() => {
            PayForTheConfirmedBooking()
          }} loading={btnIsLoading} />
          {
            errorMessage !== "" && <IconText
              className="w-100" type="icon-text-label-solid" variation="warning-solid"
              text={tCommon("error_while_paying_early")}
              subText={errorMessage}
              iconType="danger-outline" />
          }
          <ButtonDefault loading={btnIsLoading} label={tForms("cancel")} variant="light" onClick={() => {
            dispatch(setShowModalForEarlyPayment({
              show: false,
              booking: showModalForEarlyPayment.booking
            }))
          }} />
        </>}
      />

    </>
  )
}