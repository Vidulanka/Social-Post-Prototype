import Logo from '../assets/Logo.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Navbar = ({ onCreatePost }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="navbar" style={styles.nav}>
      <style>{styles.cssRules}</style>

      <div className="navbar-left" style={styles.left}>
        <div style={{ ...styles.logo, overflow: 'hidden' }}>
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

      {/* ✅ Hamburger Menu for Mobile */}
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
        style={styles.hamburgerButton}
      >
        ☰
      </button>

      {/* ✅ Navigation Links */}
      <div
        className={`nav-links ${menuOpen ? 'open' : ''}`}
        style={styles.navLinks}
      >
        <Link to="/" className="nav-link" style={styles.navLink} onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        <Link to="/profile" className="nav-link" style={styles.navLink} onClick={() => setMenuOpen(false)}>
          Profile
        </Link>
        <Link to="/login" className="nav-link" style={styles.navLink} onClick={() => setMenuOpen(false)}>
          Login
        </Link>
        <button
          type="button"
          className="createPostBtn"
          style={styles.button}
          onClick={() => {
            onCreatePost();
            setMenuOpen(false);
          }}
        >
          Create Post
        </button>
      </div>
    </header>
  );
};

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 20px',
    backgroundColor: '#1e293b',
    position: 'sticky',
    top: 0,
    zIndex: 50,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
    flexWrap: 'wrap',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 12,
    boxShadow: '0 4px 10px rgba(139, 92, 246, 0.6)',
  },
  branding: {
    display: 'flex',
    flexDirection: 'column',
    color: '#f1f5f9',
    userSelect: 'none',
  },
  title: {
    margin: 0,
    fontSize: 18,
    fontWeight: 700,
  },
  subtitle: {
    margin: 0,
    fontSize: 11,
    opacity: 0.7,
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  navLink: {
    color: '#f1f5f9',
    textDecoration: 'none',
    fontSize: 15,
    fontWeight: 500,
  },
  button: {
    background: 'linear-gradient(135deg, #8b5cf6, #ec4899, #fbbf24)',
    color: '#fff',
    border: 'none',
    borderRadius: 10,
    padding: '10px 22px',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: 14,
    transition: 'all 0.3s ease',
    boxShadow: '0 6px 20px rgba(251, 191, 36, 0.5)',
  },
  hamburgerButton: {
    display: 'none',
    fontSize: 26,
    background: 'none',
    border: 'none',
    color: '#f1f5f9',
    cursor: 'pointer',
  },
  cssRules: `
      /* Hover animation for nav links */
      .nav-link:hover {
        color: #fbbf24;
        transition: color 0.2s ease;
      }

      /* Hover animation for button */
      .createPostBtn:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 25px rgba(251, 191, 36, 0.7);
      }

      /* Active state */
      .createPostBtn:active {
        transform: translateY(0);
        box-shadow: 0 6px 15px rgba(251, 191, 36, 0.4);
      }

      /* ✅ Mobile Styles */
      @media (max-width: 768px) {
        .menu-toggle {
          display: block !important;
        }

        .nav-links {
          display: none !important;
          flex-direction: column;
          align-items: center;
          width: 100%;
          margin-top: 12px;
          padding: 12px 0;
          background-color: #0f172a;
          border-radius: 10px;
        }

        .nav-links.open {
          display: flex !important;
        }

        .nav-link, .createPostBtn {
          width: 90%;
          text-align: center;
          font-size: 16px;
          padding: 10px;
        }
      }
  `,
};

export default Navbar;