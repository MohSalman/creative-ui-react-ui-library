import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './modal.css';
import { cn } from '../../utils';

export type ModalSize = 'small' | 'medium' | 'large' | 'fullscreen';

export interface ModalProps {
  /** Whether the modal is open */
  open: boolean;
  /** Called when the modal should close (overlay click, close button, escape) */
  onClose: () => void;
  /** Modal title */
  title?: React.ReactNode;
  /** Modal body content */
  children: React.ReactNode;
  /** Footer content (e.g. buttons) */
  footer?: React.ReactNode;
  /** Size variant */
  size?: ModalSize;
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

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  footer,
  size = 'medium',
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

  if (!open) return null;

  const content = (
    <div
      className={cn('modal-overlay', open && 'modal-overlay--open')}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        className="modal-backdrop"
        onClick={handleOverlayClick}
        aria-hidden
      />
      <div
        className={cn(
          'modal-dialog',
          size && `modal-dialog--${size}`,
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          {(title || showCloseButton) && (
            <div className="modal-header">
              {title && (
                <h2 id="modal-title" className="modal-title">
                  {title}
                </h2>
              )}
              {showCloseButton && (
                <button
                  type="button"
                  className="modal-close"
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  <CloseIcon />
                </button>
              )}
            </div>
          )}
          <div className="modal-body">{children}</div>
          {footer != null && <div className="modal-footer">{footer}</div>}
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
};

Modal.displayName = 'Modal';

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
