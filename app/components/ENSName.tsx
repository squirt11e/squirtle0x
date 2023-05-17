import { useAccount, useEnsName } from 'wagmi';
import Link from 'next/link';

const ENSName = () => {
  // Get account address and connection status
  const { address, isConnected } = useAccount();

  // Get ENS name
  const { data, isError, isLoading } = useEnsName({
    address: address,
  });

  if (isLoading || isError) {
    return <h2>Loading...</h2>;
  }

  // Show ENS name if it exists, otherwise show address
  const ensName = data;

  return (
    <>
      <h2 className="text-3xl font-semibold text-light flex flex-wrap items-baseline">
        {data ? (
          <>
            Welcome &nbsp;<div className="text-lightBlue">{ensName}</div>
          </>
        ) : isConnected ? (
          <Link href="https://twitter.com/squirtle0x" className="text-teal">
            Setup ENS Name
          </Link>
        ) : (
          <>
            Squirtle0x &nbsp; <span className="text-base text-lightBlue">Frontend Dev</span>
          </>
        )}
      </h2>
    </>
  );
};

export default ENSName;
