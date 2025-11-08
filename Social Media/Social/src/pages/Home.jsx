import { Feed } from '../components/Feed'
import { CreatePostModal } from '../components/CreatePostModal'
import { useState } from 'react'

export function Home() {
  const [isCreatePostOpen, setCreatePostOpen] = useState(false)

  return (
    <div className="home-container">
      <button 
        className="create-post-btn"
        onClick={() => setCreatePostOpen(true)}
      >
        Create Post
      </button>
      <Feed />
      <CreatePostModal 
        open={isCreatePostOpen}
        onClose={() => setCreatePostOpen(false)}
      />
    </div>
  )
}