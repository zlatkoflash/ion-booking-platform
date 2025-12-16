
import { getAuthToken } from "../api/add-custom-token";
import ManageMyBookingContentWrapPageAdmin from "./contentWrapPage";

export default async function ManageMyBookingAdmin(params: { searchParams: Promise<{ [key: string]: any }> }) {

  return <ManageMyBookingContentWrapPageAdmin />

}

