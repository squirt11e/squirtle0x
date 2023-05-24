import { Suspense } from 'react';
import Image from 'next/image';

import dynamic from 'next/dynamic';
import { useAccount, useEnsAvatar, useEnsName } from 'wagmi';
import ToadSVG from '../components/ToadSVG';
import ConnectWallet from '../components/ConnectWallet';
import ENSNameHeading from '../components/ENSNameHeading';
import ENSAvatarHeading from '../components/ENSAvatarHeading';

const Header = () => {
  // Get account address and connection status
  const { address, isConnected } = useAccount();

  // Get ENS name
  const { data: ENSName } = useEnsName({
    address: address,
  });

  const { data: ENSAvatar } = useEnsAvatar({
    name: ENSName,
  });

  return (
    <header className="mb-24 md:mb-0 md:h-screen max-h-[788px]">
      <div className="mb-12 md:mb-24 flex flex-row gap-2 justify-between">
        <div className="flex w-[52px] h-[40px]">
          <ToadSVG fill="var(--color-light)" />
        </div>
        <ConnectWallet />
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-col gap-6 justify-center w-full md:w-1/2">
          <ENSNameHeading ENSName={ENSName || undefined} isConnected={isConnected} address={address} />
          <Suspense
            fallback={
              <div className="flex flex-col relative">
                <Image
                  src="/images/placeholder.jpg"
                  className="border-solid border-2 border-teal rounded-lg"
                  width={300}
                  height={300}
                  alt={'CrypToadz #1811'}
                  priority
                />
              </div>
            }
          >
            <ENSAvatarHeading
              ENSName={ENSName || undefined}
              ENSAvatar={ENSAvatar || undefined}
              isConnected={isConnected}
            />
          </Suspense>
        </div>

        <p className="flex flex-col md:items-end justify-center w-full md:max-w-[500px] md:w-1/2 text-4xl md:text-6xl text-lightBlue font-thin md:text-right leading-snug">
          {isConnected ? 'Your' : 'My'} on-chain identity & content
          <span className={`text-base text-teal font-bold`}>
            {isConnected ? 'Experiencing' : 'Building'} the future
          </span>
        </p>
      </div>
    </header>
  );
};

export default dynamic(() => Promise.resolve(Header), { ssr: false });
