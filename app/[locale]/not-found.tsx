import HeaderHome from "@/components/headers/HeaderHome";
import BookingAndRefundsHeading from "@/app/[locale]/Client/BookingsAndRefunds/components/BookingAndRefundsHeading";
import NoContentIllustration from "@/app/[locale]/Client/BookingsAndRefunds/components/NoContentIllustration";

export default function NotFound() {
  return <>

    <HeaderHome />

    <BookingAndRefundsHeading title="404 Not Found" />
    <NoContentIllustration
      type="page-not-found"
      title="The page you are looking for does not exist"
      paragraph="Please check the URL or try searching for what you need."

    />

  </>
}
