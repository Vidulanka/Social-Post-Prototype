import { useEffect, useRef, useState } from 'react';

const CreatePostModal = ({ closeModal, submitPost }) => {
  const [postText, setPostText] = useState('');
  const [postImageData, setPostImageData] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);
  const imgInputRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  // ✅ Detect screen resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!postText.trim()) {
      alert('Please enter some content for your post');
      return;
    }

    const newPost = {
      id: Date.now(),
      userName: 'You',
      userAvatar: 'https://i.pravatar.cc/150?img=33',
      content: postText,
      imageUrl: postImageData || null,
      timestamp: 'Just now',
      likes: 0,
      comments: 0,
    };

    submitPost(newPost);
    setPostText('');
    setPostImageData('');
    closeDialog();
  };

  useEffect(() => {
    const timer = setTimeout(() => setDialogVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const closeDialog = () => {
    setDialogVisible(false);
    setTimeout(() => closeModal && closeModal(), 220);
  };

  const overlayStyles = {
    ...styles.overlay,
    opacity: dialogVisible ? 1 : 0,
    transition: 'opacity 220ms ease',
  };

  const modalStyles = {
    ...styles.modal,
    padding: isMobile ? 16 : 24,
    width: isMobile ? '95%' : '90%',
    maxWidth: isMobile ? 380 : 600,
    transform: dialogVisible ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.99)',
    opacity: dialogVisible ? 1 : 0,
    transition: 'all 220ms cubic-bezier(.2,.8,.2,1)',
  };

  const buttonGroupStyles = {
    ...styles.buttonGroup,
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: isMobile ? 'center' : 'flex-end',
    gap: isMobile ? 8 : 12,
  };

  const cancelButtonStyles = {
    ...styles.cancelButton,
    padding: isMobile ? '8px 16px' : '10px 24px',
    fontSize: isMobile ? 12 : 14,
    width: isMobile ? '100%' : 'auto',
  };

  const postButtonStyles = {
    ...styles.postButton,
    padding: isMobile ? '8px 16px' : '10px 24px',
    fontSize: isMobile ? 12 : 14,
    width: isMobile ? '100%' : 'auto',
  };

  return (
    <div style={overlayStyles} onClick={closeDialog}>
      <div style={modalStyles} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>Create a Post</h2>
          <button style={styles.closeButton} onClick={closeDialog}>✕</button>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>What's on your mind?</label>
            <textarea
              style={styles.textarea}
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="Share your thoughts..."
              rows="6"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Image (optional)</label>
            <div style={styles.imageRow}>
              <input
                type="file"
                accept="image/*"
                ref={imgInputRef}
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files && e.target.files[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = () => setPostImageData(reader.result);
                  reader.readAsDataURL(file);
                }}
              />
              <button
                type="button"
                style={styles.cameraButton}
                onClick={() => imgInputRef.current && imgInputRef.current.click()}
              >
                📷
              </button>
              {postImageData ? (
                <>
                  <img src={postImageData} alt="preview" style={styles.preview} />
                  <button type="button" style={styles.removeImage} onClick={() => setPostImageData('')}>
                    Remove
                  </button>
                </>
              ) : (
                <div style={styles.hint}>Tap the camera to add an image</div>
              )}
            </div>
          </div>

          <div style={buttonGroupStyles}>
            <button type="button" style={cancelButtonStyles} onClick={closeDialog}>
              Cancel
            </button>
            <button type="submit" style={postButtonStyles}>
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
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
    zIndex: 1000,
  },
  modal: {
    background: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
    maxHeight: '90vh',
    overflow: 'auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottom: '1px solid #e5e7eb',
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: '#1a1a1a',
    margin: 0,
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: 24,
    cursor: 'pointer',
    color: '#666',
    padding: '4px 8px',
    lineHeight: 1,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    display: 'block',
    fontSize: 14,
    fontWeight: 600,
    color: '#374151',
    marginBottom: 8,
  },
  textarea: {
    width: '100%',
    padding: 12,
    border: '1px solid #d1d5db',
    borderRadius: 8,
    fontSize: 14,
    fontFamily: 'inherit',
    resize: 'vertical',
    boxSizing: 'border-box',
  },
  buttonGroup: {
    display: 'flex',
    gap: 12,
    justifyContent: 'flex-end',
    marginTop: 24,
  },
  cancelButton: {
    padding: '10px 24px',
    border: '1px solid #B47EFA',
    background: 'linear-gradient(120deg, #EFE3FF, #FED3F0)',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    color: '#6B6B6B',
  },
  postButton: {
    padding: '10px 24px',
    border: '1px solid #B47EFA',
    background: 'linear-gradient(120deg, #d087ff, #8b5cf6, #ec4899, #fbbf24)',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    color: '#121212',
    transition: 'transform 0.2s',
  },
  imageRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  cameraButton: {
    padding: '10px 12px',
    borderRadius: 8,
    border: '1px solid #d1d5db',
    background: '#ffffff',
    cursor: 'pointer',
    fontSize: 18,
  },
  preview: {
    height: 56,
    width: 56,
    objectFit: 'cover',
    borderRadius: 8,
    border: '1px solid #e5e7eb',
  },
  hint: {
    color: '#6b7280',
    fontSize: 13,
  },
  removeImage: {
    padding: '8px 12px',
    borderRadius: 8,
    border: '1px solid #fca5a5',
    background: '#fff1f2',
    color: '#b91c1c',
    cursor: 'pointer',
  },
};

export default CreatePostModal;
