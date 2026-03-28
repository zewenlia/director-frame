import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'destructive'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring',
  secondary:
    'bg-muted text-foreground hover:bg-muted/80 border border-transparent focus-visible:ring-2 focus-visible:ring-ring',
  ghost:
    'bg-transparent hover:bg-muted text-foreground focus-visible:ring-2 focus-visible:ring-ring',
  outline:
    'border border-border bg-card text-foreground hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring',
  destructive:
    'bg-destructive text-white shadow-sm hover:bg-destructive/90 focus-visible:ring-2 focus-visible:ring-ring',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs gap-1.5 rounded-[var(--radius-sm)]',
  md: 'h-9 px-4 text-sm gap-2 rounded-[var(--radius-md)]',
  lg: 'h-11 px-5 text-sm gap-2 rounded-[var(--radius-md)]',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'primary', size = 'md', type = 'button', ...props },
    ref,
  ) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        'inline-flex items-center justify-center font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  ),
)

Button.displayName = 'Button'
