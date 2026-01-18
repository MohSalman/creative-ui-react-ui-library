import type { Theme } from "../theme";


/**
 * Get color from theme by variant
 */
export const getColorByVariant = (
  theme: Theme,
  variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'disabled'
): string => {
  return theme.colors[variant] || theme.colors.primary;
};

/**
 * Generate variant classes for components
 */
export const getVariantClass = (baseClass: string, variant: string): string => {
  return `${baseClass}--${variant}`;
};

/**
 * Generate spacing styles
 */
export const getSpacing = (theme: Theme, size: keyof Theme['spacing']): string => {
  return theme.spacing[size];
};

/**
 * Generate border radius
 */
export const getBorderRadius = (theme: Theme, size: keyof Theme['borderRadius']): string => {
  return theme.borderRadius[size];
};