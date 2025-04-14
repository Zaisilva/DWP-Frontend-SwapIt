import api from './api';
import { message } from 'antd';

export const sendContactForm = async (contactData) => {
  try {
    const response = await api.post('/contact', contactData);
    message.success('Mensaje enviado correctamente');
    return response.data;
  } catch (error) {
    console.error('Error al enviar mensaje de contacto:', error);
    
    if (error.response?.data?.error) {
      message.error(error.response.data.error);
    } else {
      message.error('Error al enviar el mensaje. Por favor, intenta de nuevo');
    }
    throw error;
  }
};