import { useState } from 'react'

const PostActionButton = ({ icon, count, onClick, isActive }) => {
  const [isHovered, setIsHovered] = useState(false)

  // Detect if the icon is an image file (png, jpg, jpeg, gif, svg)
  const isImage =
    typeof icon === 'string' && icon.match(/\.(png|jpg|jpeg|gif|svg)$/i)

  // Injected CSS (supports responsiveness)
  const CSS_RULES = `
    .post-action-button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 8px 14px;
      border-radius: 20px;
      border: none;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      user-select: none;
      background: transparent;
    }

    /* Hover effect (desktop) */
    .post-action-button:hover {
      transform: scale(1.05);
      background-color: #f3f4f6;
    }

    /* Active/Clicked State */
    .post-action-button.active {
      color: #ef4444;
      background-color: #fee2e2;
    }

    /* ===== Mobile responsiveness ===== */
    @media (max-width: 600px) {
      .post-action-button {
        width: 100%;
        padding: 6px 10px;
        font-size: 12px;
        border-radius: 10px;
        box-sizing: border-box;
      }

      .post-container {
        padding: 8px;
      }

      .post-title {
        font-size: 16px;
      }

      .post-content {
        font-size: 14px;
      }
    }

    @media (max-width: 400px) {
      .post-action-button {
        font-size: 11px;
        padding: 5px 8px;
      }
    }
  `

  return (
    <>
      {/* Inject CSS into DOM */}
      <style>{CSS_RULES}</style>

      <button
        className={`post-action-button ${isActive ? 'active' : ''}`}
        style={{
          color: isActive ? '#ef4444' : '#666',
          background: isActive
            ? '#fee2e2'
            : isHovered
            ? '#f3f4f6'
            : 'transparent',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        }}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Render image or emoji/icon */}
        {isImage ? (
          <img
            src={icon}
            alt="icon"
            style={{ width: 22, height: 22 }}
            onError={(e) => {
              e.target.onerror = null
              e.target.src =
                'https://placehold.co/22x22/e0e0e0/555?text=Icon'
            }}
          />
        ) : (
          <span style={styles.icon}>{icon}</span>
        )}

        {/* Optional count */}
        {count !== undefined && (
          <span
            style={{
              ...styles.count,
              color: isActive ? '#ef4444' : '#666',
            }}
          >
            {count}
          </span>
        )}
      </button>
    </>
  )
}

const styles = {
  icon: {
    fontSize: '18px',
    lineHeight: '1',
  },
  count: {
    fontSize: '14px',
    fontWeight: 500,
  },
}

export default PostActionButton
