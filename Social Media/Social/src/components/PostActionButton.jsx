import { useState } from 'react'

const PostActionButton = ({ icon, count, onClick, isActive }) => {
	const [isHovered, setIsHovered] = useState(false)
	// Detect if the icon is an image file (png, jpg, jpeg, gif, etc.)
	const isImage = typeof icon === 'string' && icon.match(/\.(png|jpg|jpeg|gif|svg)$/i)

    // CSS rules defined here to include the media query, which is not supported in React inline styles.
    const CSS_RULES = `
        .post-action-button {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 8px 12px;
            border-radius: 20px;
            border: none;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease-out;
            user-select: none;
        }

        /* Mobile responsiveness: This section caused the error in inline styles. */
        @media (max-width: 600px) {
            .post-action-button {
                padding: 6px 10px;
                font-size: 12px;
            }
        }
    `;

	return (
        <>
            {/* Inject the responsive CSS into the DOM */}
            <style>{CSS_RULES}</style>
            
            <button 
                className="post-action-button" // Apply the CSS class for structural and responsive styles
                style={{
                    // Dynamic styles remain inline
                    color: isActive ? '#ef4444' : '#666',
                    background: isActive ? '#fee2e2' : (isHovered ? '#f3f4f6' : 'transparent'),
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                }}
                onClick={onClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/*If icon is an image, render <img>; otherwise, render emoji/icon text */}
                {isImage ? (
                    <img 
                        src={icon} 
                        alt="icon" 
                        style={{ width: '25px', height: '25px' }}
                        // Fallback for image loading error
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/25x25/e0e0e0/555?text=Icon'; }}
                    />
                ) : (
                    <span style={styles.icon}>{icon}</span>
                )}

                {/* Show count only if provided. Ensure count color adapts dynamically. */}
                {count !== undefined && <span style={{...styles.count, color: isActive ? '#ef4444' : '#666'}}>{count}</span>}
            </button>
        </>
	)
}

const styles = {
    // Structural styles moved to CSS_RULES. Only non-button-specific styles remain.
	icon: {
		fontSize: '20px',
		lineHeight: '1',
	},
	count: {
		// Ensures count text color adapts with button color
	}
}

export default PostActionButton