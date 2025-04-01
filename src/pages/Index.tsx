
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

const Index = () => {
  // Массив изображений для слайдера с новыми загруженными фото
  const heroImages = [
    "/lovable-uploads/99ae9dcd-dc47-4f26-b39c-0590b4e44498.png", // Ванная комната
    "/lovable-uploads/b6d95516-3e92-4f36-be7e-ebe9684d3cc9.png", // Кухня
    "/lovable-uploads/5722e33c-6e2b-4d06-aa5c-5404f2aba4bd.png"  // Спальня/кабинет
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <Hero images={heroImages} showDesignerCheckbox={true} />
      <Footer />
    </div>
  );
};

export default Index;
