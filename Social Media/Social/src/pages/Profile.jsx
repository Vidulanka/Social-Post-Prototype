import { useState, useEffect } from 'react'
import SocialPost from '../components/SocialPost'

export function Profile() {
  const [userPosts, setUserPosts] = useState([])
  const [userInfo, setUserInfo] = useState({
    username: 'Pasindu Vidulanka',
    bio: 'Software Engineering Undergraduate | Full Stack Developer',
    joinDate: '2024',
    location: 'Sri Lanka',
    followers: 1234,
    following: 567,
    posts: 89,
    coverPhoto: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
    // Profile avatar changed to a male portrait per request
    avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
  })
  const [isEditing, setIsEditing] = useState(false)
  const [editedInfo, setEditedInfo] = useState(userInfo)

  useEffect(() => {
    // Simulated API call to fetch user posts
    const fetchPosts = async () => {
      // In a real app, this would be an API call
      const mockPosts = [
        {
          id: 1,
          content: 'Excited to share my latest project on React and Vite! 🚀 #WebDev #JavaScript',
          likes: 45,
          comments: 12,
          timestamp: '2 days ago',
          imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop'
        },
        {
          id: 2,
          content: 'Beautiful sunset at Galle Face! 🌅 #SriLanka #Evening',
          likes: 89,
          comments: 15,
          timestamp: '5 days ago',
          imageUrl: 'https://images.unsplash.com/photo-1502957291543-d85480254bf8?w=800&h=400&fit=crop'
        }
      ]
      setUserPosts(mockPosts)
    }
    fetchPosts()
  }, [])

  const handleEditProfile = () => {
    if (isEditing) {
      // Save changes
      setUserInfo(editedInfo)
    }
    setIsEditing(!isEditing)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedInfo(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="profile-container" style={styles.container}>
      {/* Cover Photo */}
      <div style={styles.coverPhoto}>
        <img src={userInfo.coverPhoto} alt="Cover" style={styles.coverImage} />
      </div>

      {/* Profile Info */}
      <div style={styles.profileInfo}>
        <div style={styles.avatarContainer}>
          <img src={userInfo.avatar} alt={userInfo.username} style={styles.avatar} />
        </div>

        <div style={styles.userDetails}>
          {isEditing ? (
            <input
              type="text"
              name="username"
              value={editedInfo.username}
              onChange={handleChange}
              style={styles.editInput}
            />
          ) : (
            <h1 style={styles.username}>{userInfo.username}</h1>
          )}

          {isEditing ? (
            <textarea
              name="bio"
              value={editedInfo.bio}
              onChange={handleChange}
              style={styles.editBio}
              rows="3"
            />
          ) : (
            <p style={styles.bio}>{userInfo.bio}</p>
          )}

          <div style={styles.stats}>
            <div style={styles.stat}>
              <span style={styles.statNumber}>{userInfo.posts}</span>
              <span style={styles.statLabel}>Posts</span>
            </div>
            <div style={styles.stat}>
              <span style={styles.statNumber}>{userInfo.followers}</span>
              <span style={styles.statLabel}>Followers</span>
            </div>
            <div style={styles.stat}>
              <span style={styles.statNumber}>{userInfo.following}</span>
              <span style={styles.statLabel}>Following</span>
            </div>
          </div>

          <button 
            onClick={handleEditProfile}
            style={styles.editButton}
          >
            {isEditing ? 'Save Profile' : 'Edit Profile'}
          </button>
        </div>
      </div>

      {/* Posts Section */}
      <div style={styles.postsSection}>
        <h2 style={styles.postsTitle}>Posts</h2>
        <div style={styles.posts}>
          {userPosts.map(post => (
            <SocialPost key={post.id} post={{...post, userName: userInfo.username, userAvatar: userInfo.avatar}} />
          ))}
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    background: '#ffffff',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  coverPhoto: {
    width: '100%',
    height: '300px',
    position: 'relative',
    overflow: 'hidden',
  },
  coverImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  profileInfo: {
    padding: '0 32px',
    marginTop: '-60px',
    position: 'relative',
    display: 'flex',
    gap: '32px',
  },
  avatarContainer: {
    flexShrink: 0,
  },
  avatar: {
    width: '120px',
    height: '120px',
    borderRadius: '60px',
    border: '4px solid white',
    objectFit: 'cover',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
  userDetails: {
    flex: 1,
    paddingTop: '70px',
  },
  username: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '8px',
  },
  bio: {
    fontSize: '16px',
    color: '#4b5563',
    marginBottom: '24px',
    lineHeight: '1.5',
  },
  stats: {
    display: 'flex',
    gap: '32px',
    marginBottom: '24px',
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  statNumber: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1a1a1a',
  },
  statLabel: {
    fontSize: '14px',
    color: '#6b7280',
  },
  editButton: {
    padding: '10px 24px',
    background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  postsSection: {
    padding: '32px',
  },
  postsTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '24px',
  },
  posts: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  editInput: {
    width: '100%',
    padding: '8px 12px',
    fontSize: '24px',
    fontWeight: '700',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    marginBottom: '8px',
  },
  editBio: {
    width: '100%',
    padding: '8px 12px',
    fontSize: '16px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    marginBottom: '24px',
    fontFamily: 'inherit',
    resize: 'vertical',
  },
}