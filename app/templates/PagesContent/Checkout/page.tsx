"use client"

// import { IExperience } from "@/app/interface/interface";
import CheckoutForm from "@/app/Checkout/content/CheckoutForm";
import PaymentStatus from "@/app/Checkout/content/PaymentStatus";
import { ISearchParamsForBooking } from "@/app/Checkout/page";
import { ArrowLeft, ShoppingCart, CreditCard, CheckCircle } from 'lucide-react';

interface IExperience { }

export default function CheckoutContent() {

  const loading = false;
  const tour: Partial<any> & { isSet: boolean, image: string } = {
    isSet: false,
    image: 'https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 300
  };

  /**
   * When you do if/else, the cases must be in order if checkout, else if processing, if else success
   */
  type TypeStep = 'checkout' | 'processing' | 'success';
  let step: TypeStep = "checkout";

  const sessionId = "sessionId";


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Tour Not Found</h1>
          <button
            onClick={() => window.location.href = '/'}
            className="text-blue-600 hover:text-blue-700 cursor-pointer"
          >
            Back to Tours
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Tour
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 'checkout' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
              }`}>
              {step === 'checkout' ? <ShoppingCart className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
            </div>
            <div className={`h-1 w-16 ${step !== 'checkout' ? 'bg-green-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${(() => {

              if (step === "checkout") return 'bg-gray-300 text-gray-500';
              else if (step === 'processing') return "bg-blue-600 text-white";
              else if (step === "success") return "bg-green-600 text-white";
              return "bg-red-300 text-red-500";
            })()
              /*step === 'processing' 
              ? 
              'bg-blue-600 text-white' 
              :
              step === 'success' 
              ? 
              'bg-green-600 text-white' 
              : 
              'bg-gray-300 text-gray-500'*/


              }`}>
              <CreditCard className="w-5 h-5" />
            </div>
            <div className={`h-1 w-16 ${
              // step === 'success' ? 'bg-green-600' : 'bg-gray-300'
              (() => {
                if (step === 'checkout') return 'bg-gray-300';
                else if (step === 'processing') return 'bg-gray-300';
                return 'bg-green-600';
              })()
              }`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              // step === 'success' ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-500'
              (() => {
                if (step === 'checkout') return 'bg-gray-300 text-gray-500';
                else if (step === "processing") return 'bg-gray-300 text-gray-500';
                return "bg-green-600 text-white";
              })()
              }`}>
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Tour Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Booking Summary</h3>

              <div className="mb-4">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>

              <h4 className="font-semibold text-gray-800 mb-2">{tour.title}</h4>
              <p className="text-gray-600 text-sm mb-4">{tour.description}</p>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-800">Total</span>
                  <span className="text-2xl font-bold text-green-600">€{tour?.price?.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {step === 'checkout' && (
              <CheckoutForm
                counts={[]}
                params={{} as ISearchParamsForBooking}
                tourTitle={tour.title as string}
                price={tour.price as number}
                metadata={{
                  tour_id: tour.id,
                  tour_title: tour.title
                }}
              />
            )}

            {/*(step === 'processing' || step === 'success') && (
              <PaymentStatus
                sessionId={sessionId || undefined}
                onStatusChange={handlePaymentStatusChange}
              />
            )*/}
            {
              (() => {
                if (step === 'checkout') return <></>
                return <PaymentStatus
                  sessionId={sessionId || undefined}
                  onStatusChange={() => {
                    console.log("PaymentStatus::onStatusChange handlePaymentStatusChange");
                  }}
                />
              })()
            }
          </div>
        </div>
      </div>
    </div>
  );

}