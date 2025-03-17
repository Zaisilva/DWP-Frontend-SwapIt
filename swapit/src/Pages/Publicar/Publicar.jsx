import React from 'react';
import PublishForm from './Components/PublishForm';

const Publicar = () => {
  const handlePublish = (data) => {
    console.log('Datos enviados:', data);
  };

  return (
    <div>
      <PublishForm onSubmit={handlePublish} loading={false} error="" />
    </div>
  );
};

export default Publicar;
