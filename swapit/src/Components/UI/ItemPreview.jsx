import React, { useState } from 'react';
import { Carousel, Card, Badge, Empty } from 'antd';
import { LeftOutlined, RightOutlined, ShoppingOutlined } from '@ant-design/icons';

const ItemPreview = ({ images = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const defaultImage = "/zapatos.png"; // Default image
  const displayImages = images.length > 0 ? images : [defaultImage];
  
  const carouselRef = React.createRef();

  const nextSlide = () => {
    carouselRef.current.next();
  };

  const prevSlide = () => {
    carouselRef.current.prev();
  };

  const handleSlideChange = (current) => {
    setCurrentSlide(current);
  };

  // Custom arrows for the carousel
  const CustomArrow = ({ direction, onClick }) => (
    <div
      className={`custom-arrow custom-arrow-${direction}`}
      onClick={onClick}
    >
      {direction === 'left' ? <LeftOutlined /> : <RightOutlined />}
    </div>
  );

  return (
    <Card 
      className="item-preview-card" 
      bordered={false}
      cover={
        <div className="carousel-container">
          {displayImages.length > 0 ? (
            <>
              <Carousel
                ref={carouselRef}
                dots={true}
                afterChange={handleSlideChange}
                autoplay={false}
              >
                {displayImages.map((img, index) => (
                  <div key={index} className="carousel-slide">
                    <img src={img} alt={`Product view ${index + 1}`} />
                  </div>
                ))}
              </Carousel>
              
              {displayImages.length > 1 && (
                <>
                  <CustomArrow direction="left" onClick={prevSlide} />
                  <CustomArrow direction="right" onClick={nextSlide} />
                  
                  <div className="slide-counter">
                    <Badge count={`${currentSlide + 1}/${displayImages.length}`} style={{ backgroundColor: '#3fd1c1' }} />
                  </div>
                </>
              )}
            </>
          ) : (
            <Empty 
              image={Empty.PRESENTED_IMAGE_SIMPLE} 
              description="No images available"
              className="empty-images"
            />
          )}
        </div>
      }
    >
      <style jsx>{`
        .item-preview-card {
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          margin-bottom: 20px;
        }
        
        .carousel-container {
          position: relative;
          height: 320px;
          background-color: #f5f7fa;
        }
        
        .carousel-slide {
          height: 320px;
          overflow: hidden;
          background-color: #f0f2f5;
        }
        
        .carousel-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .custom-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 32px;
          height: 32px;
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 2;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          transition: all 0.3s;
        }
        
        .custom-arrow:hover {
          background-color: #ffffff;
        }
        
        .custom-arrow-left {
          left: 16px;
        }
        
        .custom-arrow-right {
          right: 16px;
        }
        
        .slide-counter {
          position: absolute;
          bottom: 16px;
          right: 16px;
          z-index: 1;
        }
        
        .empty-images {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        /* Override Ant Design carousel dots */
        :global(.ant-carousel .slick-dots) {
          bottom: 12px;
        }
        
        :global(.ant-carousel .slick-dots li button) {
          background: rgba(255, 255, 255, 0.7);
          opacity: 0.7;
        }
        
        :global(.ant-carousel .slick-dots li.slick-active button) {
          background: #3fd1c1;
          opacity: 1;
        }
      `}</style>
    </Card>
  );
};

export default ItemPreview;