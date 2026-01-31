import React from 'react';
import { cn } from '../../utils';
import './avatar.css';

export interface AvatarProps {
  src?: string | null;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  fallback?: string;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt = '', size = 'md', fallback, className }) => {
  const initials = fallback ?? (alt ? alt.slice(0, 2).toUpperCase() : '?');
  return (
    <span className={cn('avatar', `avatar--${size}`, className)} role="img" aria-label={alt || undefined}>
      {src ? <img src={src} alt={alt} className="avatar-img" /> : <span className="avatar-fallback">{initials}</span>}
    </span>
  );
};

Avatar.displayName = 'Avatar';
