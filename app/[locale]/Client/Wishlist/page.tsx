import HeaderHome from "@/components/headers/HeaderHome";
import BookingAndRefundsHeading from "../BookingsAndRefunds/components/BookingAndRefundsHeading";
import WrapWishlistItems from "./components/WrapWishlistItemst";
import { getApiData } from "@/utils/api";
import { IDBTourIncludeDetails } from "@/utils/interface-database";
import NoContentIllustration from "../BookingsAndRefunds/components/NoContentIllustration";

export default async function PageWishList(
  {
    searchParams
  }
    :
    {
      searchParams: {
        orderType?: string;
      }
    }
) {

  const paramsFor = await searchParams;
  const orderType = paramsFor.orderType ? paramsFor.orderType : "recently-saved";

  const detailsWishList = await getApiData<{
    ok: boolean,
    message: string,
    experiences: IDBTourIncludeDetails[]
  }>('booking-client/get-wish-list', "POST", {
    orderType
  }, "authorize", "application/json");
  console.log("detailsWishList:", detailsWishList);

  if (
    // 1 === 1 ||
    !detailsWishList.ok || detailsWishList.experiences.length === 0) {
    return <>
      <HeaderHome />
      <BookingAndRefundsHeading title="Wishlist" />

      <NoContentIllustration type="wishlist-empty"
        title="Your wishlist is empty"
        paragraph="Start saving experiences you love to find them here later."

      />

    </>
  }

  return <>

    <HeaderHome />

    <BookingAndRefundsHeading title="Wishlist" />

    <WrapWishlistItems experiences={detailsWishList.experiences} />


  </>
}