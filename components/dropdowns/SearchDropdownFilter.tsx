"use client";

import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import dropdownIcon from "@/assets/images/icon-arrow-menu-down.svg";

interface DropdownItem {
  value: string;
  label: string;
}

interface SearchDropdownFilterProps {
  items: DropdownItem[];
  placeholder?: string;
  onChange?: (value: string) => void;
  selectedValue?: string;
}

export default function SearchDropdownFilter({
  items = [],
  placeholder = "Select option",
  onChange,
  selectedValue = ""
}: SearchDropdownFilterProps) {
  // const [selectedValue, setSelectedValue] = useState<string>(selectedFilterValue);

  const currentLabel =
    items.find((item) => item.value === selectedValue)?.label || placeholder;

  const handleSelect = (value: string | null) => {
    if (value === null) return;

    // setSelectedValue(value);

    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Dropdown
      onSelect={handleSelect}
      className="component filter-location-dropdown"
    >
      <Dropdown.Toggle
        variant="light"
        className="component btn-dropdown-location-filter"
      >
        <span className={`text`}>{currentLabel}</span>
        <img
          className="arrow-dropdown"
          src={dropdownIcon.src}
          alt="Fitler Locations Dropdown"
        />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {items.map((item) => (
          <Dropdown.Item
            key={item.value}
            eventKey={item.value}
            active={selectedValue === item.value}
          >
            {item.label}
          </Dropdown.Item>
        ))}

        {items.length === 0 && (
          <Dropdown.Item disabled>No options available</Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}
