'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { WalletProvider, useWallet } from '@/lib/wallet-context'
import { SplashScreen } from '@/components/splash-screen'
import { LoginPage } from '@/components/login-page'
import { HomePage } from '@/components/home-page'
import { WalletPage } from '@/components/wallet-page'
import { SwapPage } from '@/components/swap-page'
import { StakingPage } from '@/components/staking-page'
import { ProfilePage } from '@/components/profile-page'
import { BottomNav, AppPage } from '@/components/bottom-nav'

function AppContent() {
  const { isConnected } = useWallet()
  const [showSplash, setShowSplash] = useState(true)
  const [currentPage, setCurrentPage] = useState<AppPage>('home')

  // Simulate splash screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleNavigate = (page: AppPage | string) => {
    setCurrentPage(page as AppPage)
  }

  const handleLogout = () => {
    setCurrentPage('home')
  }

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  }

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto relative overflow-hidden">
      {/* Mobile device frame effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-6 bg-background z-50" />
      </div>

      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" onComplete={() => setShowSplash(false)} />
        ) : !isConnected ? (
          <LoginPage key="login" onSuccess={() => {}} />
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen"
          >
            <AnimatePresence mode="wait">
              {currentPage === 'home' && (
                <motion.div
                  key="home"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                >
                  <HomePage onNavigate={handleNavigate} />
                </motion.div>
              )}
              {currentPage === 'wallet' && (
                <motion.div
                  key="wallet"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                >
                  <WalletPage />
                </motion.div>
              )}
              {currentPage === 'swap' && (
                <motion.div
                  key="swap"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                >
                  <SwapPage />
                </motion.div>
              )}
              {currentPage === 'staking' && (
                <motion.div
                  key="staking"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                >
                  <StakingPage />
                </motion.div>
              )}
              {currentPage === 'profile' && (
                <motion.div
                  key="profile"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                >
                  <ProfilePage onLogout={handleLogout} />
                </motion.div>
              )}
            </AnimatePresence>

            <BottomNav currentPage={currentPage} onNavigate={handleNavigate} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function UphaarWallet() {
  return (
    <WalletProvider>
      <AppContent />
    </WalletProvider>
  )
}
