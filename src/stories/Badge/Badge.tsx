import React from 'react';
import { cn } from '../../utils';
import './badge.css';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}) => (
  <span
    className={cn('badge', `badge--${variant}`, `badge--${size}`, className)}
    {...props}
  >
    {children}
  </span>
);

Badge.displayName = 'Badge';
