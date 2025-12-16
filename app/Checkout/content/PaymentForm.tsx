import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CreditCard, Lock, Shield, AlertCircle } from 'lucide-react';
import StripePaymentForm from './CheckoutStripePaymentCard';
import { Elements } from '@stripe/react-stripe-js';
import { zconfig } from '@/config/config';
import CheckoutStripeElements from './CheckoutStripeElements';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK || '');

interface PaymentFormProps {
  tourTitle: string;
  price: number;
  onSuccess?: () => void;
  onError?: (error: string) => void;
  metadata?: Record<string, any>;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  tourTitle,
  price,
  onSuccess,
  onError,
  metadata = {}
}) => {

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);



  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Payment Details</h3>
        <div className="flex items-center text-green-600">
          <Shield className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">Secure Payment</span>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-gray-800 mb-2">Order Summary</h4>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">{tourTitle}</span>
          <span className="font-bold text-gray-800 text-4xl">€{price.toFixed(2)}</span>
        </div>
      </div>


      {/*<Elements stripe={stripePromise}>
        <StripePaymentForm />
      </Elements>*/}
      {
        // the form for payment
      }
      <CheckoutStripeElements />


      {/* Security Features */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center text-sm text-gray-600 justify-center">
          <Lock className="w-4 h-4 mr-2 text-green-600" />
          <span>SSL Encrypted</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 justify-center">
          <CreditCard className="w-4 h-4 mr-2 text-green-600" />
          <span>Secure Checkout</span>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
            <div>
              <div className="font-semibold text-red-800">Payment Error</div>
              <div className="text-sm text-red-700">{error}</div>
            </div>
          </div>
        </div>
      )}



      <div className="text-center text-xs text-gray-500 mt-4">
        <p>Powered by Stripe • Your payment information is secure</p>
        <p className="mt-1">Free cancellation up to 24 hours before the tour</p>
      </div>
    </div>
  );
};

export default PaymentForm;