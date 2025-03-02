import React, { useEffect, useState } from 'react';
import { getCommunityData } from '../../services/communityService';
import CommunityHeader from './Components/CommunityHeader';
import CommunityContent from './Components/CommunityContent';
import CommunityAction from './Components/CommunityAction';

const Comunidad = () => {
  const [communityData, setCommunityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        setLoading(true);
        const data = await getCommunityData();
        setCommunityData(data);
      } catch (err) {
        setError('Error al cargar los datos de la comunidad');
      } finally {
        setLoading(false);
      }
    };

    fetchCommunityData();
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Cargando...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;

  return (
    <div className="flex flex-col items-center p-6 max-w-4xl mx-auto">
      <div className="w-full flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/3">
          <div className="bg-gray-100 p-4 border border-gray-300 w-full aspect-square">
            {/* Placeholder for image */}
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <CommunityHeader title="Comunidad" />
          <CommunityContent 
            content="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
          />
          <CommunityAction />
        </div>
      </div>
    </div>
  );
};

export default Comunidad;