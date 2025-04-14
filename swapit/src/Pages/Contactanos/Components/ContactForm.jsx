import React from 'react';
import Button from '../../../Components/UI/buttons';

const ContactForm = ({ onSubmit, loading, formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.container}>
      {/* Título */}
      <div style={styles.header}>
        <h3 style={styles.headerText}>Escríbenos</h3>
      </div>

      {/* Inputs */}
      <div style={styles.inputContainer}>
        <label style={styles.label}>Nombre</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombre"
          style={styles.input}
          required
        />
      </div>

      <div style={styles.inputContainer}>
        <label style={styles.label}>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          style={styles.input}
          required
        />
      </div>

      <div style={styles.inputContainer}>
        <label style={styles.label}>Mensaje</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Escribe tu mensaje aquí..."
          style={styles.textarea}
          required
        />
      </div>

      {/* Botón */}
      <div style={styles.buttonContainer}>
        <Button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar'}
        </Button>
      </div>
    </form>
  );
};

// styles remain unchanged
const styles = {
  container: {
    width: '400px',
    padding: '35px 24px 24px',
    borderRadius: '16px',
    border: '2px solid #20b2aa',
    backgroundColor: '#fafafa',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    margin: '0 auto',
    position: 'relative',
  },
  header: {
    backgroundColor: '#1b2a41',
    padding: '12px 20px',
    borderRadius: '30px',
    position: 'absolute',
    top: '-22px',
    left: '50%',
    transform: 'translateX(-50%)',
    minWidth: '180px',
    textAlign: 'center',
    boxShadow: '0 4px 10px rgba(27, 42, 65, 0.3)',
  },
  headerText: {
    color: '#fff',
    fontSize: '18px',
    fontWeight: 'bold',
    margin: 0,
    letterSpacing: '0.5px',
  },
  inputContainer: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    marginBottom: '6px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    boxSizing: 'border-box',
    outline: 'none',
  },
  textarea: {
    width: '100%',
    height: '100px',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    boxSizing: 'border-box',
    resize: 'none',
    outline: 'none',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
};

export default ContactForm;
