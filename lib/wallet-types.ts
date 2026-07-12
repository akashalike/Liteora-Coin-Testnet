// Token types for the wallet
export interface Token {
  symbol: string
  name: string
  balance: number
  price: number
  change24h: number
  icon: string
  color: string
}

export interface Transaction {
  id: string
  type: 'send' | 'receive' | 'swap' | 'stake'
  token: string
  amount: number
  timestamp: Date
  status: 'completed' | 'pending' | 'failed'
  address?: string
  toToken?: string
  toAmount?: number
}

export interface NFT {
  id: string
  name: string
  collection: string
  image: string
  price?: number
}

export interface StakePosition {
  token: string
  amount: number
  apy: number
  rewards: number
  stakedAt: Date
}

export interface WalletState {
  isConnected: boolean
  address: string | null
  tokens: Token[]
  transactions: Transaction[]
  nfts: NFT[]
  stakes: StakePosition[]
}

// Mock data for tokens
export const TOKENS: Token[] = [
  {
    symbol: 'URP',
    name: 'Uphaar Token',
    balance: 1721660,
    price: 0.01,
    change24h: 12.5,
    icon: '/logo.webp',
    color: '#00d4d4',
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    balance: 1000000,
    price: 185.20,
    change24h: 5.2,
    icon: '/solana-logo.jpeg',
    color: '#9945FF',
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    balance: 16000000,
    price: 1.00,
    change24h: 0.01,
    icon: '/usdc-logo.png',
    color: '#2775CA',
  },
]

// Mock transactions
export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    type: 'receive',
    token: 'SOL',
    amount: 10.5,
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    status: 'completed',
    address: '7xKX...9fJk',
  },
  {
    id: '2',
    type: 'swap',
    token: 'SOL',
    amount: 5,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    status: 'completed',
    toToken: 'URP',
    toAmount: 378.5,
  },
  {
    id: '3',
    type: 'send',
    token: 'USDC',
    amount: 250,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    status: 'completed',
    address: '3mNx...kL2p',
  },
  {
    id: '4',
    type: 'stake',
    token: 'URP',
    amount: 5000,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    status: 'completed',
  },
  {
    id: '5',
    type: 'receive',
    token: 'URP',
    amount: 1250,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    status: 'completed',
    address: '9pQr...mN4s',
  },
]

// Mock NFTs
export const MOCK_NFTS: NFT[] = [
  {
    id: '1',
    name: 'Uphaar Genesis #1247',
    collection: 'Uphaar Genesis',
    image: '/nft-placeholder-1.jpg',
    price: 12.5,
  },
  {
    id: '2',
    name: 'Solana Monkey #8842',
    collection: 'SMB',
    image: '/nft-placeholder-2.jpg',
    price: 85,
  },
  {
    id: '3',
    name: 'DeGod #4521',
    collection: 'DeGods',
    image: '/nft-placeholder-3.jpg',
    price: 420,
  },
]

// Mock stakes
export const MOCK_STAKES: StakePosition[] = [
  {
    token: 'URP',
    amount: 10000,
    apy: 18.5,
    rewards: 245.5,
    stakedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
  },
  {
    token: 'SOL',
    amount: 25,
    apy: 7.2,
    rewards: 0.45,
    stakedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
  },
]

// Helper to format address
export function formatAddress(address: string): string {
  if (address.length <= 10) return address
  return `${address.slice(0, 4)}...${address.slice(-4)}`
}

// Helper to format currency
export function formatCurrency(amount: number, decimals: number = 2): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount)
}

// Helper to format number
export function formatNumber(num: number, decimals: number = 2): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(decimals) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(decimals) + 'K'
  }
  return num.toFixed(decimals)
}

// Calculate total portfolio value
export function calculatePortfolioValue(tokens: Token[]): number {
  return tokens.reduce((total, token) => total + token.balance * token.price, 0)
}

// Portfolio history for charts (mock data)
export const PORTFOLIO_HISTORY = [
  { date: 'Mon', value: 65000 },
  { date: 'Tue', value: 68500 },
  { date: 'Wed', value: 67200 },
  { date: 'Thu', value: 72000 },
  { date: 'Fri', value: 71500 },
  { date: 'Sat', value: 74800 },
  { date: 'Sun', value: 78240 },
]
