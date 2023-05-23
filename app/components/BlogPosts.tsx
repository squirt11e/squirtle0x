/* eslint-disable @next/next/no-img-element */
import { Suspense, useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import { Alchemy, Network } from 'alchemy-sdk';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

type AddressNFTsProps = {
  address: string | undefined;
  isConnected: boolean;
};
const AddressNFTs = ({ address, isConnected }: AddressNFTsProps) => {
  if (!address || !isConnected) {
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

const BlogPosts = () => {
  const { address, isConnected } = useAccount();

  // Use default address if not connected
  const userAddress = isConnected ? address : '0x4644A9Afe25B01405B9099c32FBf123F919d4838';

  const [nfts, setNfts] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch NFTs on load and when userAddress changes and store in local storage
  useEffect(() => {
    const getAddressNFTs = async (address: string) => {
      return AddressNFTs({ address, isConnected });
    };

    const fetchNfts = async () => {
      if (userAddress) {
        let nftsData;

        // Check if data exists in local storage
        const storedNfts = sessionStorage.getItem(`nftsData-${userAddress}`);

        if (storedNfts) {
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
  const ownerArticles = [
    '0xa9d8f36c9bf4cf60f18f5afe694ef4fcdb4f4d91',
    '0xfba8d5c640c43c9db86f7e64f8044bc50fdba1f2',
    '0x5bdece46f3bae34a22ac7547f5d1454100c1a2a1',
    '0x8b6d7e60453cd7ec0f3632cb645070537ce4c154',
    '0xf59245e8f4e592bea0acdbb63f811856e3b0f156',
    '0xdf01eb9e6c35fbc3b7546f6340ce693bd30ce6e3',
  ];

  // Filter NFTs to only show Mirror articles
  const filteredNfts = isConnected
    ? nfts
      ? nfts.filter(nft => nft.description.includes('mirror.xyz'))
      : []
    : nfts.filter(nft => ownerArticles.some(article => nft.description.includes(article)));

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
            href="https://mirror.xyz/squirt11e.eth"
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
  );
};

export default dynamic(() => Promise.resolve(BlogPosts), { ssr: false });
