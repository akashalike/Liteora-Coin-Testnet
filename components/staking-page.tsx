'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWallet } from '@/lib/wallet-context'
import { formatCurrency, formatNumber } from '@/lib/wallet-types'
import {
  TrendingUp,
  Lock,
  Unlock,
  Gift,
  Info,
  ChevronDown,
  Loader2,
  Clock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'

type StakingView = 'overview' | 'stake' | 'unstake' | 'success'

export function StakingPage() {
  const { tokens, stakes } = useWallet()
  const [view, setView] = useState<StakingView>('overview')
  const [selectedToken, setSelectedToken] = useState(tokens[0])
  const [stakeAmount, setStakeAmount] = useState('')
  const [unstakeAmount, setUnstakeAmount] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [stakingPeriod, setStakingPeriod] = useState<30 | 90 | 180 | 365>(90)
  const [successMessage, setSuccessMessage] = useState('')

  // Calculate APY based on staking period
  const getAPY = (period: number) => {
    let baseAPY = 7.2
    if (selectedToken.symbol === 'URP') baseAPY = 18.5
    else if (selectedToken.symbol === 'USDC') baseAPY = 5.0
    const multiplier = period === 30 ? 0.5 : period === 90 ? 1 : period === 180 ? 1.3 : 1.6
    return (baseAPY * multiplier).toFixed(1)
  }

  // Total staked value
  const totalStakedValue = stakes.reduce((acc, stake) => {
    const token = tokens.find((t) => t.symbol === stake.token)
    return acc + (token ? stake.amount * token.price : 0)
  }, 0)

  // Total rewards value
  const totalRewardsValue = stakes.reduce((acc, stake) => {
    const token = tokens.find((t) => t.symbol === stake.token)
    return acc + (token ? stake.rewards * token.price : 0)
  }, 0)

  const handleStake = async () => {
    try {
      // Validate amount
      const amount = parseFloat(stakeAmount)
      if (!amount || amount <= 0) {
        console.log('[v0] Invalid stake amount')
        return
      }
      
      if (amount > selectedToken.balance) {
        console.log('[v0] Insufficient balance')
        return
      }

      setIsProcessing(true)
      // Simulate transaction
      await new Promise((resolve) => setTimeout(resolve, 2000))
      
      // Show success state with message
      const apy = getAPY(stakingPeriod)
      setSuccessMessage(`Successfully staked ${amount} ${selectedToken.symbol} at ${apy}% APY for ${stakingPeriod} days!`)
      setIsProcessing(false)
      
      // Transition to success view
      setView('success')
    } catch (error) {
      console.log('[v0] Stake error:', error)
      setIsProcessing(false)
    }
  }

  const handleUnstake = async () => {
    try {
      const amount = parseFloat(unstakeAmount)
      if (!amount || amount <= 0) {
        console.log('[v0] Invalid unstake amount')
        return
      }

      setIsProcessing(true)
      // Simulate transaction
      await new Promise((resolve) => setTimeout(resolve, 2000))
      
      // Show success state with message (10% penalty applied)
      const penalty = amount * 0.1
      const netAmount = amount - penalty
      setSuccessMessage(`Unstaked ${amount} tokens. Applied 10% penalty (${penalty.toFixed(2)}) tokens. Net received: ${netAmount.toFixed(2)} tokens.`)
      setIsProcessing(false)
      
      // Transition to success view
      setView('success')
    } catch (error) {
      console.log('[v0] Unstake error:', error)
      setIsProcessing(false)
    }
  }

  const handleClaimRewards = async () => {
    try {
      setIsProcessing(true)
      // Simulate transaction
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsProcessing(false)
    } catch (error) {
      console.log('[v0] Claim rewards error:', error)
      setIsProcessing(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const stakingPeriods = [
    { days: 30, label: '30 Days' },
    { days: 90, label: '90 Days' },
    { days: 180, label: '180 Days' },
    { days: 365, label: '1 Year' },
  ] as const

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
        <h1 className="text-2xl font-bold text-foreground">Staking</h1>
        <div className="flex items-center gap-2 px-3 py-1.5 glass-card rounded-full">
          <div className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse" />
          <span className="text-sm text-muted-foreground">Live</span>
        </div>
      </motion.header>

      <AnimatePresence mode="wait">
        {view === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="px-6 space-y-6"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                variants={itemVariants}
                className="glass-card p-4 rounded-2xl"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Total Staked
                  </span>
                </div>
                <p className="text-2xl font-bold text-foreground text-glow">
                  {formatCurrency(totalStakedValue)}
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="glass-card p-4 rounded-2xl"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Gift className="w-4 h-4 text-[var(--success)]" />
                  <span className="text-sm text-muted-foreground">
                    Total Rewards
                  </span>
                </div>
                <p className="text-2xl font-bold text-[var(--success)]">
                  {formatCurrency(totalRewardsValue)}
                </p>
              </motion.div>
            </div>

            {/* Active Stakes */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Active Stakes
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClaimRewards}
                  disabled={isProcessing || totalRewardsValue === 0}
                  className="text-primary"
                >
                  {isProcessing ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-1" />
                  ) : (
                    <Gift className="w-4 h-4 mr-1" />
                  )}
                  Claim All
                </Button>
              </div>

              <div className="space-y-3">
                {stakes.map((stake, index) => {
                  const token = tokens.find((t) => t.symbol === stake.token)
                  if (!token) return null

                  return (
                    <motion.div
                      key={`${stake.token}-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass-card p-4 rounded-xl border-glow"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 flex items-center justify-center">
                            {token.icon ? (
                              <Image
                                src={token.icon}
                                alt={token.symbol}
                                width={48}
                                height={48}
                                className="object-contain"
                              />
                            ) : (
                              <div
                                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                                style={{ background: token.color }}
                              >
                                {token.symbol[0]}
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">
                              {formatNumber(stake.amount)} {stake.token}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {formatCurrency(stake.amount * token.price)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-primary">
                            {stake.apy}% APY
                          </p>
                          <p className="text-sm text-[var(--success)]">
                            +{stake.rewards} {stake.token}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          Staked{' '}
                          {Math.floor(
                            (Date.now() - stake.stakedAt.getTime()) /
                              (1000 * 60 * 60 * 24)
                          )}{' '}
                          days ago
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setView('unstake')}
                          className="text-xs h-7"
                        >
                          <Unlock className="w-3 h-3 mr-1" />
                          Unstake
                        </Button>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Stake More Button */}
            <motion.div variants={itemVariants}>
              <Button
                onClick={() => setView('stake')}
                className="w-full h-14 glow-button gradient-cyan text-primary-foreground font-semibold text-lg rounded-xl"
              >
                <Lock className="w-5 h-5 mr-2" />
                Stake More
              </Button>
            </motion.div>

            {/* APY Info */}
            <motion.div
              variants={itemVariants}
              className="glass-card p-4 rounded-xl"
            >
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">
                    Earn up to {getAPY(365)}% APY
                  </p>
                  <p>
                    Lock your tokens for longer periods to earn higher rewards.
                    URP stakers also get early access to new features.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {view === 'stake' && (
          <motion.div
            key="stake"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="px-6 space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Stake Tokens</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setView('overview')
                }}
                className="text-muted-foreground hover:text-foreground"
                type="button"
              >
                Cancel
              </Button>
            </div>

            {/* Token Selector */}
            <div className="glass-card p-4 rounded-xl">
              <p className="text-sm text-muted-foreground mb-3">Select Token</p>
              <div className="flex gap-2 overflow-x-auto">
                {tokens.map((token) => (
                  <button
                    key={token.symbol}
                    onClick={() => setSelectedToken(token)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                      selectedToken.symbol === token.symbol
                        ? 'gradient-cyan text-primary-foreground'
                        : 'glass-card hover:border-primary/50'
                    }`}
                  >
                    {/* Display proper token logos instead of plain letters */}
                    <div className="w-6 h-6 flex items-center justify-center">
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
                          className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          style={{ background: token.color }}
                        >
                          {token.symbol[0]}
                        </div>
                      )}
                    </div>
                    {token.symbol}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount Input */}
            <div className="glass-card p-5 rounded-2xl border-glow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">
                  Amount to Stake
                </span>
                <span className="text-sm text-muted-foreground">
                  Balance: {formatNumber(selectedToken.balance)}{' '}
                  {selectedToken.symbol}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  className="flex-1 h-14 text-3xl font-bold bg-transparent border-0 focus-visible:ring-0 text-foreground p-0"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setStakeAmount(selectedToken.balance.toString())
                  }
                  className="rounded-full"
                >
                  MAX
                </Button>
              </div>
              {stakeAmount && (
                <p className="text-sm text-muted-foreground mt-2">
                  ≈{' '}
                  {formatCurrency(
                    parseFloat(stakeAmount) * selectedToken.price
                  )}
                </p>
              )}
            </div>

            {/* Staking Period */}
            <div className="glass-card p-4 rounded-xl">
              <p className="text-sm text-muted-foreground mb-3">
                Lock Period
              </p>
              <div className="grid grid-cols-2 gap-2">
                {stakingPeriods.map(({ days, label }) => (
                  <button
                    key={days}
                    onClick={() => setStakingPeriod(days as 30 | 90 | 180 | 365)}
                    className={`p-3 rounded-xl text-center transition-all ${
                      stakingPeriod === days
                        ? 'gradient-cyan text-primary-foreground'
                        : 'glass-card hover:border-primary/50'
                    }`}
                  >
                    <p className="font-semibold">{label}</p>
                    <p
                      className={`text-sm ${
                        stakingPeriod === days
                          ? 'text-primary-foreground/80'
                          : 'text-primary'
                      }`}
                    >
                      {getAPY(days)}% APY
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Estimated Rewards */}
            {stakeAmount && parseFloat(stakeAmount) > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="glass-card p-4 rounded-xl space-y-2"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">APY</span>
                  <span className="text-primary font-semibold">
                    {getAPY(stakingPeriod)}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Lock Period</span>
                  <span className="text-foreground">{stakingPeriod} days</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Est. Rewards ({stakingPeriod}d)
                  </span>
                  <span className="text-[var(--success)] font-semibold">
                    +
                    {(
                      (parseFloat(stakeAmount) *
                        parseFloat(getAPY(stakingPeriod))) /
                      100 /
                      (365 / stakingPeriod)
                    ).toFixed(2)}{' '}
                    {selectedToken.symbol}
                  </span>
                </div>
              </motion.div>
            )}

            {/* Stake Button */}
            <Button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleStake()
              }}
              disabled={
                !stakeAmount ||
                parseFloat(stakeAmount) <= 0 ||
                parseFloat(stakeAmount) > selectedToken.balance ||
                isProcessing
              }
              className="w-full h-14 glow-button gradient-cyan text-primary-foreground font-semibold text-lg rounded-xl"
              type="button"
            >
              {isProcessing ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <Lock className="w-5 h-5 mr-2" />
                  Stake {selectedToken.symbol}
                </>
              )}
            </Button>
          </motion.div>
        )}

        {view === 'unstake' && (
          <motion.div
            key="unstake"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="px-6 space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">
                Unstake Tokens
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setView('overview')
                }}
                type="button"
              >
                Cancel
              </Button>
            </div>

            <div className="glass-card p-4 rounded-xl">
              <p className="text-sm text-muted-foreground mb-2">
                Amount to Unstake
              </p>
              <Input
                type="number"
                placeholder="0.00"
                value={unstakeAmount}
                onChange={(e) => setUnstakeAmount(e.target.value)}
                className="h-14 text-2xl font-bold bg-transparent border-0 focus-visible:ring-0 text-foreground"
              />
            </div>

            <div className="glass-card p-4 rounded-xl">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-[var(--warning)] flex-shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-[var(--warning)] mb-1">
                    Early Unstaking Penalty
                  </p>
                  <p>
                    Unstaking before the lock period ends will result in a 10%
                    penalty on your staked amount.
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleUnstake()
              }}
              disabled={!unstakeAmount || parseFloat(unstakeAmount) <= 0 || isProcessing}
              variant="destructive"
              className="w-full h-14 font-semibold text-lg rounded-xl"
              type="button"
            >
              {isProcessing ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <Unlock className="w-5 h-5 mr-2" />
                  Unstake
                </>
              )}
            </Button>
          </motion.div>
        )}

        {view === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-[9999]"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
              onClick={() => {
                setView('overview')
                setStakeAmount('')
                setUnstakeAmount('')
              }}
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
                {/* Success Icon */}
                <div className="flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center shadow-lg">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>

                {/* Success Message */}
                <div className="text-center space-y-3">
                  <h3 className="text-3xl font-bold text-foreground">Success!</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{successMessage}</p>
                </div>

                {/* Action Button */}
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setView('overview')
                    setStakeAmount('')
                    setUnstakeAmount('')
                  }}
                  className="w-full h-12 gradient-cyan text-primary-foreground font-semibold rounded-xl mt-4"
                  type="button"
                >
                  Back to Staking
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
