'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import Image from 'next/image'

interface WhitepaperModalProps {
  isOpen: boolean
  onClose: () => void
}

export function WhitepaperModal({ isOpen, onClose }: WhitepaperModalProps) {
  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-[9999] px-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Whitepaper Modal */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] bg-gradient-to-b from-background to-background/80 rounded-3xl border border-primary/20 overflow-hidden shadow-2xl flex flex-col"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 hover:bg-secondary/50 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-8"
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 relative">
                <Image
                  src="/uphaar-logo.png"
                  alt="Uphaar Logo"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
              UPHAAR Whitepaper
            </h2>
            <p className="text-muted-foreground">Complete Token & Ecosystem Overview</p>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Token Information */}
            <section className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">Token Identity</h3>
              <div className="glass-card p-6 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Token Name</span>
                  <span className="font-semibold text-foreground">UPHAAR ($URP)</span>
                </div>
                <div className="border-t border-border pt-3 flex items-center justify-between">
                  <span className="text-muted-foreground">Network Infrastructure</span>
                  <span className="font-semibold text-foreground">Solana Mainnet (SPL Asset)</span>
                </div>
                <div className="border-t border-border pt-3 flex items-center justify-between">
                  <span className="text-muted-foreground">Total Hard Cap Supply</span>
                  <span className="font-semibold text-foreground">1,721,660 URP</span>
                </div>
              </div>
            </section>

            {/* Ecosystem Allocations */}
            <section className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">Ecosystem Allocations</h3>
              <div className="space-y-3">
                {[
                  { label: 'Gifting Layer & Algorithmic Yields', value: '50%', color: 'from-orange-500 to-orange-600' },
                  { label: 'Initial Liquidity Provisions', value: '20%', color: 'from-pink-500 to-pink-600' },
                  { label: 'Core Engineering & Audits', value: '20%', color: 'from-purple-500 to-purple-600' },
                  { label: 'Global Syndicates & Marketing', value: '10%', color: 'from-cyan-500 to-cyan-600' },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="glass-card p-4 rounded-xl flex items-center justify-between"
                  >
                    <span className="text-muted-foreground">{item.label}</span>
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.color}`} />
                      <span className="font-semibold text-foreground text-lg">{item.value}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Platform Automation */}
            <section className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">Platform Automation Engine</h3>
              <div className="glass-card p-6 rounded-2xl space-y-3">
                <p className="text-muted-foreground leading-relaxed">
                  Programmatic Token Creator System with Automated Raydium AMM V4 Liquidity Pool Bootstrapping and optimized real-time swap routing.
                </p>
                <div className="border-t border-border pt-3">
                  <p className="text-sm text-muted-foreground">
                    Advanced algorithmic infrastructure ensures seamless token creation, liquidity management, and optimal trading execution across the Solana ecosystem.
                  </p>
                </div>
              </div>
            </section>

            {/* Corporate Leadership */}
            <section className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">Corporate Leadership & Transparency</h3>
              <div className="glass-card p-6 rounded-2xl space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Akash</p>
                    <p className="text-sm text-muted-foreground">Founder & CEO</p>
                  </div>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Fully public, doxxed project with complete transparency. Direct founder leadership ensuring community trust and ecosystem integrity.
                  </p>
                </div>
              </div>
            </section>

            {/* Vision */}
            <section className="space-y-4 pb-8">
              <h3 className="text-2xl font-bold text-foreground">Vision & Mission</h3>
              <div className="glass-card p-6 rounded-2xl">
                <p className="text-muted-foreground leading-relaxed">
                  UPHAAR represents a paradigm shift in decentralized token ecosystems, combining algorithmic yield distribution with transparent community governance. We&apos;re building the infrastructure for the next generation of DeFi applications on Solana.
                </p>
              </div>
            </section>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 border-t border-primary/20 bg-gradient-to-t from-background to-transparent p-4 flex gap-3">
          <Button
            onClick={onClose}
            className="flex-1 h-11 gradient-cyan text-primary-foreground font-semibold rounded-xl"
          >
            Close
          </Button>
          <Button
            asChild
            variant="outline"
            className="flex-1 h-11 rounded-xl"
          >
            <a href="https://uphaartoken.bolt.host" target="_blank" rel="noopener noreferrer">
              Visit Website
            </a>
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
