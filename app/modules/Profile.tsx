import BlogPosts from "../components/BlogPosts";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Profile() {
  return (
    <div className="flex min-h-screen flex-col p-4 md:py-8 md:px-12">
      <Header />

      <main>
        <BlogPosts />
      </main>

      <Footer />
    </div>
  );
}
