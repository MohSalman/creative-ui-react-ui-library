import React from 'react';
import { cn } from '../../utils';
import './maincontent.css';

export interface MainContentProps extends React.HTMLAttributes<HTMLElement> {
  /** Page content */
  children?: React.ReactNode;
  /** Max width constraint */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Padding */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Root class name */
  className?: string;
}

export const MainContent: React.FC<MainContentProps> = ({
  children,
  maxWidth = 'lg',
  padding = 'md',
  className,
  ...props
}) => {
  return (
    <main
      className={cn(
        'maincontent',
        `maincontent--max-${maxWidth}`,
        `maincontent--padding-${padding}`,
        className
      )}
      {...props}
    >
      {children}
    </main>
  );
};

MainContent.displayName = 'MainContent';
