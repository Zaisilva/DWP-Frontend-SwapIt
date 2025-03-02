import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './RegisterForm.module.css';
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
      <form onSubmit={handleSubmit} className={styles.registerForm}>        
        <div className={styles.formRow}>
          <FormInput
            id="nombre"
            name="nombre"
            label="Nombre"
            value={userData.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            required
          />

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

        <div className={styles.formRow}>
          <FormInput
            id="estado"
            name="estado"
            label="Estado"
            value={userData.estado}
            onChange={handleChange}
            placeholder="Estado"
            required
          />

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

        <ErrorMessage message={error} />

        <div className={styles.buttonContainer}>
          <Button 
            type="submit" 
            disabled={loading}
            className={styles.registerButton}
          >
            {loading ? <LoadingDots /> : 'Registrarse'}
          </Button>
        </div>

        <div className={styles.loginContainer}>
          <span>¿Ya tienes cuenta? </span>
          <Link to="/login" className={styles.loginLink}>Inicia Sesión</Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;