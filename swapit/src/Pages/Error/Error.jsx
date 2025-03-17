import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Layouts/Header';

const Error404 = () => { 
  return (
    <div style={styles.errorPage}>
      <Header />
      <div style={styles.errorContent}>
        <div style={styles.textSection}>
          <h1 style={styles.heading}>404</h1>
          <h2 style={styles.subheading}>Página no encontrada</h2>
          <p style={styles.paragraph}>
            Lo sentimos, la página que buscas no ha sido encontrada.
          </p>
          <p style={styles.funnyQuote}>
         Verifica el enlace o regresa al inicio          </p>
          <Link to="/" style={styles.homeLink}>
            <span style={styles.homeLinkText}>Volver a la página principal</span>
          </Link>
        </div>
        <div style={styles.iconSection}>
          <svg 
            style={styles.errorIcon} 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9 9h.01"></path>
            <path d="M15 9h.01"></path>
            <path d="M8 13h8"></path>
            <path d="M9 16h6"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

const styles = {
  errorPage: {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    display: 'flex',
    flexDirection: 'column',
  },
  errorContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '40px',
    padding: '40px 20px',
    flex: 1,
    maxWidth: '1200px',
    margin: '0 auto',
  },
  textSection: {
    maxWidth: '500px',
  },
  heading: {
    fontSize: '6rem',
    fontWeight: '700',
    color: '#20b2aa',
    margin: '0 0 10px 0',
    lineHeight: '1',
  },
  subheading: {
    fontSize: '2rem',
    fontWeight: '500',
    color: '#333',
    marginBottom: '20px',
  },
  paragraph: {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '20px',
    lineHeight: '1.5',
  },
  funnyQuote: {
    fontSize: '1.1rem',
    fontStyle: 'italic',
    color: '#888',
    marginBottom: '30px',
    padding: '15px',
    borderLeft: '4px solid #20b2aa',
    backgroundColor: '#eef0ff',
    borderRadius: '0 8px 8px 0',
  },
  homeLink: {
    display: 'inline-block',
    padding: '12px 24px',
    backgroundColor: '#20b2aa',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 5px rgba(92, 106, 196, 0.3)',
  },
  homeLinkText: {
    display: 'inline-block',
  },
  iconSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorIcon: {
    width: '200px',
    height: '200px',
    color: '#20b2aa',
  },
  '@media (max-width: 768px)': {
    errorContent: {
      flexDirection: 'column-reverse',
      textAlign: 'center',
    },
    iconSection: {
      marginBottom: '30px',
    },
    funnyQuote: {
      borderLeft: 'none',
      borderTop: '4px solid #20b2aa',
      borderRadius: '0 0 8px 8px',
    },
  }
};

export default Error404;