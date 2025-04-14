import React, { useState, useEffect } from 'react';
import { Button, Input, Form, Row, Col, Divider, message } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, LockOutlined } from '@ant-design/icons';

const ProfileForm = ({ userData, onSubmit, loading, error }) => {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        firstName: userData.nombre || '',
        lastName: userData.apellido || '',
        email: userData.email || '',
        phone: userData.telefono || '',
      });
    }
  }, [userData, form]);

  const handleProfileSubmit = async (values) => {
    setSubmitLoading(true);
    try {
      await onSubmit({
        type: 'profile',
        data: values
      });
      message.success('Información personal actualizada correctamente');
    } catch (err) {
      message.error(error || 'Error al actualizar información');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handlePasswordSubmit = async (values) => {
    setPasswordLoading(true);
    try {
      await onSubmit({
        type: 'password',
        data: values
      });
      passwordForm.resetFields();
      message.success('Contraseña actualizada correctamente');
    } catch (err) {
      message.error(error || 'Error al actualizar contraseña');
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Información personal */}
      <div style={styles.section}>
        <h3 style={styles.title}>Información personal</h3>
        <Form
          form={form}
          onFinish={handleProfileSubmit}
          layout="vertical"
          style={styles.formContainer}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstName"
                label="Nombre"
                rules={[{ required: true, message: 'Por favor ingresa tu nombre' }]}
              >
                <Input 
                  prefix={<UserOutlined style={{ color: '#2a9d8f' }} />} 
                  placeholder="Nombre"
                  style={styles.input}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="Apellido"
                rules={[{ required: true, message: 'Por favor ingresa tu apellido' }]}
              >
                <Input 
                  prefix={<UserOutlined style={{ color: '#2a9d8f' }} />} 
                  placeholder="Apellido"
                  style={styles.input}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Correo"
                rules={[
                  { required: true, message: 'Por favor ingresa tu correo' },
                  { type: 'email', message: 'Correo inválido' }
                ]}
              >
                <Input 
                  prefix={<MailOutlined style={{ color: '#2a9d8f' }} />} 
                  placeholder="Correo"
                  style={styles.input}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Teléfono"
              >
                <Input 
                  prefix={<PhoneOutlined style={{ color: '#2a9d8f' }} />} 
                  placeholder="Teléfono"
                  style={styles.input}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item style={styles.buttonContainer}>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={submitLoading}
              style={styles.button}
            >
              {submitLoading ? 'Guardando...' : 'Guardar'}
            </Button>
          </Form.Item>
        </Form>
      </div>

      <Divider style={styles.divider} />

      {/* Cambiar contraseña */}
      <div style={styles.section}>
        <h3 style={styles.title}>Cambiar contraseña</h3>
        <Form
          form={passwordForm}
          onFinish={handlePasswordSubmit}
          layout="vertical"
          style={styles.formContainer}
        >
          <Form.Item
            name="currentPassword"
            label="Contraseña actual"
            rules={[{ required: true, message: 'Por favor ingresa tu contraseña actual' }]}
          >
            <Input.Password 
              prefix={<LockOutlined style={{ color: '#2a9d8f' }} />} 
              placeholder="Contraseña actual"
              style={styles.input}
            />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="newPassword"
                label="Nueva contraseña"
                rules={[
                  { required: true, message: 'Por favor ingresa tu nueva contraseña' },
                  { min: 6, message: 'La contraseña debe tener al menos 6 caracteres' }
                ]}
              >
                <Input.Password 
                  prefix={<LockOutlined style={{ color: '#2a9d8f' }} />} 
                  placeholder="Nueva contraseña"
                  style={styles.input}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="confirmPassword"
                label="Confirmar contraseña"
                dependencies={['newPassword']}
                rules={[
                  { required: true, message: 'Por favor confirma tu nueva contraseña' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Las contraseñas no coinciden'));
                    },
                  }),
                ]}
              >
                <Input.Password 
                  prefix={<LockOutlined style={{ color: '#2a9d8f' }} />} 
                  placeholder="Confirmar contraseña"
                  style={styles.input}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item style={styles.buttonContainer}>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={passwordLoading}
              style={styles.button}
            >
              {passwordLoading ? 'Guardando...' : 'Guardar'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '600px',
    padding: '24px',
    borderRadius: '16px',
    border: '2px solid #2a9d8f',
    backgroundColor: '#fafafa',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
  },
  section: {
    marginBottom: '20px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '12px',
  },
  formContainer: {
    width: '100%',
  },
  input: {
    borderRadius: '8px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  button: {
    backgroundColor: '#2a9d8f',
    borderColor: '#2a9d8f',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid #ccc',
    margin: '20px 0',
  },
};

export default ProfileForm;