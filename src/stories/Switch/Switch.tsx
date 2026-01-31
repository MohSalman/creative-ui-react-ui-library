import { forwardRef, useId } from 'react';
import './switch.css';
import { cn } from '../../utils';

export type SwitchVariant = 'with-text' | 'without-text';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Variant: show label beside the switch or just the switch */
  variant?: SwitchVariant;
  /** Label text (when variant is "with-text") */
  label?: React.ReactNode;
  /** Size */
  size?: 'small' | 'medium' | 'large';
  /** Root class name */
  className?: string;
  /** Disabled state */
  disabled?: boolean;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
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
      'switch-root',
      `switch-root--${variant}`,
      size && `switch-root--${size}`,
      disabled && 'switch-root--disabled',
      className
    );

    return (
      <label htmlFor={inputId} className={rootClassName}>
        <input
          ref={ref}
          type="checkbox"
          id={inputId}
          role="switch"
          disabled={disabled}
          className="switch-input"
          aria-label={variant === 'without-text' ? (typeof label === 'string' ? label : 'Toggle') : undefined}
          {...inputProps}
        />
        <span className="switch-track" aria-hidden>
          <span className="switch-thumb" />
        </span>
        {hasLabel && <span className="switch-label-text">{label}</span>}
      </label>
    );
  }
);

Switch.displayName = 'Switch';
