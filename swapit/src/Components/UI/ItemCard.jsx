// ItemCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, User, Tag } from 'lucide-react';

function ItemCard({ item }) {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(`/producto`); // Redirige a /producto/id
  };
  
  // Manejo de item si no se proporciona
  const productItem = item || {
    title: "Título del producto",
    category: "Categoría",
    tags: ["Tag1", "Tag2"],
    publishDate: "DD/MM/AAAA",
    author: "Nombre Autor",
    imageUrl: "/zapatos.png"
  };

  return (
    <div style={styles.itemCard}>
      <div style={styles.itemImage}>
        <img 
          src={productItem.imageUrl || "/zapatos.png"} 
          alt={productItem.title} 
          style={styles.image} 
        />
      </div>
      <div style={styles.itemInfo}>
        <h3 style={styles.itemTitle}>{productItem.title}</h3>
        
        <div style={styles.itemCategory}>
          <Tag size={14} color="white" style={{marginRight: '5px'}} />
          Cambio por: <span style={styles.categoryHighlight}>{productItem.category}</span>
        </div>
        
        <div style={styles.infoGrid}>
          <div style={styles.infoRow}>
            <Calendar size={14} color="#555" style={{marginRight: '5px'}} />
            <span style={styles.infoText}>Publicado: {productItem.publishDate}</span>
          </div>
          
          <div style={styles.infoRow}>
            <User size={14} color="#555" style={{marginRight: '5px'}} />
            <span style={styles.infoText}>Por: {productItem.author}</span>
          </div>
          
          <div style={styles.tagsRow}>
            <span style={styles.tagsLabel}>Cat: </span>
            <span style={styles.tagsText}>{productItem.tags.join(', ')}</span>
          </div>
        </div>
        
        <button style={styles.viewButton} onClick={handleViewClick}>
          VER
        </button>
      </div>
    </div>
  );
}

const styles = {
  itemCard: {
    backgroundColor: 'white',
    borderRadius: '10px',
    overflow: 'hidden',
    width: '280px',
    boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  itemImage: {
    height: '180px',
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  itemInfo: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  itemTitle: {
    margin: '0 0 12px 0',
    fontSize: '16px',
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  itemCategory: {
    backgroundColor: '#40b9a4',
    color: 'white',
    padding: '8px 10px',
    marginBottom: '12px',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
  },
  categoryHighlight: {
    fontWeight: 'bold',
    marginLeft: '4px',
  },
  infoGrid: {
    flexGrow: 1,
    marginBottom: '15px',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
    fontSize: '13px',
  },
  infoText: {
    color: '#555',
  },
  tagsRow: {
    display: 'flex',
    marginBottom: '8px',
    fontSize: '13px',
    color: '#555',
  },
  tagsLabel: {
    marginRight: '5px',
    fontWeight: '500',
  },
  tagsText: {
    color: '#666',
  },
  viewButton: {
    display: 'block',
    width: '80px',
    backgroundColor: '#003366',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '7px 0',
    margin: '0 auto',
    cursor: 'pointer',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: '13px',
    letterSpacing: '0.5px',
    transition: 'background-color 0.2s ease',
  },
};

export default ItemCard;