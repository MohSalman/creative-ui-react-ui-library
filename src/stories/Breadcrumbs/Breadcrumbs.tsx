import React from 'react';
import { cn } from '../../utils';
import './breadcrumbs.css';

export interface BreadcrumbItem {
  label: React.ReactNode;
  href?: string;
}

export interface BreadcrumbsProps {
  /** Breadcrumb items */
  items: BreadcrumbItem[];
  /** Separator character */
  separator?: React.ReactNode;
  /** Root class name */
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = '/',
  className,
}) => {
  return (
    <nav aria-label="Breadcrumb" className={cn('breadcrumbs', className)}>
      <ol className="breadcrumbs-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="breadcrumbs-item">
              {index > 0 && (
                <span className="breadcrumbs-separator" aria-hidden>
                  {separator}
                </span>
              )}
              {item.href && !isLast ? (
                <a href={item.href} className="breadcrumbs-link">
                  {item.label}
                </a>
              ) : (
                <span
                  className={cn('breadcrumbs-current', isLast && 'breadcrumbs-current--active')}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

Breadcrumbs.displayName = 'Breadcrumbs';
