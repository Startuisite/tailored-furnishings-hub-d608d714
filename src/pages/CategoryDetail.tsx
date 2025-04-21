
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import ContactFormDialog from "@/components/ContactFormDialog";
import AboutUsSection from "@/components/category/AboutUsSection";
import OrderStepsSection from "@/components/category/OrderStepsSection";
import BenefitsSection from "@/components/category/BenefitsSection";
import FaqSection from "@/components/category/FaqSection";
import CategoryImageCarousel from "@/components/category/CategoryImageCarousel";
import ContactFormCard from "@/components/category/ContactFormCard";
import { Button } from "@/components/ui/button";
import TestimonialsSection from "@/components/home/TestimonialsSection";

const CategoryDetail = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const { data: categoryData, isLoading, error } = useQuery({
    queryKey: ['categoryDetail', category],
    queryFn: async () => {
      if (!category) throw new Error('Категория не указана');
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
    meta: {
      onError: (err: Error) => {
        toast.error("Не удалось загрузить информацию о категории");
      }
    }
  });

  const goBack = () => navigate(-1);
  const openContactForm = () => setIsContactFormOpen(true);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-npm-light/30">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container-custom flex justify-center items-center min-h-[200px]">
            <p className="text-lg">Загрузка данных...</p>
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
              Назад к каталогу
            </Button>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h1 className="text-2xl font-medium mb-4">Категория не найдена</h1>
              <p>К сожалению, запрашиваемая категория не существует или была удалена.</p>
              <Button onClick={goBack} className="mt-4">Вернуться к каталогу</Button>
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
            Назад к каталогу
          </Button>

          {/* Верхние карточки и карусель изображений */}
          <CategoryImageCarousel 
            categoryData={categoryData}
            openContactForm={openContactForm}
          />

          {/* О нас */}
          <AboutUsSection />

          {/* Секция схемы заказа */}
          <OrderStepsSection />

          {/* Качество и преимущества */}
          <BenefitsSection />

          {/* FAQ + contact form */}
          <section className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <FaqSection />
              <ContactFormCard />
            </div>
          </section>

          {/* Отзывы */}
          <section className="mb-20">
            <TestimonialsSection />
          </section>
        </div>
      </main>
      <Footer />

      {/* Диалог заказа */}
      <ContactFormDialog 
        trigger={<div />}
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
