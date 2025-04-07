import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import ContactFormDialog from '@/components/ContactFormDialog';

interface CategoryDetailProps {
  id: number;
  created_at: string;
  "Название карточки": string;
  "Фото в каталоге": string;
  "Фото 1": string;
  "Фото 2": string;
  "Фото 3": string;
  "Фото 4": string;
  "Фото 5": string;
  "Фото 6": string;
  "Фото 7": string;
  "Фото 8": string;
  "Фото 9": string;
  "Фото 10": string;
  "Фото 11": string;
  "Фото 12": string;
  "Фото 13": string;
  "Фото 14": string;
  "Фото 15": string;
  "Фото 16": string;
  "Фото 17": string;
  "Фото 18": string;
  "Фото 19": string;
  "Фото 20": string;
  "Описание": string;
}

const CategoryDetail = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const decodedCategory = category ? decodeURIComponent(category) : '';

  // Fetch category data
  const { data: categoryData, isLoading: isLoadingCategory } = useQuery({
    queryKey: ['category', decodedCategory],
    queryFn: async () => {
      // Updated to use the correct table name 'Catalog' instead of 'Products'
      const { data, error } = await supabase
        .from('Catalog')
        .select('*')
        .eq('Название карточки', decodedCategory)
        .single();
      
      if (error) {
        console.error('Error fetching category:', error);
        throw error;
      }
      
      return data;
    },
    enabled: !!decodedCategory,
  });

  const images = categoryData ? [
    categoryData["Фото 1"],
    categoryData["Фото 2"],
    categoryData["Фото 3"],
    categoryData["Фото 4"],
    categoryData["Фото 5"],
    categoryData["Фото 6"],
    categoryData["Фото 7"],
    categoryData["Фото 8"],
    categoryData["Фото 9"],
    categoryData["Фото 10"],
    categoryData["Фото 11"],
    categoryData["Фото 12"],
    categoryData["Фото 13"],
    categoryData["Фото 14"],
    categoryData["Фото 15"],
    categoryData["Фото 16"],
    categoryData["Фото 17"],
    categoryData["Фото 18"],
    categoryData["Фото 19"],
    categoryData["Фото 20"],
  ].filter(Boolean) : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container-custom py-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate('/')}>
                Главная
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate('/catalog')}>
                Каталог
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              {categoryData ? categoryData["Название карточки"] : (isLoadingCategory ? "Загрузка..." : "Категория не найдена")}
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <Separator />

      <div className="container-custom py-12">
        {isLoadingCategory ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <p className="text-lg">Загрузка...</p>
          </div>
        ) : categoryData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h1 className="text-3xl font-semibold mb-4">{categoryData["Название карточки"]}</h1>
              <Carousel className="w-full">
                <CarouselContent>
                  {images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <AspectRatio ratio={16 / 9}>
                          <img
                            src={image}
                            alt={`${categoryData["Название карточки"]} - ${index + 1}`}
                            className="object-cover rounded-md"
                          />
                        </AspectRatio>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
            <div>
              <p className="text-gray-700">{categoryData["Описание"]}</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-[200px]">
            <p className="text-lg">Категория не найдена</p>
          </div>
        )}
      </div>
      
      {/* Contact dialog button */}
      <div className="flex justify-center my-12">
        <ContactFormDialog 
          trigger={
            <Button className="bg-[#e5dbb7] text-black hover:bg-[#e5dbb7]/80">
              Заказать консультацию
            </Button>
          }
          title="Заказать консультацию"
          description="Оставьте свои контактные данные, и наш специалист свяжется с вами"
          showDesignerCheckbox={true}
          sourcePageType="default"
        />
      </div>
      
      <Footer />
    </div>
  );
};

export default CategoryDetail;
