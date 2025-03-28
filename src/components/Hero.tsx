
import { useState, useEffect } from "react";

interface HeroProps {
  images: string[];
}

const Hero = ({ images }: HeroProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [prevImageIndex, setPrevImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      goToNextSlide();
    }, 5000);
    
    return () => clearInterval(intervalId);
  }, [currentImageIndex]);
  
  const goToNextSlide = () => {
    setPrevImageIndex(currentImageIndex);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 900);
  };
  
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Current Image */}
      <div
        className={`hero-slide absolute inset-0 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`,
        }}
      />
      
      {/* Previous Image (for transition) */}
      <div
        className={`hero-slide absolute inset-0 ${
          isTransitioning ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url(${images[prevImageIndex]})`,
        }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-32 text-white">
        <h2 className="text-4xl md:text-6xl font-playfair mb-8 text-center px-4">
          Твоя мебель – твои правила
        </h2>
        <button className="btn-primary">
          Заказать консультацию
        </button>
      </div>
      
      {/* Indicators */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              currentImageIndex === index ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
