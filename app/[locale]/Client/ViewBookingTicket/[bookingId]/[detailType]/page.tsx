import HeaderHome from "@/components/headers/HeaderHome";
import { getApiData } from "@/utils/api";
import { EBookingStatus, IDBBookingDetails, IDBPaymentDetails, IDBRefundDetails, IDBTourIncludeDetails } from "@/utils/interface-database";
import NoContentIllustration from "@/app/[locale]/Client/BookingsAndRefunds/components/NoContentIllustration";
import BookingAndRefundsHeading from "@/app/[locale]/Client/BookingsAndRefunds/components/BookingAndRefundsHeading";
import TourSubheader from "@/components/headers/TourSubheader";
import HeaderSubNavigationClient from "@/app/[locale]/Client/ViewBookingTicket/components/HeaderSubNavigationClient";
import TourContainerX2Columns from "@/components/sections/TourContainerX2Columns";
import GalleryTour from "@/components/galleries/GalleryTour";
import IconText from "@/components/buttons/IconText";
import StatsForTour from "@/app/[locale]/tour/[slug]/StatsForTour";
import AboutTour from "@/app/[locale]/tour/[slug]/AboutTour";
import CardsStoriesSliderForTour from "@/components/sections/CardsStoriesSliderForTour";
import TourRoute from "@/components/sections/TourRoute";
import WhatsIncluded from "@/app/[locale]/tour/[slug]/WhatsIncluded";
import MeetingAndPickup from "@/app/[locale]/tour/[slug]/MeetingAndPickup";
import FormSelectionTourDetails from "@/app/[locale]/tour/[slug]/FormSelection";
import BookingPaymentDetails from "../../components/BookingPaymentDetails";
import FormSelectedValuesClient from "../../components/FormSelectedValuesClient";
import BookingDetailsHidration from "@/app/[locale]/booking/[booking_id]/details/BookingDetailsHidration";
import { IBookingTimeActivitySlot } from "@/utils/interface-booking";
import { IBookingPrice } from "@/redux/booking/bookingSlice";
import CancelBookingEvents from "../../components/CancelBookingEvents";
import { Fragment } from "react/jsx-runtime";
import { getTranslations } from "next-intl/server";

