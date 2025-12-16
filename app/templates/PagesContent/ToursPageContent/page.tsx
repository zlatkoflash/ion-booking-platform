'use client'

// import { IExperience } from '@/app/interface/interface';
import { MapPin, Star, Users, AlertCircle, Loader2 } from 'lucide-react';


export default function ToursPageContent() {

  const fetchTours = () => {
    console.log("fetchTours function need to be updated");
  }
  const error = null;

  const tours: any[] = [

    {
      description: "Example description",
      id: "111",
      images_url: "https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: 200,
      tags: ['tag1', 'tag2'],
      title: "Booking title",
      bokun_activity_id: 'booking-activity-id',
      location: 'Location',
      vendor: "Vendor"
    },
    {
      description: "Example description",
      id: "111",
      images_url: "https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: 200,
      tags: ['tag1', 'tag2'],
      title: "Booking title",
      bokun_activity_id: 'booking-activity-id',
      location: 'Location',
      vendor: "Vendor"
    },
    {
      description: "Example description",
      id: "111",
      images_url: "https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: 200,
      tags: ['tag1', 'tag2'],
      title: "Booking title",
      bokun_activity_id: 'booking-activity-id',
      location: 'Location',
      vendor: "Vendor"
    },
    {
      description: "Example description",
      id: "111",
      images_url: "https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: 200,
      tags: ['tag1', 'tag2'],
      title: "Booking title",
      bokun_activity_id: 'booking-activity-id',
      location: 'Location',
      vendor: "Vendor"
    },


  ];

  return <div className="min-h-screen bg-gray-50 py-8">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          WIT-3.0 – World Insight Tours
        </h1>
        <p className="text-xl text-gray-600">
          Live tours from Bokun API - Florence experiences
        </p>

        {error && (
          <div className="max-w-2xl mx-auto mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-3" />
              <div>
                <div className="font-semibold text-yellow-800">Using Demo Data</div>
                <div className="text-sm text-yellow-700">
                  Bokun API: {error}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {tours.length === 0 ? (
        <div className="text-center py-12">
          <div className="space-y-4">
            <p className="text-gray-500 text-lg">No tours found</p>
            <button
              onClick={fetchTours}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-colors cursor-pointer"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour: any, key: number) => (
            <div
              key={`tour-item-${key}-${tour.id}`}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative">
                <img
                  src={Array.isArray(tour.images_url) ? tour.images_url[0] : tour.images_url || 'https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=800'}
                  alt={tour.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  {(Array.isArray(tour.tags) ? tour.tags : [tour.tags]).filter(Boolean).slice(0, 2).map((tag: any, index: number) => (
                    <span
                      key={index}
                      className="inline-block bg-white bg-opacity-90 text-gray-800 text-xs px-2 py-1 rounded-full mr-1 mb-1 font-medium"
                    >
                      {String(tag)}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  {tour.title}
                </h2>

                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{tour.location}</span>
                </div>

                {tour.vendor && (
                  <div className="flex items-center text-gray-500 mb-3">
                    <Users className="w-4 h-4 mr-2" />
                    <span className="text-sm">by {tour.vendor}</span>
                  </div>
                )}

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {tour.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-green-600">
                    €{typeof tour.price === 'number' ? tour.price.toFixed(2) : '49.99'}
                  </div>
                  <button
                    onClick={() => window.location.href = `/tour/${tour.id}`}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer hover:opacity-70"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>;
}