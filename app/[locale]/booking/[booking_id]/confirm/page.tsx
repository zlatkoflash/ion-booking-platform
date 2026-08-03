import MainFooter from "@/components/footers/MainFooter";
import HeaderHome from "@/components/headers/HeaderHome";
import TourSubheader from "@/components/headers/TourSubheader";
import { ICardExperience } from "@/components/sliders/CardExperience";
import CardExperienceLabels from "@/components/sliders/CardExperienceLabels";
import SliderExperiences from "@/components/sliders/SliderExperiences";
import { getApiData } from "@/utils/api";
import { EBookingStatus, IDBBookingDetails, IDBPaymentDetails, IDBTour, IDBTourIncludeDetails } from "@/utils/interface-database";
import { getLoggedUser } from "@/utils/supabaseServer";
import ConfirmHeading from "./components/ConfirmHeading";
import { Col, Container, Row } from "react-bootstrap";
import ConfirmPanelForStats from "./components/ConfirmPanelForStats";
import IconText from "@/components/buttons/IconText";
import IconsTextInlineGroup from "@/components/buttons/IconsTextInlineGroup";
import ButtonDefault from "@/components/buttons/ButtonDefault";
import TextIconButton from "./components/TextIconButton";
import PaymentHistoryCollpaseSection from "./components/PaymentHistoryCollpaseSection";
import SectionContactSupport from "./components/SectionContactSupport";
import DealsExpireInCounter from "./components/DealsExpireInCounter";
import { getParticipantsLabel } from "@/utils/booking-client";
import { formatTo12HourTime, supabaseDateToDayOfWeekMonthDD } from "@/utils/dates-times";
import { generateGoogleMapLink } from "@/utils/maps";
import MainIconsInfo from "./components/MainIconsInfo";
import { getTranslations } from "next-intl/server";

