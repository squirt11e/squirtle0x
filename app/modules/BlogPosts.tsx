'use client'
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useAccount } from 'wagmi'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useFetchMintedNfts } from '@/hooks/useGetMintedNfts'
import { OWNER_ARTICLES, OWNER_ADDRESS, OWNER_MIRROR_URL } from '@/config/constants'

const BlogPosts = () => {
  // Get account address and connection status
  const { address, isConnected } = useAccount()

  // Use default address if not connected
  const userAddress = isConnected ? address : OWNER_ADDRESS

  // Fetch minted NFTs
  const { nfts, isLoading } = useFetchMintedNfts({ userAddress, isConnected })

  // Filter NFTs to only show Mirror articles
  const filteredNfts = isConnected
    ? nfts
      ? nfts.filter(nft => nft.description.includes('mirror.xyz'))
      : []
    : nfts.filter(nft => OWNER_ARTICLES.some(article => nft.description.includes(article)))

  return (
    <section className="flex flex-col">
      <h3 className="mb-4 text-3xl font-semibold text-light">
        {isConnected && 'Owned '}
        Mirror Articles
      </h3>

      {isLoading ? (
        <div className="flex mt-2">
          <div className="w-8 h-8 animate-spin">
            <AiOutlineLoading3Quarters className="w-full h-full fill-teal" />
          </div>
        </div>
      ) : filteredNfts.length === 0 ? (
        <div>
          <Link
            href={OWNER_MIRROR_URL}
            className="text-lightBlue hover:text-teal font-semibold transition-colors underline underline-offset-8"
          >
            Get your first Mirror article!
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-articles md:grid-cols-mdArticles gap-2 md:gap-4 justify-center md:justify-start">
          {filteredNfts.map((nft, index) => (
            <div key={index} className="flex flex-col">
              <Link href={nft.description}>
                <img
                  src={nft.media[0].thumbnail || nft.media[0].gateway || '/images/placeholder.jpg'}
                  className="border-solid border-[1px] border-teal hover:border-lightBlue transition-colors	rounded-lg w-full"
                  alt={`${nft.title} NFT`}
                />
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default BlogPosts
