import React from 'react';
import { cn } from '../../utils';
import './tag.css';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline';
  onRemove?: () => void;
  children: React.ReactNode;
}

export const Tag: React.FC<TagProps> = ({ variant = 'default', onRemove, className, children, ...props }) => (
  <span className={cn('tag', `tag--${variant}`, className)} {...props}>
    {children}
    {onRemove && (
      <button type="button" className="tag-remove" onClick={onRemove} aria-label="Remove">
        ×
      </button>
    )}
  </span>
);

Tag.displayName = 'Tag';
