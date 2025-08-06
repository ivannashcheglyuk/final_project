import { Link } from 'react-router-dom';
import './PostCard.css';

function PostCard({ post }) {
  return (
    <div className="card mb-3 post-card">
      <div className="card-body">
        <h5 className="card-title">
          <Link to={`/post/${post.id}`} className="post-title-link">
            {post.title}
          </Link>
        </h5>
        <p className="card-text text-muted">
          🗓️ {new Date(post.created_at).toLocaleString()} | 👍 {post.upvotes} votes
        </p>
      </div>
    </div>
  );
}



export default PostCard;


