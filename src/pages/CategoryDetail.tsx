
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import ContactFormDialog from "@/components/ContactFormDialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck } from "lucide-react";

const CategoryDetail = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const { data: categoryData, isLoading, error } = useQuery({
    queryKey: ['categoryDetail', category],
    queryFn: async () => {
      if (!category) throw new Error('Категория не указана');
      
      // Use generic query to avoid type issues - we know this table exists
      const { data, error } = await supabase
        .from('Catalog')
        .select('*')
        .ilike('Название карточки', category)
        .single();
      
      if (error) {
        console.error('Ошибка при загрузке данных категории:', error);
        throw error;
      }
      
      return data;
    },
    retry: false,
    // Use onSettled instead of onError in @tanstack/react-query v5
    meta: {
      onError: (err: Error) => {
        console.error('Ошибка запроса:', err);
        toast.error("Не удалось загрузить информацию о категории");
      }
    }
  });

  const goBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-npm-light/30">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container-custom">
            <div className="flex justify-center items-center min-h-[200px]">
              <p className="text-lg">Загрузка данных...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !categoryData) {
    return (
      <div className="min-h-screen bg-npm-light/30">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container-custom">
            <Button variant="ghost" onClick={goBack} className="mb-6">
              <ArrowLeft className="mr-2" size={16} /> Назад к каталогу
            </Button>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h1 className="text-2xl font-medium mb-4">Категория не найдена</h1>
              <p>К сожалению, запрашиваемая категория не существует или была удалена.</p>
              <Button onClick={goBack} className="mt-4">
                Вернуться к каталогу
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const openContactForm = () => {
    setIsContactFormOpen(true);
  };

  const hasCarouselImages = categoryData["Фото для карусели"] && 
    Array.isArray(categoryData["Фото для карусели"]) && 
    categoryData["Фото для карусели"].length > 0;

  return (
    <div className="min-h-screen bg-npm-light/30">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-custom">
          <Button variant="ghost" onClick={goBack} className="mb-6">
            <ArrowLeft className="mr-2" size={16} /> Назад к каталогу
          </Button>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 lg:p-8">
                <h1 className="text-3xl font-medium mb-4">
                  {categoryData["Название карточки"]}
                </h1>
                
                <div className="relative inline-block mb-6">
                  <Badge 
                    variant="outline" 
                    className="bg-npm-beige/40 text-black border border-npm-blue/30 px-2 py-0.5 text-xs font-normal"
                  >
                    <BadgeCheck size={12} className="mr-1" />
                    под заказ
                  </Badge>
                </div>

                <div className="space-y-4 mb-8">
                  <p className="text-gray-700">
                    {categoryData["Наполнение карточки (Блок 1)"]}
                  </p>
                  <p className="text-gray-700">
                    {categoryData["Наполнение карточки (блок 2)"]}
                  </p>
                </div>

                <Button onClick={openContactForm} className="w-full">
                  Заказать дизайн-проект
                </Button>
              </div>

              <div className="lg:p-8 p-6">
                {hasCarouselImages ? (
                  <Carousel className="w-full">
                    <CarouselContent>
                      {categoryData["Фото для карусели"].map((image: string, index: number) => (
                        <CarouselItem key={index}>
                          <div className="h-[400px] overflow-hidden rounded-xl">
                            <img
                              src={image}
                              alt={`${categoryData["Название карточки"]} - изображение ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </Carousel>
                ) : (
                  <div className="h-[400px] overflow-hidden rounded-xl">
                    <img
                      src={categoryData["Фото внутри карточки (блок 3)"] || categoryData["Фото в каталоге"]}
                      alt={categoryData["Название карточки"]}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      
      {/* Fix the props for ContactFormDialog component */}
      <ContactFormDialog 
        trigger={<div />} // Providing empty div as trigger since we manually control open state
        title="Заказать дизайн-проект"
        description="Заполните форму, и наш менеджер свяжется с вами для уточнения деталей"
        showDesignerCheckbox={false}
      />
    </div>
  );
};

export default CategoryDetail;
