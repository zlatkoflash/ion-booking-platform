import HeaderTourView from '@/components/headers/HeaderTourView';
// import { BokunGetExperienceByIdOrSlug, IBokunGetExperienceById } from '@/utils/bokun';

import BookingActivitySelector from './BookingActivitySelector';
import { IDBTour } from '@/utils/interface/interfaceDatabase';
import { getApiData } from '@/utils/api';
import TourHeroV2 from './content/TourHeroV2';


export default async function TourViewPage({ params }: { params: { slug: string[] } }) {

  const paramsFor = await params;
  console.log("paramsFor:", paramsFor);
  // idOrSlug = ""
  const idOrSlug = paramsFor?.slug[0];
  // const experience: IExperienceCompleteZ = await 
  // let dataForExperience: IBokunGetExperienceById = {} as IBokunGetExperienceById;
  // Loading the experience product


  // console.log("dataForExperience:", dataForExperience);


  // const error = "error is set to see the component only";

  const tourDetails = await getApiData<{
    ok: boolean;
    tour: IDBTour
  }>("/booking-public/get-experience", "POST", { idOrSlug }, "not-authorize", "application/json");
  console.log("tourDetails:", tourDetails);

  /*if (tourDetails.tour !== null) {
    try {
      dataForExperience = await BokunGetExperienceByIdOrSlug(
        // idOrSlug
        tourDetails.tour.api_experience_id
      );
      // console.log("dataForExperience:", dataForExperience);
    }
    catch (error) {
      console.log("Loading tour error:", error);
    }
  }*/



  if (tourDetails.ok !== true || tourDetails.tour === null) {
    return <div className="min-h-screen bg-gray-50">
      <HeaderTourView />
      <div className="text-center py-12">
        <div className="space-y-4">
          <p className="text-gray-500 text-lg">No tour found</p>
        </div>
      </div>
    </div>
  }


  return <div className="min-h-screen bg-gray-50">
    {/* Header */}

    <HeaderTourView />

    {/* Hero Image */}
    {
      /*<TourHero
      experience={dataForExperience.experience as IExperienceCompleteZ}
    />*/
    }
    <TourHeroV2
      tour={tourDetails.tour}
    />

    <BookingActivitySelector
      // dataForExperienceOut={dataForExperience}
      tourDetailsInit={tourDetails}
    />




  </div>;
}