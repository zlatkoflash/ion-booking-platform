"use client";

import TourPageSelector from "@/components/forms/inputs/TourPageSelector";
import { PopOverParticipants } from "@/components/forms/popovers/ParticipantsCountPopover";
import { IBookingParticipants, setFilterParticipantsCount, setPriceLoading } from "@/redux/booking/bookingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { OverlayTrigger } from "react-bootstrap";

export default function SelectorParticipants(
  {
    isForExistingBooking = false,
    max_participants = 999,
    onUpdateParticipants
  }
    :
    {
      isForExistingBooking?: boolean,
      max_participants?: number,
      onUpdateParticipants?: (value: IBookingParticipants) => void
    }
) {

  const tForms = useTranslations("Forms");

  const [textValue, set_textValue] = useState(tForms("select_participants"));
  const [isOpen, setIsOpen] = useState(false);
  const participants = useAppSelector((state) => state.booking.filters.participantsCount);



  useEffect(() => {
    if (participants.adults > 0 && participants.children > 0) {
      set_textValue(`${participants.adults} ${tForms("adults")} ${participants.children} ${tForms("children")}`);
    }
    else if (participants.adults > 0) {
      set_textValue(`${participants.adults} ${tForms("adults")}`);
    }
    else if (participants.children > 0) {
      set_textValue(`${participants.children} ${tForms("children")}`);
    }
    else {
      set_textValue(tForms("select_participants"));
    }
  }, [participants.adults, participants.children])

  const IHaveParticipants = () => {
    return (participants.adults > 0 || participants.children > 0);
  }

  return <>

    <div className={`selector-tour-prop selector-participants-tour ${IHaveParticipants() ? 'have-participants' : ''}`}>
      <OverlayTrigger
        trigger="click"
        rootClose
        placement="bottom-end"
        show={isOpen}
        onToggle={(nextShow) => setIsOpen(nextShow)}
        // overlay={participantsPopover}
        overlay={(props) => {
          return (
            <PopOverParticipants
              {...props}
              isForExistingBooking={isForExistingBooking}
              adults={participants.adults}
              childrenCount={participants.children}
              // setAdults={() => { }}
              // setChildrenCount={() => { }}
              setIsOpen={setIsOpen}
              setParticipants={(participants) => {
                onUpdateParticipants?.(participants)
              }}

              max_participants={max_participants}

              // tour={tour}
              // startTimeSlot={startTimeSlot}
              onApply={() => {

              }}
            />
          )
        }}
      >
        <div>
          {
            // must TourPageSelector wrapped in div so the popup to show
          }
          <TourPageSelector icon="people" placeholder={textValue} active={isOpen} haveValue={IHaveParticipants()} />
        </div>
      </OverlayTrigger>
    </div>

  </>;
}