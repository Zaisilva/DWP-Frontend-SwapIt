import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import styles from './Layout.module.css';
import Logo from '../Components/UI/Logo';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };

  const handleProtectedNavigation = (path, requiredMessage) => {
    if (!isAuthenticated()) {
      setModalMessage(requiredMessage);
      setIsModalOpen(true);
      return;
    }
    navigate(path);
  };
  
  const handleModalOk = () => {
    setIsModalOpen(false);
    navigate('/login', { state: { from: { pathname: location.pathname } } });
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const navLinks = [
    { path: '/inicio', label: 'Inicio', protected: false },
    { 
      path: '/explorar', 
      label: 'Explorar', 
      protected: true,
      message: 'Necesitas iniciar sesión para explorar productos'
    },
    { 
      path: '/publicar', 
      label: 'Publicar', 
      protected: true,
      message: 'Necesitas iniciar sesión para publicar un producto'
    }
  ];

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo} aria-label="Logo de la aplicación">
          <Logo />
        </div>
        
        <nav className={styles.nav} aria-label="Navegación principal">
          <ul className={styles.navList}>
            {navLinks.map((link, index) => (
              <React.Fragment key={link.path}>
                {index > 0 && <li className={styles.navDivider}>|</li>}
                <li>
                  {link.protected ? (
                    <a 
                      className={styles.navLink} 
                      onClick={(e) => {
                        e.preventDefault();
                        handleProtectedNavigation(link.path, link.message);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link to={link.path} className={styles.navLink}>
                      {link.label}
                    </Link>
                  )}
                </li>
              </React.Fragment>
            ))}
          </ul>
        </nav>
        
        <div className={styles.headerActions}>
          {/* Link para el perfil */}
          <a 
            aria-label="Perfil de usuario" 
            onClick={(e) => {
              e.preventDefault();
              handleProtectedNavigation('/perfil', 'Necesitas iniciar sesión para acceder a tu perfil');
            }}
            style={{ cursor: 'pointer' }}
          >
            <button className={styles.iconButton}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
          </a>

          <Link to="/contactanos" aria-label="Contactanos">
            <button className={styles.iconButton}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </button>
          </Link>
        </div>
      </div>

      {/* Modal de alerta para usuarios no autenticados */}
      <Modal
        title="Inicio de sesión requerido"
        open={isModalOpen}
        onOk={handleModalOk}
        okText="Iniciar sesión"
        cancelText="Cancelar"
        onCancel={handleModalCancel}
        maskClosable={false} // Evita cierre al hacer clic fuera del modal
      >
        <p>{modalMessage}</p>
      </Modal>
    </header>
  );
};

export default Header;