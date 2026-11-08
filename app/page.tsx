"use client"

import { useState } from "react"
import { ArrowDownToLine, ArrowUpFromLine, ChevronDown, Copy, Eye, EyeOff, Gift, Home, Layers3, Menu, Repeat2, ScanLine, Settings2, ShieldCheck, Sparkles, UserRound, WalletCards, Zap } from "lucide-react"

const logo = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Picsart_26-11-04_22-07-25-090-JMSddf4nQdlur4FCvBTnihk3XvSfvT.png"

const assets = [
  { name: "Nami Token", ticker: "AMI", amount: "12,450.00", value: "$1,493.99", change: "+8.42%", icon: "nami" },
  { name: "Solana", ticker: "SOL", amount: "4.82", value: "$864.52", change: "+3.18%", icon: "sol" },
  { name: "USD Coin", ticker: "USDC", amount: "520.00", value: "$520.00", change: "+0.01%", icon: "usdc" },
]

const tabs = [
  { id: "home", label: "Home", icon: Home },
  { id: "wallet", label: "Wallet", icon: WalletCards },
  { id: "swap", label: "Swap", icon: Repeat2 },
  { id: "stake", label: "Stake", icon: Zap },
  { id: "profile", label: "Profile", icon: UserRound },
]

function TokenIcon({ type, small = false }: { type: string; small?: boolean }) {
  return type === "nami" ? <img className={`token-icon ${small ? "small" : ""}`} src={logo} alt="Nami golden token logo" /> : <span className={`token-icon ${type} ${small ? "small" : ""}`}>{type === "sol" ? "S" : "$"}</span>
}

function HomeView({ hideBalance }: { hideBalance: boolean }) {
  return <>
    <section className="balance-card">
      <div className="balance-glow" />
      <div className="balance-top"><span>Total balance</span><button className="icon-button" onClick={() => {}} aria-label="Copy wallet address"><Copy /></button></div>
      <div className="balance-value">{hideBalance ? "••••••" : "$2,878.51"}</div>
      <div className="balance-change"><span>+$142.48</span><span className="pill">+5.2%</span><span>past 24h</span></div>
      <div className="wallet-address"><span className="online-dot" /> 7xN…p92Q <Copy /></div>
    </section>
    <div className="quick-actions">
      {[{ label: "Send", icon: ArrowUpFromLine }, { label: "Receive", icon: ArrowDownToLine }, { label: "Swap", icon: Repeat2 }, { label: "Stake", icon: Zap }].map(({ label, icon: Icon }) => <button key={label} className="quick-action"><span><Icon /></span>{label}</button>)}
    </div>
    <section className="section-block"><div className="section-heading"><div><p className="eyebrow">Portfolio</p><h2>Your assets</h2></div><button className="link-button">Manage <ChevronDown /></button></div><div className="asset-list">{assets.map((asset) => <div className="asset-row" key={asset.ticker}><TokenIcon type={asset.icon} /><div className="asset-name"><strong>{asset.name}</strong><span>{asset.ticker}</span></div><div className="asset-amount"><strong>{asset.amount}</strong><span>{asset.value}</span></div><span className="asset-change">{asset.change}</span></div>)}</div></section>
  </>
}

function SwapView() { return <section className="panel-view"><div className="panel-title"><div><p className="eyebrow">Jupiter aggregator</p><h1>Swap tokens</h1></div><span className="live-dot">Live</span></div><div className="swap-card"><label>You pay</label><div className="swap-input"><input defaultValue="250" aria-label="Amount to pay" /><button><TokenIcon type="sol" small /> SOL <ChevronDown /></button></div><p>Balance 4.82 SOL</p><div className="swap-switch"><Repeat2 /></div><label>You receive</label><div className="swap-input"><input defaultValue="2,081.42" aria-label="Amount to receive" /><button><TokenIcon type="nami" small /> AMI <ChevronDown /></button></div><p>Best route via Jupiter · 0.3% price impact</p><button className="primary-button">Connect wallet to swap</button></div></section> }

function StakeView() { return <section className="panel-view"><div className="panel-title"><div><p className="eyebrow">Grow your assets</p><h1>Stake AMI</h1></div><span className="live-dot">Live APY</span></div><div className="stake-hero"><div className="stake-orb"><TokenIcon type="nami" /></div><div><strong>AMI staking vault</strong><p>Flexible staking · Auto-compound rewards</p></div><span className="apy">18.42% <small>APY</small></span></div><div className="staking-grid"><div className="mini-card"><span>TVL</span><strong>$4.82M</strong><small>+12.8% this week</small></div><div className="mini-card"><span>My staked AMI</span><strong>0.00 AMI</strong><small>Start earning today</small></div></div><button className="primary-button wide">Connect wallet to stake</button><div className="security-note"><ShieldCheck /> Audited vault · Powered by Solana</div></section> }

export default function WalletApp() {
  const [active, setActive] = useState("home")
  const [hideBalance, setHideBalance] = useState(false)
  return <main className="app-shell"><header className="topbar"><div className="brand"><img src={logo} alt="Nami emblem" /><div><strong>Nami</strong><span>Solana Wallet</span></div></div><div className="header-actions"><button className="network"><span className="online-dot" /> Solana <ChevronDown /></button><button className="icon-button" aria-label="Settings"><Settings2 /></button><button className="menu-button" aria-label="Menu"><Menu /></button></div></header><div className="content">{active === "home" && <><div className="welcome-row"><div><p className="eyebrow">Saturday, Nov 8</p><h1>Good evening, Alex</h1></div><button className="profile-avatar">A</button></div><div className="balance-heading"><span>Overview</span><button className="icon-button" onClick={() => setHideBalance((value) => !value)} aria-label="Toggle balance visibility">{hideBalance ? <EyeOff /> : <Eye />}</button></div><HomeView hideBalance={hideBalance} /></>}{active === "wallet" && <><div className="welcome-row"><div><p className="eyebrow">Your account</p><h1>Wallet</h1></div><button className="profile-avatar"><WalletCards /></button></div><HomeView hideBalance={hideBalance} /></>}{active === "swap" && <SwapView />}{active === "stake" && <StakeView />}{active === "profile" && <section className="panel-view"><div className="panel-title"><div><p className="eyebrow">Account</p><h1>Profile</h1></div></div><div className="profile-card"><div className="profile-avatar large">A</div><h2>Alex Morgan</h2><span>7xN…p92Q</span></div><div className="settings-list"><button><ShieldCheck /> Security <ChevronDown /></button><button><Gift /> Referrals <ChevronDown /></button><button><Sparkles /> Appearance <ChevronDown /></button></div></section>}</div><nav className="bottom-nav">{tabs.map(({ id, label, icon: Icon }) => <button key={id} className={active === id ? "active" : ""} onClick={() => setActive(id)}><Icon /><span>{label}</span></button>)}</nav></main>
}
