"use client"

import BookingAndRefundsHeading from "../Client/BookingsAndRefunds/components/BookingAndRefundsHeading";
import NoContentIllustration from "../Client/BookingsAndRefunds/components/NoContentIllustration";

export default function ServerIsDown() {
  return <>


    <BookingAndRefundsHeading className="pt-5" title="Oops! Something went wrong on our end" />
    <NoContentIllustration type="items-not-found"
      title="We can’t load your booking information right now."
      paragraph="We’re sorry for the interruption. We are working hard to resolve the issue as quickly as possible. Thank you for your patience!"
      button={{
        label: "Try Again",
        onClick: () => {
          window.location.reload();
        }
      }}
    />
  </>
}