'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useWallet } from '@/lib/wallet-context'
import { formatAddress, formatCurrency, calculatePortfolioValue } from '@/lib/wallet-types'
import {
  User,
  Shield,
  Key,
  Bell,
  Moon,
  Globe,
  HelpCircle,
  LogOut,
  ChevronRight,
  Copy,
  Check,
  Fingerprint,
  Lock,
  Eye,
  EyeOff,
  Smartphone,
  ExternalLink,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { WhitepaperModal } from '@/components/whitepaper-modal'
import Image from 'next/image'

interface ProfilePageProps {
  onLogout: () => void
}

export function ProfilePage({ onLogout }: ProfilePageProps) {
  const { address, tokens, disconnect } = useWallet()
  const [copied, setCopied] = useState(false)
  const [showSeedPhrase, setShowSeedPhrase] = useState(false)
  const [biometricEnabled, setBiometricEnabled] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [selectedLanguage, setSelectedLanguage] = useState('English (US)')
  const [showLanguageModal, setShowLanguageModal] = useState(false)
  const [showChangePINModal, setShowChangePINModal] = useState(false)
  const [showTwoFAModal, setShowTwoFAModal] = useState(false)
  const [showConnectedAppsModal, setShowConnectedAppsModal] = useState(false)
  const [newPIN, setNewPIN] = useState('')
  const [showWhitepaperModal, setShowWhitepaperModal] = useState(false)

  const totalValue = calculatePortfolioValue(tokens)

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleLogout = () => {
    disconnect()
    onLogout()
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const settingSections = [
    {
      title: 'Security',
      items: [
        {
          icon: Fingerprint,
          label: 'Biometric Login',
          description: 'Use Face ID or fingerprint',
          toggle: true,
          value: biometricEnabled,
          onChange: setBiometricEnabled,
        },
        {
          icon: Lock,
          label: 'Change PIN',
          description: 'Update your security PIN',
          action: true,
          onClick: () => setShowChangePINModal(true),
        },
        {
          icon: Key,
          label: 'Recovery Phrase',
          description: 'View your 12-word backup',
          action: true,
          onClick: () => setShowSeedPhrase(!showSeedPhrase),
        },
        {
          icon: Shield,
          label: 'Two-Factor Auth',
          description: 'Add extra security layer',
          action: true,
          onClick: () => setShowTwoFAModal(true),
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          icon: Bell,
          label: 'Notifications',
          description: 'Transaction alerts & updates',
          toggle: true,
          value: notificationsEnabled,
          onChange: setNotificationsEnabled,
        },
        {
          icon: Moon,
          label: 'Dark Mode',
          description: 'Always on',
          toggle: true,
          value: darkMode,
          onChange: setDarkMode,
        },
        {
          icon: Globe,
          label: 'Language',
          description: selectedLanguage,
          action: true,
          onClick: () => setShowLanguageModal(true),
        },
        {
          icon: Smartphone,
          label: 'Connected Apps',
          description: '3 apps connected',
          action: true,
          onClick: () => setShowConnectedAppsModal(true),
        },
      ],
    },
    {
      title: 'Documentation & Resources',
      items: [
        {
          icon: HelpCircle,
          label: 'Whitepaper',
          description: 'Complete token overview',
          action: true,
          onClick: () => setShowWhitepaperModal(true),
        },
        {
          icon: ExternalLink,
          label: 'Visit Uphaar Ecosystem Website',
          description: 'https://uphaartoken.bolt.host',
          action: true,
          external: true,
          href: 'https://uphaartoken.bolt.host',
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: HelpCircle,
          label: 'Help Center',
          description: 'FAQs and guides',
          action: true,
          external: true,
        },
        {
          icon: ExternalLink,
          label: 'Terms of Service',
          description: 'Legal information',
          action: true,
          external: true,
        },
      ],
    },
  ]

  return (
    <motion.div
      className="flex flex-col min-h-full pb-24"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.header variants={itemVariants} className="p-6">
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
      </motion.header>

      {/* Profile Card */}
      <motion.div variants={itemVariants} className="px-6 mb-6">
        <div className="glass-card p-6 rounded-2xl border-glow">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full gradient-cyan flex items-center justify-center">
              <User className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">Uphaar User</h2>
              <button
                onClick={handleCopyAddress}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {address ? formatAddress(address) : 'Not connected'}
                {copied ? (
                  <Check className="w-4 h-4 text-[var(--success)]" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
            <div>
              <p className="text-sm text-muted-foreground">Portfolio Value</p>
              <p className="text-lg font-bold text-foreground">
                {formatCurrency(totalValue)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Member Since</p>
              <p className="text-lg font-bold text-foreground">Mar 2024</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recovery Phrase Warning (shown when toggled) */}
      {showSeedPhrase && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="px-6 mb-6"
        >
          <div className="glass-card p-4 rounded-xl border border-[var(--warning)]/50">
            <div className="flex items-start gap-3 mb-4">
              <Shield className="w-5 h-5 text-[var(--warning)] flex-shrink-0" />
              <div>
                <p className="font-semibold text-[var(--warning)]">
                  Keep this private!
                </p>
                <p className="text-sm text-muted-foreground">
                  Never share your recovery phrase with anyone.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 p-3 bg-background/50 rounded-lg">
              {[
                'abandon',
                'ability',
                'able',
                'about',
                'above',
                'absent',
                'absorb',
                'abstract',
                'absurd',
                'abuse',
                'access',
                'accident',
              ].map((word, i) => (
                <div
                  key={i}
                  className="text-xs text-center py-1 bg-secondary/50 rounded"
                >
                  <span className="text-muted-foreground">{i + 1}.</span>{' '}
                  <span className="text-foreground">{word}</span>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSeedPhrase(false)}
              className="w-full mt-3"
            >
              <EyeOff className="w-4 h-4 mr-2" />
              Hide Phrase
            </Button>
          </div>
        </motion.div>
      )}

      {/* Settings Sections */}
      <div className="px-6 space-y-6">
        {settingSections.map((section, sectionIndex) => (
          <motion.div key={section.title} variants={itemVariants}>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              {section.title}
            </h3>
            <div className="glass-card rounded-xl overflow-hidden divide-y divide-border">
              {section.items.map((item, itemIndex) => (
                <div
                  key={item.label}
                  className={`flex items-center justify-between p-4 ${
                    item.action && !item.toggle
                      ? 'cursor-pointer hover:bg-secondary/30 transition-colors'
                      : ''
                  }`}
                  onClick={item.onClick}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  {item.toggle && (
                    <Switch
                      checked={item.value}
                      onCheckedChange={item.onChange}
                    />
                  )}
                  {item.action && !item.toggle && (
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Logout Button */}
        <motion.div variants={itemVariants}>
          <Button
            variant="destructive"
            onClick={handleLogout}
            className="w-full h-14 font-semibold text-lg rounded-xl"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Log Out
          </Button>
        </motion.div>

        {/* Version */}
        <motion.div
          variants={itemVariants}
          className="text-center py-4"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Image
              src="/logo.webp"
              alt="Uphaar"
              width={20}
              height={20}
            />
            <span className="text-sm font-medium text-foreground">
              Uphaar Wallet
            </span>
          </div>
          <p className="text-xs text-muted-foreground">Version 1.0.0</p>
        </motion.div>
      </div>

      {/* Language Selection Modal */}
      {showLanguageModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-end z-[9999]"
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowLanguageModal(false)}
          />
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="relative w-full bg-gradient-to-t from-background via-background to-background/50 rounded-t-3xl border-t border-primary/20 p-6"
          >
            <h3 className="text-xl font-bold text-foreground mb-4">Select Language</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {['English (US)', 'Hindi', 'Spanish', 'French', 'German', 'Japanese'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setSelectedLanguage(lang)
                    setShowLanguageModal(false)
                  }}
                  className={`w-full p-4 rounded-xl text-left font-medium transition-all ${
                    selectedLanguage === lang
                      ? 'gradient-cyan text-primary-foreground'
                      : 'glass-card hover:border-primary/50'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
            <Button
              onClick={() => setShowLanguageModal(false)}
              variant="outline"
              className="w-full mt-4"
            >
              Close
            </Button>
          </motion.div>
        </motion.div>
      )}

      {/* Change PIN Modal */}
      {showChangePINModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-end z-[9999]"
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowChangePINModal(false)}
          />
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="relative w-full bg-gradient-to-t from-background via-background to-background/50 rounded-t-3xl border-t border-primary/20 p-6"
          >
            <h3 className="text-xl font-bold text-foreground mb-4">Change PIN</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Enter New 4-Digit PIN</p>
                <Input
                  type="password"
                  placeholder="••••"
                  maxLength={4}
                  value={newPIN}
                  onChange={(e) => setNewPIN(e.target.value.slice(0, 4))}
                  className="h-12 text-center text-2xl tracking-widest rounded-xl"
                />
              </div>
              <Button
                onClick={() => {
                  setNewPIN('')
                  setShowChangePINModal(false)
                }}
                className="w-full h-12 gradient-cyan text-primary-foreground font-semibold rounded-xl"
              >
                Confirm PIN
              </Button>
            </div>
            <Button
              onClick={() => setShowChangePINModal(false)}
              variant="outline"
              className="w-full mt-3"
            >
              Cancel
            </Button>
          </motion.div>
        </motion.div>
      )}

      {/* Two-Factor Auth Modal */}
      {showTwoFAModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-end z-[9999]"
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowTwoFAModal(false)}
          />
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="relative w-full bg-gradient-to-t from-background via-background to-background/50 rounded-t-3xl border-t border-primary/20 p-6"
          >
            <h3 className="text-xl font-bold text-foreground mb-4">Two-Factor Authentication</h3>
            <div className="space-y-4">
              <div className="glass-card p-4 rounded-xl">
                <p className="text-sm text-muted-foreground mb-3">Scan this QR code with your authenticator app:</p>
                <div className="w-48 h-48 bg-white rounded-lg mx-auto flex items-center justify-center">
                  <p className="text-xs text-gray-400">[QR Code Placeholder]</p>
                </div>
              </div>
              <Input
                type="text"
                placeholder="Enter 6-digit code"
                maxLength={6}
                className="h-12 text-center text-2xl tracking-widest rounded-xl"
              />
              <Button
                onClick={() => setShowTwoFAModal(false)}
                className="w-full h-12 gradient-cyan text-primary-foreground font-semibold rounded-xl"
              >
                Enable 2FA
              </Button>
            </div>
            <Button
              onClick={() => setShowTwoFAModal(false)}
              variant="outline"
              className="w-full mt-3"
            >
              Cancel
            </Button>
          </motion.div>
        </motion.div>
      )}

      {/* Connected Apps Modal */}
      {showConnectedAppsModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-end z-[9999]"
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowConnectedAppsModal(false)}
          />
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="relative w-full bg-gradient-to-t from-background via-background to-background/50 rounded-t-3xl border-t border-primary/20 p-6"
          >
            <h3 className="text-xl font-bold text-foreground mb-4">Connected Apps</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {['Phantom Wallet', 'Solflare', 'Magic Eden'].map((app) => (
                <div key={app} className="glass-card p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{app}</p>
                    <p className="text-xs text-muted-foreground">Connected today</p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {}}
                  >
                    Disconnect
                  </Button>
                </div>
              ))}
            </div>
            <Button
              onClick={() => setShowConnectedAppsModal(false)}
              className="w-full h-12 gradient-cyan text-primary-foreground font-semibold rounded-xl mt-4"
            >
              Close
            </Button>
          </motion.div>
        </motion.div>
      )}

      {/* Whitepaper Modal */}
      <WhitepaperModal
        isOpen={showWhitepaperModal}
        onClose={() => setShowWhitepaperModal(false)}
      />
    </motion.div>
  )
}
