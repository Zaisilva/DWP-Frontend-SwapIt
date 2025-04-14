import api from './api';

export const fetchUserProfile = async () => {
  try {
    const response = await api.get('/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const response = await api.put('/profile', profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const updatePassword = async (passwordData) => {
  try {
    const response = await api.put('/profile/password', passwordData);
    return response.data;
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
};