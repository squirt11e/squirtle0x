import { useEffect } from 'react';

import { AppProps } from 'next/app';
import { getDefaultWallets, RainbowKitProvider, darkTheme, Theme } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import merge from 'lodash.merge';
import TagManager from 'react-gtm-module';

import '../app/styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';

export const getStaticProps = () => {
  const { GTAG, ALCHEMY_KEY } = process.env;
  return {
    props: {
      GTAG,
      ALCHEMY_KEY,
    },
  };
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  const secrets = getStaticProps();

  // Configure chains and connectors for Wagmi
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

  useEffect(() => {
    TagManager.initialize({ gtmId: secrets.props.GTAG || '' });
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
