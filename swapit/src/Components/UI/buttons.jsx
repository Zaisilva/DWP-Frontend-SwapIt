import React from 'react';
import styles from '../styles/buttons.module.css';

const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  onClick, 
  className = '', 
  ...props 
}) => {
  const buttonClasses = `
    ${styles.button} 
    ${styles[variant]} 
    ${styles[size]} 
    ${disabled ? styles.disabled : ''} 
    ${className}
  `;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;