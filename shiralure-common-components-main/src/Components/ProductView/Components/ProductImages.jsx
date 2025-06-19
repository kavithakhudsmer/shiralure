import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProductImages = ({ currentImages, activeImage, setActiveImage }) => {
  const handleNextImage = () => {
    setActiveImage((prev) => (prev + 1) % currentImages.length);
  };

  const handlePrevImage = () => {
    setActiveImage((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  };

  return (
    <div className="product-images">
      {/* Main Image */}
      <div className="main-image-container">
        <img
          src={currentImages[activeImage]}
          alt={`Product View ${activeImage + 1}`}
          className="main-image"
        />
        {currentImages.length > 1 && (
          <>
            <button onClick={handlePrevImage} className="image-nav-button prev-button">
              <ChevronLeft />
            </button>
            <button onClick={handleNextImage} className="image-nav-button next-button">
              <ChevronRight />
            </button>
            <div className="image-dots">
              {currentImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`image-dot ${activeImage === index ? 'active' : 'inactive'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      {/* Thumbnails */}
      <div className="thumbnails">
        {currentImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={`thumbnail ${activeImage === index ? 'active' : 'inactive'}`}
            onClick={() => setActiveImage(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImages; 