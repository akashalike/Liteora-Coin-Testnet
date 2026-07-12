'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import {
  WalletState,
  Token,
  Transaction,
  NFT,
  StakePosition,
  TOKENS,
  MOCK_TRANSACTIONS,
  MOCK_NFTS,
  MOCK_STAKES,
} from '@/lib/wallet-types'

interface WalletContextType extends WalletState {
  connect: (method: 'email' | 'google' | 'phantom' | 'create' | 'import') => Promise<void>
  disconnect: () => void
  updateTokenBalance: (symbol: string, amount: number) => void
  addTransaction: (tx: Transaction) => void
  isLoading: boolean
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [tokens, setTokens] = useState<Token[]>(TOKENS)
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS)
  const [nfts] = useState<NFT[]>(MOCK_NFTS)
  const [stakes] = useState<StakePosition[]>(MOCK_STAKES)
  const [isLoading, setIsLoading] = useState(false)

  const connect = async (method: 'email' | 'google' | 'phantom' | 'create' | 'import') => {
    setIsLoading(true)
    // Simulate connection delay
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    // Generate a mock Solana address
    const mockAddress = 'PLgm' + Array.from({ length: 40 }, () => 
      'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789'[
        Math.floor(Math.random() * 58)
      ]
    ).join('')
    
    setAddress(mockAddress)
    setIsConnected(true)
    setIsLoading(false)
  }

  const disconnect = () => {
    setIsConnected(false)
    setAddress(null)
  }

  const updateTokenBalance = (symbol: string, amount: number) => {
    setTokens((prev) =>
      prev.map((token) =>
        token.symbol === symbol
          ? { ...token, balance: token.balance + amount }
          : token
      )
    )
  }

  const addTransaction = (tx: Transaction) => {
    setTransactions((prev) => [tx, ...prev])
  }

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
        tokens,
        transactions,
        nfts,
        stakes,
        connect,
        disconnect,
        updateTokenBalance,
        addTransaction,
        isLoading,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}
