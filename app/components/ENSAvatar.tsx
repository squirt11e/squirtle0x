import Image from 'next/image';

export default function ENSAvatar() {
  return (
    <Image
      src="/images/toad.png"
      className="border-solid border-2 border-purple rounded-lg"
      width={200}
      height={200}
      alt={'CrypToadz #1811'}
      priority
    />
  );
}
