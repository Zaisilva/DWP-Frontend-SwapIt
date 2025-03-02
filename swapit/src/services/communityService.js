import axiosInstance from './axios-config';

export const getCommunityData = async () => {
  try {
    const response = await axiosInstance.get('/community');
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener datos de la comunidad');
  }
};