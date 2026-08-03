"use client";

import CustomSelect from "@/components/forms/inputs/CustomSelect";
import InputText from "@/components/forms/inputs/InputText";
import { Col, Container, Row } from "react-bootstrap";
import DateRangeSelector from "./DateRangeSelector";
import { useEffect, useState } from "react";
import { updateUrlParam } from "@/utils/navigation";
import { useSearchParams } from "next/navigation";
import { EBookingStatus } from "@/utils/interface-database";
import { isValidDateRangeFormat } from "@/utils/dates-times";
import { useTranslations } from "next-intl";

export default function BookingAndRefundFilters() {

  const tCommon = useTranslations("Common");

  const searchParams = useSearchParams();

  let initialRangeDates: [Date, Date] | null = null;
  const datesFilter = searchParams.get("dateTourStartRange");
  if (datesFilter !== null && isValidDateRangeFormat(datesFilter)) {
    const [dateStart, dateEnd] = datesFilter.split("-to-");
    initialRangeDates = [new Date(dateStart), new Date(dateEnd)];
  }

  // Initialize state
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  const statusValueGet = searchParams.get("status") || "";
  console.log("statusValueGet:", statusValueGet);

  const updateURLParamRef = updateUrlParam();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    // Determine the value to send: 
    // If empty, pass null (or empty string, depending on your hook's implementation)
    const valueToSet = debouncedSearch;

    // Only update if it's actually different from current searchParams 
    // to prevent unnecessary re-renders/API calls
    const currentParam = searchParams.get("search");

    if (valueToSet !== currentParam) {
      console.log("Updating URL with:", valueToSet);
      updateURLParamRef(
        "search",
        valueToSet,
        ['page'] // unset page number
      );
    }
  }, [debouncedSearch, searchParams, updateURLParamRef]);

  return (
    <div className="booking-and-refunds-filters">
      <Container>
        <Row>
          <Col>
            <div className="inputs-wrap-holder">
              <InputText
                type="text"
                placeholder={tCommon("search_by_booking_id_or_tour_name")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                showLabel={false}
                showLabelIconText={false}
                inputIcon="search"
                inputIconPosition="icon-position-start"
                className="search-by-text"
              />

              <CustomSelect
                options={[
                  { label: tCommon("all_statues"), value: "" },
                  { label: tCommon("confirmed"), value: EBookingStatus.CONFIRMED },
                  { label: tCommon("reserved"), value: EBookingStatus.RESERVED },
                  { label: tCommon("pending_hold"), value: EBookingStatus.PENDING_HOLD },
                  { label: tCommon("cancelled"), value: EBookingStatus.CANCELLED },
                  { label: tCommon("forbidden_by_user"), value: EBookingStatus.FORBIDDEN_BY_USER },
                ]}
                placeholder={tCommon("all_statuses")}
                initialValue={statusValueGet}
                onChange={(value: any) => {
                  console.log("value:", value)
                  updateURLParamRef('status', value, ['page'])
                }}
              />

              <DateRangeSelector
                initialDates={initialRangeDates}
                onUpdateDates={(datesString, datesObjects) => {
                  console.log("datesString:", datesString);
                  console.log("datesObjects:", datesObjects);
                  if (datesString === null) {
                    updateURLParamRef('dateTourStartRange', "None", ['page']);
                  }
                  else {
                    updateURLParamRef('dateTourStartRange', datesString.join('-to-'), ['page']);
                  }
                }} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}