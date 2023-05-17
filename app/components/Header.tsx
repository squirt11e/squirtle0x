import ConnectWallet from './ConnectWallet';
import ENSName from './ENSName';
import ENSAvatar from './ENSAvatar';

const Header = () => {
  return (
    <header className="mb-16">
      <div className="mb-6 flex flex-row justify-between">
        <ENSName />
        <ConnectWallet />
      </div>

      <ENSAvatar />
    </header>
  );
};

export default Header;
