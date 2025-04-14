import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../Styles/LoginForm.module.css';
import FormInput from '../../../Components/UI/FormInput';
import Button from '../../../Components/UI/buttons';
import ErrorMessage from '../../../Components/UI/ErrorMessage';
import LoadingDots from '../../../Components/UI/LoadingDots';

const LoginForm = ({ onSubmit, loading, error }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(credentials);
  };

  return (
    <div className={styles.formWrapper}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        
        <FormInput
          id="email"
          name="email"
          label="Email"
          type="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="correo@ejemplo.com"
          required
        />
        
        <FormInput
          id="password"
          name="password"
          label="Contraseña"
          type="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
        />
        
        <ErrorMessage message={error} />
        
        <div className={styles.buttonContainer}>
          <Button 
            type="submit" 
            disabled={loading}
            className={styles.loginButton}
          >
            {loading ? <LoadingDots /> : 'Iniciar Sesión'}
          </Button>
        </div>
        
        <div className={styles.labelContainer}>
          <Link to="/recuperar-password" className={styles.forgotPassword}>
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        
        <div className={styles.registerContainer}>
          <span>¿No tienes cuenta? </span>
          <Link to="/register" className={styles.registerLink}>Regístrate</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;