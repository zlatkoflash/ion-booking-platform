"use client"

import { IExperienceCompleteZ } from "@/interface/Interface";
import BookingSidebar from "./content/BookingSidebar";
import { BookingSidebarProvider } from "./content/BookingSidebarProvider";
import TourceViewOverview from "./content/TourceViewOverview";
import TourViewGallery from "./content/TourViewGallery";
// import { IBokunGetExperienceById } from "@/utils/bokun";
import BookingActivitySelectorHydrate from "./BookingActivitySelectorHydrate";
import { useSelector } from "react-redux";
import { RootState } from "@/libs/store";
import { IDBTour } from "@/utils/interface/interfaceDatabase";

export default function BookingActivitySelector({
  // dataForExperienceOut,
  tourDetailsInit
  // editorType = "client"
}: {
  // dataForExperienceOut: IBokunGetExperienceById;
  tourDetailsInit: {
    tour: IDBTour
  }
  // editorType: "client" | "admin";
}) {

  // dataForExperienceOut.experience.

  // const dataForExperience = useSelector((state: RootState) => state.bookingCalendar.dataForExperience);
  const tourDetails = useSelector((state: RootState) => state.bookingCalendar.tourDetails);
  // console.log("dataForExperienceOut:", dataForExperienceOut);

  // console.log("dataForExperience>>>:", dataForExperience);

  return (

    <>
      <BookingActivitySelectorHydrate
        //dataForExperience={dataForExperienceOut}
        tourDetailsInit={tourDetailsInit}
      />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Error Message */}


            {/* Overview */}
            <TourceViewOverview
              // experience={dataForExperienceOut.experience as IExperienceCompleteZ}
              tourDetails={tourDetailsInit}
            />

            {/* Photo Gallery */}
            <TourViewGallery
              // experience={dataForExperienceOut.experience as IExperienceCompleteZ}
              tourDetails={tourDetailsInit}
            />
          </div>

          {
            tourDetails !== null && <BookingSidebar />
          }
        </div>
      </div>
    </>

  );
}