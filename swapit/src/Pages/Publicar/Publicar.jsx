import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PublishForm from './Components/PublishForm';
import { createProducto } from '../../services/productosServices';

const Publicar = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const navigate = useNavigate();
  
  const handlePublish = async (data) => {
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Usamos el servicio para crear el producto
      await createProducto(data);
      
      setSubmitSuccess(true);
      
      // Después de 2 segundos, redirigir al usuario a sus productos
      setTimeout(() => {
        navigate('/mis-productos');
      }, 2000);
    } catch (error) {
      // El manejo de errores ya se hace en el servicio,
      // pero podemos establecer un mensaje personalizado aquí si es necesario
      setSubmitError('No se pudo publicar tu producto. Por favor, verifica los datos e intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Publicar Producto para Trueque</h1>
        <p style={styles.subtitle}>Comparte lo que ya no utilizas y encuentra lo que necesitas</p>
      </div>
      
      {submitSuccess && (
        <div style={styles.successMessage}>
          ¡Tu producto ha sido publicado exitosamente! Serás redirigido a tus productos...
        </div>
      )}
      
      <PublishForm 
        onSubmit={handlePublish} 
        loading={isSubmitting} 
        error={submitError} 
      />
      
      <div style={styles.guideBox}>
        <h3 style={styles.guideTitle}>Consejos para un buen trueque</h3>
        <ul style={styles.guideList}>
          <li>Incluye fotos claras y de buena calidad</li>
          <li>Describe el estado real del producto</li>
          <li>Sé específico sobre lo que buscas a cambio</li>
          <li>Responde rápido a los interesados</li>
        </ul>
      </div>
    </div>
  );
};    
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '30px 20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '32px',
    color: '#2a9d8f',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: '18px',
    color: '#555',
    marginBottom: '20px',
  },
  successMessage: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '15px',
    borderRadius: '8px',
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '16px',
    fontWeight: 'bold',
    border: '1px solid #c3e6cb',
  },
  guideBox: {
    backgroundColor: '#f8f9fa',
    border: '1px solid #e3e6f0',
    borderRadius: '12px',
    padding: '20px',
    marginTop: '40px',
    maxWidth: '800px',
    margin: '40px auto 0',
  },
  guideTitle: {
    fontSize: '20px',
    color: '#2a9d8f',
    marginBottom: '15px',
    textAlign: 'center',
  },
  guideList: {
    paddingLeft: '20px',
    lineHeight: '1.8',
    fontSize: '16px',
    color: '#555',
  }
};

export default Publicar;