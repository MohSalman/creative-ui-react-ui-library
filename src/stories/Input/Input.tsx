import React, { useId, forwardRef, useState } from 'react';
import './input.css';
import { cn } from '../../utils';

export type InputVariant = 'outlined' | 'underline' | 'standard';

const VisibilityIconSvg = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const VisibilityOffIconSvg = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" x2="22" y1="2" y2="22" />
  </svg>
);

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  /** Visual variant: outlined border, underline, or no border */
  variant?: InputVariant;
  /** Label text shown above the input */
  label?: string;
  /** Id for the input element; label's htmlFor will match this. Auto-generated if not provided. */
  id?: string;
  /** Helper or error text shown below the input */
  helperText?: string;
  /** When true, shows error state and typically uses helperText for error message */
  error?: boolean;
  /** Content rendered before the input (e.g. "$", "https://") */
  prefix?: React.ReactNode;
  /** Content rendered after the input (e.g. ".com", unit) */
  postfix?: React.ReactNode;
  /** Icon or element at the start of the input (left side) */
  startIcon?: React.ReactNode;
  /** Icon or element at the end of the input (right side) */
  endIcon?: React.ReactNode;
  /** When true and type is "password", shows a clickable eye icon that toggles visibility */
  showPasswordToggle?: boolean;
  /** Optional click handler for the end icon (use when endIcon is custom and clickable) */
  onEndIconClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Size of the input */
  size?: 'small' | 'medium' | 'large';
  /** Full width of container */
  fullWidth?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Additional class for the root wrapper */
  className?: string;
  /** Additional class for the input element */
  inputClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'outlined',
      label,
      id: idProp,
      helperText,
      error = false,
      prefix,
      postfix,
      startIcon,
      endIcon,
      showPasswordToggle = false,
      onEndIconClick,
      size = 'medium',
      fullWidth = false,
      disabled = false,
      className,
      inputClassName,
      type: typeProp = 'text',
      ...inputProps
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = idProp ?? generatedId;
    const isPassword = typeProp === 'password';
    const usePasswordToggle = isPassword && showPasswordToggle;
    const [passwordVisible, setPasswordVisible] = useState(false);
    const effectiveType = usePasswordToggle ? (passwordVisible ? 'text' : 'password') : typeProp;
    const effectiveEndIcon = usePasswordToggle ? (
      <button
        type="button"
        className="input-icon-button"
        onClick={() => setPasswordVisible((v) => !v)}
        disabled={disabled}
        tabIndex={-1}
        aria-label={passwordVisible ? 'Hide password' : 'Show password'}
      >
        {passwordVisible ? <VisibilityOffIconSvg /> : <VisibilityIconSvg />}
      </button>
    ) : endIcon && onEndIconClick ? (
      <button
        type="button"
        className="input-icon-button"
        onClick={onEndIconClick}
        disabled={disabled}
        tabIndex={-1}
        aria-label="Toggle"
      >
        {endIcon}
      </button>
    ) : endIcon;
    const hasAdornment = Boolean(prefix || postfix || startIcon || effectiveEndIcon);

    const rootClassName = cn(
      'input-root',
      `input-root--${variant}`,
      size && `input-root--${size}`,
      fullWidth && 'input-root--fullWidth',
      error && 'input-root--error',
      disabled && 'input-root--disabled',
      hasAdornment && 'input-root--with-adornment',
      (startIcon ?? prefix) ? 'input-root--has-start' : undefined,
      (endIcon ?? postfix) ? 'input-root--has-end' : undefined,
      className
    );

    return (
      <div className={rootClassName}>
        {label && (
          <label htmlFor={inputId} className="input-label" id={`${inputId}-label`}>
            {label}
          </label>
        )}
        <div className="input-wrapper">
          {(startIcon || prefix) && (
            <div className="input-adornment input-adornment--start">
              {startIcon && <span className="input-icon input-icon--start">{startIcon}</span>}
              {prefix && <span className="input-prefix">{prefix}</span>}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            type={effectiveType}
            aria-labelledby={label ? `${inputId}-label` : undefined}
            aria-invalid={error}
            aria-describedby={helperText ? `${inputId}-helper` : undefined}
            disabled={disabled}
            className={cn('input-field', inputClassName)}
            {...inputProps}
          />
          {(effectiveEndIcon || postfix) && (
            <div className="input-adornment input-adornment--end">
              {postfix && <span className="input-postfix">{postfix}</span>}
              {effectiveEndIcon &&
                (React.isValidElement(effectiveEndIcon) && effectiveEndIcon.type === 'button'
                  ? effectiveEndIcon
                  : (
                    <span className="input-icon input-icon--end">{effectiveEndIcon}</span>
                  ))}
            </div>
          )}
        </div>
        {helperText && (
          <p
            id={`${inputId}-helper`}
            className={cn('input-helper-text', error && 'input-helper-text--error')}
            role={error ? 'alert' : undefined}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
