import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Nami Solana Wallet",
  description: "A clear, fast home for your Solana assets.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
