import React, { useState } from 'react';

const ImageUpload = ({ onImageUpload }) => {
  const [preview, setPreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onImageUpload(file);
    }
  };

  return (
    <div style={styles.wrapper}>
      <label htmlFor="imageUpload" style={styles.label}>
        {preview ? (
          <img src={preview} alt="Preview" style={styles.imagePreview} />
        ) : (
          <div style={styles.placeholder}>
            <span style={styles.uploadText}>Subir Imagen</span>
          </div>
        )}
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={handleImageUpload}
          style={styles.hiddenInput}
        />
      </label>
    </div>
  );
};

const styles = {
  wrapper: {
    width: '300px',
    height: '200px',
    borderRadius: '16px',
    border: '2px dashed #ccc',
    overflow: 'hidden',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    backgroundColor: '#fafafa',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#aaa',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'background-color 0.3s ease',
  },
  uploadText: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#2a9d8f',
  },
  hiddenInput: {
    display: 'none',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '16px',
    transition: 'transform 0.3s ease',
  },
};

export default ImageUpload;
