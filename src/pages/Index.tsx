
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
              scrollToId === 'about-us-section' ||
              scrollToId === 'faq-section') {
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

      {/* Order Steps section */}
      <OrderSteps />
      
      {/* Designer section */}
      <DesignerSection />
      
      {/* FAQ section */}
      <section className="py-16 bg-white faq-section">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-playfair mb-10">Ответы на частые вопросы</h2>
          
          <div className="space-y-6">
            {/* Example FAQ items - will be replaced by real content */}
            <div className="border-b pb-6">
              <h3 className="text-xl font-medium mb-2">Какие размеры мебели мы делаем?</h3>
              <p className="text-gray-700">Мы производим мебель любых размеров по индивидуальным заказам.</p>
            </div>
            
            <div className="border-b pb-6">
              <h3 className="text-xl font-medium mb-2">Какие сроки изготовления?</h3>
              <p className="text-gray-700">Сроки изготовления зависят от сложности проекта и обычно составляют от 2 до 4 недель.</p>
            </div>
            
            <div className="border-b pb-6">
              <h3 className="text-xl font-medium mb-2">Какие материалы и фурнитура используются?</h3>
              <p className="text-gray-700">Мы используем только качественные материалы и фурнитуру от проверенных поставщиков.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials section */}
      <TestimonialsSection />
      
      <Footer />
    </div>
  );
};

export default Index;
