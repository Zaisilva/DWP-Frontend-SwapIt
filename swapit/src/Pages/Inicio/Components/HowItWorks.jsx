import React from 'react';
import { Link } from 'react-router-dom';

const HowItWorks = () => (
  <section style={{
    padding: '5rem 2rem',
    background: 'linear-gradient(to bottom, #f8f9fa, #ffffff)',
    maxWidth: '1200px',
    margin: '0 auto'
  }}>
    <h2 style={{
      fontSize: '2.5rem',
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: '3rem',
      color: '#333',
      position: 'relative',
      paddingBottom: '1rem'
    }}>
      ¿Cómo funciona?
      <span style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80px',
        height: '4px',
        background: 'linear-gradient(90deg, #20b2aa, #5ce1e6)',
        borderRadius: '2px'
      }}></span>
    </h2>
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      maxWidth: '1200px',
      margin: '0 auto',
      flexWrap: 'wrap',
      gap: '1.5rem'
    }}>
      <div style={{
        flex: '1',
        minWidth: '220px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2rem 1rem',
        position: 'relative',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.05)',
        transition: 'transform 0.3s ease',
        cursor: 'pointer',
        ':hover': {
          transform: 'translateY(-5px)'
        }
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#20b2aa',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1.5rem',
          marginBottom: '1rem',
          boxShadow: '0 5px 15px rgba(32, 178, 170, 0.3)'
        }}>1</div>
        <h3 style={{
          fontSize: '1.4rem',
          marginBottom: '0.5rem',
          color: '#1a2a3a'
        }}>Regístrate</h3>
        <p style={{
          color: '#555',
          lineHeight: '1.5'
        }}>Crea tu cuenta gratuita en menos de 2 minutos</p>
      </div>
      
      <div style={{
        flex: '1',
        minWidth: '220px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2rem 1rem',
        position: 'relative',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.05)',
        transition: 'transform 0.3s ease',
        cursor: 'pointer',
        ':hover': {
          transform: 'translateY(-5px)'
        }
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#20b2aa',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1.5rem',
          marginBottom: '1rem',
          boxShadow: '0 5px 15px rgba(32, 178, 170, 0.3)'
        }}>2</div>
        <h3 style={{
          fontSize: '1.4rem',
          marginBottom: '0.5rem',
          color: '#1a2a3a'
        }}>Publica</h3>
        <p style={{
          color: '#555',
          lineHeight: '1.5'
        }}>Sube los artículos o servicios que quieres intercambiar</p>
      </div>
      
      <div style={{
        flex: '1',
        minWidth: '220px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2rem 1rem',
        position: 'relative',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.05)',
        transition: 'transform 0.3s ease',
        cursor: 'pointer',
        ':hover': {
          transform: 'translateY(-5px)'
        }
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#20b2aa',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1.5rem',
          marginBottom: '1rem',
          boxShadow: '0 5px 15px rgba(32, 178, 170, 0.3)'
        }}>3</div>
        <h3 style={{
          fontSize: '1.4rem',
          marginBottom: '0.5rem',
          color: '#1a2a3a'
        }}>Conecta</h3>
        <p style={{
          color: '#555',
          lineHeight: '1.5'
        }}>Encuentra usuarios con intereses afines y comunícate con ellos</p>
      </div>
      
      <div style={{
        flex: '1',
        minWidth: '220px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2rem 1rem',
        position: 'relative',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.05)',
        transition: 'transform 0.3s ease',
        cursor: 'pointer',
        ':hover': {
          transform: 'translateY(-5px)'
        }
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#20b2aa',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1.5rem',
          marginBottom: '1rem',
          boxShadow: '0 5px 15px rgba(32, 178, 170, 0.3)'
        }}>4</div>
        <h3 style={{
          fontSize: '1.4rem',
          marginBottom: '0.5rem',
          color: '#1a2a3a'
        }}>Intercambia</h3>
        <p style={{
          color: '#555',
          lineHeight: '1.5'
        }}>Realiza el trueque y deja tu valoración</p>
      </div>
    </div>
    <div style={{
      textAlign: 'center',
      marginTop: '3rem'
    }}>
      
    </div>
  </section>
);

export default HowItWorks;