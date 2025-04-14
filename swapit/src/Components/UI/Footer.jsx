import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaHeart, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => (
  <footer style={{
    backgroundColor: '#1a2a3a',
    color: 'white',
    padding: '3rem 2rem 1.5rem',
    borderTop: '4px solid #20b2aa'
  }}>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: '1200px',
      margin: '0 auto',
      textAlign: 'center'
    }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ 
          fontSize: '1.8rem', 
          fontWeight: '700',
          color: 'white',
          marginBottom: '1rem'
        }}>
          SwapIt
        </h2>
        <p style={{ 
          color: '#ccc', 
          maxWidth: '600px',
          margin: '0 auto 1.5rem'
        }}>
          La plataforma de intercambios más confiable para dar una segunda vida a tus objetos
        </p>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FaEnvelope style={{ marginRight: '0.5rem', color: '#20b2aa' }} />
            <span>contacto@swapit.com</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FaPhone style={{ marginRight: '0.5rem', color: '#20b2aa' }} />
            <span>(+52) 123 345 678</span>
          </div>
        </div>
      </div>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: 'white',
          textDecoration: 'none',
          transition: 'all 0.3s ease'
        }}>
          <FaFacebookF />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: 'white',
          textDecoration: 'none',
          transition: 'all 0.3s ease'
        }}>
          <FaTwitter />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: 'white',
          textDecoration: 'none',
          transition: 'all 0.3s ease'
        }}>
          <FaInstagram />
        </a>
      </div>
    </div>
    
    <div style={{
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      paddingTop: '1.5rem',
      textAlign: 'center',
      maxWidth: '1200px',
      margin: '0 auto',
      color: '#aaa',
      fontSize: '0.9rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <p>© {new Date().getFullYear()} SwapIt. Todos los derechos reservados.</p>
    </div>
  </footer>
);

export default Footer;