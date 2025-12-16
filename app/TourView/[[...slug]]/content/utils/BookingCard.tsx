import {
  // ArrowLeft, MapPin, 
  Calendar,
  // Users, Star, Clock, 
  Shield, Wifi,
  // Camera, 
  AlertCircle,
  User, Mail, Phone
} from 'lucide-react';

import { redirect } from 'next/navigation';


import { IContactDetails } from '@/app/interface/interface';
import { IBokunGetExperienceById } from '@/utils/bokun';
import { useBookingSidebar } from '../BookingSidebarProvider';
import BookingParticipants from './BookingParticipants';
import { normalizeDateToYYYYMMDD } from '@/utils/dateUtils';

export default function BookingCardForm() {

  const {
    selectedAvailability,
    selectedRate,
    selectedRate_countParticipants,
    selectedRate_totalSum,
    experience,
    priceEngine
  } = useBookingSidebar();

  console.log("selectedAvailability:", selectedAvailability);

  /*const showContactForm = false;

  const contactDetails: IContactDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  };
  const contactErrors: Partial<IContactDetails> = {};*/

  // const quantities: Record<number, number> = {};
  // Pricing category mapping (you can expand this based on your needs)
  /*const categoryLabels: Record<number, string> = {
    933372: "Infant",
    753166: "Child",
    751351: "Adult"
  };*/



  // const selectedRateId = -1;

  /*const getTotalParticipants = (): number => {
    return Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  };*/

  /*const computeTotal = (): number => {

    return 0;

    if (!selectedRateId || !selectedAvailability) return 0;

    const priceBlock = selectedAvailability.pricesByRate?.find((p) => p.activityRateId === selectedRateId);
    if (!priceBlock) return 0;

    let total = 0;
    for (const p of priceBlock.pricePerCategoryUnit || []) {
      const qty = quantities[p.id] || 0;
      total += (p.amount?.amount || 0) * qty;
    }
    return total;
  };*/



  const processingPayment = false;

  /*const getTotalParticipants = () => {
    return 0;
  }*/


  return <div className="bg-white rounded-2xl p-8 shadow-lg sticky top-8">
    {/* Contact Form Modal */}
    {
      /*showContactForm 
      // 1 === 1
      && (
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
                  value={contactDetails.phoneNumber}
                  onChange={(e) => {
                    console.log("setContactDetails state, Contact details for Phone Number");
                    // setContactDetails(prev => ({ ...prev, phoneNumber: e.target.value }))
                  }}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${contactErrors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="Enter your phone number"
                />
                {contactErrors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">{contactErrors.phoneNumber}</p>
                )}
              </div>
            </div>

            <div className="flex space-x-4 mt-8">
              <button
                // onClick={() => { console.log("setShowContactForm(false) start");setShowContactForm(false)}}
                className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-full transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                if (validateContactDetails()) {
                  // setShowContactForm(false);
                  // handleBookNow();
                }
                console.log("Continue to payment check the case: if (validateContactDetails()) ");
                }}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 cursor-pointer"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        </div>
      )*/

    }

    {
      // selectedSlot.isSet ? 
      // selectedSlot ?
      selectedAvailability ?
        (
          <div className="space-y-6">
            {/*<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <div className="font-semibold text-blue-800">Selected Date & Time</div>
                  <div className="text-sm text-blue-700">
                    {selectedAvailability.date} at {selectedAvailability.startTime}
                  </div>
                  <div className="text-xs text-blue-600">
                    {selectedAvailability.availabilityCount} spots available
                  </div>
                </div>
              </div>
            </div>*/}

            {/* Participant Selector */}
            {
              //selectedRateId && selectedAvailability.rates?.find(r => r.id === selectedRateId)?.pricingCategoryIds 
              // selectedAvailability.
              selectedAvailability.rates !== undefined
              && (
                <BookingParticipants />

              )}

            <div className="border-t pt-6">
              <div className="flex justify-between text-lg font-semibold text-gray-800 mb-2">
                <span>Total ({
                  // getTotalParticipants()
                  selectedRate_countParticipants()
                } participants)</span>
                <span>€{
                  selectedRate_totalSum().toFixed(2)
                  // computeTotal().toFixed(2)
                }</span>
              </div>

              <button
                // onClick={() => {
                // console.log("handleBookNow event");
                // }}
                onClick={() => {

                  /**
                   * filteredCounts are the engine counts with category for [selectedAvailability, selectedRate]
                  */
                  const filteredCounts = priceEngine.counts.filter(count => {
                    return count.availabilityId === selectedAvailability.id
                      &&
                      count.rateId === selectedRate.id
                  });
                  // console.log("filteredCounts:", filteredCounts, priceEngine); return;


                  const detailsForCheckout = {
                    rate: selectedRate.id.toString(),
                    // a: selectedAvailability.activityId.toString(),
                    // availability: selectedAvailability.id.toString(),
                    // selectedAvailability.activityId is actually experience.id 
                    activity: selectedAvailability.activityId.toString(),
                    availability: selectedAvailability.id,
                    experience: experience.id,
                    participants: selectedRate_countParticipants().toString(),
                    // total must match with the server calculated sum, if it don't match it should produce error
                    total: selectedRate_totalSum().toString(),
                    counts: JSON.stringify(filteredCounts),
                    date: normalizeDateToYYYYMMDD(selectedAvailability.date),
                    startTimeId: selectedAvailability.startTimeId.toString(),
                    startTimeString: selectedAvailability.startTime,
                    dateLocalString: selectedAvailability.localizedDate
                  };
                  // console.log("detailsForCheckout:", detailsForCheckout); return;
                  const paramsForCheckout = new URLSearchParams(detailsForCheckout);
                  redirect(`/Checkout?${paramsForCheckout.toString()}`)
                }}
                disabled={
                  processingPayment
                  // || getTotalParticipants() === 0
                  || selectedRate_countParticipants() === 0
                }
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:transform-none disabled:cursor-not-allowed mb-3 cursor-pointer"
              >
                {processingPayment ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) :
                  // getTotalParticipants() === 0 
                  selectedRate_countParticipants() === 0
                    ? (
                      'Select Participants'
                    ) : (
                      'Book Now'
                    )}
              </button>

              <button
                type='button'
                onClick={() => {
                  console.log('Add to watch list event');
                }}
                className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-full transition-colors cursor-pointer">
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
  </div>;
}