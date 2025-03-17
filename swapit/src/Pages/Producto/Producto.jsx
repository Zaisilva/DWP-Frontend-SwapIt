import React, { useState } from 'react';
import ItemPreview from '../../Components/UI/ItemPreview';
import UserInfo from '../../Components/UI/UserInfo';
import ContactButtons from '../../Components/UI/ContactButtons';
import CommentsSection from '../../Components/UI/CommentsSection';
import PublishForm from '../../Components/UI/PublishForm'; // Renombrado para mejor claridad

const Producto = () => {
  const [itemData, setItemData] = useState({
    titulo: 'Título',
    categoria: 'Ropa, Accesorios',
    fechaPublicacion: '10/10/10',
    autor: 'Zaira Silva',
    cambiadoPor: 'Zapatos'
  });
  
  const [comments, setComments] = useState([
    { user: 'usuario1', text: 'dvdbdnfdndn' },
    { user: 'usuario2', text: 'dvdbdnfdndn' }
  ]);

  const handleAddComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  const handleUpdateItem = (newData) => {
    setItemData({...itemData, ...newData});
  };

  const styles = {
    publishPage: {
      fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f9fafb',
    },
    publishContainer: {
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      overflow: 'hidden',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    },
    publishMain: {
      display: 'flex',
      minHeight: '600px',
    },
    leftColumn: {
      width: '35%',
      padding: '22px',
      borderRight: '1px solid #edf2f7',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    rightColumn: {
      width: '65%',
      padding: '22px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    },
    title: {
      fontSize: '22px',
      fontWeight: '700',
      color: '#2d3748',
      borderBottom: '2px solid #3fd1c1',
      paddingBottom: '12px',
      marginBottom: '18px',
    }
  };

  return (
    <div style={styles.publishPage}>
      <div style={styles.publishContainer}>
        <div style={styles.publishMain}>
          <div style={styles.leftColumn}>
            <ItemPreview />
            <UserInfo username={itemData.autor} />
            <ContactButtons />
          </div>
          
          <div style={styles.rightColumn}>
            <h2 style={styles.title}>{itemData.titulo}</h2>
            <PublishForm 
              itemData={itemData} 
              onUpdateItem={handleUpdateItem} 
            />
            <CommentsSection 
              comments={comments} 
              onAddComment={handleAddComment} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Producto;