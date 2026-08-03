"use client";

import ButtonDefault from "@/components/buttons/ButtonDefault";
import IconText from "@/components/buttons/IconText";
import TourPageSelector from "@/components/forms/inputs/TourPageSelector";
/*import {
  setActiveTimeSlot,
  // setPriceLoading 
} from "@/redux/booking/bookingSlice";*/
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IBookingTimeActivitySlot } from "@/utils/interface-booking";
import { useTranslations } from "next-intl";
// import { updateUrlParam } from "@/utils/navigation";
import { useState } from "react";
import { Button, OverlayTrigger, Popover, Tooltip } from "react-bootstrap";

export default function SelectorTime(
  { slots = [], onUpdateTimeSlot, isForExistingBooking }
    :
    {
      slots?: IBookingTimeActivitySlot[];
      onUpdateTimeSlot?: (timeSlot: IBookingTimeActivitySlot) => void;
      isForExistingBooking: boolean;
    }
) {

  const [isOpen, setIsOpen] = useState(false);
  // const [selectedTimeValueString, setSelectedTimeValueString] = useState("Select Time");
  // const [slotSelected, setSlotSelected] = useState("");
  const tCommon = useTranslations('Common');

  // const dispatch = useAppDispatch();
  const activeSlot = useAppSelector((state) => state.booking.activeTimeSlot);
  // const updateUrlParamFor = updateUrlParam();
  // const dispatch = useAppDispatch()

  return <>

    <div className="selector-tour-prop selector-time-tour">
      <OverlayTrigger
        trigger="click"
        rootClose
        placement="bottom-end"
        show={isOpen}
        onToggle={(nextShow) => setIsOpen(nextShow)}
        // overlay={participantsPopover}
        overlay={(props) => {
          return (
            <PopoverTime
              setIsOpen={setIsOpen}
              isForExistingBooking={isForExistingBooking}
              onUpdate={(timeSlotSelected) => {
                console.log("timeSlotSelected:", timeSlotSelected);
                // setSelectedTimeValueString(timeSlotSelected);
                // setSlotSelected(timeSlotSelected);
                if (timeSlotSelected !== null) {
                  onUpdateTimeSlot?.(timeSlotSelected);
                }
                /*updateUrlParamFor("timeSlot", timeSlotSelected?.id as string);
                dispatch(setPriceLoading(true));*/
              }}
              slots={slots}
              {...props}
            // adults={adults}
            // childrenCount={childrenCount}
            // setAdults={setAdults}
            // setChildrenCount={setChildrenCount}
            // setIsOpen={setIsOpen}
            />
          )
        }}
      >
        <div>
          <TourPageSelector icon="time-wave-outline" placeholder={activeSlot === null ? tCommon('select_time') : `${activeSlot.startTime} - ${activeSlot.startTimeLabel}`} haveValue={activeSlot !== null} active={isOpen} />
        </div>
      </OverlayTrigger>
    </div>

  </>;
}



function PopoverTime(
  {
    setIsOpen,
    onUpdate,
    slots = [],
    isForExistingBooking = false,
    ...props
  }
    :
    {
      setIsOpen: (isOpen: boolean) => void;
      onUpdate?: (slot: IBookingTimeActivitySlot | null) => void;
      slots?: IBookingTimeActivitySlot[];
      isForExistingBooking?: boolean;
      [key: string]: any;
    }
) {

  const activeTimeSlot = useAppSelector((state) => state.booking.activeTimeSlot);
  // const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [activeSlot, setActiveSlot] = useState<IBookingTimeActivitySlot | null>(activeTimeSlot);
  const booking = useAppSelector((state) => state.booking.booking);
  const tCommon = useTranslations("Common");

  // const dispatch = useAppDispatch();

  return <>
    <Popover
      {...props}
      className="component  border-0 shadow"
    >


      <Popover.Body className="who-counter-panel">
        <TimeSlotSelector
          // disabledSlots={["10:30", "12:00"]}
          onTimeSelect={(slot) => {
            // setIsOpen(false);
            // setSelectedTimeSlot(timeId);

            setActiveSlot(slot)

          }}
          slots={slots}
        />
      </Popover.Body>
      <div className="popover-footer">
        <ButtonDefault label={tCommon("close")} variant="outline-primary" onClick={() => {
          setIsOpen(false)
        }} />
        <ButtonDefault
          disabled={activeSlot?.id === activeTimeSlot?.id}
          label={
            isForExistingBooking ? tCommon('update_time') : tCommon('add_time')
          } variant="primary" onClick={() => {
            /*setAdults(localCountAdults)
            setChildrenCount(localCountChildren)
          setIsOpen(false)*/
            setIsOpen(false);
            onUpdate?.(activeSlot);
            // onUpdate?.(selectedDates);
            // dispatch(setActiveTimeSlot(activeSlot))
          }} />
      </div>
    </Popover>
  </>
}





