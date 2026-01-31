import React, { useId } from 'react';
import { cn } from '../../utils';
import './formfield.css';

export interface FormFieldProps {
  /** Label text */
  label?: string;
  /** Control element (Input, Select, etc.) */
  children: React.ReactNode;
  /** Helper or description text */
  helperText?: string;
  /** Error message; when set, shows error state */
  error?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Id for the control; links label via htmlFor */
  id?: string;
  /** Additional class for the root */
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  children,
  helperText,
  error,
  required,
  id: idProp,
  className,
}) => {
  const generatedId = useId();
  const fieldId = idProp ?? generatedId;
  const displayHelper = error ?? helperText;

  return (
    <div className={cn('formfield-root', error && 'formfield-root--error', className)}>
      {label && (
        <label htmlFor={fieldId} className="formfield-label">
          {label}
          {required && <span className="formfield-required" aria-hidden> *</span>}
        </label>
      )}
      <div className="formfield-control">
        {React.isValidElement(children)
          ? React.cloneElement(children as React.ReactElement<{ id?: string }>, { id: fieldId })
          : children}
      </div>
      {displayHelper && (
        <p
          className={cn('formfield-helper', error && 'formfield-helper--error')}
          role={error ? 'alert' : undefined}
        >
          {displayHelper}
        </p>
      )}
    </div>
  );
};

FormField.displayName = 'FormField';
