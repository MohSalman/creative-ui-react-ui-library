import { writeFileSync } from 'fs';
import { resolve } from 'path';

const dtsContent = `import { ComponentType, ReactNode } from 'react';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'disabled';
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
  className?: string;
}

export interface CardProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'disabled';
  primary?: boolean;
  className?: string;
  cardHeaderClass?: string;
  cardFooterClass?: string;
  cardTitleClass?: string;
  cardBodyClass?: string;
  cardButtonClass?: string;
  children: ReactNode;
}

export interface HeaderProps {
  user?: {
    name: string;
  };
  onLogin?: () => void;
  onLogout?: () => void;
  onCreateAccount?: () => void;
}

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    danger: string;
    warning: string;
    info: string;
    light: string;
    dark: string;
    disabled: string;
    [key: string]: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    fontWeight: {
      light: number;
      regular: number;
      medium: number;
      bold: number;
    };
    lineHeight: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  borderRadius: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  boxShadow: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
}

export interface ThemeProviderProps {
  theme?: Theme;
  children: ReactNode;
}

export declare const Button: ComponentType<ButtonProps>;
export declare const Card: ComponentType<CardProps>;
export declare const Header: ComponentType<HeaderProps>;
export declare const Page: ComponentType;
export declare const ThemeProvider: ComponentType<ThemeProviderProps>;
export declare const defaultTheme: Theme;
export declare function useTheme(): Theme;
export declare function cn(...classes: (string | undefined | null | boolean)[]): string;
export declare function getVariantClass(baseClass: string, variant: string): string;
export declare function getColorByVariant(theme: Theme, variant: string): string;
`;

const outputPath = resolve(process.cwd(), 'dist/index.d.ts');
writeFileSync(outputPath, dtsContent, 'utf-8');
console.log('✓ Generated dist/index.d.ts');
