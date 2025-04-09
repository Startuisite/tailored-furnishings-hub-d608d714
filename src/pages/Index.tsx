import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import CatalogSection from '@/components/home/CatalogSection';
import OrderSteps from '@/components/home/OrderSteps';
import CustomerSection from '@/components/home/CustomerSection';
import DesignerSection from '@/components/home/DesignerSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/home/FAQSection';

const Index = () => {
  const location = useLocation();
  
  // Массив изображений для слайдера с внешними ссылками для более быстрой загрузки
  const heroImages = [
    "https://i.postimg.cc/44DsS9HD/0-T2p-Iwn3-Cf.png", // Ванная комната
    "https://i.postimg.cc/MTZvXjmP/bfl8-HSy-URY.png", // Кухня
    "https://i.postimg.cc/sfqgCLq0/hbi6-LHogp-Q.png"  // Спальня/кабинет
  ];

  // Effect для скролла к нужной секции после навигации с другой страницы
  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const scrollToId = location.state.scrollTo;
      setTimeout(() => {
        let selector = `.${scrollToId}`;
        
        // Проверяем, если это id, а не класс
        if (scrollToId.startsWith('#')) {
          selector = scrollToId;
        } else if (!scrollToId.includes('.') && !scrollToId.includes('#')) {
          // Если это просто строка без указания селектора
          if (scrollToId === 'catalog-section' || 
              scrollToId === 'customers-section' || 
              scrollToId === 'designers-section' || 
              scrollToId === 'about-us-section') {
            selector = `.${scrollToId}`;
          } else {
            selector = `#${scrollToId}`;
          }
        }
        
        const element = document.querySelector(selector);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500); // Небольшая задержка для уверенности, что DOM успел загрузиться
    }
  }, [location]);

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

      {/* FAQ section */}
      <FAQSection />

      {/* Order Steps section */}
      <OrderSteps />
      
      {/* Designer section */}
      <DesignerSection />
      
      {/* Testimonials section */}
      <TestimonialsSection />
      
      <Footer />
    </div>
  );
};

export default Index;
