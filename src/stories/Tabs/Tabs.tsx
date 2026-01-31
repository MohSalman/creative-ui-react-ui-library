import React, { useState } from 'react';
import { cn } from '../../utils';
import './tabs.css';

export interface TabItem {
  id: string;
  label: React.ReactNode;
  content?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  /** Tab items */
  items: TabItem[];
  /** Default/controlled active tab id */
  activeId?: string;
  /** Called when tab changes */
  onChange?: (id: string) => void;
  /** Variant */
  variant?: 'default' | 'underline' | 'pills';
  /** Root class name */
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  activeId: activeIdProp,
  onChange,
  variant = 'default',
  className,
}) => {
  const [internalActive, setInternalActive] = useState(items[0]?.id ?? '');
  const isControlled = activeIdProp !== undefined;
  const activeId = isControlled ? activeIdProp : internalActive;

  const handleTabClick = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (item?.disabled) return;
    if (!isControlled) setInternalActive(id);
    onChange?.(id);
  };

  const activeItem = items.find((i) => i.id === activeId);

  return (
    <div className={cn('tabs', `tabs--${variant}`, className)}>
      <div className="tabs-list" role="tablist">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={activeId === item.id}
            aria-controls={`tabpanel-${item.id}`}
            id={`tab-${item.id}`}
            disabled={item.disabled}
            className={cn(
              'tabs-trigger',
              activeId === item.id && 'tabs-trigger--active',
              item.disabled && 'tabs-trigger--disabled'
            )}
            onClick={() => handleTabClick(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {activeItem?.content != null && (
        <div
          role="tabpanel"
          id={`tabpanel-${activeItem.id}`}
          aria-labelledby={`tab-${activeItem.id}`}
          className="tabs-panel"
        >
          {activeItem.content}
        </div>
      )}
    </div>
  );
};

Tabs.displayName = 'Tabs';
