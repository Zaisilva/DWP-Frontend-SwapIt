// src/components/UserInfo.jsx
import React from 'react';
import { User, Star } from 'lucide-react';

const UserInfo = ({ username, rating = 4 }) => {
  // Genera estrellas basadas en la calificación
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={16}
          fill={i < rating ? 'gold' : 'none'} 
          color={i < rating ? 'gold' : 'gray'} 
        />
      );
    }
    return stars;
  };

  const styles = {
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      border: '2px solid #3fd1c1',
      borderRadius: '8px',
      marginBottom: '15px',
    },
    userAvatar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      marginRight: '10px',
      backgroundColor: '#f0f0f0',
      borderRadius: '50%',
    },
    userDetails: {
      display: 'flex',
      flexDirection: 'column',
    },
    username: {
      fontWeight: 'bold',
    },
    userRating: {
      display: 'flex',
      gap: '2px',
    }
  };

  return (
    <div style={styles.userInfo}>
      <div style={styles.userAvatar}>
        <User size={24} />
      </div>
      <div style={styles.userDetails}>
        <div style={styles.username}>{username}</div>
        <div style={styles.userRating}>
          {renderStars()}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;