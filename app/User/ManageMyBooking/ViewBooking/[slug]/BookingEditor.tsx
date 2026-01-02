

import React, { useState } from 'react';
import BEStatusAndPayment from './content/BEStatusAndPayment';
import AdminBookingCancellingBlock from './content/AdminBookingCancellingBlock';
import { useBookingSingleItem } from './BookingProvider';
import BookingEditorUpdater from './content/BookingEditorUpdater';
import BookingUpdateModalSuccess from './BookingUpdateModalSuccess';
import { useBookingEditor } from '@/app/TourView/[[...slug]]/BookingEditorProvider';

// --- MOCK Context Hook and Types (To be used when the component is outside the Provider) ---
// This section simulates the types and the hook you would get from your context file.

/*type BookingItem = any; // Keeping this 'any' as requested
interface PassengerCount { adults: number; children: number; }

interface BookingState {
  bookingItem: BookingItem;
  paymentItem: BookingItem;
  refunds: BookingItem[];
}

interface MockContextValue {
  state: BookingState;
  dispatch: React.Dispatch<any>; // Simulating the dispatch function
}

// Define Action Types used in the component
enum BookingActionType {
  SET_BOOKING_ITEM = 'SET_BOOKING_ITEM',
  SET_PAYMENT_ITEM = 'SET_PAYMENT_ITEM',
  ADD_REFUND = 'ADD_REFUND',
  RESET_STATE = 'RESET_STATE',
}

// --- DEMO BOKUN DATA ---

const DEMO_BOKUN_BOOKING: BookingItem = {
  id: 'BKN-A1B2C3D4',
  status: 'CONFIRMED',
  productTitle: 'Northern Lights Tour: Deluxe Package',
  activityDate: '2025-12-20',
  productID: 12345,
  startTime: '20:00',
  totalPrice: 289.00,
  currency: 'USD',
  passengers: {
    adults: 2,
    children: 1, // Age 5-12
  },
  pricing: {
    adultPrice: 100.00,
    childPrice: 80.00,
    fees: 9.00,
  }
};

const DEMO_PAYMENT_ITEM: BookingItem = {
  amount: DEMO_BOKUN_BOOKING.totalPrice,
  method: 'Stripe',
  transactionId: 'TXN-998877',
};

const DEMO_INITIAL_STATE: BookingState = {
  bookingItem: DEMO_BOKUN_BOOKING,
  paymentItem: DEMO_PAYMENT_ITEM,
  refunds: [],
};*/

// --- MOCK useBookingSingleItem Hook ---
// This hook provides the initial demo data and a placeholder dispatch function.
/*const useBookingSingleItem = (): MockContextValue => {
  // In a real scenario, you'd use the actual useReducer hook here.
  const [state, setState] = useState<BookingState>(DEMO_INITIAL_STATE);

  const dispatch = (action: any) => {
    // This simulates the state change logic for demonstration purposes
    console.log(`[MOCK DISPATCH] Type: ${action.type}, Payload:`, action.payload);

    if (action.type === BookingActionType.SET_BOOKING_ITEM) {
      setState(prev => ({ ...prev, bookingItem: action.payload }));
    } else if (action.type === BookingActionType.ADD_REFUND) {
      setState(prev => ({ ...prev, refunds: [...prev.refunds, action.payload] }));
    } else if (action.type === BookingActionType.RESET_STATE) {
      setState(DEMO_INITIAL_STATE);
    }
  };

  return { state, dispatch };
};*/


// ----------------------------------------------------------------------------------
// --- MAIN COMPONENT ---
// ----------------------------------------------------------------------------------

