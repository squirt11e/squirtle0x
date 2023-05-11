export default function BlogPosts() {
  const tempPosts = ['Post 1', 'Post 2', 'Post 3', 'Post 4'];

  return (
    <div className="flex flex-col">
      <h3 className="mb-4 text-2xl font-semibold text-green">Mirror</h3>
      
      <div className="flex flex-row flex-wrap gap-4">
        {tempPosts.map((post) => (
          <div key={post} className="flex flex-col">
            <h4 className="mb-2 text-xl font-semibold text-green">{post}</h4>
            <div className="w-24 h-24 bg-purple rounded-lg"></div>
          </div>
        ))}
      </div>
    </div>
  )
}