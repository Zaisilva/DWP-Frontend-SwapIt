import React, { useState, useEffect } from 'react';
import { message, Spin } from 'antd';
import ProfileForm from './Components/ProfileForm';
import ProfileCard from '../../Components/UI/ProfileCard';
import { fetchUserProfile, updateUserProfile, updatePassword } from '../../services/profileService';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const data = await fetchUserProfile();
        setUserData(data);
      } catch (err) {
        message.error('Error al cargar datos del perfil');
        setError('Error al cargar datos del perfil');
      } finally {
        setLoading(false);
      }
    };

    getUserProfile();
  }, []);

  const handleSubmit = async (formData) => {
    setSubmitLoading(true);
    setError('');
    
    try {
      if (formData.type === 'profile') {
        await updateUserProfile({
          firstName: formData.data.firstName,
          lastName: formData.data.lastName,
          email: formData.data.email,
          phone: formData.data.phone
        });
        
        // Update user data
        setUserData(prev => ({
          ...prev,
          nombre: formData.data.firstName,
          apellido: formData.data.lastName,
          email: formData.data.email,
          telefono: formData.data.phone
        }));
        
        message.success('Perfil actualizado correctamente');
        
      } else if (formData.type === 'password') {
        await updatePassword({
          currentPassword: formData.data.currentPassword,
          newPassword: formData.data.newPassword,
          confirmPassword: formData.data.confirmPassword
        });
        
        message.success('Contraseña actualizada correctamente');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Ocurrió un error al actualizar');
      throw err;
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleLogout = () => {
    message.success('Sesión cerrada correctamente');
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <ProfileCard 
        name={`${userData?.nombre || ''} ${userData?.apellido || ''}`}
        location={userData?.direccion}
        estado={userData?.estado}
        rating={5}
        onLogout={handleLogout}
      />
      <ProfileForm 
        userData={userData}
        onSubmit={handleSubmit} 
        loading={submitLoading}
        error={error}
      />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start', 
    gap: '40px',
    marginTop: '40px', 
    padding: '0 20px',
    maxWidth: '1200px',
    margin: '40px auto',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60vh',
  }
};

export default ProfilePage;