import '../index.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import SocialPost from './SocialPost'

const Feed = ({ posts: userPosts = [] }) => {
    const [apiPosts, setApiPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true)
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: { _limit: 10 },
                    timeout: 10000,
                })

                const data = response.data

                const userNames = [
                    'Alice Walker',
                    'Mark Benson',
                    'Nina Patel',
                    'Liam Robertson',
                    'Olivia Clark',
                    'Ethan Williams',
                    'Maya Lee',
                    'Noah Kim',
                    'Zara Thompson',
                    'Lucas Martin'
                ]

                const userAvatars = [22, 35, 41, 56, 61, 73, 79, 81, 90, 100]

                const postImages = [
                    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?w=800&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1533681704430-6534a1a5e8ad?w=800&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=800&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=800&h=400&fit=crop'
                ]

                const transformedPosts = data.map((post, index) => ({
                    id: post.id,
                    userName: userNames[index],
                    userAvatar: `https://i.pravatar.cc/150?img=${userAvatars[index]}`,
                    content: `${post.title}\n\n${post.body}`,
                    imageUrl: postImages[index],
                    timestamp: index === 0 ? 'Now' : `${Math.floor(Math.random() * 23) + 1}h ago`,
                    likes: Math.floor(Math.random() * 50),
                    comments: 0,
                }))

                setApiPosts(transformedPosts)
                setError(null)
            } catch (err) {
                console.error('Error fetching posts:', err)
                setError('Failed to load posts. Please try again later.')
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()
    }, [])

    const allPosts = [...userPosts, ...apiPosts]

    if (loading && allPosts.length === 0) {
        return <div style={styles.loading}>Loading feed…</div>
    }

    if (error && allPosts.length === 0) {
        return <div style={styles.error}>{error}</div>
    }

    return (
        <div className="feed-container" style={styles.feed}>
            {allPosts.map((post, index) => (
                <SocialPost key={post.id || index} post={post} />
            ))}
        </div>
    )
}

const styles = {
    feed: {
        maxWidth: '700px',
        margin: '40px auto',
        padding: '20px',
        minHeight: 'calc(100vh - 180px)',
        backgroundColor: '#e9f0fb', // soft light blue background
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(100, 115, 140, 0.1)',
    },
    loading: {
        textAlign: 'center',
        padding: '50px',
        fontSize: '18px',
        color: '#3b82f6', // bright blue
        fontWeight: '600',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    error: {
        textAlign: 'center',
        padding: '50px',
        fontSize: '18px',
        color: '#ef4444', // error red
        fontWeight: '600',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
}

export default Feed
//   },