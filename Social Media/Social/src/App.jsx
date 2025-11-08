import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CreatePostModal from './components/CreatePostModal';
import Feed from './components/Feed';
import Footer from './components/Footer';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';

function MainApp() {
  const [postModalVisible, setPostModalVisible] = useState(false);
  const [postList, setPostList] = useState([]);

  const openPostModal = () => {
    setPostModalVisible(true);
  };

  const closePostModal = () => {
    setPostModalVisible(false);
  };

  const addNewPost = (post) => {
    setPostList((prevPosts) => [post, ...prevPosts]);
  };

  const HomePage = () => (
    <>
      <Feed posts={postList} />
      {postModalVisible && (
        <CreatePostModal 
          closeModal={closePostModal} 
          submitPost={addNewPost} 
        />
      )}
    </>
  );

  return (
    <Router>
      <div className="app-container">
        <Navbar onCreatePost={openPostModal} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default MainApp;
