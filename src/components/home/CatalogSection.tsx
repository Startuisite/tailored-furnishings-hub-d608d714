
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import CategoryCard from './CategoryCard';

type CatalogItem = {
  "Название карточки": string;
  "Фото в каталоге": string;
  id: number;
};

const CatalogSection = () => {
  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ['catalog'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('Catalog')
          .select('*');
        
        if (error) {
          console.error('Ошибка при загрузке каталога:', error);
          throw error;
        }
        
        return data as CatalogItem[] || [];
      } catch (err) {
        console.error('Error fetching catalog data:', err);
        return [] as CatalogItem[];
      }
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
