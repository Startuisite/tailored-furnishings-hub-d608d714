
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '@/integrations/supabase/client';
import TestimonialsSection from '@/components/home/TestimonialsSection';

const CategoryDetail = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch category details
  const { data: categoryData } = useQuery({
    queryKey: ['category', category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Catalog')
        .select('*')
        .ilike('Название карточки', category || '')
        .single();
      
      if (error) {
        console.error('Error fetching category:', error);
        throw error;
      }
      
      return data;
    },
    enabled: !!category,
  });

  // Generate dummy products for this category
  useEffect(() => {
    const generateDummyProducts = () => {
      setLoading(true);
      try {
        // Generate some dummy products for demonstration
        const dummyProducts = Array.from({ length: 6 }, (_, i) => ({
          id: i + 1,
          name: `${category} ${i + 1}`,
          description: `Описание ${category} ${i + 1}`,
          price: Math.floor(Math.random() * 50000) + 10000,
          image: `https://source.unsplash.com/random/300x200?furniture&sig=${i}`
        }));
        setProducts(dummyProducts);
      } catch (err) {
        console.error('Error generating products:', err);
        setError('Не удалось загрузить товары. Пожалуйста, попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      generateDummyProducts();
    }
  }, [category]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  return (
    <div className="min-h-screen bg-npm-light/30">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-custom">
          <h1 className="section-title mb-10 capitalize">
            {categoryData?.["Название карточки"] || category}
          </h1>
          
          {loading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <p className="text-lg">Загрузка товаров...</p>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 p-4">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-npm-blue font-medium">от {formatPrice(product.price)} ₽</span>
                      <button className="bg-npm-blue text-white px-4 py-2 rounded hover:bg-npm-blue/90 transition-colors">
                        Подробнее
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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
