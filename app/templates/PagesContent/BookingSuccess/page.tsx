"use client"

import { IBooking } from '@/app/interface/interface';
import { CheckCircle, Calendar, MapPin, Users, Mail, Download, ArrowLeft } from 'lucide-react';

export default function BookingSucccessContent() {

  const loading = false;
  const sessionId = 'session-id';


  const bookingDetails: IBooking = {
    bookingId: sessionId ? sessionId.slice(-8).toUpperCase() : "WIT-2024-001847",
    tourName: "Tour Booking",
    location: "Destination",
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    duration: "Multi-day experience",
    travelers: 1,
    customerEmail: "customer@example.com",
    confirmationSent: true
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Processing your booking...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back to Home Button */}
        <div className="mb-8">
          <button
            onClick={() => window.location.href = '/'}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
          >

            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Tours
          </button>
        </div>

        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Payment Successful!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Thank you for choosing WIT-3.0. Your booking has been confirmed and we've sent you a confirmation email.
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Booking Confirmation</h2>
            <div className="text-right">
              <div className="text-sm text-gray-500">Booking Reference</div>
              <div className="font-mono text-lg font-semibold text-blue-600">
                WIT-{bookingDetails.bookingId}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Tour Information */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Details</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-12 text-blue-600">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{bookingDetails.tourName}</div>
                      <div className="text-gray-600">{bookingDetails.location}</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-12 text-blue-600">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">Booking Date</div>
                      <div className="text-gray-600">{bookingDetails.date}</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-12 text-blue-600">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">
                        {bookingDetails.travelers} {bookingDetails.travelers === 1 ? 'Traveler' : 'Travelers'}
                      </div>
                      <div className="text-gray-600">Standard package</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Status</h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <div>
                      <div className="font-semibold text-green-800">Payment Completed</div>
                      <div className="text-sm text-green-700">Your payment has been processed successfully</div>
                    </div>
                  </div>
                </div>

                {sessionId && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Stripe Session ID</div>
                    <div className="font-mono text-xs text-gray-800 break-all">{sessionId}</div>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <div className="font-semibold text-blue-800">Confirmation Email Sent</div>
                    <div className="text-sm text-blue-700">Check your inbox for booking details</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">What's Next?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Check Your Email</h3>
              <p className="text-sm text-gray-600">
                Detailed itinerary and travel documents have been sent to your email
              </p>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Download Details</h3>
              <p className="text-sm text-gray-600">
                Get your booking confirmation and travel information
              </p>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Prepare for Travel</h3>
              <p className="text-sm text-gray-600">
                Review requirements and prepare for your amazing experience
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.location.href = '/'}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 cursor-pointer"
          >
            Browse More Tours
          </button>
          <button className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-8 rounded-full transition-colors duration-300 cursor-pointer">
            Download Confirmation
          </button>
          <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-full transition-colors duration-300 cursor-pointer">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}