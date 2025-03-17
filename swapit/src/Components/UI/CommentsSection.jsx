import React, { useState } from 'react';
import { User, MessageSquare, Send } from 'lucide-react';

const CommentsSection = ({ comments = [], onAddComment }) => {
  const [newComment, setNewComment] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment({
        user: 'currentUser', // En una implementación real, vendría de la autenticación
        text: newComment.trim()
      });
      setNewComment('');
    }
  };
  
  const styles = {
    commentsSection: {
      border: '1px solid #e0e0e0',
      borderRadius: '12px',
      padding: '20px',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
    },
    titleContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
    },
    titleIcon: {
      marginRight: '10px',
      color: '#4a5568',
    },
    title: {
      margin: 0,
      fontSize: '18px',
      fontWeight: '600',
      color: '#2d3748',
    },
    commentForm: {
      marginBottom: '20px',
      position: 'relative',
    },
    commentInput: {
      width: '100%',
      padding: '12px 40px 12px 15px',
      border: '1px solid #ddd',
      borderRadius: '25px',
      outline: 'none',
      fontSize: '14px',
      transition: 'border-color 0.3s, box-shadow 0.3s',
      boxSizing: 'border-box',
    },
    submitButton: {
      position: 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: '#4a5568',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '30px',
      height: '30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      padding: 0,
    },
    commentsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    commentItem: {
      display: 'flex',
      alignItems: 'flex-start',
    },
    commentAvatar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '38px',
      height: '38px',
      marginRight: '12px',
      backgroundColor: '#f3f4f6',
      borderRadius: '50%',
      color: '#4a5568',
    },
    commentContent: {
      flexGrow: 1,
      backgroundColor: '#f9fafb',
      borderRadius: '8px',
      padding: '12px 15px',
      border: '1px solid #e5e7eb',
    },
    commentText: {
      margin: 0,
      lineHeight: '1.5',
      color: '#4b5563',
      wordBreak: 'break-word',
    },
    emptyComments: {
      textAlign: 'center',
      padding: '15px 0',
      color: '#9ca3af',
      fontStyle: 'italic',
    }
  };
  
  return (
    <div style={styles.commentsSection}>
      <div style={styles.titleContainer}>
        <MessageSquare size={20} style={styles.titleIcon} />
        <h3 style={styles.title}>Comentarios</h3>
      </div>
      
      <form onSubmit={handleSubmit} style={styles.commentForm}>
        <input
          type="text"
          placeholder="Agregar un comentario..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          style={styles.commentInput}
        />
        <button 
          type="submit" 
          style={styles.submitButton}
          disabled={!newComment.trim()}
        >
          <Send size={16} />
        </button>
      </form>
      
      <div style={styles.commentsList}>
        {comments.length === 0 ? (
          <div style={styles.emptyComments}>No hay comentarios aún</div>
        ) : (
          comments.map((comment, index) => (
            <div key={index} style={styles.commentItem}>
              <div style={styles.commentAvatar}>
                <User size={18} />
              </div>
              <div style={styles.commentContent}>
                <p style={styles.commentText}>{comment.text}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentsSection;