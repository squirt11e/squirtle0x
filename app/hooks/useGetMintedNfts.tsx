import { useEffect, useState } from 'react';
import { Alchemy, Network } from 'alchemy-sdk';

type useGetMintedNftsProps = {
  address: string | undefined;
};

type useFetchNftsProps = {
  userAddress: string | undefined;
  isConnected: boolean;
};

type NFT = {
  description: string;
  media: { thumbnail: string; gateway: string }[];
  title: string;
};

const config = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_OP_KEY,
  network: Network.OPT_MAINNET,
};

const alchemy = new Alchemy(config);

const GetMintedNfts = async ({ address }: useGetMintedNftsProps) => {
  if (!address) {
    return [];
  }

  try {
    const mintedNfts = await alchemy.nft.getMintedNfts(address);
    return mintedNfts || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const useFetchMintedNfts = ({ userAddress, isConnected }: useFetchNftsProps) => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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
          const data = await GetMintedNfts({ address: userAddress });

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

  return { nfts, isLoading };
};
