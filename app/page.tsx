import Image from "next/image";
import BlogPosts from "./components/BlogPosts";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col py-8 px-12">
      <header className="mb-16">
        <h2 className='mb-6 text-2xl font-semibold text-green'>Squirtle0x <span className="text-sm font-light">Frontend Dev</span></h2>
        <Image src="/images/toad.png" className="border-solid border-2 border-purple rounded-lg" width={200} height={200} alt={"CrypToadz #1811"} priority />
      </header>

      <section className="mb-8">
        <BlogPosts />
      </section>
      
      <Footer />
    </main>
  );
}
