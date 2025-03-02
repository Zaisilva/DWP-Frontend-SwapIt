import axiosInstance from './axios-config';

export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post('/auth/login', credentials);
    if (response.token) {
      localStorage.setItem('token', response.token);
    }
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error en el inicio de sesión');
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/auth/register', userData);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error en el registro');
  }
};

export const logoutUser = () => {
  localStorage.removeItem('token');
};