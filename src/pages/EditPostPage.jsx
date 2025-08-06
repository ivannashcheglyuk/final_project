/*'./EditPostPage.css';

function EditPostPage() {
  return (
    <main className="edit-post-page">
      <section className="form-wrapper">
        <h2 className="form-title">Edit Post</h2>
        
      </section>
    </main>
  );
}

export default EditPostPage; */

import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import './EditPostPage.css';

function EditPostPage() {
  const { id } = useParams(); // uuid from /edit/:id
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetchPost();
    // eslint-disable-next-line
  }, [id]);

  async function fetchPost() {
    const { data, error } = await supabase
      .from('posts')
      .select('title, content')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Fetch post error:', error);
      setNotFound(true);
    } else if (!data) {
      setNotFound(true);
    } else {
      setTitle(data.title || '');
      setContent(data.content || '');
    }
    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { error } = await supabase
      .from('posts')
      .update({ title, content })
      .eq('id', id);

    if (error) {
      console.error('Update error:', error);
      alert('Failed to save changes.');
    } else {
      navigate(`/post/${id}`);
    }
  }

  if (loading) return <p className="text-center mt-4">Loading post...</p>;
  if (notFound) return <p className="text-center mt-4">Post not found.</p>;

  return (
    <main className="edit-post-page">
      <section className="form-wrapper">
        <h2 className="form-title">Edit Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title:</label>
            <input
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Post title"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Content:</label>
            <textarea
              className="form-control"
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              placeholder="Post content"
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </form>
      </section>
    </main>
  );
}

export default EditPostPage;


