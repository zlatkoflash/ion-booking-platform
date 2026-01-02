import { useBookingSingleItem } from "../BookingProvider";

export default function BEStatusAndPayment() {

  const { bokunBooking } = useBookingSingleItem();



  return null;
  /*return (
< div className="flex justify-between items-center mb-8 p-4 bg-gray-50 rounded-lg border-l-4 border-indigo-500" >
  <div className="space-y-1">
    <p className="text-sm font-medium text-gray-500">Booking ID</p>
    <p className="text-xl font-bold text-gray-800">{bokunBooking.}</p>
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
</div >
    );*/
}