import React, { useState } from 'react';
import ContactForm from './Components/ContactForm';
import { Footer } from '../Inicio/Components';
import { sendContactForm } from '../../services/contactService';
import { message } from 'antd';

const Contactanos = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await sendContactForm(data);
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      // Success message is already shown by the service
    } catch (error) {
      console.error('Error en formulario de contacto:', error);
      // Error is already handled in the service
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>¿Necesitas ayuda?</h1>
          <p style={styles.heroSubtitle}>Estamos aquí para responder tus preguntas y escuchar tus sugerencias</p>
        </div>
      </div>
      
      <div style={styles.formContainer}>
        <ContactForm 
          onSubmit={handleSubmit} 
          loading={loading} 
          formData={formData}
          setFormData={setFormData}
        />
      </div>
      
      <Footer />
    </div>
  );
};

// styles remain unchanged
const styles = {
  pageContainer: {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    display: 'flex',
    flexDirection: 'column',
  },
  heroSection: {
    padding: '60px 20px 80px',
    textAlign: 'center',
    position: 'relative',
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
    position: 'relative',
    zIndex: '2',
  },
  heroTitle: {
    fontSize: '2.8rem',
    fontWeight: '700',
    marginBottom: '1.2rem',
    color: '#1b2a41',
    position: 'relative',
    display: 'inline-block',
    padding: '0 15px 10px',
    borderBottom: '3px solid rgba(27, 42, 65, 0.2)',
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    maxWidth: '600px',
    margin: '0 auto',
    color: '#1b2a41',
    lineHeight: '1.6',
  },
  formContainer: {
    maxWidth: '500px',
    width: '100%',
    margin: '-20px auto 80px',
    padding: '0 20px',
    position: 'relative',
    zIndex: '1',
  }
};

export default Contactanos;
