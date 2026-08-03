"use client";

import IconText from "@/components/buttons/IconText";
import ZIcon from "@/components/icons/ZIcon";
import { useAppSelector } from "@/redux/hooks";
import { formatDateStart_plus_duration, formatLongDate, formatTo12HourTime, supabaseDateToYYYMMDD } from "@/utils/dates-times";
import SelectorDate from "@/app/[locale]/tour/[slug]/SelectorDate";
import SelectorTime from "@/app/[locale]/tour/[slug]/SelectorTime";
import { IBookingTimeActivitySlot } from "@/utils/interface-booking";
import { useState } from "react";
import SelectorParticipants from "@/app/[locale]/tour/[slug]/SelectorParticipants";
import { getTotalCountFromParticipantObject } from "@/utils/booking-client";
import { IBookingParticipants } from "@/redux/booking/bookingSlice";
import { useTranslations } from "next-intl";

export default function EditButtonsForTour(
  {
    slots,
    onUpdateDates,
    onUpdateTimeSlot,
    onUpdateParticipants,
    includeEditsButtons = true
  }
    :
    {
      slots: IBookingTimeActivitySlot[],
      onUpdateDates?: (date: string[]) => void;
      onUpdateTimeSlot?: (slot: IBookingTimeActivitySlot) => void;
      onUpdateParticipants?: (participants: IBookingParticipants) => void;
      includeEditsButtons?: boolean;
    }
) {

  // if (timeSlot === null) return <></>
  const booking = useAppSelector((state) => state.booking.booking);
  const activeTimeSlot = useAppSelector((state) => state.booking.activeTimeSlot);
  const tour = useAppSelector((state) => state.booking.tour);
  const participants = useAppSelector((state) => state.booking.filters.participantsCount);

  const tForms = useTranslations("Forms");

  const [showDateTimeSelectors, set_showDateTimeSelectors] = useState(false);
  const [showParticiantsEditor, set_showParticiantsEditor] = useState(false);

  const arrayStringsParticipants = () => {
    const arrayStrings = [];
    if (participants.adults > 0) {
      arrayStrings.push(`${participants.adults} ${tForms('adults')}`);
    }
    if (participants.children > 0) {
      arrayStrings.push(`${participants.children} ${tForms('children')}`);
    }
    if (participants.infants > 0) {
      arrayStrings.push(`${participants.infants} ${tForms('infants')}`);
    }
    console.log("arrayStrings::::", arrayStrings);
    return arrayStrings;
  }

  // console.log("activeTimeSlot:::", activeTimeSlot);

  let max_participants = 999;
  if (activeTimeSlot !== null) {
    max_participants = activeTimeSlot.availabilityCount;
  }
  if (activeTimeSlot !== null && booking !== null && booking.time_slot_id === activeTimeSlot.id) {
    max_participants = activeTimeSlot.availabilityCount
      + getTotalCountFromParticipantObject(booking?.count_participants);
  }
  if (max_participants < 0) {
    max_participants = 0;
  }

  return <>

    <div className="edit-buttons-for-tour">

      {
        !showDateTimeSelectors && <div className="item-edit">
          <IconText iconType="calendar-check-outline" type="for-tour-stat-booking" text={tForms("date")} subText={
            <>

              {
                booking !== null ? formatLongDate(booking.date_tour_start, tForms("locale_code")) : "Saturday, Mar 21, 2026"
              }
              <br />
              {
                booking !== null && tour !== null ? formatDateStart_plus_duration(
                  booking.time_tour_start_string,
                  tour.duration
                ) : "10:30 AM - 12:30 PM"
              }
            </>
          } />


          {
            includeEditsButtons && <ZIcon type="pencil-outline" onClick={() => {
              console.log("It is working");
              set_showDateTimeSelectors(true)
              console.log('is true');
            }} />
          }



        </div>
      }



      {
        showDateTimeSelectors === true && <>
          <SelectorDate initialSelectedDates={
            booking?.date_tour_start
              ?
              [
                supabaseDateToYYYMMDD(
                  booking.date_tour_start
                )
              ]
              :
              []
          } onUpdateDates={(dates: string[]) => {
            onUpdateDates && onUpdateDates(dates)
          }} />
          <SelectorTime
            isForExistingBooking={true}
            slots={slots}
            onUpdateTimeSlot={(slot: IBookingTimeActivitySlot) => {
              onUpdateTimeSlot && onUpdateTimeSlot(slot)
            }} />


        </>
      }


      {
        !showParticiantsEditor && <div className="item-edit">
          <IconText iconType="people" type="for-tour-stat-booking" text={tForms("participants")} subText={<>
            {arrayStringsParticipants().length > 0 ? <span dangerouslySetInnerHTML={{ __html: arrayStringsParticipants().join("<br />") }} /> : ""}
          </>} />
          {
            includeEditsButtons && <ZIcon type="pencil-outline" onClick={() => {
              set_showParticiantsEditor(true);
            }} />
          }
        </div>
      }


      {
        showParticiantsEditor && <SelectorParticipants
          isForExistingBooking={true}
          max_participants={max_participants}
          onUpdateParticipants={(participants: IBookingParticipants) => {
            onUpdateParticipants?.(participants);
          }}

        />
      }


    </div>

  </>
}