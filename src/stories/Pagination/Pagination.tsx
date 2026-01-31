import React from 'react';
import { cn } from '../../utils';
import './pagination.css';

export interface PaginationProps {
  /** Current page (1-based) */
  page: number;
  /** Total number of pages */
  totalPages: number;
  /** Called when page changes */
  onPageChange: (page: number) => void;
  /** Show first/last buttons */
  showFirstLast?: boolean;
  /** Max visible page buttons (default 5) */
  siblingCount?: number;
  /** Root class name */
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
  showFirstLast = true,
  siblingCount = 1,
  className,
}) => {
  const range = (start: number, end: number) => {
    const len = end - start + 1;
    return Array.from({ length: len }, (_, i) => start + i);
  };

  const getRange = () => {
    const left = Math.max(1, page - siblingCount);
    const right = Math.min(totalPages, page + siblingCount);
    return range(left, right);
  };

  const pages = getRange();

  return (
    <nav aria-label="Pagination" className={cn('pagination', className)}>
      <ul className="pagination-list">
        {showFirstLast && (
          <li>
            <button
              type="button"
              className="pagination-btn"
              disabled={page <= 1}
              onClick={() => onPageChange(1)}
              aria-label="First page"
            >
              ‹‹
            </button>
          </li>
        )}
        <li>
          <button
            type="button"
            className="pagination-btn"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            aria-label="Previous page"
          >
            ‹
          </button>
        </li>
        {pages[0] > 1 && (
          <>
            <li>
              <button
                type="button"
                className="pagination-btn"
                onClick={() => onPageChange(1)}
              >
                1
              </button>
            </li>
            {pages[0] > 2 && <li className="pagination-ellipsis">…</li>}
          </>
        )}
        {pages.map((p) => (
          <li key={p}>
            <button
              type="button"
              className={cn('pagination-btn', p === page && 'pagination-btn--active')}
              onClick={() => onPageChange(p)}
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </button>
          </li>
        ))}
        {pages[pages.length - 1] < totalPages && (
          <>
            {pages[pages.length - 1] < totalPages - 1 && (
              <li className="pagination-ellipsis">…</li>
            )}
            <li>
              <button
                type="button"
                className="pagination-btn"
                onClick={() => onPageChange(totalPages)}
              >
                {totalPages}
              </button>
            </li>
          </>
        )}
        <li>
          <button
            type="button"
            className="pagination-btn"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            aria-label="Next page"
          >
            ›
          </button>
        </li>
        {showFirstLast && (
          <li>
            <button
              type="button"
              className="pagination-btn"
              disabled={page >= totalPages}
              onClick={() => onPageChange(totalPages)}
              aria-label="Last page"
            >
              ››
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

Pagination.displayName = 'Pagination';
