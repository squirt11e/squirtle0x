import { useAccount, useEnsName } from 'wagmi';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const ENSName = () => {
  // Get account address and connection status
  const { address, isConnected } = useAccount();

  // Get ENS name
  const { data, isError, isLoading } = useEnsName({
    address: address,
  });

  // Show ENS name if it exists, otherwise show address
  const ensName = data;

  const getStringWithEllipsis = (str: string) => {
    const firstSixChars = str.substring(0, 4);
    const lastFourChars = str.substring(str.length - 4);
    return `${firstSixChars}...${lastFourChars}`;
  };

  return (
    <>
      <h2 className="text-4xl font-semibold text-light flex flex-wrap items-baseline">
        {data ? (
          <>
            Welcome&nbsp;<div className="text-lightBlue">{ensName}</div>
          </>
        ) : isConnected && !isLoading && !isError ? (
          <div className="flex flex-col gap-2">
            <div className="flex">
              Welcome&nbsp;<div className="text-lightBlue">{getStringWithEllipsis(address || '0x1337')}</div>
            </div>
            <Link
              href="https://twitter.com/squirtle0x"
              className="text-lightBlue text-base hover:text-teal font-semibold transition-colors underline underline-offset-8"
            >
              Setup ENS Name
            </Link>
          </div>
        ) : (
          <>
            Squirtle0x&nbsp;<span className="text-base text-lightBlue">Frontend Dev</span>
          </>
        )}
      </h2>
    </>
  );
};

export default dynamic(() => Promise.resolve(ENSName), { ssr: false });
