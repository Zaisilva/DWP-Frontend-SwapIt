import React from 'react';

const FeatureCard = ({ icon, title, description }) => (
  <div style={{
    background: 'linear-gradient(135deg, #ffffff, #f8f9fa)',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    height: '100%',
    border: '1px solid rgba(0, 0, 0, 0.05)',
    cursor: 'pointer',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)'
    }
  }}>
    <div style={{
      fontSize: '2.5rem',
      color: '#4a6bff',
      marginBottom: '1.5rem',
      background: 'rgba(74, 107, 255, 0.1)',
      borderRadius: '50%',
      width: '80px',
      height: '80px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {icon}
    </div>
    <h3 style={{
      fontSize: '1.5rem',
      fontWeight: '600',
      marginBottom: '1rem',
      color: '#333'
    }}>
      {title}
    </h3>
    <p style={{
      fontSize: '1rem',
      lineHeight: '1.6',
      color: '#666',
      margin: 0
    }}>
      {description}
    </p>
  </div>
);

export default FeatureCard;