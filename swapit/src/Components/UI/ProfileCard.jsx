import React from 'react';

const ProfileCard = ({ name, location, rating }) => {
  return (
    <div style={styles.card}>
      {/* Icono */}
      <div style={styles.iconContainer}>
        <span style={styles.icon}>👤</span>
      </div>
      {/* Nombre y ubicación */}
      <div style={styles.info}>
        <h3 style={styles.name}>{name}</h3>
        <p style={styles.location}>{location}</p>
      </div>
      {/* Estrellas */}
      <div style={styles.rating}>
        {'⭐'.repeat(rating)}
      </div>
    </div>
  );
};

const styles = {
  card: {
    width: '250px',
    height: '250px',
    borderRadius: '16px',
    border: '2px solid #2a9d8f',
    padding: '16px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fafafa',
  },
  iconContainer: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: '#e0f2f1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '12px',
  },
  icon: {
    fontSize: '48px',
    color: '#2a9d8f',
  },
  info: {
    textAlign: 'center',
  },
  name: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  },
  location: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '8px',
  },
  rating: {
    fontSize: '20px',
    color: '#ffc107',
  },
};

export default ProfileCard;
