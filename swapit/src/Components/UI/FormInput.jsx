import React, { useState } from 'react';
import styles from './FormInput.module.css';

const FormInput = ({ 
  id, 
  name, 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  required = false 
}) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  return (
    <div className={styles.formGroup}>
      <label htmlFor={id} className={styles.formLabel}>{label}</label>
      <div className={`${styles.inputWrapper} ${focused ? styles.inputFocused : ''}`}>
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={styles.formInput}
          placeholder={placeholder}
          required={required}
        />
      </div>
    </div>
  );
};

export default FormInput;