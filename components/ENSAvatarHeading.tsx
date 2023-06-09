'use client'
import Link from 'next/link'
import Image from 'next/image'
import { MIRROR_AVATAR_URL, OWNER_MIRROR_URL } from '@/config/constants'

type ENSAvatarProps = {
  ENSName?: string
  ENSAvatar?: string
  isConnected?: boolean
}

const ENSAvatarHeading = ({ ENSName, ENSAvatar, isConnected }: ENSAvatarProps) => {
  return (
    <div className="flex flex-col relative">
      {ENSAvatar ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={ENSAvatar}
          className="border-solid border-[1px] border-teal rounded-lg"
          width={300}
          height={300}
          alt={`${ENSName}'s avatar`}
        />
      ) : isConnected ? (
        <div className="w-[300px] h-[300px] ">
          <Link href={MIRROR_AVATAR_URL}>
            <div className="w-full h-full border-solid border-2 border-light rounded-lg text-lightBlue font-semibold hover:text-teal font-semibold transition-colors underline underline-offset-8 flex justify-center items-center">
              Setup ENS Avatar
            </div>
          </Link>
        </div>
      ) : (
        <Image
          src="/images/toad.png"
          className="border-solid border-2 border-teal rounded-lg"
          width={300}
          height={300}
          alt={'CrypToadz #1811'}
          priority
        />
      )}
    </div>
  )
}

export default ENSAvatarHeading
