import React, { useState, useEffect } from 'react';
import { User, MessageSquare, Send } from 'lucide-react';
import { message } from 'antd';
import { getComentariosByProducto, addComentario, addRespuesta, deleteComentario, deleteRespuesta } from '../../services/productosServices';
import { fetchUserProfile } from '../../services/profileService'; // Asumiendo que está en este path

const CommentsSection = ({ comments = [], onAddComment, productoId }) => {
  const [newComment, setNewComment] = useState('');
  const [commentsList, setCommentsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Fetch user info on component mount
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userData = await fetchUserProfile();
        setCurrentUser(userData);
        console.log('Current user data:', userData);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    
    getUserInfo();
  }, []);
  
  useEffect(() => {
    if (productoId) {
      fetchComments();
    } else {
      setCommentsList(comments);
    }
  }, [productoId, comments]);
  
  const fetchComments = async () => {
    try {
      setLoading(true);
      console.log('Fetching comments for product ID:', productoId);
      const data = await getComentariosByProducto(productoId);
      console.log('Comments fetched:', data);
      setCommentsList(data);
    } catch (error) {
      console.error('Error al cargar comentarios:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    try {
      if (!localStorage.getItem('token')) {
        message.warning('Debes iniciar sesión para comentar');
        return;
      }
      
      if (productoId) {
        console.log('Sending comment for product ID:', productoId);
        // Si tenemos productoId, enviamos el comentario al backend usando el servicio
        const response = await addComentario(productoId, newComment.trim());
        
        // Añadimos el nuevo comentario a la lista
        setCommentsList([...commentsList, response]);
        message.success('Comentario añadido correctamente');
      } else if (onAddComment) {
        // Fallback al comportamiento anterior si no hay productoId
        onAddComment({
          user: currentUser?.nombre || 'Usuario',
          text: newComment.trim()
        });
      }
      
      setNewComment('');
    } catch (error) {
      console.error('Error al añadir comentario:', error);
      if (error.message === 'Usuario no autenticado') {
        message.warning('Debes iniciar sesión para comentar');
      } else {
        message.error('Error al añadir comentario: ' + (error.response?.data?.mensaje || error.message));
      }
    }
  };
  
  // Añadir funcionalidad para responder a comentarios
  const handleAddReply = async (commentId, replyText) => {
    try {
      if (!localStorage.getItem('token')) {
        message.warning('Debes iniciar sesión para responder');
        return;
      }
      
      const response = await addRespuesta(commentId, replyText);
      
      // Actualizar la lista de comentarios con la nueva respuesta
      const updatedComments = commentsList.map(comment => 
        comment._id === commentId ? response : comment
      );
      
      setCommentsList(updatedComments);
      message.success('Respuesta añadida correctamente');
    } catch (error) {
      console.error('Error al añadir respuesta:', error);
      message.error('Error al añadir respuesta');
    }
  };
  
  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComentario(commentId);
      // Actualizar la lista de comentarios después de eliminar
      const updatedComments = commentsList.filter(comment => comment._id !== commentId);
      setCommentsList(updatedComments);
    } catch (error) {
      console.error('Error al eliminar comentario:', error);
    }
  };
  
  const handleDeleteReply = async (commentId, replyId) => {
    try {
      await deleteRespuesta(commentId, replyId);
      // Actualizar la lista de comentarios después de eliminar la respuesta
      const updatedComments = commentsList.map(comment => {
        if (comment._id === commentId) {
          return {
            ...comment,
            respuestas: comment.respuestas.filter(reply => reply._id !== replyId)
          };
        }
        return comment;
      });
      setCommentsList(updatedComments);
    } catch (error) {
      console.error('Error al eliminar respuesta:', error);
    }
  };
  
  // Estilos para el componente
  const styles = {
    commentsSection: {
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      padding: '16px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      marginTop: '20px',
    },
    titleContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '16px',
    },
    titleIcon: {
      marginRight: '8px',
      color: '#3fd1c1',
    },
    title: {
      margin: '0',
      fontSize: '18px',
      fontWeight: '600',
      color: '#2d3748',
    },
    commentForm: {
      display: 'flex',
      marginBottom: '20px',
    },
    commentInput: {
      flex: '1',
      padding: '10px 12px',
      borderRadius: '6px',
      border: '1px solid #e2e8f0',
      fontSize: '14px',
    },
    submitButton: {
      backgroundColor: '#3fd1c1',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      padding: '8px 16px',
      marginLeft: '8px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    commentsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    commentItem: {
      display: 'flex',
      padding: '12px',
      borderRadius: '8px',
      backgroundColor: '#f8fafc',
      border: '1px solid #edf2f7',
    },
    commentAvatar: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      backgroundColor: '#e2e8f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '12px',
      color: '#64748b',
    },
    commentContent: {
      flex: '1',
    },
    commentHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '4px',
    },
    commentUser: {
      fontWeight: '600',
      fontSize: '14px',
      color: '#2d3748',
    },
    commentDate: {
      fontSize: '12px',
      color: '#64748b',
    },
    commentText: {
      margin: '0',
      fontSize: '14px',
      color: '#4a5568',
    },
    repliesList: {
      marginTop: '12px',
      paddingLeft: '12px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    replyItem: {
      display: 'flex',
      padding: '8px',
      borderRadius: '6px',
      backgroundColor: '#f1f5f9',
      border: '1px solid #e2e8f0',
    },
    replyAvatar: {
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      backgroundColor: '#cbd5e1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '8px',
      color: '#64748b',
    },
    replyContent: {
      flex: '1',
    },
    replyText: {
      margin: '0',
      fontSize: '13px',
      color: '#4a5568',
    },
    emptyComments: {
      textAlign: 'center',
      padding: '16px',
      color: '#64748b',
      fontSize: '14px',
    },
    deleteButton: {
      background: 'none',
      border: 'none',
      color: '#e53e3e',
      cursor: 'pointer',
      fontSize: '12px',
      padding: '2px 6px',
    },
    replyForm: {
      display: 'flex',
      marginTop: '8px',
    },
    replyInput: {
      flex: '1',
      fontSize: '13px',
      padding: '6px 10px',
      borderRadius: '4px',
      border: '1px solid #e2e8f0',
    },
    replyButton: {
      background: '#3fd1c1',
      border: 'none',
      color: 'white',
      borderRadius: '4px',
      padding: '6px 10px',
      marginLeft: '4px',
      fontSize: '12px',
      cursor: 'pointer',
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
        {loading ? (
          <div style={styles.emptyComments}>Cargando comentarios...</div>
        ) : commentsList.length === 0 ? (
          <div style={styles.emptyComments}>No hay comentarios aún</div>
        ) : (
          commentsList.map((comment, index) => (
            <div key={comment._id || index} style={styles.commentItem}>
              <div style={styles.commentAvatar}>
                <User size={18} />
              </div>
              <div style={styles.commentContent}>
                <div style={styles.commentHeader}>
                  <span style={styles.commentUser}>
                    {comment.usuario?.nombre || comment.user || 'Usuario'}
                  </span>
                  <span style={styles.commentDate}>
                    {comment.fecha ? new Date(comment.fecha).toLocaleDateString() : ''}
                  </span>
                </div>
                <p style={styles.commentText}>{comment.texto || comment.text}</p>
                
                {/* Botón para eliminar comentario (solo visible para el propietario) */}
                {currentUser && currentUser._id === comment.usuario?._id && (
                  <button 
                    onClick={() => handleDeleteComment(comment._id)} 
                    style={styles.deleteButton}
                  >
                    Eliminar
                  </button>
                )}
                
                {/* Mostrar respuestas si existen */}
                {comment.respuestas && comment.respuestas.length > 0 && (
                  <div style={styles.repliesList}>
                    {comment.respuestas.map((reply, replyIndex) => (
                      <div key={reply._id || replyIndex} style={styles.replyItem}>
                        <div style={styles.replyAvatar}>
                          <User size={14} />
                        </div>
                        <div style={styles.replyContent}>
                          <div style={styles.commentHeader}>
                            <span style={styles.commentUser}>
                              {reply.usuario?.nombre || 'Usuario'}
                            </span>
                            <span style={styles.commentDate}>
                              {reply.fecha ? new Date(reply.fecha).toLocaleDateString() : ''}
                            </span>
                          </div>
                          <p style={styles.replyText}>{reply.texto}</p>
                          
                          {/* Botón para eliminar respuesta (solo visible para el propietario) */}
                          {currentUser && currentUser._id === reply.usuario?._id && (
                            <button 
                              onClick={() => handleDeleteReply(comment._id, reply._id)} 
                              style={styles.deleteButton}
                            >
                              Eliminar
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Formulario para responder al comentario */}
                {localStorage.getItem('token') && (
                  <div style={styles.replyForm}>
                    <input 
                      type="text" 
                      placeholder="Responder..." 
                      style={styles.replyInput}
                      id={`reply-input-${comment._id}`}
                    />
                    <button 
                      style={styles.replyButton}
                      onClick={() => {
                        const replyText = document.getElementById(`reply-input-${comment._id}`).value;
                        if (replyText.trim()) {
                          handleAddReply(comment._id, replyText);
                          document.getElementById(`reply-input-${comment._id}`).value = '';
                        }
                      }}
                    >
                      Responder
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentsSection;