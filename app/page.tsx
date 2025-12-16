// import { IExperience } from "@/app/interface/interface";
import GridHomeTours from "@/components/grids/GridHomeTours";
import { IGridHomeToursItem } from "@/components/panels/GridHomeToursItem";
import { zconfig } from "@/config/config";
import { BokunSearch } from "@/utils/bokun";
import { SupabaseEdgeFetchPost } from "@/utils/supabase";
import Link from "next/link";
// import { MapPin, Star, Users, Calendar } from 'lucide-react';

export default async function HomeContent() {

  /*const featuredTours: Partial<(
    IExperience
    &
    {
      name: string,
      duration: string,
      rating: number,
      image: string,
      participants: number
  })>[] = [*/


  /*const toursBokun = await fetch(`${zconfig.supabase.api_link}`, {
    method: "POST",
  });*/
  console.log("Before bokun:");
  // const toursBokun = await SupabaseEdgeFetchPost("/bokun/search", {});
  const toursBokun = await BokunSearch({});
  console.log("toursBokun:", toursBokun);


  /*const featuredTours: IGridHomeToursItem[] = [


    {
      tour: {
        id: "1",
        name: "Explore Ancient Rome",
        location: "Rome, Italy",
        duration: "7 days",
        price: 1299,
        rating: 4.8,
        image: "https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=800",
        participants: 12
      }
    },
    {
      tour: {
        id: "2",
        name: "Explore Ancient Rome",
        location: "Rome, Italy",
        duration: "7 days",
        price: 1299,
        rating: 4.8,
        image: "https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=800",
        participants: 12
      }
    },
    {
      tour: {
        id: "3",
        name: "Explore Ancient Rome",
        location: "Rome, Italy",
        duration: "7 days",
        price: 1299,
        rating: 4.8,
        image: "https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=800",
        participants: 12
      }
    },
    {
      tour: {
        id: "4",
        name: "Explore Ancient Rome",
        location: "Rome, Italy",
        duration: "7 days",
        price: 1299,
        rating: 4.8,
        image: "https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=800",
        participants: 12
      }
    },
    {
      tour: {
        id: "5",
        name: "Explore Ancient Rome",
        location: "Rome, Italy",
        duration: "7 days",
        price: 1299,
        rating: 4.8,
        image: "https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=800",
        participants: 12
      }
    },
  ];*/


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-r from-blue-900 to-purple-900 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            World Insight Tours
            <span className="block text-3xl md:text-4xl font-light mt-4 text-blue-200">
              WIT-3.0
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light">
            Discover extraordinary destinations with expert guides and unforgettable experiences
          </p>
          <Link href="/Tours" className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl cursor-pointer">
            Explore Tours
          </Link>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Featured Tours
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked adventures that will create memories to last a lifetime
          </p>
        </div>

        {
          toursBokun.ok === true ?
            <GridHomeTours items={toursBokun.items} /> :
            <>
              <div className="text-center py-12">
                <div className="space-y-4">
                  <p className="text-gray-500 text-lg">No tours found</p>
                </div>
              </div>
            </>
        }

        {/*<GridHomeTours items={featuredTours} />*/}
        {/*<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          featuredTours.map((tour, key: number) => (
            <div key={`tour-key-${tour.id}-${key}`} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative">
                <img
                  src={tour.image}
                  alt={tour.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold">{tour.rating}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{tour.name}</h3>

                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{tour.location}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{tour.participants} spots left</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-blue-600">{tour.price}</span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-300 cursor-pointer">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        </div>*/}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of satisfied travelers who have discovered the world with WIT-3.0
          </p>
          <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl cursor-pointer">
            Browse All Tours
          </button>
        </div>
      </section>
    </div>
  );
}