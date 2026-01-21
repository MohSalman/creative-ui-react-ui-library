import React, { type JSX } from "react";
import { cn } from "../../utils";
import './typography.css';

export type TypographyVariant = 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'h4' 
  | 'h5' 
  | 'h6' 
  | 'body' 
  | 'body2' 
  | 'caption' 
  | 'overline' 
  | 'subtitle1' 
  | 'subtitle2';



export type TypographyAlign = 'left' | 'center' | 'right' | 'justify';
export type TypographyColor = 'primary' | 'secondary' | 'text' | 'error' | 'warning' | 'success' | 'info' | 'inherit';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  /** Typography variant */
  variant?: TypographyVariant;
  /** Text alignment */
  align?: TypographyAlign;
  /** Text color */
  color?: TypographyColor;
  /** HTML element to render (defaults based on variant) */
  component?: keyof JSX.IntrinsicElements;
  /** Whether text should be bold */
  bold?: boolean;
  /** Whether text should be italic */
  italic?: boolean;
  /** Whether text should be underlined */
  underline?: boolean;
  /** Whether text should be truncated with ellipsis */
  noWrap?: boolean;
  /** Custom className */
  className?: string;
  /** Children content */
  children: React.ReactNode;
}

/** Typography component for consistent text styling */
export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  align,
  color = 'text',
  component,
  bold,
  italic,
  underline,
  noWrap,
  className,
  children,
  style,
  ...props
}) => {
  // Determine the HTML element to render
  const getComponentName = (): keyof JSX.IntrinsicElements => {
    if (component) return component;
    
    // Default component based on variant
    if (variant.startsWith('h')) {
      return variant as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    }
    
    return 'p';
  };

  const componentName = getComponentName();
  
  // Build class names
  const variantClass = `typography--${variant}`;
  const alignClass = align ? `typography--align-${align}` : '';
  const colorClass = color ? `typography--color-${color}` : '';
  const boldClass = bold ? 'typography--bold' : '';
  const italicClass = italic ? 'typography--italic' : '';
  const underlineClass = underline ? 'typography--underline' : '';
  const noWrapClass = noWrap ? 'typography--no-wrap' : '';
  
  const typographyClassName = cn(
    'typography',
    variantClass,
    alignClass,
    colorClass,
    boldClass,
    italicClass,
    underlineClass,
    noWrapClass,
    className
  );

  const elementProps: React.HTMLAttributes<HTMLElement> = {
    className: typographyClassName,
    style,
    ...props,
  };

  return React.createElement(
    componentName,
    elementProps,
    children
  );
};