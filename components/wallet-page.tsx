'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWallet } from '@/lib/wallet-context'
import {
  formatCurrency,
  formatNumber,
  formatAddress,
  calculatePortfolioValue,
  Transaction,
} from '@/lib/wallet-types'
import {
  ArrowUpRight,
  ArrowDownLeft,
  Repeat,
  TrendingUp,
  Copy,
  X,
  Check,
  QrCode,
  Loader2,
  Image as ImageIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'

type WalletView = 'main' | 'send' | 'receive' | 'nfts' | 'history'

export function WalletPage() {
  const { tokens, transactions, nfts, address } = useWallet()
  const [view, setView] = useState<WalletView>('main')
  const [selectedToken, setSelectedToken] = useState(tokens[0])
  const [sendAmount, setSendAmount] = useState('')
  const [recipientAddress, setRecipientAddress] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [copied, setCopied] = useState(false)

  const totalValue = calculatePortfolioValue(tokens)

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSend = async () => {
    setIsSending(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSending(false)
    setSendAmount('')
    setRecipientAddress('')
    setView('main')
  }

  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'send':
        return ArrowUpRight
      case 'receive':
        return ArrowDownLeft
      case 'swap':
        return Repeat
      case 'stake':
        return TrendingUp
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
        <h1 className="text-2xl font-bold text-foreground">Wallet</h1>
        <div className="flex gap-2">
          <Button
            variant={view === 'nfts' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView(view === 'nfts' ? 'main' : 'nfts')}
            className="rounded-full"
          >
            <ImageIcon className="w-4 h-4 mr-1" />
            NFTs
          </Button>
          <Button
            variant={view === 'history' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView(view === 'history' ? 'main' : 'history')}
            className="rounded-full"
          >
            History
          </Button>
        </div>
      </motion.header>

      <AnimatePresence mode="wait">
        {view === 'main' && (
          <motion.div
            key="main"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="px-6 space-y-6"
          >
            {/* Total Balance Card */}
            <div className="glass-card p-6 rounded-2xl border-glow">
              <p className="text-sm text-muted-foreground mb-1">Total Balance</p>
              <h2 className="text-3xl font-bold text-foreground text-glow">
                {formatCurrency(totalValue)}
              </h2>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <Button
                  onClick={() => setView('send')}
                  className="flex-1 h-12 glow-button gradient-cyan text-primary-foreground font-semibold rounded-xl"
                >
                  <ArrowUpRight className="w-5 h-5 mr-2" />
                  Send
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setView('receive')}
                  className="flex-1 h-12 glass-card border-border hover:border-primary/50 text-foreground font-semibold rounded-xl"
                >
                  <ArrowDownLeft className="w-5 h-5 mr-2" />
                  Receive
                </Button>
              </div>
            </div>

            {/* Token List */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Your Tokens
              </h3>
              <div className="space-y-3">
                {tokens.map((token, index) => (
                  <motion.div
                    key={token.symbol}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-4 rounded-xl flex items-center justify-between"
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
                            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                            style={{ background: token.color }}
                          >
                            {token.symbol[0]}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {token.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(token.price)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">
                        {formatNumber(token.balance)} {token.symbol}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency(token.balance * token.price)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {view === 'send' && (
          <motion.div
            key="send"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="px-6 space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Send Crypto</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setView('main')}
                className="rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Token Selector - Replace plain text indicators with proper token logos */}
            <div className="glass-card p-4 rounded-xl">
              <p className="text-sm text-muted-foreground mb-3">Select Token</p>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {tokens.map((token) => (
                  <button
                    key={token.symbol}
                    onClick={() => setSelectedToken(token)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                      selectedToken.symbol === token.symbol
                        ? 'gradient-cyan text-primary-foreground'
                        : 'glass-card hover:border-primary/50'
                    }`}
                  >
                    {/* USER LOGO AND IMAGE ASSET INJECTION POINT */}
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
            <div className="glass-card p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Amount</p>
                <p className="text-sm text-muted-foreground">
                  Balance: {formatNumber(selectedToken.balance)}{' '}
                  {selectedToken.symbol}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                  className="flex-1 h-14 text-2xl font-bold bg-transparent border-0 focus-visible:ring-0 text-foreground"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setSendAmount(selectedToken.balance.toString())
                  }
                  className="rounded-full"
                >
                  MAX
                </Button>
              </div>
              {sendAmount && (
                <p className="text-sm text-muted-foreground mt-2">
                  ≈{' '}
                  {formatCurrency(parseFloat(sendAmount) * selectedToken.price)}
                </p>
              )}
            </div>

            {/* Recipient Address */}
            <div className="glass-card p-4 rounded-xl">
              <p className="text-sm text-muted-foreground mb-2">
                Recipient Address
              </p>
              <Input
                placeholder="Enter Solana address..."
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                className="h-12 bg-transparent border-0 focus-visible:ring-0 text-foreground"
              />
            </div>

            {/* Send Button */}
            <Button
              onClick={handleSend}
              disabled={!sendAmount || !recipientAddress || isSending}
              className="w-full h-14 glow-button gradient-cyan text-primary-foreground font-semibold rounded-xl"
            >
              {isSending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <ArrowUpRight className="w-5 h-5 mr-2" />
                  Send {selectedToken.symbol}
                </>
              )}
            </Button>
          </motion.div>
        )}

        {view === 'receive' && (
          <motion.div
            key="receive"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="px-6 space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">
                Receive Crypto
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setView('main')}
                className="rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="glass-card p-6 rounded-2xl text-center">
              {/* QR Code Placeholder */}
              <div className="w-48 h-48 mx-auto mb-6 rounded-2xl bg-white p-4 flex items-center justify-center">
                <QrCode className="w-full h-full text-background" />
              </div>

              <p className="text-sm text-muted-foreground mb-2">
                Your Wallet Address
              </p>
              <p className="text-sm font-mono text-foreground break-all mb-4">
                {address}
              </p>

              <Button
                onClick={handleCopyAddress}
                className="w-full h-12 glow-button gradient-cyan text-primary-foreground font-semibold rounded-xl"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5 mr-2" />
                    Copy Address
                  </>
                )}
              </Button>
            </div>

            <div className="glass-card p-4 rounded-xl">
              <p className="text-sm text-muted-foreground">
                Only send Solana-based tokens to this address. Sending other
                assets may result in permanent loss.
              </p>
            </div>
          </motion.div>
        )}

        {view === 'nfts' && (
          <motion.div
            key="nfts"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="px-6 space-y-6"
          >
            <h3 className="text-lg font-semibold text-foreground">
              Your NFT Collection
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {nfts.map((nft, index) => {
                // Generate distinct gradient colors based on collection name
                const gradients: Record<string, string> = {
                  'Uphaar Genesis': 'from-orange-500 via-pink-500 to-purple-600',
                  'Solana Monkey Business': 'from-blue-500 via-cyan-400 to-green-400',
                  'DeGods': 'from-purple-600 via-pink-500 to-red-500',
                }
                const gradient = gradients[nft.collection] || 'from-blue-500 via-purple-500 to-pink-500'
                
                return (
                  <motion.div
                    key={nft.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card rounded-xl overflow-hidden"
                  >
                    {/* USER LOGO AND IMAGE ASSET INJECTION POINT - NFT Collection Card Cover */}
                    <div className={`aspect-square bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}>
                      {/* Stylized glowing gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                      <div className="relative z-10 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                          <ImageIcon className="w-8 h-8 text-white/80" />
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="font-medium text-foreground text-sm truncate">
                        {nft.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {nft.collection}
                      </p>
                      {nft.price && (
                        <p className="text-xs text-primary mt-1">
                          {nft.price} SOL
                        </p>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}

        {view === 'history' && (
          <motion.div
            key="history"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="px-6 space-y-6"
          >
            <h3 className="text-lg font-semibold text-foreground">
              Transaction History
            </h3>
            <div className="space-y-3">
              {transactions.map((tx, index) => {
                const Icon = getTransactionIcon(tx.type)
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
                            ? `Swap ${tx.token} → ${tx.toToken}`
                            : `${tx.type} ${tx.token}`}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(tx.timestamp).toLocaleDateString()} at{' '}
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
                      <p
                        className={`text-xs ${
                          tx.status === 'completed'
                            ? 'text-[var(--success)]'
                            : tx.status === 'pending'
                            ? 'text-[var(--warning)]'
                            : 'text-destructive'
                        }`}
                      >
                        {tx.status}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
