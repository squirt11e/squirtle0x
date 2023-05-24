/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import { Alchemy, Network } from 'alchemy-sdk';
import { useAccount, useEnsAvatar, useEnsName } from 'wagmi';
import Link from 'next/link';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BsFillCheckSquareFill } from 'react-icons/bs';

type AddressNFTsProps = {
  address: string | undefined;
};
const AddressNFTs = ({ address }: AddressNFTsProps) => {
  if (!address) {
    return Promise.resolve([]); // return an empty array if there's no address
  }
  const config = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_OP_KEY,
    network: Network.OPT_MAINNET,
  };

  const alchemy = new Alchemy(config);

  const nfts = alchemy.nft
    .getMintedNfts(address)
    .then(response => {
      return response || [];
    })
    .catch(error => {
      console.error(error);
      return [];
    });

  return nfts;
};

type NFT = {
  description: string;
  media: { thumbnail: string; gateway: string }[];
  title: string;
};

const ENSBlogPosts = () => {
  // Get account address and connection status
  const { address, isConnected } = useAccount();

  // Get ENS name
  const { data: ENSName } = useEnsName({
    address: address,
  });

  const { data: ENSAvatar } = useEnsAvatar({
    name: ENSName,
  });

  // Use default address if not connected
  const userAddress = '0x4644A9Afe25B01405B9099c32FBf123F919d4838';

  const [nfts, setNfts] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch NFTs on load and when userAddress changes and store in local storage
  useEffect(() => {
    const getAddressNFTs = async (address: string) => {
      return AddressNFTs({ address });
    };

    const fetchNfts = async () => {
      if (userAddress) {
        let nftsData;

        // Check if data exists in local storage
        const storedNfts = sessionStorage.getItem(`nftsData-${userAddress}`);

        if (storedNfts && storedNfts !== 'undefined') {
          // Use stored data
          nftsData = JSON.parse(storedNfts);
        } else {
          setIsLoading(true);
          // Fetch data and store it
          const data = await getAddressNFTs(userAddress);
          if (Array.isArray(data)) {
            // Handle the case where data is never[]
            nftsData = [];
            setIsLoading(false);
          } else {
            nftsData = data.nfts;
            sessionStorage.setItem(`nftsData-${userAddress}`, JSON.stringify(nftsData));
            setIsLoading(false);
          }
        }

        setNfts(nftsData);
        setIsLoading(false);
      } else {
        console.log('No user address provided');
      }
    };

    fetchNfts();
  }, [userAddress, isConnected]);

  // Sqourtl0x articles
  const ownerArticles = ['0xdf01eb9e6c35fbc3b7546f6340ce693bd30ce6e3', '0x9ae9caa387f2ff8c12a9a2000e99fbb0443a485c'];

  // Filter NFTs to only show Mirror articles
  const filteredNfts = nfts.filter(nft => ownerArticles.some((article: string) => nft.description.includes(article)));

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
            const isFirstItemComplete = index === 0 && ENSAvatar;
            const isSecondItemComplete = index === 1 && ENSName;

            let classNames = '';

            if (isFirstItemComplete) {
              classNames = ' opacity-40';
            }

            if (isSecondItemComplete) {
              classNames = ' opacity-40';
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
            );
          })}
        </div>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(ENSBlogPosts), { ssr: false });
