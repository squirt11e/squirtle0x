import { WagmiConfig, createConfig, mainnet } from 'wagmi'
import { createPublicClient, http } from 'viem'
import '../app/styles/globals.css'
import Profile from '../app/modules/Profile';

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http()
  }),
})

export default function Home() {
  return (
    <WagmiConfig config={config}>
      <Profile />
    </WagmiConfig>
  )
}
