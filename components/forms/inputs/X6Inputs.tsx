'use client';

import React, { useRef, useState } from 'react';
import InputText from './InputText'; // Adjust your path accordingly

interface X6InputsProps {
  onComplete?: (codeString: string, codeArray: string[]) => void;
  disabled?: boolean;
}

export default function X6Inputs({ onComplete, disabled = false }: X6InputsProps) {
  const [code, setCode] = useState<string[]>(Array(6).fill(''));
  const containerRef = useRef<HTMLDivElement>(null);

  const getInputs = (): HTMLInputElement[] => {
    if (!containerRef.current) return [];
    return Array.from(containerRef.current.querySelectorAll('input'));
  };

  // Helper to check completeness and fire directly from user actions
  const checkAndTrigger = (updatedCode: string[]) => {
    const codeString = updatedCode.join('');
    if (codeString.length === 6 && onComplete) {
      onComplete(codeString, updatedCode);
    }
  };

  const handleChange = (value: string, index: number) => {
    if (disabled) return;
    const lastChar = value.slice(-1);
    const newCode = [...code];
    newCode[index] = lastChar;
    setCode(newCode);

    // Trigger immediately if complete
    checkAndTrigger(newCode);

    if (lastChar !== '' && index < 5) {
      const inputs = getInputs();
      inputs[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (disabled) return;
    const inputs = getInputs();

    if (e.key === 'Backspace') {
      if (code[index] === '') {
        if (index > 0) {
          const newCode = [...code];
          newCode[index - 1] = '';
          setCode(newCode);
          inputs[index - 1]?.focus();
        }
      } else {
        const newCode = [...code];
        newCode[index] = '';
        setCode(newCode);
      }
      e.preventDefault();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputs[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputs[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    const digits = pastedData.replace(/[^0-9a-zA-Z]/g, '').split('').slice(0, 6);

    if (digits.length > 0) {
      const newCode = Array(6).fill('');
      digits.forEach((digit, idx) => {
        newCode[idx] = digit;
      });
      setCode(newCode);

      // Trigger immediately if the paste completes the sequence
      checkAndTrigger(newCode);

      const inputs = getInputs();
      const targetFocusIndex = Math.min(digits.length - 1, 5);
      inputs[targetFocusIndex]?.focus();
    }
  };

  return (
    <div ref={containerRef} className={`input-x6-codes ${disabled ? 'disabled' : ''}`}>
      {Array.from({ length: 6 }).map((_, index) => (
        <InputText
          key={index}
          id={`verification-digit-${index}`}
          label=""
          type="text"
          name={`digit-${index}`}
          value={code[index] || ''}
          className="text-center w-100 fs-4 fw-bold"
          placeholder="-"
          // disabled={disabled}
          showLabelIconText={false}
          labelIconType="mail"
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e: any) => handleKeyDown(e, index)}
          onPaste={handlePaste}
        />
      ))}
    </div>
  );
}