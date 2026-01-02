"use client";

import { useEffect } from "react";
import { useBookingEditor } from "../../BookingEditorProvider";
import { AbbreviatedMonthDate, FormatTimeFromDate } from "@/utils/dateUtils";
import { truncateId } from "@/utils/stripe";
import { useCurrencyFormatter } from "@/utils/formats";

interface IStripeRefundMetadata {
  id: string;
  amount: number;
  charge: string;
  object: 'refund';
  reason: string;
  [key: string]: any; // To allow for extra dynamic Stripe fields
}

export interface IRefund {
  id: number;
  booking_id: string;
  payment_intent_id: string;
  stripe_refund_id: string;
  amount_cents: number;
  currency: string;
  status: 'succeeded' | 'failed' | 'pending';
  reason: 'OTHER' | 'requested_by_customer' | 'duplicate' | 'fraudulent'; // Based on your "OTHER" value
  metadata: IStripeRefundMetadata | null;
  idempotency_key: string | null;
  request_key: string | null;
  created_at: string; // ISO Timestamp from Supabase
}


export default function EditorTableRefunds() {

  const { bookingRefunds } = useBookingEditor()

  const ___LoadTheRefunds = async () => {

  }

  useEffect(() => {
    ___LoadTheRefunds();
  }, []);


  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 bg-gray-50/50 px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-800">Refund History</h3>
        <p className="text-sm text-gray-500">View and track all processed reversals.</p>
      </div>

      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Refund Date</th>
            <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Original Payment ID</th>
            <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Refund ID</th>
            <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {/*<tr className="hover:bg-red-50/20 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap text-gray-700">
              Jan 02, 2026 <span className="text-xs text-gray-400 block">01:45 PM</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">pi_3N4...x89</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="font-mono text-xs text-indigo-600">re_5M1...z99</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap font-semibold text-red-600">
              -$50.00
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Succeeded
              </span>
            </td>
          </tr>

          <tr className="hover:bg-amber-50/20 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap text-gray-700">
              Jan 01, 2026 <span className="text-xs text-gray-400 block">10:20 AM</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">pi_8J2...v44</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="font-mono text-xs text-indigo-600">re_9L4...k22</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap font-semibold text-red-600">
              -$120.00
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                Pending
              </span>
            </td>
          </tr>*/}
          {
            bookingRefunds?.map((refund: IRefund, index: number) => {
              console.log("refund:", refund);
              return <tr key={"refund-" + index} className="hover:bg-amber-50/20 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {
                    // Jan 01, 2026
                    AbbreviatedMonthDate(refund.created_at)
                  } <span className="text-xs text-gray-400 block">
                    {
                      // 10:20 AM
                      FormatTimeFromDate(refund.created_at)
                    }
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{
                    // pi_8J2...v44
                    truncateId(refund.payment_intent_id)
                  }</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-mono text-xs text-indigo-600">
                    {
                      truncateId(refund.stripe_refund_id)
                    }
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-red-600">
                  -{useCurrencyFormatter(refund.amount_cents / 100, {
                    currency: refund.currency,
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${refund.status === "succeeded" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                    {
                      refund.status
                    }
                  </span>
                </td>
              </tr>;
            })
          }
        </tbody>
      </table>

      <div className="bg-gray-50 px-6 py-3 text-right">
        <span className="text-xs text-gray-500 font-medium">Total Refunded: </span>
        <span className="text-sm font-bold text-red-600">-{useCurrencyFormatter(bookingRefunds?.reduce((total, refund) => total + refund.amount_cents, 0) / 100, {
          currency: "EUR",
        })}</span>
      </div>
    </div>

  );
}