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
