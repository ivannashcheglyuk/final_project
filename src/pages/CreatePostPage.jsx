import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import '../components/PostForm.css'; // your existing CSS for PostForm
import './CreatePostPage.css'; // new CSS file we'll create

import PostForm from '../components/PostForm.jsx'; 

function CreatePostPage() {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    const { error } = await supabase.from('posts').insert({
      ...data,
      upvotes: 0,
    });

    if (error) {
      alert('Error creating post');
      console.error(error);
    } else {
      navigate('/');
    }
  };

  return (
    <main className="create-post-page">
      <section className="form-wrapper">
        <h2 className="form-title">Create a New Post</h2>
        <PostForm onSubmit={handleCreate} />
      </section>
    </main>
  );
}

export default CreatePostPage;

