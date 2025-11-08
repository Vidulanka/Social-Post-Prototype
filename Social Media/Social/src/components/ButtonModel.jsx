const ButtonModel = ({ icon, count, onClick, isActive }) => {
    return (
        <button 
            className="action-button"
            style={{
                ...styles.button,
                ...(isActive ? styles.activeButton : {})
            }}
            onClick={onClick}
        >
            <img 
                src={icon} 
                alt="action"
                style={styles.icon}
            />
            {count !== undefined && (
                <span style={styles.count}>{count}</span>
            )}
        </button>
    )
}

const styles = {
    button: {
        background: 'transparent',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 12px',
        cursor: 'pointer',
        borderRadius: '8px',
        transition: 'all 0.2s ease',
    },
    activeButton: {
        background: '#fdf4ff',  // very light purple
        transform: 'scale(1.05)',
    },
    icon: {
        width: '24px',
        height: '24px',
        objectFit: 'contain',
    },
    count: {
        fontSize: '14px',
        color: '#6b7280',
        fontWeight: '500',
    },
}

export default ButtonModel