import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

export default function ConnectWallet() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect();

  return (
    <button 
      className='h-8 text-green border-solid border-2 rounded-lg px-4 font-light max-w-[146px]' 
      onClick={() => isConnected ? disconnect() : connect()}
    >
      {isConnected ? 
        (
          <div className='truncate'>{address}</div>
        ) : 
        'Connect' 
      }
    </button>
  ) 
}
