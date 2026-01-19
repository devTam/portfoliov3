import { ReactNode } from 'react'
import { clsx } from 'clsx'

interface CardProps {
  children: ReactNode
  className?: string
  glow?: boolean
  hover?: boolean
}

export default function Card({
  children,
  className,
  glow = false,
  hover = false,
}: CardProps) {
  return (
    <div
      className={clsx(
        'bg-bg-tertiary border border-accent-primary/20 rounded-lg p-6',
        glow && 'box-glow-green',
        hover &&
          'transition-all duration-300 hover:border-accent-primary/40 hover:shadow-glow-green',
        className
      )}
    >
      {children}
    </div>
  )
}
