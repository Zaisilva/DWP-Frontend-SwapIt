import React from 'react';
import { Mail, Phone, MessageCircle } from 'lucide-react';

const ContactButtons = () => {
  const styles = {
    contactButtonsContainer: {
      display: 'flex',
      justifyContent: 'center',
      padding: '10px',
      margin: '20px auto',
      maxWidth: '600px',
    },
    contactButtons: {
      display: 'flex',
      justifyContent: 'center',
      gap: '25px',
      padding: '20px',
      border: '1px solid rgba(63, 209, 193, 0.3)',
      borderRadius: '16px',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
      width: '100%',
    },
    contactButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#2d3748',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '12px 15px',
      borderRadius: '12px',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      width: '100px',
    },
    iconContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f0fdfa',
      width: '56px',
      height: '56px',
      borderRadius: '50%',
      marginBottom: '10px',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 8px rgba(63, 209, 193, 0.2)',
      border: '1px solid rgba(63, 209, 193, 0.2)',
    },
    iconLabel: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#4a5568',
      marginTop: '5px',
      fontFamily: '"Nunito", "Segoe UI", sans-serif',
      letterSpacing: '0.3px',
      textAlign: 'center',
    }
  };

  // Función para manejar hover con animación mejorada
  const handleMouseOver = (e) => {
    const button = e.currentTarget;
    button.style.transform = 'translateY(-3px)';
    button.style.backgroundColor = '#f8f9fa';
    
    const iconContainer = button.querySelector('.icon-container');
    iconContainer.style.backgroundColor = '#3fd1c1';
    iconContainer.style.color = '#ffffff';
    iconContainer.style.boxShadow = '0 4px 12px rgba(63, 209, 193, 0.4)';
    
    const label = button.querySelector('.icon-label');
    label.style.color = '#3fd1c1';
  };

  const handleMouseOut = (e) => {
    const button = e.currentTarget;
    button.style.transform = 'translateY(0)';
    button.style.backgroundColor = 'transparent';
    
    const iconContainer = button.querySelector('.icon-container');
    iconContainer.style.backgroundColor = '#f0fdfa';
    iconContainer.style.color = '#2d3748';
    iconContainer.style.boxShadow = '0 2px 8px rgba(63, 209, 193, 0.2)';
    
    const label = button.querySelector('.icon-label');
    label.style.color = '#4a5568';
  };

  return (
    <div style={styles.contactButtonsContainer}>
      <div style={styles.contactButtons}>
        <a 
          href="mailto:contacto@empresa.com" 
          style={styles.contactButton}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <div className="icon-container" style={styles.iconContainer}>
            <Mail size={22} strokeWidth={2} />
          </div>
          <span className="icon-label" style={styles.iconLabel}>Email</span>
        </a>
        
        <a 
          href="tel:+123456789" 
          style={styles.contactButton}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <div className="icon-container" style={styles.iconContainer}>
            <Phone size={22} strokeWidth={2} />
          </div>
          <span className="icon-label" style={styles.iconLabel}>Llamar</span>
        </a>
        
        <a 
          href="https://wa.me/123456789" 
          style={styles.contactButton}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <div className="icon-container" style={styles.iconContainer}>
            <MessageCircle size={22} strokeWidth={2} />
          </div>
          <span className="icon-label" style={styles.iconLabel}>WhatsApp</span>
        </a>
      </div>
    </div>
  );
};

export default ContactButtons;