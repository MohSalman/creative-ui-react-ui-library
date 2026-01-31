import React from 'react';
import { cn } from '../../utils';
import './layout.css';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns (e.g. 2, 3, 4) or "auto" for auto-fill */
  columns?: number | 'auto' | 'auto-fit' | 'auto-fill';
  /** Gap between items */
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Row gap (overrides gap for rows if set) */
  rowGap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Column gap */
  columnGap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Align items (block axis) */
  align?: 'start' | 'center' | 'end' | 'stretch';
  /** Justify items (inline axis) */
  justify?: 'start' | 'center' | 'end' | 'stretch' | 'between' | 'around' | 'evenly';
  /** Minimum column width for auto grids (e.g. "200px", "20rem") */
  minColumnWidth?: string;
  /** As prop */
  as?: React.ElementType;
}

export const Grid: React.FC<GridProps> = ({
  columns = 1,
  gap = 'md',
  rowGap,
  columnGap,
  align,
  justify,
  minColumnWidth,
  as: Component = 'div' as React.ElementType,
  className,
  style,
  children,
  ...props
}) => {
  const gridStyle: React.CSSProperties = { ...style };
  if (columns === 'auto' || columns === 'auto-fit' || columns === 'auto-fill') {
    const repeat = columns === 'auto' ? 'auto-fill' : columns;
    gridStyle.gridTemplateColumns = minColumnWidth
      ? `repeat(${repeat}, minmax(${minColumnWidth}, 1fr))`
      : `repeat(${repeat}, 1fr)`;
  } else if (typeof columns === 'number') {
    gridStyle.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  }

  return (
    <Component
      className={cn(
        'layout-grid',
        gap !== 'none' && `layout-grid--gap-${gap}`,
        rowGap && rowGap !== 'none' && `layout-grid--row-gap-${rowGap}`,
        columnGap && columnGap !== 'none' && `layout-grid--col-gap-${columnGap}`,
        align && `layout-grid--align-${align}`,
        justify && `layout-grid--justify-${justify}`,
        className
      )}
      style={gridStyle}
      {...props}
    >
      {children}
    </Component>
  );
};

Grid.displayName = 'Grid';
