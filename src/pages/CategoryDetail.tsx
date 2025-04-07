
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '@/integrations/supabase/client';
import TestimonialsSection from '../components/home/TestimonialsSection';

// Define TypeScript type for the category data
type CategoryData = {
  "Название карточки"?: string;
  "Фото в каталоге"?: string;
  "Наполнение карточки (Блок 1)"?: string;
  "Наполнение карточки (блок 2)"?: string;
  "Фото внутри карточки (блок 3)"?: string;
  "Фото для карусели"?: string[];
  id: number;
};

const CategoryDetail = () => {
  const { category } = useParams<{ category: string }>();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Fetch category details from Supabase using react-query
  const { data: categoryData, isLoading } = useQuery<CategoryData[]>({
    queryKey: ['category', category],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('Catalog')
          .select('*')
          .ilike('Название карточки', category || '');
        
        if (error) {
          console.error('Error fetching category details:', error);
          throw error;
        }
        
        return data as CategoryData[] || [];
      } catch (err) {
        console.error('Failed to fetch category details:', err);
        return [] as CategoryData[];
      }
    },
  });

  const categoryDetail = categoryData && categoryData.length > 0 ? categoryData[0] : null;
  const carouselImages = categoryDetail?.["Фото для карусели"] || [];

  // Set first image as selected when data loads
  useEffect(() => {
    if (carouselImages.length > 0) {
      setSelectedImageIndex(0);
    }
  }, [carouselImages]);

  return (
    <div className="min-h-screen bg-npm-light/30">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-custom">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <p className="text-lg">Загрузка данных...</p>
            </div>
          ) : categoryDetail ? (
            <div>
              <h1 className="section-title mb-8">{categoryDetail["Название карточки"]}</h1>
              
              {/* Image Carousel */}
              {carouselImages.length > 0 && (
                <div className="mb-8">
                  <div className="relative aspect-video overflow-hidden rounded-lg mb-4">
                    <img 
                      src={carouselImages[selectedImageIndex]} 
                      alt={`${categoryDetail["Название карточки"]} - изображение ${selectedImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Thumbnails */}
                  {carouselImages.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {carouselImages.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`relative w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                            selectedImageIndex === index ? 'border-npm-blue' : 'border-transparent'
                          }`}
                        >
                          <img 
                            src={image} 
                            alt={`Thumbnail ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {/* Category content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {categoryDetail["Наполнение карточки (Блок 1)"] && (
                  <div className="prose max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: categoryDetail["Наполнение карточки (Блок 1)"] }} />
                  </div>
                )}
                
                {categoryDetail["Наполнение карточки (блок 2)"] && (
                  <div className="prose max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: categoryDetail["Наполнение карточки (блок 2)"] }} />
                  </div>
                )}
              </div>
              
              {/* Additional image */}
              {categoryDetail["Фото внутри карточки (блок 3)"] && (
                <div className="mt-8 mb-8">
                  <img 
                    src={categoryDetail["Фото внутри карточки (блок 3)"]} 
                    alt={`${categoryDetail["Название карточки"]} - дополнительное изображение`}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl mb-4">Категория не найдена</h2>
              <p>К сожалению, запрашиваемая категория не существует или была удалена.</p>
            </div>
          )}
        </div>
      </main>
      
      {/* Add testimonials section */}
      <TestimonialsSection />
      
      <Footer />
    </div>
  );
};

export default CategoryDetail;
