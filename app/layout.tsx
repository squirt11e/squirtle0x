import type { Metadata } from 'next'
import { Providers } from './providers'
import { Quicksand } from 'next/font/google'

export const metadata: Metadata = {
  title: 'Squirtle0x',
  description: 'Squirtle0x on-chain identity & content',
}

const quicksand = Quicksand({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={quicksand.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
