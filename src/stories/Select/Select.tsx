import React, { useId, useState, useRef, useEffect } from 'react';
import './select.css';
import { cn } from '../../utils';

export type SelectVariant = 'multi-select' | 'checkbox-dropdown' | 'radio-dropdown' | 'searchable' | 'clear';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  /** Options for the dropdown */
  options: SelectOption[];
  /** Selected value (single) or values (multi). Controlled. */
  value?: string | string[];
  /** Initial value when uncontrolled */
  defaultValue?: string | string[];
  /** Called when selection changes. Single: (value) => void, Multi: (values) => void */
  onChange?: (value: string | string[] | undefined) => void;
  /** Multi-select (checkbox dropdown); when false, single select (radio dropdown) */
  multiSelect?: boolean;
  /** Show search input to filter options */
  searchable?: boolean;
  /** Show clear button when there is a selection */
  clearable?: boolean;
  /** Placeholder when nothing selected */
  placeholder?: string;
  /** Label above the select */
  label?: string;
  /** Id for the trigger (label htmlFor) */
  id?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Size */
  size?: 'small' | 'medium' | 'large';
  /** Full width */
  fullWidth?: boolean;
  /** Error state */
  error?: boolean;
  /** Helper text below */
  helperText?: string;
  /** Root class name */
  className?: string;
  /** Name for the hidden input (single select) or form context */
  name?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value: valueProp,
  defaultValue,
  onChange,
  multiSelect = false,
  searchable = false,
  clearable = true,
  placeholder = 'Select...',
  label,
  id: idProp,
  disabled = false,
  size = 'medium',
  fullWidth = false,
  error = false,
  helperText,
  className,
  name,
}) => {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [internalValue, setInternalValue] = useState<string | string[] | undefined>(
    () => defaultValue ?? (multiSelect ? [] : undefined)
  );
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : internalValue;
  const triggerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selectedSingle = typeof value === 'string' ? value : undefined;
  const selectedMulti = Array.isArray(value) ? value : [];

  const filteredOptions =
    searchable && searchQuery.trim().length > 0
      ? options.filter(
          (opt) =>
            opt.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            opt.value.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : options;

  const hasSelection = multiSelect
    ? selectedMulti.length > 0
    : selectedSingle !== undefined && selectedSingle !== '';

  const displayLabel = multiSelect
    ? selectedMulti.length === 0
      ? placeholder
      : selectedMulti
          .map((v) => options.find((o) => o.value === v)?.label ?? v)
          .join(', ')
    : selectedSingle !== undefined
      ? options.find((o) => o.value === selectedSingle)?.label ?? selectedSingle
      : placeholder;

  const handleSelectSingle = (optionValue: string) => {
    const next = optionValue === selectedSingle ? undefined : optionValue;
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
    setOpen(false);
    setSearchQuery('');
  };

  const handleSelectMulti = (optionValue: string, checked: boolean) => {
    const next = checked
      ? [...selectedMulti, optionValue]
      : selectedMulti.filter((v) => v !== optionValue);
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isControlled) setInternalValue(multiSelect ? [] : undefined);
    onChange?.(multiSelect ? [] : undefined);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        open &&
        triggerRef.current &&
        !triggerRef.current.contains(target) &&
        listRef.current &&
        !listRef.current.contains(target)
      ) {
        setOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const rootClassName = cn(
    'select-root',
    fullWidth && 'select-root--fullWidth',
    open && 'select-root--open',
    error && 'select-root--error',
    disabled && 'select-root--disabled',
    size && `select-root--${size}`,
    className
  );

  return (
    <div className={rootClassName}>
      {label && (
        <label htmlFor={id} className="select-label" id={`${id}-label`}>
          {label}
        </label>
      )}
      <div
        ref={triggerRef}
        id={id}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={`${id}-listbox`}
        aria-labelledby={label ? `${id}-label` : undefined}
        aria-disabled={disabled}
        aria-describedby={helperText ? `${id}-helper` : undefined}
        className="select-trigger"
        onClick={() => !disabled && setOpen((o) => !o)}
      >
        <span className={cn('select-value', !hasSelection && 'select-value--placeholder')}>
          {displayLabel}
        </span>
        <span className="select-icons">
          {clearable && hasSelection && (
            <button
              type="button"
              className="select-clear"
              onClick={handleClear}
              aria-label="Clear selection"
              tabIndex={-1}
            >
              <ClearIcon />
            </button>
          )}
          <span className="select-chevron" aria-hidden>
            <ChevronIcon />
          </span>
        </span>
      </div>
      {open && (
        <div
          ref={listRef}
          id={`${id}-listbox`}
          role="listbox"
          aria-multiselectable={multiSelect}
          className="select-dropdown"
          onMouseDown={(e) => e.stopPropagation()}
        >
          {searchable && (
            <div className="select-search-wrap">
              <input
                type="text"
                className="select-search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                aria-label="Search options"
                autoFocus
              />
            </div>
          )}
          <div className="select-options">
            {filteredOptions.length === 0 ? (
              <div className="select-empty">No options</div>
            ) : multiSelect ? (
              filteredOptions.map((opt) => {
                const isSelected = selectedMulti.includes(opt.value);
                return (
                  <div
                    key={opt.value}
                    role="option"
                    aria-selected={isSelected}
                    className={cn(
                      'select-option',
                      isSelected && 'select-option--selected'
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!disabled) handleSelectMulti(opt.value, !isSelected);
                    }}
                  >
                    {opt.label}
                  </div>
                );
              })
            ) : (
              filteredOptions.map((opt) => (
                <div
                  key={opt.value}
                  role="option"
                  aria-selected={selectedSingle === opt.value}
                  className={cn(
                    'select-option',
                    selectedSingle === opt.value && 'select-option--selected'
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!disabled) handleSelectSingle(opt.value);
                  }}
                >
                  {opt.label}
                </div>
              ))
            )}
          </div>
        </div>
      )}
      {name && !multiSelect && (
        <input type="hidden" name={name} value={selectedSingle ?? ''} readOnly />
      )}
      {helperText && (
        <p id={`${id}-helper`} className={cn('select-helper', error && 'select-helper--error')}>
          {helperText}
        </p>
      )}
    </div>
  );
};

Select.displayName = 'Select';

function ChevronIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
