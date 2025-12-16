"use client"

import { IAdminItem } from "@/app/interface/interface";

export default function AdminContent() {

  const token = 'example token';
  const q = "Question text";
  const loading = false;

  const items: IAdminItem[] = [
    {
      booking_id: "booking id 1",
      customer_name: "Name Last Name 1",
      customer_email: "email@gmail.com1",
      supplier_status: "supplier-status-1",
      financial_status: "financial-status-1",
      currency: 'USD',
      paid_total_cents: 4000,
      refunded_total_cents: 200,
      net_cents: 3800,
      last_money_event_at: "last_money_event_at",
      latest_payment_id: 1233332,
      latest_payment_intent_id: "latest_payment_intent_id",
      remaining_cents: 5000
    },
    {
      booking_id: "booking id 2",
      customer_name: "Name Last Name 1",
      customer_email: "email@gmail.com1",
      supplier_status: "supplier-status-1",
      financial_status: "financial-status-1",
      currency: 'USD',
      paid_total_cents: 4000,
      refunded_total_cents: 200,
      net_cents: 3800,
      last_money_event_at: "last_money_event_at",
      latest_payment_id: 1233332,
      latest_payment_intent_id: "latest_payment_intent_id",
      remaining_cents: 5000
    },
    {
      booking_id: "booking id 3",
      customer_name: "Name Last Name 1",
      customer_email: "email@gmail.com1",
      supplier_status: "supplier-status-1",
      financial_status: "financial-status-1",
      currency: 'USD',
      paid_total_cents: 4000,
      refunded_total_cents: 200,
      net_cents: 3800,
      last_money_event_at: "last_money_event_at",
      latest_payment_id: 1233332,
      latest_payment_intent_id: "latest_payment_intent_id",
      remaining_cents: 5000
    }
  ];

  const currencyFmt = (cents: number, currency = "EUR") => {
    return (new Intl.NumberFormat('en-US', { style: "currency", currency })).format((cents || 0) / 100);
  }

  const canRefund = (row: IAdminItem) => row.remaining_cents > 0 && !!row.latest_payment_id;

  function openRefund(row: IAdminItem) {
    /*setModalRow(row);
    setAmount(String(row.remaining_cents / 100)); // default = remaining
    setReason("SUPPLIER_CANCELLED");
    setNote("");
    setShowModal(true);*/
    console.log("openRefund(row: IAdminItem)");
  }

  const page = 1;
  const pages = 10;
  const total = 300;

  const showModal = true;
  const modalRow = items[0];
  const amount = .4;

  const reason = "SUPPLIER_CANCELLED";

  const note = "This wil be a note";

  const refunding = false;

  if (!token) {
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
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Admin • Bookings & Refunds</h1>
          <div className="flex gap-2">
            <input
              value={q}
              onChange={e => {
                console.log("setQ(e.target.value)");
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
              {items.map(row => (
                <tr key={row.booking_id} className="border-t">
                  <td className="px-4 py-3">
                    <div className="font-medium">{row.booking_id.slice(0, 8)}…</div>
                    <div className="text-xs text-gray-500">{row.last_money_event_at?.replace('T', ' ').slice(0, 16)}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{row.customer_name || "—"}</div>
                    <div className="text-xs text-gray-500">{row.customer_email || "—"}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-xs">
                      <span className="inline-block rounded bg-gray-200 px-2 py-0.5 mr-1">{row.financial_status}</span>
                      {row.supplier_status && <span className="inline-block rounded bg-gray-200 px-2 py-0.5">{row.supplier_status}</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">{
                    currencyFmt(row.paid_total_cents, row.currency)
                  }</td>
                  <td className="px-4 py-3 text-right">{
                    currencyFmt(row.refunded_total_cents, row.currency)
                  }</td>
                  <td className="px-4 py-3 text-right">{
                    currencyFmt(row.net_cents, row.currency)
                  }</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      className={`cursor-pointer hover:opacity-70 px-3 py-1.5 rounded-lg ${canRefund(row) ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                      disabled={!canRefund(row)}
                      onClick={() => openRefund(row)}
                    >
                      Refund
                    </button>
                  </td>
                </tr>
              ))}
              {!items.length && !loading && (
                <tr><td className="px-4 py-6 text-center text-gray-500" colSpan={7}>No data</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">
            Page {page} / {pages} • Total {total}
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded border cursor-pointer" disabled={page <= 1} onClick={() => {
              console.log("setPage(p => Math.max(1, p - 1))");
            }}>Prev</button>
            <button className="px-3 py-1.5 rounded border cursor-pointer" disabled={page >= pages} onClick={() => {
              console.log("setPage(p => p + 1)");
            }}>Next</button>
          </div>
        </div>
      </div>

      {/* Refund Modal */}
      {showModal && modalRow && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Refund booking {modalRow.booking_id.slice(0, 8)}…</h2>
            </div>
            <div className="p-4 space-y-3">
              <div className="text-sm text-gray-600">
                Remaining: <b>{currencyFmt(modalRow.remaining_cents, modalRow.currency)}</b>
              </div>
              <label className="block">
                <span className="text-sm">Amount ({modalRow.currency})</span>
                <input
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                  type="number" min="0" step="0.01"
                  value={amount} onChange={e => {
                    console.log("setAmount(e.target.value)");
                  }}
                />
              </label>
              <label className="block">
                <span className="text-sm">Reason</span>
                <select className="mt-1 w-full border rounded-lg px-3 py-2" value={reason} onChange={e => {
                  console.log("setReason(e.target.value):");
                }}>
                  <option value="SUPPLIER_CANCELLED">SUPPLIER_CANCELLED</option>
                  <option value="CUSTOMER_CANCELLED">CUSTOMER_CANCELLED</option>
                  <option value="OVERBOOKING">OVERBOOKING</option>
                  <option value="PARTIAL_SERVICE">PARTIAL_SERVICE</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm">Note (optional)</span>
                <textarea className="mt-1 w-full border rounded-lg px-3 py-2" rows={3}
                  value={note} onChange={e => {
                    console.log("setNote(e.target.value)");
                  }} />
              </label>
            </div>
            <div className="p-4 border-t flex justify-end gap-2">
              <button className="px-4 py-2 rounded border cursor-pointer" onClick={() => {
                console.log("setShowModal(false)");
              }} disabled={refunding}>Cancel</button>
              <button
                className="px-4 py-2 rounded bg-black text-white disabled:bg-gray-400 cursor-pointer"
                onClick={() => {
                  console.log("onclick submitRefund");
                }}
                disabled={refunding}
              >
                {refunding ? "Processing..." : "Confirm refund"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}