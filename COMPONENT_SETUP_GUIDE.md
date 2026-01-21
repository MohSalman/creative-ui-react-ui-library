# Component Setup Guide

This guide explains the main patterns and steps to create new components in this library.

## Table of Contents

1. [Main Patterns & Principles](#main-patterns--principles)
2. [Component Structure](#component-structure)
3. [Step-by-Step Component Creation](#step-by-step-component-creation)
4. [CSS Styling Guidelines](#css-styling-guidelines)
5. [Theme Integration](#theme-integration)
6. [Exporting Components](#exporting-components)
7. [Creating Stories](#creating-stories)

---

## Main Patterns & Principles

### ✅ DO's

1. **CSS Classes Only** - Never use inline styles from the library
2. **Theme via CSS Variables** - Use `var(--color-primary)` instead of hardcoded colors
3. **User Control** - Always support `className` and `style` props for user customization
4. **TypeScript Types** - Export component props and variant types
5. **Co-location** - Keep component, CSS, and stories in the same folder

### ❌ DON'Ts

1. **No Inline Styles** - Don't apply inline styles (except user's `style` prop)
2. **No Hardcoded Colors** - Don't use hardcoded color values in CSS
3. **No Theme Dependencies** - Don't import `useTheme` in components (use CSS variables)
4. **No Default Variants** - Use empty string `''` as default variant, not `'primary'`

---

## Component Structure

```
src/stories/
  └── YourComponent/
      ├── YourComponent.tsx          # Component file
      ├── yourComponent.css           # Styles file
      ├── YourComponent.stories.ts    # Storybook stories
      └── index.ts                    # (Optional) Export file
```

---

## Step-by-Step Component Creation

### Step 1: Create Component Folder

```bash
mkdir -p src/stories/YourComponent
```

### Step 2: Create Component File (`YourComponent.tsx`)

```tsx
import './yourComponent.css';
import { cn, getVariantClass } from '../../utils';

// Define variant type
export type YourComponentVariant = 
  | 'primary' 
  | 'secondary' 
  | 'success' 
  | 'danger' 
  | 'warning' 
  | 'info' 
  | 'light' 
  | 'dark' 
  | 'disabled' 
  | '';

// Define props interface
export interface YourComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Component variant */
  variant?: YourComponentVariant;
  /** Size variant */
  size?: 'small' | 'medium' | 'large' | '';
  /** Component content */
  children: React.ReactNode;
  /** Custom className */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

/** Your component description */
export const YourComponent: React.FC<YourComponentProps> = ({
  variant = '',
  size = '',
  children,
  className,
  style,
  disabled,
  ...props
}) => {
  // Generate variant class (only if variant is provided)
  const variantClass = variant ? getVariantClass('your-component', variant) : '';
  
  // Generate size class (only if size is provided)
  const sizeClass = size ? `your-component--${size}` : '';
  
  // Check disabled state
  const isDisabled = variant === 'disabled' || disabled;
  
  // Combine all classes
  const componentClassName = cn(
    'your-component',           // Base class
    variantClass,               // Variant class (e.g., 'your-component--primary')
    sizeClass,                  // Size class (e.g., 'your-component--small')
    isDisabled && 'your-component--disabled',  // Disabled class
    className                   // User's custom class
  );

  return (
    <div
      className={componentClassName}
      style={style}  // Pass through user's style prop
      {...props}      // Spread other HTML attributes
    >
      {children}
    </div>
  );
};
```

### Step 3: Create CSS File (`yourComponent.css`)

```css
/* Base component styles */
.your-component {
  /* Layout properties only - NO colors */
  display: block;
  padding: 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s;
}

/* Size variants */
.your-component--small {
  padding: 0.5rem;
  font-size: 0.875rem;
}

.your-component--medium {
  padding: 1rem;
  font-size: 1rem;
}

.your-component--large {
  padding: 1.5rem;
  font-size: 1.125rem;
}

/* Color variants - ALWAYS use CSS custom properties */
.your-component--primary {
  background-color: var(--color-primary);
  color: white;
}

.your-component--primary:hover:not(:disabled) {
  background-color: var(--color-primary-hover, color-mix(in srgb, var(--color-primary) 85%, black));
}

.your-component--secondary {
  background-color: var(--color-secondary);
  color: white;
}

.your-component--secondary:hover:not(:disabled) {
  background-color: var(--color-secondary-hover, color-mix(in srgb, var(--color-secondary) 85%, black));
}

/* Add other variants: success, danger, warning, info, light, dark */

.your-component--disabled,
.your-component:disabled {
  background-color: var(--color-disabled);
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}
```

### Step 4: Export from Main Index (`src/index.ts`)

```tsx
// Add to src/index.ts
export { YourComponent } from './stories/YourComponent/YourComponent';
export type { YourComponentProps, YourComponentVariant } from './stories/YourComponent/YourComponent';
```

### Step 5: Create Storybook Stories (`YourComponent.stories.ts`)

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { YourComponent } from './YourComponent';

const meta = {
  title: 'Example/YourComponent',
  component: YourComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'disabled', ''],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', ''],
    },
  },
  args: { children: 'Your Component Content' },
} satisfies Meta<typeof YourComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Component',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Component',
  },
};

// Add more stories for other variants
```

---

## CSS Styling Guidelines

### ✅ Use CSS Custom Properties

```css
/* ✅ CORRECT - Uses theme variable */
.your-component--primary {
  background-color: var(--color-primary);
  color: white;
}

/* ❌ WRONG - Hardcoded color */
.your-component--primary {
  background-color: #007bff;
  color: white;
}
```

### ✅ Base Class Should Only Have Layout

```css
/* ✅ CORRECT - Base class has no colors */
.your-component {
  display: block;
  padding: 1rem;
  border-radius: 0.5rem;
}

/* ❌ WRONG - Base class has colors */
.your-component {
  display: block;
  background-color: var(--color-primary);  /* Don't do this */
}
```

### ✅ Variant Classes Handle Colors

```css
/* All color styling goes in variant classes */
.your-component--primary { /* colors */ }
.your-component--secondary { /* colors */ }
```

---

## Theme Integration

### CSS Variables Available

The `ThemeProvider` automatically sets these CSS variables from your theme:

**Colors:**
- `--color-primary`
- `--color-secondary`
- `--color-success`
- `--color-danger`
- `--color-warning`
- `--color-info`
- `--color-light`
- `--color-dark`
- `--color-disabled`

**Typography (if you update ThemeProvider):**
- `--font-family`
- `--font-size-xs`, `--font-size-sm`, `--font-size-md`, etc.
- `--font-weight-light`, `--font-weight-regular`, `--font-weight-medium`, `--font-weight-bold`

**Spacing (if you update ThemeProvider):**
- `--spacing-xs`, `--spacing-sm`, `--spacing-md`, etc.

### Using Theme Variables

```css
.your-component {
  padding: var(--spacing-md, 1rem);  /* Use theme spacing with fallback */
  font-family: var(--font-family, inherit);
  border-radius: var(--border-radius-md, 0.5rem);
}
```

---

## Exporting Components

### 1. Update `src/index.ts`

```tsx
// Export YourComponent
export { YourComponent } from './stories/YourComponent/YourComponent';
export type { YourComponentProps, YourComponentVariant } from './stories/YourComponent/YourComponent';
```

### 2. Update TypeScript Declaration Generator (`scripts/generate-dts.js`)

Add your component types to the declaration file:

```javascript
export interface YourComponentProps {
  variant?: 'primary' | 'secondary' | ... | '';
  size?: 'small' | 'medium' | 'large' | '';
  children: ReactNode;
  className?: string;
}

export declare const YourComponent: ComponentType<YourComponentProps>;
```

---

## Creating Stories

### Story File Structure

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { YourComponent } from './YourComponent';

const meta = {
  title: 'Example/YourComponent',  // Change this!
  component: YourComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'disabled', ''],
    },
  },
  args: { children: 'Default content' },
} satisfies Meta<typeof YourComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// Create stories for each variant
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary variant',
  },
};
```

---

## Checklist for New Components

- [ ] Create component folder: `src/stories/YourComponent/`
- [ ] Create `YourComponent.tsx` with:
  - [ ] Variant type definition
  - [ ] Props interface extending `React.HTMLAttributes<HTMLElement>`
  - [ ] Default variant as empty string `''`
  - [ ] `variantClass` only generated if variant is truthy
  - [ ] `className` and `style` props supported
  - [ ] `...props` spread for HTML attributes
- [ ] Create `yourComponent.css` with:
  - [ ] Base class with layout only (no colors)
  - [ ] Variant classes using CSS custom properties
  - [ ] Size classes if needed
  - [ ] Disabled state styles
- [ ] Export from `src/index.ts`
  - [ ] Component export
  - [ ] Type exports
- [ ] Update `scripts/generate-dts.js` with component types
- [ ] Create `YourComponent.stories.ts` with:
  - [ ] Unique title (no duplicates with other components)
  - [ ] argTypes for variant control
  - [ ] Stories for each variant
- [ ] Test in Storybook
- [ ] Rebuild and verify

---

## Common Patterns

### Pattern 1: Simple Component (like Button)

```tsx
// Component with variant and size
const variantClass = variant ? getVariantClass('component', variant) : '';
const sizeClass = size ? `component--${size}` : '';
const className = cn('component', variantClass, sizeClass, className);
```

### Pattern 2: Component with Multiple Sections (like Card)

```tsx
// Component with header, body, footer
<div className={cn('component', variantClass, className)}>
  <div className={cn('component-header', headerClass)}>Header</div>
  <div className={cn('component-body', bodyClass)}>{children}</div>
  <div className={cn('component-footer', footerClass)}>Footer</div>
</div>
```

### Pattern 3: Component with Dynamic Element (like Typography)

```tsx
// Component that can render different HTML elements
const Component = component || (variant.startsWith('h') ? variant : 'p');
return <Component className={className}>{children}</Component>;
```

---

## Quick Reference

### File Locations

- **Components**: `src/stories/YourComponent/YourComponent.tsx`
- **Styles**: `src/stories/YourComponent/yourComponent.css`
- **Stories**: `src/stories/YourComponent/YourComponent.stories.ts`
- **Exports**: `src/index.ts`
- **Type Declarations**: `scripts/generate-dts.js`

### Key Functions

- `cn(...classes)` - Combine class names
- `getVariantClass(baseClass, variant)` - Generate variant class name

### CSS Class Naming

- Base: `.your-component`
- Variant: `.your-component--primary`
- Size: `.your-component--small`
- Disabled: `.your-component--disabled`

---

## Example: Complete Component

See `src/stories/Button/Button.tsx` and `src/stories/Card/Card.tsx` for complete working examples.

---

## Notes

- Always use empty string `''` as default variant (not `'primary'`)
- Always check if variant exists before generating class: `variant ? getVariantClass(...) : ''`
- Never apply inline styles (except passing through user's `style` prop)
- Always use CSS custom properties for colors from theme
- Always support `className` and `style` props for user customization
