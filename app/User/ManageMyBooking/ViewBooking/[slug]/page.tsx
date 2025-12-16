'use server';

import { useAuth } from "@/app/User/AuthProvider";
import ViewMyBookingContent from "./ViewMyBookingContent";
import { UserLoginForm } from "@/app/User/content/LoginForm";

export default async function ViewMyBooking({ params }: { params: { slug: string } }) {

  const paramsFor = await params;

  console.log("paramsFor:", paramsFor);


  // const 



  return (
    <ViewMyBookingContent bookingId={paramsFor.slug} />
  );
}