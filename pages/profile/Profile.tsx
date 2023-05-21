import Head from 'next/head';
import BlogPosts from '../../app/components/BlogPosts';
import Footer from '../../app/components/Footer';
import Header from '../../app/components/Header';

const Profile = () => {
  return (
    <>
      <Head>
        <title>Squirtle0x</title>
        <meta name="description" content="Squirtle0x Portfolio, Your Digital Reflection" />
      </Head>

      <div className="flex min-h-screen flex-col p-4 md:py-8 md:px-12 max-w-screen-xl mr-auto ml-auto">
        <Header />

        <main>
          <BlogPosts />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Profile;
