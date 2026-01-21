# @mohammadsalman/storybook-custom-ui

A minimal React TypeScript component library with Storybook, featuring reusable UI components built with React 19 and TypeScript. Components are styled using CSS classes and support theming via CSS custom properties.

## Features

- ✅ **Button component** with multiple variants, sizes, and customizable styling
- ✅ **Card component** with header, body, and footer sections
- ✅ **Theme system** with CSS custom properties for easy customization
- ✅ **Utility functions** for class name management and styling
- ✅ **TypeScript support** with full type safety
- ✅ **Zero inline styles** - all styling via CSS classes
- ✅ **User customization** - supports custom className and style props

## Installation

### Install via npm

```bash
npm install @mohammadsalman/storybook-custom-ui
```

### Install via yarn

```bash
yarn add @mohammadsalman/storybook-custom-ui
```

### Install via pnpm

```bash
pnpm add @mohammadsalman/storybook-custom-ui
```

## Peer Dependencies

This package requires React 19.2.0 or higher. Make sure you have the following installed in your project:

```bash
npm install react@^19.2.0 react-dom@^19.2.0
```

## Usage

### Import CSS Styles (Required)

You need to import the CSS file in your project to apply the component styles:

```tsx
// In your main entry file (e.g., main.tsx, index.tsx, App.tsx)
import '@mohammadsalman/storybook-custom-ui/index.css';
```

Or in your CSS file:

```css
@import '@mohammadsalman/storybook-custom-ui/index.css';
```

### Setup Theme Provider (Recommended)

Wrap your application with `ThemeProvider` to enable theme-based styling:

```tsx
import React from 'react';
import { ThemeProvider, defaultTheme } from '@mohammadsalman/storybook-custom-ui';
import '@mohammadsalman/storybook-custom-ui/index.css';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      {/* Your app components */}
    </ThemeProvider>
  );
}
```

### Basic Component Usage

```tsx
import React from 'react';
import { Button, Card } from '@mohammadsalman/storybook-custom-ui';
import '@mohammadsalman/storybook-custom-ui/index.css'; // Import CSS styles

function App() {
  return (
    <div>
      <Button
        variant="primary"
        size="medium"
        label="Click me"
        onClick={() => console.log('Button clicked!')}
      />
      
      <Card variant="primary">
        Card content
      </Card>
    </div>
  );
}
```

### Button Component

```tsx
import { Button } from '@mohammadsalman/storybook-custom-ui';

// Basic usage
<Button label="Click me" variant="primary" size="medium" />

// With custom className
<Button 
  label="Custom Button" 
  variant="secondary"
  className="my-custom-class" 
/>

// With inline styles
<Button 
  label="Styled Button" 
  variant="success"
  style={{ margin: '20px' }} 
/>

// Different variants
<Button label="Primary" variant="primary" />
<Button label="Danger" variant="danger" />
<Button label="Warning" variant="warning" />
<Button label="Success" variant="success" />
```

**Button Props:**
- `variant`: `'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'disabled'`
- `size`: `'small' | 'medium' | 'large'`
- `label`: `string` (required)
- `onClick`: `() => void` (optional)
- `className`: `string` (optional) - Custom CSS class
- `style`: `React.CSSProperties` (optional) - Inline styles
- All standard HTML button attributes are also supported

### Card Component

```tsx
import { Card } from '@mohammadsalman/storybook-custom-ui';

<Card variant="primary">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>
```

**Card Props:**
- `variant`: `'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'disabled'`
- `children`: `React.ReactNode` (required)
- `className`: `string` (optional)
- `style`: `React.CSSProperties` (optional)

### Theme Customization

You can customize the theme by passing a custom theme object to `ThemeProvider`:

```tsx
import { ThemeProvider } from '@mohammadsalman/storybook-custom-ui';

const customTheme = {
  colors: {
    primary: '#your-color',
    secondary: '#your-color',
    // ... other colors
  },
  // ... other theme properties
};

<ThemeProvider theme={customTheme}>
  <YourApp />
</ThemeProvider>
```

The theme values are converted to CSS custom properties (`--color-primary`, etc.) and can be used in your own CSS as well.

### Utility Functions

```tsx
import { cn, useTheme } from '@mohammadsalman/storybook-custom-ui';

// Combine class names
const className = cn('base-class', condition && 'conditional-class', 'another-class');

// Use theme in your components
const MyComponent = () => {
  const theme = useTheme();
  // Access theme.colors, theme.spacing, etc.
};
```

## Development

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Setup

1. Clone the repository:
```bash
git clone https://github.com/MohSalman/creative-ui-react-ui-library.git
cd creative-ui-react-ui-library
```

2. Install dependencies:
```bash
npm install
```

3. Start Storybook to view components:
```bash
npm run storybook
```

This will start Storybook on `http://localhost:6006`

### Build

Build the library for production:
```bash
npm run build
```

This will create the `dist/` folder with the compiled files, including:
- `dist/index.esm.js` - ES module build
- `dist/index.cjs.js` - CommonJS build
- `dist/index.d.ts` - TypeScript declarations
- `dist/index.css` - CSS file with component styles

### Preview

Preview the built application:
```bash
npm run preview
```

### Lint

Run ESLint:
```bash
npm run lint
```

## Available Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build the library for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the built application
- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build Storybook for static hosting

## Project Structure

```
src/
  ├── stories/          # Storybook stories and components
  │   ├── Button/
  │   ├── Card/
  │   ├── Header/
  │   └── Page/
  ├── theme/            # Theme system
  │   ├── types.ts
  │   ├── defaultTheme.ts
  │   ├── ThemeProvider.tsx
  │   ├── ThemeContext.tsx
  │   └── useTheme.ts
  ├── utils/            # Utility functions
  │   ├── cn.ts         # Class name utility
  │   ├── styles.ts     # Style utilities
  │   └── helpers.ts    # Helper functions
  └── index.ts          # Main entry point
.storybook/             # Storybook configuration
dist/                   # Built files (generated)
```

## Styling Approach

All components use **CSS classes only** - no inline styles are applied by the library. This approach offers:

- ✅ Easy customization via CSS
- ✅ Better performance (no style objects)
- ✅ Theme integration via CSS custom properties
- ✅ Full control for users via `className` and `style` props

## License

MIT

## Author

Mohammad Salman <mohammadsalman71993@gmail.com>

## Repository

[https://github.com/MohSalman/creative-ui-react-ui-library](https://github.com/MohSalman/creative-ui-react-ui-library)
