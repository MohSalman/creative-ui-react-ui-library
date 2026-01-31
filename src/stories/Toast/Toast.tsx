import React, { useEffect, useState, createContext, useCallback, useContext } from 'react';
import { createPortal } from 'react-dom';
import './toast.css';
import { cn } from '../../utils';

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';
export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface ToastItem {
  id: string;
  message: React.ReactNode;
  variant?: ToastVariant;
  duration?: number;
  closeable?: boolean;
  /** Show progress bar for remaining time (when duration > 0). Default true. */
  showProgressBar?: boolean;
}

interface ToastContextValue {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, 'id'>) => string;
  removeToast: (id: string) => void;
  position: ToastPosition;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

export interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = 'top-right',
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((toast: Omit<ToastItem, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const item: ToastItem = { ...toast, id };
    setToasts((prev) => [...prev, item]);
    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const value: ToastContextValue = {
    toasts,
    addToast,
    removeToast,
    position,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} position={position} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

interface ToastContainerProps {
  toasts: ToastItem[];
  position: ToastPosition;
  onRemove: (id: string) => void;
}

function ToastContainer({ toasts, position, onRemove }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  const content = (
    <div
      className={cn('toast-container', `toast-container--${position}`)}
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <ToastItemComponent
          key={toast.id}
          toast={toast}
          onRemove={() => onRemove(toast.id)}
        />
      ))}
    </div>
  );

  return createPortal(content, document.body);
}

interface ToastItemComponentProps {
  toast: ToastItem;
  onRemove: () => void;
}

function ToastItemComponent({ toast, onRemove }: ToastItemComponentProps) {
  const [visible, setVisible] = useState(false);
  const duration = toast.duration ?? 5000;
  const closeable = toast.closeable !== false;
  const showProgress = duration > 0 && (toast.showProgressBar !== false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  useEffect(() => {
    if (duration <= 0) return;
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onRemove, 200);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onRemove]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onRemove, 200);
  };

  return (
    <div
      className={cn(
        'toast',
        `toast--${toast.variant ?? 'default'}`,
        visible && 'toast--visible',
        showProgress && 'toast--with-progress'
      )}
      role="alert"
    >
      <div className="toast-inner">
        {toast.variant && toast.variant !== 'default' && (
          <span className="toast-icon" aria-hidden>
            <VariantIcon variant={toast.variant} />
          </span>
        )}
        <span className="toast-message">{toast.message}</span>
        {closeable && (
          <button
            type="button"
            className="toast-close"
            onClick={handleClose}
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        )}
      </div>
      {showProgress && (
        <div
          className="toast-progress-wrap"
          role="progressbar"
          aria-valuenow={0}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Time remaining"
        >
          <div
            className="toast-progress-bar"
            style={{ animationDuration: `${duration}ms` }}
          />
        </div>
      )}
    </div>
  );
}

function VariantIcon({ variant }: { variant: ToastVariant }) {
  const svgProps = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none' as const, stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  if (variant === 'success') {
    return (
      <svg {...svgProps}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    );
  }
  if (variant === 'error') {
    return (
      <svg {...svgProps}>
        <circle cx="12" cy="12" r="10" />
        <path d="m15 9-6 6" />
        <path d="m9 9 6 6" />
      </svg>
    );
  }
  if (variant === 'warning') {
    return (
      <svg {...svgProps}>
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    );
  }
  if (variant === 'info') {
    return (
      <svg {...svgProps}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
    );
  }
  return null;
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

/* Standalone Toast item for rendering a single toast (e.g. in stories without provider) */
export interface SingleToastProps {
  message: React.ReactNode;
  variant?: ToastVariant;
  closeable?: boolean;
  /** Duration in ms; when > 0, shows progress bar and optionally auto-calls onClose. */
  duration?: number;
  /** Show progress bar (when duration > 0). Default true. */
  showProgressBar?: boolean;
  onClose?: () => void;
  className?: string;
}

export const SingleToast: React.FC<SingleToastProps> = ({
  message,
  variant = 'default',
  closeable = true,
  duration = 5000,
  showProgressBar = true,
  onClose,
  className,
}) => {
  const showProgress = duration > 0 && showProgressBar;
  return (
    <div
      className={cn(
        'toast',
        `toast--${variant}`,
        'toast--visible',
        showProgress && 'toast--with-progress',
        className
      )}
      role="alert"
    >
      <div className="toast-inner">
        {variant !== 'default' && (
          <span className="toast-icon" aria-hidden>
            <VariantIcon variant={variant} />
          </span>
        )}
        <span className="toast-message">{message}</span>
        {closeable && (
          <button
            type="button"
            className="toast-close"
            onClick={onClose}
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        )}
      </div>
      {showProgress && (
        <div
          className="toast-progress-wrap"
          role="progressbar"
          aria-valuenow={0}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Time remaining"
        >
          <div
            className="toast-progress-bar"
            style={{ animationDuration: `${duration}ms` }}
          />
        </div>
      )}
    </div>
  );
};
