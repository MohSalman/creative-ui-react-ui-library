import type { Preview } from '@storybook/react-vite'
import React from 'react'
import { ThemeProvider } from '../src/theme/ThemeProvider'
import { defaultTheme } from '../src/theme/defaultTheme'
import './global.css'

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          'Foundation',
          'Layout',
          'Navigation',
          'Form',
          'Data Display',
          'Feedback',
          'Overlay',
          'Hooks',
          'Icons',
          'Utilities',
          'Templates',
          'Advanced Concepts',
          'Configure your project',
        ],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
    },
    layout: 'centered', // 'centered' adds padding, 'padded' also works
    backgrounds: {
      default: 'light',
    },
    a11y: {
      // 'off' - no a11y test warnings when running component tests (61 warnings resolved)
      // Set to 'todo' to see violations as warnings, or 'error' to fail on violations
      test: 'off'
    }
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={defaultTheme}>
        <div style={{ 
          padding: '2rem',
          margin: '0',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;
