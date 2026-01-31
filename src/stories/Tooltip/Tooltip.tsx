import React, { useState } from 'react';
import { cn } from '../../utils';
import './tooltip.css';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children, placement = 'top' }) => {
  const [visible, setVisible] = useState(false);
  return (
    <span
      className="tooltip-root"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span className={cn('tooltip-content', `tooltip--${placement}`)} role="tooltip">
          {content}
        </span>
      )}
    </span>
  );
};

Tooltip.displayName = 'Tooltip';
