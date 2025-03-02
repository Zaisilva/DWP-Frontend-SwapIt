import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './Layouts/MainLayout';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register'; // Importamos la nueva página de registro
import Comunidad from './Pages/Comunidad/Comunidad';

const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/" element={
          <MainLayout>
            <Navigate to="/comunidad" replace />
          </MainLayout>
        } />
        <Route path="/comunidad" element={
          <ProtectedRoute>
            <MainLayout>
              <Comunidad />
            </MainLayout>
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
