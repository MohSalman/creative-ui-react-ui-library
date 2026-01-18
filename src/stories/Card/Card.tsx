// import { cn } from '../../lib/utils';
import { useTheme } from '../../theme';
import { cn, getColorByVariant, getVariantClass } from '../../utils';
import './card.css';
import { Button } from '../Button/Button';

// Utility function to combine class names
export type CardVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'disabled';

export interface CardProps {
  variant?: CardVariant;
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  className?: string;
  cardHeaderClass?: string;
  cardFooterClass?: string;
  cardTitleClass?: string;
  cardBodyClass?: string;
  /** What background color to use */

  cardButtonClass?: string;

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
  variant = 'primary',
  ...props
}: CardProps) => {
  const theme = useTheme();
  // const variantClass = `card-custom-${variant}`;
  const variantColor = getColorByVariant(theme, variant);
  const variantClass = getVariantClass('card', variant);
  const isDisabled = variant === 'disabled';
  const cardStyle = {
    backgroundColor: variant === 'disabled' ? theme.colors.disabled : variantColor,
    color: variant === 'light' ? theme.colors.dark : theme.colors.white,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  };
  return (
    <div
      role="card-custom"
      aria-label="card-custom"
      className={cn('card', variantClass, className)}
      style={cardStyle}
      aria-disabled={isDisabled ? true : false}
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
