import React, { useId, useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './datepicker.css';
import { cn } from '../../utils';

export type DatePickerVariant = 'outlined' | 'underline' | 'standard';

function formatDateDefault(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function formatDateTime(d: Date): string {
  const date = formatDateDefault(d);
  const h = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${date} ${h}:${min}`;
}

function parseDate(value: string | Date | null | undefined): Date | null {
  if (value == null) return null;
  if (value instanceof Date) return isNaN(value.getTime()) ? null : value;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
}

function getDaysForMonth(year: number, month: number): (number | null)[] {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startDay = first.getDay();
  const daysInMonth = last.getDate();
  const result: (number | null)[] = [];
  for (let i = 0; i < startDay; i++) result.push(null);
  for (let d = 1; d <= daysInMonth; d++) result.push(d);
  const total = result.length;
  const remainder = total % 7;
  if (remainder) for (let i = 0; i < 7 - remainder; i++) result.push(null);
  return result;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const DROPDOWN_WIDTH = 288;
const DROPDOWN_HEIGHT = 340;
const GAP = 4;

export interface DatePickerProps {
  /** Visual variant */
  variant?: DatePickerVariant;
  /** Label above the trigger */
  label?: string;
  /** Id for the trigger */
  id?: string;
  /** Helper or error text below */
  helperText?: string;
  /** Error state */
  error?: boolean;
  /** Size */
  size?: 'small' | 'medium' | 'large';
  /** Full width */
  fullWidth?: boolean;
  /** Disabled */
  disabled?: boolean;
  /** Root class name */
  className?: string;
  /** Selected date (controlled) */
  value?: Date | string | null;
  /** Initial date (uncontrolled) */
  defaultValue?: Date | string | null;
  /** Called when date changes */
  onChange?: (date: Date | null) => void;
  /** Show time picker (hours:minutes) */
  showTime?: boolean;
  /** Minimum selectable date */
  minDate?: Date | string;
  /** Maximum selectable date */
  maxDate?: Date | string;
  /** Placeholder when no date selected */
  placeholder?: string;
  /** Custom formatter for display: (date: Date) => string */
  formatDisplay?: (date: Date) => string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  variant = 'outlined',
  label,
  id: idProp,
  helperText,
  error = false,
  size = 'medium',
  fullWidth = false,
  disabled = false,
  className,
  value: valueProp,
  defaultValue,
  onChange,
  showTime = false,
  minDate: minDateProp,
  maxDate: maxDateProp,
  placeholder = 'Select date',
  formatDisplay,
}) => {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const triggerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const computePosition = useCallback((): { top: number; left: number; placement: 'bottom' | 'top' } | null => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return null;
    const spaceBelow = window.innerHeight - rect.bottom;
    const placement = spaceBelow >= DROPDOWN_HEIGHT + GAP ? 'bottom' : 'top';
    const top =
      placement === 'bottom'
        ? rect.bottom + GAP
        : rect.top - DROPDOWN_HEIGHT - GAP;
    let left = rect.left + (rect.width - DROPDOWN_WIDTH) / 2;
    left = Math.max(8, Math.min(window.innerWidth - DROPDOWN_WIDTH - 8, left));
    return { top, left, placement };
  }, []);

  const isControlled = valueProp !== undefined;
  const [internalValue, setInternalValue] = useState<Date | null>(() => parseDate(defaultValue));
  const value = isControlled ? parseDate(valueProp) : internalValue;

  const [open, setOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'days' | 'months' | 'years'>('days');
  const [viewDate, setViewDate] = useState<Date>(() => value || new Date());
  const [timeInput, setTimeInput] = useState(() => {
    const d = value || new Date();
    return { hours: d.getHours(), minutes: d.getMinutes() };
  });
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
    placement: 'bottom' | 'top';
  } | null>(null);
  const [dropdownAnimateIn, setDropdownAnimateIn] = useState(false);

  const minDate = useMemo(() => parseDate(minDateProp), [minDateProp]);
  const maxDate = useMemo(() => parseDate(maxDateProp), [maxDateProp]);

  const displayText = value
    ? (formatDisplay ? formatDisplay(value) : showTime ? formatDateTime(value) : formatDateDefault(value))
    : placeholder;

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();
  const days = useMemo(() => getDaysForMonth(viewYear, viewMonth), [viewYear, viewMonth]);

  const yearRange = useMemo(() => {
    const start = Math.floor(viewYear / 12) * 12;
    return Array.from({ length: 12 }, (_, i) => start + i);
  }, [viewYear]);

  const setValue = (d: Date | null) => {
    if (!isControlled) setInternalValue(d);
    onChange?.(d);
  };


  useEffect(() => {
    if (!open || !dropdownPosition) return;
    const raf = requestAnimationFrame(() => {
      setDropdownAnimateIn(true);
    });
    return () => cancelAnimationFrame(raf);
  }, [open, dropdownPosition]);

  useEffect(() => {
    if (!open || !dropdownPosition) return;
    const updatePosition = () => {
      const pos = computePosition();
      if (pos) setDropdownPosition(pos);
    };
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [open, dropdownPosition, computePosition]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        open &&
        triggerRef.current && !triggerRef.current.contains(target) &&
        panelRef.current && !panelRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const isDayDisabled = (year: number, month: number, day: number): boolean => {
    const d = new Date(year, month, day);
    if (minDate && d < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) return true;
    if (maxDate && d > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) return true;
    return false;
  };

  const isSameDay = (a: Date | null, y: number, m: number, d: number) =>
    a && a.getFullYear() === y && a.getMonth() === m && a.getDate() === d;

  const isToday = (y: number, m: number, d: number) => {
    const t = new Date();
    return t.getFullYear() === y && t.getMonth() === m && t.getDate() === d;
  };

  const handleSelectDay = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    if (showTime && value) {
      d.setHours(value.getHours(), value.getMinutes(), 0, 0);
    } else if (showTime) {
      d.setHours(timeInput.hours, timeInput.minutes, 0, 0);
    }
    setValue(d);
    if (!showTime) setOpen(false);
  };

  const handlePrevMonth = () => setViewDate(new Date(viewYear, viewMonth - 1, 1));
  const handleNextMonth = () => setViewDate(new Date(viewYear, viewMonth + 1, 1));

  const handleSelectMonth = (month: number) => {
    setViewDate(new Date(viewYear, month, 1));
    setViewMode('days');
  };

  const handleSelectYear = (year: number) => {
    setViewDate(new Date(year, viewMonth, 1));
    setViewMode('months');
  };

  const handleTimeChange = (hours: number, minutes: number) => {
    const h = Math.min(23, Math.max(0, hours));
    const m = Math.min(59, Math.max(0, minutes));
    setTimeInput({ hours: h, minutes: m });
    const base = value ? new Date(value) : new Date();
    base.setHours(h, m, 0, 0);
    setValue(base);
  };

  const rootClassName = cn(
    'datepicker-root',
    `datepicker-root--${variant}`,
    size && `datepicker-root--${size}`,
    fullWidth && 'datepicker-root--fullWidth',
    error && 'datepicker-root--error',
    disabled && 'datepicker-root--disabled',
    open && 'datepicker-root--open',
    className
  );

  return (
    <div className={rootClassName}>
      {label && (
        <label htmlFor={id} className="datepicker-label" id={`${id}-label`}>
          {label}
        </label>
      )}
      <div
        ref={triggerRef}
        id={id}
        role="button"
        tabIndex={disabled ? undefined : 0}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-labelledby={label ? `${id}-label` : undefined}
        aria-describedby={helperText ? `${id}-helper` : undefined}
        className="datepicker-trigger"
        onClick={() => {
          if (disabled) return;
          if (!open) {
            setViewDate(value ? new Date(value.getFullYear(), value.getMonth(), 1) : new Date());
            setTimeInput(
              value
                ? { hours: value.getHours(), minutes: value.getMinutes() }
                : (() => {
                    const t = new Date();
                    return { hours: t.getHours(), minutes: t.getMinutes() };
                  })()
            );
            setViewMode('days');
            const pos = computePosition();
            if (pos) {
              setDropdownAnimateIn(false);
              setDropdownPosition(pos);
            }
          } else {
            setDropdownPosition(null);
            setDropdownAnimateIn(false);
          }
          setOpen((o) => !o);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (!disabled) {
              if (!open) {
                setViewDate(value ? new Date(value.getFullYear(), value.getMonth(), 1) : new Date());
                setTimeInput(
                  value
                    ? { hours: value.getHours(), minutes: value.getMinutes() }
                    : (() => {
                        const t = new Date();
                        return { hours: t.getHours(), minutes: t.getMinutes() };
                      })()
                );
                setViewMode('days');
                const pos = computePosition();
                if (pos) {
                  setDropdownAnimateIn(false);
                  setDropdownPosition(pos);
                }
              } else {
                setDropdownPosition(null);
                setDropdownAnimateIn(false);
              }
              setOpen((o) => !o);
            }
          }
        }}
      >
        <span className={cn('datepicker-value', !value && 'datepicker-value--placeholder')}>
          {displayText}
        </span>
        <span className="datepicker-icon" aria-hidden>
          <CalendarIcon />
        </span>
      </div>

      {open &&
        dropdownPosition &&
        createPortal(
          <div
            ref={panelRef}
            className={cn(
              'datepicker-dropdown',
              `datepicker-dropdown--${dropdownPosition.placement}`,
              `datepicker-dropdown--${viewMode}`,
              dropdownAnimateIn && 'datepicker-dropdown--animate'
            )}
            style={{
              position: 'fixed',
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              width: DROPDOWN_WIDTH,
              minWidth: DROPDOWN_WIDTH,
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Choose date"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="datepicker-calendar">
              <div className="datepicker-calendar-header">
                <button
                  type="button"
                  className="datepicker-nav"
                  onClick={() =>
                    viewMode === 'days'
                      ? handlePrevMonth()
                      : viewMode === 'months'
                        ? setViewDate(new Date(viewYear - 1, viewMonth, 1))
                        : setViewDate(new Date(viewYear - 12, viewMonth, 1))
                  }
                  aria-label={
                    viewMode === 'days'
                      ? 'Previous month'
                      : viewMode === 'months'
                        ? 'Previous year'
                        : 'Previous years'
                  }
                >
                  <ChevronLeftIcon />
                </button>
                <div className="datepicker-month-year-wrap">
                  {viewMode === 'days' && (
                    <button
                      type="button"
                      className="datepicker-month-year-btn"
                      onClick={() => setViewMode('months')}
                      aria-label="Choose month"
                    >
                      {MONTHS[viewMonth]} {viewYear}
                    </button>
                  )}
                  {viewMode === 'months' && (
                    <button
                      type="button"
                      className="datepicker-month-year-btn"
                      onClick={() => setViewMode('years')}
                      aria-label="Choose year"
                    >
                      {viewYear}
                    </button>
                  )}
                  {viewMode === 'years' && (
                    <span className="datepicker-month-year">
                      {yearRange[0]} – {yearRange[yearRange.length - 1]}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  className="datepicker-nav"
                  onClick={() =>
                    viewMode === 'days'
                      ? handleNextMonth()
                      : viewMode === 'months'
                        ? setViewDate(new Date(viewYear + 1, viewMonth, 1))
                        : setViewDate(new Date(viewYear + 12, viewMonth, 1))
                  }
                  aria-label={
                    viewMode === 'days'
                      ? 'Next month'
                      : viewMode === 'months'
                        ? 'Next year'
                        : 'Next years'
                  }
                >
                  <ChevronRightIcon />
                </button>
              </div>

              {viewMode === 'days' && (
                <>
                  <div className="datepicker-weekdays">
                    {WEEKDAYS.map((w) => (
                      <span key={w} className="datepicker-weekday">
                        {w}
                      </span>
                    ))}
                  </div>
                  <div className="datepicker-days">
                    {days.map((day, i) => {
                      if (day === null) {
                        return <span key={`e-${i}`} className="datepicker-day datepicker-day--empty" />;
                      }
                      const disabled = isDayDisabled(viewYear, viewMonth, day);
                      const selected = isSameDay(value, viewYear, viewMonth, day);
                      const today = isToday(viewYear, viewMonth, day);
                      return (
                        <button
                          key={`${viewYear}-${viewMonth}-${day}`}
                          type="button"
                          className={cn(
                            'datepicker-day',
                            selected && 'datepicker-day--selected',
                            today && !selected && 'datepicker-day--today',
                            disabled && 'datepicker-day--disabled'
                          )}
                          disabled={disabled}
                          onClick={() => handleSelectDay(day)}
                          aria-label={`${day} ${MONTHS[viewMonth]} ${viewYear}`}
                          aria-selected={selected ? true : undefined}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {viewMode === 'months' && (
                <div className="datepicker-months">
                  {MONTHS.map((month, i) => (
                    <button
                      key={month}
                      type="button"
                      className={cn(
                        'datepicker-month',
                        value && value.getFullYear() === viewYear && value.getMonth() === i && 'datepicker-month--selected'
                      )}
                      onClick={() => handleSelectMonth(i)}
                    >
                      {month.slice(0, 3)}
                    </button>
                  ))}
                </div>
              )}

              {viewMode === 'years' && (
                <div className="datepicker-years">
                  {yearRange.map((y) => (
                    <button
                      key={y}
                      type="button"
                      className={cn(
                        'datepicker-year',
                        value && value.getFullYear() === y && 'datepicker-year--selected',
                        new Date().getFullYear() === y && 'datepicker-year--current'
                      )}
                      onClick={() => handleSelectYear(y)}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {showTime && (
              <div className="datepicker-time">
                <label className="datepicker-time-label">Time</label>
                <div className="datepicker-time-inputs">
                  <input
                    type="number"
                    min={0}
                    max={23}
                    value={timeInput.hours}
                    onChange={(e) => handleTimeChange(Number(e.target.value) || 0, timeInput.minutes)}
                    className="datepicker-time-input"
                    aria-label="Hours"
                  />
                  <span className="datepicker-time-sep">:</span>
                  <input
                    type="number"
                    min={0}
                    max={59}
                    value={timeInput.minutes}
                    onChange={(e) => handleTimeChange(timeInput.hours, Number(e.target.value) || 0)}
                    className="datepicker-time-input"
                    aria-label="Minutes"
                  />
                </div>
              </div>
            )}

            {showTime && (
              <div className="datepicker-actions">
                <button
                  type="button"
                  className="datepicker-done"
                  onClick={() => setOpen(false)}
                >
                  Done
                </button>
              </div>
            )}
          </div>,
          document.body
        )}

      {helperText && (
        <p id={`${id}-helper`} className={cn('datepicker-helper', error && 'datepicker-helper--error')}>
          {helperText}
        </p>
      )}
    </div>
  );
};

DatePicker.displayName = 'DatePicker';

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
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
