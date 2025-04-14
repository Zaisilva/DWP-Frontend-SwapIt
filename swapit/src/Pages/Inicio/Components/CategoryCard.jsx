import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../Inicio.module.css';

const CategoryCard = ({ image, title, count }) => (
  <Link to={`/categoria/${title.toLowerCase()}`} className={styles.categoryCard}>
    <div className={styles.categoryImageContainer}>
      <div className={styles.categoryImage} style={{ backgroundImage: `url(${image})` }}></div>
    </div>
    <h3 className={styles.categoryTitle}>{title}</h3>
    <p className={styles.categoryCount}>{count} artículos disponibles</p>
  </Link>
);

export default CategoryCard;