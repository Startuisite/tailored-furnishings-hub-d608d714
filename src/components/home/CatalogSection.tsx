import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import CategoryCard from './CategoryCard';

const CatalogSection = () => {
  const [categoriesData] = useState([
    {
      title: "Прихожая",
      image: "https://i.postimg.cc/sXRBKY6D/2-P5-Z3-R2o0t.png", 
      subtitle: "на заказ"
    },
    {
      title: "Гостиная",
      image: "https://i.postimg.cc/2j1tDn2S/w-XOps33y-Lh.png",
      subtitle: "на заказ"
    },
    {
      title: "Кухня",
      image: "https://i.postimg.cc/DyXGPN0K/bfl8-HSy-URY.png",
      subtitle: "на заказ"
    },
    {
      title: "Детская",
      image: "https://i.postimg.cc/SQXDYk0S/c-COii-RTOMr.png",
      subtitle: "на заказ"
    },
    {
      title: "Спальня",
      image: "https://i.postimg.cc/FRZBHxwY/hbi6-LHogp-Q.png", 
      subtitle: "на заказ"
    },
    {
      title: "Гардероб",
      image: "https://i.postimg.cc/CMf9Tjxs/k3u1-F9-Odg0.png",
      subtitle: "на заказ"
    },
    {
      title: "Шкафы",
      image: "https://i.postimg.cc/W457YmfV/1b-F5-JIOCs-V-1.png",
      subtitle: "на заказ"
    },
    {
      title: "Ванна", 
      image: "https://i.postimg.cc/G3kT55GP/0-T2p-Iwn3-Cf.png",
      subtitle: "на заказ"
    },
    {
      title: "Мягкая мебель",
      image: "https://i.postimg.cc/fyPz8PYd/AErw-XCs-HOn.png", 
      subtitle: "на заказ"
    },
    {
      title: "Отели",
      image: "https://i.postimg.cc/x8BWBV8K/4-KM0-OH6-Myn.png", 
      subtitle: "на заказ"
    },
    {
      title: "Перегородки из мебели", 
      image: "https://i.postimg.cc/wB8HrJZ1/3-DZ5-Nk948-L.png",
      subtitle: "на заказ" 
    },
    {
      title: "Комплексная меблировка",
      image: "https://i.postimg.cc/V6tKV0yk/aeog-UZSa-Uz.png",
      subtitle: "на заказ"
    },
  ]);

  // Update the query to include ordering
  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ['catalog'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Catalog')
        .select('*')
        .order('id', { ascending: true });
      
      if (error) {
        console.error('Ошибка при загрузке каталога:', error);
        throw error;
      }
      
      return data || [];
    },
  });

  return (
    <section id="catalog" className="catalog-section py-16 bg-npm-light/30">
      <div className="container-custom">
        <h1 className="section-title mb-10 text-left">Каталог</h1>
        {isLoadingCategories ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <p className="text-lg">Загрузка каталога...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                title={category["Название карточки"] || ""}
                image={category["Фото в каталоге"] || ""}
                subtitle="на заказ"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CatalogSection;
