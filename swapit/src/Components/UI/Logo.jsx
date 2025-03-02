import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <img 
        src="/agreement.png" 
        alt="Logo" 
        className="w-8 h-8 rounded-full object-cover" 
      />
    </Link>
  );
};

export default Logo;
