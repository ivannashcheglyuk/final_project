import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

import './CommentSection.css';

function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: false });

    if (!error) {
      setComments(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    const { error } = await supabase.from('comments').insert([
      {
        post_id: postId,
        content: newComment,
      }
    ]);

    if (!error) {
  setNewComment('');
  fetchComments();
} else {
  console.error('Insert error:', error);
  alert('Failed to post comment. Check the console.');
}

  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5 className="card-title">Comments</h5>

        <form onSubmit={handleSubmit} className="mb-3">
          <div className="mb-2">
            <textarea
              className="form-control"
              rows="2"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
          </div>
          <button className="btn btn-primary" type="submit">Post Comment</button>
        </form>

        {comments.length === 0 && <p className="text-muted">No comments yet.</p>}
        <ul className="list-group">
          {comments.map((c) => (
            <li key={c.id} className="list-group-item">
              <p className="mb-1">{c.content}</p>
              <small className="text-muted">{new Date(c.created_at).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CommentSection;

