import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LocationBar from '../../Components/UI/LocationBar';
import SearchBar from '../../Components/UI/SearchBar';
import CategorySidebar from '../../Components/UI/CategorySidebar';
import ItemCard from '../../Components/Cards/ItemCard';
import { getAllProductos, searchProductosByName, searchProductos } from '../../services/productosServices';
import { Spin, message } from 'antd';


function Explorar() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchActive, setSearchActive] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [searchFilters, setSearchFilters] = useState({
    q: '',
    categoria: '',
    ubicacion: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Solo cargar todos los productos si no hay búsqueda activa
    if (!searchActive) {
      fetchAllProductos();
    }
  }, [searchActive]);

  const fetchAllProductos = async () => {
    try {
      if (initialLoad) {
        setLoading(true);
      }
      const productos = await getAllProductos();
      setItems(productos);
      console.log("Productos cargados:", productos);
    } catch (error) {
      console.error('Error al cargar productos:', error);
      message.error('No se pudieron cargar los productos');
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  };

  const handleSearch = async (searchTerm) => {
    try {
      // Si el término de búsqueda está vacío, mostrar todos los productos
      if (!searchTerm.trim() && !searchFilters.categoria && !searchFilters.ubicacion) {
        setSearchActive(false);
        return;
      }
      
      // Mostrar indicador de carga
      const loadingIndicator = document.getElementById('search-loading-overlay');
      if (loadingIndicator) {
        loadingIndicator.style.display = 'flex';
      }
      
      setSearchActive(true);
      
      // Actualizar filtros de búsqueda
      const newFilters = { ...searchFilters, q: searchTerm };
      setSearchFilters(newFilters);
      
      // Usar la función de búsqueda con filtros
      const resultados = await searchProductos(newFilters);
      
      setItems(resultados);
      console.log("Resultados de búsqueda:", resultados);
    } catch (error) {
      console.error('Error en la búsqueda:', error);
      message.error('Error al buscar productos');
    } finally {
      const loadingIndicator = document.getElementById('search-loading-overlay');
      if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
      }
    }
  };

  const handleCategorySelect = async (categoria) => {
    try {
      const loadingIndicator = document.getElementById('search-loading-overlay');
      if (loadingIndicator) {
        loadingIndicator.style.display = 'flex';
      }
      
      setSearchActive(true);
      
      // Actualizar filtros de búsqueda
      const newFilters = { ...searchFilters, categoria };
      setSearchFilters(newFilters);
      
      // Usar la función de búsqueda con filtros
      const resultados = await searchProductos(newFilters);
      
      setItems(resultados);
    } catch (error) {
      console.error('Error al filtrar por categoría:', error);
      message.error('Error al filtrar productos');
    } finally {
      const loadingIndicator = document.getElementById('search-loading-overlay');
      if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
      }
    }
  };

  const handleLocationSelect = async (ubicacion) => {
    try {
      const loadingIndicator = document.getElementById('search-loading-overlay');
      if (loadingIndicator) {
        loadingIndicator.style.display = 'flex';
      }
      
      setSearchActive(true);
      
      // Actualizar filtros de búsqueda
      const newFilters = { ...searchFilters, ubicacion };
      setSearchFilters(newFilters);
      
      // Usar la función de búsqueda con filtros
      const resultados = await searchProductos(newFilters);
      
      setItems(resultados);
    } catch (error) {
      console.error('Error al filtrar por ubicación:', error);
      message.error('Error al filtrar por ubicación');
    } finally {
      const loadingIndicator = document.getElementById('search-loading-overlay');
      if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
      }
    }
  };

  const handleItemClick = (itemId) => {
    navigate(`/producto/${itemId}`);
  };

  const handleResetSearch = () => {
    setSearchFilters({
      q: '',
      categoria: '',
      ubicacion: ''
    });
    setSearchActive(false);
  };

  return (
    <div style={styles.appContainer}>
      <main style={styles.mainContent}>
        <div style={styles.sidebarContainer}>
          <LocationBar onLocationSelect={handleLocationSelect} />
          <SearchBar onSearch={handleSearch} autoFilter={true} />
          <CategorySidebar onCategorySelect={handleCategorySelect} />
          {searchActive && (
            <button 
              onClick={handleResetSearch}
              style={styles.resetButton}
            >
              Mostrar todos los productos
            </button>
          )}
        </div>
        
        <div style={styles.contentContainer}>
          {loading ? (
            <div style={styles.loadingContainer}>
              <Spin size="large" />
            </div>
          ) : (
            <>
              <div id="search-loading-overlay" style={styles.searchLoadingOverlay}>
                <Spin size="small" />
              </div>
              <div style={styles.itemsGrid}>
                {items.length > 0 ? (
                  items.map(item => (
                    <ItemCard 
                      key={item._id} 
                      item={item}
                      onClick={() => handleItemClick(item._id)}
                    />
                  ))
                ) : (
                  <p style={styles.noItems}>
                    {searchActive 
                      ? 'No se encontraron productos que coincidan con tu búsqueda' 
                      : 'No hay productos disponibles'}
                  </p>
                )}
              </div>
            </>
          )}
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
  contentContainer: {
    position: 'relative',
    flex: 1,
  },
  searchLoadingOverlay: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'none',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  itemsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '25px',
    width: '100%',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: '300px',
  },
  noItems: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    padding: '40px',
    color: '#666',
    fontSize: '18px',
  },
  resetButton: {
    backgroundColor: '#e9ecef',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 15px',
    marginBottom: '20px',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#495057',
    width: '100%',
    transition: 'background-color 0.2s ease',
  }
};

export default Explorar;