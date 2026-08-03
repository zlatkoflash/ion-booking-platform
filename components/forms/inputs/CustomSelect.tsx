'use client';

import { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ZIcon from '@/components/icons/ZIcon';
import Title from '@/components/typography/Title';
import { ValidationRules } from './InputText';

interface SelectOption {
  value: string | number;
  label: string;
}

interface CustomSelectProps {
  options: SelectOption[];
  placeholder?: string;
  onChange?: (value: string | number, object: SelectOption | null) => void;
  initialValue?: string | number | null;
  label?: string | React.ReactNode;
  showLabel?: boolean;
  validation?: ValidationRules;
  showBigLabel?: {
    title: string;
    subtitle: string;
  } | null;
  addCheckOnSelectedValue?: boolean;
  size?: "size-normal" | "size-small";
}

export default function CustomSelect(
  {
    options,
    placeholder = "Select an option",
    onChange,
    initialValue = null,
    label = "",
    showLabel = false,
    validation,
    showBigLabel = null,
    addCheckOnSelectedValue = false,
    size = "size-normal",
  }:
    CustomSelectProps) {
  const [selected, setSelected] = useState<string | number | null>(initialValue);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: SelectOption) => {
    setSelected(option.value);
    setIsOpen(false);
    if (onChange) onChange(option.value, option);
  };

  return (
    <div className="z-input">

      {
        showBigLabel !== null && <>
          <label className="big-label">
            {
              showBigLabel.title !== "" && <Title headingType='h3' headingStyle='Display-xs-Medium' color='--color-text-fg'>{showBigLabel.title}</Title>
            }
            {
              showBigLabel.subtitle !== "" && <Title headingType='p' headingStyle='Text-md-Regular' color='--color-text-fg-subtle'>{showBigLabel.subtitle}</Title>
            }
          </label>
        </>
      }

      {
        showLabel && (
          <label className="form-label fw-semibold">
            <Title headingType='p' headingStyle='Text-sm-Regular' color='--color-text-fg'>{label}
              {validation?.required && <span className="text-danger ms-1">*</span>}</Title>
          </label>
        )
      }

      <div className={`dropdown  custom-select ${isOpen ? 'active' : ''}`} ref={dropdownRef}>
        <button
          className={`custom-select-dropdown-button ${size}`}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selected ? options.find((option) => option.value === selected)?.label : placeholder}
          <ZIcon type='arrow-right' />
        </button>

        <ul className={`dropdown-menu  ${isOpen ? 'show' : ''}`}>
          {options.map((option) => (
            <li key={option.value}>
              <button
                className="dropdown-item"
                type="button"
                onClick={() => handleSelect(option)}
              >
                {option.label}
                {addCheckOnSelectedValue && selected === option.value && <ZIcon type='check' />}
              </button>
            </li>
          ))}
        </ul>

        {/* Hidden input for form submission */}
        <input type="hidden" value={selected || ''} />
      </div>
    </div>
  );
}