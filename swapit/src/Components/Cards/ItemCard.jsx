// ItemCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, User, Tag } from 'lucide-react';
import { BASE_URL } from '../../services/api';

function ItemCard({ item, onClick }) {
  const navigate = useNavigate();
  console.log("Item recibido en ItemCard:", item);

  const handleViewClick = () => {
    if (onClick) {
      onClick(item._id);
    } else {
      // Ensure we're navigating to the correct product page
      navigate(`/producto/${item._id}`);
    }
  };
  
  // Valores por defecto si no hay item
  const defaultItem = {
    titulo: "Título del producto",
    categoria: "Categoría",
    intercambioPor: "Artículo",
    createdAt: "DD/MM/AAAA",
    usuario: { nombre: "Nombre Autor" },
    imagenes: ["/zapatos.png"]
  };
  
  // Usar el item proporcionado o los valores por defecto
  const productItem = item || defaultItem;
  
  // Formatear la fecha
  const formatDate = (dateString) => {
    if (!dateString) return "DD/MM/AAAA";
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };
  
  // Construir la URL completa de la imagen
  let imageUrl = "/zapatos.png"; // Imagen por defecto
  
  if (productItem.imagenes && productItem.imagenes.length > 0) {
    // Verificar si la ruta ya incluye el BASE_URL
    if (productItem.imagenes[0].startsWith('http')) {
      imageUrl = productItem.imagenes[0];
    } else {
      imageUrl = `${BASE_URL}${productItem.imagenes[0]}`;
    }
    console.log("URL de imagen construida:", imageUrl);
  }

  return (
    <div style={styles.itemCard}>
      <div style={styles.itemImage}>
        <img 
          src={imageUrl} 
          alt={productItem.titulo} 
          style={styles.image} 
          onError={(e) => {
            console.error("Error al cargar la imagen:", e);
            e.target.onerror = null; 
            e.target.src = "/zapatos.png";
          }}
        />
      </div>
      <div style={styles.itemInfo}>
        <h3 style={styles.itemTitle}>{productItem.titulo}</h3>
        
        <div style={styles.itemCategory}>
          <Tag size={14} color="white" style={{marginRight: '5px'}} />
          Cambio por: <span style={styles.categoryHighlight}>{productItem.intercambioPor}</span>
        </div>
        
        <div style={styles.infoGrid}>
          <div style={styles.infoRow}>
            <Calendar size={14} color="#555" style={{marginRight: '5px'}} />
            <span style={styles.infoText}>Publicado: {formatDate(productItem.createdAt)}</span>
          </div>
          
          <div style={styles.infoRow}>
            <User size={14} color="#555" style={{marginRight: '5px'}} />
            <span style={styles.infoText}>Por: {productItem.usuario?.nombre || "Anónimo"}</span>
          </div>
          
          <div style={styles.tagsRow}>
            <span style={styles.tagsLabel}>Cat: </span>
            <span style={styles.tagsText}>{productItem.categoria}</span>
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
    height: '400px',
    boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    margin: '0 auto',
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
    height: '220px',
  },
  itemTitle: {
    margin: '0 0 12px 0',
    fontSize: '16px',
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
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
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  categoryHighlight: {
    fontWeight: 'bold',
    marginLeft: '4px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '120px',
  },
  infoGrid: {
    flexGrow: 1,
    marginBottom: '15px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
    fontSize: '13px',
  },
  infoText: {
    color: '#555',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
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
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '180px',
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
    '&:hover': {
      backgroundColor: '#002244',
    },
  },
};

export default ItemCard;