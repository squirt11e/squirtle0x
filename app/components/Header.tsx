import ConnectWallet from './ConnectWallet';
import ENSName from './ENSName';
import ENSAvatar from './ENSAvatar';
import ToadSVG from './ToadSVG';
import { useAccount } from 'wagmi';
import dynamic from 'next/dynamic';

const Header = () => {
  const { isConnected } = useAccount();

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
          <ENSName />
          <ENSAvatar />
        </div>

        <p className="flex flex-col md:items-end justify-center w-full md:max-w-[500px] md:w-1/2 text-4xl md:text-6xl text-lightBlue font-thin md:text-right leading-snug">
          {isConnected ? 'Your' : 'My'} on-chain identity & content
          <span className={`text-base text-teal font-bold`}>
            {isConnected ? 'Experiencing' : 'Building'} the frontier
          </span>
        </p>
      </div>
    </header>
  );
};

export default dynamic(() => Promise.resolve(Header), { ssr: false });
