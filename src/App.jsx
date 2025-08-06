import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePostPage from './pages/CreatePostPage';
import PostDetailPage from './pages/PostDetailPage';
import EditPostPage from './pages/EditPostPage';

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
        <Link className="navbar-brand" to="/">Pet Forum</Link>
        <div className="ms-auto">
          <Link className="btn btn-outline-primary me-2" to="/">Home</Link>
          <Link className="btn btn-primary" to="/create">New Post</Link>
        </div>
      </nav>

      <div className="container mt-4 App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePostPage />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
          <Route path="/edit/:id" element={<EditPostPage />} />
          <Route path="/edit/:postId" element={<EditPostPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
