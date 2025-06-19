// AdvertisementSlider.jsx
import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Advertisement.css';

import banner1 from '../../assets/images/advertisements/banner1.png';
import banner2 from '../../assets/images/advertisements/banner2.png';
import promoVideo from '../../assets/videos/promo.mp4'; // Add your video

function Advertisement() {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const slides = [
    { type: 'image', src: banner1, alt: 'Promotional Banner 1' },
    { type: 'image', src: banner2, alt: 'Promotional Banner 2' },
    { type: 'video', src: promoVideo, alt: 'Promo Video' }
  ];

  // Handle play and pause
  const handleVideoPlay = () => {
    sliderRef.current.slickPause();  // Pause slider when video plays
  };

  const handleVideoPause = () => {
    sliderRef.current.slickPlay();   // Resume slider when video pauses
  };

  return (
    <section className="advertisement-slider">
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="slider-image">
            {slide.type === 'image' ? (
              <img src={slide.src} alt={slide.alt} />
            ) : (
              <video
                width="100%"
                height="100%"
                style={{ objectFit: 'cover', borderRadius: '10px' }}
                controls
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
              >
                <source src={slide.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        ))}
      </Slider>
    </section>
  );
}

export default Advertisement;
