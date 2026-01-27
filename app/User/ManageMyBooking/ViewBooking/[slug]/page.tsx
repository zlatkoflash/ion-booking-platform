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
import { getUserDetailsFromServer } from "@/app/User/api/add-custom-token";
import ErrorMessage, { BookingNotFound } from "@/components/ErrorMessages/ErrorMessage";
import HydrateMyBooking from "./HydrateMyBooking";

export default async function ViewMyBooking({ params }: { params: { slug: string } }) {

  const paramsFor = await params;

  console.log("paramsFor:", paramsFor);


  const detailsForUser = await getUserDetailsFromServer();
  console.log("detailsForUser from view booking / slug / page.tsx:", detailsForUser);



  const BookingId = paramsFor.slug;
  console.log("BookingId:", BookingId);
  const BookingDetails = await GetBookingDetailsByBookingId({ dbBookingId: BookingId }) as {
    BookingDB: any;
    // paymentDB: IDBPayment;
    bokunBooking: IBokunBooking;
    bookingNet: IBookingDatabaseNet;
    bookingPayments: any[],
    bookingRefunds: any[],
    iCanCancel: boolean,
  };
  console.log("BookingDetails:", BookingDetails);




  const { BookingDB, bokunBooking, bookingNet, bookingPayments, bookingRefunds } = BookingDetails;
  console.log("BookingDB:", BookingDB);
  console.log("bokunBooking:", bokunBooking);


  /*
  if (detailsForUser === null || BookingDB.user_id !== detailsForUser?.user.id) {
    //return <UserLoginForm />
  }
  */


  if (!BookingDetails.bokunBooking?.activityBookings) {
    return <>
      <UserAdminHeader />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center max-w-6xl mx-auto">
        <ErrorMessage error={BookingNotFound} />
      </div>
    </>
  }

  const dataForExperience = await BokunGetExperienceByIdOrSlug(
    BookingDetails.bokunBooking?.activityBookings[0].activity.id
  );
  console.log("dataForExperience:", dataForExperience);


  // const 



  return (

    <>
      <HydrateMyBooking
        dataForExperience={dataForExperience}
        bokunBooking={bokunBooking}
      />

      <BookingEditorWrap
        bokunBooking={bokunBooking}
        dataForExperience={dataForExperience}
        bookingDBNet={bookingNet}
        bookingPayments={bookingPayments}
        bookingRefunds={bookingRefunds}
        iCanCancel={BookingDetails.iCanCancel}
        BookingDB={BookingDB}
      />
    </>

  );
}