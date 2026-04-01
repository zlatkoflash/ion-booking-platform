// import { IExperience } from '@/app/interface/interface';
import ToursForToursPage from '@/components/grids/ToursForToursPage';
import ToursForToursPageV2 from '@/components/grids/ToursForToursPageV2';
import { getApiData } from '@/utils/api';
// import { BokunSearch } from '@/utils/bokun';
import { IDBTour } from '@/utils/interface/interfaceDatabase';
/*import {
  MapPin,
  // Star, 
  Users,
  AlertCircle,
  // Loader2 
} from 'lucide-react';*/


type ToursPageParams = {
  // slug is an optional array of strings, or undefined for the base path.
  slug?: string[];
};

export default async function ToursPageContentParams({ params }: { params: ToursPageParams }) {

  const TheParams = await params;
  console.log("TheParams:", TheParams);


  console.log("It is working");


  /*const fetchedTours = await BokunSearch({
    category: TheParams.slug !== undefined ? TheParams.slug[0] : ""
  });*/
  // console.log("Ohrid demo:", fetchedTours.items[2].tour);// comment this line it is for testing purposes

  const toursBokunData = await getApiData<{
    ok: boolean;
    tours: { tour: IDBTour }[]
  }>("/booking-public/get-experiences", "POST", {
    filters: {
      categories: [TheParams.slug !== undefined ? TheParams.slug[0] : ""]
    }
  }, "not-authorize", "application/json");
  console.log("toursBokunData 2:", toursBokunData);


  return <div className="min-h-screen bg-gray-50 py-8">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          WIT-3.0 – World Insight Tours
        </h1>
        <p className="text-xl text-gray-600">
          Live tours from Bokun API - Florence experiences
        </p>


      </div>

      {
        /*<ToursForToursPage
        error={fetchedTours.error}
        ok={fetchedTours.ok}
        tours={fetchedTours.items}
      />*/
      }

      <ToursForToursPageV2
        // error={toursBokunData.error}
        // ok={toursBokunData.ok}
        // tours={toursBokunData.tours}
        ToursData={toursBokunData.tours}
      />

    </div>
  </div>;
}