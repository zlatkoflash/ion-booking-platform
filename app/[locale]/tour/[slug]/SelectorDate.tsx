"use client";

import TourPageSelector from "@/components/forms/inputs/TourPageSelector";
import { PopupCalendar } from "@/components/forms/popovers/CalendardInputPopover";
// import { setPriceLoading } from "@/redux/booking/bookingSlice";
// import { useAppDispatch } from "@/redux/hooks";
import { formatMultipleDates } from "@/utils/dates-times";
import { useTranslations } from "next-intl";
// import { updateUrlParam } from "@/utils/navigation";
// import { updateUrlParam, updateUrlParam } from "@/utils/navigation";
import { useState } from "react";
import { OverlayTrigger } from "react-bootstrap";

export default function SelectorDate(
  {
    initialSelectedDates,
    onUpdateDates
  }
    :
    {
      initialSelectedDates?: string[],
      onUpdateDates?: (dates: string[]) => void
    }
) {

  const tCommon = useTranslations("Common");
  const tForms = useTranslations("Forms");

  const [selectedDates, setSelectedDates] = useState<string[]>(initialSelectedDates || []);
  const [isOpen, setIsOpen] = useState(false);
  const [datesString, setDatesString] = useState(
    formatMultipleDates(initialSelectedDates || [], tForms("locale_code")) || tCommon("select_date")
  );

  console.log("initialSelectedDates:", initialSelectedDates);

  // const updateUrlParamFor = updateUrlParam();
  // const dispatch = useAppDispatch();

  return <>

    <div className="selector-tour-prop selector-date-tour">
      <OverlayTrigger
        trigger="click"
        rootClose
        placement="bottom-end"
        show={isOpen}
        onToggle={(nextShow) => setIsOpen(nextShow)}
        overlay={
          // calendarPopover
          (props) => {
            return <PopupCalendar
              {
              ...props
              }
              //  handleDateChange={handleDateChange}
              // getTileClass={getTileClass}
              initDates={selectedDates}
              setIsOpen={setIsOpen}
              singleDate={true}

              onUpdate={(dates) => {
                console.log(dates);
                setSelectedDates(dates)
                setDatesString(formatMultipleDates(dates, tForms("locale_code")))

                onUpdateDates?.(dates)
                // updateUrlParam("selectedDates", dates);
                /*updateUrlParamFor("selectedDates", dates, [
                  //'participantsCount', 
                  'timeSlot'
                ]);
                dispatch(setPriceLoading(true));
                // updateUrlParamFor("")*/

              }}
            />
          }
        }
      >
        <div>
          <TourPageSelector icon="calendar-check-outline" placeholder={datesString} haveValue={selectedDates.length > 0} active={isOpen} />
        </div>
      </OverlayTrigger>
    </div>

  </>;
}