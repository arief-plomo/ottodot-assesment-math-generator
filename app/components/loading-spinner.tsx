import { cn } from '@/lib/utils'
import { Brain, Loader2 } from 'lucide-react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  variant?: 'default' | 'dots' | 'pulse' | 'brain'
  text?: string
}

export function LoadingSpinner({ 
  size = 'md', 
  className = '',
  variant = 'default',
  text
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  }

  if (variant === 'dots') {
    return (
      <div className={cn('flex items-center justify-center space-x-1', className)}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              'rounded-full bg-purple-500 animate-pulse',
              size === 'sm' ? 'w-1 h-1' : size === 'md' ? 'w-2 h-2' : 'w-3 h-3'
            )}
            style={{
              animationDelay: `${i * 0.1}s`,
              animationDuration: '0.6s'
            }}
          />
        ))}
        {text && (
          <span className={cn('ml-3 text-muted-foreground', textSizeClasses[size])}>
            {text}
          </span>
        )}
      </div>
    )
  }

  if (variant === 'pulse') {
    return (
      <div className={cn('flex flex-col items-center justify-center space-y-3', className)}>
        <div className={cn(
          'rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse',
          sizeClasses[size]
        )} />
        {text && (
          <span className={cn('text-muted-foreground animate-pulse', textSizeClasses[size])}>
            {text}
          </span>
        )}
      </div>
    )
  }

  if (variant === 'brain') {
    return (
      <div className={cn('flex flex-col items-center justify-center space-y-4', className)}>
        <div className="relative">
          <Brain className={cn(
            'text-purple-500 animate-bounce-gentle',
            sizeClasses[size]
          )} />
          <div className="absolute inset-0 bg-purple-500/20 rounded-full animate-ping" />
        </div>
        {text && (
          <span className={cn('text-muted-foreground font-medium', textSizeClasses[size])}>
            {text}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col items-center justify-center space-y-3', className)}>
      <Loader2 className={cn('animate-spin text-purple-500', sizeClasses[size])} />
      {text && (
        <span className={cn('text-muted-foreground', textSizeClasses[size])}>
          {text}
        </span>
      )}
    </div>
  )
}