/*interface TimeSlot {
  id: string;      // e.g., "09:00"
  label: string;   // e.g., "9:00 AM"
}*/

interface TimeSlotSelectorProps {
  /** Array of time strings to disable initially, e.g., ["11:30", "14:00"] */
  // disabledSlots?: string[];
  /** Callback to send selected time label up to the parent */
  onTimeSelect?: (slot: IBookingTimeActivitySlot) => void;
  slots: IBookingTimeActivitySlot[];
}

export function TimeSlotSelector({
  // disabledSlots = [],
  onTimeSelect,
  slots = [],
}: TimeSlotSelectorProps) {

  const [selectedSlot, setSelectedSlot] = useState<IBookingTimeActivitySlot | null>(null);
  const activeTimeSlot = useAppSelector((state) => state.booking.activeTimeSlot);
  const booking = useAppSelector((state) => state.booking.booking);


  const handleSlotClick = (slot: IBookingTimeActivitySlot) => {
    setSelectedSlot(slot);
    if (onTimeSelect) {
      onTimeSelect(slot);
    }
  };

  const countTotalParticipants = useAppSelector((state) => state.booking.filters.participantsCount.adults + state.booking.filters.participantsCount.children + state.booking.filters.participantsCount.infants);

  return (
    <div className="time-slot-selector">


      {/* Bootstrap Flexbox Grid Wrapper */}
      <div className="time-slot-grid">
        {slots.map((slot) => {
          let isDisabled = false;
          if (activeTimeSlot?.id !== slot.id && countTotalParticipants > slot.availabilityCount) {
            isDisabled = true;
          }
          const isSelected =
            (
              (
                selectedSlot !== null && selectedSlot.id === slot.id
              )
              /*||
              (
                selectedSlot === null
                &&
                // activeTimeSlot !== null && activeTimeSlot.id === slot.id
                booking !== null && booking.id !== null && booking.date_tour_start !== null && activeTimeSlot !== null && activeTimeSlot.id === slot.id
              )*/
            );

          // Compute standard Bootstrap button classes dynamically based on state
          let btnVariant = "outline-primary"; // State 1: Enabled / Default Outline
          if (isSelected) {
            btnVariant = "primary";          // State 2: Selected / Solid Fill
          }
          if (booking !== null && booking?.time_slot_id === slot.id) {
            btnVariant = "success";
          }

          return (


            <Button
              key={slot.id}
              type="button"
              disabled={isDisabled}
              onClick={() => handleSlotClick(slot)}
              variant={btnVariant}
              className={`slot-button-selecting`}
            >
              {slot.startTime}
              {
                (typeof slot.startTimeLabel === "string" && slot.startTimeLabel !== "") &&
                <small>
                  {slot.startTimeLabel}
                  {
                    // slot.id
                  }
                </small>
              }

              {
                (
                  booking === null
                  ||
                  /*activeTimeSlot === null
                  ||*/
                  (
                    booking.time_slot_id !== slot.id
                  )
                ) && <span className={`count-slots ${slot.availabilityCount > 5 ? "success" : "warning"}`}>
                  {
                    slot.availabilityCount
                  }

                </span>
              }

              {
                /**
                 * <span>[{slot.startTimeId}]</span>
              <span>[{slot.defaultRateId}]</span>
                 */
              }

            </Button>

          );
        })}
      </div>


      {
        slots.length === 0 &&
        <IconText
          type="icon-text-alert"
          text="There are no available slots for the selected date"
          iconType="calendar-check-outline"
          fullWidthCentered={true}
          variation="warning"
        />
      }
    </div>
  );
}