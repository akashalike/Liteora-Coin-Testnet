import Image from "next/image"
import { ArrowUpRight, Copy, ExternalLink, ShieldCheck, Sparkles } from "lucide-react"

const contract = "TON Testnet · Contract address coming soon"

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 lg:px-10">
        <a href="#top" className="flex items-center gap-3" aria-label="Nami Token home">
          <Image src="/nami-token-logo.png" alt="Nami Token logo" width={42} height={42} className="rounded-full" priority />
          <span className="font-mono text-sm font-bold tracking-[0.2em]">NAMI / AMI</span>
        </a>
        <a href="#about" className="hidden items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:flex">Explore <ArrowUpRight className="size-4" /></a>
      </nav>

      <section id="top" className="mx-auto grid max-w-6xl items-center gap-14 px-6 pb-20 pt-14 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:pb-32 lg:pt-24">
        <div className="flex flex-col items-start gap-8">
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 font-mono text-xs tracking-[0.16em] text-primary"><span className="size-2 rounded-full bg-primary" /> TON TESTNET</div>
          <h1 className="max-w-3xl text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.06em] sm:text-7xl lg:text-8xl">A brighter token for the <span className="text-primary">next wave.</span></h1>
          <p className="max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">Nami Token is a community-first digital asset built for experimentation, participation, and the open waters of TON.</p>
          <div className="flex flex-wrap gap-3"><a href="#token" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">Discover AMI <ArrowUpRight className="size-4" /></a><a href="#about" className="rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-card">Learn more</a></div>
        </div>
        <div className="relative flex justify-center lg:justify-end"><div className="absolute inset-10 rounded-full bg-primary/10 blur-3xl" /><div className="relative rounded-[2rem] border border-border bg-card p-5 shadow-2xl shadow-primary/5"><Image src="/nami-token-logo.png" alt="Nami Token AMI coin mark" width={390} height={390} className="size-64 rounded-3xl object-cover sm:size-80" priority /><div className="flex items-center justify-between px-2 pb-1 pt-5"><div><p className="font-mono text-xs text-muted-foreground">TOKEN SYMBOL</p><p className="mt-1 text-2xl font-semibold tracking-tight">AMI</p></div><Sparkles className="size-5 text-accent" /></div></div></div>
      </section>

      <section id="token" className="border-y border-border bg-card/40"><div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-3 lg:px-10"><div><p className="font-mono text-xs text-muted-foreground">TOKEN NAME</p><p className="mt-2 text-xl font-semibold">Nami Token</p></div><div><p className="font-mono text-xs text-muted-foreground">SYMBOL</p><p className="mt-2 text-xl font-semibold">AMI</p></div><div><p className="font-mono text-xs text-muted-foreground">NETWORK</p><p className="mt-2 text-xl font-semibold">TON Testnet</p></div></div></section>

      <section id="about" className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-10 lg:py-28"><div><p className="font-mono text-xs tracking-[0.16em] text-primary">THE NAMI STANDARD</p><h2 className="mt-4 max-w-md text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Simple by design. Open by nature.</h2></div><div className="flex flex-col gap-5"><div className="flex gap-4 border-b border-border pb-5"><ShieldCheck className="mt-1 size-5 shrink-0 text-primary" /><div><h3 className="font-semibold">Testnet-first</h3><p className="mt-1 leading-6 text-muted-foreground">A safe environment to explore the token experience before mainnet.</p></div></div><div className="flex gap-4 border-b border-border pb-5"><Copy className="mt-1 size-5 shrink-0 text-primary" /><div><h3 className="font-semibold">Clear identity</h3><p className="mt-1 leading-6 text-muted-foreground">One name, one symbol, one recognizable mark: Nami Token, AMI.</p></div></div><div className="flex gap-4"><ExternalLink className="mt-1 size-5 shrink-0 text-primary" /><div><h3 className="font-semibold">On-chain soon</h3><p className="mt-1 leading-6 text-muted-foreground">{contract}</p></div></div></div></section>

      <footer className="mx-auto flex max-w-6xl flex-col gap-3 border-t border-border px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-10"><span className="font-mono">NAMI TOKEN · AMI</span><span>Built for the TON community.</span></footer>
    </main>
  )
}
