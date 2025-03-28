
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

const Index = () => {
  // Массив изображений для слайдера
  const heroImages = [
    "/lovable-uploads/da406eaa-f6f8-4df1-8439-cce21af967c0.png", // Замените на реальные пути к изображениям
    "/lovable-uploads/da406eaa-f6f8-4df1-8439-cce21af967c0.png",
    "/lovable-uploads/da406eaa-f6f8-4df1-8439-cce21af967c0.png"
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <Hero images={heroImages} />
      <Footer />
    </div>
  );
};

export default Index;
