"use client";

import ButtonDefault from "@/components/buttons/ButtonDefault";
import Title from "@/components/typography/Title";
import { setFilterSelectedDates } from "@/redux/booking/bookingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { formatDateSnippet, formatMultipleDates } from "@/utils/dates-times";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendardInputPopover(
  {
    onChange
  }
    :
    {
      onChange?: () => void
    }
) {
  // const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const filterDates = useAppSelector((state) => state.booking.filters.selectedDates);
  const dispatch = useAppDispatch();

  const tForms = useTranslations("Forms");




  return (
    <div className="component search-destinations-tours-popover calendar-input-popover">
      <OverlayTrigger
        trigger="click"
        rootClose
        placement="bottom"
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
              initDates={filterDates}
              setIsOpen={setIsOpen}
              singleDate={true}
              onUpdate={(dates: string[], rawDates: Date[]) => {
                console.log("dates:", dates);
                // setSelectedDates(dates)
                dispatch(setFilterSelectedDates(dates))
                onChange?.()

              }}
            />
          }
        }
      >
        {/* Clickable Display Area Wrapper */}
        <div className="clickable-date-display d-flex flex-wrap align-items-center gap-2">
          {/* Label Header text inside container box */}
          <div className="w-100 field-micro-label">{tForms("when").toLocaleUpperCase()}</div>
          {
            filterDates.length > 0 && <Title headingType="p" headingStyle="Text-sm-Regular" color="--color-text-fg">
              {formatMultipleDates(filterDates, tForms("locale_code"))}
            </Title>
          }

          {/* Fallback layout string if nothing is chosen */}
          {filterDates.length === 0 && (
            <span className="empty-placeholder-text">{tForms("add_date")}</span>
          )}
        </div>
      </OverlayTrigger>
    </div>
  );
}



export function PopupCalendar(
  {
    // handleDateChange,
    // getTileClass,
    setIsOpen,
    onUpdate,
    onUpdateRange,
    initDates,
    singleDate = false,
    selectRange = false,
    ...props
  }
    :
    {
      // handleDateChange: (date: Date) => void,
      // getTileClass: ({ date, view }: { date: Date; view: string }) => string,
      setIsOpen: (isOpen: boolean) => void,
      onUpdate?: (dates: string[], rawDates: Date[]) => void;
      onUpdateRange?: (dates: [Date, Date]) => void;
      initDates?: string[];
      singleDate?: boolean;
      selectRange?: boolean;
      [key: string]: any;
    }
) {

  const [selectedDates, setSelectedDates] = useState<string[]>(initDates !== undefined ? initDates : []);
  const [selectedRawDates, setSelectedRawDates] = useState<Date[]>([]);
  useEffect(() => {
    if (!initDates) return;
    const dates = initDates.map((date) => new Date(date))
    setSelectedRawDates(dates)
    setSelectedDates(initDates)

  }, []);

  const [rangeDates, setRangeDates] = useState<[
    Date,
    Date
  ] | null>(null);

  const tForms = useTranslations("Forms");


  const handleDateChange = (dateValue: Date) => {


    const dateString = dateValue.toLocaleDateString("sv"); // Keeps string format matching getTileClass
    console.log("dateString:", dateString, "selectedDates:", selectedDates);

    // setSelectedDates([dateString]);
    // return;
    if (singleDate === true) {
      setSelectedDates([dateString])
      setSelectedRawDates([dateValue])
    }
    else {
      if (selectedDates.includes(dateString)) {
        // If already selected, remove it
        setSelectedDates(selectedDates.filter((d) => d !== dateString));
        setSelectedRawDates(selectedRawDates.filter((d) => d.toLocaleDateString("sv") !== dateString));
        // setSelectedRawDates()
      } else {
        // If not selected, add it
        setSelectedDates([...selectedDates, dateString]);
        setSelectedRawDates([...selectedRawDates, dateValue]);
      }
    }
  };


  const getTileClass = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const yyyymmdd = date.toLocaleDateString("sv"); // Safely gets YYYY-MM-DD
      return selectedDates.includes(yyyymmdd) ? "selected-day" : "";
    }
    return "";
  };

  /*const getTileClassRange = ({ date, view }: { date: Date; view: string }) => {

    const isRangeValid = selectedDates && Array.isArray(selectedDates) && selectedDates.length === 2;

    // const isSingleDateSelected = selectedDates && Array.isArray(selectedDates) && selectedDates.length === 1;

    if (view !== "month" || !isRangeValid) return "";

    const [start, end] = selectedDates;

    // Normalize date to midnight for accurate comparison
    const d = new Date(date).setHours(0, 0, 0, 0);
    const startTime = start ? new Date(start).setHours(0, 0, 0, 0) : null;
    const endTime = end ? new Date(end).setHours(0, 0, 0, 0) : null;

    // 1. Check if it's the Start Date
    if (startTime && d === startTime) return "range-start";

    // 2. Check if it's the End Date
    if (endTime && d === endTime) return "range-end";

    // 3. Check if it's "in between"
    if (startTime && endTime && d > startTime && d < endTime) return "range-between";

    return "";
  };*/


  return <>
    <Popover
      {...props}
      className="component  border-0 shadow"
    >


      <Popover.Body className="who-counter-panel">
        <Calendar
          locale={tForms("locale_code")}
          className={"component"}
          onClickDay={handleDateChange}
          onChange={(range) => {
            console.log("on Change range:", range);
            if (!selectRange) return;

            setRangeDates(range as [Date, Date])

          }}
          minDate={new Date()} // Blocks out historical dates from selection
          view="month"
          tileClassName={
            selectRange
              ?
              // getTileClassRange 
              undefined
              :
              getTileClass
          }
          prev2Label={null} // hide years prev navigation
          next2Label={null} // hide years prev navigation
          selectRange={selectRange}
          {...(!selectRange && selectedDates.length > 0) && {
            value: selectedDates[0]
          }}
        // selectRange={false}
        // allowPartialRange={false}
        // value={new Date()}
        />
      </Popover.Body>
      <div className="popover-footer">
        <ButtonDefault label={tForms("close")} variant="outline-primary" onClick={() => {
          setIsOpen(false)
        }} />
        <ButtonDefault
          label={
            `${selectRange ?
              tForms("add_range")
              :
              tForms("add_the_date")}`
          } variant="primary" onClick={() => {
            /*setAdults(localCountAdults)
            setChildrenCount(localCountChildren)
            setIsOpen(false)*/
            setIsOpen(false);
            if (selectRange) {
              /*console.log("selectedDates:", selectedDates);
              if (selectedDates.length < 2) {
                onUpdate?.([], []);
              }
              else {
                onUpdate?.(
                  [selectedDates[0], selectedDates[selectedDates.length - 1]],
                  [selectedRawDates[0], selectedRawDates[selectedRawDates.length - 1]]
                );
              }*/
              onUpdateRange?.(rangeDates!);
            }
            else {
              onUpdate?.(selectedDates, selectedRawDates);
            }
          }} />
      </div>
    </Popover>
  </>
}