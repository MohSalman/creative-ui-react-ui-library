import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import type { Theme } from './types';

export interface UseThemeReturn {
  theme: Theme;
  mode?: 'light' | 'dark';
  setMode?: (mode: 'light' | 'dark') => void;
}

// Custom hook to use theme
export const useTheme = (): UseThemeReturn => {
  const context = useContext(ThemeContext);
  return {
    theme: context.theme,
    mode: context.mode,
    setMode: context.setMode,
  };
};
