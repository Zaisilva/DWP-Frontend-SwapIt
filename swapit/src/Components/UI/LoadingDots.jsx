import React from 'react';
import styles from './LoadingDots.module.css';

const LoadingDots = () => {
  return (
    <span className={styles.loadingText}>
      <span className={styles.loadingDot}></span>
      <span className={styles.loadingDot}></span>
      <span className={styles.loadingDot}></span>
    </span>
  );
};

export default LoadingDots;