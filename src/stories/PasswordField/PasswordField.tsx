import React, { forwardRef } from 'react';
import { Input, type InputProps } from '../Input/Input';

export interface PasswordFieldProps extends Omit<InputProps, 'type'> {
  /** Always show password toggle (eye icon) */
  showToggle?: boolean;
}

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ showToggle = true, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        type="password"
        showPasswordToggle={showToggle}
        autoComplete="current-password"
        {...props}
      />
    );
  }
);

PasswordField.displayName = 'PasswordField';
