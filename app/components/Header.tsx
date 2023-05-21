import ConnectWallet from './ConnectWallet';
import ENSName from './ENSName';
import ENSAvatar from './ENSAvatar';
import ToadSVG from './ToadSVG';

const Header = () => {
  return (
    <header className="mb-24 md:mb-0 md:min-h-screen">
      <div className="mb-12 md:mb-24 flex flex-row gap-2 justify-between">
        <div className="flex w-[52px] h-[40px]">
          <ToadSVG fill="var(--color-light)" />
        </div>
        <ConnectWallet />
      </div>

      <div className="flex flex-col md:flex-row gap-6 justify-between">
        <div className="flex flex-col gap-6 justify-center w-full md:w-1/3">
          <ENSName />
          <ENSAvatar />
        </div>

        <p className="w-full max-w-[500px] md:w-2/3 text-4xl md:text-6xl text-lightBlue font-thin items-center flex md:text-right justify-end leading-snug">
          My Portfolio, Your Digital Reflection
        </p>
      </div>
    </header>
  );
};

export default Header;
