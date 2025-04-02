
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import ContactFormDialog from "@/components/ContactFormDialog";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
    // Use meta instead of onError in @tanstack/react-query v5
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

  const openContactForm = () => {
    setIsContactFormOpen(true);
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

  return (
    <div className="min-h-screen bg-npm-light/30">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-custom">
          <Button variant="ghost" onClick={goBack} className="mb-6">
            <ArrowLeft className="mr-2" size={16} /> Назад к каталогу
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left column - Split into two cards */}
            <div className="space-y-6">
              {/* Block 1 - Top card */}
              <Card className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 lg:p-8">
                  <h1 className="text-3xl font-medium mb-6">
                    {categoryData["Название карточки"]} на заказ по индивидуальным размерам
                  </h1>
                  
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      {categoryData["Наполнение карточки (Блок 1)"]}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Block 2 - Bottom card with CTA */}
              <Card className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 lg:p-8">
                  <h2 className="text-2xl font-medium mb-6">
                    {categoryData["Наполнение карточки (блок 2)"]}
                  </h2>
                  
                  <Button 
                    onClick={openContactForm} 
                    className="bg-[#8DD4DA] hover:bg-[#7BC9CF] text-black px-8 py-6 h-auto text-base"
                  >
                    Да, нужна
                  </Button>
                </div>
              </Card>
            </div>

            {/* Block 3 - Right column with image */}
            <div className="h-full">
              <Card className="bg-white rounded-xl shadow-sm overflow-hidden h-full">
                <div className="h-full">
                  <img
                    src={categoryData["Фото внутри карточки (блок 3)"] || categoryData["Фото в каталоге"]}
                    alt={categoryData["Название карточки"]}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      
      <ContactFormDialog 
        trigger={<div />} // Empty div as trigger since we manually control open state
        title="Заказать дизайн-проект"
        description="Заполните форму, и наш менеджер свяжется с вами для уточнения деталей"
        showDesignerCheckbox={false}
        open={isContactFormOpen}
        onOpenChange={setIsContactFormOpen}
      />
    </div>
  );
};

export default CategoryDetail;
