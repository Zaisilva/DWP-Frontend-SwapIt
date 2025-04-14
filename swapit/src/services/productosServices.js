import { message } from 'antd';
import api from './api';

// Obtener todos los productos
export const getAllProductos = async () => {
  try {
    const response = await api.get('/productos');
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    message.error('No se pudieron cargar los productos');
    throw error;
  }
};

// Obtener un producto por ID
export const getProductoById = async (id) => {
  try {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error en getProductoById:', error);
    throw error;
  }
};
// crear proecuto
export const createProducto = async (productoData) => {
    try {
      // Preparar los datos para enviar al servidor
      const formData = new FormData();
      
      // Añadir todos los campos de texto
      formData.append('titulo', productoData.titulo);
      formData.append('descripcion', productoData.descripcion);
      formData.append('categoria', productoData.categoria);
      formData.append('estado', productoData.estado);
      formData.append('intercambioPor', productoData.intercambioPor);
      
      // Añadir ubicación como campos individuales
      formData.append('ubicacion[ciudad]', productoData.ubicacion.ciudad);
      formData.append('ubicacion[estado]', productoData.ubicacion.estado);
      formData.append('ubicacion[codigoPostal]', productoData.ubicacion.codigoPostal || '');
      
      // Añadir el ID del usuario actual (obtenido del token JWT o del estado de la aplicación)
      const userId = getUserIdFromToken(); // Implementa esta función para extraer el ID del usuario del token
      formData.append('usuario', userId);
      
      // Añadir imágenes
      if (productoData.imagenes && productoData.imagenes.length > 0) {
        productoData.imagenes.forEach((imagen) => {
          formData.append('imagenes', imagen);
        });
      }
      
      const response = await api.post('/productos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      message.success('¡Producto publicado exitosamente!');
      return response.data;
    } catch (error) {
      console.error('Error al crear producto:', error);
      if (error.response?.data?.mensaje) {
        message.error(error.response.data.mensaje);
      } else {
        message.error('Error al publicar el producto. Por favor, intenta de nuevo');
      }
      throw error;
    }
  };
// Función para extraer el ID del usuario del token JWT
function getUserIdFromToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  try {
    // Decodificar el token JWT (sin verificación)
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));
    
    // Devolver el ID del usuario
    return payload.id || payload.userId || payload._id; // Depende de cómo se haya nombrado en tu token
  } catch (error) {
    console.error('Error al decodificar token:', error);
    return null;
  }
}

