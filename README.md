# @mohammadsalman/storybook-custom-ui

A React TypeScript component library with Storybook, featuring reusable UI components built with React 19 and TypeScript. Components are styled with CSS classes and support theming via CSS custom properties. Storybook 10 includes component testing (Vitest), accessibility checks, docs, and coverage reporting.

## Features

- **Foundation** – Typography, colors, spacing, radius, shadows, themes
- **Layout** – Box, Stack, Flex, Grid, Container, Divider, Spacer, Center; AppShell, PageLayout, MainContent, Sidebar, TopNav, Footer
- **Navigation** – Navbar, Breadcrumbs, Tabs, Menu, Pagination
- **Form** – Input, Checkbox, Radio, Switch, Select, Textarea, DatePicker, FileUpload, FormField, PasswordField, OTPInput
- **Data Display** – Table, Card, Badge, Tag, Avatar, StatCard, Typography
- **Feedback** – Alert, Loader, Toast
- **Overlay** – Modal, Drawer, Tooltip
- **Theme system** – CSS custom properties, light/dark, `ThemeProvider`, `useTheme`
- **Utilities** – `cn` (class names), style helpers
- **TypeScript** – Full type safety and exported types
- **Storybook** – Docs, Vitest component tests, a11y addon, coverage at `/coverage/index.html`

## Installation

### npm

```bash
npm install @mohammadsalman/storybook-custom-ui
```

### yarn

```bash
yarn add @mohammadsalman/storybook-custom-ui
```

### pnpm

```bash
pnpm add @mohammadsalman/storybook-custom-ui
```

## Peer Dependencies

Requires React 19.2.0 or higher:

```bash
npm install react@^19.2.0 react-dom@^19.2.0
```

## Usage

### Import CSS (required)

Import the library CSS so component styles apply:

```tsx
// e.g. in main.tsx, index.tsx, or App.tsx
import '@mohammadsalman/storybook-custom-ui/index.css';
```

Or in CSS:

```css
@import '@mohammadsalman/storybook-custom-ui/index.css';
```

### Theme provider (recommended)

Wrap the app with `ThemeProvider` for theme-based styling:

```tsx
import React from 'react';
import { ThemeProvider, defaultTheme } from '@mohammadsalman/storybook-custom-ui';
import '@mohammadsalman/storybook-custom-ui/index.css';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      {/* Your app */}
    </ThemeProvider>
  );
}
```

### Basic usage

```tsx
import { Button, Card, Input, Modal } from '@mohammadsalman/storybook-custom-ui';
import '@mohammadsalman/storybook-custom-ui/index.css';

function App() {
  return (
    <div>
      <Button variant="primary" size="medium" label="Submit" onClick={() => {}} />
      <Card variant="primary">Card content</Card>
      <Input label="Email" placeholder="you@example.com" />
    </div>
  );
}
```

### Theme customization

Pass a custom theme to `ThemeProvider`; values are exposed as CSS custom properties (e.g. `--color-primary`):

```tsx
import { ThemeProvider } from '@mohammadsalman/storybook-custom-ui';

const customTheme = {
  colors: { primary: '#your-color', /* ... */ },
  /* ... */
};

<ThemeProvider theme={customTheme}>
  <YourApp />
</ThemeProvider>
```

### Utilities

```tsx
import { cn, useTheme } from '@mohammadsalman/storybook-custom-ui';

const className = cn('base-class', condition && 'conditional-class');
const theme = useTheme(); // theme.colors, theme.spacing, etc.
```

## Development

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Playwright (for component tests): `npx playwright install chromium`

### Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/MohSalman/creative-ui-react-ui-library.git
   cd creative-ui-react-ui-library
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Install Playwright browser for tests:
   ```bash
   npx playwright install chromium
   ```

4. Start Storybook:
   ```bash
   npm run storybook
   ```
   Opens at **http://localhost:6006**.

### Build

```bash
npm run build
```

Produces `dist/`: `index.esm.js`, `index.cjs.js`, `index.d.ts`, `index.css`.

### Testing

Component tests run in a real browser (Chromium via Playwright) via the Storybook Vitest addon.

- **Run once:**  
  `npm run test-storybook`
- **Watch mode:**  
  `npm run test-storybook:watch`
- **With coverage:**  
  `npm run test-storybook:coverage`

After generating coverage, the HTML report is available at **http://localhost:6006/coverage/index.html** when Storybook is running (the `coverage` folder is served at `/coverage` when it exists).

### Lint

```bash
npm run lint
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build the library |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |
| `npm run storybook` | Start Storybook (port 6006) |
| `npm run build-storybook` | Build Storybook for static deploy |
| `npm run test-storybook` | Run Storybook component tests once |
| `npm run test-storybook:watch` | Run tests in watch mode |
| `npm run test-storybook:coverage` | Run tests and generate coverage report |

## Storybook

- **Docs** – MDX docs and auto-generated props tables  
- **Vitest addon** – Component tests in browser, run from the Test panel or CLI  
- **Accessibility addon** – Manual a11y checks in the Accessibility panel  
- **Coverage** – Enable coverage in the Test panel or run `npm run test-storybook:coverage`; view report at `/coverage/index.html` when Storybook is running  

Story order: Foundation → Layout → Navigation → Form → Data Display → Feedback → Overlay → Hooks → Icons → Utilities → Templates → Advanced Concepts → Configure.

## Project structure

```
.storybook/           # Storybook config
  main.ts             # Stories, addons, staticDirs (coverage)
  preview.tsx         # ThemeProvider, globals, storySort
  global.css          # Theme variables (light/dark)
  vitest.setup.ts     # Project annotations for Vitest
src/
  stories/            # Components and stories
    Foundation/       # Colors, Radius, Shadows, Spacing, Themes, Typography (MDX)
    Layout/           # Box, Stack, Flex, Grid, Container, Divider, Spacer, Center
    Button/, Card/, Typography/, Header/, Page/
    Input/, Checkbox/, Radio/, Switch/, Select/, Textarea/, DatePicker/, FileUpload/, FormField/, PasswordField/, OTPInput/
    Table/, Badge/, Tag/, Avatar/, StatCard/
    Alert/, Loader/, Toast/
    Modal/, Drawer/, Tooltip/
    Navbar/, Breadcrumbs/, Tabs/, Menu/, Pagination/
    AppShell/, PageLayout/, MainContent/, Sidebar/, TopNav/, Footer/
    Hooks/, Icons/, Utilities/  # MDX docs
    Templates/        # Dashboard, Auth, Form, Settings, Empty state
  theme/              # ThemeProvider, defaultTheme, darkTheme, useTheme, types
  utils/              # cn, helpers, styles
  index.ts            # Public API
vite.config.ts        # Library build
vitest.config.ts      # Storybook project, browser mode, coverage
coverage/             # Generated by test-storybook:coverage (gitignored)
```

## Styling

Components use **CSS classes only**; no inline styles from the library. You can override or extend with `className` and `style` props. Theming is done via CSS custom properties set by `ThemeProvider`.

## License

MIT

## Author

Mohammad Salman <mohammadsalman71993@gmail.com>

## Repository

[https://github.com/MohSalman/creative-ui-react-ui-library](https://github.com/MohSalman/creative-ui-react-ui-library)
