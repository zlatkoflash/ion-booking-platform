import { IExperienceCompleteZ } from "@/interface/Interface";
import BookingSidebar from "./content/BookingSidebar";
import { BookingSidebarProvider } from "./content/BookingSidebarProvider";
import TourceViewOverview from "./content/TourceViewOverview";
import TourViewGallery from "./content/TourViewGallery";
import { IBokunGetExperienceById } from "@/utils/bokun";

export default function BookingActivitySelector({
  dataForExperience,
  // editorType = "client"
}: {
  dataForExperience: IBokunGetExperienceById;
  // editorType: "client" | "admin";
}) {
  return (


    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Error Message */}


          {/* Overview */}
          <TourceViewOverview experience={dataForExperience.experience as IExperienceCompleteZ} />

          {/* Photo Gallery */}
          <TourViewGallery experience={dataForExperience.experience as IExperienceCompleteZ} />
        </div>

        {/* Booking Sidebar */}
        <BookingSidebarProvider dataForExperience={dataForExperience}>
          <BookingSidebar />
        </BookingSidebarProvider>
      </div>
    </div>

  );
}