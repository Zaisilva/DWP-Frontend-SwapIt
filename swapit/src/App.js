import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import MainLayout from './Layouts/MainLayout';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register'; 
import Comunidad from './Pages/Comunidad/Comunidad';
import Inicio from './Pages/Inicio/Inicio';
import Error from './Pages/Error/Error';
import Explorar from './Pages/Explorar/Explorar';
import Producto from './Pages/Producto/Producto';
import Publicar from './Pages/Publicar/Publicar';
import Perfil from './Pages/Perfil/Perfil';
import Contactanos from './Pages/Contactanos/Contactanos';
import { Modal } from 'antd';
import { isAuthenticated } from './services/authService';
import MisProductos from './Pages/Perfil/Components/MisProductos';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    if (!isAuthenticated()) {
      setIsModalOpen(true);
    }
  }, []);
  
  const handleModalOk = () => {
    setIsModalOpen(false);
    navigate('/login', { state: { from: location } });
  };
  
  const handleModalCancel = () => {
    setIsModalOpen(false);
    navigate('/inicio', { replace: true });
  };
  
  if (!isAuthenticated()) {
    return (
      <>
        <Modal
          title={<div style={{ textAlign: 'center', fontSize: '22px', fontWeight: '500', color: '#20b2aa' }}>
            ¡Bienvenido a SwapIt!
          </div>}
          open={isModalOpen}
          onOk={handleModalOk}
          okText="Iniciar sesión"
          cancelText="Ir a inicio"
          onCancel={handleModalCancel}
          maskClosable={false}
          centered
          width={450}
          bodyStyle={{ padding: '30px 24px' }}
          okButtonProps={{ 
            style: { background: '#1b2a41', borderColor: '#1b2a41', fontWeight: '500' } 
          }}
          cancelButtonProps={{
            style: { fontWeight: '500' }
          }}
          style={{ borderRadius: '12px', overflow: 'hidden' }}
        >
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <div style={{ 
              fontSize: '52px', 
              marginBottom: '20px' 
            }}>
              👋
            </div>
            <p style={{ 
              fontSize: '17px', 
              marginBottom: '16px',
              color: '#333',
              lineHeight: '1.5'
            }}>
              Para disfrutar de todas las funcionalidades y seguir explorando nuestro contenido, te invitamos a unirte a nuestra comunidad
            </p>
            <p style={{ 
              fontSize: '15px', 
              color: '#666',
              marginBottom: '5px',
              fontStyle: 'italic'
            }}>
              Únete ahora y descubre todo lo que tenemos para ti
            </p>
          </div>
        </Modal>
        <MainLayout>
          <div style={{ height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ fontSize: '24px', marginBottom: '16px', color: '#4CAF50' }}>✨</div>
            <p>Preparando tu experiencia...</p>
          </div>
        </MainLayout>
      </>
    );
  }
  
  return children;
};

// Componente para rutas solo accesibles cuando NO estás autenticado
const AuthRoute = ({ children }) => {
  const navigate = useNavigate();
  
  React.useEffect(() => {
    if (isAuthenticated()) {
      // Si hay una ruta guardada para redirección, usa esa
      const redirectPath = localStorage.getItem('redirectAfterLogin') || '/explorar';
      localStorage.removeItem('redirectAfterLogin'); // Limpia después de usar
      navigate(redirectPath, { replace: true });
    }
  }, [navigate]);
  
  if (isAuthenticated()) {
    return null; // No renderiza nada mientras se redirige
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas de autenticación */}
        <Route path="/login" element={
          <AuthRoute>
            <Login />
          </AuthRoute>
        } />
        <Route path="/register" element={
          <AuthRoute>
            <Register />
          </AuthRoute>
        } />
        
        {/* Rutas públicas */}
        <Route path="/" element={<Navigate to="/inicio" replace />} />
        
        <Route path="/inicio" element={
          <MainLayout>
            <Inicio />
          </MainLayout>
        } />
        
        <Route path="/contactanos" element={
          <MainLayout>
            <Contactanos />
          </MainLayout>
        } />
        
        {/* Rutas protegidas */}
        <Route path="/comunidad" element={
          <ProtectedRoute>
            <MainLayout>
              <Comunidad />
            </MainLayout>
          </ProtectedRoute>
        } />
                {/* Rutas protegidas */}
        <Route path="/mis-publicaciones" element={
          <ProtectedRoute>
            <MainLayout>
              <MisProductos />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/explorar" element={
          <ProtectedRoute>
            <MainLayout>
              <Explorar />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        {/* Ruta actualizada para producto con parámetro ID */}
        <Route path="/producto/:id?" element={
          <ProtectedRoute>
            <MainLayout>
              <Producto />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/publicar" element={
          <ProtectedRoute>
            <MainLayout>
              <Publicar />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/perfil" element={
          <ProtectedRoute>
            <MainLayout>
              <Perfil />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        {/* Rutas de error */}
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Navigate to="/error" replace />} />
      </Routes>
    </Router>
  );
}

export default App;