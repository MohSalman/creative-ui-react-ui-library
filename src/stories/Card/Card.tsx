// import { cn } from '../../lib/utils';
import { cn, getVariantClass } from '../../utils';
import './card.css';
import { Button } from '../Button/Button';

// Utility function to combine class names
export type CardVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'disabled' | "";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  className?: string;
  cardHeaderClass?: string;
  cardFooterClass?: string;
  cardTitleClass?: string;
  cardBodyClass?: string;
  /** What background color to use */
  disabled?: boolean;
  cardButtonClass?: string;
  size?: 'small' | 'medium' | 'large' | "";

  /** Card contents */
  children: React.ReactNode;
}

/** Primary UI component for user interaction */
export const Card = ({
  className,
  cardHeaderClass,
  cardFooterClass,
  cardTitleClass,
  cardBodyClass,
  children,
  style,
  size = '',
  disabled,
  variant = '',
  ...props
}: CardProps) => {
  const variantClass = variant ? getVariantClass('card-custom', variant) : '';
  const isDisabled = variant === 'disabled' || disabled;
  const sizeClass = size ? `card--${size}` : '';
  const cardClassName = cn('card-custom', variantClass, sizeClass, isDisabled && 'card--disabled', className);
  return (
    <div
      role="card-custom"
      aria-label="card-custom"
      className={cardClassName}
      style={style}
      aria-disabled={isDisabled}
      {...props}
    >
      <div className={cn(cardHeaderClass, 'card-header-custom')}>
        <h3 className={cn(cardTitleClass, 'card-title-custom')}>Card Title</h3>
      </div>
      <div className={cn(cardBodyClass, 'card-body-custom')}>
        {children}
      </div>
      <div className={cn(cardFooterClass, 'card-footer-custom')}>
        <Button 
          label="Action"
          variant={variant}
          size="medium"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};
