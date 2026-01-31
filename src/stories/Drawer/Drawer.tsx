import React, { useEffect, useCallback, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import './drawer.css';
import { cn } from '../../utils';

export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';
export type DrawerSize = 'small' | 'medium' | 'large' | 'full';

export interface DrawerProps {
  /** Whether the drawer is open */
  open: boolean;
  /** Called when the drawer should close */
  onClose: () => void;
  /** Slide-in position */
  position?: DrawerPosition;
  /** Size variant (width for left/right, height for top/bottom) */
  size?: DrawerSize;
  /** Drawer title */
  title?: React.ReactNode;
  /** Drawer body content */
  children: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Show close button in header */
  showCloseButton?: boolean;
  /** Close when clicking overlay */
  closeOnOverlayClick?: boolean;
  /** Close when pressing Escape */
  closeOnEscape?: boolean;
  /** Root class name */
  className?: string;
  /** Disable body scroll when open */
  disableScroll?: boolean;
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  position = 'right',
  size = 'medium',
  title,
  children,
  footer,
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className,
  disableScroll = true,
}) => {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === 'Escape') onClose();
    },
    [closeOnEscape, onClose]
  );

  useEffect(() => {
    if (!open) return;
    if (disableScroll) document.body.style.overflow = 'hidden';
    if (closeOnEscape) document.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, disableScroll, closeOnEscape, handleEscape]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) onClose();
  };

  const [mounted, setMounted] = useState(open);
  const [openReady, setOpenReady] = useState(false);
  const isClosing = mounted && !open;
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) setMounted(true);
  }, [open]);

  /* Delay --open by one frame so the panel starts off-screen and can animate in */
  useEffect(() => {
    if (open && mounted) {
      setOpenReady(false);
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setOpenReady(true));
      });
      return () => cancelAnimationFrame(id);
    } else {
      setOpenReady(false);
    }
  }, [open, mounted]);

  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent) => {
      if (e.target !== panelRef.current) return;
      if (isClosing) setMounted(false);
    },
    [isClosing]
  );

  if (!mounted) return null;

  const content = (
    <div
      className={cn(
        'drawer-overlay',
        open && openReady && 'drawer-overlay--open',
        isClosing && 'drawer-overlay--closing'
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'drawer-title' : undefined}
    >
      <div
        className="drawer-backdrop"
        onClick={handleOverlayClick}
        aria-hidden
      />
      <div
        ref={panelRef}
        className={cn(
          'drawer-panel',
          `drawer-panel--${position}`,
          `drawer-panel--${size}`,
          className
        )}
        onClick={(e) => e.stopPropagation()}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className="drawer-content">
          {(title || showCloseButton) && (
            <div className="drawer-header">
              {title && (
                <h2 id="drawer-title" className="drawer-title">
                  {title}
                </h2>
              )}
              {showCloseButton && (
                <button
                  type="button"
                  className="drawer-close"
                  onClick={onClose}
                  aria-label="Close drawer"
                >
                  <CloseIcon />
                </button>
              )}
            </div>
          )}
          <div className="drawer-body">{children}</div>
          {footer != null && <div className="drawer-footer">{footer}</div>}
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
};

Drawer.displayName = 'Drawer';

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
