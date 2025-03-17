import React from 'react';
import ContactForm from './Components/ContactForm';

const Contactanos = () => {
  const handleSubmit = (data) => {
    console.log('Formulario enviado:', data);
  };

  return (
    <div style={styles.container}>
      <ContactForm onSubmit={handleSubmit} loading={false} />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f4f9', 
    padding: '20px',
  },
};

export default Contactanos;
