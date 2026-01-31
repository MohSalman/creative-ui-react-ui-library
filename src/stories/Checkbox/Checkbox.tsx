import { forwardRef, useId } from 'react';
import './checkbox.css';
import { cn } from '../../utils';

export type CheckboxVariant = 'with-text' | 'without-text';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Variant: show label text beside the checkbox or just the box */
  variant?: CheckboxVariant;
  /** Label text (when variant is "with-text") */
  label?: React.ReactNode;
  /** Size of the checkbox */
  size?: 'small' | 'medium' | 'large';
  /** Wrapper class name */
  className?: string;
  /** Disabled state */
  disabled?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      variant = 'with-text',
      label,
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
      'checkbox-root',
      `checkbox-root--${variant}`,
      size && `checkbox-root--${size}`,
      disabled && 'checkbox-root--disabled',
      className
    );

    const content = (
      <>
        <input
          ref={ref}
          type="checkbox"
          id={inputId}
          disabled={disabled}
          className="checkbox-input"
          aria-label={variant === 'without-text' ? (typeof label === 'string' ? label : 'Checkbox') : undefined}
          {...inputProps}
        />
        <span className="checkbox-box" aria-hidden />
        {hasLabel && (
          <span className="checkbox-label-text">{label}</span>
        )}
      </>
    );

    return (
      <label htmlFor={inputId} className={rootClassName}>
        {content}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
