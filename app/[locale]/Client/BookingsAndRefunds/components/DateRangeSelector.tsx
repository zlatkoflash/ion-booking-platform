"use client"

import ZIcon from "@/components/icons/ZIcon";
import { OverlayTrigger } from "react-bootstrap";
import { useState } from "react";
import { PopupCalendar } from "@/components/forms/popovers/CalendardInputPopover";
import { formatDateToYYYYMMDD, formatMultipleDates } from "@/utils/dates-times";
import TourPageSelector from "@/components/forms/inputs/TourPageSelector";
import { useTranslations } from "next-intl";

export default function DateRangeSelector(
  {
    onUpdateDates,
    initialDates = null,
  }
    :
    {
      onUpdateDates?: (dates: string[] | null, datesObjects: Date[] | null) => void,
      initialDates?: [Date, Date] | null
    }
) {

  const [isOpen, setIsOpen] = useState(false);

  const tCommon = useTranslations("Common");
  const tForms = useTranslations("Forms");

  // const dateFromGet = 
  // const [selectedDates, setSelectedDates] = useState<string[]>(initialDates);

  // const [datesString, setDatesString] = useState("");
  const [dateRange, setDateRange] = useState<[Date, Date] | null>(initialDates ?? null);

  const dateRangeString = () => {
    if (dateRange === null) return `${tCommon('select_date_range')}`;

    const [startDate, endDate] = dateRange;

    // Use 'en-US' instead of 'default' to ensure consistency
    const startMonth = startDate.toLocaleString(tForms('local_code'), { month: 'short' });
    const endMonth = endDate.toLocaleString(tForms('local_code'), { month: 'short' });

    const startDay = startDate.getDate();
    const endDay = endDate.getDate();
    // const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();

    return `${startMonth} ${startDay} – ${endMonth} ${endDay}, ${endYear}`;
  }

  return <>
    <div className="date-range-selector">
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
                // initDates={selectedDates}
                setIsOpen={setIsOpen}
                singleDate={false}
                selectRange={true}

                /*onUpdate={(dates) => {
                  console.log(dates);
                  setSelectedDates(dates)
                  setDatesString(formatMultipleDates(dates))

                  onUpdateDates?.(dates)

                }}*/
                onUpdateRange={(dates: [Date, Date]) => {
                  console.log(dates);
                  setDateRange(dates);
                  if (dates !== null && dates.length === 2) {
                    onUpdateDates?.(
                      [
                        formatDateToYYYYMMDD(dates[0]),
                        formatDateToYYYYMMDD(dates[1])
                      ],
                      dates
                    );
                  }
                  else {
                    onUpdateDates?.(null, null);
                  }
                }}
              />
            }
          }
        >
          <div>
            <TourPageSelector icon="calendar-outline"
              placeholder={dateRangeString()}
              // haveValue={selectedDates.length > 0} 
              active={isOpen} />
          </div>
        </OverlayTrigger>
      </div>
    </div>
  </>
}