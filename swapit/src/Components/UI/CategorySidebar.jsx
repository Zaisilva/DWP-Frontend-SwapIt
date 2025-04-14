import React, { useState } from 'react';
import { Tag, Smartphone, Home, ShoppingBag, Dumbbell, Gamepad2, BookOpen, Joystick, Sofa, Wrench, Package } from 'lucide-react';

function CategorySidebar() {
  const [activeCategory, setActiveCategory] = useState(null);
  
  const categoriasOptions = [
    { id: 1, name: 'Electrónica', icon: Smartphone },
    { id: 2, name: 'Hogar', icon: Home },
    { id: 3, name: 'Ropa y Accesorios', icon: ShoppingBag },
    { id: 4, name: 'Deportes', icon: Dumbbell },
    { id: 5, name: 'Juguetes', icon: Gamepad2 },
    { id: 6, name: 'Libros', icon: BookOpen },
    { id: 7, name: 'Videojuegos', icon: Joystick },
    { id: 8, name: 'Muebles', icon: Sofa },
    { id: 9, name: 'Herramientas', icon: Wrench },
    { id: 10, name: 'Otro', icon: Package },
  ];
  
  return (
    <div style={styles.categorySidebar}>
      <div style={styles.categoryHeader}>
        <Tag size={18} color="#2a9d8f" />
        <h3 style={styles.categoryTitle}>Categorías</h3>
      </div>
      <ul style={styles.categoryList}>
        {categoriasOptions.map((category) => {
          const CategoryIcon = category.icon;
          return (
            <li 
              key={category.id} 
              style={{
                ...styles.categoryItem,
                backgroundColor: activeCategory === category.id ? '#f0f9f8' : 'transparent',
                borderLeft: activeCategory === category.id ? '3px solid #2a9d8f' : '3px solid transparent',
              }}
              onClick={() => setActiveCategory(category.id)}
            >
              <CategoryIcon size={16} color={activeCategory === category.id ? '#2a9d8f' : '#666'} style={styles.categoryIcon} />
              <span style={{
                ...styles.categoryName,
                color: activeCategory === category.id ? '#2a9d8f' : '#444',
                fontWeight: activeCategory === category.id ? '600' : '400',
              }}>
                {category.name}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const styles = {
  categorySidebar: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    border: '1px solid #e6f2f0',
  },
  categoryHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '12px',
    borderBottom: '1px solid #e6f2f0',
  },
  categoryTitle: {
    margin: '0 0 0 10px',
    fontWeight: '600',
    fontSize: '18px',
    color: '#2a9d8f',
  },
  categoryList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  categoryItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 12px',
    marginBottom: '8px',
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#f8f9fa',
    }
  },
  categoryIcon: {
    marginRight: '12px',
  },
  categoryName: {
    fontSize: '15px',
    transition: 'all 0.2s ease',
  },
};

export default CategorySidebar;

