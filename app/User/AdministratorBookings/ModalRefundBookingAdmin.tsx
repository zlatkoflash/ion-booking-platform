"use client";
import { useState } from "react";
import { BookingRowDB, useTableBookings } from "../ProviderTableBookings";
import { useCurrencyFormatter } from "@/utils/formats";
import { RefundPartialForBooking } from "@/utils/bokunAdminClient";
import { AlertInfoMessage } from "@/components/AlertMessages/InfoMessage";

type TReasonForCanceling = "SUPPLIER_CANCELLED" | "CUSTOMER_CANCELLED" | "OVERBOOKING" | "PARTIAL_SERVICE" | "OTHER";

export default function ModalRefundBookingAdmin() {


  const [reason, setReason] = useState<TReasonForCanceling>("SUPPLIER_CANCELLED");
  const [note, setNote] = useState("");
  const [refunding, setRefunding] = useState(false);
  const [amount, setAmount] = useState(0);
  const {
    selectedRow,
    setSelectedRow,
    fetchTheBookings
  } = useTableBookings();

  const [successMessage, setSuccessMessage] = useState("");

  const remainingAmount = (selectedRow?.payment_amount_cents as number) / 100 - (selectedRow?.total_refunded_cents as number) / 100;

  const ___DoRefund = async () => {
    if (amount <= 0 || amount > remainingAmount) {
      alert("Please enter a valid amount");
      return;
    }
    setRefunding(true);
    const resultAfterRefund = await RefundPartialForBooking({
      dbBookingId: selectedRow?.booking_id as string,
      amount_cents: amount * 100, // in cents should be
      reason: reason,
      note: note
    })
    console.log("resultAfterRefund:", resultAfterRefund);
    console.log("refundsData:", resultAfterRefund.refundsData);
    setRefunding(false);
    if (resultAfterRefund.ok === true) {
      let successMessageParts = "Refund successful";
      // if the client need more details about the refund he will tell me
      // const refundsArray = resultAfterRefund.refundsData
      setSuccessMessage(successMessageParts);
      // selectedRow?.total_refunded_cents += resultAfterRefund.amount_cents;
      setSelectedRow({
        ...selectedRow, total_refunded_cents: selectedRow?.total_refunded_cents + resultAfterRefund.totalSuccessRefunded
      } as BookingRowDB);
      fetchTheBookings();
    }
    else {
      setSuccessMessage("Refund failed");
    }
  }


  return <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-100">
    <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Refund booking [booking ref code]</h2>
      </div>
      <div className="p-4 space-y-3">
        <div className="text-sm text-gray-600">
          Remaining: <b>{useCurrencyFormatter(
            remainingAmount,
            {
              currency: "EUR",
              locale: "en-US",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }
          )}</b>
        </div>
        <label className="block">
          <span className="text-sm">Amount (EUR)</span>
          <input
            className="mt-1 w-full border rounded-lg px-3 py-2"
            type="number" min="0" step="0.01"
            value={amount} onChange={e => {
              console.log("setAmount(e.target.value)");
              const AmountForRefund = Number(e.target.value);
              if (AmountForRefund > remainingAmount) {
                setAmount(remainingAmount);
              }
              else {
                setAmount(AmountForRefund);
              }
            }}
          />
        </label>
        <label className="block">
          <span className="text-sm">Reason</span>
          <select className="mt-1 w-full border rounded-lg px-3 py-2" value={reason} onChange={e => {
            console.log("setReason(e.target.value):");
            setReason(e.target.value as TReasonForCanceling);
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
          <textarea className="mt-1 w-full border rounded-lg px-3 py-2"
            rows={3}
            value={note} onChange={e => {
              console.log("setNote(e.target.value)");
              setNote(e.target.value);
            }} />
        </label>
      </div>
      <div className="p-4 border-t flex justify-end gap-2">
        <button className="px-4 py-2 rounded border cursor-pointer" onClick={() => {
          console.log("setShowModal(false)");
          // setShowModal(false)
          console.log("selected row:", selectedRow);
          setSelectedRow(null)
        }} disabled={refunding}>Cancel</button>
        <button
          className="px-4 py-2 rounded bg-black text-white disabled:bg-gray-400 cursor-pointer"
          onClick={() => {
            console.log("onclick submitRefund");

            ___DoRefund();
          }}
          disabled={refunding}
        >
          {refunding ? "Processing..." : "Confirm refund"}
        </button>

      </div>
      {
        successMessage !== "" && <div className="p-4 flex justify-end items-center gap-2">
          <span className="">{successMessage}</span>
          <button className="px-4 py-2 rounded border cursor-pointer" onClick={() => {
            console.log("setShowModal(false)");
            // setShowModal(false)
            console.log("selected row:", selectedRow);
            setSelectedRow(null)
            setSuccessMessage("")
          }} disabled={refunding}>Close</button>
        </div>
      }


    </div>
  </div>
}