import Head from 'next/head';

import Header from '@/app/modules/Header';
import BlogPosts from '@/app/modules/BlogPosts';
import Footer from '@/app/modules/Footer';
import ConnectOutline from '@/app/modules/ConnectOutline';

const Profile = () => {
  return (
    <>
      <Head>
        <title>Squirtle0x</title>
        <meta name="description" content="Squirtle0x on-chain identity & content" />
      </Head>

      <div className="flex min-h-screen flex-col p-4 md:py-8 md:px-12 max-w-screen-xl mr-auto ml-auto">
        <Header />

        <main className="mb-12 md:mb-24 flex flex-col gap-24 md:gap-48">
          <BlogPosts />
          <ConnectOutline />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Profile;
