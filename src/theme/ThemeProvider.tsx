import { useEffect, type ReactNode } from "react";
import type { Theme, ThemeContextValue } from "./types";
import { defaultTheme } from "./defaultTheme";
import { ThemeContext } from "./ThemeContext";

export interface ThemeProviderProps {
  theme?: Theme;
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme = defaultTheme,
  children,
}) => {
  // Set CSS custom properties from theme
  useEffect(() => {
    const root = document.documentElement;
    
    // Set color variables
    if (theme.colors) {
      Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
      });
    }
    
    // Cleanup function (optional, but good practice)
    return () => {
      // Optionally clear CSS variables on unmount if needed
    };
  }, [theme]);

  const contextValue: ThemeContextValue = {
    theme,
  };
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
