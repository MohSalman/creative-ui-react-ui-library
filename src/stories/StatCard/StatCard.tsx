import React from 'react';
import { cn } from '../../utils';
import './statcard.css';

export interface StatCardProps {
  title: string;
  value: React.ReactNode;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon, className }) => (
  <div className={cn('statcard', className)}>
    {icon && <div className="statcard-icon">{icon}</div>}
    <div className="statcard-body">
      <p className="statcard-title">{title}</p>
      <p className="statcard-value">{value}</p>
      {subtitle && <p className="statcard-subtitle">{subtitle}</p>}
    </div>
  </div>
);

StatCard.displayName = 'StatCard';
