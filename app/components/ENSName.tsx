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

  return (
    <>
      <h2 className="text-3xl font-semibold text-light flex flex-wrap items-baseline">
        {data ? (
          <>
            Welcome &nbsp;<div className="text-lightBlue">{ensName}</div>
          </>
        ) : isConnected && !isLoading && !isError ? (
          <>
            Welcome 0x... &nbsp;
            <Link href="https://twitter.com/squirtle0x" className="text-lightBlue text-base">
              Setup ENS Name
            </Link>
          </>
        ) : (
          <>
            Squirtle0x &nbsp; <span className="text-base text-lightBlue">Frontend Dev</span>
          </>
        )}
      </h2>
    </>
  );
};

export default dynamic(() => Promise.resolve(ENSName), { ssr: false });
