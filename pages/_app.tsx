import { useEffect } from 'react';

import { getDefaultWallets, RainbowKitProvider, darkTheme, Theme } from '@rainbow-me/rainbowkit';
import merge from 'lodash.merge';
import { AppProps } from 'next/app';
import TagManager from 'react-gtm-module';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import '../app/styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';

// Configure chains and connectors for Wagmi
const { chains, publicClient } = configureChains(
  [mainnet],
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY || '' }), publicProvider()],
);

const projectId = 'squirtle0x portfolio';

const { connectors } = getDefaultWallets({
  appName: 'squirtle0x portfolio',
  projectId: projectId,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

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
} as Theme);
const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    TagManager.initialize({ gtmId: process.env.NEXT_PUBLIC_GTAG || '' });
  }, []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={myTheme}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default MyApp;
