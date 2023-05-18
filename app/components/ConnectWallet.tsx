import { ConnectButton } from '@rainbow-me/rainbowkit';
import dynamic from 'next/dynamic';

const ConnectWallet = () => {
  return (
    <>
      <ConnectButton
        chainStatus="none"
        showBalance={false}
        accountStatus={{
          smallScreen: 'avatar',
          largeScreen: 'full',
        }}
      />
    </>
  );
};

export default dynamic(() => Promise.resolve(ConnectWallet), { ssr: false });
