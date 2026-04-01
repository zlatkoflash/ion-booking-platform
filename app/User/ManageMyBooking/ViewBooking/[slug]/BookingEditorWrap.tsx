"use client";

import BookingActivitySelector from "@/app/TourView/[[...slug]]/BookingActivitySelector";
// import { BookingEditorProvider } from "@/app/TourView/[[...slug]]/BookingEditorProvider";
import { useAuth } from "@/app/User/AuthProvider";
import UserAdminHeader from "@/app/User/content/Header";
// import { UserLoginForm } from "@/app/User/content/LoginForm";
import {
  IBokunBooking,
  // IBokunGetExperienceById
} from "@/utils/bokun";
import { IBookingDatabaseNet } from "@/interface/payment.booking";
import BookingUpdateModalSuccess from "./BookingUpdateModalSuccess";
import HydrateMyBookingEditor from "./HydrateMyBookingEditor";
import { IDBTour } from "@/utils/interface/interfaceDatabase";

export default function BookingEditorWrap({
  bokunBooking,
  // dataForExperience,
  bookingDBNet,
  bookingPayments,
  bookingRefunds,
  iCanCancel,
  BookingDB,
  tourDetails
}: {
  bokunBooking: IBokunBooking,
  // dataForExperience: IBokunGetExperienceById,
  bookingDBNet: IBookingDatabaseNet,
  bookingPayments: any[],
  bookingRefunds: any[],
  iCanCancel: boolean,
  BookingDB: any,
  tourDetails: {
    tour: IDBTour
  }
}) {

  const {
    user,
    isAuthenticated,
    isInitialized,
    error
  } = useAuth();

  {
    /*if (!isAuthenticated){
    return (
      // <UserLoginForm />
    );
  }*/
  }
  return (
    <>

      <HydrateMyBookingEditor
        clientType="booking-editor"
        bokunBookingForediting={bokunBooking}
        bookingDBNet={bookingDBNet}
        bookingPayments={bookingPayments}
        bookingRefunds={bookingRefunds}
        iCanCancel={iCanCancel}
        BookingDB={BookingDB}
      />

      <UserAdminHeader />

      <BookingActivitySelector
        // dataForExperienceOut={dataForExperience}
        tourDetailsInit={tourDetails}
      />
      <BookingUpdateModalSuccess isOpen={true} onClose={() => { }} />


    </>
  );
}