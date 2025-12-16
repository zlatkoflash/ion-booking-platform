'use client'

import React, { useState } from 'react';
// import { User, Mail, Phone, MapPin, CreditCard, Lock } from 'lucide-react';
import PaymentForm from './PaymentForm';
import { IContactDetails } from '@/app/interface/interface';
import { BokunConfirmTheBooking, BokunReserveBooking, IBokunBooking, IBookingMetadata, InsertDemoDataInTheCrud } from '@/utils/bokun';
import { IBookPriceEngineCount } from '@/app/TourView/[[...slug]]/content/BookingSidebarProvider';
import { ISearchParamsForBooking } from '@/app/Checkout/page';
import { useBookingCheckout } from '../CheckoutProvider';
// import CheckoutStripeElements from './CheckoutStripeElements';
import CheckoutFormContactDetails from './CheckoutFormContactDetails';
import CheckoutStripeElements from './CheckoutStripeElements';
import { ZSignup, ZSignin, signupUserIfNotExist } from '@/utils/user';
import { SupabaseEdgeFetchPost } from '@/utils/supabase';

/*interface ContactDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  country?: string;
}*/

/*interface CheckoutFormProps {
  tourTitle: string;
  price: number;
  onComplete?: (details: ContactDetails) => void;
  metadata?: Record<string, any>;
}*/
interface ICheckoutFormProps {
  tourTitle: string;
  price: number;
  onComplete?: (details: IContactDetails) => void;
  metadata?: Record<string, any>;
  counts: IBookPriceEngineCount[],
  params: ISearchParamsForBooking
}

const CheckoutForm: React.FC<ICheckoutFormProps> = ({
  tourTitle,
  price,
  onComplete,
  metadata = {},
  counts = [],
  params,
}) => {

  const {
    reservation_bookingHash,
    set_reservation_bookingHash,
    totalPrice,
    searchParamsFor,
    set_reserved_booking,
    reserved_booking,
    contactDetails,

    step,
    setStep,

    ___ReserveTheBooking,
    ___ConfirmTheBooking,

    processBooking,
    set_processBooking,

  } = useBookingCheckout();


  const __InsertDemoDataInTheCrud = async () => {
    const result = await InsertDemoDataInTheCrud();
    console.log("InsertDemoDataInTheCrud result:", result);
  }

  const ____SignupDemoUser = async () => {
    const result = await ZSignup(
      "zlatkoflashc@gmail.com",
      "derkoskiA1#"
    );
    console.log("SignupDemoUser result:", result);
  }

  const ____SigninDemoUser = async () => {
    const result = await ZSignin(
      "zlatkoflashc@gmail.com",
      "derkoskiA1#"
    );
    console.log("SigninDemoUser result:", result);
  }

  const ___CreateToken = async () => {
    const result = await SupabaseEdgeFetchPost("/bokun/CreateDemoToken", {
      id: 'Example Id'
    });
    const resulttext = await result.text();
    const resultJSON = JSON.parse(resulttext);
    console.log("CreateToken result:", resultJSON);
  }

  const ___TestingForms = () => {
    return <>
      {
        // testing start
      }
      <p>Testing form and buttons</p>

      <CheckoutStripeElements />

      <button
        onClick={() => {
          ___ReserveTheBooking({
            email: "zlatkoflashc@gmail.com",
            id: "Example Id"
          });
        }}
        className="bg-indigo-600 m-1 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out cursor-pointer">
        Reserve the booking
      </button>
      <button className="bg-indigo-600 m-1 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out cursor-pointer" onClick={() => {
        ___ConfirmTheBooking();
      }}>
        Confirm the booking
      </button>
      <button className="bg-indigo-600 m-1 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out cursor-pointer" onClick={() => {
        __InsertDemoDataInTheCrud();
      }}>
        Insert Demo Data in the crud
      </button>
      <button className="bg-indigo-600 m-1 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out cursor-pointer" onClick={() => {
        ____SignupDemoUser();
      }}>
        Signup demo user
      </button>
      <button className="bg-indigo-600 m-1 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out cursor-pointer" onClick={() => {
        ____SigninDemoUser();
      }}>
        Signin demo user
      </button>
      <button className="bg-indigo-600 m-1 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out cursor-pointer" onClick={() => {
        console.log("reservation_bookingHash", reservation_bookingHash);
        console.log("reserved_booking", reserved_booking);
        console.log("contactDetails", contactDetails);
      }}>
        Show all json about the booking
      </button>
      <button className="bg-indigo-600 m-1 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out cursor-pointer" onClick={() => {

      }}>
        Save the details to the database
      </button>
      <button className="bg-indigo-600 m-1 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out cursor-pointer" onClick={() => {
        // ___GenerateUserIfNotExist();
        signupUserIfNotExist("zlatko@flashc.com", "Zlatko Flashc");
      }}>
        Create / Signup user
      </button>
      <button className="bg-indigo-600 m-1 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out cursor-pointer" onClick={() => {
        ___CreateToken();
      }}>
        Create Demo Token
      </button>

      <ul>
        {
          /*<li>Start the booking</li>
        <li>Confirm the booking</li>
        <li>Pay for the booking</li>*/
        }
        {
          processBooking.reserved && <li>Reserved</li>
        }
        {
          processBooking.reservedError && <li>Reserved Error</li>
        }
        {
          processBooking.confirmed && <li>Confirmed</li>
        }
        {
          processBooking.confirmedError && <li>Confirmed Error</li>
        }
        {
          processBooking.paid && <li>Paid</li>
        }
        {
          processBooking.paidError && <li>Paid Error</li>
        }
        {
          processBooking.savedDataToDB && <li>Saved Data To DB</li>
        }
        {
          processBooking.savedDataToDBError && <li>Saved Data To DB Error</li>
        }
      </ul>
      {
        // testing end
      }

    </>
  }




  console.log("CheckoutForm step:", step);

  if (step === 'checkout') {
    console.log("CheckoutForm step === 'payment'");
    return (
      <>
        {
          // ___TestingForms()
        }
        <div className="space-y-6">
          {/* Contact Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Contact Information</h4>
            <div className="text-sm text-gray-600">
              <p>{contactDetails.firstName} {contactDetails.lastName}</p>
              <p>{contactDetails.email}</p>
              <p>{contactDetails.phone}</p>
            </div>
            <button
              onClick={() => setStep('contact')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2 cursor-pointer"
            >
              Edit Details
            </button>
          </div>

          <PaymentForm
            tourTitle={tourTitle}
            price={price}
            metadata={{
              ...metadata,
              contactDetails
            }}
          />
        </div>
      </>
    );
  }

  console.log("CheckoutForm step === ", step);
  return <>
    {
      // ___TestingForms()
    }
    <CheckoutFormContactDetails />
  </>;

};

export default CheckoutForm;