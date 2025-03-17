import React from 'react';
import LocationBar from '../../Components/UI/LocationBar';
import SearchBar from '../../Components/UI/SearchBar';
import CategorySidebar from '../../Components/UI/CategorySidebar';
import ItemCard from '../../Components/UI/ItemCard';

function Explorar() {
  const items = [
    {
      id: 1,
      title: "Zapatos deportivos Nike",
      category: "Zapatos",
      tags: ["Ropa", "Accesorios"],
      publishDate: "10/10/2024",
      author: "Zara Silva",
      imageUrl: "/tenis.jpeg"
    },
    {
      id: 2,
      title: "Botas casuales de cuero",
      category: "Zapatos",
      tags: ["Ropa", "Accesorios"],
      publishDate: "05/10/2024",
      author: "Zara Silva",
      imageUrl: "/botas.jpg"
    }
  ];

  return (
    <div style={styles.appContainer}>
      <main style={styles.mainContent}>
        <div style={styles.sidebarContainer}>
          <LocationBar />
          <SearchBar />
          <CategorySidebar />
        </div>
        <div style={styles.itemsGrid}>
          {items.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </main>
    </div>
  );
}

const styles = {
  appContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
  },
  mainContent: {
    display: 'flex',
    gap: '30px',
  },
  sidebarContainer: {
    width: '280px',
    flexShrink: 0,
  },
  itemsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '25px',
    flex: 1,
  },
};

export default Explorar;