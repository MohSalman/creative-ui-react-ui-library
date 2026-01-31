import React from 'react';
import { cn } from '../../utils';
import './layout.css';

export interface SpacerProps {
  /** Size of the spacer */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Grow to fill available space (flex-grow: 1) */
  grow?: boolean;
  /** Custom size (overrides size prop) */
  customSize?: string | number;
  /** Root class name */
  className?: string;
}

export const Spacer: React.FC<SpacerProps> = ({
  size = 'md',
  grow = false,
  customSize,
  className,
}) => {
  const style: React.CSSProperties = {};
  if (customSize !== undefined) {
    const val = typeof customSize === 'number' ? `${customSize}px` : customSize;
    style.width = val;
    style.height = val;
    style.minWidth = val;
    style.minHeight = val;
  }

  return (
    <span
      className={cn(
        'layout-spacer',
        !customSize && `layout-spacer--${size}`,
        grow && 'layout-spacer--grow',
        className
      )}
      style={Object.keys(style).length > 0 ? style : undefined}
      aria-hidden
    />
  );
};

Spacer.displayName = 'Spacer';
