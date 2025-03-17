// src/components/ItemPreview.jsx
import React from 'react';
import { Shirt } from 'lucide-react';

const ItemPreview = () => {
  const styles = {
    itemPreview: {
      border: '1px solid #000',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px',
      marginBottom: '20px',
    },
    iconContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }
  };

  return (
    <div style={styles.itemPreview}>
      <div style={styles.iconContainer}>
        <Shirt size={100} />
      </div>
    </div>
  );
};

export default ItemPreview;