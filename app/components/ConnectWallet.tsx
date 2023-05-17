import { ConnectButton } from '@rainbow-me/rainbowkit';

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

export default ConnectWallet;
