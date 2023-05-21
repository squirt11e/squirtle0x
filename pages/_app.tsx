import { AppProps } from 'next/app';
import { getDefaultWallets, RainbowKitProvider, darkTheme, Theme } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import merge from 'lodash.merge';
import '../app/styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';

const { chains, publicClient } = configureChains(
  [mainnet],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_KEY || '' }), publicProvider()],
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
    connectButtonText: 'var(--color-light)',
  },
  fonts: {
    body: 'inherit',
  },
} as Theme);

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={myTheme}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default MyApp;
