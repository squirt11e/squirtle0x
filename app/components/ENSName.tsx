import { useAccount, useEnsName } from 'wagmi';
import Link from 'next/link';
import exp from 'constants';

const ENSName = () => {
  // Get account address and connection status
  const { address, isConnected } = useAccount();

  // Get ENS name
  const { data, isError, isLoading } = useEnsName({
    address: address,
  });

  // Show ENS name if it exists, otherwise show address
  const ensName = data && !isError && !isLoading && data;

  return (
    <>
      <h2 className="text-2xl font-semibold text-green flex flex-wrap items-baseline">
        {data ? (
          <>Welcome {ensName}</>
        ) : isConnected ? (
          <Link href="https://twitter.com/squirtle0x">Setup ENS Name</Link>
        ) : (
          <>
            Squirtle0x &nbsp; <span className="text-sm font-light">Frontend Dev</span>
          </>
        )}
      </h2>
    </>
  );
};

export default ENSName;
