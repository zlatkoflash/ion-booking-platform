"use client";

import ButtonDefault from "@/components/buttons/ButtonDefault";
import ZIcon from "@/components/icons/ZIcon";
import Title from "@/components/typography/Title";
import { IBookingParticipants, setFilterParticipantCountAdults, setFilterParticipantCountChildren, setFilterParticipantsCount } from "@/redux/booking/bookingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getTotalCountFromParticipantObject } from "@/utils/booking-client";
import { IBookingTimeActivitySlot } from "@/utils/interface-booking";
import { IDBTourIncludeDetails } from "@/utils/interface-database";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { OverlayTrigger, Popover, Button } from "react-bootstrap";

export default function ParticipantsCountPopover(
  {
    onChange
  }
    :
    {
      onChange?: () => void
    }
) {
  // const [adults, setAdults] = useState(0);
  // const [childrenCount, setChildrenCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const filterParticipants = useAppSelector((state) => state.booking.filters.participantsCount);

  // Helper calculation to build the display window label string text dynamically
  const getWhoDisplayText = () => {
    if (filterParticipants.adults === 0 && filterParticipants.children === 0) return ""; // Yields empty so the custom placeholder renders

    let text = "";
    if (filterParticipants.adults > 0) {
      text += `${filterParticipants.adults} Adult${filterParticipants.adults > 1 ? "s" : ""}`;
    }
    if (filterParticipants.children > 0) {
      text += `${filterParticipants.adults > 0 ? ", " : ""}${filterParticipants.children} Child${filterParticipants.children > 1 ? "ren" : ""}`;
    }
    return text;
  };

  const dispatch = useAppDispatch();

  const tForms = useTranslations("Forms");


  return (
    <div className="component search-destinations-tours-popover participants-count-popover">
      <OverlayTrigger
        trigger="click"
        rootClose
        placement="bottom"
        show={isOpen}
        onToggle={(nextShow) => setIsOpen(nextShow)}
        // overlay={participantsPopover}
        overlay={(props) => {
          return (
            <PopOverParticipants
              {...props}
              adults={filterParticipants.adults}
              childrenCount={filterParticipants.children}
              /*setAdults={(countAdults) => {
                // setAdults(countAdults)
                dispatch(setFilterParticipantCountAdults(countAdults))
              }}
              setChildrenCount={(countChildren) => {
                // setChildrenCount(countChildren)
                dispatch(setFilterParticipantCountChildren(countChildren))
              }}*/
              setParticipants={(participants) => {
                dispatch(setFilterParticipantsCount(participants))
              }}
              setIsOpen={setIsOpen}
              onApply={() => {
                onChange?.()
              }}
            />
          )
        }}
      >
        {/* Clickable Entry Wrapper Panel */}
        <div className="clickable-input-wrapper position-relative">
          <div className="field-micro-label">{tForms("who").toLocaleUpperCase()}</div>

          {/* Active text value output frame */}
          <div className="search-field-output text-truncate">
            {getWhoDisplayText()}
          </div>

          {/* Absolute design placeholder matching when selections equal zero */}
          {filterParticipants.adults === 0 && filterParticipants.children === 0 && (
            <span className="custom-placeholder-text">{tForms("add_participants")}</span>
          )}
        </div>
      </OverlayTrigger>
    </div>
  );
}


