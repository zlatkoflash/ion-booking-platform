import { GetBookingsFromDB } from "@/utils/bokunAdminClient";
import { useEffect, useState } from "react";
import { useTableBookings } from "../ProviderTableBookings";
import ModalRefundBookingAdmin from "./ModalRefundBookingAdmin";
import { AlertInfoMessage } from "@/components/AlertMessages/InfoMessage";

export default function TableWithBookingsAdmin() {


  const {
    rows,
    searchText,
    setSearchText,
    totalCount,
    pageIndex,
    maxPages,
    NavigateNext,
    NavigatePrev,
    selectedRow,
    setSelectedRow
  } = useTableBookings();

  useEffect(() => {
    console.log("Effect: selectedRow:", selectedRow);
  }, [selectedRow]);


  // const token = 'example token';
  // const q = "Question text";
  const loading = false;


  const currencyFmt = (cents: number, currency = "EUR") => {
    return (new Intl.NumberFormat('en-US', { style: "currency", currency })).format((cents || 0) / 100);
  }

  const canRefund = (row: any) => row.total_refunded_cents < row.payment_amount_cents && !!row.payment_intent_id;

  const openRefund = (row: any) => {
    /*setModalRow(row);
    setAmount(String(row.remaining_cents / 100)); // default = remaining
    setReason("SUPPLIER_CANCELLED");
    setNote("");
    setShowModal(true);*/
    // setModalRow(row);
    // setShowModal(true);
    setSelectedRow(row)
    console.log("openRefund(row: IAdminItem):", row);
  }

  // const [modalRow, setModalRow] = useState<any>(null);
  // const [showModal, setShowModal] = useState(false);


  /*const page = 1;
  const pages = 10;
  const total = 300;

  // const showModal = false;
  // const modalRow = rows[0];
  const amount = .4;

  const reason = "SUPPLIER_CANCELLED";

  const note = "This wil be a note";

  const refunding = false;*/

  /*if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Admin Access Required</h1>
          <p className="text-gray-600 mb-4">Please enter your admin token to continue.</p>
          <button
            onClick={() => {
              console.log("ensure event see in Admin.tsx");
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-colors cursor-pointer"
          >
            Enter Token
          </button>
        </div>
      </div>
    );  
  }*/


  return (

    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Admin • Bookings & Refunds</h1>
          <div className="flex gap-2">
            <input
              value={searchText}
              onChange={e => {
                console.log("setQ(e.target.value)");
                setSearchText(e.target.value)
              }}
              placeholder="Search booking id..."
              className="border rounded-lg px-3 py-2"
            />
            <button
              onClick={() => {

                console.log("setPage(1); load();");

              }}
              className="px-4 py-2 rounded-lg bg-black text-white cursor-pointer"
              disabled={loading}
            >
              Search
            </button>
          </div>
        </header>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-3">Booking</th>
                <th className="text-left px-4 py-3">Customer</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-right px-4 py-3">Paid</th>
                <th className="text-right px-4 py-3">Refunded</th>
                <th className="text-right px-4 py-3">Net</th>
                <th className="text-right px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.booking_id} className="border-t">
                  <td className="px-4 py-3">
                    <div className="font-medium">{
                      // row.booking_id.slice(0, 8)
                    }
                      {
                        // …
                        row.bokun_confirmation_code
                      }
                    </div>
                    <div className="text-xs text-gray-500">{
                      // row.booking_created_at?.replace('T', ' ').slice(0, 16)
                      (new Date(row.booking_created_at)).toLocaleString()
                    }</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{row.user_name || "—"}</div>
                    <div className="text-xs text-gray-500">{row.user_email || "—"}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-xs">
                      {
                        /*
                         <span className="inline-block rounded bg-gray-200 px-2 py-0.5 mr-1">{row.financial_status}</span>
                        {row.supplier_status && <span className="inline-block rounded bg-gray-200 px-2 py-0.5">{row.supplier_status}</span>}
                        */
                      }
                      <span className={`inline-block rounded ${row.booking_status.toLocaleLowerCase() === "confirmed" ? "bg-green-200" : "bg-gray-200"} px-2 py-0.5 mr-1`}>{row.booking_status}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">{
                    currencyFmt(row.payment_amount_cents as number, row.booking_currency)
                  }</td>
                  <td className="px-4 py-3 text-right">{
                    currencyFmt(row.total_refunded_cents as number, row.booking_currency)
                  }</td>
                  <td className="px-4 py-3 text-right">{
                    currencyFmt((row.payment_amount_cents as number) - (row.total_refunded_cents as number), row.booking_currency)
                  }</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      className={`cursor-pointer hover:opacity-70 px-3 py-1.5 rounded-lg ${canRefund(row) ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                      disabled={!canRefund(row)}
                      type="button"
                      onClick={() => {
                        openRefund(row)
                      }}
                    >
                      Refund
                    </button>
                  </td>
                </tr>
              ))}
              {!rows.length && !loading && (
                <tr><td className="px-4 py-6 text-center text-gray-500" colSpan={7}>No data</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">
            Page {pageIndex} / {maxPages} • Total {totalCount}
          </div>
          <div className="flex gap-2">
            <button className={`px-3 py-1.5 rounded border cursor-pointer ${pageIndex <= 1 ? 'opacity-50 cursor-not-allowed cursor-default' : ''}`} disabled={pageIndex <= 1} onClick={() => {
              NavigatePrev()
            }}>Prev</button>
            <button className={`px-3 py-1.5 rounded border cursor-pointer ${pageIndex >= maxPages ? 'opacity-50 cursor-not-allowed cursor-default' : ''}`} disabled={pageIndex >= maxPages} onClick={() => {
              NavigateNext()
            }}>Next</button>
          </div>
        </div>
      </div>

      {/* Refund Modal */}
      {selectedRow !== null && (
        <ModalRefundBookingAdmin />
      )}


    </div>

  );
}