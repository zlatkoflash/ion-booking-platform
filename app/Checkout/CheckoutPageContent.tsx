'use client'

import ButtonViewTour from "@/components/buttons/ButtonViewTour";
import CheckoutForm from "@/app/Checkout/content/CheckoutForm";
import PaymentStatus from "@/app/Checkout/content/PaymentStatus";
import { ArrowLeft, CheckCircle, CreditCard, ShoppingCart } from "lucide-react";
import { useBookingCheckout } from "./CheckoutProvider";

import Link from "next/link";

import placeholder from './../../assets/images/placeholder.png';
import Image from "next/image";
import CheckoutPrograssIndicator from "./content/CheckoutProgressIndicator";


export default function CheckoutPageContent() {

  const {

    experience,
    rate,
    availability,
    step,
    searchParamsFor,
    totalPrice,
    counts

  } = useBookingCheckout()


  // const sessionId = "";// this need to be defined good




  return <div className="min-h-screen bg-gray-50">

    {/* Header */}
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4">
        {
          /*<button
          onClick={() => window.history.back()}
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Tour
        </button>*/
        }
        <ButtonViewTour style="for-header" tourId={experience.id} />
      </div>
    </div>


    <div className="max-w-6xl mx-auto px-6 py-12">

      <CheckoutPrograssIndicator />

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Tour Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Booking Summary</h3>

            <div className="mb-4">
              <Image
                src={experience.keyPhoto ? experience.keyPhoto.originalUrl : placeholder}
                alt={experience.title}
                className="w-full h-32 object-cover rounded-lg"
                width={500} height={700}
              />
            </div>

            <h4 className="font-semibold text-gray-800 mb-2">{experience.title}</h4>
            <div className="text-gray-600 text-sm mb-4" dangerouslySetInnerHTML={{ __html: experience.description }} />
            {
              // <p className="text-gray-600 text-sm mb-4">{experience.description}</p>
            }


            <div className="border-t py-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-800"> Participants</span>
                <span className="text-2xl font-bold">{
                  searchParamsFor.participants
                }</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-800">Total</span>
                <span className="text-2xl font-bold text-green-600">€{
                  totalPrice.toFixed(2)
                }</span>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="lg:col-span-2">
          {/*step === 'checkout' && (

            <CheckoutForm
              tourTitle={experience.title as string}
              price={
                // tour.price as number
                totalPrice
              }
              params={searchParamsFor}
              counts={counts}
              metadata={{
                tour_id: experience.id,
                tour_title: experience.title
              }}
            />
          )*/}

          <CheckoutForm
            tourTitle={experience.title as string}
            price={
              // tour.price as number
              totalPrice
            }
            params={searchParamsFor}
            counts={counts}
            metadata={{
              tour_id: experience.id,
              tour_title: experience.title
            }}
          />

          {/*(step === 'processing' || step === 'success') && (
              <PaymentStatus
                sessionId={sessionId || undefined}
                onStatusChange={handlePaymentStatusChange}
              />
            )*/}
          {
            (() => {
              if (step === 'checkout') return <></>
              if (step === 'payment') return <></>
              if (step === 'contact') return <></>
              return <PaymentStatus
              // sessionId={sessionId || undefined}
              /*onStatusChange={() => {
                console.log("PaymentStatus::onStatusChange handlePaymentStatusChange");
              }}*/
              />
            })()
          }
        </div>
      </div>
    </div>





  </div>
}