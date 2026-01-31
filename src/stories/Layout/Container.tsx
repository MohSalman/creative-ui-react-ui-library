import React from 'react';
import { cn } from '../../utils';
import './layout.css';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Max width variant */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Center the container */
  center?: boolean;
  /** Horizontal padding */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** As prop */
  as?: React.ElementType;
}

export const Container: React.FC<ContainerProps> = ({
  maxWidth = 'lg',
  center = true,
  padding = 'md',
  as: Component = 'div' as React.ElementType,
  className,
  children,
  ...props
}) => {
  return (
    <Component
      className={cn(
        'layout-container',
        `layout-container--${maxWidth}`,
        center && 'layout-container--center',
        padding !== 'none' && `layout-container--padding-${padding}`,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

Container.displayName = 'Container';
