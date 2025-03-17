import React, { useState } from 'react';
import Button from '../../../Components/UI/buttons';

const ProfileForm = ({ onSubmit, loading, error }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

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
      {/* Información personal */}
      <div style={styles.section}>
        <h3 style={styles.title}>Información personal</h3>
        <div style={styles.row}>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Nombre</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Nombre"
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Apellido</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Apellido"
              style={styles.input}
            />
          </div>
        </div>
        <div style={styles.row}>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Correo</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo"
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Teléfono</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Teléfono"
              style={styles.input}
            />
          </div>
        </div>

        {/* ✅ Botón centrado correctamente */}
        <div style={styles.buttonContainer}>
          <Button 
            type="submit"
            disabled={loading}
          >
            {loading ? 'Guardando...' : 'Guardar'}
          </Button>
        </div>
      </div>

      <hr style={styles.divider} />

      {/* Cambiar contraseña */}
      <div style={styles.section}>
        <h3 style={styles.title}>Cambiar contraseña</h3>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Contraseña actual</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            placeholder="Contraseña actual"
            style={styles.input}
          />
        </div>
        <div style={styles.row}>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Nueva contraseña</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Nueva contraseña"
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <label style={styles.label}>Confirmar contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirmar contraseña"
              style={styles.input}
            />
          </div>
        </div>

        {/* ✅ Botón centrado correctamente */}
        <div style={styles.buttonContainer}>
          <Button 
            type="submit"
            disabled={loading}
          >
            {loading ? 'Guardando...' : 'Guardar'}
          </Button>
        </div>
      </div>
    </form>
  );
};

const styles = {
  container: {
    width: '600px',
    padding: '24px',
    borderRadius: '16px',
    border: '2px solid #2a9d8f',
    backgroundColor: '#fafafa',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
  },
  section: {
    marginBottom: '20px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '12px',
  },
  row: {
    display: 'flex',
    gap: '16px',
    marginBottom: '12px',
  },
  inputContainer: {
    flex: 1,
  },
  label: {
    display: 'block',
    fontSize: '14px',
    marginBottom: '6px',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center', // ✅ Centrar botón
    marginTop: '20px',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid #ccc',
    margin: '20px 0',
  },
};

export default ProfileForm;
