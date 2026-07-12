'use client'

import { motion } from 'framer-motion'
import { useWallet } from '@/lib/wallet-context'
import {
  formatCurrency,
  formatNumber,
  formatAddress,
  calculatePortfolioValue,
  PORTFOLIO_HISTORY,
} from '@/lib/wallet-types'
import {
  ArrowUpRight,
  ArrowDownLeft,
  Repeat,
  TrendingUp,
  ChevronRight,
  Copy,
  Bell,
  QrCode,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'

interface HomePageProps {
  onNavigate: (page: string) => void
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { tokens, transactions, address } = useWallet()
  const totalValue = calculatePortfolioValue(tokens)
  const change24h = 8.5 // Mock 24h change

  const quickActions = [
    { icon: ArrowUpRight, label: 'Send', action: () => onNavigate('wallet') },
    { icon: ArrowDownLeft, label: 'Receive', action: () => onNavigate('wallet') },
    { icon: Repeat, label: 'Swap', action: () => onNavigate('swap') },
    { icon: TrendingUp, label: 'Stake', action: () => onNavigate('staking') },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

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
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <Image
              src="/logo.webp"
              alt="Uphaar"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Welcome back</p>
            <button
              onClick={() => navigator.clipboard.writeText(address || '')}
              className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {address ? formatAddress(address) : 'Connect Wallet'}
              <Copy className="w-3 h-3" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-full glass-card"
          >
            <QrCode className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-full glass-card"
          >
            <Bell className="w-5 h-5" />
          </Button>
        </div>
      </motion.header>

      {/* Portfolio Value Card */}
      <motion.div variants={itemVariants} className="px-6 mb-6">
        <div className="glass-card p-6 rounded-2xl border-glow">
          <p className="text-sm text-muted-foreground mb-1">Total Balance</p>
          <h2 className="text-4xl font-bold text-foreground mb-2 text-glow">
            {formatCurrency(totalValue)}
          </h2>
          <div className="flex items-center gap-2">
            <span
              className={`text-sm font-medium ${
                change24h >= 0 ? 'text-[var(--success)]' : 'text-destructive'
              }`}
            >
              {change24h >= 0 ? '+' : ''}
              {change24h}%
            </span>
            <span className="text-xs text-muted-foreground">24h</span>
          </div>

          {/* Mini Chart */}
          <div className="h-24 mt-4 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PORTFOLIO_HISTORY}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="oklch(0.85 0.2 192)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="oklch(0.85 0.2 192)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" hide />
                <YAxis hide domain={['dataMin - 5000', 'dataMax + 5000']} />
                <Tooltip
                  contentStyle={{
                    background: 'oklch(0.15 0.01 260)',
                    border: '1px solid oklch(0.3 0.02 260)',
                    borderRadius: '8px',
                    color: 'white',
                  }}
                  formatter={(value: number) => [formatCurrency(value), 'Value']}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="oklch(0.85 0.2 192)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants} className="px-6 mb-6">
        <div className="flex justify-between gap-3">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={action.action}
              className="flex-1 flex flex-col items-center gap-2 p-4 glass-card rounded-2xl hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-full gradient-cyan flex items-center justify-center group-hover:shadow-[0_0_20px_oklch(0.85_0.2_192_/_0.4)] transition-shadow">
                <action.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Token Holdings */}
      <motion.div variants={itemVariants} className="px-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Your Assets</h3>
          <button
            onClick={() => onNavigate('wallet')}
            className="text-sm text-primary flex items-center gap-1 hover:opacity-80 transition-opacity"
          >
            See All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          {tokens.map((token, index) => (
            <motion.div
              key={token.symbol}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-4 rounded-xl flex items-center justify-between hover:border-primary/30 transition-all cursor-pointer"
              onClick={() => onNavigate('wallet')}
            >
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
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      style={{ background: token.color }}
                    >
                      {token.symbol[0]}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground">{token.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatNumber(token.balance)} {token.symbol}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-foreground">
                  {formatCurrency(token.balance * token.price)}
                </p>
                <p
                  className={`text-sm ${
                    token.change24h >= 0
                      ? 'text-[var(--success)]'
                      : 'text-destructive'
                  }`}
                >
                  {token.change24h >= 0 ? '+' : ''}
                  {token.change24h}%
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div variants={itemVariants} className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Recent Activity
          </h3>
          <button
            onClick={() => onNavigate('wallet')}
            className="text-sm text-primary flex items-center gap-1 hover:opacity-80 transition-opacity"
          >
            See All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          {transactions.slice(0, 4).map((tx, index) => {
            const icon =
              tx.type === 'send'
                ? ArrowUpRight
                : tx.type === 'receive'
                ? ArrowDownLeft
                : tx.type === 'swap'
                ? Repeat
                : TrendingUp
            const Icon = icon
            const isPositive = tx.type === 'receive'

            return (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card p-4 rounded-xl flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isPositive
                        ? 'bg-[var(--success)]/20 text-[var(--success)]'
                        : 'bg-secondary text-foreground'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground capitalize">
                      {tx.type === 'swap'
                        ? `${tx.token} → ${tx.toToken}`
                        : tx.type}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(tx.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-medium ${
                      isPositive
                        ? 'text-[var(--success)]'
                        : 'text-foreground'
                    }`}
                  >
                    {isPositive ? '+' : '-'}
                    {tx.amount} {tx.token}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {tx.status}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </motion.div>
  )
}
