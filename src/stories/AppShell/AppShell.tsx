import React from 'react';
import { cn } from '../../utils';
import './appshell.css';

export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Top header/nav */
  header?: React.ReactNode;
  /** Sidebar (left or right) */
  sidebar?: React.ReactNode;
  /** Sidebar position */
  sidebarPosition?: 'left' | 'right';
  /** Main content */
  children?: React.ReactNode;
  /** Footer */
  footer?: React.ReactNode;
  /** Root class name */
  className?: string;
}

export const AppShell: React.FC<AppShellProps> = ({
  header,
  sidebar,
  sidebarPosition = 'left',
  children,
  footer,
  className,
  ...props
}) => {
  return (
    <div className={cn('appshell', className)} {...props}>
      {header && <div className="appshell-header">{header}</div>}
      <div className={cn('appshell-body', !!sidebar && 'appshell-body--with-sidebar')}>
        {sidebar && (
          <div
            className={cn(
              'appshell-sidebar',
              `appshell-sidebar--${sidebarPosition}`
            )}
          >
            {sidebar}
          </div>
        )}
        <div className="appshell-main">
          {children}
          {footer && <div className="appshell-footer">{footer}</div>}
        </div>
      </div>
    </div>
  );
};

AppShell.displayName = 'AppShell';
