"use client";

import IconText from "@/components/buttons/IconText"
import Title from "@/components/typography/Title"
import { DateToFormatMar52026, DateToTimeAMPM } from "@/utils/dates-times"
import { IDBBookingDetails, IDBPaymentDetails, IDBRefundDetails } from "@/utils/interface-database"
import { formatPaymentLabel } from "@/utils/strings"
import { useTranslations } from "next-intl";
import { useState } from "react";
import { OverlayTrigger, Table, Toast, ToastContainer, Tooltip } from "react-bootstrap"

export default function BookingPaymentDetails(
  { booking, payments, refunds }: {
    booking: IDBBookingDetails,
    payments: IDBPaymentDetails[],
    refunds: IDBRefundDetails[]
  }
) {
  return <>
    <section className="payment-details-booking">
      <TablePaymentDetails booking={booking} payments={payments} />
      <hr />
      <TableRefundDetails booking={booking} refunds={refunds} />
    </section>
  </>
}


export function TablePaymentDetails(
  {
    booking,
    payments
  }: {
    booking: IDBBookingDetails,
    payments: IDBPaymentDetails[],
  }
) {

  // const demoItems = [1, 2, 3, 4, 5]

  const [showTooltip, setShowTooltip] = useState<{
    index: number,
    show: boolean
  }>({
    index: -1,
    show: false
  });

  const tForms = useTranslations("Forms");

  return <>
    <div className="table-payment-details">


      <div className="heading">
        <div className="heading-title">
          <Title headingType="h3" headingStyle="Display-xs-Medium" color="--color-text-fg">{tForms("payment_transactions")}</Title>
          <Title headingType="p" headingStyle="Text-md-Regular" color="--color-text-fg-subtle">{tForms("payment_transactions_overview")}</Title>
        </div>
        <IconText text={tForms("live_mode")} type="badge-style-item-booking-boxed" variation="primary" addPoint={true} />
      </div>


      <div className="table-payment-results">
        <Table responsive >
          <thead>
            <tr>
              <th>{tForms("date")}</th>
              <th>{tForms("payment_id")}</th>
              <th>{tForms("payment_type")}</th>
              <th>{tForms("amount")}</th>
              <th>{tForms("status")}</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((item, index) => {
              return (
                <tr key={`${item.id}-${index}`}>
                  <td>
                    <Title headingType="p" headingStyle="Text-md-Medium" color="--color-text-fg" className="text-nowrap">
                      {DateToFormatMar52026(item.created_at, tForms("locale_code"))}
                    </Title>
                    <Title headingType="p" headingStyle="Text-sm-Regular" color="--color-text-fg-subtle">
                      {
                        DateToTimeAMPM(item.created_at, tForms("locale_code"))
                      }
                    </Title>
                  </td>
                  <td onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(item.stripe_payment_intent_id);
                      setShowTooltip({
                        index: index,
                        show: true
                      });
                      setTimeout(() => setShowTooltip({ index: -1, show: false }), 2000);
                    } catch (err) {
                      console.error("Failed to copy", err);
                    }
                  }} style={{ cursor: "pointer" }}>
                    <Title
                      headingType="p"
                      headingStyle="Text-md-Medium"
                      color="--color-text-fg"
                      className="text-nowrap"
                      onClick={async () => {

                      }}
                    >
                      {formatPaymentLabel(item.created_at, item.stripe_payment_intent_id)}
                      {
                        // JSON.stringify(item)
                      }
                    </Title>

                    {/* This label sits directly below the Title and shows only when clicked */}
                    {(
                      showTooltip.index === index && showTooltip.show
                    ) && (
                        <Title headingType="p" headingStyle="Text-sm-Bold" color="--color-text-fg-subtle">
                          {tForms("copied")}!
                        </Title>
                      )}
                  </td>
                  <td>
                    <Title
                      headingType="p"
                      headingStyle="Text-md-Medium"
                      color="--color-text-fg"
                    >
                      {/* Capitalize the type (e.g., "Card") and join the rest */}
                      {
                        // `[>>> ${item.payment_type}]`
                      }
                      {item.payment_type?.charAt(0).toLocaleUpperCase() + item.payment_type?.slice(1)}

                      {item.payment_type === "card" && (
                        <span className="text-nowrap">
                          • {item.payment_card_type?.toLocaleUpperCase()} • {item.payment_card_last_x4_digits}
                        </span>
                      )}
                    </Title>
                  </td>
                  <td>
                    <Title headingType="p" headingStyle="Text-md-Medium" color="--color-text-fg">
                      €{(item.amount_cents / 100).toFixed(2)}
                    </Title>
                  </td>
                  <td>
                    {
                      item.status === "succeeded" && <IconText text={tForms('succeeded')} type="badge-style-item-booking" variation="success" addPoint={true} />
                    }
                    {
                      item.status !== "succeeded" && <IconText text={item.status} type="badge-style-item-booking" variation="danger" addPoint={true} />
                    }
                  </td>
                </tr>
              )
            })}
            <tr className="final-sum">
              <td colSpan={5}>
                <Title headingType="p" headingStyle="Text-sm-Regular" color="--color-text-fg-subtle">
                  {tForms('net_received')}
                </Title>
                <Title headingType="h3" headingStyle="Text-lg-Semibold" color="--color-text-fg-success">
                  €{(booking.amount100_paid / 100).toFixed(2)}
                </Title>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>

    </div>
  </>
}
export function TableRefundDetails(
  {
    booking,
    refunds
  }: {
    booking: IDBBookingDetails
    refunds: IDBRefundDetails[]
  }
) {

  const tForms = useTranslations("Forms");

  // const demoItems = [1, 2, 3, 4, 5]
  const [showTooltip, setShowTooltip] = useState<{
    index: number,
    cell: 'payment_intent_id' | 'stripe_refund_id',
    show: boolean
  }>({ index: -1, cell: "payment_intent_id", show: false });

  return <>

    <div className="table-payment-details">


      <div className="heading">
        <div className="heading-title">
          <Title headingType="h3" headingStyle="Display-xs-Medium" color="--color-text-fg">{tForms('refund_history')}</Title>
          <Title headingType="p" headingStyle="Text-md-Regular" color="--color-text-fg-subtle">{tForms('view_and_track_all_processed_reversals')}</Title>
        </div>
        {
          // <IconText text="Live mode" type="badge-style-item-booking" variation="primary" addPoint={true} />
        }
      </div>


      <div className="table-payment-results">
        <Table responsive >
          <thead>
            <tr>
              <th>{tForms('refund_date')}</th>
              <th>{tForms('original_payment_id')}</th>
              <th>{tForms('refund_id')}</th>
              <th>{tForms('amount')}</th>
              <th>{tForms('status')}</th>
            </tr>
          </thead>
          <tbody>
            {refunds.map((item, index) => {
              return (
                <tr key={`refund-${item.id}-${item.booking_id}`}>
                  <td>
                    <Title headingType="p" headingStyle="Text-md-Medium" color="--color-text-fg" className="text-nowrap">
                      {DateToFormatMar52026(item.created_at as string, tForms("locale_code"))}
                    </Title>
                    <Title headingType="p" headingStyle="Text-sm-Regular" color="--color-text-fg-subtle">
                      {
                        DateToTimeAMPM(item.created_at as string, tForms("locale_code"))
                      }
                    </Title>
                  </td>
                  <td onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(item.payment_intent_id);
                      setShowTooltip({ index: index, cell: "payment_intent_id", show: true });
                      setTimeout(() => setShowTooltip({ index: -1, cell: "payment_intent_id", show: false }), 2000);
                    } catch (err) {
                      console.error("Failed to copy", err);
                    }
                  }} style={{ cursor: "pointer" }}>
                    <Title
                      headingType="p"
                      headingStyle="Text-md-Medium"
                      color="--color-text-fg"
                      className="text-nowrap"
                      onClick={async () => {

                      }}
                    >
                      {formatPaymentLabel(item.created_at, item.payment_intent_id)}
                    </Title>

                    {/* This label sits directly below the Title and shows only when clicked */}
                    {(
                      showTooltip.index === index && showTooltip.cell === "payment_intent_id" && showTooltip.show
                    ) && (
                        <Title headingType="p" headingStyle="Text-sm-Bold" color="--color-text-fg-subtle">
                          {tForms("copied")}!
                        </Title>
                      )}
                  </td>
                  <td onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(item.stripe_refund_id || "");
                      setShowTooltip({ index: index, cell: "stripe_refund_id", show: true });
                      setTimeout(() => setShowTooltip({ index: -1, cell: "stripe_refund_id", show: false }), 2000);
                    } catch (err) {
                      console.error("Failed to copy", err);
                    }
                  }} style={{ cursor: "pointer" }}>
                    <Title
                      headingType="p"
                      headingStyle="Text-md-Medium"
                      color="--color-text-fg"
                      className="text-nowrap"
                      onClick={async () => {

                      }}
                    >
                      {formatPaymentLabel(item.created_at, item.stripe_refund_id || "")}
                    </Title>

                    {/* This label sits directly below the Title and shows only when clicked */}
                    {(
                      showTooltip.index === index && showTooltip.cell === "stripe_refund_id" && showTooltip.show
                    ) && (
                        <Title headingType="p" headingStyle="Text-sm-Bold" color="--color-text-fg-subtle">
                          {tForms("copied")}!
                        </Title>
                      )}
                  </td>
                  <td>
                    <Title headingType="p" headingStyle="Text-md-Medium" color="--color-text-fg">
                      €{(item.amount_cents / 100).toFixed(2)}
                    </Title>
                  </td>
                  <td>
                    {
                      item.status === "succeeded" && <IconText text={tForms("succeeded")} type="badge-style-item-booking" variation="success" addPoint={true} />
                    }
                    {
                      item.status !== "succeeded" && <IconText text={item.status} type="badge-style-item-booking" variation="danger" addPoint={true} />
                    }
                  </td>
                </tr>
              )
            })}
            <tr className="final-sum">
              <td colSpan={5}>
                <Title headingType="p" headingStyle="Text-sm-Regular" color="--color-text-fg-subtle">
                  {tForms("total_refunded")}:
                </Title>
                <Title headingType="h3" headingStyle="Text-lg-Semibold" color="--color-text-fg-error">
                  -€{(booking.amount100_refunded / 100).toFixed(2)}
                </Title>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>

    </div>
  </>
}