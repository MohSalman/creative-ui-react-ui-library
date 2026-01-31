import { forwardRef, useId } from 'react';
import './radio.css';
import { cn } from '../../utils';

export type RadioVariant = 'with-text' | 'without-text';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Variant: show label text beside the radio or just the circle */
  variant?: RadioVariant;
  /** Label text (when variant is "with-text") */
  label?: React.ReactNode;
  /** Name for the radio group (required for grouping) */
  name?: string;
  /** Size of the radio */
  size?: 'small' | 'medium' | 'large';
  /** Wrapper class name */
  className?: string;
  /** Disabled state */
  disabled?: boolean;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      variant = 'with-text',
      label,
      name,
      size = 'medium',
      className,
      disabled = false,
      id: idProp,
      ...inputProps
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = idProp ?? generatedId;
    const hasLabel = variant === 'with-text' && (label !== undefined && label !== null && label !== '');

    const rootClassName = cn(
      'radio-root',
      `radio-root--${variant}`,
      size && `radio-root--${size}`,
      disabled && 'radio-root--disabled',
      className
    );

    return (
      <label htmlFor={inputId} className={rootClassName}>
        <input
          ref={ref}
          type="radio"
          id={inputId}
          name={name}
          disabled={disabled}
          className="radio-input"
          aria-label={variant === 'without-text' ? (typeof label === 'string' ? label : 'Option') : undefined}
          {...inputProps}
        />
        <span className="radio-dot" aria-hidden />
        {hasLabel && (
          <span className="radio-label-text">{label}</span>
        )}
      </label>
    );
  }
);

Radio.displayName = 'Radio';
