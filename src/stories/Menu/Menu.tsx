import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils';
import './menu.css';

export interface MenuItem {
  id: string;
  label: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  divider?: boolean;
}

export interface MenuProps {
  /** Trigger element (button or node that opens menu) */
  trigger: React.ReactNode;
  /** Menu items */
  items: MenuItem[];
  /** Menu placement relative to trigger */
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  /** Root class name */
  className?: string;
}

export const Menu: React.FC<MenuProps> = ({
  trigger,
  items,
  placement = 'bottom-start',
  className,
}) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

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

  const handleTriggerClick = () => {
    if (!open) {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (rect) {
        const gap = 4;
        let top = 0;
        let left = 0;
        if (placement.startsWith('bottom')) top = rect.bottom + gap;
        else top = rect.top - gap;
        if (placement.endsWith('start')) left = rect.left;
        else left = rect.right;
        setPosition({ top, left });
      }
    }
    setOpen((o) => !o);
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.disabled || item.divider) return;
    item.onClick?.();
    if (!item.href) setOpen(false);
  };

  return (
    <div className={cn('menu-root', className)}>
      <div
        ref={triggerRef}
        className="menu-trigger"
        onClick={handleTriggerClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleTriggerClick();
          }
        }}
      >
        {trigger}
      </div>
      {open &&
        createPortal(
          <div
            ref={panelRef}
            className={cn('menu-panel', `menu-panel--${placement}`)}
            style={{
              position: 'fixed',
              top: position.top,
              left: placement.endsWith('start') ? position.left : undefined,
              right: placement.endsWith('end') ? window.innerWidth - position.left : undefined,
            }}
            role="menu"
          >
            {items.map((item) =>
              item.divider ? (
                <div key={item.id} className="menu-divider" role="separator" />
              ) : (
                <div
                  key={item.id}
                  role="menuitem"
                  className={cn(
                    'menu-item',
                    item.disabled && 'menu-item--disabled'
                  )}
                  onClick={() => handleItemClick(item)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleItemClick(item);
                    }
                  }}
                  tabIndex={item.disabled ? -1 : 0}
                >
                  {item.href ? (
                    <a href={item.href} className="menu-item-link">
                      {item.label}
                    </a>
                  ) : (
                    <span>{item.label}</span>
                  )}
                </div>
              )
            )}
          </div>,
          document.body
        )}
    </div>
  );
};

Menu.displayName = 'Menu';
