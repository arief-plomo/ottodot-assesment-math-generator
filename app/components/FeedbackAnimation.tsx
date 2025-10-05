'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface FeedbackAnimationProps {
  isCorrect: boolean
  show: boolean
  onComplete?: () => void
}

export function FeedbackAnimation({ isCorrect, show, onComplete }: FeedbackAnimationProps) {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (show) {
      setAnimate(true)
      const timer = setTimeout(() => {
        setAnimate(false)
        onComplete?.()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [show, onComplete])

  if (!show) return null

  return (
    <>
      {/* Main celebration animation */}
      <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
        <div className={cn(
          "text-8xl transition-all duration-1000 transform",
          animate ? "scale-150 rotate-12" : "scale-100 rotate-0",
          isCorrect ? "animate-bounce" : "animate-pulse"
        )}>
          {isCorrect ? "🎉" : "💪"}
        </div>
      </div>

      {/* Confetti for correct answers */}
      {isCorrect && animate && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: '1s',
                backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][Math.floor(Math.random() * 5)]
              }}
            />
          ))}
        </div>
      )}

      {/* Encouraging text */}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 pointer-events-none z-50">
        <div className={cn(
          "px-6 py-3 rounded-full text-white font-bold text-lg transition-all duration-500",
          animate ? "scale-110 opacity-100" : "scale-90 opacity-0",
          isCorrect ? "bg-green-500" : "bg-blue-500"
        )}>
          {isCorrect ? "Great job! 🌟" : "Keep trying! 🚀"}
        </div>
      </div>
    </>
  )
}