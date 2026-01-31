import React from 'react';
import { cn } from '../../utils';
import './pagelayout.css';

export interface PageLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Header slot */
  header?: React.ReactNode;
  /** Main content */
  children?: React.ReactNode;
  /** Footer slot */
  footer?: React.ReactNode;
  /** Root class name */
  className?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  header,
  children,
  footer,
  className,
  ...props
}) => {
  return (
    <div className={cn('pagelayout', className)} {...props}>
      {header && <div className="pagelayout-header">{header}</div>}
      <div className="pagelayout-main">{children}</div>
      {footer && <div className="pagelayout-footer">{footer}</div>}
    </div>
  );
};

PageLayout.displayName = 'PageLayout';
