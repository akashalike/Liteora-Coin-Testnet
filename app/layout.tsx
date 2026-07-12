import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geistSans = Geist({
  subsets: ["latin"],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'Uphaar Wallet | Premium Solana Wallet',
  description: 'The premium Web3 wallet for the modern Solana ecosystem. Send, receive, swap, and stake your crypto with elegance.',
  generator: 'Uphaar',
  keywords: ['solana', 'wallet', 'crypto', 'web3', 'defi', 'staking', 'nft'],
  // <!-- INSERT YOUR FAVICON LOGO PATH HERE (e.g., /uphaar-logo.png) -->
  icons: {
    icon: '/uphaar-logo.png',
    apple: '/uphaar-logo.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#00d4d4',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
