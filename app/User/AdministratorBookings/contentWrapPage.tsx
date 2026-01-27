'use client'

import { getAuthToken, handleLogout } from "../api/add-custom-token";
import { useAuth } from "../AuthProvider";
import UserAdminHeader from "../content/Header";
import { UserLoginForm } from "../content/LoginForm";
import { TableBookingsProvider } from "../ProviderTableBookings";
import ManageMyBookingContentAdmin from "./content";

export default function ManageMyBookingContentWrapPageAdmin() {
  /*const paramsFor = await params.searchParams;
  const token = paramsFor?.token as string;
  console.log("token:", token);*/


  // await handleLogout();

  // const token = await getAuthToken();
  const {
    user,
    isAuthenticated,
    isInitialized,
    error
  } = useAuth();


  /*if (!isAuthenticated) {
    return (
      // <UserLoginForm />
    );
  }*/


  return <>
    <UserAdminHeader />
    <ManageMyBookingContentAdmin />
  </>
}