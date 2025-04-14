import React from 'react';
import Header from '../../Layouts/Header';
import styles from './Inicio.module.css';
import {
  HeroBanner,
  Features,
  HowItWorks,

  Footer
} from './Components';

const Inicio = () => {
  return (
    <div className={styles.inicioPage}>
      <main className={styles.mainContent}>
        <HeroBanner />
        <Features />
        <HowItWorks />
    
      </main>
      <Footer />
    </div>
  );
};

export default Inicio;