import { ButtonHTMLAttributes, ReactNode } from 'react'
import { clsx } from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  glow?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  glow = false,
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    'font-mono font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-bg-primary'

  const variants = {
    primary:
      'bg-accent-primary text-bg-primary hover:bg-accent-secondary hover:text-bg-primary',
    secondary:
      'bg-accent-secondary text-bg-primary hover:bg-accent-primary hover:text-bg-primary',
    outline:
      'border-2 border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-bg-primary',
    ghost: 'text-accent-primary hover:bg-accent-primary/10',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  }

  const glowStyles = glow
    ? 'shadow-glow-green hover:shadow-glow-green-lg'
    : ''

  return (
    <button
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        glowStyles,
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
