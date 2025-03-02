import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from './Components/RegisterForm';
import Header from '../../Layouts/Header';
import { registerUser } from '../../services/authService';
import styles from './Register.module.css';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (userData) => {
    try {
      setLoading(true);
      setError('');
      await registerUser(userData);
      navigate('/login', { state: { message: 'Registro exitoso. Por favor inicia sesión.' } });
    } catch (err) {
      setError('Error al registrarse. Verifique sus datos e intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerPage}>
      <Header />
      <div className={styles.registerContainer}>
        <RegisterForm 
          onSubmit={handleRegister} 
          loading={loading} 
          error={error} 
        />
      </div>
    </div>
  );
};

export default Register;