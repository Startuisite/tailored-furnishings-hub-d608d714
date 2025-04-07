
import { useQuery } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from "@/integrations/supabase/client";
import TestimonialsSection from '../components/home/TestimonialsSection';
import CategoryCard from '../components/home/CategoryCard';

type CatalogItem = {
  "Название карточки": string;
  "Фото в каталоге": string;
  id: number;
};

const Catalog = () => {
  // Use a more type-safe approach for the query
  const { data: categories = [], isLoading } = useQuery({
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
    <div className="min-h-screen bg-npm-light/30">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-custom">
          <h1 className="section-title mb-10 text-center">Каталог</h1>
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <p className="text-lg">Загрузка каталога...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <CategoryCard
                  key={index}
                  title={category["Название карточки"] || ""}
                  image={category["Фото в каталоге"] || ""}
                  subtitle="под заказ"
                />
              ))}
            </div>
          )}
        </div>
      </main>
      
      {/* Add testimonials section before the footer */}
      <TestimonialsSection />
      
      <Footer />
    </div>
  );
};

export default Catalog;
