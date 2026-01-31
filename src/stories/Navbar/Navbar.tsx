import React from 'react';
import { cn } from '../../utils';
import './navbar.css';

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  /** Brand/logo */
  brand?: React.ReactNode;
  /** Navigation links */
  children?: React.ReactNode;
  /** Right-side actions */
  actions?: React.ReactNode;
  /** Variant */
  variant?: 'default' | 'minimal' | 'elevated';
  /** Root class name */
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  brand,
  children,
  actions,
  variant = 'default',
  className,
  ...props
}) => {
  return (
    <nav className={cn('navbar', `navbar--${variant}`, className)} {...props}>
      {brand && <div className="navbar-brand">{brand}</div>}
      {children && <div className="navbar-nav">{children}</div>}
      {actions && <div className="navbar-actions">{actions}</div>}
    </nav>
  );
};

Navbar.displayName = 'Navbar';