const BokunBookingEditor: React.FC = () => {

  const {
    bokunBooking,
    bookingDB,
    // isModalSuccessOpen
  } = useBookingSingleItem();

  const {
    isModalSuccessOpen
  } = useBookingEditor();


  console.log("BokunBookingEditor:: bokunBooking:", bokunBooking);

  // const { state, dispatch } = useBookingSingleItem();

  // Initialize local counts from the loaded state
  /*const [counts, setCounts] = useState<PassengerCount>(state.bookingItem.passengers || { adults: 0, children: 0 });
  const [refundAmount, setRefundAmount] = useState<string>('');

  // Destructure for readability
  const booking = state.bookingItem;
  const currentStatus = booking.status;
  const totalPaid = state.paymentItem?.amount || booking.totalPrice || 0;

  const totalRefunded = state.refunds.reduce((sum: number, r: any) => sum + r.amount, 0);
  const remainingBalance = totalPaid - totalRefunded;

  // --- Handlers ---

  const handleCountChange = (type: keyof PassengerCount, delta: 1 | -1) => {
    const newValue = counts[type] + delta;
    setCounts(prev => ({ ...prev, [type]: Math.max(0, newValue) }));
  };

  const handleUpdateBooking = () => {
    // 1. (Real App): Call Bokun API to change booking details
    console.log('--- Submitting Booking Update to Bokun ---');

    // 2. Update the Context State
    const newBookingItem = { ...booking, passengers: counts };
    dispatch({ type: BookingActionType.SET_BOOKING_ITEM, payload: newBookingItem });
    alert('Booking counts updated (Simulated)');
  };

  const handleCancelBooking = () => {
    if (window.confirm('Are you sure you want to CANCEL this booking? This is a final action.')) {
      // 1. (Real App): Call Bokun API to cancel booking
      console.log(`--- Canceling Booking ${booking.id} ---`);

      // 2. Update the Context State
      const canceledBooking = { ...booking, status: 'CANCELED' };
      dispatch({
        type: BookingActionType.SET_BOOKING_ITEM,
        payload: canceledBooking
      });
      alert('Booking Canceled (Simulated)');
    }
  };

  const handleRefund = () => {
    const amount = parseFloat(refundAmount);
    if (isNaN(amount) || amount <= 0 || amount > remainingBalance) {
      return alert(`Please enter a valid refund amount up to $${remainingBalance.toFixed(2)}.`);
    }

    // 1. (Real App): Call Payment Gateway API to process refund
    console.log(`--- Processing Refund of $${amount.toFixed(2)} ---`);

    // 2. Update the Context State
    const newRefund: BookingItem = {
      id: Date.now(),
      amount: amount,
      date: new Date().toISOString(),
      reason: 'Manual adjustment (Bokun Edit)',
      refundStatus: 'Processed'
    };

    dispatch({ type: BookingActionType.ADD_REFUND, payload: newRefund });
    setRefundAmount('');
    alert(`Refund of $${amount.toFixed(2)} processed (Simulated)`);
  };*/


  return (
    <>
      <div className="p-8 display-none max-w-5xl mx-auto bg-white shadow-2xl rounded-xl border border-gray-100 font-sans none" style={{
        // display: "none"
      }}>
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-2">
          WIT-3.0 Booking Editor
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          {
            // {booking.productTitle} | {booking.activityDate} @ {booking.startTime}
          }
          {bokunBooking.activityBookings[0].title} | {bokunBooking.activityBookings[0].dateString}
          <br />
          <small>Status: <strong>{bookingDB.status}</strong></small>
        </p>

        {
          // <BEStatusAndPayment />
        }
        {
          /*< div className="flex justify-between items-center mb-8 p-4 bg-gray-50 rounded-lg border-l-4 border-indigo-500" >
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Booking ID</p>
            <p className="text-xl font-bold text-gray-800">{booking.id}</p>
          </div>
          <div className="space-y-1 text-center">
            <p className="text-sm font-medium text-gray-500">Status</p>
            <span className={`px-3 py-1 text-base font-semibold rounded-full 
              ${currentStatus === 'CANCELED' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}
            >
              {currentStatus}
            </span>
          </div>
          <div className="space-y-1 text-right">
            <p className="text-sm font-medium text-gray-500">Total Paid</p>
            <p className="text-xl font-bold text-indigo-700">${totalPaid.toFixed(2)} {booking.currency}</p>
          </div>
        </div >*/
        }


        {/* --- 1. Edit Counts Section --- */}
        <BookingEditorUpdater />


        {/* --- 2. Refund Section --- */}
        {
          /*<div className="mb-8 p-6 border rounded-lg shadow-md bg-yellow-50 border-yellow-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Process Refund & History</h2>
  
          {
            // Balance Summary
          }
        <div className="flex justify-between items-center text-xl font-bold mb-4">
          <span className="text-gray-800">Remaining Refundable Balance:</span>
          <span className={`${remainingBalance > 0 ? 'text-green-700' : 'text-gray-500'}`}>
            ${remainingBalance.toFixed(2)} {booking.currency}
          </span>
        </div>
  
        {
          // Refund Input
        }
        <div className="flex space-x-4 mt-4">
          <input
            type="number"
            placeholder={`Max: ${remainingBalance.toFixed(2)}`}
            value={refundAmount}
            onChange={(e) => setRefundAmount(e.target.value)}
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
            disabled={remainingBalance <= 0 || currentStatus === 'CANCELED'}
          />
          <button
            onClick={handleRefund}
            disabled={remainingBalance <= 0 || currentStatus === 'CANCELED'}
            className={`px-6 py-3 font-bold rounded-lg shadow transition duration-150 
                ${remainingBalance <= 0 || currentStatus === 'CANCELED' ? 'bg-gray-400' : 'bg-yellow-500 text-white hover:bg-yellow-600'}`}
          >
            Refund
          </button>
        </div>
  
        {
          // Refund History 
        }
        <h3 className="text-lg font-medium mt-6 mb-2 text-gray-700 border-t pt-4">Refund History ({state.refunds.length})</h3>
        {state.refunds.length === 0 ? (
          <p className="text-gray-500 text-sm italic">No refunds processed yet.</p>
        ) : (
          <ul className="space-y-2">
            {state.refunds.map((refund: any) => (
              <li key={refund.id} className="flex justify-between p-2 bg-yellow-100 rounded-md">
                <span className="text-sm text-gray-800">{new Date(refund.date).toLocaleDateString()}</span>
                <span className="font-semibold text-red-600">-${refund.amount.toFixed(2)} {booking.currency}</span>
              </li>
            ))}
          </ul>
        )}
      </div> */
        }

        {/* --- 3. Cancel Booking Section --- */}
        <AdminBookingCancellingBlock />

      </div >
    </>
  );
};

export default BokunBookingEditor;