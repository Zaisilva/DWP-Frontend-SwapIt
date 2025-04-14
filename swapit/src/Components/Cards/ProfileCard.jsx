import React from 'react';
import { Card, Avatar, Rate, Typography, Space, Divider, Button } from 'antd';
import { UserOutlined, EnvironmentOutlined, StarOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Title, Text } = Typography;

const ProfileCard = ({ name, location, rating, estado, onLogout }) => {
  const navigate = useNavigate();
  const currentLocation = useLocation();
  
  // Check if we're on the profile page
  const isProfilePage = currentLocation.pathname === '/perfil';
  
  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // If onLogout prop is provided, call it
    if (onLogout) {
      onLogout();
    }
    
    // Redirect to login page
    navigate('/login');
  };

  return (
    <Card
      hoverable
      className="profile-card"
      bordered={true}
      style={styles.card}
      bodyStyle={styles.cardBody}
    >
      <div style={styles.avatarContainer}>
        <Avatar 
          size={100} 
          icon={<UserOutlined />} 
          style={styles.avatar}
        />
      </div>
      
      <div style={styles.infoContainer}>
        <Title level={4} style={styles.name}>{name}</Title>
        <Divider style={styles.divider} />
        <Space align="center" style={styles.locationWrapper}>
          <EnvironmentOutlined style={styles.locationIcon} />
          <Text style={styles.location}>{location || estado}</Text>
        </Space>
        
        <div style={styles.ratingContainer}>
          <Space align="center" style={styles.ratingHeader}>
            <StarOutlined style={styles.ratingIcon} />
            <Text style={styles.ratingText}>Calificación</Text>
          </Space>
          <Rate 
            disabled 
            defaultValue={rating} 
            style={styles.rating} 
            allowHalf
          />
        </div>
        
        {/* Only show logout button on profile page */}
        {isProfilePage && (
          <Button 
            type="primary" 
            danger 
            icon={<LogoutOutlined />} 
            style={styles.logoutButton}
            onClick={handleLogout}
          >
            Cerrar Sesión
          </Button>
        )}
      </div>
    </Card>
  );
};

const styles = {
  card: {
    width: '280px',
    height: 'auto',
    borderRadius: '16px',
    border: '1px solid #e8e8e8',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s ease',
    backgroundColor: '#fafafa',
  },
  cardBody: {
    padding: '24px',
    backgroundColor: '#fafafa',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: '16px',
    padding: '8px',
    borderRadius: '50%',
    border: '2px solid #20b2aa',
    backgroundColor: 'rgba(32, 178, 170, 0.05)',
  },
  avatar: {
    backgroundColor: '#e0f2f1',
    color: '#20b2aa',
    fontSize: '48px',
    boxShadow: '0 2px 8px rgba(32, 178, 170, 0.2)',
  },
  infoContainer: {
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  name: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
    margin: '0',
    letterSpacing: '0.5px',
  },
  divider: {
    margin: '12px 0',
    width: '50%',
    minWidth: '80px',
    backgroundColor: '#20b2aa',
    opacity: 0.5,
  },
  locationWrapper: {
    marginBottom: '16px',
  },
  locationIcon: {
    color: '#20b2aa',
    fontSize: '16px',
  },
  location: {
    fontSize: '14px',
    color: '#666',
    fontWeight: '500',
  },
  ratingContainer: {
    marginTop: '8px',
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  ratingHeader: {
    marginBottom: '8px',
  },
  ratingIcon: {
    color: '#20b2aa',
    fontSize: '16px',
  },
  ratingText: {
    color: '#666',
    fontSize: '14px',
    fontWeight: '500',
  },
  rating: {
    fontSize: '16px',
    color: '#ffc107',
  },
  logoutButton: {
    marginTop: '16px',
    borderRadius: '6px',
    fontWeight: '500',
    boxShadow: '0 2px 6px rgba(220, 53, 69, 0.2)',
    transition: 'all 0.3s ease',
  },
};

export default ProfileCard;