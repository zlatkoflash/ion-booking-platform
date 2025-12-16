// import { IExperience } from '@/app/interface/interface';
import ToursForToursPage from '@/components/grids/ToursForToursPage';
import { BokunSearch } from '@/utils/bokun';
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


  const fetchedTours = await BokunSearch({
    category: TheParams.slug !== undefined ? TheParams.slug[0] : ""
  });
  // console.log("Ohrid demo:", fetchedTours.items[2].tour);// comment this line it is for testing purposes

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

      <ToursForToursPage
        error={fetchedTours.error}
        ok={fetchedTours.ok}
        tours={fetchedTours.items}
      />

    </div>
  </div>;
}