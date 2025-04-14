import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import Header from '../../Layouts/Header';
import styles from '../Styles/Login.module.css';
import { onLogin } from '../../services/authService';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || '/explorar';

  const handleLogin = async (credentials) => {
    setLoading(true);
    setError('');
    
    try {
      await onLogin({
        username: credentials.email,
        password: credentials.password
      }, navigate, from);
    } catch (err) {
      setError('Ocurrió un error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <Header />
      <div className={styles.loginContainer}>
        <LoginForm 
          onSubmit={handleLogin} 
          loading={loading} 
          error={error} 
        />
      </div>
    </div>
  );
};

export default Login;