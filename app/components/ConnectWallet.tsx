import { ConnectButton } from '@rainbow-me/rainbowkit';
import dynamic from 'next/dynamic';

const ConnectWallet = () => {
  return (
    <div>
      <ConnectButton
        chainStatus="full"
        showBalance={false}
        accountStatus={{
          smallScreen: 'avatar',
          largeScreen: 'full',
        }}
        label="Connect"
      />
    </div>
  );
};

export default dynamic(() => Promise.resolve(ConnectWallet), { ssr: false });
