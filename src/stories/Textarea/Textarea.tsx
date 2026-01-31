import React, { useId, forwardRef } from 'react';
import './textarea.css';
import { cn } from '../../utils';

export type TextareaVariant = 'outlined' | 'underline' | 'standard';

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /** Visual variant */
  variant?: TextareaVariant;
  /** Label above the textarea */
  label?: string;
  /** Id for the textarea; label htmlFor matches this */
  id?: string;
  /** Helper or error text below */
  helperText?: string;
  /** Error state */
  error?: boolean;
  /** Size */
  size?: 'small' | 'medium' | 'large';
  /** Full width */
  fullWidth?: boolean;
  /** Disabled */
  disabled?: boolean;
  /** Resize behavior: vertical, horizontal, both, none */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  /** Root class name */
  className?: string;
  /** Textarea class name */
  textareaClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      variant = 'outlined',
      label,
      id: idProp,
      helperText,
      error = false,
      size = 'medium',
      fullWidth = false,
      disabled = false,
      resize = 'vertical',
      className,
      textareaClassName,
      rows = 3,
      ...textareaProps
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = idProp ?? generatedId;

    const rootClassName = cn(
      'textarea-root',
      `textarea-root--${variant}`,
      size && `textarea-root--${size}`,
      fullWidth && 'textarea-root--fullWidth',
      error && 'textarea-root--error',
      disabled && 'textarea-root--disabled',
      className
    );

    return (
      <div className={rootClassName}>
        {label && (
          <label htmlFor={inputId} className="textarea-label" id={`${inputId}-label`}>
            {label}
          </label>
        )}
        <div className="textarea-wrapper">
          <textarea
            ref={ref}
            id={inputId}
            rows={rows}
            aria-labelledby={label ? `${inputId}-label` : undefined}
            aria-invalid={error}
            aria-describedby={helperText ? `${inputId}-helper` : undefined}
            disabled={disabled}
            className={cn('textarea-field', `textarea-field--resize-${resize}`, textareaClassName)}
            {...textareaProps}
          />
        </div>
        {helperText && (
          <p
            id={`${inputId}-helper`}
            className={cn('textarea-helper', error && 'textarea-helper--error')}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
