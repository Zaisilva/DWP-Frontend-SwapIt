import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import Header from '../../Layouts/Header';
import { loginUser } from '../../services/authService';
import styles from './Login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (credentials) => {
    try {
      setLoading(true);
      setError('');
      await loginUser(credentials);
      navigate('/comunidad');
    } catch (err) {
      setError('Credenciales incorrectas. Por favor intenta nuevamente.');
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