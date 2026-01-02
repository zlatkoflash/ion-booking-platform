'use server';

import { useAuth } from "@/app/User/AuthProvider";
import ViewMyBookingContent from "./ViewMyBookingContent";
import { UserLoginForm } from "@/app/User/content/LoginForm";
import { GetBookingDetailsByBookingId } from "@/utils/bokunAdminClient";
import { BokunGetExperienceByIdOrSlug, IBokunBooking } from "@/utils/bokun";
import { BookingSingleItemProvider } from "./BookingProvider";
import UserAdminHeader from "@/app/User/content/Header";
import BookingActivitySelector from "@/app/TourView/[[...slug]]/BookingActivitySelector";
import { BookingEditorProvider } from "@/app/TourView/[[...slug]]/BookingEditorProvider";
import BookingEditorWrap from "./BookingEditorWrap";
import { IBookingDatabaseNet } from "@/interface/payment.booking";

export default async function ViewMyBooking({ params }: { params: { slug: string } }) {

  const paramsFor = await params;

  console.log("paramsFor:", paramsFor);

  const BookingId = paramsFor.slug;
  console.log("BookingId:", BookingId);
  const BookingDetails = await GetBookingDetailsByBookingId({ dbBookingId: BookingId }) as {
    BookingDB: any;
    // paymentDB: IDBPayment;
    bokunBooking: IBokunBooking;
    bookingNet: IBookingDatabaseNet;
    bookingPayments: any[],
    bookingRefunds: any[],
  };
  console.log("BookingDetails:", BookingDetails);


  const { BookingDB, bokunBooking, bookingNet, bookingPayments, bookingRefunds } = BookingDetails;
  console.log("BookingDB:", BookingDB);
  console.log("bokunBooking:", bokunBooking);

  const dataForExperience = await BokunGetExperienceByIdOrSlug(
    BookingDetails.bokunBooking?.activityBookings[0].activity.id
  );
  console.log("dataForExperience:", dataForExperience);

  // const 



  return (

    <BookingEditorWrap
      bokunBooking={bokunBooking}
      dataForExperience={dataForExperience}
      bookingDBNet={bookingNet}
      bookingPayments={bookingPayments}
      bookingRefunds={bookingRefunds}
    />

  );
}