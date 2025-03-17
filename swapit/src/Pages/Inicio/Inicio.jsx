import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Layouts/Header';
import styles from './Inicio.module.css';

// Componentes
const HeroBanner = () => (
  <section className={styles.heroBanner}>
    <div className={styles.heroContent}>
      <h1 className={styles.heroTitle}>Intercambia de forma fácil y segura</h1>
      <p className={styles.heroSubtitle}>
        La plataforma de trueques más confiable para intercambiar objetos, servicios y conocimientos
      </p>
     
    </div>
    <div className={styles.heroImageContainer}>
      <div className={styles.heroImage}></div>
    </div>
  </section>
);

const FeatureCard = ({ icon, title, description }) => (
  <div className={styles.featureCard}>
    <div className={styles.featureIcon}>{icon}</div>
    <h3 className={styles.featureTitle}>{title}</h3>
    <p className={styles.featureDescription}>{description}</p>
  </div>
);

const Features = () => (
  <section className={styles.featuresSection}>
    <h2 className={styles.sectionTitle}>¿Por qué elegir nuestra plataforma?</h2>
    <div className={styles.featuresGrid}>
      <FeatureCard 
        icon={<i className="fas fa-shield-alt"></i>}
        title="Intercambios seguros" 
        description="Sistema de verificación de usuarios y valoraciones para garantizar la seguridad en cada trueque."
      />
      <FeatureCard 
        icon={<i className="fas fa-hand-holding-heart"></i>}
        title="Sin comisiones" 
        description="Realiza todos tus intercambios sin ningún costo adicional, de persona a persona."
      />
      <FeatureCard 
        icon={<i className="fas fa-users"></i>}
        title="Comunidad activa" 
        description="Miles de usuarios intercambiando diariamente en diferentes categorías."
      />
      <FeatureCard 
        icon={<i className="fas fa-globe-americas"></i>}
        title="Impacto positivo" 
        description="Contribuye a la economía circular y reduce tu huella ecológica mediante el reuso."
      />
    </div>
  </section>
);

const HowItWorks = () => (
  <section className={styles.howItWorksSection}>
    <h2 className={styles.sectionTitle}>¿Cómo funciona?</h2>
    <div className={styles.stepsContainer}>
      <div className={styles.stepItem}>
        <div className={styles.stepNumber}>1</div>
        <h3 className={styles.stepTitle}>Regístrate</h3>
        <p className={styles.stepDescription}>Crea tu cuenta gratuita en menos de 2 minutos</p>
      </div>
      <div className={styles.stepItem}>
        <div className={styles.stepNumber}>2</div>
        <h3 className={styles.stepTitle}>Publica</h3>
        <p className={styles.stepDescription}>Sube los artículos o servicios que quieres intercambiar</p>
      </div>
      <div className={styles.stepItem}>
        <div className={styles.stepNumber}>3</div>
        <h3 className={styles.stepTitle}>Conecta</h3>
        <p className={styles.stepDescription}>Encuentra usuarios con intereses afines y comunícate con ellos</p>
      </div>
      <div className={styles.stepItem}>
        <div className={styles.stepNumber}>4</div>
        <h3 className={styles.stepTitle}>Intercambia</h3>
        <p className={styles.stepDescription}>Realiza el trueque y deja tu valoración</p>
      </div>
    </div>
    <div className={styles.ctaContainer}>
      <Link to="/como-funciona" className={styles.textLink}>Ver más detalles</Link>
    </div>
  </section>
);

const CategoryCard = ({ image, title, count }) => (
  <Link to={`/categoria/${title.toLowerCase()}`} className={styles.categoryCard}>
    <div className={styles.categoryImageContainer}>
      <div className={styles.categoryImage} style={{ backgroundImage: `url(${image})` }}></div>
    </div>
    <h3 className={styles.categoryTitle}>{title}</h3>
    <p className={styles.categoryCount}>{count} artículos disponibles</p>
  </Link>
);

