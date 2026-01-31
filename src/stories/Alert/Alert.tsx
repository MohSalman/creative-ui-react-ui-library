import React from 'react';
import { cn } from '../../utils';
import './alert.css';

export interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({ variant = 'info', title, children, onClose, className }) => (
  <div className={cn('alert', `alert--${variant}`, className)} role="alert">
    <div className="alert-content">
      {title && <p className="alert-title">{title}</p>}
      <p className="alert-message">{children}</p>
    </div>
    {onClose && (
      <button type="button" className="alert-close" onClick={onClose} aria-label="Close">
        ×
      </button>
    )}
  </div>
);

Alert.displayName = 'Alert';
