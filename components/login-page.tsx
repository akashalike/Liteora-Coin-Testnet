'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useWallet } from '@/lib/wallet-context'
import { Mail, ArrowRight, Shield, Key, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface LoginPageProps {
  onSuccess: () => void
}

type LoginMethod = 'main' | 'email' | 'import'

export function LoginPage({ onSuccess }: LoginPageProps) {
  const { connect, isLoading } = useWallet()
  const [view, setView] = useState<LoginMethod>('main')
  const [email, setEmail] = useState('')
  const [seedPhrase, setSeedPhrase] = useState('')

  const handleConnect = async (method: 'email' | 'google' | 'phantom' | 'create' | 'import') => {
    await connect(method)
    onSuccess()
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px]"
          style={{
            background: 'radial-gradient(ellipse at center, oklch(0.85 0.2 192 / 0.08) 0%, transparent 60%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px]"
          style={{
            background: 'radial-gradient(circle, oklch(0.7 0.18 280 / 0.05) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-10 h-10">
            <Image
              src="/logo.webp"
              alt="Uphaar"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-xl font-semibold text-foreground">Uphaar</span>
        </motion.div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-12 relative z-10">
        <AnimatePresence mode="wait">
          {view === 'main' && (
            <motion.div
              key="main"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-sm space-y-8"
            >
              {/* Welcome text */}
              <motion.div variants={itemVariants} className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-foreground">
                  Welcome to Uphaar
                </h1>
                <p className="text-muted-foreground">
                  Your premium gateway to the Solana ecosystem
                </p>
              </motion.div>

              {/* Login options */}
              <motion.div variants={itemVariants} className="space-y-3">
                {/* Create new wallet */}
                <Button
                  onClick={() => handleConnect('create')}
                  disabled={isLoading}
                  className="w-full h-14 glow-button gradient-cyan text-primary-foreground font-semibold text-base rounded-xl transition-all duration-300"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Shield className="w-5 h-5 mr-3" />
                      Create New Wallet
                    </>
                  )}
                </Button>

                {/* Import wallet */}
                <Button
                  variant="outline"
                  onClick={() => setView('import')}
                  disabled={isLoading}
                  className="w-full h-14 glass-card border-border hover:border-primary/50 text-foreground font-medium text-base rounded-xl transition-all duration-300"
                >
                  <Key className="w-5 h-5 mr-3" />
                  Import Existing Wallet
                </Button>
              </motion.div>

              {/* Divider */}
              <motion.div variants={itemVariants} className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-4 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </motion.div>

              {/* Social logins */}
              <motion.div variants={itemVariants} className="space-y-3">
                {/* Email */}
                <Button
                  variant="outline"
                  onClick={() => setView('email')}
                  disabled={isLoading}
                  className="w-full h-12 glass-card border-border hover:border-primary/50 text-foreground rounded-xl transition-all duration-300"
                >
                  <Mail className="w-5 h-5 mr-3" />
                  Continue with Email
                </Button>

                {/* Google */}
                <Button
                  variant="outline"
                  onClick={() => handleConnect('google')}
                  disabled={isLoading}
                  className="w-full h-12 glass-card border-border hover:border-primary/50 text-foreground rounded-xl transition-all duration-300"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>

                {/* Phantom */}
                <Button
                  variant="outline"
                  onClick={() => handleConnect('phantom')}
                  disabled={isLoading}
                  className="w-full h-12 glass-card border-border hover:border-primary/50 text-foreground rounded-xl transition-all duration-300"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 128 128" fill="none">
                    <circle cx="64" cy="64" r="64" fill="url(#phantom-gradient)" />
                    <path
                      d="M110.5 64.5C110.5 89.3528 90.3528 109.5 65.5 109.5H45.5C36.3873 109.5 29 102.113 29 93V66.5C29 46.3416 45.3416 30 65.5 30C85.6584 30 102 46.3416 102 66.5V67C102 67.5523 102.448 68 103 68H107C108.933 68 110.5 66.433 110.5 64.5Z"
                      fill="white"
                    />
                    <circle cx="52" cy="64" r="8" fill="#AB9FF2" />
                    <circle cx="78" cy="64" r="8" fill="#AB9FF2" />
                    <defs>
                      <linearGradient id="phantom-gradient" x1="0" y1="0" x2="128" y2="128">
                        <stop stopColor="#534BB1" />
                        <stop offset="1" stopColor="#551BF9" />
                      </linearGradient>
                    </defs>
                  </svg>
                  Connect Phantom
                </Button>
              </motion.div>
            </motion.div>
          )}

          {view === 'email' && (
            <motion.div
              key="email"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-sm space-y-6"
            >
              <motion.button
                variants={itemVariants}
                onClick={() => setView('main')}
                className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                Back
              </motion.button>

              <motion.div variants={itemVariants} className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">
                  Continue with Email
                </h2>
                <p className="text-muted-foreground text-sm">
                  Enter your email to receive a secure login link
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 glass-card border-border focus:border-primary/50 text-foreground placeholder:text-muted-foreground rounded-xl px-4"
                />
                <Button
                  onClick={() => handleConnect('email')}
                  disabled={isLoading || !email}
                  className="w-full h-14 glow-button gradient-cyan text-primary-foreground font-semibold rounded-xl"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    'Send Login Link'
                  )}
                </Button>
              </motion.div>
            </motion.div>
          )}

          {view === 'import' && (
            <motion.div
              key="import"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-sm space-y-6"
            >
              <motion.button
                variants={itemVariants}
                onClick={() => setView('main')}
                className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                Back
              </motion.button>

              <motion.div variants={itemVariants} className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">
                  Import Wallet
                </h2>
                <p className="text-muted-foreground text-sm">
                  Enter your 12 or 24 word recovery phrase
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-4">
                <textarea
                  placeholder="Enter your seed phrase..."
                  value={seedPhrase}
                  onChange={(e) => setSeedPhrase(e.target.value)}
                  className="w-full h-32 glass-card border border-border focus:border-primary/50 text-foreground placeholder:text-muted-foreground rounded-xl p-4 resize-none bg-transparent focus:outline-none"
                />
                <Button
                  onClick={() => handleConnect('import')}
                  disabled={isLoading || !seedPhrase}
                  className="w-full h-14 glow-button gradient-cyan text-primary-foreground font-semibold rounded-xl"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    'Import Wallet'
                  )}
                </Button>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="glass-card p-4 rounded-xl"
              >
                <div className="flex gap-3">
                  <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    Your recovery phrase is encrypted locally and never leaves your device. 
                    Uphaar uses industry-standard security practices.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 p-6 text-center">
        <p className="text-xs text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </footer>
    </div>
  )
}
