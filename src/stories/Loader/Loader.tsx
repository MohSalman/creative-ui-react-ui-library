import React from 'react';
import { cn } from '../../utils';
import './loader.css';

export interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ size = 'md', className }) => (
  <span className={cn('loader', `loader--${size}`, className)} role="status" aria-label="Loading">
    <span className="loader-spinner" />
  </span>
);

Loader.displayName = 'Loader';
