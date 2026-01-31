import React from 'react';
import { cn } from '../../utils';
import './sidebar.css';

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Sidebar content (e.g. nav items) */
  children?: React.ReactNode;
  /** Position: left or right */
  position?: 'left' | 'right';
  /** Width */
  width?: 'narrow' | 'default' | 'wide';
  /** Collapsed state (controlled) */
  collapsed?: boolean;
  /** Root class name */
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  children,
  position = 'left',
  width = 'default',
  collapsed = false,
  className,
  ...props
}) => {
  return (
    <aside
      className={cn(
        'sidebar',
        `sidebar--${position}`,
        `sidebar--${width}`,
        collapsed && 'sidebar--collapsed',
        className
      )}
      {...props}
    >
      <div className="sidebar-inner">{children}</div>
    </aside>
  );
};

Sidebar.displayName = 'Sidebar';
