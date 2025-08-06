
import { useState } from 'react';
import './PostForm.css';

function PostForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // ⬅️ New state

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit({ title, content, image_url: imageUrl }); // ⬅️ Include image_url
      setTitle('');
      setContent('');
      setImageUrl('');
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h3 className="form-title">🐾 Share a New Cat Story</h3>

      <input
        className="form-input"
        type="text"
        placeholder="Enter a title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="form-textarea"
        placeholder="Write your post..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* ✅ Image URL input */}
      <input
        className="form-input"
        type="text"
        placeholder="Paste an image URL (optional)"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      {/* ✅ Image preview */}
      {imageUrl && (
        <div className="image-preview">
          <img src={imageUrl} alt="Preview" className="img-fluid" />
        </div>
      )}

      <button className="form-button" type="submit">Post</button>
    </form>
  );
}

export default PostForm;



