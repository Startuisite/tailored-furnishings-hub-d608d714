
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

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
      <Footer />
    </div>
  );
};

export default Index;
