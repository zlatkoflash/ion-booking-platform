// import IconsTextInlineGroup from "@/components/buttons/IconsTextInlineGroup";
import IconText from "@/components/buttons/IconText";
import MainFooter from "@/components/footers/MainFooter";
import GalleryTour from "@/components/galleries/GalleryTour";
import HeaderHome from "@/components/headers/HeaderHome";
import TourSubheader from "@/components/headers/TourSubheader";
import TourContainerX2Columns from "@/components/sections/TourContainerX2Columns";
import StatsForTour from "./StatsForTour";
import AboutTour from "./AboutTour";
import CardsStoriesSliderForTour from "@/components/sections/CardsStoriesSliderForTour";
import TourRoute from "@/components/sections/TourRoute";
import WhatsIncluded from "./WhatsIncluded";
import MeetingAndPickup from "./MeetingAndPickup";
import FormSelectionTourDetails from "./FormSelection";
import { getApiData } from "@/utils/api";
import { IDBTourIncludeDetails } from "@/utils/interface-database";
import { getLoggedUser } from "@/utils/supabaseServer";
import { parseServerParams } from "../../experiences-search/page";
import { IBookingTimeActivitySlot } from "@/utils/interface-booking";
import HidrateTheSystem from "./HidrateTheSystem";
import { getLocale, getTranslations } from "next-intl/server";
import HeaderSubNavigationClient from "../../Client/ViewBookingTicket/components/HeaderSubNavigationClient";
// import { useTranslations } from "next-intl";
import BookingAndRefundsHeading from "../../Client/BookingsAndRefunds/components/BookingAndRefundsHeading";
import NoContentIllustration from "../../Client/BookingsAndRefunds/components/NoContentIllustration";

export default async function PageTourView(
  { params, searchParams }: {
    params: Promise<{
      slug: string;
    }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) {

  const { slug } = await params;
  const loggedUser = await getLoggedUser();


  const tCommon = await getTranslations('Common');

  const resolvedParams = await searchParams;
  const filters = await parseServerParams(resolvedParams);
  console.log("filters for tour page:", filters);

  const locale = await getLocale();
  console.log("locale:", locale);


  const details = await getApiData<{
    ok: boolean;
    tour: IDBTourIncludeDetails | null;
    slots: IBookingTimeActivitySlot[];
    message: string;
  }>("/booking-public/get-page-tour-data", "POST", {
    slug: slug,
    filters: filters,
    locale: locale
  }, loggedUser === null ? "not-authorize" : "authorize", "application/json");

  console.log("Page details: ", details);
  console.log("details.tour.agenda_items:", details.tour?.agenda_items);

  if (!details.ok || !details.tour) {
    return <>
      <HeaderHome />

      <BookingAndRefundsHeading title={tCommon("error_404")} />
      <NoContentIllustration type="no-items-after-searching"
        title={tCommon("tour_unavailable")}
        paragraph={details.message || tCommon("we_couldnt_find_any_booking_with_this_id")}
      />
    </>
  }

  const RightContent = () => {
    return <>
      <FormSelectionTourDetails
        key={'form-selection-tours'} tour={details.tour}
        initialSelectedDates={filters.selectedDates}
        initialParticipants={filters.participantsCount}
        slots={details.slots}
      />
      <IconText type="icon-text-label-solid" iconType="fire-outline" text={tCommon("this_is_a_special_occasion")} subText={tCommon("this_place_is_usually_booked")} key={'card-city-label'} variation="warning" />

    </>
  }

  return <>
    <HidrateTheSystem
      filters={filters}
      slots={details.slots}
      tour={details.tour}
    />
    <HeaderHome />
    <TourSubheader
      title={details.tour.title as string}
      subject_id={details.tour.id}
      wishlistHeartClicked={details.tour.haveHeart}
    />
    <TourContainerX2Columns
      hideRightColumnInMobile={true}
      initialMobileVisibleSection="section-overview"
      // initialMobileVisibleSection={resolvedParams['tour-section'] && resolvedParams['tour-section'] !== "" ? resolvedParams['tour-section'] as string : "section-overview"}
      leftChildren={[
        <GalleryTour
          key={'gallery'}
          photos={details.tour.photos?.map(photo => {
            return {
              src: photo,
              alt: details.tour?.title || ""
            }
          }) || []}
          iconTextsLabels={<>
            <IconText key={'icon-text-best-seller'} text={tCommon("best_seller")} iconType="trophy-outline" type="card-city-label" />
            <IconText key={'icon-text-best-seller-2-example'} text={tCommon("best_seller")} iconType="trophy-outline" type="card-city-label" />
            {(details?.tour?.booked_tours_today ?? 0) > 0 ? <IconText key={'icon-text-booked-today'} text={`${tCommon("booked")} ${details.tour.booked_tours_today} ${tCommon("times_today")}`} iconType="power-outline" type="card-city-label" /> : <></>}
          </>}
        />,

        <StatsForTour key={'stats'} tour={details.tour} />,

        <hr key={'hr'} className="tour-stats" />,

        <div className="mobile-wrap-right-content" key={'mobile-wrap-right-content'}>
          {
            RightContent()
          }
          <HeaderSubNavigationClient links={[
            {
              // url: `/`,
              label: tCommon("overview"),
              // urlParam: { name: "tour-section", value: "section-overview" }
              mobileSectionVisible: "section-overview"
            },
            {
              // url: `/`,
              label: tCommon("testimonials"),
              // urlParam: { name: "tour-section", value: "section-testimonials" }
              mobileSectionVisible: "section-testimonials"
            },
            {
              // url: "/",
              label: tCommon("tour_route"),
              // urlParam: { name: "tour-section", value: "section-tour-route" }
              mobileSectionVisible: "section-tour-route"
            },
            {
              // url: "/",
              label: tCommon("whats_included"),
              // urlParam: { name: "tour-section", value: "section-whats-included" }
              mobileSectionVisible: "section-whats-included"
            },
            {
              label: tCommon("meeting_pickup"),
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

      ]}
      rightChildren={RightContent()}
    />
    <MainFooter />
  </>
}