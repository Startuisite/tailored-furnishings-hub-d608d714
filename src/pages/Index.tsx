
import { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import CatalogSection from '@/components/home/CatalogSection';
import OrderSteps from '@/components/home/OrderSteps';
import CustomerSection from '@/components/home/CustomerSection';
import DesignerSection from '@/components/home/DesignerSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';

const Index = () => {
  // Массив изображений для слайдера с внешними ссылками для более быстрой загрузки
  const heroImages = [
    "https://i.postimg.cc/44DsS9HD/0-T2p-Iwn3-Cf.png", // Ванная комната
    "https://i.postimg.cc/MTZvXjmP/bfl8-HSy-URY.png", // Кухня
    "https://i.postimg.cc/sfqgCLq0/hbi6-LHogp-Q.png"  // Спальня/кабинет
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <Hero images={heroImages} showDesignerCheckbox={true} />
      
      {/* Added slogan above catalog section */}
      <div className="bg-npm-light py-12 text-center">
        <h2 className="text-4xl md:text-6xl font-playfair">
          Твоя мебель – твои правила
        </h2>
      </div>
      
      {/* Catalog section */}
      <CatalogSection />
      
      {/* Customer section */}
      <CustomerSection />

      {/* Order Steps section */}
      <OrderSteps />
      
      {/* Testimonials section */}
      <TestimonialsSection />
      
      {/* Designer section */}
      <DesignerSection />
      
      <Footer />
    </div>
  );
};

export default Index;
