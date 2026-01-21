import './button.css';
import { cn, getVariantClass } from '../../utils';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'disabled' | "";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant style */
  variant?: ButtonVariant;
  /** How large should the button be? */
  size?: 'small' | 'medium' | 'large';
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Button = ({
  variant = '',
  size = 'medium',
  label,
  className,
  style,
  onClick,
  disabled,
  ...props
}: ButtonProps) => {
  const variantClass = variant ? getVariantClass('button', variant) : '';
  const sizeClass = size ? `button--${size}` : '';
  const isDisabled = variant === 'disabled' || disabled;
  
  // Combine classes: base class, variant class, size class, user's custom class
  const buttonClassName = cn('button', variantClass, sizeClass, isDisabled && 'button--disabled', className);
  return (
    <button
      type="button"
      className={buttonClassName}
      style={style}
      disabled={isDisabled}
      onClick={onClick}
      {...props}
    >
      {label}
    </button>
  );
};