export default async function ConfirmPage(
  {
    params
  }
    :
    {
      params: Promise<{
        booking_id: string
      }>
    }
) {

  const resolvedParams = await params;
  const booking_id = resolvedParams.booking_id;

  const tCommon = await getTranslations("Common");
  const tForms = await getTranslations("Forms");

  const user = await getLoggedUser();

  const details = await getApiData<{
    ok: boolean,
    message: string,
    experiences: IDBTourIncludeDetails[],
    booking: IDBBookingDetails,
    tour: IDBTour,
    payments: IDBPaymentDetails[]
  }>("/booking-public/data-after-booking-confirm", "POST", {
    booking_id
  }, user ? "authorize" : "not-authorize", "application/json")

  if (details.booking === null) {
    return <>
      <HeaderHome type="for-payment-flow" />

      <TourSubheader
        type="for-not-valid-booking"
        activeStep="booking-information"
        completedSteps={[]} />

      <MainFooter />
    </>
  }

  return <>

    <HeaderHome type="for-payment-flow" />
    <TourSubheader
      type="for-confirm-page"
      activeStep="booking-information"
      completedSteps={[]} />


    <ConfirmHeading booking={details.booking} />


    <ConfirmPanelForStats
      title={tCommon("booking_confirmation")}
      headingRightContent={<>
        <IconText type="badge-style" text={tCommon("confirmed")} variation="success" iconType="check" />
      </>}
      headingColumnOpositeInMobile={true}
    >


      <MainIconsInfo tour={details.tour} booking={details.booking} />

      <hr />


      <TextIconButton />


    </ConfirmPanelForStats>

    <ConfirmPanelForStats title={tCommon("whats_next")} headingTitleType="h4">
      <IconsTextInlineGroup type="for-confirm-whats-next" gridType="x3-in-a-row">
        <IconText type="booking-whats-next" iconType="dashboard" text={tCommon('open_my_dashboard')} subText={tCommon("itinerary_guide_info_and_travel_docs_in_one_place")} />
        <IconText type="booking-whats-next" iconType="business-center" text={tCommon('prepare_for_the_tour')} subText={tCommon("what_to_wear_label")} />
        <IconText type="booking-whats-next" iconType="calendar-check-outline" text={tCommon('add_to_calendar')} subText={tCommon("save_the_date_so_you_dont_miss_it")} />
      </IconsTextInlineGroup>
    </ConfirmPanelForStats>


    {
      <ConfirmPanelForStats title={tCommon("payment_history")} headingTitleType="h4" typeContent="collapse-content" initCollapseOpen={true}>

        <div className="payment-history-wrap">
          {
            (

              details.booking.status === EBookingStatus.CONFIRMED
              &&
              details.booking.initial_payment_is_done === true

            ) && <>

              <div className="payment-history-item">
                <IconText type="history-item" iconType="dashboard" text={tCommon("payment_completed")} subText={tCommon("your_payment_has_been_processed_successfully")} />
                <IconText type="badge-style" text={tCommon("paid")} variation="success" iconType="check" />
              </div>
              <div className="payment-history-item">
                {
                  details?.payments?.map((payment: IDBPaymentDetails) => {
                    return (
                      <IconText key={payment.id} type="history-item" iconType="warning-shield" text={tCommon("stripe_payment_intent_id")} subText={payment.stripe_payment_intent_id} />
                    )
                  })
                }
              </div>

            </>
          }

          {
            (

              details.booking.status === EBookingStatus.CONFIRMED
              &&
              details.booking.initial_payment_is_done !== true

            ) && <>

              <div className="payment-history-item">
                <IconText type="history-item" iconType="dashboard" text={tCommon("payment_pending")} subText={tCommon("payment_pending_subtitle")} />
                <IconText type="badge-style" text={tForms("pending")} variation="warning" iconType="warning-shield" />
              </div>

            </>
          }

          {
            details.booking.status === EBookingStatus.RESERVED && <>

              <div className="payment-history-item">
                <IconText type="history-item" iconType="warning-shield" text={tCommon("your_booking_is_not_confirmed_yet")} subText={tCommon("please_complete_the_payment_to_confirm_your_booking")} />
                <IconText type="badge-style" text={tCommon("pending")} variation="warning" iconType="warning-shield" />
              </div>

            </>
          }
          <div className="payment-history-item">
            <IconText type="history-item" iconType="mail" text={tCommon("confirmation_email_sent")} subText={tCommon("check_your_inbox_for_booking_detail")} />
            <IconText type="badge-style" text={tCommon("send")} variation="success" iconType="check" />
          </div>
        </div>

      </ConfirmPanelForStats>
    }

    <SectionContactSupport />

    <DealsExpireInCounter />


    {
      details?.experiences?.length > 0 && <SliderExperiences
        badgesStrings={tCommon.raw("sliderExperiencesConfirmationPage.badgesStrings")}
        title={tCommon("sliderExperiencesConfirmationPage.title")}
        subtitle={tCommon("sliderExperiencesConfirmationPage.subtitle")}
        items={details?.experiences?.map((tour: IDBTourIncludeDetails) => {

          // console.log("tour.tour:", tour);

          const item: ICardExperience = {
            image_url: tour.cover || "",
            location: `${tour.location.city}, ${tour.location.country}`,
            // location: tour.tour.location || "",
            // rating: tour.tour.rating || 0,
            // review_count: tour.tour.review_count || 0,
            title: tour.title || "",
            description: tour.description || "",
            bottomLabel: `${tCommon("by")} ${tour.vendor.title} • ${tour.duration_label}`,
            // price: tour.tour.price || 0,
            coverURL: tour.cover || "",
            priceFrom: tour.price || 0,
            discountPercent: tour.discount,
            id: tour.id,
            isFor: "experience",
            haveHeart: tour.haveHeart,
            elementForLeftLabelPLace: <CardExperienceLabels bookingDetails={tour} />,
            link: `/tour/${tour.slug}`
            /*onClickHeart(state) {
              console.log("state", state);
            },*/
          };

          // console.log("item: item", item);

          return item;
        })}
      />
    }


    <MainFooter />

  </>
}