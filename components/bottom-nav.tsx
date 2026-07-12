'use client'

import { motion } from 'framer-motion'
import { Home, Wallet, ArrowLeftRight, TrendingUp, User } from 'lucide-react'

export type AppPage = 'home' | 'wallet' | 'swap' | 'staking' | 'profile'

interface BottomNavProps {
  currentPage: AppPage
  onNavigate: (page: AppPage) => void
}

export function BottomNav({ currentPage, onNavigate }: BottomNavProps) {
  const navItems: { id: AppPage; icon: typeof Home; label: string }[] = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'wallet', icon: Wallet, label: 'Wallet' },
    { id: 'swap', icon: ArrowLeftRight, label: 'Swap' },
    { id: 'staking', icon: TrendingUp, label: 'Stake' },
    { id: 'profile', icon: User, label: 'Profile' },
  ]

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      {/* Blur backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl border-t border-border" />
      
      {/* Nav content */}
      <div className="relative max-w-lg mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {navItems.map((item) => {
            const isActive = currentPage === item.id
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="relative flex flex-col items-center gap-1 py-2 px-3 group"
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl gradient-cyan opacity-20"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                {/* Icon */}
                <motion.div
                  animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.5, duration: 0.4 }}
                  className="relative"
                >
                  <item.icon
                    className={`w-6 h-6 transition-colors duration-200 ${
                      isActive
                        ? 'text-primary'
                        : 'text-muted-foreground group-hover:text-foreground'
                    }`}
                  />
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-2 h-2 rounded-full gradient-cyan"
                    />
                  )}
                </motion.div>
                
                {/* Label */}
                <span
                  className={`text-xs font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-primary'
                      : 'text-muted-foreground group-hover:text-foreground'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
      
      {/* Safe area spacer for iOS */}
      <div className="h-safe-area-inset-bottom bg-background/80 backdrop-blur-xl" />
    </motion.nav>
  )
}
