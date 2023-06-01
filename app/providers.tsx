'use client'
import { useEffect } from 'react'

import './styles/globals.css'
import merge from 'lodash.merge'
import { mainnet } from 'wagmi/chains'
import TagManager from 'react-gtm-module'
import '@rainbow-me/rainbowkit/styles.css'
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { getDefaultWallets, RainbowKitProvider, darkTheme, Theme } from '@rainbow-me/rainbowkit'

// Configure chains and connectors for Wagmi
const { chains, publicClient } = configureChains(
  [mainnet],
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY || '' }), publicProvider()]
)

const projectId = 'squirtle0x portfolio'

const { connectors } = getDefaultWallets({
  appName: 'squirtle0x portfolio',
  projectId: projectId,
  chains,
})

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
})

const myTheme = merge(darkTheme(), {
  colors: {
    accentColor: 'var(--color-teal)',
    accentColorForeground: 'var(--color-light)',
    modalText: 'var(--color-light)',
    modalTextSecondary: 'var(--color-lightBlue)',
    modalBackground: 'var(--color-black)',
    connectButtonBackground: 'var(--color-black)',
  },
  fonts: {
    body: 'inherit',
  },
} as Theme)

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    TagManager.initialize({ gtmId: process.env.NEXT_PUBLIC_GTAG || '' })
  }, [])
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={myTheme}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
