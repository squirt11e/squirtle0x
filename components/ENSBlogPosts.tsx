'use cleint'
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { BsFillCheckSquareFill } from 'react-icons/bs'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useAccount, useEnsAvatar, useEnsName } from 'wagmi'
import { useFetchMintedNfts } from '../hooks/useGetMintedNfts'
import { MIRROR_AVATAR_ADDRESS, MIRROR_NAME_ADDRESS, OWNER_ADDRESS } from '@/config/constants'

const ENSBlogPosts = () => {
  // Get account address and connection status
  const { address, isConnected } = useAccount()

  // Get ENS name
  const { data: ENSName } = useEnsName({
    address: address,
  })

  // Get ENS avatar
  const { data: ENSAvatar } = useEnsAvatar({
    name: ENSName,
  })

  // Use default address if not connected
  const userAddress = OWNER_ADDRESS

  // Fetch minted NFTs
  const { nfts, isLoading } = useFetchMintedNfts({ userAddress, isConnected })

  // Sqourtl0x articles
  const ownerArticles = [MIRROR_AVATAR_ADDRESS, MIRROR_NAME_ADDRESS]

  // Filter NFTs to only show Mirror articles
  const filteredNfts = nfts.filter(nft => ownerArticles.some((article: string) => nft.description.includes(article)))

  return (
    <>
      {isLoading ? (
        <div className="flex mt-2">
          <div className="w-8 h-8 animate-spin">
            <AiOutlineLoading3Quarters className="w-full h-full fill-teal" />
          </div>
        </div>
      ) : (
        <div className="flex flex-row gap-2 md:gap-4 justify-center">
          {filteredNfts.map((nft, index) => {
            const isFirstItemComplete = index === 0 && ENSAvatar
            const isSecondItemComplete = index === 1 && ENSName

            let classNames = ''

            if (isFirstItemComplete) {
              classNames = ' opacity-40'
            }

            if (isSecondItemComplete) {
              classNames = ' opacity-40'
            }

            return (
              <div key={index} className="flex flex-col w-48 relative">
                <Link href={nft.description}>
                  <img
                    src={nft.media[0].thumbnail || nft.media[0].gateway || '/images/placeholder.jpg'}
                    className={`border-solid border-[1px] border-teal hover:border-lightBlue transition-colors rounded-lg w-full ${classNames}`}
                    alt={`${nft.title} NFT`}
                  />
                  {(isFirstItemComplete || isSecondItemComplete) && (
                    <div className="absolute top-2 right-2">
                      <BsFillCheckSquareFill className="w-6 h-6 fill-lightBlue" />
                    </div>
                  )}
                </Link>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export default ENSBlogPosts
