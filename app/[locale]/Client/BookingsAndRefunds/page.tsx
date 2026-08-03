import MainFooter from "@/components/footers/MainFooter";
import HeaderHome from "@/components/headers/HeaderHome";
import BookingAndRefundsHeading from "./components/BookingAndRefundsHeading";
import BookingAndRefundFilters from "./components/BookingAndRefundsFilters";
import BookingsResultsList from "./components/BookingsResultsList";
import { getApiData } from "@/utils/api";
import { IDBBookingDetails } from "@/utils/interface-database";
import NoContentIllustration from "./components/NoContentIllustration";

export default async function BookingsAndRefunds(
  { params, searchParams }
    :
    {
      params: Promise<{
        locale: string;
      }>;
      searchParams: Promise<{
        page: number;
        search: string;
        status: string;
        dateTourStartRange: string;
      }>
    }
) {

  const paramsFor = await searchParams;
  console.log("paramsFor:", paramsFor);
  console.log("paramsFor.status:", paramsFor.status);

  const details = await getApiData<{
    ok: boolean,
    message: string,
    bookings: IDBBookingDetails[],
    v_total_count: number,
    v_absolute_total_count: number
  }>("/booking-client/get-bookings", "POST", {
    search: paramsFor.search,
    page: paramsFor.page,
    status: paramsFor.status,
    dateTourStartRange: paramsFor.dateTourStartRange
  }, "authorize", "application/json");
  // console.log("bookingItemsDetails:", details);

  console.log("Booking and refunds page");

  return <>


    <HeaderHome />

    <BookingAndRefundsHeading />



    {
      details.v_absolute_total_count > 0 &&
      <>
        <BookingAndRefundFilters />
        {
          details.v_total_count > 0 && <BookingsResultsList bookings={details.bookings} count={details.v_total_count} />
        }

        {
          details.v_total_count === 0 && <NoContentIllustration type="no-items-after-searching"
            title="No bookings found"
            paragraph="Try adjusting your search terms, changing the filters, or clearing your search to see more results"
          />
        }

      </>
    }

    {
      details.v_absolute_total_count === 0 && <NoContentIllustration type="items-not-found"
        title="No bookings yet"
        paragraph="You don't have any bookings to display"
      />
    }


    {
      // <MainFooter />
    }

  </>
}