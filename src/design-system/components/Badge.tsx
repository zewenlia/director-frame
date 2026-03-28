import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export type BadgeVariant = 'default' | 'secondary' | 'outline' | 'success' | 'warning'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-primary/10 text-primary border border-primary/20',
  secondary: 'bg-muted text-muted-foreground border border-border',
  outline: 'border border-border bg-card text-foreground',
  success: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
  warning: 'bg-amber-50 text-amber-900 border border-amber-200',
}

export function Badge({
  className,
  variant = 'default',
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  )
}
