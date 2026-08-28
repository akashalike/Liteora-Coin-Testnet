import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Nami Token | AMI",
  description: "Nami Token (AMI) — a community token on TON Testnet.",
  icons: { icon: "/nami-token-logo.png", apple: "/nami-token-logo.png" },
}

export const viewport: Viewport = {
  themeColor: "#081015",
  colorScheme: "dark",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-background"><body>{children}</body></html>
}
