import '../index.css'
import { useState } from 'react'

const CommentDialog = ({ visible, closeDialog, postInfo, addCommentToPost }) => {
  const [commentText, setCommentText] = useState('')
  const [commentList, setCommentList] = useState([])
  const [hoverActive, setHoverActive] = useState(false)

  if (!visible) return null

  const submitComment = (event) => {
    event.preventDefault()

    if (!commentText.trim()) {
      alert('Please enter a comment')
      return
    }

    const newEntry = {
      id: Date.now(),
      userName: 'You',
      userAvatar: 'https://i.pravatar.cc/150?img=33',
      text: commentText,
      timestamp: 'Just now'
    }

    setCommentList([...commentList, newEntry])
    addCommentToPost(postInfo.id)
    setCommentText('')
  }

  return (
    <div style={style.overlay} onClick={closeDialog}>
      <div style={style.dialog} onClick={(e) => e.stopPropagation()}>
        <div style={style.header}>
          <h2 style={style.title}>Comments</h2>
          <button style={style.closeBtn} onClick={closeDialog}>✕</button>
        </div>

        {/* Post Preview */}
        <div style={style.postPreview}>
          <div style={style.postHeader}>
            <img
              src={postInfo.userAvatar}
              alt={postInfo.userName}
              style={style.avatarSmall}
            />
            <div>
              <div style={style.userName}>{postInfo.userName}</div>
              <div style={style.timeStamp}>{postInfo.timestamp}</div>
            </div>
          </div>
          <div style={style.postText}>{postInfo.content}</div>
        </div>

        {/* Comments */}
        <div style={style.commentSection}>
          {commentList.length === 0 ? (
            <div style={style.noCommentsMsg}>No comments yet. Be the first to comment!</div>
          ) : (
            commentList.map((item) => (
              <div key={item.id} style={style.commentItem}>
                <img
                  src={item.userAvatar}
                  alt={item.userName}
                  style={style.commentAvatar}
                />
                <div style={style.commentBody}>
                  <div style={style.commentHeader}>
                    <span style={style.commentUser}>{item.userName}</span>
                    <span style={style.commentTime}>{item.timestamp}</span>
                  </div>
                  <div style={style.commentText}>{item.text}</div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Comment Form */}
        <form onSubmit={submitComment} style={style.commentForm}>
          <div style={style.inputContainer}>
            <input
              type="text"
              style={style.inputBox}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add your comment here..."
            />
            <button
              type="submit"
              style={{
                ...style.submitBtn,
                ...(hoverActive ? style.submitBtnHover : {})
              }}
              onMouseEnter={() => setHoverActive(true)}
              onMouseLeave={() => setHoverActive(false)}
            >
              <span style={style.sendArrow}>➤</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const style = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  dialog: {
    background: '#fff',
    borderRadius: '16px',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    borderBottom: '1px solid #e5e7eb'
  },
  title: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: 0
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#666',
    padding: '4px 8px',
    lineHeight: 1
  },
  postPreview: {
    padding: '16px 24px',
    borderBottom: '1px solid #e5e7eb',
    background: '#f9fafb'
  },
  postHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '8px'
  },
  avatarSmall: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    objectFit: 'cover'
  },
  userName: {
    fontWeight: '600',
    fontSize: '14px',
    color: '#1a1a1a'
  },
  timeStamp: {
    fontSize: '12px',
    color: '#999'
  },
  postText: {
    fontSize: '13px',
    color: '#555',
    lineHeight: '1.5'
  },
  commentSection: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px 24px',
    minHeight: '200px',
    maxHeight: '400px'
  },
  noCommentsMsg: {
    textAlign: 'center',
    color: '#999',
    fontSize: '14px',
    padding: '40px 20px'
  },
  commentItem: {
    display: 'flex',
    gap: '12px',
    marginBottom: '16px'
  },
  commentAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover',
    flexShrink: 0
  },
  commentBody: {
    flex: 1,
    background: '#f3f4f6',
    borderRadius: '12px',
    padding: '10px 14px'
  },
  commentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '4px'
  },
  commentUser: {
    fontWeight: '600',
    fontSize: '14px',
    color: '#1a1a1a'
  },
  commentTime: {
    fontSize: '11px',
    color: '#999'
  },
  commentText: {
    fontSize: '14px',
    color: '#374151',
    lineHeight: '1.5'
  },
  commentForm: {
    display: 'flex',
    gap: '10px',
    padding: '16px 24px',
    borderTop: '1px solid #e5e7eb',
    background: '#fff'
  },
  inputBox: {
    flex: 1,
    padding: '12px 16px',
    border: 'none',
    outline: 'none',
    fontSize: '14px',
    color: '#333',
    borderRadius: '30px',
    background: 'transparent'
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    border: '1px solid transparent',
    borderRadius: '30px',
    background:
      'linear-gradient(white, white) padding-box, linear-gradient(135deg, #d087ff, #8b5cf6, #ec4899, #fbbf24) border-box',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    overflow: 'hidden'
  },
  submitBtn: {
    border: 'none',
    background:
      'linear-gradient(135deg, #fdf3c1 0%, #fca5f1 30%, #a78bfa 60%, #4f46e5 100%)',
    borderRadius: '0 30px 30px 0',
    padding: '10px 18px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
  },
  submitBtnHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
  },
  sendArrow: {
    color: 'white',
    fontSize: '18px',
    transform: 'rotate(330deg)'
  }
}

export default CommentDialog
