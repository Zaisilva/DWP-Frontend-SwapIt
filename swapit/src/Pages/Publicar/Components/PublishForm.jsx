import React, { useState } from 'react';
import ImageUpload from '../../../Components/UI/ImageUpload';

const PublishForm = ({ onSubmit, loading, error }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    state: '',
    exchangeFor: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (file) => {
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div style={styles.formWrapper}>
      <div style={styles.contentWrapper}>
        {/* Subir imagen a la izquierda */}
        <div style={styles.imageContainer}>
          <ImageUpload onImageUpload={handleImageUpload} />
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} style={styles.publishForm}>
          {/* Título */}
          <div style={styles.inputContainer}>
            <label style={styles.label} htmlFor="title">Título</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Introduce el título"
              required
              style={styles.input}
            />
          </div>

          {/* Categoría */}
          <div style={styles.inputContainer}>
            <label style={styles.label} htmlFor="category">Categoría</label>
            <input
              id="category"
              name="category"
              type="text"
              value={formData.category}
              onChange={handleChange}
              placeholder="Introduce la categoría"
              required
              style={styles.input}
            />
          </div>

          {/* Estado */}
          <div style={styles.inputContainer}>
            <label style={styles.label} htmlFor="state">Estado</label>
            <input
              id="state"
              name="state"
              type="text"
              value={formData.state}
              onChange={handleChange}
              placeholder="Introduce el estado"
              required
              style={styles.input}
            />
          </div>

          {/* Cambiar por */}
          <div style={styles.inputContainer}>
            <label style={styles.label} htmlFor="exchangeFor">Cambiar por:</label>
            <input
              id="exchangeFor"
              name="exchangeFor"
              type="text"
              value={formData.exchangeFor}
              onChange={handleChange}
              placeholder="Introduce lo que deseas cambiar"
              required
              style={styles.input}
            />
          </div>

          {/* Error */}
          {error && <div style={styles.errorMessage}>{error}</div>}

          {/* Botón Publicar */}
          <div style={styles.buttonContainer}>
            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.publishButton,
                backgroundColor: loading ? '#ccc' : styles.publishButton.backgroundColor
              }}
            >
              {loading ? 'Publicando...' : 'Publicar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  formWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  },
  contentWrapper: {
    display: 'flex',
    gap: '40px',
    alignItems: 'flex-start',
  },
  publishForm: {
    backgroundColor: 'white',
    border: '2px solid #2a9d8f',
    padding: '24px',
    borderRadius: '16px',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
    width: '420px',
  },
  inputContainer: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    marginBottom: '6px',
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  buttonContainer: {
    marginTop: '20px',
    textAlign: 'center',
  },
  publishButton: {
    backgroundColor: '#2a9d8f',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '24px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  errorMessage: {
    color: '#e74c3c',
    fontSize: '14px',
    marginBottom: '10px',
    textAlign: 'center',
  },
};

export default PublishForm;
