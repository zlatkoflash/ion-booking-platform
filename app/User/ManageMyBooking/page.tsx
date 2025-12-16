
import { getAuthToken } from "../api/add-custom-token";
import ManageMyBookingContentWrapPage from "./contentWrapPage";

export default async function ManageMyBooking(params: { searchParams: Promise<{ [key: string]: any }> }) {


  return <ManageMyBookingContentWrapPage />
}