const Categories = () => (
  <section className={styles.categoriesSection}>
    <h2 className={styles.sectionTitle}>Explora por categorías</h2>
    <div className={styles.categoriesGrid}>
      <CategoryCard image="/img/categories/electronics.jpg" title="Electrónica" count="2,145" />
      <CategoryCard image="/img/categories/furniture.jpg" title="Muebles" count="1,879" />
      <CategoryCard image="/img/categories/clothes.jpg" title="Ropa" count="3,642" />
      <CategoryCard image="/img/categories/services.jpg" title="Servicios" count="956" />
      <CategoryCard image="/img/categories/books.jpg" title="Libros" count="2,310" />
      <CategoryCard image="/img/categories/sports.jpg" title="Deportes" count="1,456" />
    </div>
    <div className={styles.ctaContainer}>
      <Link to="/categorias" className={styles.textLink}>Ver todas las categorías</Link>
    </div>
  </section>
);

const Testimonial = ({ quote, author, location, image }) => (
  <div className={styles.testimonialCard}>
    <div className={styles.testimonialQuote}>"{quote}"</div>
    <div className={styles.testimonialAuthorInfo}>
      <div className={styles.testimonialAuthorImage} style={{ backgroundImage: `url(${image})` }}></div>
      <div>
        <p className={styles.testimonialAuthorName}>{author}</p>
        <p className={styles.testimonialAuthorLocation}>{location}</p>
      </div>
    </div>
  </div>
);

const Testimonials = () => (
  <section className={styles.testimonialsSection}>
    <h2 className={styles.sectionTitle}>Lo que dicen nuestros usuarios</h2>
    <div className={styles.testimonialsContainer}>
      <Testimonial 
        quote="He intercambiado más de 20 artículos y la experiencia ha sido increíble. Me encanta esta plataforma."
        author="María González"
        location="Ciudad de México"
        image="/img/testimonials/maria.jpg"
      />
      <Testimonial 
        quote="Cambié mi colección de libros por clases de fotografía. ¡La mejor decisión que he tomado!"
        author="Carlos Mendoza"
        location="Guadalajara"
        image="/img/testimonials/carlos.jpg"
      />
      <Testimonial 
        quote="La comunidad es muy amable y las transacciones son realmente seguras."
        author="Laura Pérez"
        location="Monterrey"
        image="/img/testimonials/laura.jpg"
      />
    </div>
  </section>
);



const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.footerContent}>
      <div className={styles.footerSection}>
        <h3 className={styles.footerTitle}>Navegación</h3>
        <ul className={styles.footerLinks}>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/como-funciona">Cómo funciona</Link></li>
          <li><Link to="/categorias">Categorías</Link></li>
          <li><Link to="/comunidad">Comunidad</Link></li>
          <li><Link to="/blog">Blog</Link></li>
        </ul>
      </div>
      <div className={styles.footerSection}>
        <h3 className={styles.footerTitle}>Información</h3>
        <ul className={styles.footerLinks}>
          <li><Link to="/sobre-nosotros">Sobre nosotros</Link></li>
          <li><Link to="/preguntas-frecuentes">Preguntas frecuentes</Link></li>
          <li><Link to="/terminos">Términos y condiciones</Link></li>
          <li><Link to="/privacidad">Política de privacidad</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
        </ul>
      </div>
      <div className={styles.footerSection}>
        <h3 className={styles.footerTitle}>Síguenos</h3>
        <div className={styles.socialLinks}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </div>
    <div className={styles.footerBottom}>
      <p>© {new Date().getFullYear()} PlataformaTrueques. Todos los derechos reservados.</p>
    </div>
  </footer>
);

const Inicio = () => {
  return (
    <div className={styles.inicioPage}>
      <main className={styles.mainContent}>
        <HeroBanner />
        <Features />
        <HowItWorks />
        <Categories />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Inicio;