// Fix for updateProducto service function
export const updateProducto = async (id, productoData) => {
  try {
    console.log('Iniciando actualización del producto', id);
    console.log('Datos enviados:', productoData);
    
    // Preparar los datos para enviar al servidor
    const formData = new FormData();
    
    // Añadir todos los campos de texto
    formData.append('titulo', productoData.titulo);
    formData.append('descripcion', productoData.descripcion);
    formData.append('categoria', productoData.categoria);
    formData.append('estado', productoData.estado);
    formData.append('intercambioPor', productoData.intercambioPor || '');
    
    // Añadir datos de ubicación
    formData.append('ubicacion[ciudad]', productoData.ubicacion.ciudad);
    formData.append('ubicacion[estado]', productoData.ubicacion.estado);
    
    if (productoData.ubicacion.codigoPostal) {
      formData.append('ubicacion[codigoPostal]', productoData.ubicacion.codigoPostal);
    }
    
    // Añadir imágenes nuevas
    if (productoData.nuevasImagenes && productoData.nuevasImagenes.length > 0) {
      productoData.nuevasImagenes.forEach(imagen => {
        formData.append('nuevasImagenes', imagen);
      });
    }
    
    // Imágenes a mantener (URLs)
    if (productoData.imagenesExistentes && productoData.imagenesExistentes.length > 0) {
      formData.append('imagenesExistentes', JSON.stringify(productoData.imagenesExistentes));
    }
    
    console.log('FormData preparado, enviando solicitud...');
    
    const response = await api.put(`/productos/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    console.log('Respuesta recibida:', response.data);
    message.success('¡Producto actualizado exitosamente!');
    return response.data;
  } catch (error) {
    console.error('Error detallado al actualizar producto:', error);
    console.error('Response data:', error.response?.data);
    
    if (error.response?.status === 401 || error.response?.status === 403) {
      message.error('Error de autenticación. Por favor, vuelve a iniciar sesión.');
    } else if (error.response?.data?.mensaje) {
      message.error(error.response.data.mensaje);
    } else {
      message.error('Error al actualizar el producto. Por favor, intenta de nuevo');
    }
    throw error;
  }
};
// Eliminar un producto
// En productosServices.js
export const deleteProducto = async (id) => {
  try {
    console.log('Iniciando eliminación del producto', id);
    const response = await api.delete(`/productos/${id}`);
    console.log('Respuesta de eliminación:', response.data);
    message.success('Producto eliminado correctamente');
    return true;
  } catch (error) {
    console.error('Error detallado al eliminar producto:', error);
    console.error('Response data:', error.response?.data);
    
    if (error.response?.status === 401 || error.response?.status === 403) {
      message.error('Error de autenticación. Por favor, vuelve a iniciar sesión.');
    } else {
      message.error('No se pudo eliminar el producto: ' + (error.response?.data?.mensaje || error.message));
    }
    throw error;
  }
};

// Marcar un producto como intercambiado
export const completarTrueque = async (id, productoIntercambiadoId = null) => {
  try {
    const data = {};
    if (productoIntercambiadoId) {
      data.productoIntercambiado = productoIntercambiadoId;
    }
    
    const response = await api.patch(`/productos/${id}/completar`, data);
    message.success('¡Trueque completado exitosamente!');
    return response.data;
  } catch (error) {
    console.error('Error al completar trueque:', error);
    message.error('No se pudo completar el trueque');
    throw error;
  }
};

// Obtener productos de un usuario específico
export const getProductosByUser = async (userId) => {
  try {
    const response = await api.get(`/productos/usuario/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos del usuario:', error);
    message.error('No se pudieron cargar los productos');
    throw error;
  }
};

// Buscar productos con filtros
export const searchProductos = async (filtros) => {
  try {
    // Construir la URL con los parámetros de búsqueda
    let url = '/productos/buscar/filtro?';
    
    if (filtros.q) url += `q=${encodeURIComponent(filtros.q)}&`;
    if (filtros.categoria) url += `categoria=${encodeURIComponent(filtros.categoria)}&`;
    if (filtros.ubicacion) url += `ubicacion=${encodeURIComponent(filtros.ubicacion)}&`;
    
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error en la búsqueda de productos:', error);
    message.error('Error al buscar productos');
    throw error;
  }
};

// Buscar productos por nombre
export const searchProductosByName = async (nombre) => {
  try {
    const response = await api.get(`/productos/buscar/nombre/${encodeURIComponent(nombre)}`);
    return response.data;
  } catch (error) {
    console.error('Error al buscar productos por nombre:', error);
    message.error('Error al buscar productos');
    throw error;
  }
};

// Obtener mis productos publicados
export const getMisProductos = async () => {
  try {
    // Obtener el ID del usuario del localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    if (!userData || !userData.userId) {
      throw new Error('Usuario no autenticado');
    }
    
    return await getProductosByUser(userData.userId);
  } catch (error) {
    console.error('Error al obtener mis productos:', error);
    message.error('No se pudieron cargar tus productos');
    throw error;
  }
};

// Función para guardar la ubicación del usuario
export const saveUserLocation = (ubicacion) => {
  try {
    localStorage.setItem('userLocation', JSON.stringify(ubicacion));
    return true;
  } catch (error) {
    console.error('Error al guardar la ubicación:', error);
    return false;
  }
};

