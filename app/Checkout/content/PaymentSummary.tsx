import React from 'react';
import { Euro, Calendar, Users, MapPin, Clock } from 'lucide-react';

interface PaymentSummaryProps {
  tourTitle: string;
  price: number;
  date?: string;
  time?: string;
  participants?: number;
  location?: string;
  image?: string;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  tourTitle,
  price,
  date,
  time,
  participants = 1,
  location,
  image
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Booking Summary</h3>
      
      {image && (
        <div className="mb-4">
          <img 
            src={image}
            alt={tourTitle}
            className="w-full h-32 object-cover rounded-lg"
          />
        </div>
      )}
      
      <h4 className="font-semibold text-gray-800 mb-4">{tourTitle}</h4>
      
      <div className="space-y-3 mb-6">
        {location && (
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-3" />
            <span className="text-sm">{location}</span>
          </div>
        )}
        
        {date && (
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-3" />
            <span className="text-sm">{date}</span>
          </div>
        )}
        
        {time && (
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-3" />
            <span className="text-sm">{time}</span>
          </div>
        )}
        
        <div className="flex items-center text-gray-600">
          <Users className="w-4 h-4 mr-3" />
          <span className="text-sm">{participants} {participants === 1 ? 'participant' : 'participants'}</span>
        </div>
      </div>
      
      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-800">€{price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Service fee</span>
          <span className="text-gray-800">€0.00</span>
        </div>
        <div className="flex justify-between items-center text-lg font-bold text-gray-800 pt-2 border-t">
          <span>Total</span>
          <div className="flex items-center">
            <Euro className="w-5 h-5 mr-1 text-green-600" />
            <span>€{price.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center text-green-800">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
          <span className="text-sm font-medium">Free cancellation up to 24 hours</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;