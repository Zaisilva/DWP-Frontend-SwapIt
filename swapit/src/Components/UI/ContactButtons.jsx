import React from 'react';
import { Mail, Phone, MessageCircle } from 'lucide-react';

const ContactButtons = ({ usuarioId, itemTitle, usuarioEmail, usuarioNombre, usuarioTelefono, itemData }) => {
  const styles = {
    contactButtonsContainer: {
      display: 'flex',
      justifyContent: 'center',
      padding: '10px',
      margin: '10px 0',
      width: '100%',
    },
    contactButtons: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '10px',
      padding: '15px',
      border: '1px solid rgba(63, 209, 193, 0.3)',
      borderRadius: '16px',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
      width: '100%',
    },
    contactButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#2d3748',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '8px',
      borderRadius: '12px',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      flex: '1',
      minWidth: '70px',
    },
    iconContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f0fdfa',
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      marginBottom: '8px',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 8px rgba(63, 209, 193, 0.2)',
      border: '1px solid rgba(63, 209, 193, 0.2)',
    },
    iconLabel: {
      fontSize: '13px',
      fontWeight: '600',
      color: '#4a5568',
      marginTop: '3px',
      fontFamily: '"Nunito", "Segoe UI", sans-serif',
      letterSpacing: '0.3px',
      textAlign: 'center',
    }
  };

  // Función para manejar hover con animación mejorada
  const handleMouseOver = (e) => {
    const button = e.currentTarget;
    button.style.transform = 'translateY(-3px)';
    button.style.backgroundColor = '#f8f9fa';
    
    const iconContainer = button.querySelector('.icon-container');
    iconContainer.style.backgroundColor = '#3fd1c1';
    iconContainer.style.color = '#ffffff';
    iconContainer.style.boxShadow = '0 4px 12px rgba(63, 209, 193, 0.4)';
    
    const label = button.querySelector('.icon-label');
    label.style.color = '#3fd1c1';
  };

  const handleMouseOut = (e) => {
    const button = e.currentTarget;
    button.style.transform = 'translateY(0)';
    button.style.backgroundColor = 'transparent';
    
    const iconContainer = button.querySelector('.icon-container');
    iconContainer.style.backgroundColor = '#f0fdfa';
    iconContainer.style.color = '#2d3748';
    iconContainer.style.boxShadow = '0 2px 8px rgba(63, 209, 193, 0.2)';
    
    const label = button.querySelector('.icon-label');
    label.style.color = '#4a5568';
  };

  // Siempre usar el email real del usuario que publicó el artículo
  const email = usuarioEmail || (itemData?.usuario?.email) || "contacto@swapit.com";
  
  // Usar el teléfono real del usuario si está disponible, o generar uno basado en el ID
  const phone = usuarioTelefono || (itemData?.usuario?.telefono) || (usuarioId ? `+34${usuarioId.slice(-9)}` : '+34123456789');
  
  // Para WhatsApp, eliminar el "+" si existe
  const whatsapp = phone.replace(/^\+/, '');
  
  // Obtener datos del artículo para personalizar los mensajes
  const publicationTitle = itemTitle || (itemData?.titulo) || "tu publicación";
  const sellerName = usuarioNombre || (itemData?.autor) || (itemData?.usuario?.nombre) || "Vendedor";
  const itemCategory = itemData?.categoria || "artículo";
  const exchangeFor = itemData?.cambiadoPor || "";
  const itemCondition = itemData?.estado || "";
  
  // Mensaje para correo electrónico (codificado para URL)
  const emailSubject = encodeURIComponent(`Consulta sobre: ${publicationTitle}`);
  
  // Cuerpo del email con detalles del producto
  let emailBody = `Hola ${sellerName},\n\nVi tu publicación "${publicationTitle}" y estoy interesado/a.`;
  
  // Agregar detalles específicos si están disponibles
  if (exchangeFor) {
    emailBody += `\n\nVi que lo quieres intercambiar por "${exchangeFor}". Tengo algo similar que podría interesarte.`;
  }
  
  // Cierre del mensaje
  emailBody += `\n\n¿Podrías darme más información sobre este ${itemCategory.toLowerCase()}? ¿Está disponible todavía?\n\nGracias por tu tiempo.`;
  
  // Codificar el cuerpo del mensaje para URL
  const encodedEmailBody = encodeURIComponent(emailBody);
  
  // Mensaje para WhatsApp (codificado para URL)
  let whatsappMessage = `Hola ${sellerName}, vi tu publicación "${publicationTitle}" y me interesa.`;
  
  if (itemCondition) {
    whatsappMessage += ` Veo que está en estado "${itemCondition}".`;
  }
  
  whatsappMessage += " ¿Está disponible todavía?";
  
  const encodedWhatsappMessage = encodeURIComponent(whatsappMessage);

  // Debug: verificar que estamos usando el email correcto
  console.log("Using seller email:", email);
  console.log("Using seller phone:", phone);
  console.log("Using seller whatsapp:", whatsapp);

  return (
    <div style={styles.contactButtonsContainer}>
      <div style={styles.contactButtons}>
        <a 
          href={`mailto:${email}?subject=${emailSubject}&body=${encodedEmailBody}`}
          style={styles.contactButton}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="icon-container" style={styles.iconContainer}>
            <Mail size={20} strokeWidth={2} />
          </div>
          <span className="icon-label" style={styles.iconLabel}>Email</span>
        </a>
        
        <a 
          href={`tel:${phone}`}
          style={styles.contactButton}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <div className="icon-container" style={styles.iconContainer}>
            <Phone size={20} strokeWidth={2} />
          </div>
          <span className="icon-label" style={styles.iconLabel}>Llamar</span>
        </a>
        
        <a 
          href={`https://wa.me/${whatsapp}?text=${encodedWhatsappMessage}`}
          style={styles.contactButton}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="icon-container" style={styles.iconContainer}>
            <MessageCircle size={20} strokeWidth={2} />
          </div>
          <span className="icon-label" style={styles.iconLabel}>WhatsApp</span>
        </a>
      </div>
    </div>
  );
};

export default ContactButtons;