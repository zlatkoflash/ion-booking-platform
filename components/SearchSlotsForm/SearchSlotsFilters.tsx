"use client";

import { useEffect, useState } from "react";
import SearchDropdownFilter from "../dropdowns/SearchDropdownFilter";
import { getApiData } from "@/utils/api";
import { parseToMinutes } from "@/utils/dates-times";
import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setFilterAvailability, setFilterCategory, setFilterDuration, setFilterPriceRange } from "@/redux/booking/bookingSlice";

export default function SearchSlotsFilters(
  {
    onAfterChangeAnyFilter,
    showOnMobile = false
  }
    :
    {
      onAfterChangeAnyFilter?: () => void,
      showOnMobile?: boolean
    }
) {



  const [durations, setDurations] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [availabilities, setAvailabilities] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.booking.filters);

  const t = useTranslations("Common");
  const tForms = useTranslations("Forms");

  const LoadFiltersValues = async () => {
    const result = await getApiData<{
      ok: boolean;
      durations: string[];
      categories: string[];
      activities: string[];
    }>("/booking-public/get-filters-values", "POST", {}, "not-authorize", "application/json");
    if (result.ok) {
      setDurations([...result.durations].sort((a, b) => parseToMinutes(a) - parseToMinutes(b)));
      setCategories([...result.categories]);
      setAvailabilities([...result.activities]);
    }

    console.log("results filters loading:", result);
  }



  useEffect(() => {
    LoadFiltersValues();
  }, []);

  return (
    <>
      <div className={`component search-slots-filters ${showOnMobile ? 'show-in-mobile' : ""}`}>
        <SearchDropdownFilter
          placeholder={tForms("availability")}
          selectedValue={filters.availability}
          items={
            [
              {
                value: "",
                label: tForms("any_availability")
              },
              ...availabilities.map((availability) => {
                return {
                  value: availability,
                  label: t(`filters.${availability}`) === "" ? availability : t(`filters.${availability}`)
                }
              })
            ]
          }

          onChange={(value) => {
            dispatch(setFilterAvailability(value))
            onAfterChangeAnyFilter?.()
          }}
        />
        <SearchDropdownFilter
          placeholder={tForms("category")}
          selectedValue={filters.category}
          items={
            [
              {
                value: "",
                label: tForms("any_category")
              },
              ...categories.map((category) => {
                return {
                  value: category,
                  label: t(`filters.${category}`) === "" ? category : t(`filters.${category}`)
                }
              })
            ]
          }

          onChange={(value) => {
            dispatch(setFilterCategory(value))
            onAfterChangeAnyFilter?.()
          }}
        />
        <SearchDropdownFilter
          placeholder={tForms("price_range")}
          selectedValue={filters.price_range}
          items={[
            {
              value: "",
              label: tForms("any_price"),
            },
            {
              value: "under-50",
              label: `${tForms("under")} €50`,
            },
            {
              value: "between-50-100",
              label: "€50 - €100",
            },
            {
              value: "between-100-150",
              label: "€100 - €150",
            },
            {
              value: "over-150",
              label: `${tForms("over")} €150`,
            }
          ]}

          onChange={(value) => {
            dispatch(setFilterPriceRange(value))
            onAfterChangeAnyFilter?.()
          }}
        />
        <SearchDropdownFilter
          placeholder={tForms("duration")}
          selectedValue={filters.duration}
          items={
            [
              {
                value: "",
                label: tForms("any_duration")
              },
              ...durations.map((duration) => {
                return {
                  value: duration,
                  label: tForms(duration)
                }
              })
            ]
          }

          onChange={(value) => {
            dispatch(setFilterDuration(value))
            onAfterChangeAnyFilter?.()
          }}
        />
      </div>
    </>
  );
}
