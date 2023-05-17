import Head from 'next/head';
import BlogPosts from '../../app/components/BlogPosts';
import Footer from '../../app/components/Footer';
import Header from '../../app/components/Header';

const Profile = () => {
  return (
    <>
      <Head>
        <title>Squirtle0x</title>
        <meta name="description" content="Squirtle0x landing page" />
      </Head>

      <div className="flex min-h-screen flex-col p-4 md:py-8 md:px-12">
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
