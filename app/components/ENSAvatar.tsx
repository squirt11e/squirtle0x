import { useAccount, useEnsName, useEnsAvatar } from 'wagmi';
import Image from 'next/image';
import Link from 'next/link';

export default function ENSAvatar() {
  // Get account address and connection status
  const { address, isConnected } = useAccount();

  // Get ENS name
  const { data: ensNameData } = useEnsName({
    address: address,
  });

  const { data: ensAvatarData } = useEnsAvatar({
    name: ensNameData,
  });

  console.log(ensAvatarData);

  return (
    <div className="flex">
      {ensAvatarData ? (
        <Image
          src={ensAvatarData}
          className="border-solid border-2 border-purple rounded-lg"
          width={200}
          height={200}
          alt={'CrypToadz #1811'}
          priority
        />
      ) : isConnected ? (
        <Link href="https://twitter.com/squirtle0x">
          <div className="w-[200px] h-[200px] border-solid border-2 border-light rounded-lg text-green flex justify-center items-center">
            Setup ENS Avatar
          </div>
        </Link>
      ) : (
        <>
          <Image
            src="/images/toad.png"
            className="border-solid border-2 border-purple rounded-lg"
            width={200}
            height={200}
            alt={'CrypToadz #1811'}
            priority
          />
        </>
      )}
    </div>
  );
}
