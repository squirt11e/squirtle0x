import Link from 'next/link'

type ENSNameProps = {
  ENSName?: string
  isConnected?: boolean
  address?: string
}

const ENSNameHeading = ({ ENSName, isConnected, address }: ENSNameProps) => {
  const getStringWithEllipsis = (str: string) => {
    const firstSixChars = str.substring(0, 4)
    const lastFourChars = str.substring(str.length - 4)
    return `${firstSixChars}...${lastFourChars}`
  }

  return (
    <>
      <h2 className="text-4xl font-semibold text-light flex flex-wrap items-baseline">
        {ENSName ? (
          <>
            Welcome&nbsp;<div className="text-lightBlue">{ENSName}</div>
          </>
        ) : isConnected ? (
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap">
              Welcome&nbsp;<div className="text-lightBlue">{getStringWithEllipsis(address || '0x1337')}</div>
            </div>
            <Link
              href="https://mirror.xyz/squirt11e.eth/V-fs2p6lOc_u9LlNK3ZHVOFUQAi05nLHuOBEZnYLgB4"
              className="text-lightBlue text-base hover:text-teal font-semibold transition-colors underline underline-offset-8"
            >
              Setup ENS Name
            </Link>
          </div>
        ) : (
          <>
            Squirtle0x&nbsp;<span className="text-base text-lightBlue">Frontend Dev</span>
          </>
        )}
      </h2>
    </>
  )
}

export default ENSNameHeading
