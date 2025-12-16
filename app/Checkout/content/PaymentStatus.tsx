'use client'
import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Clock, AlertTriangle, Loader2 } from 'lucide-react';


type TypePaymentStatus = 'pending' | 'succeeded' | 'failed' | 'canceled' | 'loading';

interface PaymentStatusProps {
  sessionId?: string;
  // onStatusChange?: (status: 'pending' | 'succeeded' | 'failed' | 'canceled') => void;
  onStatusChange?: (status: TypePaymentStatus) => void;
}

// type PaymentStatus = 'pending' | 'succeeded' | 'failed' | 'canceled' | 'loading';

const PaymentStatus: React.FC<PaymentStatusProps> = ({ sessionId, onStatusChange }) => {
  const [status, setStatus] = useState<TypePaymentStatus>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionId) {
      checkPaymentStatus();
    }
  }, [sessionId]);

  const checkPaymentStatus = async () => {
    try {
      // In a real implementation, you'd call your backend to check the session status
      // For now, we'll simulate the status check
      setTimeout(() => {
        setStatus('succeeded');
        onStatusChange?.('succeeded');
      }, 2000);
    } catch (err) {
      setStatus('failed');
      setError(err instanceof Error ? err.message : 'Unknown error');
      onStatusChange?.('failed');
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
      case 'pending':
        return <Loader2 className="w-12 h-12 animate-spin text-blue-600" />;
      case 'succeeded':
        return <CheckCircle className="w-12 h-12 text-green-600" />;
      case 'failed':
        return <XCircle className="w-12 h-12 text-red-600" />;
      case 'canceled':
        return <AlertTriangle className="w-12 h-12 text-yellow-600" />;
      default:
        return <Clock className="w-12 h-12 text-gray-400" />;
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'loading':
        return {
          title: 'Processing Payment',
          description: 'Please wait while we process your payment...'
        };
      case 'pending':
        return {
          title: 'Payment Pending',
          description: 'Your payment is being processed. This may take a few moments.'
        };
      case 'succeeded':
        return {
          title: 'Payment Successful!',
          description: 'Your booking has been confirmed. Check your email for details.'
        };
      case 'failed':
        return {
          title: 'Payment Failed',
          description: error || 'There was an issue processing your payment. Please try again.'
        };
      case 'canceled':
        return {
          title: 'Payment Canceled',
          description: 'Your payment was canceled. You can try again anytime.'
        };
      default:
        return {
          title: 'Unknown Status',
          description: 'Unable to determine payment status.'
        };
    }
  };

  const statusInfo = getStatusMessage();

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
      <div className="mb-6">
        {getStatusIcon()}
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {statusInfo.title}
      </h2>

      <p className="text-gray-600 mb-6">
        {statusInfo.description}
      </p>

      {sessionId && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="text-sm text-gray-600 mb-1">Session ID</div>
          <div className="font-mono text-xs text-gray-800 break-all">{sessionId}</div>
        </div>
      )}

      {status === 'failed' && (
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition-colors"
        >
          Try Again
        </button>
      )}

      {status === 'succeeded' && (
        <div className="space-y-3">
          <button
            onClick={() => window.location.href = '/'}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition-colors mr-3"
          >
            Browse More Tours
          </button>
          <button className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-full transition-colors">
            Download Receipt
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentStatus;