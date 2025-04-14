import React from 'react';
import FeatureCard from './FeatureCard';
import { FaShieldAlt, FaHandHoldingUsd, FaUserFriends, FaLeaf } from 'react-icons/fa';
const Features = () => (
  <section 
  style={{
    padding: '5rem 2rem',
    background: '#fafafa',
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
      ¿Por qué elegir nuestra plataforma?
      <span style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80px',
        height: '4px',
        background: 'linear-gradient(90deg, #4a6bff, #77e1ff)',
        borderRadius: '2px'
      }}></span>
    </h2>
    <div 
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem',
      marginTop: '2rem'
    }}>
      <FeatureCard 
        icon={<FaShieldAlt size={24} />}
        title="Intercambios Fáciles" 
        description="Conocen los productos de otros usuarios y realizan intercambios rápidos."
      />
      <FeatureCard 
        icon={<FaHandHoldingUsd size={24} />}
        title="Sin comisiones" 
        description="Realiza tus intercambios sin costos adicionales."
      />
      <FeatureCard 
        icon={<FaUserFriends size={24} />}
        title="Comunidad activa" 
        description="Miles de usuarios intercambiando en diferentes categorías."
      />
      <FeatureCard 
        icon={<FaLeaf size={24} />}
        title="Impacto positivo" 
        description="Contribuye a la economía circular reduciendo tu huella ecológica."
      />
    </div>
  </section>
);

export default Features;