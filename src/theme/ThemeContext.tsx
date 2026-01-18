import { createContext } from 'react';
import type { ThemeContextValue } from './types';
import { defaultTheme } from './defaultTheme';

export const ThemeContext = createContext<ThemeContextValue>({
  theme: defaultTheme,
});
