import React, { useRef, useState, useCallback } from 'react';
import { cn } from '../../utils';
import './otpinput.css';

export interface OTPInputProps {
  /** Number of digits */
  length?: number;
  /** Current value (controlled) */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Additional class */
  className?: string;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  value: valueProp,
  onChange,
  disabled = false,
  error = false,
  className,
}) => {
  const [internalValue, setInternalValue] = useState('');
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : internalValue;
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const updateValue = useCallback(
    (newVal: string) => {
      const sanitized = newVal.replace(/\D/g, '').slice(0, length);
      if (!isControlled) setInternalValue(sanitized);
      onChange?.(sanitized);
    },
    [length, isControlled, onChange]
  );

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/\D/g, '');
    if (v.length > 1) {
      const chars = v.split('').slice(0, length);
      const newVal = [...Array(length)].map((_, i) => chars[i] ?? value[i] ?? '').join('');
      updateValue(newVal);
      const next = Math.min(index + v.length, length - 1);
      inputsRef.current[next]?.focus();
      return;
    }
    const newVal = value.split('');
    newVal[index] = v;
    updateValue(newVal.join(''));
    if (v && index < length - 1) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    updateValue(pasted);
    const next = Math.min(pasted.length, length - 1);
    inputsRef.current[next]?.focus();
  };

  return (
    <div className={cn('otp-input-root', error && 'otp-input-root--error', className)} onPaste={handlePaste}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { inputsRef.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={length}
          autoComplete="one-time-code"
          value={value[i] ?? ''}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          disabled={disabled}
          className="otp-input-digit"
          aria-label={`Digit ${i + 1} of ${length}`}
        />
      ))}
    </div>
  );
};

OTPInput.displayName = 'OTPInput';
