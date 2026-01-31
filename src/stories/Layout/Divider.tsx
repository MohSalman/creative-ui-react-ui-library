import React from 'react';
import { cn } from '../../utils';
import './layout.css';

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Variant / weight */
  variant?: 'solid' | 'dashed' | 'dotted';
  /** Spacing around the divider */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  variant = 'solid',
  spacing = 'md',
  className,
  ...props
}) => {
  return (
    <hr
      className={cn(
        'layout-divider',
        `layout-divider--${orientation}`,
        `layout-divider--${variant}`,
        spacing !== 'none' && `layout-divider--spacing-${spacing}`,
        className
      )}
      role="separator"
      {...props}
    />
  );
};

Divider.displayName = 'Divider';
