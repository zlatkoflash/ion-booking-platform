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
import BookingActivitySelector from './BookingActivitySelector';
import { BookingEditorProvider } from './BookingEditorProvider';


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

    {
      /*<BookingEditorProvider clientType='booking'>
      <BookingActivitySelector
        dataForExperienceOut={dataForExperience}
      />
    </BookingEditorProvider>*/
    }
    <BookingActivitySelector
      dataForExperienceOut={dataForExperience}
    />




  </div>;
}