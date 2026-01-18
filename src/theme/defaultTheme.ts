import type { Theme } from "./types";

export const defaultTheme: Theme = {
    colors: {
        primary: '#2563EB',   // Blue 600 – trust, brand, actions
        secondary: '#64748B', // Slate 500 – subtle UI elements
        success: '#16A34A',   // Green 600 – success states
        danger: '#DC2626',    // Red 600 – errors & destructive actions
        warning: '#F59E0B',   // Amber 500 – warnings
        info: '#0EA5E9',      // Sky 500 – info messages
        light: '#F8FAFC',     // Slate 50 – backgrounds
        dark: '#0F172A',      // Slate 900 – text & headers
        disabled: '#CBD5E1',  // Slate 300 – disabled states
    },
    typography: {
        fontFamily: 'Inter, sans-serif',
        fontSize: {
            xs: '12px',
            sm: '14px',    // 1rem
            md: '16px',    // 1.125rem
            lg: '18px',    // 1.25rem
            xl: '20px',    // 1.5rem
            xxl: '22px',   // 1.75rem
        },
        fontWeight: {
            light: 300,
            regular: 400,
            medium: 500,
            bold: 700,
        },
        lineHeight: {
            xs: '12px',
            sm: '14px',
            md: '16px',
            lg: '18px',         
            xl: '20px',
            xxl: '22px',
        },
    },
    spacing: {
        xs: '12px',
        sm: '14px',
        md: '16px',
        lg: '18px',
        xl: '20px',
        xxl: '22px',
    },      
    borderRadius: {
        xs: '12px',
        sm: '14px',
        md: '16px',
        lg: '18px',
        xl: '20px',
        xxl: '22px',
    },
    boxShadow: {
        xs: '12px',
        sm: '14px',
        md: '16px',     
        lg: '18px',
        xl: '20px',
        xxl: '22px',
    },
    breakpoints: {
        xs: '12px',
        sm: '14px',
        md: '16px',
        lg: '18px',
        xl: '20px',
        xxl: '22px',
    },
}