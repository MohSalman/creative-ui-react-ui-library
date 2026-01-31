import React from 'react';
import { cn } from '../../utils';
import './footer.css';

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /** Footer content */
  children?: React.ReactNode;
  /** Variant style */
  variant?: 'default' | 'minimal' | 'centered';
  /** Root class name */
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({
  children,
  variant = 'default',
  className,
  ...props
}) => {
  return (
    <footer
      className={cn('footer', `footer--${variant}`, className)}
      {...props}
    >
      {children}
    </footer>
  );
};

Footer.displayName = 'Footer';
