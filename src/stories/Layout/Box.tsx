import React from 'react';
import { cn } from '../../utils';
import './layout.css';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Padding size */
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg';
  /** Margin size */
  margin?: 'none' | 'xs' | 'sm' | 'md' | 'lg';
  /** Background color variant */
  background?: 'transparent' | 'subtle' | 'muted' | 'surface';
  /** Border radius */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  /** Border style */
  border?: 'none' | 'subtle' | 'default';
  /** As prop - render as different element */
  as?: React.ElementType;
}

export const Box: React.FC<BoxProps> = ({
  padding = 'none',
  margin = 'none',
  background = 'transparent',
  rounded = 'none',
  border = 'none',
  as: Component = 'div' as React.ElementType,
  className,
  children,
  ...props
}) => {
  return (
    <Component
      className={cn(
        'layout-box',
        padding !== 'none' && `layout-box--p-${padding}`,
        margin !== 'none' && `layout-box--m-${margin}`,
        background !== 'transparent' && `layout-box--bg-${background}`,
        rounded !== 'none' && `layout-box--rounded-${rounded}`,
        border !== 'none' && `layout-box--border-${border}`,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

Box.displayName = 'Box';
