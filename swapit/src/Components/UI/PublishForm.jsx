import React from 'react';

const PublishForm = ({ itemData }) => {
  // Como es solo informativo, usamos directamente los datos del ítem
  const cambiadoPor = itemData.cambiadoPor || 'No especificado';
  const categoria = itemData.categoria || 'No especificada';
  const fechaPublicacion = itemData.fechaPublicacion || 'No especificada';
  const autor = itemData.autor || 'Anónimo';

  return (
    <div className="exchange-info-container">
      <div className="exchange-card">
        <div className="card-header">
          <h3 className="header-title">Detalles del producto</h3>
        </div>
        
        <div className="item-meta">
          <div className="meta-item">
            <span className="meta-label">Categoría:</span>
            <span className="meta-value">{categoria}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Publicado:</span>
            <span className="meta-value">{fechaPublicacion}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Por:</span>
            <span className="meta-value">{autor}</span>
          </div>
        </div>
        
        <div className="exchange-section">
          <div className="exchange-header">
            <div className="icon-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10L3 14L7 18" stroke="#3fd1c1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 14H3" stroke="#3fd1c1" strokeWidth="2" strokeLinecap="round"/>
                <path d="M17 6L21 10L17 14" stroke="#3fd1c1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 10H21" stroke="#3fd1c1" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h4 className="exchange-title">Lo cambia por</h4>
          </div>
          
          <div className="exchange-value-display">
            <p className="exchange-value">{cambiadoPor}</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .exchange-info-container {
          margin: 22px auto;
          max-width: 600px;
          font-family: 'Inter', 'Helvetica Neue', sans-serif;
        }
        
        .exchange-card {
          background-color: #ffffff;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
          position: relative;
          overflow: hidden;
          border: 1px solid #edf2f7;
        }
        
        .card-header {
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid #f1f5f9;
        }
        
        .header-title {
          font-size: 18px;
          font-weight: 600;
          color: #2d3748;
          margin: 0;
          letter-spacing: 0.2px;
        }
        
        .item-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 20px;
          padding: 12px 15px;
          background-color: #f8fafc;
          border-radius: 8px;
        }
        
        .meta-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 14px;
        }
        
        .meta-label {
          font-weight: 600;
          color: #64748b;
        }
        
        .meta-value {
          color: #334155;
        }
        
        .exchange-section {
          background-color: #f0fdfa;
          border-radius: 8px;
          padding: 16px;
          border-left: 3px solid #3fd1c1;
        }
        
        .exchange-header {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
        }
        
        .icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(63, 209, 193, 0.15);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          margin-right: 12px;
        }
        
        .exchange-title {
          font-size: 15px;
          font-weight: 600;
          color: #475569;
          margin: 0;
          letter-spacing: 0.2px;
        }
        
        .exchange-value-display {
          padding: 5px 8px;
        }
        
        .exchange-value {
          font-size: 15px;
          color: #334155;
          margin: 0;
          line-height: 1.5;
          font-weight: 500;
          word-wrap: break-word;
        }
      `}</style>
    </div>
  );
};

export default PublishForm;