'use client'
import { ConnectButton } from '@rainbow-me/rainbowkit'

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
  )
}

export default ConnectWallet
