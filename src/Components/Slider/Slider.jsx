import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BannerImages = [
  '/assets/SRD/BannerSlider/CheeseCheddar.png',
  '/assets/SRD/BannerSlider/CheeseMozzarela.png',
  '/assets/SRD/BannerSlider/CheesePizza.png',
  '/assets/SRD/BannerSlider/CheeseShredded.png',
  '/assets/SRD/BannerSlider/CheezSlice.jpg',
  '/assets/SRD/BannerSlider/DesiGhee.png',
  '/assets/SRD/BannerSlider/FrenchFries.png',
  '/assets/SRD/BannerSlider/WhiteButter.jpg',
  '/assets/SRD/BannerSlider/WhiteButter.png',
  '/assets/SRD/BannerSlider/Yogurt.png',
  // '/assets/SRD/BannerSlider/YogurtPack.png'
]


const settings = {
  // dots: true,              // Show navigation dots
  infinite: true,          // Loop through images
  speed: 500,              // Transition speed
  slidesToShow: 1,         // Show one image at a time
  slidesToScroll: 1,       // Scroll one image at a time
  autoplay: true,          // Auto scroll through images
  autoplaySpeed: 3000,     // Time interval for autoplay
  adaptiveHeight: true,     // Adjust height to each image  
  pauseOnHover: false  // This ensures autoplay continues even on hover

};

export default function ImageSlider() {

  return (
    // <div className="w-full max-w-5xl mx-auto mt-8 overflow-hidden">
    //className="w-full h-full object-cover"

    <Slider {...settings}>
      {/* {images.map((image, index) => ( */}
      {BannerImages.map((image, index) => (

        <div key={index} className="w-full h-[200px] md:h-[500px] relative">
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            // className="w-full h-full object-cover"
            className="w-full h-full object-fill"
          />
        </div>

      ))}
    </Slider>

    // </div>
  );
};


