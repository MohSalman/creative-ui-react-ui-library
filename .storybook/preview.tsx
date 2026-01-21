import type { Preview } from '@storybook/react-vite'
import React from 'react'
import { ThemeProvider } from '../src/theme/ThemeProvider'
import { defaultTheme } from '../src/theme/defaultTheme'
import './global.css'

const preview: Preview = {
  parameters: {
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
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
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
