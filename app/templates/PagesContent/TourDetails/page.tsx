'use client'

import {
  // IBokunSlot, IBokunTour, 
  IContactDetails,
  //IExperience 
} from '@/app/interface/interface';
import AvailabilityCalendar from '@/components/AvailabilityCalendar/AvailabilityCalendar';
import { ArrowLeft, MapPin, Calendar, Users, Star, Clock, Shield, Wifi, Camera, AlertCircle, User, Mail, Phone } from 'lucide-react';
import { redirect } from 'next/navigation';


export default function TourDetailsContent() {


  const tour: any = {
    description: "Example description",
    id: 111,
    // images_url: "https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=800",
    keyPhoto: {
      originalUrl: "https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    photos: [
      {
        fullSizeUrl: "https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      {
        fullSizeUrl: "https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      {
        fullSizeUrl: "https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      {
        fullSizeUrl: "https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      {
        fullSizeUrl: "https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      {
        fullSizeUrl: "https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
    ],
    price: 200,
    // tags: ['tag1', 'tag2'],
    title: "Booking title",
    excerpt: "This will be excerpt",
    // bokun_activity_id: 'booking-activity-id',
    location: {
      city: "Ohrid",
      country: "Macedonia"
    },
    vendor: {
      title: "This is the title"
    },
    categories: [
      {
        title: "Category 1"
      },
      {
        title: "Category 2"
      }
    ]
  };

  const heroImage = tour.keyPhoto?.originalUrl || tour.photos?.[0]?.fullSizeUrl || 'https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=1200';

  const location = tour.location ? `${tour.location.city}, ${tour.location.country}` : 'Florence, Italy';

  const description = tour.description || tour.excerpt || 'Discover this amazing experience';

  const error = null;

  const showContactForm = false;

  const contactDetails: IContactDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  };
  const contactErrors: Partial<IContactDetails> = {};

  let selectedSlot: Partial<any & { isSet: boolean }> = {
    isSet: false
  };
  console.log("Check when selectedSlot have data how the html react");

  const selectedRateId = -1;

  // Pricing category mapping (you can expand this based on your needs)
  const categoryLabels: Record<number, string> = {
    933372: "Infant",
    753166: "Child",
    751351: "Adult"
  };

  const quantities: Record<number, number> = {};
  /*
  quantities[101] = 5;
  quantities[203] = 2;
  quantities[444] = 2;
  result with object {
  101:5,
  203:2,
  444:2
  }
  */

  const getTotalParticipants = (): number => {
    return Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  };

  const computeTotal = (): number => {
    if (!selectedRateId || !selectedSlot) return 0;

    const priceBlock = selectedSlot.pricesByRate?.find((p: any) => p.activityRateId === selectedRateId);
    if (!priceBlock) return 0;

    let total = 0;
    for (const p of priceBlock.pricePerCategoryUnit || []) {
      const qty = quantities[p.id] || 0;
      total += (p.amount?.amount || 0) * qty;
    }
    return total;
  };

  const processingPayment = false;



  return <div className="min-h-screen bg-gray-50">
    {/* Header */}
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Tours
        </button>
      </div>
    </div>

    {/* Hero Image */}
    <div className="relative h-96 md:h-[500px]">
      <img
        src={heroImage}
        alt={tour.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="absolute bottom-8 left-8 text-white">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center bg-white bg-opacity-20 rounded-full px-3 py-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span className="font-semibold">4.8</span>
            <span className="text-sm ml-1">(142 reviews)</span>
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-2">{tour.title}</h1>
        <div className="flex items-center text-xl">
          <MapPin className="w-5 h-5 mr-2" />
          <span>{location}</span>
        </div>
        {tour.vendor && (
          <div className="flex items-center text-lg mt-2 opacity-90">
            <Users className="w-4 h-4 mr-2" />
            <span>by {tour.vendor.title}</span>
          </div>
        )}
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Error Message */}
          {error && (
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
          )}

          {/* Overview */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Overview</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">{description}</p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center">
                <Calendar className="w-6 h-6 text-blue-600 mr-3" />
                <div>
                  <div className="font-semibold text-gray-800">Duration</div>
                  <div className="text-gray-600">2-3 hours</div>
                </div>
              </div>
              <div className="flex items-center">
                <Users className="w-6 h-6 text-blue-600 mr-3" />
                <div>
                  <div className="font-semibold text-gray-800">Group Size</div>
                  <div className="text-gray-600">Max 15 people</div>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="w-6 h-6 text-blue-600 mr-3" />
                <div>
                  <div className="font-semibold text-gray-800">Start Time</div>
                  <div className="text-gray-600">Multiple times</div>
                </div>
              </div>
            </div>

            {tour.categories && tour.categories.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {tour.categories.map((category: any, index: number) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <h3 className="text-2xl font-bold text-gray-800 mb-4">What's Included</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                "Expert guide",
                "Skip-the-line entrance tickets",
                "Small group experience",
                "Audio headsets"
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <Shield className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Photo Gallery */}
          {tour.photos && tour.photos.length > 0 && (
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Photo Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tour.photos.slice(0, 6).map((photo: any, index: number) => (
                  <div key={index} className="aspect-video rounded-lg overflow-hidden">
                    <img
                      src={photo.fullSizeUrl}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Booking Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          {/* Availability Calendar */}
          <AvailabilityCalendar
            activityId={tour.id.toString()}
          /*onSlotSelect={(slot: any) => {
            console.log("This will be handleSlotSelect function, see in the old code.");
          }}*/
          />

          {/* Booking Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg sticky top-8">
            {/* Contact Form Modal */}
            {showContactForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Details</h3>
                  <p className="text-gray-600 mb-6">Please provide your contact information to complete the booking.</p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={contactDetails.firstName}
                        onChange={(e) => {
                          console.log("setContactDetails state should be set");
                          // setContactDetails(prev => ({ ...prev, firstName: e.target.value }))
                        }}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${contactErrors.firstName ? 'border-red-500' : 'border-gray-300'
                          }`}
                        placeholder="Enter your first name"
                      />
                      {contactErrors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{contactErrors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={contactDetails.lastName}
                        onChange={(e) => {
                          console.log("setContactDetails set state for last name");
                          // setContactDetails(prev => ({ ...prev, lastName: e.target.value }))
                        }}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${contactErrors.lastName ? 'border-red-500' : 'border-gray-300'
                          }`}
                        placeholder="Enter your last name"
                      />
                      {contactErrors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{contactErrors.lastName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={contactDetails.email}
                        onChange={(e) => {
                          console.log("setContactDetails state, Contact details for email");
                          // setContactDetails(prev => ({ ...prev, email: e.target.value }))
                        }}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${contactErrors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                        placeholder="Enter your email address"
                      />
                      {contactErrors.email && (
                        <p className="text-red-500 text-sm mt-1">{contactErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={contactDetails.phone}
                        onChange={(e) => {
                          console.log("setContactDetails state, Contact details for Phone Number");
                          // setContactDetails(prev => ({ ...prev, phoneNumber: e.target.value }))
                        }}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${contactErrors.phone ? 'border-red-500' : 'border-gray-300'
                          }`}
                        placeholder="Enter your phone number"
                      />
                      {contactErrors.phone && (
                        <p className="text-red-500 text-sm mt-1">{contactErrors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-4 mt-8">
                    <button
                      onClick={() => {
                        console.log("setShowContactForm(false) start");
                        // setShowContactForm(false)
                      }}
                      className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-full transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        /*if (validateContactDetails()) {
                          setShowContactForm(false);
                          handleBookNow();
                        }*/
                        console.log("Continue to payment check the case: if (validateContactDetails()) ");
                      }}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 cursor-pointer"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              </div>
            )}

            {
              selectedSlot.isSet ? (
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-blue-600 mr-3" />
                      <div>
                        <div className="font-semibold text-blue-800">Selected Date & Time</div>
                        <div className="text-sm text-blue-700">
                          {selectedSlot.date} at {selectedSlot.startTime}
                        </div>
                        <div className="text-xs text-blue-600">
                          {selectedSlot.availabilityCount} spots available
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Participant Selector */}
                  {selectedRateId && selectedSlot.rates?.find((r: any) => r.id === selectedRateId)?.pricingCategoryIds && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Participants</h3>
                      <div className="space-y-3">
                        {selectedSlot.rates.find((r: any) => r.id === selectedRateId)?.pricingCategoryIds?.map((catId: number) => {
                          const catPrice = selectedSlot.pricesByRate
                            ?.find((p: any) => p.activityRateId === selectedRateId)
                            ?.pricePerCategoryUnit?.find((pcu: any) => pcu.id === catId);

                          const label = categoryLabels[catId] || `Category ${catId}`;
                          const price = catPrice?.amount?.amount || 0;
                          const currency = catPrice?.amount?.currency || 'EUR';

                          return (
                            <div key={catId} className="flex items-center justify-between py-3 border-b border-gray-100">
                              <div>
                                <div className="font-medium text-gray-800">{label}</div>
                                <div className="text-sm text-gray-600">€{price.toFixed(2)}</div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <button
                                  onClick={() => {
                                    console.log("setQty(catId, (quantities[catId] || 0) - 1)");
                                    // setQty(catId, (quantities[catId] || 0) - 1)
                                  }}
                                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 cursor-pointer"
                                  disabled={!quantities[catId] || quantities[catId] <= 0}
                                >
                                  -
                                </button>
                                <span className="w-8 text-center font-medium">
                                  {quantities[catId] || 0}
                                </span>
                                <button
                                  onClick={() => {
                                    // setQty(catId, (quantities[catId] || 0) + 1)
                                    console.log("Where is + : setQty(catId, (quantities[catId] || 0) + 1)");
                                  }}
                                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 cursor-pointer"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="border-t pt-6">
                    <div className="flex justify-between text-lg font-semibold text-gray-800 mb-2">
                      <span>Total ({getTotalParticipants()} participants)</span>
                      <span>€{computeTotal().toFixed(2)}</span>
                    </div>

                    <button
                      onClick={() => {
                        console.log("handleBookNow event");

                        redirect('/Checkout')

                      }}
                      disabled={processingPayment || getTotalParticipants() === 0}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:transform-none disabled:cursor-not-allowed mb-3 cursor-pointer"
                    >
                      {processingPayment ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Processing...
                        </div>
                      ) : getTotalParticipants() === 0 ? (
                        'Select Participants'
                      ) : (
                        'Book Now'
                      )}
                    </button>

                    <button className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-full transition-colors cursor-pointer">
                      Add to Wishlist
                    </button>
                  </div>

                  <div className="text-center text-sm text-gray-500">
                    <div className="flex items-center justify-center mb-2">
                      <Shield className="w-4 h-4 mr-2" />
                      Free cancellation up to 24 hours
                    </div>
                    <div className="flex items-center justify-center">
                      <Wifi className="w-4 h-4 mr-2" />
                      Instant confirmation
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-2">Select a date and time</p>
                  <p className="text-sm text-gray-400">Choose from available slots above</p>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  </div>;
}