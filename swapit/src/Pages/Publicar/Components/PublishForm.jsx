import React, { useState, useEffect } from 'react';
import ImageUpload from '../../../Components/UI/ImageUpload';
import { getEstadosMexico } from '../../../services/productosServices';

const PublishForm = ({ onSubmit, loading, error }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    categoria: '',
    estado: 'Buen estado', // Valor predeterminado
    intercambioPor: '',
    descripcion: '',
    imagenes: [],
    ubicacion: {
      ciudad: '',
      estado: '', // Cambiado de provincia a estado
      codigoPostal: ''
    }
  });
  
  const [estadosMexico, setEstadosMexico] = useState([]);
  
  // Cargar los estados de México al montar el componente
  useEffect(() => {
    setEstadosMexico(getEstadosMexico());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Maneja campos anidados para ubicación
    if (name.includes('ubicacion.')) {
      const ubicacionField = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        ubicacion: {
          ...prev.ubicacion,
          [ubicacionField]: value
        }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = (file) => {
    setFormData((prev) => ({ 
      ...prev, 
      imagenes: [...prev.imagenes, file] 
    }));
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      imagenes: prev.imagenes.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const estadosOptions = ['Nuevo', 'Como nuevo', 'Buen estado', 'Usado', 'Para reparar'];
  
  const categoriasOptions = [
    'Electrónica', 'Hogar', 'Ropa y Accesorios', 'Deportes', 
    'Juguetes', 'Libros', 'Videojuegos', 'Muebles', 'Herramientas', 'Otro'
  ];

  return (
    <div style={styles.formWrapper}>
      <div style={styles.contentWrapper}>
        {/* Subir imagen a la izquierda */}
        <div style={styles.imageContainer}>
          <h3 style={styles.imageTitle}>Fotos del producto</h3>
          <p style={styles.imageSubtitle}>Sube hasta 5 imágenes de buena calidad</p>
          
          <ImageUpload onImageUpload={handleImageUpload} />
          
          {formData.imagenes.length > 0 && (
            <div style={styles.imagePreviewContainer}>
              {formData.imagenes.map((img, index) => (
                <div key={index} style={styles.imagePreview}>
                  <img 
                    src={URL.createObjectURL(img)} 
                    alt={`Preview ${index}`} 
                    style={styles.previewImg} 
                  />
                  <button 
                    type="button" 
                    onClick={() => removeImage(index)}
                    style={styles.removeImgButton}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} style={styles.publishForm}>
          <h2 style={styles.formTitle}>Información del producto</h2>
          
          {/* Título */}
          <div style={styles.inputContainer}>
            <label style={styles.label} htmlFor="titulo">Título</label>
            <input
              id="titulo"
              name="titulo"
              type="text"
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Nombre del producto (max. 60 caracteres)"
              required
              maxLength={60}
              style={styles.input}
            />
          </div>

          {/* Descripción */}
          <div style={styles.inputContainer}>
            <label style={styles.label} htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Describe tu producto, incluye detalles importantes como tamaño, marca, etc."
              required
              style={styles.textarea}
              rows={4}
            />
          </div>

          {/* Categoría */}
          <div style={styles.inputContainer}>
            <label style={styles.label} htmlFor="categoria">Categoría</label>
            <select
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              required
              style={styles.select}
            >
              <option value="" disabled>Selecciona una categoría</option>
              {categoriasOptions.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Estado */}
          <div style={styles.inputContainer}>
            <label style={styles.label} htmlFor="estado">Estado</label>
            <select
              id="estado"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              required
              style={styles.select}
            >
              {estadosOptions.map(estado => (
                <option key={estado} value={estado}>{estado}</option>
              ))}
            </select>
          </div>

          {/* Ubicación - Grupo */}
          <div style={styles.sectionTitle}>Ubicación</div>
          
          <div style={styles.row}>
            <div style={styles.col}>
              <div style={styles.inputContainer}>
                <label style={styles.label} htmlFor="ubicacion.ciudad">Ciudad</label>
                <input
                  id="ubicacion.ciudad"
                  name="ubicacion.ciudad"
                  type="text"
                  value={formData.ubicacion.ciudad}
                  onChange={handleChange}
                  placeholder="Tu ciudad"
                  required
                  style={styles.input}
                />
              </div>
            </div>
            
            <div style={styles.col}>
              <div style={styles.inputContainer}>
                <label style={styles.label} htmlFor="ubicacion.estado">Estado</label> 
                <select
                  id="ubicacion.estado"
                  name="ubicacion.estado" 
                  value={formData.ubicacion.estado} 
                  onChange={handleChange}
                  required
                  style={styles.select}
                >
                  <option value="" disabled>Selecciona un estado</option>
                  {estadosMexico.map(estado => (
                    <option key={estado.nombre} value={estado.nombre}>{estado.nombre}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div style={styles.inputContainer}>
            <label style={styles.label} htmlFor="ubicacion.codigoPostal">Código Postal</label>
            <input
              id="ubicacion.codigoPostal"
              name="ubicacion.codigoPostal"
              type="text"
              value={formData.ubicacion.codigoPostal}
              onChange={handleChange}
              placeholder="Tu código postal"
              style={styles.input}
            />
          </div>
          
          {/* Cambiar por */}
          <div style={styles.sectionTitle}>¿Qué quieres a cambio?</div>
          
          <div style={styles.inputContainer}>
            <label style={styles.label} htmlFor="intercambioPor">Cambiar por:</label>
            <textarea
              id="intercambioPor"
              name="intercambioPor"
              value={formData.intercambioPor}
              onChange={handleChange}
              placeholder="Describe lo que te gustaría recibir a cambio"
              required
              style={styles.textarea}
              rows={3}
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
              {loading ? 'Publicando...' : 'Publicar Producto'}
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
    alignItems: 'flex-start',
    marginTop: '20px',
  },
  contentWrapper: {
    display: 'flex',
    gap: '40px',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    maxWidth: '1200px',
    width: '100%',
  },
  publishForm: {
    backgroundColor: 'white',
    border: '2px solid #2a9d8f',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
    width: '100%',
    maxWidth: '600px',
    flex: '1 1 600px',
  },
  formTitle: {
    fontSize: '24px',
    color: '#2a9d8f',
    marginBottom: '20px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: '18px',
    color: '#2a9d8f',
    marginTop: '20px',
    marginBottom: '15px',
    fontWeight: 'bold',
    borderBottom: '1px solid #e0e0e0',
    paddingBottom: '8px',
  },
  inputContainer: {
    marginBottom: '18px',
  },
  label: {
    display: 'block',
    fontSize: '15px',
    marginBottom: '6px',
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s',
    outline: 'none',
    '&:focus': {
      borderColor: '#2a9d8f',
      boxShadow: '0 0 0 2px rgba(42, 157, 143, 0.2)',
    },
  },
  textarea: {
    width: '100%',
    padding: '12px 15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    boxSizing: 'border-box',
    resize: 'vertical',
    minHeight: '100px',
    fontFamily: 'inherit',
  },
  select: {
    width: '100%',
    padding: '12px 15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    boxSizing: 'border-box',
    backgroundColor: 'white',
    cursor: 'pointer',
    appearance: 'none',
    backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' width=\'24\' height=\'24\'%3e%3cpath fill=\'none\' d=\'M0 0h24v24H0z\'/%3e%3cpath d=\'M12 15l-4.243-4.243 1.415-1.414L12 12.172l2.828-2.829 1.415 1.414z\' fill=\'%232a9d8f\'/%3e%3c/svg%3e")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 10px center',
    backgroundSize: '20px',
  },
  buttonContainer: {
    marginTop: '25px',
    textAlign: 'center',
  },
  publishButton: {
    backgroundColor: '#2a9d8f',
    color: 'white',
    border: 'none',
    padding: '14px 28px',
    borderRadius: '30px',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 8px rgba(42, 157, 143, 0.2)',
    '&:hover': {
      backgroundColor: '#218478',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 12px rgba(42, 157, 143, 0.3)',
    },
    '&:active': {
      transform: 'translateY(1px)',
    },
  },
  errorMessage: {
    color: '#e74c3c',
    fontSize: '14px',
    marginBottom: '12px',
    textAlign: 'center',
    padding: '8px',
    backgroundColor: '#fdecea',
    borderRadius: '6px',
  },
  imageContainer: {
    flex: '1 1 400px',
    backgroundColor: 'white',
    border: '2px solid #2a9d8f',
    padding: '24px',
    borderRadius: '16px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageTitle: {
    fontSize: '20px',
    color: '#2a9d8f',
    marginBottom: '5px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageSubtitle: {
    color: '#666',
    marginBottom: '20px',
    fontSize: '14px',
    textAlign: 'center',
  },
  imagePreviewContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '20px',
    justifyContent: 'center',
    width: '100%',
  },
  imagePreview: {
    position: 'relative',
    width: '100px',
    height: '100px',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid #ddd',
  },
  previewImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  removeImgButton: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    color: '#e74c3c',
    border: 'none',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  row: {
    display: 'flex',
    gap: '15px',
    marginBottom: '10px',
  },
  col: {
    flex: 1,
  },
};

export default PublishForm;