import Logo from '../assets/Logo.jpg'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({ onCreatePost }) => {
    const navigate = useNavigate();
    return (
        <header className="navbar" style={styles.nav}>
            <style>{styles.cssRules}</style>

            <div className="navbar-left" style={styles.left}>
                <div style={{ ...styles.logo, overflow: 'hidden', background: 'transparent' }}>
                    <img
                        src={Logo}
                        alt="App logo"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        loading="eager"
                        decoding="async"
                    />
                </div>
                <div style={styles.branding}>
                    <h1 style={styles.title}>Social Post Prototype</h1>
                    <p style={styles.subtitle}>Empowering conversations everywhere</p>
                </div>
            </div>

            <div className="nav-links" style={styles.navLinks}>
                <Link to="/" className="nav-link" style={styles.navLink}>Home</Link>
                <Link to="/profile" className="nav-link" style={styles.navLink}>Profile</Link>
                <Link to="/login" className="nav-link" style={styles.navLink}>Login</Link>
                <button
                    type="button"
                    className="createPostBtn"
                    style={styles.button}
                    onClick={() => onCreatePost()}
                    aria-label="Create a new post"
                >
                    Create Post
                </button>
            </div>
        </header>
    )
}

const styles = {
    nav: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 32px',
        backgroundColor: '#1e293b', // dark slate blue background
        position: 'sticky',
        top: 0,
        zIndex: 20,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
    },
    left: {
        display: 'flex',
        alignItems: 'center',
        gap: 16,
    },
    logo: {
        width: 56,
        height: 56,
        borderRadius: 14,
        boxShadow: '0 4px 10px rgba(139, 92, 246, 0.6)', // subtle purple glow
    },
    branding: {
        display: 'flex',
        flexDirection: 'column',
        color: '#f1f5f9', // light gray text
        userSelect: 'none',
    },
    title: {
        margin: 0,
        fontSize: '22px',
        fontWeight: '700',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    subtitle: {
        margin: 0,
        fontSize: '12px',
        opacity: 0.7,
        fontWeight: '400',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    button: {
        background: 'linear-gradient(135deg, #8b5cf6, #ec4899, #fbbf24)', // purple-pink-yellow gradient
        color: '#fff',
        border: 'none',
        borderRadius: 12,
        padding: '14px 28px',
        fontWeight: 600,
        cursor: 'pointer',
        fontSize: '15px',
        transition: 'all 0.3s ease',
        boxShadow: '0 6px 20px rgba(251, 191, 36, 0.5)',
        userSelect: 'none',
    },
    navLinks: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
    },
    navLink: {
        color: '#f1f5f9',
        textDecoration: 'none',
        fontSize: '16px',
        fontWeight: '500',
        transition: 'color 0.3s ease',
        ':hover': {
            color: '#8b5cf6',
        }
    },
    cssRules: `
        .createPostBtn:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 30px rgba(251, 191, 36, 0.7);
        }
        .createPostBtn:active {
            transform: translateY(0);
            box-shadow: 0 6px 15px rgba(251, 191, 36, 0.4);
        }
    `,
}

export default Navbar
