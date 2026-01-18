import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import type { Theme } from './types';

// Custom hook to use theme
export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);
  return context.theme;
};
