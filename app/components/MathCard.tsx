import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Difficulty } from '@/lib/types'

interface MathCardProps {
  children: React.ReactNode
  difficulty?: Difficulty
  className?: string
  animated?: boolean
  title?: string
  subtitle?: string
}

export function MathCard({ 
  children, 
  difficulty, 
  className, 
  animated = false,
  title,
  subtitle 
}: MathCardProps) {
  const difficultyConfig = {
    easy: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      badge: 'bg-green-600',
      emoji: '🟢'
    },
    medium: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800',
      badge: 'bg-yellow-600',
      emoji: '🟡'
    },
    hard: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800', 
      badge: 'bg-red-600',
      emoji: '🔴'
    }
  }

  const config = difficulty ? difficultyConfig[difficulty] : null

  return (
    <Card className={cn(
      "relative overflow-hidden border-2 shadow-lg",
      config?.border,
      config?.bg,
      className
    )}>
      {/* Difficulty badge */}
      {difficulty && config && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className={cn(
            "text-white font-bold px-3 py-1 text-xs",
            config.badge
          )}>
            <span className="mr-1">{config.emoji}</span>
            {difficulty.toUpperCase()}
          </Badge>
        </div>
      )}


      {title && (
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-2 text-xl font-bold">
            {title}
          </CardTitle>
          {subtitle && (
            <p className="text-muted-foreground font-medium">{subtitle}</p>
          )}
        </CardHeader>
      )}

      <CardContent className="relative z-10">
        {children}
      </CardContent>
    </Card>
  )
}