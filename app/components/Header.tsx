import ConnectWallet from "./ConnectWallet";
import Image from "next/image";


export default function Header() {

  return (
  <header className="mb-16">
    <div className="mb-6 flex flex-row justify-between">
      <h2 className='text-2xl font-semibold text-green flex flex-wrap items-baseline'>Squirtle0x &nbsp; <span className="text-sm font-light">Frontend Dev</span></h2>
      <ConnectWallet />
    </div>

    <Image src="/images/toad.png" className="border-solid border-2 border-purple rounded-lg" width={200} height={200} alt={"CrypToadz #1811"} priority />
  </header>
  );
}