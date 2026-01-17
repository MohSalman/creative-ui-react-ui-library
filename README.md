# @mohammadsalman/storybook-custom-ui

A minimal React TypeScript component library with Storybook, featuring reusable UI components built with React 19 and TypeScript.

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

### Import Components

```tsx
import { Button } from '@mohammadsalman/storybook-custom-ui';
```

### Example

```tsx
import React from 'react';
import { Button } from '@mohammadsalman/storybook-custom-ui';

function App() {
  return (
    <div>
      <Button
        primary={true}
        size="large"
        label="Click me"
        onClick={() => console.log('Button clicked!')}
      />
    </div>
  );
}

export default App;
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

Build the library:
```bash
npm run build
```

This will create the `dist/` folder with the compiled files.

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
  │   ├── Header/
  │   └── Page/
  ├── index.ts          # Main entry point
  └── ...
.storybook/            # Storybook configuration
dist/                  # Built files (generated)
```

## License

MIT

## Author

Mohammad Salman <mohammadsalman71993@gmail.com>

## Repository

[https://github.com/MohSalman/creative-ui-react-ui-library](https://github.com/MohSalman/creative-ui-react-ui-library)
