"use client";

import BookingActivitySelector from "@/app/TourView/[[...slug]]/BookingActivitySelector";
import { BookingEditorProvider } from "@/app/TourView/[[...slug]]/BookingEditorProvider";
import { useAuth } from "@/app/User/AuthProvider";
import UserAdminHeader from "@/app/User/content/Header";
import { UserLoginForm } from "@/app/User/content/LoginForm";
import { IBokunBooking, IBokunGetExperienceById } from "@/utils/bokun";
import { IBookingDatabaseNet } from "@/interface/payment.booking";
import BookingUpdateModalSuccess from "./BookingUpdateModalSuccess";

export default function BookingEditorWrap({
  bokunBooking,
  dataForExperience,
  bookingDBNet,
  bookingPayments,
  bookingRefunds,
  iCanCancel,
  BookingDB
}: {
  bokunBooking: IBokunBooking,
  dataForExperience: IBokunGetExperienceById,
  bookingDBNet: IBookingDatabaseNet,
  bookingPayments: any[],
  bookingRefunds: any[],
  iCanCancel: boolean,
  BookingDB: any
}) {

  const {
    user,
    isAuthenticated,
    isInitialized,
    error
  } = useAuth();

  if (!isAuthenticated)
    return (
      <UserLoginForm />
    );
  return (
    <>
      <UserAdminHeader />

      {
        /*
        <BookingSingleItemProvider bokunBooking={bokunBooking} bookingDB={BookingDB}>
        <ViewMyBookingContent bookingId={paramsFor.slug} />
      </BookingSingleItemProvider>
        */
      }

      <BookingEditorProvider
        clientType="booking-editor"
        bokunBookingForediting={bokunBooking}
        bookingDBNet={bookingDBNet}
        bookingPayments={bookingPayments}
        bookingRefunds={bookingRefunds}
        iCanCancel={iCanCancel}
        BookingDB={BookingDB}
      >
        <BookingActivitySelector
          dataForExperience={dataForExperience}
        />
        <BookingUpdateModalSuccess isOpen={true} onClose={() => { }} />
      </BookingEditorProvider>

    </>
  );
}