import { useAccount, useEnsName, useEnsAvatar } from 'wagmi';
import Image from 'next/image';
import Link from 'next/link';

const ENSAvatar = () => {
  // Get account address and connection status
  const { address, isConnected } = useAccount();

  // Get ENS name
  const { data: ensNameData } = useEnsName({
    address: address,
  });

  const {
    data: ensAvatarData,
    isLoading,
    isError,
  } = useEnsAvatar({
    name: ensNameData,
  });

  return (
    <div className="flex">
      {ensAvatarData ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={ensAvatarData}
          className="border-solid border-2 border-teal rounded-lg"
          width={200}
          height={200}
          alt={`${ensNameData}'s avatar`}
        />
      ) : isConnected && !isLoading && !isError ? (
        <Link href="https://twitter.com/squirtle0x">
          <div className="w-[200px] h-[200px] border-solid border-2 border-light rounded-lg text-light flex justify-center items-center">
            Setup ENS Avatar
          </div>
        </Link>
      ) : (
        <>
          <Image
            src="/images/toad.png"
            className="border-solid border-2 border-teal rounded-lg"
            width={200}
            height={200}
            alt={'CrypToadz #1811'}
            priority
          />
        </>
      )}
    </div>
  );
};

export default ENSAvatar;
