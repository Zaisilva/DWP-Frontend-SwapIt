import React from 'react';
import { Card, Avatar, Rate, Typography, Space, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const UserInfo = ({ username, rating = 4, verified = true }) => {
  return (
    <Card 
      className="user-info-card" 
      size="small" 
      bordered={true}
    >
      <Space className="user-info-container">
        <Avatar 
          size={46} 
          icon={<UserOutlined />} 
          className="user-avatar"
        />
        <div className="user-details">
          <div className="username-section">
            <Text strong className="username">{username}</Text>
            {verified && (
              <span className="verified-badge" title="Verified User">
                ✓
              </span>
            )}
          </div>
          <Rate 
            disabled 
            defaultValue={rating} 
            allowHalf 
            className="user-rating"
          />
        </div>
      </Space>
      
      <Divider className="user-info-divider" />
      
      <div className="user-stats">
        <div className="stat-item">
          <Text type="secondary">Miembro desde</Text>
          <Text strong>Enero 2024</Text>
        </div>
        <div className="stat-item">
          <Text type="secondary">Intercambios</Text>
          <Text strong>12</Text>
        </div>
      </div>

      <style jsx>{`
        .user-info-card {
          margin-bottom: 20px;
          border-radius: 8px;
          border-color: #e8e8e8;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }
        
        .user-info-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.09);
        }
        
        .user-info-container {
          display: flex;
          align-items: center;
          width: 100%;
        }
        
        .user-avatar {
          background-color: #3fd1c1;
          color: white;
        }
        
        .user-details {
          flex: 1;
          margin-left: 12px;
        }
        
        .username-section {
          display: flex;
          align-items: center;
          margin-bottom: 4px;
        }
        
        .username {
          font-size: 16px;
          margin-right: 6px;
        }
        
        .verified-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 16px;
          height: 16px;
          background-color: #3fd1c1;
          color: white;
          border-radius: 50%;
          font-size: 10px;
          font-weight: bold;
        }
        
        .user-rating {
          font-size: 14px;
        }
        
        :global(.user-rating .ant-rate-star) {
          margin-right: 4px;
        }
        
        .user-info-divider {
          margin: 12px 0;
        }
        
        .user-stats {
          display: flex;
          justify-content: space-between;
        }
        
        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        /* Override Ant Design Rate component colors */
        :global(.ant-rate-star.ant-rate-star-full .ant-rate-star-first),
        :global(.ant-rate-star.ant-rate-star-full .ant-rate-star-second) {
          color: #faad14;
        }
      `}</style>
    </Card>
  );
};

export default UserInfo;