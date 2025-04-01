import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ContactForm from "./ContactForm";

interface HeroProps {
  images: string[];
  showDesignerCheckbox?: boolean;
}

const Hero = ({ images, showDesignerCheckbox = false }: HeroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      setIsTransitioning(false);
    }, 300);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      setIsTransitioning(false);
    }, 300);
  };

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center pt-16">
      {/* Image Slider */}
      <div className="relative w-full h-96 overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-transform duration-300 ${
              index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
        ))}
        {/* Slide Navigation */}
        <div className="absolute top-1/2 transform -translate-y-1/2 left-4 z-20">
          <button onClick={prevSlide} className="bg-black/20 hover:bg-black/50 text-white p-2 rounded-full">
            <ArrowLeft className="h-6 w-6" />
          </button>
        </div>
        <div className="absolute top-1/2 transform -translate-y-1/2 right-4 z-20">
          <button onClick={nextSlide} className="bg-black/20 hover:bg-black/50 text-white p-2 rounded-full">
            <ArrowRight className="h-6 w-6" />
          </button>
        </div>
      </div>
      
      {/* Contact Form Card */}
      <div className="container-custom z-10 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 xl:col-span-5 space-y-6">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight">
              Современная мебель на заказ в Москве
            </h1>
            <p className="text-lg">
              Создаем мебель, отражающую ваш уникальный стиль и соответствующую вашим потребностям.
              Индивидуальный дизайн, качественные материалы и профессиональное исполнение.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>Индивидуальный дизайн</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>Широкий выбор материалов и отделки</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>Гарантия качества</span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-6 xl:col-span-4 xl:col-start-8 px-4 py-8 lg:p-6 bg-card/90 backdrop-blur-sm rounded-3xl shadow-2xl">
            <h2 className="font-display text-2xl mb-6 text-center">Получить консультацию</h2>
            
            <ContactForm 
              showDesignerCheckbox={showDesignerCheckbox} 
              source="home_page"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
