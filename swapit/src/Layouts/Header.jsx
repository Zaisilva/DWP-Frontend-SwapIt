import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Layout.module.css';
import Logo from '../Components/UI/Logo';

const Header = () => {
  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/explorar', label: 'Explorar' },
    { path: '/publicar', label: 'Publicar' }
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
                  <Link to={link.path} className={styles.navLink}>
                    {link.label}
                  </Link>
                </li>
              </React.Fragment>
            ))}
          </ul>
        </nav>
        
        <div className={styles.headerActions}>
          <button 
            className={styles.iconButton} 
            aria-label="Perfil de usuario"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
          <button 
            className={styles.iconButton} 
            aria-label="Ayuda"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
