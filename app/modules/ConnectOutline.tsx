'use client'
import { useAccount } from 'wagmi'
import ENSBlogPosts from '@/components/ENSBlogPosts'
import { useConnectModal } from '@rainbow-me/rainbowkit'

const ConnectOutline = () => {
  const { isConnected } = useAccount()

  const { openConnectModal } = useConnectModal()

  return (
    <section className="flex flex-col">
      <h3 className="mb-4 w-full text-3xl md:text-4xl text-center text-light font-thin leading-snug">
        {isConnected ? (
          <>Connected!</>
        ) : (
          <>
            <button onClick={openConnectModal} className="flex-inline font-semibold hover:text-teal transition-colors">
              Connect
            </button>
            &nbsp;& see your on-chain identity
          </>
        )}
      </h3>

      {isConnected ? (
        <ENSBlogPosts />
      ) : (
        <p className="text-base md:text-lg text-lightBlue text-center">
          Setup your identity by connecting your public facing wallet address.
        </p>
      )}
    </section>
  )
}

export default ConnectOutline
