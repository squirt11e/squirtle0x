import Header from '@/app/modules/Header'
import Footer from '@/app/modules/Footer'
import BlogPosts from '@/app/modules/BlogPosts'
import ConnectOutline from '@/app/modules/ConnectOutline'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col p-4 md:py-8 md:px-12 max-w-screen-xl mr-auto ml-auto">
      <Header />

      <main className="mb-12 md:mb-24 flex flex-col gap-24 md:gap-48">
        <BlogPosts />
        <ConnectOutline />
      </main>

      <Footer />
    </div>
  )
}
