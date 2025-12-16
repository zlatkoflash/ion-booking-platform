'use client'
import { User, Mail, Phone, MapPin, CreditCard, Lock } from 'lucide-react';
import { useBookingCheckout } from '../CheckoutProvider';
import { useState } from 'react';
import { IContactDetails } from '@/app/interface/interface';

/**
 * 
 * @returns if all okay 
 */
export default function CheckoutFormContactDetails() {




  const {
    reservation_bookingHash,
    set_reservation_bookingHash,
    totalPrice,
    searchParamsFor,
    set_reserved_booking,
    reserved_booking,
    counts,
    experience,
    step,
    setStep,
    contactDetails,
    setContactDetails
  } = useBookingCheckout();

  /*const [step, setStep] = useState<'contact' | 'payment'>('contact');
  const [contactDetails, setContactDetails] = useState<IContactDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: ''
  });*/
  const [errors, setErrors] = useState<Partial<IContactDetails>>({});

  const [contactDetailsLocal, setContactDetailsLocal] = useState<IContactDetails>(/*{
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: ''
  }*/contactDetails);

  const validateContactDetails = (): boolean => {
    const newErrors: Partial<IContactDetails> = {};

    if (!contactDetailsLocal.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!contactDetailsLocal.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!contactDetailsLocal.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(contactDetailsLocal.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!contactDetailsLocal.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinueToPayment = () => {
    if (validateContactDetails()) {

      console.log('step before set contact details:', step);

      setStep('checkout');
      console.log("const handleContinueToPayment = () => {", "add the contact details to the provider");
      setContactDetails(contactDetailsLocal);
      // onComplete?.(contactDetails);

    }
  };

  const handleInputChange = (field: keyof IContactDetails, value: string) => {
    // setContactDetails(prev => ({ ...prev, [field]: value } ));
    setContactDetailsLocal(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };



  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Contact Details</h3>
        <div className="flex items-center text-blue-600">
          <Lock className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">Secure Form</span>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              First Name *
            </label>
            <input
              type="text"
              value={contactDetailsLocal.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.firstName ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Last Name *
            </label>
            <input
              type="text"
              value={contactDetailsLocal.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.lastName ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Mail className="w-4 h-4 inline mr-2" />
            Email Address *
          </label>
          <input
            type="email"
            value={contactDetailsLocal.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="Enter your email address"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Phone className="w-4 h-4 inline mr-2" />
            Phone Number *
          </label>
          <input
            type="tel"
            value={contactDetailsLocal.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-2" />
            Address (Optional)
          </label>
          <input
            type="text"
            value={contactDetailsLocal.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Enter your address"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City (Optional)
            </label>
            <input
              type="text"
              value={contactDetailsLocal.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter your city"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country (Optional)
            </label>
            <input
              type="text"
              value={contactDetailsLocal.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter your country"
            />
          </div>
        </div>
      </div>



      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-gray-800 mb-2">Order Summary</h4>
        <div className="flex justify-between items-end">
          <div>
            <div className="text-gray-600">
              {experience.title}
            </div>
            {/* Date and Time Group */}
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              {/* Date */}
              <div className="flex items-center">
                🗓️ <span className="ml-1 font-medium">{searchParamsFor.dateLocalString}</span>
              </div>

              {/* Time */}
              <div className="flex items-center">
                🕒 <span className="ml-1 font-medium">{searchParamsFor.startTimeString}</span>
              </div>
            </div>

            {/* Participants/Group Size */}
            <div className="flex items-center text-sm text-gray-500">
              👥 <span className="ml-1">Participants:</span>
              <span className="ml-1 font-medium">{
                searchParamsFor.participants
              }</span>
            </div>
          </div>
          <div className="font-bold text-gray-800 text-4xl">€{totalPrice.toFixed(2)}</div>
        </div>
      </div>

      {
        // this is the button for live form
      }
      <button
        onClick={handleContinueToPayment}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer"
      >
        <div className="flex items-center justify-center">
          <CreditCard className="w-5 h-5 mr-2" />
          Continue to Payment
        </div>
      </button>



      <div className="text-center text-xs text-gray-500 mt-4">
        <p>Your information is secure and encrypted</p>
      </div>
    </div>
  );

}
