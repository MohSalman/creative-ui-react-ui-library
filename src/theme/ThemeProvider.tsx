import { useEffect, type ReactNode } from "react";
import type { Theme, ThemeContextValue } from "./types";
import { defaultTheme } from "./defaultTheme";
import { darkTheme } from "./darkTheme";
import { ThemeContext } from "./ThemeContext";

export type ThemeMode = 'light' | 'dark';

export interface ThemeProviderProps {
    theme?: Theme;
    /** Light or dark mode - merges with theme when set */
    mode?: ThemeMode;
    /** Called when mode changes (e.g. from a toggle) */
    onModeChange?: (mode: ThemeMode) => void;
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
    theme: themeProp,
    mode = 'light',
    onModeChange,
    children,
}) => {
    const theme = themeProp ?? (mode === 'dark' ? darkTheme : defaultTheme);

    // Set CSS custom properties from theme
    useEffect(() => {
        const root = document.documentElement;

        // Set mode for CSS
        root.setAttribute('data-theme', mode);

        // Set color variables
        if (theme.colors) {
            Object.entries(theme.colors).forEach(([key, value]) => {
                root.style.setProperty(`--color-${key}`, value);
            });
        }

        // Cleanup function (optional, but good practice)
        // Set typography variables
        if (theme.typography) {
            root.style.setProperty('--font-family', theme.typography.fontFamily);

            Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
                root.style.setProperty(`--font-size-${key}`, value);
            });

            Object.entries(theme.typography.fontWeight).forEach(([key, value]) => {
                root.style.setProperty(`--font-weight-${key}`, String(value));
            });
        }
    }, [theme, mode]);

    const contextValue: ThemeContextValue = {
        theme,
        mode,
        setMode: onModeChange,
    };
    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};