export function PopOverParticipants(
  {
    isForExistingBooking = false,
    adults,
    childrenCount,
    // setAdults,
    // setChildrenCount,
    setIsOpen,
    onApply,
    setParticipants,
    // tour = null,
    // startTimeSlot = null,
    max_participants = 999,
    /*label_adults = "Age 13 or above",
    label_children = "Children (2-12)",
    label_infants = "Infants (0-1)",*/
    label_adults,
    label_children,
    label_infants,

    ...props
  }
    :
    {
      isForExistingBooking?: boolean;
      adults: number;
      childrenCount: number;
      // setAdults: (value: number) => void;
      // setChildrenCount: (value: number) => void;
      setParticipants?: (value: IBookingParticipants) => void;
      setIsOpen: (value: boolean) => void;
      onApply?: () => void;
      max_participants?: number;
      label_adults?: string;
      label_children?: string;
      label_infants?: string;
      // tour?: IDBTourIncludeDetails | null;
      // startTimeSlot?: IBookingTimeActivitySlot | null;
      [key: string]: any;
    }
) {


  const booking = useAppSelector((state) => state.booking.booking);
  const countBookedActual = (booking === null ? 0 : getTotalCountFromParticipantObject(booking.count_participants));

  const [localCountAdults, setLocalCountAdults] = useState(adults);
  const [localCountChildren, setLocalCountChildren] = useState(childrenCount);
  const [localCountInfants, setLocalCountInfants] = useState(0);

  const countLocalTotal = (): number => {
    return localCountAdults + localCountChildren + localCountInfants;
  }

  const countIsEqual = (): boolean => {
    return countBookedActual === countLocalTotal();
  }

  const tForms = useTranslations("Forms");

  /*let max_participants = 999;

  if (tour !== null && startTimeSlot !== null) {
    max_participants = startTimeSlot.availabilityCount - tour.occupied_spots_count;
  }*/

  return <Popover
    {...props}
    // id="participants-widget-popover"
    className="component custom-participants-popover border-0 shadow"
  >
    {/* Top Header Banner with Close Button */}
    {
      /*<div className="popover-widget-header d-flex align-items-center justify-content-between border-bottom">
      <span className="popover-header-title m-0">Guests</span>
      <button
        type="button"
        className="btn-close custom-close-btn"
        aria-label="Close"
        onClick={() => setIsOpen(false)}
      ></button>
    </div>*/
    }

    <Popover.Body className="who-counter-panel component">
      {/* Row 1: Adults Counter Component */}
      <div className="d-flex plus-minus-item align-items-center justify-content-between gap-5">
        <div>
          <Title headingType="h4" headingStyle="Text-md-Medium" color="--color-text-fg">{tForms("adults")}</Title>
          <Title headingType="p" headingStyle="Text-sm-Regular" color="--color-text-fg-subtle">
            {label_adults && label_adults !== "" ? label_adults : tForms("age_13_or_above")}
          </Title>
        </div>
        <div className="d-flex align-items-center buttons-counter">
          <Button
            variant="outline-primary"
            className="component counter-btn"

            onClick={() => setLocalCountAdults(Math.max(0, localCountAdults - 1))}
            disabled={countLocalTotal() <= 1}
          >
            <ZIcon type="minus-circle-outline" />
          </Button>
          <Title headingType="p" headingStyle="Text-md-Medium" color="--color-text-fg">{localCountAdults}</Title>
          <Button
            variant="outline-primary"
            className="component counter-btn"
            disabled={localCountAdults + localCountChildren >= max_participants}
            onClick={() => setLocalCountAdults(localCountAdults + 1)}
          >
            <ZIcon type="plus-circle-outline" />
          </Button>
        </div>
      </div>

      {/* Row 2: Children Counter Component */}
      <div className="d-flex plus-minus-item align-items-center justify-content-between gap-5">
        <div>
          <Title headingType="h4" headingStyle="Text-md-Medium" color="--color-text-fg">{tForms("children")}</Title>
          <Title headingType="p" headingStyle="Text-sm-Regular" color="--color-text-fg-subtle">
            {
              label_children && label_children !== "" ? label_children : tForms("children_2_12")
            }
          </Title>
        </div>
        <div className="d-flex align-items-center buttons-counter">
          <Button
            variant="outline-primary"
            className="component counter-btn"
            onClick={() => setLocalCountChildren(Math.max(0, localCountChildren - 1))}
            disabled={countLocalTotal() <= 1}
          >
            <ZIcon type="minus-circle-outline" />
          </Button>
          <Title headingType="p" headingStyle="Text-md-Medium" color="--color-text-fg">{localCountChildren}</Title>
          <Button
            variant="outline-primary"
            className="component counter-btn"
            disabled={localCountAdults + localCountChildren >= max_participants}
            onClick={() => setLocalCountChildren(localCountChildren + 1)}
          >
            <ZIcon type="plus-circle-outline" />
          </Button>
        </div>
      </div>

      {
        localCountAdults + localCountChildren >= max_participants && (
          <Title headingType="p" headingStyle="Text-sm-Regular" color="--color-text-fg-on-accent" className="text-center">
            {tForms("maximum_number_of_participants_reached")}
          </Title>
        )
      }
    </Popover.Body>

    <div className="popover-footer">
      <ButtonDefault label={tForms("cancel")} variant="outline-primary" onClick={() => {
        setIsOpen(false)
      }} />
      <ButtonDefault
        disabled={countIsEqual() || countLocalTotal() <= 0}
        label={
          isForExistingBooking ? tForms("update") : tForms("add")
        } variant="primary" onClick={() => {
          // setAdults(localCountAdults)
          // setChildrenCount(localCountChildren)
          setIsOpen(false)
          onApply?.();
          setParticipants?.({ adults: localCountAdults, children: localCountChildren, infants: localCountInfants });
        }} />
    </div>

  </Popover>;
}