// Función para obtener la ubicación del usuario
export const getUserLocation = () => {
  try {
    const ubicacion = localStorage.getItem('userLocation');
    if (ubicacion) {
      return JSON.parse(ubicacion);
    }
    
    // Si no hay ubicación guardada, intentar obtener la ubicación por IP
    return getLocationByIP();
  } catch (error) {
    console.error('Error al obtener la ubicación:', error);
    return null;
  }
};

// Función para obtener la ubicación aproximada por IP
export const getLocationByIP = async () => {
  try {
    // Usando la API de ipapi.co para obtener la ubicación aproximada
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    // Verificar si la ubicación es de México
    if (data.country === 'MX') {
      const ubicacion = {
        ciudad: data.city,
        estado: data.region,
        codigoPostal: data.postal
      };
      
      // Guardar la ubicación en localStorage
      saveUserLocation(ubicacion);
      return ubicacion;
    } else {
      // Si no es de México, devolver una ubicación predeterminada
      return {
        ciudad: 'Ciudad de México',
        estado: 'CDMX',
        codigoPostal: '06000'
      };
    }
  } catch (error) {
    console.error('Error al obtener ubicación por IP:', error);
    // Devolver ubicación predeterminada en caso de error
    return {
      ciudad: 'Ciudad de México',
      estado: 'CDMX',
      codigoPostal: '06000'
    };
  }
};

