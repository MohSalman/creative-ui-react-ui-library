import React from 'react';
import { cn } from '../../utils';
import './topnav.css';

export interface TopNavProps extends React.HTMLAttributes<HTMLElement> {
  /** Brand/logo area */
  brand?: React.ReactNode;
  /** Navigation items (center or left of actions) */
  children?: React.ReactNode;
  /** Actions (right side, e.g. buttons) */
  actions?: React.ReactNode;
  /** Sticky to top when scrolling */
  sticky?: boolean;
  /** Root class name */
  className?: string;
}

export const TopNav: React.FC<TopNavProps> = ({
  brand,
  children,
  actions,
  sticky = false,
  className,
  ...props
}) => {
  return (
    <nav
      className={cn('topnav', sticky && 'topnav--sticky', className)}
      {...props}
    >
      {brand && <div className="topnav-brand">{brand}</div>}
      {children && <div className="topnav-nav">{children}</div>}
      {actions && <div className="topnav-actions">{actions}</div>}
    </nav>
  );
};

TopNav.displayName = 'TopNav';
