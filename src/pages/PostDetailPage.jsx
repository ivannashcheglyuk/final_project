import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import "./PostDetail.css";

import CommentSection from '../components/CommentSection';

function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    const { data, error } = await supabase.from('posts').select('*').eq('id', id).single();
    if (error) console.error('Error fetching post:', error);
    else setPost(data);
  };

  const handleUpvote = async () => {
    const { error } = await supabase
      .from('posts')
      .update({ upvotes: post.upvotes + 1 })
      .eq('id', id);
    if (!error) fetchPost();
  };

  const handleDelete = async () => {
    if (confirm('Delete this post?')) {
      await supabase.from('posts').delete().eq('id', id);
      navigate('/');
    }
  };

  if (!post) return <p className="loading-msg">Loading...</p>;

  return (
    <div className="container mt-4 post-detail-page">
      <h2 className="post-title">{post.title}</h2>
      <p className="text-muted post-meta">
        🗓️ {new Date(post.created_at).toLocaleString()} | 👍 {post.upvotes} votes
      </p>

      {post.image_url && (
        <img
          src={post.image_url}
          alt="Pet"
          className="img-fluid rounded mb-3 post-image"
        />
      )}

      <p className="post-content">{post.content}</p>

      <div className="d-flex gap-2 mt-3 post-actions">
        <button className="btn btn-outline-success" onClick={handleUpvote}>
          👍 Upvote
        </button>
        <Link className="btn btn-outline-secondary" to={`/edit/${post.id}`}>
          ✏️ Edit
        </Link>
        <button className="btn btn-outline-danger" onClick={handleDelete}>
          🗑️ Delete
        </button>
      </div>

      <CommentSection postId={post.id} />
    </div>
  );
}

export default PostDetailPage;

