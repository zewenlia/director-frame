import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, id, label, hint, error, ...props }, ref) => {
    const inputId = id ?? props.name
    return (
      <div className="flex w-full flex-col gap-1.5 text-left">
        {label ? (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-foreground"
          >
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'flex h-9 w-full rounded-[var(--radius-md)] border border-border bg-card px-3 py-2 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-destructive focus-visible:ring-destructive/30',
            className,
          )}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            [hint && `${inputId}-hint`, error && `${inputId}-err`]
              .filter(Boolean)
              .join(' ') || undefined
          }
          {...props}
        />
        {hint && !error ? (
          <p id={`${inputId}-hint`} className="text-xs text-muted-foreground">
            {hint}
          </p>
        ) : null}
        {error ? (
          <p id={`${inputId}-err`} className="text-xs text-destructive">
            {error}
          </p>
        ) : null}
      </div>
    )
  },
)

Input.displayName = 'Input'
