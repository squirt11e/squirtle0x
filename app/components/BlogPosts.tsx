/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import { Alchemy, Network } from 'alchemy-sdk';
import { useAccount } from 'wagmi';
import { type } from 'os';

type AddressNFTsProps = {
  address: string | undefined;
};
const AddressNFTs = ({ address }: AddressNFTsProps) => {
  if (!address) {
    return Promise.resolve([]); // return an empty array if there's no address
  }
  const config = {
    apiKey: process.env.ALCHEMY_KEY_OP,
    network: Network.OPT_MAINNET,
  };

  const alchemy = new Alchemy(config);

  const nfts = alchemy.nft
    .getNftsForOwner(address)
    .then(response => {
      const nfts = response;

      return nfts;
    })
    .catch(error => {
      console.error(error);
    });

  return nfts;
};

const BlogPosts = () => {
  const tempPosts = ['Post 1', 'Post 2', 'Post 3', 'Post 4'];
  const ensPosts = ['Post 1', 'Post 2', 'Post 3', 'Post 4'];
  const { address } = useAccount();
  const userAddress = address;

  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    const getAddressNFTs = async (address: string) => {
      return AddressNFTs({ address });
    };

    if (userAddress) {
      getAddressNFTs(userAddress)
        .then(data => {
          const owned = data.ownedNfts;
          setNfts(owned);
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      console.log('No user address provided');
    }
  }, [userAddress]);

  const filteredNfts = nfts.filter(nft => nft.description.includes('mirror.xyz'));

  console.log(filteredNfts);

  return (
    <section className="mb-8 flex flex-col">
      <h3 className="mb-4 text-xl font-semibold text-lightBlue">ENS Topics</h3>

      <div className="flex flex-row flex-wrap gap-4">
        {tempPosts.map(post => (
          <div key={post} className="flex flex-col">
            <div className="w-24 h-24 bg-teal rounded-lg"></div>
          </div>
        ))}
      </div>

      <h3 className="mt-8 mb-4 text-xl font-semibold text-lightBlue">Owned Mirror Articles</h3>

      <div className="flex flex-row flex-wrap gap-4">
        {filteredNfts.length === 0 && (
          <div className="flex flex-col">
            <p className="text-lightBlue">No Mirror Articles Found</p>
          </div>
        )}
        {filteredNfts.map(nft => (
          <div key={nft.title} className="flex flex-col">
            <a href={nft.description} target="_blank" rel="noreferrer">
              <img
                src={nft.media[0].gateway}
                className="border-solid border-2 border-teal rounded-lg"
                width={200}
                height={200}
                alt={`${nft.title} NFT`}
              />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default dynamic(() => Promise.resolve(BlogPosts), { ssr: false });
