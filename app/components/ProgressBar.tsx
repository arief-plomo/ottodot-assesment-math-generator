import { cn } from '@/lib/utils'

interface ProgressBarProps {
  current: number
  max: number
  label: string
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red'
  showPercentage?: boolean
  animated?: boolean
  icon?: string
}

export function ProgressBar({ 
  current, 
  max, 
  label, 
  color = 'blue',
  showPercentage = true,
  animated = true,
  icon
}: ProgressBarProps) {
  const percentage = Math.min((current / max) * 100, 100)
  
  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600', 
    purple: 'bg-purple-600',
    orange: 'bg-orange-500',
    red: 'bg-red-500'
  }

  const gradientClasses = {
    blue: 'from-blue-400 to-blue-600',
    green: 'from-green-400 to-green-600',
    purple: 'from-purple-400 to-purple-600', 
    orange: 'from-orange-400 to-orange-600',
    red: 'from-red-400 to-red-600'
  }

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon && <span className="text-lg">{icon}</span>}
          <span className="text-sm font-semibold text-foreground">{label}</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <span>{current}/{max}</span>
          {showPercentage && (
            <span className="text-xs">({Math.round(percentage)}%)</span>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative">
        <div className="w-full bg-muted rounded-full h-4 overflow-hidden shadow-inner">
          <div 
            className={cn(
              "h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r",
              gradientClasses[color],
              animated && "animate-pulse"
            )}
            style={{ 
              width: `${percentage}%`,
              transition: animated ? 'width 0.7s ease-out' : 'none'
            }}
          />
        </div>

        {/* Glow effect */}
        {percentage > 0 && (
          <div 
            className={cn(
              "absolute top-0 h-full rounded-full opacity-50 blur-sm bg-gradient-to-r",
              gradientClasses[color]
            )}
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>

      {/* Milestones */}
      {max <= 10 && (
        <div className="flex justify-between text-xs text-muted-foreground">
          {Array.from({ length: max + 1 }, (_, i) => (
            <div
              key={i}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                i <= current ? colorClasses[color] : "bg-muted-foreground/30"
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}