export default async function PageViewBookingTicket(
  { params }: {
    params: Promise<{ bookingId: string, detailType: "tour-detail" | "payment-detail" | "booking-status" }>
  }
) {
  const { bookingId, detailType } = await params;
  const tCommon = await getTranslations("Common");

  const details = await getApiData<{
    ok: boolean,
    message: string,
    booking: IDBBookingDetails | null,
    tour: IDBTourIncludeDetails | null,
    payments: IDBPaymentDetails[],
    refunds: IDBRefundDetails[],
    timeSlot: IBookingTimeActivitySlot,
    price: IBookingPrice,
    slots: IBookingTimeActivitySlot[]
  }>("/booking-client/get-booking-ticket-details", "POST", {
    booking_id: bookingId
  }, "authorize", "application/json");

  // console.log("details:", details);
  // console.log("details.tour:", details.tour);

  const contentRightChildren = () => {
    if (details.booking === null) return <> </>

    return <>
      <FormSelectedValuesClient
        key={'form-selected-values-client'}
        slots={details.slots}
      />
      {
        (
          (
            details.booking.x24_hours_period_expired
            ||
            details.booking.status !== EBookingStatus.CONFIRMED
          )
            ?
            null
            :
            <CancelBookingEvents key={'cancel-booking-events'} booking={details.booking} />

        )
      }

      {
        (
          details.booking.x24_hours_period_expired
            ||
            details.booking.status !== EBookingStatus.CONFIRMED
            ? null :
            <IconText key={'info-about-the-cancel-booking'} type="icon-text-alert" variation="light" text={tCommon("cancellation_or_modification_info_is_allowed_within_24_hours")} iconType="info-circle-outline" className="mt-4" />

        )
      }
    </>
  }

  if (
    details.booking === null
    || details.tour === null
    || details.ok === false
  ) {
    return <>
      <HeaderHome />

      <BookingAndRefundsHeading title={tCommon("error_404")} />
      <NoContentIllustration type="no-items-after-searching"
        title={tCommon("tour_unavailable")}
        paragraph={details.message || tCommon("we_couldnt_find_any_booking_with_this_id")}
      />
    </>
  }

  return <>


    <BookingDetailsHidration
      tour={details.tour}
      timeSlotStart={details.timeSlot}
      price={details.price}
      participants={details.booking.count_participants}
      booking={details.booking}
    >

      <HeaderHome />
      <TourSubheader
        title={details.tour.title as string}
        subject_id={details.tour.id}
        wishlistHeartClicked={details.tour.haveHeart}
        showTheBadges={false}
      />

      <HeaderSubNavigationClient links={[
        {
          url: `/Client/ViewBookingTicket/${details.booking.id}/booking-status`,
          label: tCommon("booking_status")
        },
        {
          url: `/Client/ViewBookingTicket/${details.booking.id}/tour-detail`,
          label: tCommon("tour_detail")
        },
        {
          url: `/Client/ViewBookingTicket/${details.booking.id}/payment-detail`,
          label: tCommon("payment_detail")
        }
      ]} />


      <TourContainerX2Columns
        initialMobileVisibleSection="section-overview"
        leftChildren={
          [
            ...(detailType === "booking-status" ? [<Fragment key="booking-status">{contentRightChildren()}</Fragment>] : []),
            ...(detailType === "tour-detail" ? [
              [
                <GalleryTour
                  key={'gallery'}
                  photos={details.tour.photos?.map(photo => {
                    return {
                      src: photo,
                      alt: details.tour?.title || ""
                    }
                  }) || []}
                  iconTextsLabels={<>
                    <IconText key={'icon-text-best-seller'} text={tCommon('best_seller')} iconType="trophy-outline" type="card-city-label" />
                    {(details?.tour?.booked_tours_today ?? 0) > 0 ? <IconText key={'icon-text-booked-today'} text={`${tCommon('booked')} ${details.tour.booked_tours_today} ${tCommon("times_today")}`} iconType="power-outline" type="card-city-label" /> : <></>}
                  </>}
                />,

                <StatsForTour key={'stats'} tour={details.tour} />,

                <hr key={'hr'} className="tour-stats" />,

                <div className="mobile-wrap-right-content" key={'mobile-wrap-right-content'}>
                  {
                    // RightContent()
                  }
                  <HeaderSubNavigationClient links={[
                    {
                      // url: `/`,
                      label: tCommon('overview'),
                      // urlParam: { name: "tour-section", value: "section-overview" }
                      mobileSectionVisible: "section-overview"
                    },
                    {
                      // url: `/`,
                      label: tCommon('testimonials'),
                      // urlParam: { name: "tour-section", value: "section-testimonials" }
                      mobileSectionVisible: "section-testimonials"
                    },
                    {
                      // url: "/",
                      label: tCommon('tour_route'),
                      // urlParam: { name: "tour-section", value: "section-tour-route" }
                      mobileSectionVisible: "section-tour-route"
                    },
                    {
                      // url: "/",
                      label: tCommon('whats_included'),
                      // urlParam: { name: "tour-section", value: "section-whats-included" }
                      mobileSectionVisible: "section-whats-included"
                    },
                    {
                      label: tCommon('meeting_pickup'),
                      // urlParam: { name: "tour-section", value: "section-meeting-and-pickup" }
                      mobileSectionVisible: "section-meeting-and-pickup"
                    }
                  ]} />
                </div>,

                <AboutTour key={'about'} tour={details.tour} />,
                <CardsStoriesSliderForTour key={'stories'} />,
                <TourRoute key={'route'} centerLocation={{
                  ...(
                    details.tour.agenda_items.length === 0 ?
                      details.tour.location.geoLocationCenter
                      :
                      {
                        lat: details.tour.agenda_items[0].location.latitude,
                        lng: details.tour.agenda_items[0].location.longitude
                      }
                  ),
                  zoom: 25
                }}
                  routeItems={details.tour.agenda_items.map((item) => {
                    return {
                      lat: item.location.latitude,
                      lng: item.location.longitude,
                      description: item.body, // ok
                      additionalLabel: item.location.wholeAddress || "", //ok
                      // title: item.location.address, ok
                      // excerpt: item.location.address || "",
                      zoom: 25,
                      placeName: item.location.address // ok
                    }
                  })}
                />,
                /**
                 *details.tour.what_is_included in bokun editor should be texts with new lines <br/> after sync the code get the data and do array of strings in the supabase database
                 */
                <WhatsIncluded key={'what-is-included'} items={details.tour.what_is_included} additional_description={details.tour.what_is_included_description} />,
                (
                  details.tour.agenda_items.length > 0
                    ?
                    <MeetingAndPickup key={'meeting-and-pickup'}
                      address={details.tour.agenda_items[0].location.address}
                      addressFull={details.tour.agenda_items[0].location.wholeAddress || ""}
                      description={details.tour.agenda_items[0].body}
                      photoURL={

                        details.tour.agenda_items[0].keyPhoto !== null ?
                          details.tour.agenda_items[0].keyPhoto.originalUrl : null

                      }
                    />
                    :
                    <></>
                )

              ]
            ] : []),
            ...(detailType === "payment-detail" ? [
              <BookingPaymentDetails
                key={'booking-payment-details'}
                booking={details.booking}
                payments={details.payments}
                refunds={details.refunds}
              />
            ] : [])
          ]
        }

        rightChildren={
          <div className="element-hide-on-mobile">
            {contentRightChildren()}
          </div>
        }
      />

    </BookingDetailsHidration>

  </>
}