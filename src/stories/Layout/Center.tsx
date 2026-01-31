import React from 'react';
import { cn } from '../../utils';
import './layout.css';

export interface CenterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Center horizontally and vertically (default) or only one axis */
  axis?: 'both' | 'horizontal' | 'vertical';
  /** Inner max width to constrain centered content */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Minimum height (e.g. for vertical centering in a section) */
  minHeight?: string | number;
  /** As prop */
  as?: React.ElementType;
}

export const Center: React.FC<CenterProps> = ({
  axis = 'both',
  maxWidth,
  minHeight,
  as: Component = 'div' as React.ElementType,
  className,
  style,
  children,
  ...props
}) => {
  const mergedStyle: React.CSSProperties = { ...style };
  if (minHeight !== undefined) {
    mergedStyle.minHeight = typeof minHeight === 'number' ? `${minHeight}px` : minHeight;
  }

  return (
    <Component
      className={cn(
        'layout-center',
        `layout-center--${axis}`,
        maxWidth && `layout-center--max-${maxWidth}`,
        className
      )}
      style={mergedStyle}
      {...props}
    >
      {children}
    </Component>
  );
};

Center.displayName = 'Center';
