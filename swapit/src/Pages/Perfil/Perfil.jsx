import React, { useState, useEffect } from 'react';
import { message, Spin, Button } from 'antd';
import { ShopOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ProfileForm from './Components/ProfileForm';
import ProfileCard from '../../Components/Cards/ProfileCard';
import { fetchUserProfile, updateUserProfile, updatePassword } from '../../services/profileService';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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

  const handleVerPublicaciones = () => {
    navigate('/mis-publicaciones');
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
      <div style={styles.leftColumn}>
        <ProfileCard 
          name={`${userData?.nombre || ''} ${userData?.apellido || ''}`}
          location={userData?.direccion}
          estado={userData?.estado}
          rating={5}
          onLogout={handleLogout}
        />
        <Button
          type="primary"
          size="large"
          icon={<ShopOutlined />}
          onClick={handleVerPublicaciones}
          style={styles.publicacionesButton}
        >
          Ver Mis Publicaciones
        </Button>
      </div>
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
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60vh',
  },
  publicacionesButton: {
    width: '100%',
    height: '50px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  }
};

export default ProfilePage;