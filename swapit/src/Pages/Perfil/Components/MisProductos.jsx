import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Empty, Spin, message, Modal, Form, Input, Select, Upload, Space, Divider } from 'antd';
import { ShopOutlined, EditOutlined, DeleteOutlined, PlusOutlined, ExclamationCircleOutlined, SwapOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getMisProductos, deleteProducto, updateProducto, getEstadosMexico, completarTrueque } from '../../../services/productosServices';

const { TextArea } = Input;
const { Option } = Select;
const { confirm } = Modal;

// URL base para las imágenes - ajusta esto según tu configuración
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Función para formatear correctamente las URLs de las imágenes
const formatImageUrl = (imagePath) => {
  if (!imagePath) return 'https://via.placeholder.com/300x200?text=Sin+Imagen';
  
  // Si la imagen ya es una URL completa, la devolvemos como está
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Si la imagen comienza con "/", la consideramos una ruta relativa al servidor
  if (imagePath.startsWith('/')) {
    return `${API_URL}${imagePath}`;
  }
  
  // En cualquier otro caso, la tratamos como relativa al API_URL
  return `${API_URL}/${imagePath}`;
};

const MisProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentProducto, setCurrentProducto] = useState(null);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  
  
  // Estado para la ventana de confirmación de eliminación/intercambio
  const [eliminarModalVisible, setEliminarModalVisible] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [procesandoAccion, setProcesandoAccion] = useState(false);
  
  // Estado para previsualizar imágenes
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  
  const navigate = useNavigate();

  // Categorías disponibles
  const categorias = [
    'Electrónica', 'Ropa y Accesorios', 'Hogar y Jardín', 'Deportes', 
    'Juguetes', 'Libros y Revistas', 'Instrumentos Musicales', 'Arte y Coleccionables',
    'Belleza y Cuidado Personal', 'Mascotas', 'Otros'
  ];

  // Estados de productos
  const estadosProducto = ['Nuevo', 'Como nuevo', 'Buen estado', 'Usado', 'Necesita reparación'];

  useEffect(() => {
    // Obtener y decodificar el token
   
    
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      const data = await getMisProductos();
      console.log('Productos cargados:', data); // Para debug
      setProductos(data);
    } catch (error) {
      console.error('Error al cargar mis productos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditar = (producto, e) => {
    if (e) {
      e.stopPropagation();
    }
    
    setCurrentProducto(producto);
    
    // Preparar las imágenes existentes para el componente Upload
    const imagenesExistentes = producto.imagenes.map((url, index) => ({
      uid: `-${index}`,
      name: `imagen-${index}.jpg`,
      status: 'done',
      url: formatImageUrl(url),
      thumbUrl: formatImageUrl(url),
    }));
    
    setFileList(imagenesExistentes);
    
    // Establecer los valores iniciales del formulario
    form.setFieldsValue({
      titulo: producto.titulo,
      descripcion: producto.descripcion,
      categoria: producto.categoria,
      estado: producto.estado,
      intercambioPor: producto.intercambioPor,
      'ubicacion.ciudad': producto.ubicacion?.ciudad || '',
      'ubicacion.estado': producto.ubicacion?.estado || '',
      'ubicacion.codigoPostal': producto.ubicacion?.codigoPostal || '',
    });
    
    setEditModalVisible(true);
  };

  // Nueva función para mostrar el modal de eliminación/intercambio
  const mostrarModalEliminar = (producto, e) => {
    if (e) {
      e.stopPropagation();
    }
    setProductoAEliminar(producto);
    setEliminarModalVisible(true);
  };

  // Función para eliminar el producto
  const eliminarProducto = async () => {
    if (!productoAEliminar) return;
    
    try {
      setProcesandoAccion(true);
      await deleteProducto(productoAEliminar._id);
      setProductos(prev => prev.filter(p => p._id !== productoAEliminar._id));
      message.success('Producto eliminado correctamente');
      setEliminarModalVisible(false);
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      message.error('No se pudo eliminar el producto');
    } finally {
      setProcesandoAccion(false);
    }
  };

  // Función para marcar un producto como intercambiado
  const handleMarcarIntercambiado = async (id) => {
    try {
      setProcesandoAccion(true);
      
      // Utilizamos la función del servicio que ya tienes implementada
      await completarTrueque(id);
      
      // Actualizar la UI para reflejar el cambio
      setProductos(prevProductos => 
        prevProductos.map(producto => 
          producto._id === id 
            ? { ...producto, disponible: false, fechaTrueque: new Date() } 
            : producto
        )
      );
      
      // Recargar productos para asegurar que tenemos los datos más actualizados
      cargarProductos();
      
      setEliminarModalVisible(false);
      message.success('¡Felicidades por tu intercambio! El producto ha sido marcado como intercambiado y se ha sumado a tus estadísticas.');
    } catch (error) {
      console.error('Error al marcar como intercambiado:', error);
      message.error('Error al marcar como intercambiado');
    } finally {
      setProcesandoAccion(false);
    }
  };

  const handleEditSubmit = async (values) => {
    setSubmitLoading(true);
    
    try {
      // Preparar datos para la actualización
      const productoData = {
        titulo: values.titulo,
        descripcion: values.descripcion,
        categoria: values.categoria,
        estado: values.estado,
        intercambioPor: values.intercambioPor || '',
        ubicacion: {
          ciudad: values['ubicacion.ciudad'],
          estado: values['ubicacion.estado'],
          codigoPostal: values['ubicacion.codigoPostal'] || '',
        },
      };
      
      // Procesar imágenes
      const imagenesExistentes = fileList
        .filter(file => file.url) // Solo las que ya tienen URL (existentes)
        .map(file => {
          // Eliminar el API_URL de la URL para almacenar solo la ruta relativa
          let url = file.url;
          if (url.startsWith(API_URL)) {
            url = url.substring(API_URL.length);
          }
          return url;
        });
      
      const nuevasImagenes = fileList
        .filter(file => file.originFileObj) // Solo las nuevas (con archivo original)
        .map(file => file.originFileObj);
      
      productoData.imagenesExistentes = imagenesExistentes;
      productoData.nuevasImagenes = nuevasImagenes;
      
      // Enviar actualización
      await updateProducto(currentProducto._id, productoData);
      
      // Cerrar modal y recargar productos
      setEditModalVisible(false);
      cargarProductos();
      message.success('Producto actualizado con éxito');
      
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      // Mostrar mensaje de error al usuario en lugar de manejar específicamente el 401
      message.error(error.response?.data?.message || 'Error al actualizar el producto');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  // Función para mostrar/ocultar la información del token
 
  
  // Funciones para previsualizar imágenes
  const handlePreview = async (file) => {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  
  const handleCancelPreview = () => setPreviewVisible(false);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Subir</div>
    </div>
  );

  // Función para mostrar la imagen del producto con gestión de errores
  const renderProductImage = (producto) => {
    if (!producto.imagenes || producto.imagenes.length === 0) {
      return <img 
        alt="Sin imagen"
        src="https://via.placeholder.com/300x200?text=Sin+Imagen"
        style={styles.productImage}
        onError={(e) => {
          e.target.onerror = null; 
          e.target.src = "https://via.placeholder.com/300x200?text=Error+de+Imagen";
        }}
      />;
    }
    
    // Intentar cargar la primera imagen
    const imageSrc = formatImageUrl(producto.imagenes[0]);
    console.log('URL de imagen formateada:', imageSrc); // Para debug
    
    return <img 
      alt={producto.titulo} 
      src={imageSrc}
      style={styles.productImage}
      onError={(e) => {
        console.error('Error al cargar la imagen:', e);
        e.target.onerror = null; 
        e.target.src = "https://via.placeholder.com/300x200?text=Error+de+Imagen";
      }}
    />;
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Área de depuración del token */}
     

      <div style={styles.header}>
        <h1 style={styles.title}>Mis Publicaciones</h1>
        <Button 
          type="primary" 
          icon={<ShopOutlined />}
          onClick={() => navigate('/publicar')}
          size="large"
        >
          Nueva Publicación
        </Button>
      </div>

      {productos.length === 0 ? (
        <Empty 
          description="No tienes productos publicados" 
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        >
          <Button 
            type="primary" 
            onClick={() => navigate('/publicar')}
          >
            Publicar mi primer producto
          </Button>
        </Empty>
      ) : (
        <Row gutter={[16, 16]}>
          {productos.map(producto => (
            <Col xs={24} sm={12} md={8} lg={6} key={producto._id}>
              <Card
                hoverable
                cover={
                  <div 
                    style={styles.imageContainer}
                    onClick={() => {
                      if (producto.imagenes && producto.imagenes.length > 0) {
                        setPreviewImage(formatImageUrl(producto.imagenes[0]));
                        setPreviewTitle(producto.titulo);
                        setPreviewVisible(true);
                      }
                    }}
                  >
                    {renderProductImage(producto)}
                    {!producto.disponible && (
                      <div style={styles.intercambiadoTag}>
                        Intercambiado
                      </div>
                    )}
                  </div>
                }
                actions={[
                  <Button 
                    type="text" 
                    icon={<EditOutlined />} 
                    onClick={(e) => handleEditar(producto, e)}
                    disabled={!producto.disponible}
                  >
                    Editar
                  </Button>,
                  <Button 
                    type="text" 
                    danger 
                    icon={<DeleteOutlined />} 
                    onClick={(e) => mostrarModalEliminar(producto, e)}
                  >
                    Eliminar
                  </Button>
                ]}
              >
                <Card.Meta
                  title={producto.titulo}
                  description={
                    <div>
                      <p>{producto.descripcion.substring(0, 60)}...</p>
                      <p><strong>Categoría:</strong> {producto.categoria}</p>
                      <p><strong>Estado:</strong> {producto.estado}</p>
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Modal de edición */}
      <Modal
        title="Editar Producto"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleEditSubmit}
        >
          <Form.Item
            name="titulo"
            label="Título"
            rules={[{ required: true, message: 'Por favor ingresa un título' }]}
          >
            <Input placeholder="Título del producto" />
          </Form.Item>

          <Form.Item
            name="descripcion"
            label="Descripción"
            rules={[{ required: true, message: 'Por favor ingresa una descripción' }]}
          >
            <TextArea rows={4} placeholder="Describe tu producto" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="categoria"
                label="Categoría"
                rules={[{ required: true, message: 'Selecciona una categoría' }]}
              >
                <Select placeholder="Selecciona una categoría">
                  {categorias.map(cat => (
                    <Option key={cat} value={cat}>{cat}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="estado"
                label="Estado del producto"
                rules={[{ required: true, message: 'Selecciona el estado' }]}
              >
                <Select placeholder="¿En qué estado se encuentra?">
                  {estadosProducto.map(estado => (
                    <Option key={estado} value={estado}>{estado}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="intercambioPor"
            label="¿Qué te gustaría recibir a cambio?"
          >
            <Input placeholder="Ej: Smartphone, bicicleta, etc." />
          </Form.Item>

          <Divider>Ubicación</Divider>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="ubicacion.ciudad"
                label="Ciudad"
                rules={[{ required: true, message: 'Ingresa la ciudad' }]}
              >
                <Input placeholder="Ciudad" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="ubicacion.estado"
                label="Estado"
                rules={[{ required: true, message: 'Selecciona el estado' }]}
              >
                <Select placeholder="Selecciona el estado">
                  {getEstadosMexico().map(estado => (
                    <Option key={estado.nombre} value={estado.nombre}>
                      {estado.nombre}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="ubicacion.codigoPostal"
                label="Código Postal"
              >
                <Input placeholder="Código Postal" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Imágenes"
            extra="Puedes subir hasta 5 imágenes. Máximo 5MB por imagen."
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleUploadChange}
              beforeUpload={() => false} // Evita la subida automática
              maxCount={5}
              onPreview={handlePreview}
            >
              {fileList.length >= 5 ? null : uploadButton}
            </Upload>
          </Form.Item>

          <Form.Item>
            <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={() => setEditModalVisible(false)}>
                Cancelar
              </Button>
              <Button type="primary" htmlType="submit" loading={submitLoading}>
                Guardar Cambios
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal de Confirmación de Eliminación/Intercambio */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ExclamationCircleOutlined style={{ color: '#ff4d4f', marginRight: '10px' }} />
            Gestionar Producto
          </div>
        }
        open={eliminarModalVisible}
        onCancel={() => setEliminarModalVisible(false)}
        footer={null}
        closable={!procesandoAccion}
        maskClosable={!procesandoAccion}
        destroyOnClose
      >
        <div style={styles.eliminarModalContent}>
          <p>¿Qué acción deseas realizar con este producto?</p>
          
          <div style={styles.eliminarModalOptions}>
            <Button 
              type="primary" 
              danger
              icon={<DeleteOutlined />}
              onClick={eliminarProducto}
              style={styles.eliminarModalButton}
              loading={procesandoAccion}
              disabled={procesandoAccion}
            >
              Eliminar Completamente
            </Button>
            
            <Button 
              type="primary"
              icon={<SwapOutlined />}
              onClick={() => handleMarcarIntercambiado(productoAEliminar?._id)}
              style={{...styles.eliminarModalButton, backgroundColor: '#52c41a', borderColor: '#52c41a'}}
              disabled={procesandoAccion || (productoAEliminar && !productoAEliminar.disponible)}
              loading={procesandoAccion}
            >
              {productoAEliminar && !productoAEliminar.disponible 
                ? "Ya está marcado como intercambiado" 
                : "Marcar como Intercambiado"}
            </Button>
            
            <Button 
              onClick={() => setEliminarModalVisible(false)}
              style={styles.eliminarModalButton}
              disabled={procesandoAccion}
            >
              Cancelar
            </Button>
          </div>
          
          <div style={styles.eliminarModalInfo}>
            {productoAEliminar && (
              <div>
                <p><strong>Producto:</strong> {productoAEliminar.titulo}</p>
                <p><strong>Estado actual:</strong> {productoAEliminar.disponible ? "Disponible" : "Intercambiado"}</p>
                {productoAEliminar && productoAEliminar.disponible && (
                  <div style={styles.infoContainer}>
                    <div style={styles.infoBox}>
                      <InfoCircleOutlined style={{ marginRight: '5px', color: '#1890ff' }} />
                      <span>Al marcar como intercambiado, este producto se agregará a tu historial de intercambios y se incrementará tu contador de cambios exitosos.</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Modal>
      
      {/* Modal para previsualizar imágenes */}
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancelPreview}
      >
        <img alt="Previsualización" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    margin: 0,
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60vh',
  },
  imageContainer: {
    height: '200px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    position: 'relative',
    cursor: 'pointer',
  },
  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  intercambiadoTag: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#52c41a',
    color: 'white',
    padding: '2px 8px',
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '12px',
  },
  // Estilos para la sección de depuración
  debugSection: {
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: '#f0f2f5',
    borderRadius: '8px',
    borderLeft: '4px solid #1890ff',
  },
  tokenInfo: {
    marginTop: '15px',
    fontSize: '14px',
  },
  tokenText: {
    padding: '10px',
    backgroundColor: '#fff',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
    wordBreak: 'break-all',
    marginBottom: '10px',
    maxHeight: '100px',
    overflow: 'auto',
  },
  tokenData: {
    padding: '10px',
    backgroundColor: '#fff',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
    overflow: 'auto',
    maxHeight: '200px',
  },
  // Estilos para el modal de eliminación
  eliminarModalContent: {
    padding: '10px 0',
  },
  eliminarModalOptions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '20px',
  },
  eliminarModalButton: {
    width: '100%',
    height: '40px',
  },
  eliminarModalInfo: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    border: '1px solid #d9d9d9',
  },
  infoContainer: {
    marginTop: '10px',
  },
  infoBox: {
    display: 'flex',
    padding: '10px',
    backgroundColor: '#e6f7ff',
    borderRadius: '4px',
    border: '1px solid #91d5ff',
  },
};

export default MisProductos;