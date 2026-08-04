import HeaderHome from "@/components/headers/HeaderHome";
import BookingAndRefundsHeading from "../BookingsAndRefunds/components/BookingAndRefundsHeading";
import WrapWishlistItems from "./components/WrapWishlistItemst";
import { getApiData } from "@/utils/api";
import { IDBTourIncludeDetails } from "@/utils/interface-database";
import NoContentIllustration from "../BookingsAndRefunds/components/NoContentIllustration";
// import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

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

  const tCommon = await getTranslations("Common");

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
      <BookingAndRefundsHeading title={tCommon("wishlist")} />

      <NoContentIllustration type="wishlist-empty"
        title={tCommon("wishlist_empty_title")}
        paragraph={tCommon("wishlist_empty_subtitle")}

      />

    </>
  }

  return <>

    <HeaderHome />

    <BookingAndRefundsHeading title={tCommon("wishlist")} />

    <WrapWishlistItems experiences={detailsWishList.experiences} />


  </>
}