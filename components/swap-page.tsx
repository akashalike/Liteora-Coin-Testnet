'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useWallet } from '@/lib/wallet-context'
import { formatCurrency, formatNumber } from '@/lib/wallet-types'
import {
  ArrowDownUp,
  ChevronDown,
  Settings,
  Loader2,
  Info,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'

export function SwapPage() {
  const { tokens } = useWallet()
  const [fromToken, setFromToken] = useState(tokens[1]) // SOL
  const [toToken, setToToken] = useState(tokens[0]) // URP
  const [fromAmount, setFromAmount] = useState('')
  const [isSwapping, setIsSwapping] = useState(false)
  const [showFromTokens, setShowFromTokens] = useState(false)
  const [showToTokens, setShowToTokens] = useState(false)
  const [slippage, setSlippage] = useState(0.5)
  const [isSwapSuccess, setIsSwapSuccess] = useState(false)
  const [swapAmount, setSwapAmount] = useState('')

  // Calculate exchange rate (mock)
  const exchangeRate = fromToken.price / toToken.price
  const toAmount = fromAmount
    ? (parseFloat(fromAmount) * exchangeRate).toFixed(4)
    : ''

  // Calculate price impact (mock)
  const priceImpact = fromAmount ? (parseFloat(fromAmount) > 10 ? 0.3 : 0.1) : 0

  const handleSwapTokens = () => {
    const temp = fromToken
    setFromToken(toToken)
    setToToken(temp)
    setFromAmount('')
  }

  const handleSwap = async () => {
    try {
      const amount = parseFloat(fromAmount)
      if (!amount || amount <= 0) return

      setIsSwapping(true)
      // Simulate transaction
      await new Promise((resolve) => setTimeout(resolve, 2000))
      
      // Store swap details and show success modal
      setSwapAmount(fromAmount)
      setIsSwapping(false)
      setIsSwapSuccess(true)
    } catch (error) {
      console.log('[v0] Swap error:', error)
      setIsSwapping(false)
    }
  }

  const handleDismissSuccess = () => {
    setIsSwapSuccess(false)
    setFromAmount('')
    setSwapAmount('')
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const TokenSelector = ({
    token,
    otherToken,
    onSelect,
    showDropdown,
    setShowDropdown,
    label,
  }: {
    token: typeof tokens[0]
    otherToken: typeof tokens[0]
    onSelect: (t: typeof tokens[0]) => void
    showDropdown: boolean
    setShowDropdown: (v: boolean) => void
    label: string
  }) => (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 px-4 py-2 glass-card rounded-xl hover:border-primary/50 transition-all"
      >
        <div className="w-8 h-8 flex items-center justify-center">
          {token.icon ? (
            <Image
              src={token.icon}
              alt={token.symbol}
              width={24}
              height={24}
              className="object-contain"
            />
          ) : (
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ background: token.color }}
            >
              {token.symbol[0]}
            </div>
          )}
        </div>
        <span className="font-semibold text-foreground">{token.symbol}</span>
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </button>

      {showDropdown && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full mt-2 left-0 right-0 z-50 glass-card rounded-xl overflow-hidden min-w-[150px]"
        >
          {tokens
            .filter((t) => t.symbol !== otherToken.symbol)
            .map((t) => (
              <button
                key={t.symbol}
                onClick={() => {
                  onSelect(t)
                  setShowDropdown(false)
                }}
                className={`w-full flex items-center gap-2 px-4 py-3 hover:bg-secondary/50 transition-colors ${
                  t.symbol === token.symbol ? 'bg-secondary/30' : ''
                }`}
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  {t.icon ? (
                    <Image
                      src={t.icon}
                      alt={t.symbol}
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  ) : (
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs"
                      style={{ background: t.color }}
                    >
                      {t.symbol[0]}
                    </div>
                  )}
                </div>
                <span className="text-foreground">{t.symbol}</span>
              </button>
            ))}
        </motion.div>
      )}
    </div>
  )

  return (
    <motion.div
      className="flex flex-col min-h-full pb-24"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.header
        variants={itemVariants}
        className="flex items-center justify-between p-6"
      >
        <h1 className="text-2xl font-bold text-foreground">Swap</h1>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full glass-card"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </motion.header>

      <div className="px-6 space-y-4">
        {/* Slippage Settings */}
        <motion.div variants={itemVariants} className="glass-card p-4 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">
              Slippage Tolerance
            </span>
            <div className="flex gap-2">
              {[0.1, 0.5, 1.0].map((val) => (
                <button
                  key={val}
                  onClick={() => setSlippage(val)}
                  className={`px-3 py-1 rounded-lg text-sm transition-all ${
                    slippage === val
                      ? 'gradient-cyan text-primary-foreground'
                      : 'bg-secondary text-foreground hover:bg-secondary/80'
                  }`}
                >
                  {val}%
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* From Token */}
        <motion.div
          variants={itemVariants}
          className="glass-card p-5 rounded-2xl border-glow"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">You Pay</span>
            <span className="text-sm text-muted-foreground">
              Balance: {formatNumber(fromToken.balance)} {fromToken.symbol}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Input
              type="number"
              placeholder="0.00"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              className="flex-1 h-14 text-3xl font-bold bg-transparent border-0 focus-visible:ring-0 text-foreground p-0"
            />
            <TokenSelector
              token={fromToken}
              otherToken={toToken}
              onSelect={setFromToken}
              showDropdown={showFromTokens}
              setShowDropdown={setShowFromTokens}
              label="From"
            />
          </div>
          {fromAmount && (
            <p className="text-sm text-muted-foreground mt-2">
              ≈ {formatCurrency(parseFloat(fromAmount) * fromToken.price)}
            </p>
          )}
          <div className="flex gap-2 mt-3">
            {[25, 50, 75, 100].map((percent) => (
              <button
                key={percent}
                onClick={() =>
                  setFromAmount(
                    ((fromToken.balance * percent) / 100).toFixed(4)
                  )
                }
                className="flex-1 py-1.5 text-xs font-medium bg-secondary/50 hover:bg-secondary rounded-lg text-foreground transition-colors"
              >
                {percent === 100 ? 'MAX' : `${percent}%`}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Swap Button */}
        <motion.div variants={itemVariants} className="flex justify-center -my-1 relative z-10">
          <button
            onClick={handleSwapTokens}
            className="w-12 h-12 rounded-full gradient-cyan flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          >
            <ArrowDownUp className="w-5 h-5 text-primary-foreground" />
          </button>
        </motion.div>

        {/* To Token */}
        <motion.div
          variants={itemVariants}
          className="glass-card p-5 rounded-2xl"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">You Receive</span>
            <span className="text-sm text-muted-foreground">
              Balance: {formatNumber(toToken.balance)} {toToken.symbol}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-14 flex items-center">
              <span className="text-3xl font-bold text-foreground">
                {toAmount || '0.00'}
              </span>
            </div>
            <TokenSelector
              token={toToken}
              otherToken={fromToken}
              onSelect={setToToken}
              showDropdown={showToTokens}
              setShowDropdown={setShowToTokens}
              label="To"
            />
          </div>
          {toAmount && (
            <p className="text-sm text-muted-foreground mt-2">
              ≈ {formatCurrency(parseFloat(toAmount) * toToken.price)}
            </p>
          )}
        </motion.div>

        {/* Swap Details */}
        {fromAmount && parseFloat(fromAmount) > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="glass-card p-4 rounded-xl space-y-3"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-1">
                <Info className="w-4 h-4" />
                Rate
              </span>
              <span className="text-foreground">
                1 {fromToken.symbol} = {exchangeRate.toFixed(4)} {toToken.symbol}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Price Impact</span>
              <span
                className={
                  priceImpact > 1
                    ? 'text-destructive'
                    : priceImpact > 0.5
                    ? 'text-[var(--warning)]'
                    : 'text-[var(--success)]'
                }
              >
                {priceImpact}%
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Network Fee</span>
              <span className="text-foreground">~0.00005 SOL</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Minimum Received</span>
              <span className="text-foreground">
                {(parseFloat(toAmount) * (1 - slippage / 100)).toFixed(4)}{' '}
                {toToken.symbol}
              </span>
            </div>
          </motion.div>
        )}

        {/* Swap Button */}
        <motion.div variants={itemVariants}>
          <Button
            onClick={handleSwap}
            disabled={
              !fromAmount ||
              parseFloat(fromAmount) <= 0 ||
              parseFloat(fromAmount) > fromToken.balance ||
              isSwapping
            }
            className="w-full h-14 glow-button gradient-cyan text-primary-foreground font-semibold text-lg rounded-xl"
          >
            {isSwapping ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : parseFloat(fromAmount) > fromToken.balance ? (
              'Insufficient Balance'
            ) : (
              'Swap'
            )}
          </Button>
        </motion.div>

        {/* Powered by */}
        <motion.p
          variants={itemVariants}
          className="text-center text-xs text-muted-foreground"
        >
          Powered by Jupiter Aggregator
        </motion.p>
      </div>

      {/* Swap Success Modal */}
      {isSwapSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-[9999]"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
            onClick={handleDismissSuccess}
          />
          
          {/* Success Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-11/12 max-w-sm bg-gradient-to-b from-background to-background/80 rounded-3xl border border-primary/20 p-8 shadow-2xl"
          >
            <div className="space-y-6">
              {/* Success Checkmark Animation */}
              <motion.div
                className="flex justify-center"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </motion.div>

              {/* Success Title */}
              <motion.div
                className="text-center space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-3xl font-bold text-foreground">Swap Successful!</h3>
                <p className="text-sm text-muted-foreground">Your tokens have been exchanged</p>
              </motion.div>

              {/* Transaction Details */}
              <motion.div
                className="space-y-3 p-4 bg-secondary/30 rounded-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Sent</span>
                  <span className="text-sm font-semibold text-foreground">{swapAmount} {fromToken.symbol}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Received</span>
                  <span className="text-sm font-semibold text-foreground">{toAmount} {toToken.symbol}</span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Network Fee</span>
                    <span className="text-sm text-foreground">~0.00005 SOL</span>
                  </div>
                </div>
              </motion.div>

              {/* Done Button */}
              <Button
                onClick={handleDismissSuccess}
                className="w-full h-12 gradient-cyan text-primary-foreground font-semibold rounded-xl"
                type="button"
              >
                Done
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}
