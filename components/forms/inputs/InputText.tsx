import IconText from '@/components/buttons/IconText';
import ZIcon, { ZIconType } from '@/components/icons/ZIcon';
import Title from '@/components/typography/Title';
import React, { useState, ChangeEvent, FocusEvent } from 'react';

// Define the available validation rules that can be passed to the component
export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  email?: boolean;
  customValidate?: (value: string) => string | null; // Returns error message string, or null if valid
}

interface InputTextProps {
  id?: string;
  name?: string;
  label?: string | React.ReactNode;
  type?: 'text' | 'password' | 'email' | 'tel' | 'url' | 'number' | 'textarea';
  placeholder?: string;
  disabled?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  validation?: ValidationRules;
  // Event hooks to notify the parent component when validation state changes
  onError?: (errorMsg: string | null) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: any) => void;
  onPaste?: (e: any) => void;
  showLabel?: boolean;
  className?: string;
  showLabelIconText?: boolean;
  labelIconType?: ZIconType;
  stripeElement?: React.ReactNode;
  inputIcon?: ZIconType;
  inputIconPosition?: 'icon-position-start' | 'icon-position-end';
  showBigLabel?: {
    title: string;
    subtitle: string;
  } | null;
}

export default function InputText({
  id = "",
  name = "",
  label = "",
  type = 'text',
  placeholder = '',
  disabled = false,
  value,
  onChange,
  validation,
  onError,
  onBlur,
  onKeyDown,
  onPaste,
  showLabel = false,
  className = "",
  showLabelIconText = false,
  labelIconType,
  stripeElement = undefined,
  inputIcon = undefined,
  inputIconPosition = 'icon-position-start',
  showBigLabel = null
}: InputTextProps) {
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // The core validation logic execution engine
  const validateField = (val: string): string | null => {
    if (!validation) return null;

    console.log("Validation is processing...");

    const { required, minLength, maxLength, pattern, customValidate } = validation;

    // 1. Required Check
    if (required && (!val || val.trim() === '')) {
      return 'This field is required.';
    }

    // Skip further validations if empty and not required
    if (!val || val.trim() === '') return null;

    // 2. Minimum Length Check
    if (minLength && val.length < minLength) {
      return `Minimum length is ${minLength} characters.`;
    }

    // 3. Maximum Length Check
    if (maxLength && val.length > maxLength) {
      return `Maximum length cannot exceed ${maxLength} characters.`;
    }

    // 4. Native Engine & Regex Patterns
    if (type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) return 'Please enter a valid email address.';
    }

    if (type === 'tel') {
      const telRegex = /^[+]?[0-9\s\-()]{7,15}$/;
      if (!telRegex.test(val)) return 'Please enter a valid telephone number.';
    }

    if (pattern && !pattern.test(val)) {
      return 'The format entered is invalid.';
    }

    // 5. Custom Business Logic Override Hook
    if (customValidate) {
      return customValidate(val);
    }

    return null;
  }

  const handleValidation = (val: string) => {
    const errorMsg = validateField(val);
    setError(errorMsg);

    // Bubble up the error message event to the parent container if needed
    if (onError) {
      onError(errorMsg);
    }
  };

  const handleInputChange = (e: any) => {
    onChange(e);
    // If the user already interacted, validate dynamically on keystroke
    if (touched) {
      handleValidation(e.target.value);
    }
  };

  const handleInputBlur = (e: any) => {
    setTouched(true);
    handleValidation(e.target.value);

    if (onBlur) {
      onBlur(e);
    }
  };

  // Determine standard Bootstrap 5 validation classes
  const inputClass = `form-control ${touched ? (error ? 'z-invalid' : 'z-valid') : ''
    } `;

  return (
    <div className={`component z-input ${className} ${inputIconPosition} ${inputIcon !== undefined ? 'have-icon' : ''}`}>
      {
        showLabel && (
          <label htmlFor={id} className="form-label fw-semibold">
            <Title headingType='p' headingStyle='Text-sm-Regular' color='--color-text-fg'>{label}
              {validation?.required && <span className="text-danger ms-1">*</span>}</Title>
          </label>
        )
      }

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
        showLabelIconText && <IconText type='icon-text-for-input-label' text={label} iconType={labelIconType || "none"} />
      }

      <div className="input-wrap">
        {
          (() => {
            if (stripeElement !== undefined)
              return <div className="stripe-input-wrap">
                {stripeElement}
              </div>;
            if (type === "textarea")
              return <textarea
                id={id}
                name={name}
                className={inputClass}
                placeholder={placeholder}
                value={value}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyDown={onKeyDown}
                onPaste={onPaste}
                disabled={disabled}
              />;
            return <input
              id={id}
              name={name}
              type={type === "password" ? (
                showPassword ? "text" : "password"
              ) : type}
              className={inputClass}
              placeholder={placeholder}
              value={value}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={onKeyDown}
              onPaste={onPaste}
              disabled={disabled}
            />;
          })()

        }

        {
          type === "password" && <div className="button-show-password" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <ZIcon type='eye-closed' /> : <ZIcon type='eye' />}
          </div>
        }

        {
          inputIcon !== undefined && <ZIcon type={inputIcon} />
        }

      </div>



      {/* Bootstrap Form Feedback Elements */}
      {touched && error && (
        <div className="invalid-feedback d-block mt-1">
          {error}
        </div>
      )}

    </div>
  );
}