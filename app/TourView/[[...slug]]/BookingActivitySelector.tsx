"use client"

import { IExperienceCompleteZ } from "@/interface/Interface";
import BookingSidebar from "./content/BookingSidebar";
import { BookingSidebarProvider } from "./content/BookingSidebarProvider";
import TourceViewOverview from "./content/TourceViewOverview";
import TourViewGallery from "./content/TourViewGallery";
import { IBokunGetExperienceById } from "@/utils/bokun";
import BookingActivitySelectorHydrate from "./BookingActivitySelectorHydrate";
import { useSelector } from "react-redux";
import { RootState } from "@/libs/store";

export default function BookingActivitySelector({
  dataForExperienceOut,
  // editorType = "client"
}: {
  dataForExperienceOut: IBokunGetExperienceById;
  // editorType: "client" | "admin";
}) {

  const dataForExperience = useSelector((state: RootState) => state.bookingCalendar.dataForExperience);
  console.log("dataForExperienceOut:", dataForExperienceOut);

  console.log("dataForExperience>>>:", dataForExperience);

  return (

    <>
      <BookingActivitySelectorHydrate dataForExperience={dataForExperienceOut} />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Error Message */}


            {/* Overview */}
            <TourceViewOverview experience={dataForExperienceOut.experience as IExperienceCompleteZ} />

            {/* Photo Gallery */}
            <TourViewGallery experience={dataForExperienceOut.experience as IExperienceCompleteZ} />
          </div>

          {/* Booking Sidebar */}
          {
            /*<BookingSidebarProvider
          // dataForExperience={dataForExperience}
          >
            {
              dataForExperience !== null && <BookingSidebar />
            }

          </BookingSidebarProvider>*/
          }
          {
            dataForExperience !== null && <BookingSidebar />
          }
        </div>
      </div>
    </>

  );
}