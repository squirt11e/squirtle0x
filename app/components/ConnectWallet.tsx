import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { useEnsName } from 'wagmi';

export default function ConnectWallet() {
  // Get account address and connection status
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  // Disconnect wallet
  const { disconnect } = useDisconnect();

  // Get ENS name
  const { data, isError, isLoading } = useEnsName({
    address: address,
  });
  // Show ENS name if it exists, otherwise show address
  const ensName = data && !isError && !isLoading ? data : address;

  return (
    <button
      className="h-8 text-green border-solid border-2 rounded-lg px-4 font-light max-w-[146px]"
      onClick={() => (isConnected ? disconnect() : connect())}
    >
      {isConnected ? <div className="truncate">{ensName}</div> : 'Connect'}
    </button>
  );
}
