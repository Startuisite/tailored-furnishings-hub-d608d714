
import { useState } from 'react';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

type CategoryProps = {
  title: string;
  image: string;
  subtitle: string;
};

const CategoryCard = ({ title, image, subtitle }: CategoryProps) => {
  return (
    <Link to={`/catalog/${title.toLowerCase()}`}>
      <Card className="group overflow-hidden border-0 shadow-md transition-all duration-300 hover:shadow-xl">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <Badge 
            variant="outline" 
            className="absolute bottom-3 left-3 bg-white/80 text-black border border-npm-blue/30 px-2 py-0.5 text-xs font-normal shadow-sm"
          >
            <BadgeCheck size={12} className="mr-1" />
            {subtitle}
          </Badge>
        </div>
        <CardContent className="flex items-center justify-between p-4 bg-npm-beige">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-medium">{title}</h3>
          </div>
          <div className="bg-npm-light p-2 rounded-full shadow-sm transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
            <ArrowRight 
              className="text-black transition-all duration-300 group-hover:translate-x-1" 
              size={22} 
              strokeWidth={2.5} 
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

const Index = () => {
  // Массив изображений для слайдера с внешними ссылками для более быстрой загрузки
  const heroImages = [
    "https://i.postimg.cc/44DsS9HD/0-T2p-Iwn3-Cf.png", // Ванная комната
    "https://i.postimg.cc/MTZvXjmP/bfl8-HSy-URY.png", // Кухня
    "https://i.postimg.cc/sfqgCLq0/hbi6-LHogp-Q.png"  // Спальня/кабинет
  ];

  const [categories] = useState<CategoryProps[]>([
    {
      title: "Прихожая",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04", 
      subtitle: "под заказ"
    },
    {
      title: "Гостиная",
      image: "/lovable-uploads/b6d95516-3e92-4f36-be7e-ebe9684d3cc9.png",
      subtitle: "под заказ"
    },
    {
      title: "Кухня",
      image: "/lovable-uploads/b6d95516-3e92-4f36-be7e-ebe9684d3cc9.png",
      subtitle: "под заказ"
    },
    {
      title: "Детская",
      image: "/lovable-uploads/5722e33c-6e2b-4d06-aa5c-5404f2aba4bd.png",
      subtitle: "под заказ"
    },
    {
      title: "Спальня",
      image: "/lovable-uploads/5722e33c-6e2b-4d06-aa5c-5404f2aba4bd.png", 
      subtitle: "под заказ"
    },
    {
      title: "Гардероб",
      image: "/lovable-uploads/5722e33c-6e2b-4d06-aa5c-5404f2aba4bd.png",
      subtitle: "под заказ"
    },
    {
      title: "Шкафы",
      image: "/lovable-uploads/99ae9dcd-dc47-4f26-b39c-0590b4e44498.png",
      subtitle: "под заказ"
    },
    {
      title: "Ванна", 
      image: "/lovable-uploads/99ae9dcd-dc47-4f26-b39c-0590b4e44498.png",
      subtitle: "под заказ"
    },
    {
      title: "Мягкая мебель",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04", 
      subtitle: "под заказ"
    },
    {
      title: "Отели",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04", 
      subtitle: "под заказ"
    },
    {
      title: "Перегородки из мебели", 
      image: "/lovable-uploads/da406eaa-f6f8-4df1-8439-cce21af967c0.png",
      subtitle: "под заказ" 
    },
    {
      title: "Комплексная меблировка",
      image: "/lovable-uploads/da406eaa-f6f8-4df1-8439-cce21af967c0.png",
      subtitle: "под заказ"
    },
  ]);

  return (
    <div className="min-h-screen">
      <Header />
      <Hero images={heroImages} showDesignerCheckbox={true} />
      
      {/* Catalog section added to homepage */}
      <section className="py-16 bg-npm-light/30">
        <div className="container-custom">
          <h1 className="section-title mb-10 text-center">Каталог</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                title={category.title}
                image={category.image}
                subtitle={category.subtitle}
              />
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
