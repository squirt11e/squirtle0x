import { useAccount, useEnsName, useEnsAvatar } from 'wagmi';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';

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
    <div className="flex flex-col relative">
      {/* <h3 className="text-xl font-thin text-lightBlue absolute -bottom-8">ENS Avatar</h3> */}
      {ensAvatarData ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={ensAvatarData}
          className="border-solid border-[1px] border-teal rounded-lg"
          width={300}
          height={300}
          alt={`${ensNameData}'s avatar`}
        />
      ) : isConnected && !isLoading && !isError ? (
        <Link href="https://twitter.com/squirtle0x">
          <div className="w-[300px] h-[300px] border-solid border-2 border-light rounded-lg text-lightBlue font-semibold hover:text-teal font-semibold transition-colors underline underline-offset-8 flex justify-center items-center">
            Setup ENS Avatar
          </div>
        </Link>
      ) : (
        <>
          <Image
            src="/images/toad.png"
            className="border-solid border-2 border-teal rounded-lg"
            width={300}
            height={300}
            alt={'CrypToadz #1811'}
            priority
          />
        </>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(ENSAvatar), { ssr: false });
