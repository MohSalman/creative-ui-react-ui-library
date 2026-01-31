import React from 'react';
import { cn } from '../../utils';
import './layout.css';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Direction: vertical (column) or horizontal (row) */
  direction?: 'vertical' | 'horizontal';
  /** Gap between children */
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Horizontal alignment (cross-axis) */
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  /** Vertical alignment (main-axis for row, cross for column) */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  /** Wrap items */
  wrap?: boolean;
  /** As prop */
  as?: React.ElementType;
}

export const Stack: React.FC<StackProps> = ({
  direction = 'vertical',
  gap = 'md',
  align,
  justify,
  wrap = false,
  as: Component = 'div' as React.ElementType,
  className,
  children,
  ...props
}) => {
  return (
    <Component
      className={cn(
        'layout-stack',
        `layout-stack--${direction}`,
        gap !== 'none' && `layout-stack--gap-${gap}`,
        align && `layout-stack--align-${align}`,
        justify && `layout-stack--justify-${justify}`,
        wrap && 'layout-stack--wrap',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

Stack.displayName = 'Stack';
