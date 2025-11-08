import '../index.css'
import BeforeHeart from "../assets/heart-outline.svg";
import AfterHeart from "../assets/heart-filled.svg";
import CommentBtn from "../assets/comment-button.svg";
import ShareBtn from "../assets/share-button.svg";
import { useState } from 'react'
import ButtonModel from './ButtonModel'

const userAvatars = [
    // 0: M.K Bhagya Prasadini
    'https://i.pravatar.cc/150?img=21',
    // 1: W.P. Sachini Samudika (female)
    'https://randomuser.me/api/portraits/women/68.jpg',
    // 2: E. Pasindu Vidulanka (male)
    'https://randomuser.me/api/portraits/men/56.jpg',
    // 3: W.A. Dimosh Threenath
    'https://i.pravatar.cc/150?img=52',
    // 4: I.V.A. Samaranayake (female)
    'https://randomuser.me/api/portraits/women/45.jpg',
]

const userNames = [
  'M.K Bhagya Prasadini',
  'W.P. Sachini Samudika',
  'E. Pasindu Vidulanka',
  'W.A. Dimosh Threenath',
  'I.V.A. Samaranayake'
]

const SocialPost = ({ post }) => {
    const [likes, setLikes] = useState(post.likes)
    const [comments, setComments] = useState([])
    const [isLiked, setIsLiked] = useState(false)
    const [showComments, setShowComments] = useState(false)
    const [newComment, setNewComment] = useState('')

    const randomIndex = post.id % userNames.length
    const userName = userNames[randomIndex]
    const userAvatar = userAvatars[randomIndex]

    const handleLike = () => {
        if (isLiked) {
            setLikes(likes - 1)
            setIsLiked(false)
        } else {
            setLikes(likes + 1)
            setIsLiked(true)
        }
    }

    const handleCommentClick = () => {
        setShowComments(!showComments)
    }

    const handleAddComment = (e) => {
        e.preventDefault()
        
        if (!newComment.trim()) {
            return
        }

        const comment = {
            id: Date.now(),
            userName: 'You',
            userAvatar: 'https://i.pravatar.cc/150?img=55',
            text: newComment,
            timestamp: 'Just now'
        }

        setComments([...comments, comment])
        setNewComment('')
    }

    const handleShare = () => {
        alert('Post Shared Successfully!')
    }

    return (
        <div className="social-post" style={styles.postCard}>
            <div className="social-post-header" style={styles.header}>
                <img 
                    src={userAvatar} 
                    alt={userName}
                    style={styles.avatar}
                />
                <div className="user-info" style={styles.userInfo}>
                    <div className="user-name" style={styles.userName}>{userName}</div>
                    <div className="timestamp" style={styles.timestamp}>{post.timestamp}</div>
                </div>
            </div>

            <div style={styles.content}>
                {post.content}
            </div>

            {post.imageUrl && (
                <img 
                    className="post-image"
                    src={post.imageUrl} 
                    alt="Post content"
                    style={styles.postImage}
                />
            )}

            <div className="post-actions" style={styles.actions}>
                <ButtonModel 
                    icon={isLiked ? AfterHeart : BeforeHeart}
                    count={likes} 
                    onClick={handleLike}
                    isActive={isLiked}
                />

                <ButtonModel 
                    icon={CommentBtn} 
                    count={comments.length} 
                    onClick={handleCommentClick}
                    isActive={showComments}
                />

                <ButtonModel 
                    icon={ShareBtn}
                    onClick={handleShare}
                    isActive={false}
                />
            </div>

            {showComments && (
                <div className="comment-section" style={styles.commentSection}>
                    <div style={styles.commentsList}>
                        {comments.length === 0 ? (
                            <div style={styles.noComments}>No comments yet. Be the first to comment!</div>
                        ) : (
                            comments.map((comment) => (
                                <div key={comment.id} style={styles.commentItem}>
                                    <img 
                                        src={comment.userAvatar} 
                                        alt={comment.userName}
                                        style={styles.commentAvatar}
                                    />
                                    <div style={styles.commentContent}>
                                        <div style={styles.commentHeader}>
                                            <span style={styles.commentUserName}>{comment.userName}</span>
                                            <span style={styles.commentTimestamp}>{comment.timestamp}</span>
                                        </div>
                                        <div style={styles.commentText}>{comment.text}</div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <form onSubmit={handleAddComment} className="comment-form" style={styles.commentForm}>
                        <img 
                            src="https://i.pravatar.cc/150?img=55" 
                            alt="Your avatar"
                            style={styles.commentInputAvatar}
                        />
                        <input
                            type="text"
                            style={styles.commentInput}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add your comment here..."
                        />
                        <button type="submit" style={styles.sendButton}>
                            <span style={styles.sendIcon}>➤</span>
                        </button>
                    </form>
                </div>
            )}
        </div>
    )
}

const styles = {
    postCard: {
        background: '#fff8f4',  // Soft pastel peach background
        borderRadius: '14px',
        padding: '22px',
        marginBottom: '22px',
        boxShadow: '0 4px 12px rgba(251, 191, 36, 0.2)'  // light warm shadow
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '18px'
    },
    avatar: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        marginRight: '14px',
        objectFit: 'cover',
        border: '2px solid #fbbf24'  // gold border
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'column'
    },
    userName: {
        fontWeight: '700',
        fontSize: '17px',
        color: '#5b21b6',  // deep purple
        marginBottom: '3px'
    },
    timestamp: {
        fontSize: '14px',
        color: '#9ca3af'  // cool gray
    },
    content: {
        fontSize: '15px',
        color: '#374151', // dark gray blue
        lineHeight: '1.7',
        marginBottom: '18px',
        whiteSpace: 'pre-line'
    },
    postImage: {
        width: '100%',
        borderRadius: '12px',
        marginBottom: '18px',
        objectFit: 'cover',
        maxHeight: '420px',
        boxShadow: '0 8px 20px rgba(203, 213, 225, 0.4)', // subtle blue shadow
    },
    actions: {
        display: 'flex',
        gap: '26px',
        paddingTop: '12px',
        borderTop: '1px solid #e0e7ff' // soft blue divider
    },
    commentSection: {
        marginTop: '18px',
        paddingTop: '18px',
        borderTop: '1px solid #e0e7ff'
    },
    commentsList: {
        marginBottom: '18px',
        maxHeight: '320px',
        overflowY: 'auto'
    },
    noComments: {
        textAlign: 'center',
        color: '#9ca3af',
        fontSize: '14px',
        padding: '22px'
    },
    commentItem: {
        display: 'flex',
        gap: '12px',
        marginBottom: '14px'
    },
    commentAvatar: {
        width: '38px',
        height: '38px',
        borderRadius: '50%',
        objectFit: 'cover',
        flexShrink: 0,
        border: '2px solid #a78bfa' // soft purple border
    },
    commentContent: {
        flex: 1,
        background: '#eef2ff',  // light purple background
        borderRadius: '16px',
        padding: '10px 16px'
    },
    commentHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '6px'
    },
    commentUserName: {
        fontWeight: '700',
        fontSize: '14px',
        color: '#4338ca'  // vivid purple
    },
    commentTimestamp: {
        fontSize: '12px',
        color: '#9ca3af'
    },
    commentText: {
        fontSize: '14px',
        color: '#4b5563', // medium gray blue
        lineHeight: '1.6'
    },
    commentForm: {
        display: 'flex',
        gap: '14px',
        alignItems: 'center'
    },
    commentInputAvatar: {
        width: '34px',
        height: '34px',
        borderRadius: '50%',
        objectFit: 'cover',
        flexShrink: 0,
        border: '2px solid #fbbf24' // gold border for input avatar
    },
    commentInput: {
        flex: 1,
        padding: '12px 16px',
        border: '1.8px solid #a78bfa', // purple border
        borderRadius: '16px 0 0 16px',
        fontSize: '15px',
        outline: 'none',
        marginRight: '-14px'
    },
    sendButton: {
        border: 'none',
        background:
            'linear-gradient(135deg, #a78bfa 0%, #ec4899 70%)', // purple-pink gradient
        borderRadius: '0 16px 16px 0',
        padding: '10px 22px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    },
    sendButtonHover: {
        transform: 'scale(1.07)',
        boxShadow: '0 6px 18px rgba(236, 72, 153, 0.6)',
    },
    sendIcon: {
        color: 'white',
        fontSize: '20px',
        transform: 'rotate(330deg)',
    }
}

export default SocialPost
