# Theme and Utils Setup Guide

This document explains how to set up a theme system and utility functions for your Storybook component library.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Theme System Setup](#theme-system-setup)
3. [Utils Setup](#utils-setup)
4. [Integration with Components](#integration-with-components)
5. [Best Practices](#best-practices)

---

## Project Structure

Recommended folder structure:

```
src/
├── theme/
│   ├── index.ts              # Export all theme-related modules
│   ├── types.ts              # TypeScript types for theme
│   ├── defaultTheme.ts       # Default theme configuration
│   ├── colors.ts             # Color palette definitions
│   ├── typography.ts         # Typography system
│   ├── spacing.ts            # Spacing system
│   └── ThemeProvider.tsx     # React context provider
├── utils/
│   ├── index.ts              # Export all utility functions
│   ├── cn.ts                 # Class name utility
│   ├── styles.ts             # Style utility functions
│   └── helpers.ts            # General helper functions
├── stories/
│   ├── Button/
│   ├── Card/
│   └── ...
└── index.ts
```

---

## Theme System Setup

### 1. Create Theme Types (`src/theme/types.ts`)

```typescript
// Define the theme structure
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    danger: string;
    warning: string;
    info: string;
    light: string;
    dark: string;
    disabled: string;
    [key: string]: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    fontWeight: {
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
}

export interface ThemeContextValue {
  theme: Theme;
  setTheme?: (theme: Theme) => void;
}
```

### 2. Create Default Theme (`src/theme/defaultTheme.ts`)

```typescript
import { Theme } from './types';

export const defaultTheme: Theme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    light: '#f8f9fa',
    dark: '#343a40',
    disabled: '#e9ecef',
    white: '#ffffff',
    black: '#000000',
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      md: '1rem',       // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      xxl: '1.5rem',    // 24px
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    xxl: '3rem',     // 48px
  },
  borderRadius: {
    sm: '0.25rem',   // 4px
    md: '0.5rem',    // 8px
    lg: '1rem',      // 16px
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
};
```

### 3. Create Theme Provider (`src/theme/ThemeProvider.tsx`)

```typescript
import React, { createContext, useContext, ReactNode } from 'react';
import { Theme, ThemeContextValue } from './types';
import { defaultTheme } from './defaultTheme';

const ThemeContext = createContext<ThemeContextValue>({
  theme: defaultTheme,
});

export interface ThemeProviderProps {
  theme?: Theme;
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme = defaultTheme,
  children,
}) => {
  const contextValue: ThemeContextValue = {
    theme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);
  return context.theme;
};
```

### 4. Export Theme Module (`src/theme/index.ts`)

```typescript
export * from './types';
export * from './defaultTheme';
export * from './ThemeProvider';
export { useTheme } from './ThemeProvider';
```

---

## Utils Setup

### 1. Class Name Utility (`src/utils/cn.ts`)

```typescript
/**
 * Combines class names, filtering out falsy values
 * @param classes - Array of class names or undefined/null values
 * @returns Combined class string
 */
export const cn = (...classes: (string | undefined | null | boolean)[]): string => {
  return classes
    .filter((cls) => cls !== null && cls !== undefined && cls !== false && cls !== '')
    .join(' ');
};
```

### 2. Style Utilities (`src/utils/styles.ts`)

```typescript
import { Theme } from '../theme/types';

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
```

### 3. Helper Functions (`src/utils/helpers.ts`)

```typescript
/**
 * Capitalize first letter of a string
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Generate unique ID
 */
export const generateId = (prefix: string = 'id'): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Check if value is empty (null, undefined, or empty string)
 */
export const isEmpty = (value: unknown): boolean => {
  return value === null || value === undefined || value === '';
};

/**
 * Deep merge objects
 */
export const deepMerge = <T extends Record<string, any>>(target: T, source: Partial<T>): T => {
  const output = { ...target };
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  
  return output;
};

const isObject = (item: any): item is Record<string, any> => {
  return item && typeof item === 'object' && !Array.isArray(item);
};
```

### 4. Export Utils (`src/utils/index.ts`)

```typescript
export * from './cn';
export * from './styles';
export * from './helpers';
```

---

## Integration with Components

### Example: Using Theme in Card Component

```typescript
import React from 'react';
import { useTheme } from '../theme';
import { cn, getColorByVariant, getVariantClass } from '../utils';
import './card.css';

export type CardVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'disabled';

export interface CardProps {
  variant?: CardVariant;
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'primary',
  className,
  children,
}) => {
  const theme = useTheme();
  const variantColor = getColorByVariant(theme, variant);
  const variantClass = getVariantClass('card', variant);
  
  const cardStyle = {
    backgroundColor: variant === 'disabled' ? theme.colors.disabled : variantColor,
    color: variant === 'light' ? theme.colors.dark : theme.colors.white,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  };

  return (
    <div
      className={cn('card', variantClass, className)}
      style={cardStyle}
    >
      {children}
    </div>
  );
};
```

### Example: Wrapping App with ThemeProvider

```typescript
// In your main.tsx or App.tsx
import React from 'react';
import { ThemeProvider } from './theme';
import { defaultTheme } from './theme';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      {/* Your components */}
    </ThemeProvider>
  );
}
```

---

## Best Practices

### 1. Theme Customization

- **Allow theme override**: Let users pass custom theme through ThemeProvider
- **Use CSS variables**: Consider using CSS custom properties for dynamic theming
- **Maintain consistency**: Use theme values consistently across components

### 2. Utils Organization

- **Single responsibility**: Each util function should do one thing well
- **Type safety**: Always type your utility functions
- **Documentation**: Add JSDoc comments for better IDE support
- **Reusability**: Make utils generic enough to be reused

### 3. Component Integration

- **Use theme hook**: Always use `useTheme()` hook instead of importing theme directly
- **Fallback values**: Always provide fallback values for theme properties
- **Performance**: Memoize theme-dependent calculations if needed

### 4. File Organization

- **Co-location**: Keep related theme/types/utils files close together
- **Barrel exports**: Use index.ts files for cleaner imports
- **Naming**: Use consistent naming conventions (camelCase for functions, PascalCase for types)

### 5. CSS Integration

You can also use CSS variables for theming:

```css
/* In your global.css or component CSS */
:root {
  --color-primary: #007bff;
  --color-secondary: #6c757d;
  --spacing-md: 1rem;
  --border-radius-md: 0.5rem;
}

.card {
  background-color: var(--color-primary);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
}
```

---

## Export from Main Index

Don't forget to export theme and utils from your main `src/index.ts`:

```typescript
// Export components
export { Button } from './stories/Button/Button';
export type { ButtonProps } from './stories/Button/Button';

export { Card } from './stories/Card/Card';
export type { CardProps, CardVariant } from './stories/Card/Card';

// Export theme
export * from './theme';

// Export utils
export * from './utils';
```

---

## Summary

This setup provides:

1. **Type-safe theme system** with TypeScript support
2. **Flexible utility functions** for common operations
3. **React Context** for theme distribution
4. **Reusable patterns** that can be applied to all components
5. **Easy customization** through theme provider

You can now use the theme and utils across all your components consistently!
