
import React, { useState, useEffect, useRef } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';

function LocationBar({ onLocationSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Querétaro, Qro');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLocations, setFilteredLocations] = useState([]);
  const dropdownRef = useRef(null);

  // Lista de estados de México con sus abreviaturas
  const mexicoLocations = [
    { name: 'Aguascalientes', abbr: 'Ags' },
    { name: 'Baja California', abbr: 'BC' },
    { name: 'Baja California Sur', abbr: 'BCS' },
    { name: 'Campeche', abbr: 'Camp' },
    { name: 'Chiapas', abbr: 'Chis' },
    { name: 'Chihuahua', abbr: 'Chih' },
    { name: 'Ciudad de México', abbr: 'CDMX' },
    { name: 'Coahuila', abbr: 'Coah' },
    { name: 'Colima', abbr: 'Col' },
    { name: 'Durango', abbr: 'Dgo' },
    { name: 'Estado de México', abbr: 'Edomex' },
    { name: 'Guanajuato', abbr: 'Gto' },
    { name: 'Guerrero', abbr: 'Gro' },
    { name: 'Hidalgo', abbr: 'Hgo' },
    { name: 'Jalisco', abbr: 'Jal' },
    { name: 'Michoacán', abbr: 'Mich' },
    { name: 'Morelos', abbr: 'Mor' },
    { name: 'Nayarit', abbr: 'Nay' },
    { name: 'Nuevo León', abbr: 'NL' },
    { name: 'Oaxaca', abbr: 'Oax' },
    { name: 'Puebla', abbr: 'Pue' },
    { name: 'Querétaro', abbr: 'Qro' },
    { name: 'Quintana Roo', abbr: 'QRoo' },
    { name: 'San Luis Potosí', abbr: 'SLP' },
    { name: 'Sinaloa', abbr: 'Sin' },
    { name: 'Sonora', abbr: 'Son' },
    { name: 'Tabasco', abbr: 'Tab' },
    { name: 'Tamaulipas', abbr: 'Tamps' },
    { name: 'Tlaxcala', abbr: 'Tlax' },
    { name: 'Veracruz', abbr: 'Ver' },
    { name: 'Yucatán', abbr: 'Yuc' },
    { name: 'Zacatecas', abbr: 'Zac' },
  ];

  useEffect(() => {
    // Cargar ubicación guardada al iniciar
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      setSelectedLocation(savedLocation);
    }
  }, []);

  useEffect(() => {
    // Filtrar ubicaciones basadas en el término de búsqueda
    if (searchTerm.trim() === '') {
      setFilteredLocations(mexicoLocations);
    } else {
      const filtered = mexicoLocations.filter(location => 
        location.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredLocations(filtered);
    }
  }, [searchTerm]);

  useEffect(() => {
    // Cerrar el dropdown cuando se hace clic fuera de él
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLocationSelect = (location) => {
    const locationString = `${location.name}, ${location.abbr}`;
    setSelectedLocation(locationString);
    setIsOpen(false);
    
    // Guardar en localStorage
    localStorage.setItem('userLocation', locationString);
    
    // Notificar al componente padre sobre el cambio de ubicación
    if (onLocationSelect) {
      onLocationSelect(location.name);
    }
  };

  return (
    <div style={styles.locationBarContainer} ref={dropdownRef}>
      <div 
        style={styles.locationBar}
        onClick={() => setIsOpen(!isOpen)}
      >
        <MapPin 
          size={20} 
          color="#2a9d8f" 
          style={styles.locationIcon} 
        />
        <span style={styles.locationText}>{selectedLocation}</span>
        <ChevronDown 
          size={18} 
          color="#666" 
          style={{
            ...styles.chevronIcon,
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }} 
        />
      </div>
      
      {isOpen && (
        <div style={styles.dropdown}>
          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Buscar ubicación..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
          </div>
          <div style={styles.locationList}>
            {filteredLocations.map((location, index) => (
              <div 
                key={index} 
                style={styles.locationItem}
                onClick={() => handleLocationSelect(location)}
              >
                <MapPin size={16} color="#2a9d8f" style={styles.smallLocationIcon} />
                <span>{location.name}, {location.abbr}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  locationBarContainer: {
    position: 'relative',
    width: '100%',
  },
  locationBar: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 15px',
    marginBottom: '15px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    border: '1px solid #e6f2f0',
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    }
  },
  locationIcon: {
    marginRight: '12px',
  },
  locationText: {
    fontWeight: '600',
    fontSize: '15px',
    color: '#2c3e50',
    flexGrow: 1,
  },
  chevronIcon: {
    transition: 'transform 0.3s ease',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
    zIndex: 1000,
    maxHeight: '300px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  searchContainer: {
    padding: '10px 15px',
    borderBottom: '1px solid #e6f2f0',
  },
  searchInput: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
    '&:focus': {
      borderColor: '#2a9d8f',
    }
  },
  locationList: {
    overflowY: 'auto',
    maxHeight: '250px',
  },
  locationItem: {
    padding: '10px 15px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: '#f0f9f8',
    }
  },
  smallLocationIcon: {
    marginRight: '10px',
  }
};

export default LocationBar;
