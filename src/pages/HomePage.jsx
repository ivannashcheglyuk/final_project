import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

import PostCard from '../components/PostCardTemp';
import "./HomePage.css";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('created_at');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchPosts();
  }, [sortBy]);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order(sortBy, { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setPosts(data);
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
   <div className="container mt-4">
  <h2>🐾 Pet Forum Posts</h2>

  <input
    className="form-control mb-3"
    type="text"
    placeholder="Search posts by title..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <select
    className="form-select mb-4"
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
  >
    <option value="created_at">Newest First</option>
    <option value="upvotes">Top Voted</option>
  </select>

  {filteredPosts.length > 0 ? (
    <div className="row g-4">
      {filteredPosts.map((post) => (
        <div key={post.id} className="col-12 col-sm-6 col-md-4">
          <PostCard post={post} />
        </div>
      ))}
    </div>
  ) : (
    <p>No posts found.</p>
  )}
</div>
  );
}




export default HomePage;

