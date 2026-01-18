import { writeFileSync } from 'fs';
import { resolve } from 'path';

const dtsContent = `import { ComponentType } from 'react';

export interface ButtonProps {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: 'small' | 'medium' | 'large';
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
}

export interface HeaderProps {
  user?: {
    name: string;
  };
  onLogin?: () => void;
  onLogout?: () => void;
  onCreateAccount?: () => void;
}

export declare const Button: ComponentType<ButtonProps>;
export declare const Header: ComponentType<HeaderProps>;
export declare const Page: ComponentType;
`;

const outputPath = resolve(process.cwd(), 'dist/index.d.ts');
writeFileSync(outputPath, dtsContent, 'utf-8');
console.log('✓ Generated dist/index.d.ts');
