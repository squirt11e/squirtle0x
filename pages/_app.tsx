import { AppProps } from 'next/app';
import { WagmiConfig, configureChains, createConfig, mainnet } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import '../app/styles/globals.css';

const { publicClient, webSocketPublicClient } = configureChains([mainnet], [publicProvider()]);

const config = createConfig({
  publicClient,
  webSocketPublicClient,
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <WagmiConfig config={config}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
};

export default MyApp;
