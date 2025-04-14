import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from './Components/RegisterForm';
import Header from '../../Layouts/Header';
import styles from '../Styles/Login.module.css'; // Using the same CSS module as Login
import { onRegister } from '../../services/authService';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (formData) => {
    setLoading(true);
    setError('');
    
    try {
      await onRegister(formData, navigate);
    } catch (err) {
      setError('Ocurrió un error al registrar el usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}> {/* Using loginPage class instead of registerPage */}
      <Header />
      <div className={styles.loginContainer}> {/* Using loginContainer class instead of registerContainer */}
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