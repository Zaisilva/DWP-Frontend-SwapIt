import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './Layouts/MainLayout';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register'; 
import Comunidad from './Pages/Comunidad/Comunidad';
import Inicio from './Pages/Inicio/Inicio';
import Error from './Pages/Error/Error';
import Explorar from './Pages/Explorar/Explorar';
import Producto from './Pages/Producto/Producto';
import Publicar from './Pages/Publicar/Publicar';
import Perfil from './Pages/Perfil/Perfil'
import Contactanos from './Pages/Contactanos/Contactanos';
/*const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};*/ 

/*const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/inicio" replace />;
  }
  return children;
};*/

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Redirigir la ruta raíz a /inicio */}
        <Route path="/" element={<Navigate to="/inicio" replace />} />

        {/* Rutas protegidas (comentadas por ahora) */}
        <Route path="/inicio" element={
          // <ProtectedRoute>
            <MainLayout>
              <Inicio />
            </MainLayout>
          // </ProtectedRoute>
        } />

        <Route path="/comunidad" element={
          // <ProtectedRoute>
            <MainLayout>
              <Comunidad />
            </MainLayout>
          // </ProtectedRoute>
        } />
           <Route path="/explorar" element={
          // <ProtectedRoute>
            <MainLayout>
              <Explorar />
            </MainLayout>
          // </ProtectedRoute>
        } />
                <Route path="/producto" element={
          // <ProtectedRoute>
            <MainLayout>
              <Producto />
            </MainLayout>
          // </ProtectedRoute>
        } />
       <Route path="/publicar" element={
          // <ProtectedRoute>
            <MainLayout>
              <Publicar />
            </MainLayout>
          // </ProtectedRoute>
        } />
               <Route path="/perfil" element={
          // <ProtectedRoute>
            <MainLayout>
              <Perfil />
            </MainLayout>
          // </ProtectedRoute>
        } />
               <Route path="/contactanos" element={
          // <ProtectedRoute>
            <MainLayout>
              <Contactanos />
            </MainLayout>
          // </ProtectedRoute>
        } />
        {/* Ruta de error */}
        <Route path="/error" element={<Error />} />
        {/* Ruta no encontrada */}
        <Route path="*" element={<Navigate to="/error" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