// Función para buscar productos por ubicación
export const searchProductosByLocation = async (ubicacion, radio = 50) => {
  try {
    const params = new URLSearchParams();
    
    if (ubicacion.ciudad) params.append('ciudad', ubicacion.ciudad);
    if (ubicacion.estado) params.append('estado', ubicacion.estado);
    if (ubicacion.codigoPostal) params.append('codigoPostal', ubicacion.codigoPostal);
    if (radio) params.append('radio', radio.toString());
    
    const response = await api.get(`/productos/buscar/ubicacion?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error al buscar productos por ubicación:', error);
    message.error('No se pudieron encontrar productos en esta ubicación');
    throw error;
  }
};

// Función para obtener estados de México
export const getEstadosMexico = () => {
  return [
    { nombre: 'Aguascalientes', abreviatura: 'Ags' },
    { nombre: 'Baja California', abreviatura: 'BC' },
    { nombre: 'Baja California Sur', abreviatura: 'BCS' },
    { nombre: 'Campeche', abreviatura: 'Camp' },
    { nombre: 'Chiapas', abreviatura: 'Chis' },
    { nombre: 'Chihuahua', abreviatura: 'Chih' },
    { nombre: 'Ciudad de México', abreviatura: 'CDMX' },
    { nombre: 'Coahuila', abreviatura: 'Coah' },
    { nombre: 'Colima', abreviatura: 'Col' },
    { nombre: 'Durango', abreviatura: 'Dgo' },
    { nombre: 'Estado de México', abreviatura: 'Edomex' },
    { nombre: 'Guanajuato', abreviatura: 'Gto' },
    { nombre: 'Guerrero', abreviatura: 'Gro' },
    { nombre: 'Hidalgo', abreviatura: 'Hgo' },
    { nombre: 'Jalisco', abreviatura: 'Jal' },
    { nombre: 'Michoacán', abreviatura: 'Mich' },
    { nombre: 'Morelos', abreviatura: 'Mor' },
    { nombre: 'Nayarit', abreviatura: 'Nay' },
    { nombre: 'Nuevo León', abreviatura: 'NL' },
    { nombre: 'Oaxaca', abreviatura: 'Oax' },
    { nombre: 'Puebla', abreviatura: 'Pue' },
    { nombre: 'Querétaro', abreviatura: 'Qro' },
    { nombre: 'Quintana Roo', abreviatura: 'QRoo' },
    { nombre: 'San Luis Potosí', abreviatura: 'SLP' },
    { nombre: 'Sinaloa', abreviatura: 'Sin' },
    { nombre: 'Sonora', abreviatura: 'Son' },
    { nombre: 'Tabasco', abreviatura: 'Tab' },
    { nombre: 'Tamaulipas', abreviatura: 'Tamps' },
    { nombre: 'Tlaxcala', abreviatura: 'Tlax' },
    { nombre: 'Veracruz', abreviatura: 'Ver' },
    { nombre: 'Yucatán', abreviatura: 'Yuc' },
    { nombre: 'Zacatecas', abreviatura: 'Zac' },
  ];
};

  // Obtener comentarios de un producto
  export const getComentariosByProducto = async (productoId) => {
    try {
      console.log('Fetching comments for product ID:', productoId);
      const response = await api.get(`/productos/${productoId}/comentarios`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener comentarios:', error);
      message.error('No se pudieron cargar los comentarios');
      throw error;
    }
  };
  // Añadir un comentario a un producto
  export const addComentario = async (productoId, texto) => {
  try {
    // Verificar si hay un token (usuario autenticado)
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No hay token de usuario para enviar comentario');
      throw new Error('Usuario no autenticado');
    }
    
    // No necesitamos enviar el ID del usuario manualmente
    // El backend ya extraerá esta información del token
    const response = await api.post(`/productos/${productoId}/comentarios`, {
      texto: texto
    });
    
    console.log('Comment added successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al añadir comentario:', error);
    if (error.response?.status === 401) {
      message.warning('Debes iniciar sesión para comentar');
    } else {
      message.error('No se pudo añadir el comentario');
    }
    throw error;
  }
};
  // Añadir respuesta a un comentario
  export const addRespuesta = async (comentarioId, texto) => {
    try {
      // Verificar si hay un token (usuario autenticado)
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No hay token de usuario para enviar respuesta');
        throw new Error('Usuario no autenticado');
      }
      
      // Obtener el ID del usuario del token
      const userId = getUserIdFromToken();
      console.log('User ID from token for reply:', userId);
      
      if (!userId) {
        console.error('No se pudo obtener el ID del usuario del token para la respuesta');
        throw new Error('No se pudo identificar al usuario');
      }
      
      const response = await api.post(`/productos/comentarios/${comentarioId}/respuestas`, {
        texto: texto
      });
      
      console.log('Reply added successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error al añadir respuesta:', error);
      if (error.response?.status === 401) {
        message.warning('Debes iniciar sesión para responder');
      } else {
        message.error('No se pudo añadir la respuesta');
      }
      throw error;
    }
  };
  // Eliminar un coment
  // En productosServices.js, modifica la función deleteComentario
export const deleteComentario = async (comentarioId) => {
  try {
    const userId = getUserIdFromToken();
    console.log('User ID attempting to delete comment:', userId);
    console.log('Comment ID to delete:', comentarioId);
    
    const response = await api.delete(`/productos/comentarios/${comentarioId}`);
    console.log('Delete comment response:', response);
    message.success('Comentario eliminado correctamente');
    return true;
  } catch (error) {
    console.error('Error al eliminar comentario:', error);
    console.error('Response data:', error.response?.data);
    
    if (error.response?.status === 403) {
      message.error('No tienes permiso para eliminar este comentario');
    } else {
      message.error('No se pudo eliminar el comentario: ' + (error.response?.data?.mensaje || error.message));
    }
    throw error;
  }
};
  //   // Eliminar una respuesta
  export const deleteRespuesta = async (comentarioId, respuestaId) => {
    try {
      const userId = getUserIdFromToken();
      console.log('User ID attempting to delete reply:', userId);
      
      await api.delete(`/productos/comentarios/${comentarioId}/respuestas/${respuestaId}`);
      message.success('Respuesta eliminada correctamente');
      return true;
    } catch (error) {
      console.error('Error al eliminar respuesta:', error);
      if (error.response?.status === 403) {
        message.error('No tienes permiso para eliminar esta respuesta');
      } else {
        message.error('No se pudo eliminar la respuesta');
      }
      throw error;
    }
  };