import { AbbreviatedMonthDate, FormatTimeFromDate } from "@/utils/dateUtils";
import { useBookingEditor } from "../../BookingEditorProvider";
import { truncateId } from "@/utils/stripe";
import { useCurrencyFormatter } from "@/utils/formats";
import { useSelector } from "react-redux";
import { RootState } from "@/libs/store";

export interface IPaymentDB {
  id: number; // Integer ID from your Supabase table
  booking_id: string; // UUID of the associated booking
  stripe_payment_intent_id: string; // The pi_... ID
  payment_method_id: string | null; // The pm_... ID used for the charge
  amount_cents: number; // Total amount in cents (e.g., 8507)
  currency: string; // e.g., "eur"

  // Payment Status
  status: 'succeeded' | 'failed' | 'processing' | 'requires_payment_method' | 'canceled';

  // Refund Tracking
  refund_status: 'none' | 'partial' | 'full';
  refunded_amount_cents: number; // Tracks how much has been sent back
  last_refund_reason: string | null;

  // External Integration IDs
  bokun_invoice_id: string | null;
  bokun_payment_id: string | null;

  // Timestamps
  created_at: string; // ISO Timestamp
  updated_at: string; // ISO Timestamp
}

export default function EditorTablePayments() {

  /*const { bookingPayments } = useBookingEditor()*/
  const bookingCalendarState = useSelector((state: RootState) => state.bookingCalendar);
  const bookingPayments = bookingCalendarState.editor.bookingPayments;

  return (<div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm mb-5">
    <div className="border-b border-gray-200 bg-gray-50/50 px-6 py-4 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">Payment Transactions</h3>
        <p className="text-sm text-gray-500">Overview of all incoming revenue for this booking.</p>
      </div>
      <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
        Live Mode
      </span>
    </div>

    <table className="min-w-full divide-y divide-gray-200 text-sm">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Date</th>
          <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Payment Intent</th>
          <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Method</th>
          <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Amount</th>
          <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {
          /*<tr className="hover:bg-gray-50 transition-colors">
          <td className="px-6 py-4 whitespace-nowrap text-gray-700">
            Jan 02, 2026 <span className="text-xs text-gray-400 block">01:30 AM</span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-indigo-600 font-medium">pi_3N4...x89</span>
              <button className="text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-lg">💳</span>
              <span>•••• 4242</span>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">
            $150.00
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Succeeded
            </span>
          </td>
        </tr>

        <tr className="hover:bg-gray-50 transition-colors">
          <td className="px-6 py-4 whitespace-nowrap text-gray-700">
            Jan 01, 2026 <span className="text-xs text-gray-400 block">11:15 PM</span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="font-mono text-xs text-gray-400">pi_9K2...a12</span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-gray-600">
            <span className="text-lg">💳</span>
            <span>•••• 5555</span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-400 line-through">
            $150.00
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Declined
            </span>
          </td>
        </tr>*/
        }
        {
          bookingPayments?.map((payment: IPaymentDB, index: number) => {
            console.log("payment:", payment);
            return <tr key={"payment-" + index} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                {
                  // Jan 02, 2026
                  AbbreviatedMonthDate(payment.created_at)
                } <span className="text-xs text-gray-400 block">
                  {
                    // 01:45 PM
                    FormatTimeFromDate(payment.created_at)
                  }
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="font-mono text-xs text-gray-400">{
                  // pi_8J2...v44
                  truncateId(payment.stripe_payment_intent_id)
                }</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                <span className="text-lg">💳</span>
                {
                  // <span>•••• 4242</span>
                }
              </td>
              <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">
                {useCurrencyFormatter(payment.amount_cents / 100, {
                  currency: payment.currency,
                })}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Succeeded
                </span>
              </td>
            </tr>;
          })
        }
      </tbody>
    </table>

    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-8">
      <div className="text-right">
        <p className="text-xs text-gray-500 uppercase font-semibold">Net Received</p>
        <p className="text-xl font-bold text-green-600">{useCurrencyFormatter(bookingPayments?.reduce((total, payment) => total + payment.amount_cents, 0) / 100, {
          currency: "EUR",
        })}</p>
      </div>
    </div>
  </div>);
}