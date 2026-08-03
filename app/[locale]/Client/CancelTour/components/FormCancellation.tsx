"use client"

import ButtonDefault from "@/components/buttons/ButtonDefault";
import CustomSelect from "@/components/forms/inputs/CustomSelect";
import InputRadiosList from "@/components/forms/inputs/InputRadiosList";
import Title from "@/components/typography/Title";
import { useRouter } from "@/translations-engine/routing";
import { EBookingCancellationReason, IDBBookingDetails } from "@/utils/interface-database";
import { useEffect, useState } from "react";
import ModalCancelEdit from "./ModalCancelEdit";
import InputText from "@/components/forms/inputs/InputText";
import { getApiData } from "@/utils/api";
import IconText from "@/components/buttons/IconText";
import { useTranslations } from "next-intl";

export default function FormCancellation(
  {
    booking
  }
    :
    {
      booking: IDBBookingDetails
    }
) {

  const router = useRouter();

  const tCommon = useTranslations("Common");

  const [wantToEditTheBooking, setWantToChangeTheBooking] = useState<boolean>(false);
  const [cancellingReason, setCancellingReason] = useState<EBookingCancellationReason | null>(null);
  const [otherReason, setOtherReason] = useState("");

  const [showModalCancelEdit, setShowModalCancelEdit] = useState<boolean>(false);
  const [errorWhileCancelling, setErrorWhileCancelling] = useState<string | null>(null);

  const [cancellingBooking, setCancellingBooking] = useState<boolean>(false);

  const CancelTheBookingFinally = async () => {

    setCancellingBooking(true);
    setErrorWhileCancelling(null);

    const details = await getApiData<{
      ok: boolean,
      message: string
    }>(`/booking-client/cancel-booking/`, "POST", {
      booking_id: booking.id,
      cancellation_reason: cancellingReason,
      other_reason: otherReason
    }, "authorize", "application/json");

    console.log("details:", details);
    if (details.ok === false) {
      setCancellingBooking(false);
      setErrorWhileCancelling(details.message)
      // TODO: SHOW MESSAGE
    } else {
      router.push(`/Client/ViewBookingTicket/${booking.id}/tour-detail`)
    }

    setCancellingBooking(false);
  }

  const clientLikeToEditTheBooking = (): boolean => {
    if (wantToEditTheBooking && (cancellingReason === EBookingCancellationReason.I_BOOKED_THE_WRONG_DATE
      || cancellingReason === EBookingCancellationReason.I_BOOKED_THE_WRONG_NUMBER_OF_PARTICIPANTS
      || cancellingReason === EBookingCancellationReason.MY_TRAVEL_DATES_CHANGED
    )) return true;
    return false;
  }

  useEffect(() => {
    setWantToChangeTheBooking(false);
  }, [cancellingReason]);

  return <>
    <div className="form-cancellation">
      <form action="">
        <CustomSelect
          options={[
            {
              value: EBookingCancellationReason.TRIP_CANCELLED,
              label: tCommon("trip_canceled")
            },
            {
              value: EBookingCancellationReason.I_FOUND_A_CHEAPER_PRICE,
              label: tCommon("found_cheaper_price")
            },
            {
              value: EBookingCancellationReason.I_DID_NOT_RECEIVE_MY_CONFIRMATION_ON_TIME,
              label: tCommon("confirmation_not_received")
            },
            {
              value: EBookingCancellationReason.THE_ACTIVITY_PROVIDER_ASKED_ME_TO_CANCEL,
              label: tCommon("provider_asked_to_cancel")
            },
            {
              value: EBookingCancellationReason.MY_TRAVEL_DATES_CHANGED,
              label: tCommon("travel_dates_changed")
            },
            {
              value: EBookingCancellationReason.MY_PREFERRED_OPTIONS_WERE_NOT_AVAILABLE,
              label: tCommon("options_not_available")
            },
            {
              value: EBookingCancellationReason.I_BOOKED_THE_WRONG_DATE,
              label: tCommon("wrong_date")
            },
            {
              value: EBookingCancellationReason.I_BOOKED_THE_WRONG_NUMBER_OF_PARTICIPANTS,
              label: tCommon("wrong_participants_count")
            },
            {
              value: EBookingCancellationReason.OTHER_REASON,
              label: tCommon("other_reason")
            },
          ]}
          placeholder={tCommon("select_cancellation_reason")}
          showBigLabel={{
            title: tCommon("why_cancel"),
            subtitle: ""
          }}
          onChange={(value, object) => {
            setCancellingReason(value as EBookingCancellationReason);
          }}
          addCheckOnSelectedValue={true}
        />

        {
          (
            cancellingReason === EBookingCancellationReason.I_BOOKED_THE_WRONG_DATE
            || cancellingReason === EBookingCancellationReason.MY_TRAVEL_DATES_CHANGED
          ) && <InputRadiosList showBigLabel={{
            title: tCommon("want_to_change_dates"),
            subtitle: tCommon("host_change_dates_hint")
          }}
            listRadioItems={[
              {
                value: "yes",
                label: tCommon("yes_changed")
              },
              {
                value: "no",
                label: tCommon("no")
              }
            ]}
            defaultValue={"no"}
            onChange={(v, item) => {
              setWantToChangeTheBooking(v === "yes");
            }}
          />
        }
        {
          cancellingReason === EBookingCancellationReason.I_BOOKED_THE_WRONG_NUMBER_OF_PARTICIPANTS && <InputRadiosList showBigLabel={{
            title: tCommon("want_to_change_participants"),
            subtitle: tCommon("host_change_participants_hint")
          }}
            listRadioItems={[
              {
                value: "yes",
                label: tCommon("yes_changed")
              },
              {
                value: "no",
                label: tCommon("no")
              }
            ]}
            defaultValue={"no"}
            onChange={(v, item) => {
              setWantToChangeTheBooking(v === "yes");
            }}
          />
        }

        {
          cancellingReason === EBookingCancellationReason.OTHER_REASON && <>
            <InputText value={otherReason} onChange={(v) => {
              setOtherReason(v.target.value);
            }} placeholder={tCommon("type_reason_placeholder")} showBigLabel={{
              title: tCommon("tell_us_more"),
              subtitle: tCommon("tell_us_more_hint")
            }} />
          </>
        }



        <div className="amount-you-paid-labels">
          <div className="amount-that-you-paid">
            <Title headingType="p" headingStyle="Text-md-Regular" color="--color-text-fg-subtle">{tCommon("amount_paid")}:</Title>
            <Title headingType="p" headingStyle="Text-md-Regular" color="--color-text-fg-subtle">€{(booking.amount100_paid / 100).toFixed(2)}</Title>
          </div>
          <div className="amount-that-will-be-refunded">
            <Title headingType="p" headingStyle="Text-lg-Regular" color="--color-text-fg-on-accent">{tCommon("total_refund")}:</Title>
            <Title headingType="p" headingStyle="Text-lg-Bold" color="--color-text-fg-on-accent">€{((booking.amount100_paid - booking.amount100_refunded) / 100).toFixed(2)}</Title>
          </div>
        </div>

        <div className="buttons-wrap-footer">
          <ButtonDefault label={tCommon("keep_booking")} variant="outline-primary" onClick={() => {
            router.push(`/Client/ViewBookingTicket/${booking.id}/tour-detail`);
          }} />
          {
            clientLikeToEditTheBooking() && <ButtonDefault label={tCommon("continue_editing")} variant="success" addArrowOnTheEnd={true} onClick={() => {
              router.push(`/Client/ViewBookingTicket/${booking.id}/tour-detail`);
            }} />
          }
          {
            !clientLikeToEditTheBooking() && <ButtonDefault label={tCommon("continue_cancellation")} variant="primary" addArrowOnTheEnd={true} onClick={() => {
              setShowModalCancelEdit(true)
            }} />
          }

        </div>

      </form>
    </div>


    <ModalCancelEdit
      disable={cancellingBooking}
      title={tCommon("cancel_booking")}
      description={tCommon("confirm_cancellation")}
      // booking={booking}
      show={showModalCancelEdit}
      handleClose={() => { setShowModalCancelEdit(false) }}
      bodyContent={
        <>
          <Title headingType="h4" headingStyle="Text-xl-Medium" color="--color-text-fg-success">{tCommon("full_refund_notice")} €{((booking.amount100_paid - booking.amount100_refunded) / 100).toFixed(2)}.</Title>
          <Title headingType="p" headingStyle="Text-lg-Regular" color="--color-text-fg-subtle">{tCommon("refund_processing_info")}</Title>
        </>
      }
      footerContent={<>
        <ButtonDefault label={tCommon("cancel_booking")} variant="danger" onClick={() => {
          CancelTheBookingFinally()
        }} loading={cancellingBooking} />
        {
          errorWhileCancelling !== null && <IconText
            className="w-100" type="icon-text-label-solid" variation="warning-solid"
            text={tCommon("error_while_cancelling")}
            subText={errorWhileCancelling}
            iconType="danger-outline" />
        }
        <ButtonDefault label={tCommon("keep_booking")} variant="light" onClick={() => {
          setShowModalCancelEdit(false)
        }} />
      </>}
    />

  </>


}