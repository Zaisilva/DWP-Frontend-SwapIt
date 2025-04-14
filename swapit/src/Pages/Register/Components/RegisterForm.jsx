import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../Styles/RegisterForm.module.css';
import FormInput from '../../../Components/UI/FormInput';
import Button from '../../../Components/UI/buttons';
import ErrorMessage from '../../../Components/UI/ErrorMessage';
import LoadingDots from '../../../Components/UI/LoadingDots';

const RegisterForm = ({ onSubmit, loading, error }) => {
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    estado: '',
    direccion: '',
    telefono: '', // Added phone field to state
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userData);
  };

  return (
    <div className={styles.formWrapper}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>        
        <div className={styles.formGroup}>
          <FormInput
            id="nombre"
            name="nombre"
            label="Nombre"
            value={userData.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <FormInput
            id="apellido"
            name="apellido"
            label="Apellido"
            value={userData.apellido}
            onChange={handleChange}
            placeholder="Apellido"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <FormInput
            id="estado"
            name="estado"
            label="Estado"
            value={userData.estado}
            onChange={handleChange}
            placeholder="Estado"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <FormInput
            id="direccion"
            name="direccion"
            label="Dirección"
            value={userData.direccion}
            onChange={handleChange}
            placeholder="Dirección"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <FormInput
            id="telefono"
            name="telefono"
            label="Teléfono"
            type="tel"
            value={userData.telefono}
            onChange={handleChange}
            placeholder="(123) 456-7890"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <FormInput
            id="email"
            name="email"
            label="Email"
            type="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="correo@ejemplo.com"
            required
          />
        </div>

        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <FormInput
            id="password"
            name="password"
            label="Password"
            type="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />
        </div>

        <div className={styles.fullWidth}>
          <ErrorMessage message={error} />
        </div>

        <div className={`${styles.buttonContainer} ${styles.fullWidth}`}>
          <Button 
            type="submit" 
            disabled={loading}
            className={styles.loginButton}
          >
            {loading ? <LoadingDots /> : 'Registrarse'}
          </Button>
        </div>

        <div className={`${styles.registerContainer} ${styles.fullWidth}`}>
          <span>¿Ya tienes cuenta? </span>
          <Link to="/login" className={styles.registerLink}>Inicia Sesión</Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;