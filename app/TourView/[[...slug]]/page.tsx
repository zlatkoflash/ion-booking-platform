// 'use client'

/*import {
  // IBokunSlot, IBokunTour, 
  IContactDetails,
  // IExperience 
} from '@/app/interface/interface';*/
// import AvailabilityCalendar from '@/components/AvailabilityCalendar/AvailabilityCalendar';
import HeaderTourView from '@/components/headers/HeaderTourView';
import TourHero from '@/app/TourView/[[...slug]]/content/TourHero';
import { IExperienceCompleteZ } from '@/interface/Interface';
import { BokunGetExperienceByIdOrSlug, IBokunGetExperienceById } from '@/utils/bokun';
import {
  AlertCircle
  // ArrowLeft, MapPin, Calendar, Users, Star, Clock, Shield, Wifi, Camera, AlertCircle, 
  // User, Mail, Phone 
} from 'lucide-react';
import TourceViewOverview from './content/TourceViewOverview';
import TourViewGallery from './content/TourViewGallery';
import BookingSidebar from './content/BookingSidebar';
import { BookingSidebarProvider } from './content/BookingSidebarProvider';


export default async function TourViewPage({ params }: { params: { slug: string[] } }) {

  const paramsFor = await params;
  console.log("paramsFor:", paramsFor);
  // idOrSlug = ""
  const idOrSlug = paramsFor?.slug[0];
  // const experience: IExperienceCompleteZ = await 
  let dataForExperience: IBokunGetExperienceById = {} as IBokunGetExperienceById;
  // Loading the experience product
  try {
    dataForExperience = await BokunGetExperienceByIdOrSlug(idOrSlug);
  }
  catch (error) {
    console.log("Loading tour error:", error);
  }

  console.log("dataForExperience:", dataForExperience);


  const error = "error is set to see the component only";




  return <div className="min-h-screen bg-gray-50">
    {/* Header */}

    <HeaderTourView />

    {/* Hero Image */}
    <TourHero
      experience={dataForExperience.experience as IExperienceCompleteZ}
    />

    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Error Message */}
          {/*error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
                <div>
                  <div className="font-semibold text-red-800">Bokun API Error</div>
                  <div className="text-sm text-red-700">
                    {error}
                  </div>
                  <div className="text-xs text-red-600 mt-1">
                    Showing demo data. To fix: Deploy the bokun-availabilities Edge Function.
                  </div>
                </div>
              </div>
            </div>
          )*/}

          {/* Overview */}
          <TourceViewOverview experience={dataForExperience.experience as IExperienceCompleteZ} />

          {/* Photo Gallery */}
          <TourViewGallery experience={dataForExperience.experience as IExperienceCompleteZ} />
        </div>

        {/* Booking Sidebar */}
        <BookingSidebarProvider dataForExperience={dataForExperience}>
          <BookingSidebar />
        </BookingSidebarProvider>
        {
          // booking sidebar end
        }





      </div>
    </div>
  </div>;
}