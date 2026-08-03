import MainFooter from "@/components/footers/MainFooter";
import HeaderHome from "@/components/headers/HeaderHome";
import BookingAndRefundsHeading from "../BookingsAndRefunds/components/BookingAndRefundsHeading";
import BookingDashboard from "./BookingDashboard";

export default function ClientHome() {
  return <>


    <HeaderHome />

    <BookingAndRefundsHeading title="Dashboard Home" />

    <BookingDashboard stats={{
      total: 12,
      pending: 2,
      reserved: 3,
      completed: 4,
      cancelled: 1,
      forbidden: 2,
    }} />

    <MainFooter />



  </>
}