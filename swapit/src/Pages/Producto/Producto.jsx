import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ItemPreview from '../../Components/UI/ItemPreview';
import UserInfo from '../../Components/UI/UserInfo';
import ContactButtons from '../../Components/UI/ContactButtons';
import CommentsSection from '../../Components/UI/CommentsSection';
import PublishForm from '../../Components/UI/PublishForm';
import { Spin, message, Button } from 'antd';
import { getProductoById } from '../../services/productosServices';
import { BASE_URL } from '../../services/api';

const Producto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [itemData, setItemData] = useState({
    titulo: "",
    categoria: "",
    fechaPublicacion: "",
    autor: "",
    cambiadoPor: "",
    descripcion: "",
    estado: "",
    imagenes: [],
    ubicacion: {},
    id: "",
    // Campos para guardar información del usuario
    usuarioId: "",
    usuarioEmail: "",
    usuarioNombre: "",
    usuarioTelefono: "",

    // Guardar la respuesta original de la API para tener acceso a todos los datos
    rawData: null
  });
  
  const [comments, setComments] = useState([
    { user: 'usuario1', text: 'dvdbdnfdndn' },
    { user: 'usuario2', text: 'dvdbdnfdndn' }
  ]);

  useEffect(() => {
    const fetchProducto = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        console.log("Fetching producto with ID:", id);
        const producto = await getProductoById(id);
        console.log("Producto fetched:", producto);
        
        // Procesar imágenes para añadir BASE_URL
        const imagenesCompletas = producto.imagenes?.map(img => 
          img.startsWith('http') ? img : `${BASE_URL}${img}`
        ) || [];
        
        // Guardar el email directamente del objeto usuario
        const usuarioEmail = producto.usuario?.email || '';
        const usuarioTelefono = producto.usuario?.telefono || '';
        console.log("Usuario email from API:", usuarioEmail);
        console.log("Usuario telefono from API:", usuarioTelefono);
        
        setItemData({
          titulo: producto.titulo,
          categoria: producto.categoria,
          fechaPublicacion: new Date(producto.createdAt).toLocaleDateString(),
          autor: producto.usuario?.nombre || 'Usuario',
          cambiadoPor: producto.intercambioPor,
          descripcion: producto.descripcion,
          estado: producto.estado,
          imagenes: imagenesCompletas,
          ubicacion: producto.ubicacion,
          id: producto._id,
          // Guardar información detallada del usuario
          usuarioId: producto.usuario?._id,
          usuarioEmail: usuarioEmail, // Usar el email directamente de la respuesta de la API
          usuarioTelefono: usuarioTelefono, // Usar el teléfono directamente de la respuesta de la API

          usuarioNombre: producto.usuario?.nombre,
          // Guardar la respuesta completa para tener acceso a todos los datos
          rawData: producto
        });
      } catch (error) {
        console.error('Error al cargar el producto:', error);
        message.error('No se pudo cargar la información del producto');
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

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
    },
    backButton: {
      backgroundColor: '#3fd1c1',
      borderColor: '#3fd1c1',
      marginTop: '10px',
      width: '100%'
    }
  };

  if (loading) {
    return (
      <div style={{...styles.publishPage, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px'}}>
        <Spin size="large" />
      </div>
    );
  }
  
  // Para verificación: mostrar el email y teléfono del usuario en la consola
  console.log("Usuario email in state:", itemData.usuarioEmail);
  console.log("Usuario telefono in state:", itemData.usuarioTelefono);

  return (
    <div style={styles.publishPage}>
      <div style={styles.publishContainer}>
        <div style={styles.publishMain}>
          <div style={styles.leftColumn}>
            <ItemPreview images={itemData.imagenes} />
            <UserInfo username={itemData.autor} />
            <ContactButtons 
              usuarioId={itemData.usuarioId} 
              itemTitle={itemData.titulo}
              usuarioEmail={itemData.usuarioEmail} // Pasamos el email correctamente
              usuarioNombre={itemData.usuarioNombre}
              usuarioTelefono={itemData.usuarioTelefono} // Pasamos el teléfono correctamente
              itemData={itemData.rawData || itemData} // Pasamos los datos completos
            />
            <Button 
              type="primary" 
              style={styles.backButton}
              onClick={() => navigate(-1)}
            >
              Volver
            </Button>
          </div>
          
          <div style={styles.rightColumn}>
            <h2 style={styles.title}>{itemData.titulo}</h2>
            <PublishForm 
              itemData={itemData} 
              onUpdateItem={handleUpdateItem} 
              readOnly={true} // Make form read-only for viewing
            />
            <CommentsSection 
              comments={comments} 
              onAddComment={handleAddComment} 
              productoId={id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Producto;