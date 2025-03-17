import React, { useState } from 'react';
import { Tag, Shirt, Watch, Home, Car, Briefcase } from 'lucide-react';

function CategorySidebar() {
  const [activeCategory, setActiveCategory] = useState(null);
  
  const categories = [
    { id: 1, name: 'Ropa', icon: Shirt },
    { id: 2, name: 'Accesorios', icon: Watch },
    { id: 3, name: 'Propiedades', icon: Home },
    { id: 4, name: 'Autos', icon: Car },
    { id: 5, name: 'Colección', icon: Briefcase },
  ];
  
  return (
    <div style={styles.categorySidebar}>
      <div style={styles.categoryHeader}>
        <Tag size={18} color="#3498db" />
        <h3 style={styles.categoryTitle}>Categorías</h3>
      </div>
      <ul style={styles.categoryList}>
        {categories.map((category) => {
          const CategoryIcon = category.icon;
          return (
            <li 
              key={category.id} 
              style={{
                ...styles.categoryItem,
                backgroundColor: activeCategory === category.id ? '#f0f7ff' : 'transparent',
                borderLeft: activeCategory === category.id ? '3px solid #3498db' : '3px solid transparent',
              }}
              onClick={() => setActiveCategory(category.id)}
            >
              <CategoryIcon size={16} color={activeCategory === category.id ? '#3498db' : '#666'} style={styles.categoryIcon} />
              <span style={{
                ...styles.categoryName,
                color: activeCategory === category.id ? '#3498db' : '#444',
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
  },
  categoryHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '12px',
    borderBottom: '1px solid #eaeaea',
  },
  categoryTitle: {
    margin: '0 0 0 10px',
    fontWeight: '600',
    fontSize: '18px',
    color: '#2c3e50',
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
    marginBottom: '5px',
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
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

