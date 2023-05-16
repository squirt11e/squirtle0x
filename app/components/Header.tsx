import ConnectWallet from './ConnectWallet';
import ENSName from './ENSName';
import ENSAvatar from './ENSAvatar';

export default function Header() {
  return (
    <header className="mb-16">
      <div className="mb-6 flex flex-row justify-between">
        <ENSName />
        <ConnectWallet />
      </div>

      <ENSAvatar />
    </header>
  );
}
