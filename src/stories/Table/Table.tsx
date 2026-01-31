import React, { useState, useMemo } from 'react';
import './table.css';
import { cn } from '../../utils';

export type SortDirection = 'asc' | 'desc';

export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface TableProps<T = Record<string, unknown>> {
  /** Column definitions */
  columns: TableColumn<T>[];
  /** Row data */
  data: T[];
  /** Enable sorting (default true) */
  sortable?: boolean;
  /** Controlled sort key */
  sortBy?: string;
  /** Controlled sort direction */
  sortDirection?: SortDirection;
  /** Called when sort changes */
  onSortChange?: (key: string, direction: SortDirection) => void;
  /** Enable pagination (default true) */
  pagination?: boolean;
  /** Rows per page (default 10) */
  pageSize?: number;
  /** Controlled current page (1-based) */
  page?: number;
  /** Called when page changes */
  onPageChange?: (page: number) => void;
  /** Page size options for selector (e.g. [5, 10, 25, 50]) */
  pageSizeOptions?: number[];
  /** Called when page size changes */
  onPageSizeChange?: (pageSize: number) => void;
  /** Row key extractor for React keys (default: index) */
  getRowKey?: (row: T, index: number) => string | number;
  /** Striped rows */
  striped?: boolean;
  /** Bordered table */
  bordered?: boolean;
  /** Size */
  size?: 'small' | 'medium' | 'large';
  /** Root class name */
  className?: string;
}

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  sortable = true,
  sortBy: sortByProp,
  sortDirection: sortDirectionProp,
  onSortChange,
  pagination = true,
  pageSize: pageSizeProp = 10,
  page: pageProp,
  onPageChange,
  pageSizeOptions = [5, 10, 25, 50],
  onPageSizeChange,
  getRowKey = (_, i) => i,
  striped = false,
  bordered = true,
  size = 'medium',
  className,
}: TableProps<T>) {
  const [internalSortBy, setInternalSortBy] = useState<string | null>(null);
  const [internalSortDir, setInternalSortDir] = useState<SortDirection>('asc');
  const [internalPage, setInternalPage] = useState(1);
  const [internalPageSize, setInternalPageSize] = useState(pageSizeProp);

  const isSortControlled = sortByProp !== undefined;
  const sortBy = isSortControlled ? sortByProp ?? null : internalSortBy;
  const sortDirection = isSortControlled ? sortDirectionProp ?? 'asc' : internalSortDir;

  const isPageControlled = pageProp !== undefined;
  const page = isPageControlled ? pageProp : internalPage;
  const pageSize = isPageControlled ? pageSizeProp : internalPageSize;

  const handleSort = (key: string) => {
    const col = columns.find((c) => c.key === key);
    if (!col?.sortable && sortable) return;
    const nextDir: SortDirection =
      sortBy === key ? (sortDirection === 'asc' ? 'desc' : 'asc') : 'asc';
    if (!isSortControlled) {
      setInternalSortBy(key);
      setInternalSortDir(nextDir);
    }
    onSortChange?.(key, nextDir);
  };

  const sortedData = useMemo(() => {
    if (!sortBy) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      const aNum = Number(aVal);
      const bNum = Number(bVal);
      const aIsNum = !Number.isNaN(aNum) && typeof aVal !== 'string';
      const bIsNum = !Number.isNaN(bNum) && typeof bVal !== 'string';
      if (aIsNum && bIsNum) {
        return sortDirection === 'asc' ? aNum - bNum : bNum - aNum;
      }
      const aStr = String(aVal ?? '');
      const bStr = String(bVal ?? '');
      const cmp = aStr.localeCompare(bStr, undefined, { numeric: true });
      return sortDirection === 'asc' ? cmp : -cmp;
    });
  }, [data, sortBy, sortDirection]);

  const totalRows = sortedData.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  const paginatedData = pagination ? sortedData.slice(start, start + pageSize) : sortedData;

  const handlePageChange = (next: number) => {
    const p = Math.min(Math.max(1, next), totalPages);
    if (!isPageControlled) setInternalPage(p);
    onPageChange?.(p);
  };

  const handlePageSizeChange = (newSize: number) => {
    if (!isPageControlled) {
      setInternalPageSize(newSize);
      setInternalPage(1);
    }
    onPageSizeChange?.(newSize);
  };

  const rootClassName = cn(
    'table-root',
    bordered && 'table-root--bordered',
    striped && 'table-root--striped',
    size && `table-root--${size}`,
    className
  );

  return (
    <div className={rootClassName}>
      <div className="table-wrap">
        <table className="table">
          <thead className="table-head">
            <tr className="table-head-row">
              {columns.map((col) => {
                const canSort = (col.sortable !== false && sortable) || col.sortable;
                const isSorted = sortBy === col.key;
                return (
                  <th
                    key={col.key}
                    className={cn(
                      'table-cell table-cell--head',
                      col.align && `table-cell--${col.align}`,
                      canSort && 'table-cell--sortable',
                      isSorted && 'table-cell--sorted'
                    )}
                    scope="col"
                    tabIndex={canSort ? 0 : undefined}
                    onClick={() => canSort && handleSort(col.key)}
                    onKeyDown={(e) => {
                      if (canSort && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault();
                        handleSort(col.key);
                      }
                    }}
                    aria-sort={
                      canSort && isSorted
                        ? sortDirection === 'asc'
                          ? 'ascending'
                          : 'descending'
                        : undefined
                    }
                  >
                    <span className="table-cell-content">
                      {col.label}
                      {canSort && (
                        <span className="table-sort" aria-hidden>
                          {isSorted ? (
                            sortDirection === 'asc' ? (
                              <SortAscIcon />
                            ) : (
                              <SortDescIcon />
                            )
                          ) : (
                            <SortNoneIcon />
                          )}
                        </span>
                      )}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="table-body">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  className="table-cell table-cell--empty"
                  colSpan={columns.length}
                >
                  No data
                </td>
              </tr>
            ) : (
              paginatedData.map((row, i) => (
                <tr
                  key={getRowKey(row, start + i)}
                  className="table-body-row"
                >
                  {columns.map((col) => {
                    const value = row[col.key];
                    const content = col.render
                      ? col.render(value, row)
                      : value != null ? String(value) : '—';
                    return (
                      <td
                        key={col.key}
                        className={cn(
                          'table-cell',
                          col.align && `table-cell--${col.align}`
                        )}
                      >
                        {content}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {pagination && totalRows > 0 && (
        <div className="table-pagination">
          <div className="table-pagination-info">
            Showing {start + 1}–{Math.min(start + pageSize, totalRows)} of {totalRows}
          </div>
          <div className="table-pagination-controls">
            <label className="table-pagination-size">
              Rows per page
              <select
                className="table-pagination-select"
                value={pageSize}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                aria-label="Rows per page"
              >
                {pageSizeOptions.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
            <span className="table-pagination-page">
              Page {safePage} of {totalPages}
            </span>
            <div className="table-pagination-buttons">
              <button
                type="button"
                className="table-pagination-btn"
                onClick={() => handlePageChange(safePage - 1)}
                disabled={safePage <= 1}
                aria-label="Previous page"
              >
                <ChevronLeftIcon />
              </button>
              <button
                type="button"
                className="table-pagination-btn"
                onClick={() => handlePageChange(safePage + 1)}
                disabled={safePage >= totalPages}
                aria-label="Next page"
              >
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Table.displayName = 'Table';

function SortAscIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}
function SortDescIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
function SortNoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="table-sort-none">
      <path d="m7 15 5 5 5-5" />
      <path d="m7 9 5-5 5 5" />
    </svg>
  );
}
function ChevronLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}
function ChevronRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
