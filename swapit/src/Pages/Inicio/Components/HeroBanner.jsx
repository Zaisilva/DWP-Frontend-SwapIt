import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../Inicio.module.css';

const HeroBanner = () => (
  <section className={styles.heroBanner}>
    <div className={styles.heroContent}>
      <h1 className={styles.heroTitle}>Descubre el valor del intercambio</h1>
      <p className={styles.heroSubtitle}>
        Conecta, intercambia y renueva: dale una segunda vida a tus objetos
      </p>
    </div>
    <div className={styles.heroImageContainer}>
      <img 
        src="/inicio.jpg" 
        alt="SwapIt Intercambios" 
        className={styles.heroImage}
      />
    </div>
  </section>
);

export default HeroBanner;