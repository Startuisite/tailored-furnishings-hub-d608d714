
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ContactFormDialog from "./ContactFormDialog";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  images: string[];
  showDesignerCheckbox?: boolean;
}

const Hero = ({ images, showDesignerCheckbox = false }: HeroProps) => {
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

  const goToSlide = (index: number) => {
    if (index !== currentImageIndex) {
      setPrevImageIndex(currentImageIndex);
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex(index);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 100);
      }, 900);
    }
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
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      {/* Previous Image (for transition) */}
      <div
        className={`hero-slide absolute inset-0 ${
          isTransitioning ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url(${images[prevImageIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-32 text-white">
        <h2 className="text-4xl md:text-6xl font-playfair mb-12 text-center px-4">
          Твоя мебель – твои правила
        </h2>
        <ContactFormDialog
          trigger={
            <Button className="btn-primary text-xl md:text-2xl py-6 md:py-8 px-10 md:px-16 border-2 flex items-center gap-4 transform hover:scale-105 transition-all duration-300 shadow-lg">
              Заказать консультацию
              <ArrowRight className="h-6 w-6 md:h-8 md:w-8" />
            </Button>
          }
          showDesignerCheckbox={showDesignerCheckbox}
        />
      </div>
      
      {/* Indicators */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentImageIndex === index ? "bg-white w-6" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
