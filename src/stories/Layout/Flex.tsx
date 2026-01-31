import React from 'react';
import { cn } from '../../utils';
import './layout.css';

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Flex direction */
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  /** Gap between children */
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Align items (cross-axis) */
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  /** Justify content (main-axis) */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  /** Wrap */
  wrap?: boolean | 'reverse';
  /** Flex grow for the container */
  grow?: boolean;
  /** Flex shrink */
  shrink?: boolean;
  /** As prop */
  as?: React.ElementType;
}

export const Flex: React.FC<FlexProps> = ({
  direction = 'row',
  gap = 'none',
  align,
  justify,
  wrap = false,
  grow = false,
  shrink = true,
  as: Component = 'div' as React.ElementType,
  className,
  children,
  ...props
}) => {
  const wrapClass =
    wrap === true ? 'layout-flex--wrap' : wrap === 'reverse' ? 'layout-flex--wrap-reverse' : '';
  return (
    <Component
      className={cn(
        'layout-flex',
        `layout-flex--${direction}`,
        gap !== 'none' && `layout-flex--gap-${gap}`,
        align && `layout-flex--align-${align}`,
        justify && `layout-flex--justify-${justify}`,
        wrapClass,
        grow && 'layout-flex--grow',
        !shrink && 'layout-flex--no-shrink',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

Flex.displayName = 'Flex';
