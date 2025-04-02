
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';

type CategoryProps = {
  title: string;
  image: string;
};

const CategoryCard = ({ title, image }: CategoryProps) => {
  return (
    <Link to={`/catalog/${title.toLowerCase()}`}>
      <Card className="group overflow-hidden border-0 shadow-md transition-all duration-300 hover:shadow-xl">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
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

const Catalog = () => {
  const [categories] = useState<CategoryProps[]>([
    {
      title: "Прихожая",
      image: "https://i.postimg.cc/sXRBKY6D/2-P5-Z3-R2o0t.png"
    },
    {
      title: "Гостиная",
      image: "https://i.postimg.cc/2j1tDn2S/w-XOps33y-Lh.png"
    },
    {
      title: "Кухня",
      image: "https://i.postimg.cc/DyXGPN0K/bfl8-HSy-URY.png"
    },
    {
      title: "Детская",
      image: "https://i.postimg.cc/SQXDYk0S/c-COii-RTOMr.png"
    },
    {
      title: "Спальня",
      image: "https://i.postimg.cc/FRZBHxwY/hbi6-LHogp-Q.png"
    },
    {
      title: "Гардеробная",
      image: "https://i.postimg.cc/CMf9Tjxs/k3u1-F9-Odg0.png"
    },
    {
      title: "Шкафы",
      image: "https://i.postimg.cc/W457YmfV/1b-F5-JIOCs-V-1.png"
    },
    {
      title: "Ванная комната",
      image: "https://i.postimg.cc/G3kT55GP/0-T2p-Iwn3-Cf.png"
    },
    {
      title: "Мягкая мебель",
      image: "https://i.postimg.cc/fyPz8PYd/AErw-XCs-HOn.png"
    },
    {
      title: "Мебель для отелей",
      image: "https://i.postimg.cc/x8BWBV8K/4-KM0-OH6-Myn.png"
    },
    {
      title: "Перегородки из мебели",
      image: "https://i.postimg.cc/wB8HrJZ1/3-DZ5-Nk948-L.png"
    },
    {
      title: "Комплексная меблировка",
      image: "https://i.postimg.cc/V6tKV0yk/aeog-UZSa-Uz.png"
    },
  ]);

  return (
    <div className="min-h-screen bg-npm-light/30">
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
