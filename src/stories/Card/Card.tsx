// import { cn } from '../../lib/utils';
import './card.css';

// Utility function to combine class names
const cn = (...classes: (string | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};
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
  backgroundColor?: string;

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
  cardButtonClass,
  backgroundColor,
  cardBodyClass,
  children,
  variant = 'primary',
  ...props
}: CardProps) => {
  const variantClass = `card-custom-${variant}`;
  const isDisabled = variant === 'disabled';
  const isDisabledClass = isDisabled ? 'card-custom-danger-disabled' : '';
  return (
    <div
      role="card-custom"
      aria-label="card-custom"
      className={cn(className, 'card-custom', variantClass, isDisabledClass)}
      style={{ backgroundColor }}
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
        <button className={cn(cardButtonClass, 'btn-custom')}>Action</button>
      </div>
    </div>
  );
};
