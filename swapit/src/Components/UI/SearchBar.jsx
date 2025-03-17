
import React, { useState } from 'react';
import { Search } from 'lucide-react';

function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div style={{
      ...styles.searchContainer,
      borderColor: isFocused ? '#3498db' : '#dddddd',
      boxShadow: isFocused ? '0 0 0 2px rgba(52, 152, 219, 0.2)' : 'none'
    }}>
      <input 
        type="text" 
        style={styles.searchInput}
        placeholder="Buscar..." 
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <button style={styles.searchButton}>
        <Search 
          size={20} 
          color="#3498db" 
        />
      </button>
    </div>
  );
}

const styles = {
  searchContainer: {
    display: 'flex',
    marginBottom: '20px',
    border: '1px solid #dddddd',
    borderRadius: '8px',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  },
  searchInput: {
    flexGrow: 1,
    padding: '12px 15px',
    border: 'none',
    outline: 'none',
    fontSize: '15px',
    color: '#2c3e50',
  },
  searchButton: {
    backgroundColor: 'white',
    border: 'none',
    padding: '0 15px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s ease',
    ':hover': {
      backgroundColor: '#f8f9fa',
    }
  },
};

export default SearchBar;