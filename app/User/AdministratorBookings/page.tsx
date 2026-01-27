
import { getAuthToken, getUserDetailsFromServer } from "../api/add-custom-token";
import { UserLoginForm } from "../content/LoginForm";
import ManageMyBookingContentWrapPageAdmin from "./contentWrapPage";

export default async function ManageMyBookingAdmin(params: { searchParams: Promise<{ [key: string]: any }> }) {

  const detailsForUser = await getUserDetailsFromServer();
  console.log("detailsForUser from page.tsx:", detailsForUser);

  /*if (detailsForUser?.user.role !== "administrator") {
    // return <UserLoginForm />
  }*/


  return <ManageMyBookingContentWrapPageAdmin />

}

