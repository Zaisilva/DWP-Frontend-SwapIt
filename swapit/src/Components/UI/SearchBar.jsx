
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

function SearchBar({ onSearch, autoFilter = false }) {
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
    if (autoFilter) {
      const delayDebounceFn = setTimeout(() => {
        onSearch && onSearch(searchTerm);
      }, 300);
      
      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchTerm, autoFilter, onSearch]);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (!autoFilter && onSearch) {
      onSearch(searchTerm);
    }
  };
  
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <form onSubmit={handleSearch} style={styles.searchForm}>
      <div style={{
        ...styles.searchContainer,
        borderColor: isFocused ? '#2a9d8f' : '#e6f2f0',
        boxShadow: isFocused ? '0 0 0 2px rgba(42, 157, 143, 0.2)' : 'none'
      }}>
        <input 
          type="text" 
          style={styles.searchInput}
          placeholder="Buscar productos para intercambiar..." 
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <button type="submit" style={styles.searchButton}>
          <Search 
            size={20} 
            color="#2a9d8f" 
          />
        </button>
      </div>
    </form>
  );
}

// Styles remain unchanged
const styles = {
  searchForm: {
    width: '100%',
  },
  searchContainer: {
    display: 'flex',
    marginBottom: '20px',
    border: '1px solid #e6f2f0',
    borderRadius: '8px',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    backgroundColor: 'white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  searchInput: {
    flexGrow: 1,
    padding: '14px 18px',
    border: 'none',
    outline: 'none',
    fontSize: '15px',
    color: '#2c3e50',
    backgroundColor: 'transparent',
  },
  searchButton: {
    backgroundColor: 'white',
    border: 'none',
    padding: '0 18px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s ease',
    height: '48px',
    '&:hover': {
      backgroundColor: '#f0f9f8',
    }
  },
};

export default SearchBar;