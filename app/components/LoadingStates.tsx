'use client'

import { cn } from '@/lib/utils'
import { LoadingSpinner } from './loading-spinner'
import { Brain, Trophy, Award, History } from 'lucide-react'

interface LoadingStateProps {
  className?: string
}

export function PracticeLoading({ className }: LoadingStateProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Settings Card Loading */}
      <div className="rounded-3xl border bg-card p-6 shadow-lg animate-pulse">
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 bg-muted rounded" />
              <div className="h-5 w-32 bg-muted rounded" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-12 bg-muted rounded-xl" />
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 bg-muted rounded" />
              <div className="h-5 w-24 bg-muted rounded" />
            </div>
            <div className="h-12 bg-muted rounded-xl" />
          </div>
          
          <div className="h-14 bg-gradient-to-r from-blue-300 to-blue-400 rounded-xl animate-shimmer" />
        </div>
      </div>

      {/* Problem Card Loading */}
      <div className="rounded-3xl border bg-card p-6 shadow-lg animate-pulse">
        <div className="space-y-6">
          <div className="p-6 bg-muted/30 rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-muted">
                <Brain className="h-6 w-6 text-muted-foreground animate-pulse" />
              </div>
              <div className="flex-1 space-y-3">
                <div className="h-5 bg-muted rounded w-4/5" />
                <div className="h-5 bg-muted rounded w-3/5" />
                <div className="h-5 bg-muted rounded w-2/3" />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="h-4 bg-muted rounded w-32" />
            <div className="h-14 bg-muted rounded-xl" />
            <div className="h-14 bg-gradient-to-r from-green-300 to-green-400 rounded-xl animate-shimmer" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProgressLoading({ className }: LoadingStateProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="rounded-3xl border bg-card p-6 shadow-lg animate-pulse">
        <div className="space-y-6">
          {/* Level Progress */}
          <div className="p-4 rounded-xl bg-muted/30">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="text-lg">⭐</div>
                  <div className="h-4 bg-muted rounded w-32" />
                </div>
                <div className="h-4 bg-muted rounded w-16" />
              </div>
              <div className="w-full bg-muted rounded-full h-4">
                <div className="bg-gradient-to-r from-blue-300 to-blue-400 h-4 rounded-full w-3/5 animate-shimmer" />
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-center p-4 rounded-xl bg-muted/30">
                <div className="text-2xl mb-1">
                  {i === 0 && '📚'}
                  {i === 1 && '✅'} 
                  {i === 2 && '🎯'}
                  {i === 3 && '🔥'}
                </div>
                <div className="h-8 bg-muted rounded mb-2" />
                <div className="h-3 bg-muted rounded" />
              </div>
            ))}
          </div>

          {/* Difficulty Progress */}
          <div className="space-y-4">
            <div className="h-5 bg-muted rounded w-48" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        {i === 0 && '🟢'}
                        {i === 1 && '🟡'}
                        {i === 2 && '🔴'}
                      </span>
                      <div className="h-4 bg-muted rounded w-24" />
                    </div>
                    <div className="h-4 bg-muted rounded w-12" />
                  </div>
                  <div className="w-full bg-muted rounded-full h-4">
                    <div className={cn(
                      "h-4 rounded-full animate-shimmer",
                      i === 0 && "bg-gradient-to-r from-green-300 to-green-400 w-4/5",
                      i === 1 && "bg-gradient-to-r from-orange-300 to-orange-400 w-3/5", 
                      i === 2 && "bg-gradient-to-r from-red-300 to-red-400 w-2/5"
                    )} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function BadgesLoading({ className }: LoadingStateProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="rounded-3xl border bg-card p-6 shadow-lg animate-pulse">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="h-6 bg-muted rounded w-48" />
            <div className="h-4 bg-muted rounded w-64" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className={cn(
                "flex flex-col items-center gap-2 rounded-xl border-2 p-3",
                i < 3 
                  ? "border-orange-300 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20" 
                  : "border-gray-200 dark:border-gray-700 bg-muted/50 opacity-60"
              )}>
                <div className={cn(
                  "text-2xl",
                  i < 3 ? "animate-bounce" : ""
                )}>
                  {i === 0 && '🎉'}
                  {i === 1 && '🔥'}
                  {i === 2 && '🎯'}
                  {i >= 3 && '🔒'}
                </div>
                <div className="text-center space-y-1 w-full">
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-3 bg-muted rounded w-3/4 mx-auto" />
                </div>
                <div className={cn(
                  "h-6 rounded w-16",
                  i < 3 
                    ? "bg-gradient-to-r from-orange-400 to-orange-500" 
                    : "bg-muted"
                )} />
              </div>
            ))}
          </div>
          
          <div className="p-4 rounded-xl bg-muted/30">
            <div className="space-y-2">
              <div className="h-5 bg-muted rounded w-32" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-3/4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function HistoryLoading({ className }: LoadingStateProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="rounded-3xl border bg-card p-6 shadow-lg animate-pulse">
        <div className="space-y-4 max-h-96">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="p-4 rounded-xl border-2 border-muted">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex flex-wrap gap-2">
                  <div className="h-6 bg-muted rounded w-16" />
                  <div className="h-6 bg-muted rounded w-20" />
                  <div className="h-6 bg-muted rounded w-24" />
                </div>
                <div className="h-4 bg-muted rounded w-20" />
              </div>
              <div className="h-4 bg-muted rounded w-full mb-2" />
              <div className="h-4 bg-muted rounded w-4/5 mb-2" />
              <div className="h-12 bg-muted/50 rounded p-2">
                <div className="h-3 bg-muted rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function EmptyState({ 
  icon, 
  title, 
  description, 
  action,
  className 
}: {
  icon: React.ReactNode
  title: string
  description: string
  action?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("text-center py-12", className)}>
      <div className="mb-4 flex justify-center">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">{description}</p>
      {action}
    </div>
  )
}