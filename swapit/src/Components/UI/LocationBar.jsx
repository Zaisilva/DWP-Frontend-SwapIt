
import React from 'react';
import { MapPin } from 'lucide-react';

function LocationBar() {
  return (
    <div style={styles.locationBar}>
      <MapPin 
        size={20} 
        color="#e74c3c" 
        style={styles.locationIcon} 
      />
      <span style={styles.locationText}>Querétaro, Qro</span>
    </div>
  );
}

const styles = {
  locationBar: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 15px',
    marginBottom: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    transition: 'all 0.3s ease',
  },
  locationIcon: {
    marginRight: '12px',
  },
  locationText: {
    fontWeight: '600',
    fontSize: '15px',
    color: '#2c3e50',
  },
};

export default LocationBar;
