import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, id, label, ...props }, ref) => {
    const tid = id ?? props.name
    return (
      <div className="flex w-full flex-col gap-1.5 text-left">
        {label ? (
          <label
            htmlFor={tid}
            className="text-sm font-medium text-foreground"
          >
            {label}
          </label>
        ) : null}
        <textarea
          ref={ref}
          id={tid}
          className={cn(
            'min-h-[100px] w-full resize-y rounded-[var(--radius-md)] border border-border bg-card px-3 py-2 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          {...props}
        />
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'
