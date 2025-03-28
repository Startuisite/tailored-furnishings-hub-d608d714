
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';

type CategoryProps = {
  title: string;
  image: string;
  subtitle: string;
};

const CategoryCard = ({ title, image, subtitle }: CategoryProps) => {
  return (
    <Link to={`/catalog/${title.toLowerCase()}`}>
      <Card className="group overflow-hidden border-0 shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <CardContent className="flex items-center justify-between p-4 bg-white">
          <div>
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>
          <ArrowRight className="text-black transition-transform duration-300 group-hover:translate-x-1" size={20} />
        </CardContent>
      </Card>
    </Link>
  );
};

const Catalog = () => {
  const [categories] = useState<CategoryProps[]>([
    {
      title: "Кухня",
      image: "/lovable-uploads/b6d95516-3e92-4f36-be7e-ebe9684d3cc9.png",
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
      title: "Спальня",
      image: "/lovable-uploads/5722e33c-6e2b-4d06-aa5c-5404f2aba4bd.png", 
      subtitle: "под заказ"
    },
    {
      title: "Прихожая",
      image: "/lovable-uploads/51bf7ff2-a365-48ea-9dc0-bc1fa0e1e19c.png",
      subtitle: "под заказ"
    },
    {
      title: "Ванная",
      image: "/lovable-uploads/99ae9dcd-dc47-4f26-b39c-0590b4e44498.png",
      subtitle: "под заказ"
    },
    {
      title: "Детская",
      image: "/lovable-uploads/5722e33c-6e2b-4d06-aa5c-5404f2aba4bd.png",
      subtitle: "под заказ"
    },
    {
      title: "Гостиная",
      image: "/lovable-uploads/b6d95516-3e92-4f36-be7e-ebe9684d3cc9.png",
      subtitle: "под заказ"
    },
    {
      title: "Мягкая мебель",
      image: "/lovable-uploads/155d9448-a703-4d5e-82d0-ae434e864314.png",
      subtitle: "под заказ"
    },
    {
      title: "Перегородки",
      image: "/lovable-uploads/51bf7ff2-a365-48ea-9dc0-bc1fa0e1e19c.png",
      subtitle: "под заказ"
    },
    {
      title: "Офисы",
      image: "/lovable-uploads/b6d95516-3e92-4f36-be7e-ebe9684d3cc9.png",
      subtitle: "под заказ"
    },
    {
      title: "Комплексная меблировка",
      image: "/lovable-uploads/99ae9dcd-dc47-4f26-b39c-0590b4e44498.png",
      subtitle: "под заказ"
    },
  ]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
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
      </main>
      <Footer />
    </div>
  );
};

export default Catalog;
