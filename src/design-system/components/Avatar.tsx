import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  initials: string
  label?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
}

export function Avatar({
  className,
  initials,
  label,
  size = 'md',
  ...props
}: AvatarProps) {
  return (
    <div
      role="img"
      aria-label={label ?? initials}
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground ring-2 ring-card',
        sizeMap[size],
        className,
      )}
      {...props}
    >
      {initials.slice(0, 2).toUpperCase()}
    </div>
  )
}
