'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  Brain, 
  TrendingUp, 
  Award, 
  History, 
  Menu, 
  X,
  Home,
  Settings,
  User
} from 'lucide-react'

interface NavigationItem {
  id: string
  label: string
  icon: React.ReactNode
  badge?: number
  isActive?: boolean
}

interface MobileNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
  className?: string
}

const navigationItems: NavigationItem[] = [
  {
    id: 'practice',
    label: 'Practice',
    icon: <Brain className="w-5 h-5" />
  },
  {
    id: 'progress', 
    label: 'Score Tracking',
    icon: <TrendingUp className="w-5 h-5" />
  },
  {
    id: 'history',
    label: 'History',
    icon: <History className="w-5 h-5" />
  }
]

export function MobileNavigation({ activeTab, onTabChange, className }: MobileNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile Bottom Navigation - Hidden on desktop */}
      <div className={cn(
        "fixed bottom-0 left-0 right-0 z-50 lg:hidden",
        "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl",
        "border-t border-white/20 dark:border-white/10",
        "supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:dark:bg-slate-900/60",
        className
      )}>
        <div className="grid grid-cols-3 gap-1 p-2">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex flex-col items-center gap-1 h-auto py-2 px-1 relative",
                "hover:bg-blue-50 dark:hover:bg-blue-950/20",
                "transition-all duration-300",
                activeTab === item.id && [
                  "bg-gradient-to-t from-blue-100 to-blue-50",
                  "dark:from-blue-950/30 dark:to-blue-900/20",
                  "text-blue-700 dark:text-blue-300",
                  "scale-105"
                ]
              )}
            >
              <div className="relative">
                {item.icon}
                {item.badge && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {item.badge}
                  </div>
                )}
              </div>
              <span className="text-xs font-medium truncate max-w-full">
                {item.label}
              </span>
              {activeTab === item.id && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Mobile Menu Button - Hidden on desktop */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={cn(
          "fixed top-4 right-4 z-50 lg:hidden",
          "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md",
          "border border-white/20 dark:border-white/10",
          "shadow-lg hover:shadow-xl transition-all duration-300"
        )}
      >
        {isMenuOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </Button>

      {/* Mobile Slide-out Menu */}
      <div className={cn(
        "fixed inset-y-0 right-0 z-40 w-80 lg:hidden",
        "bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl",
        "border-l border-white/20 dark:border-white/10",
        "shadow-2xl",
        "transform transition-transform duration-300 ease-in-out",
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col h-full pt-16 p-6">
          {/* Profile Section */}
          <div className="mb-8">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-100 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/20">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-500 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Math Explorer</h3>
                <p className="text-sm text-muted-foreground">Level 5 • 1,250 XP</p>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-2 flex-1">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => {
                  onTabChange(item.id)
                  setIsMenuOpen(false)
                }}
                className={cn(
                  "w-full justify-start gap-3 h-12 text-left",
                  "hover:bg-blue-50 dark:hover:bg-blue-950/20",
                  activeTab === item.id && [
                    "bg-gradient-to-r from-blue-100 to-blue-50",
                    "dark:from-blue-950/30 dark:to-blue-900/20",
                    "text-blue-700 dark:text-blue-300",
                    "border-r-2 border-blue-500"
                  ]
                )}
              >
                <div className="relative">
                  {item.icon}
                  {item.badge && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {item.badge}
                    </div>
                  )}
                </div>
                <span className="font-medium">{item.label}</span>
              </Button>
            ))}
          </nav>

          {/* Footer Actions */}
          <div className="space-y-2 pt-4 border-t border-white/20 dark:border-white/10">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12"
              onClick={() => setIsMenuOpen(false)}
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Spacer for bottom navigation */}
      <div className="h-20 lg:hidden" />
    </>
  )
}