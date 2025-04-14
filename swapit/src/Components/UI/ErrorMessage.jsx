import React from 'react';
import styles from '../styles/ErrorMessage.module.css';

const ErrorMessage = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className={styles.errorContainer}>
      <p className={styles.errorText}>{message}</p>
    </div>
  );
};

export default ErrorMessage;