const BlogPosts = () => {
  const tempPosts = ['Post 1', 'Post 2', 'Post 3', 'Post 4'];
  const ensPosts = ['Post 1', 'Post 2', 'Post 3', 'Post 4'];

  return (
    <section className="mb-8 flex flex-col">
      <h3 className="mb-4 text-xl font-semibold text-lightBlue">ENS Topics</h3>

      <div className="flex flex-row flex-wrap gap-4">
        {tempPosts.map(post => (
          <div key={post} className="flex flex-col">
            <h4 className="mb-2 text-xl font-semibold text-light">{post}</h4>
            <div className="w-24 h-24 bg-teal rounded-lg"></div>
          </div>
        ))}
      </div>

      <h3 className="mt-8 mb-4 text-xl font-semibold text-lightBlue">General Topics</h3>

      <div className="flex flex-row flex-wrap gap-4">
        {ensPosts.map(post => (
          <div key={post} className="flex flex-col">
            <h4 className="mb-2 text-xl font-semibold text-light">{post}</h4>
            <div className="w-24 h-24 bg-teal rounded-lg"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogPosts;
