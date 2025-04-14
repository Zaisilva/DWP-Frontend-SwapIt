import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Empty, Spin, message, Modal, Form, Input, Select, Upload, Space, Divider } from 'antd';
import { ShopOutlined, EditOutlined, DeleteOutlined, PlusOutlined, ExclamationCircleOutlined, SwapOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getMisProductos, deleteProducto, updateProducto, getEstadosMexico, completarTrueque } from '../../../services/productosServices';

const { TextArea } = Input;
const { Option } = Select;
const { confirm } = Modal;

const MisProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentProducto, setCurrentProducto] = useState(null);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [submitLoading, setSubmitLoading] = useState(false);
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
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      const data = await getMisProductos();
      setProductos(data);
    } catch (error) {
      console.error('Error al cargar mis productos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditar = (producto) => {
    setCurrentProducto(producto);
    
    // Preparar las imágenes existentes para el componente Upload
    const imagenesExistentes = producto.imagenes.map((url, index) => ({
      uid: `-${index}`,
      name: `imagen-${index}.jpg`,
      status: 'done',
      url: url,
      thumbUrl: url,
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

  const handleEliminar = (id, estaIntercambiado) => {
    confirm({
      title: '¿Estás seguro de eliminar este producto?',
      icon: <ExclamationCircleOutlined />,
      content: estaIntercambiado 
        ? 'Este producto ya ha sido intercambiado. ¿Deseas eliminarlo de tu historial?' 
        : '¿Quieres eliminar este producto o marcarlo como intercambiado?',
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      footer: (_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          {!estaIntercambiado && (
            <Button 
              icon={<SwapOutlined />} 
              onClick={() => handleMarcarIntercambiado(id)}
              style={{ marginRight: 8 }}
            >
              Marcar como intercambiado
            </Button>
          )}
          <OkBtn />
        </>
      ),
      onOk: async () => {
        try {
          await deleteProducto(id);
          // Actualizar la lista después de eliminar
          setProductos(productos.filter(producto => producto._id !== id));
        } catch (error) {
          console.error('Error al eliminar producto:', error);
        }
      },
    });
  };

  const handleMarcarIntercambiado = async (id) => {
    try {
      await completarTrueque(id);
      // Recargar productos para reflejar el cambio
      cargarProductos();
      message.success('Producto marcado como intercambiado');
    } catch (error) {
      console.error('Error al marcar como intercambiado:', error);
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
        .map(file => file.url);
      
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
      // Eliminar esta condición que podría estar causando problemas con la sesión
      // if (error.response && error.response.status === 401) {
      //   // No hacer nada aquí, ya que el servicio manejará la redirección
      // }
    } finally {
      setSubmitLoading(false);
    }
  };
  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Subir</div>
    </div>
  );

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={styles.container}>
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
                  <div style={styles.imageContainer}>
                    <img 
                      alt={producto.titulo} 
                      src={producto.imagenes && producto.imagenes.length > 0 
                        ? producto.imagenes[0] 
                        : 'https://via.placeholder.com/300x200?text=Sin+Imagen'}
                      style={styles.productImage}
                    />
                    {producto.intercambiado && (
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
                    onClick={() => handleEditar(producto)}
                    disabled={producto.intercambiado}
                  >
                    Editar
                  </Button>,
                  <Button 
                    type="text" 
                    danger 
                    icon={<DeleteOutlined />} 
                    onClick={() => handleEliminar(producto._id, producto.intercambiado)}
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
  }
};

export default MisProductos;