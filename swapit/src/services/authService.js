  import { message } from 'antd';
  import api from './api';


  export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    try {
      // Decodificar el token JWT (sin verificación)
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
      
      // Comprobar si ha expirado
      return payload.exp * 1000 > Date.now();
    } catch (error) {
      console.error('Error al verificar el token:', error);
      return false;
    }
  };

  export const onRegister = async (values, navigate) => {
      try {
        await api.post('/auth/register', values);
        message.success('¡Usuario registrado exitosamente!');
        
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 2000);
      } catch (error) {
        if (error.response?.data?.error) {
          message.error(error.response.data.error);
        } else if (error.response?.status === 400) {
          message.error('El usuario ya existe');
        } else {
          message.error('Error en el registro. Por favor, intenta de nuevo');
        }
      }
  };

  export const onLogin = async (values, navigate, from = '/explorar') => {
      try {
        const response = await api.post('/auth/login', {
          email: values.username,
          password: values.password
        });
    
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userData', JSON.stringify({
          username: response.data.user.username,
          userType: response.data.user.tipo,
          userId: response.data.user.id,
        }));
    
        message.success(`¡Bienvenido ${response.data.user.username}!`);
        navigate(from, { replace: true }); 
      } catch (error) {
        // Manejo de errores igual que antes
        if (error.response?.data?.error) {
          message.error(error.response.data.error);
        } else if (error.response?.status === 401) {
          message.error('Email o contraseña incorrectos');
        } else {
          message.error('Error al iniciar sesión. Por favor, intenta de nuevo');
        }
        throw error;
      }
  };

  export const onLogout = (navigate) => {
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      
      navigate('/login', { replace: true });
      message.success('Sesión cerrada correctamente');
  };