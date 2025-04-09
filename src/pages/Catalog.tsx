
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck } from 'lucide-react';

type CategoryProps = {
  title: string;
  image: string;
  subtitle?: string;
};

const CategoryCard = ({ title, image, subtitle = "под заказ" }: CategoryProps) => {
  return (
    <Link 
      to={`/catalog/${title.toLowerCase()}`}
      onClick={() => window.scrollTo(0, 0)}
    >
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

const Catalog = () => {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['catalog'],
    queryFn: async () => {
      // Use generic query to avoid type issues - we know this table exists
      const { data, error } = await supabase
        .from('Catalog')
        .select('*');
      
      if (error) {
        console.error('Ошибка при загрузке каталога:', error);
        throw error;
      }
      
      return data || [];
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
      <Footer />
    </div>
  );
};

export default Catalog;
