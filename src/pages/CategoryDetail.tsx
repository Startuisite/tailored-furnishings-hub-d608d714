import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ChevronRight, MessageCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Testimonials from "@/components/Testimonials";

const CategoryDetail = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<any[]>([]);
  const [activeStep, setActiveStep] = useState(1);

  const { data: categoryData, isLoading, isError } = useQuery({
    queryKey: ['categoryData', category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Catalog')
        .select('*')
        .eq('Название карточки', category);

      if (error) {
        console.error('Ошибка при загрузке данных категории:', error);
        throw error;
      }

      return data ? data[0] : null;
    },
  });

  useEffect(() => {
    const fetchProducts = async () => {
      if (category) {
        const { data: productsData, error } = await supabase
          .from('Products')
          .select('*')
          .eq('Категория', category);

        if (error) {
          console.error('Ошибка при загрузке товаров:', error);
        } else {
          setProducts(productsData || []);
        }
      }
    };

    fetchProducts();
  }, [category]);

  if (isLoading) {
    return <p>Loading category details...</p>;
  }

  if (isError || !categoryData) {
    return <p>Error loading category details or category not found.</p>;
  }

  const orderSteps = [
    {
      number: 1,
      title: "Знакомство",
      description: "Обсуждение ваших пожеланий и требований к мебели"
    },
    {
      number: 2,
      title: "Предварительный расчет",
      description: "Выезд специалиста для точных замеров помещения"
    },
    {
      number: 3,
      title: "Обмерный план",
      description: "Создание 3D-макета и согласование всех деталей"
    },
    {
      number: 4,
      title: "Дизайн проект",
      description: "Подписание договора и внесение предоплаты"
    },
    {
      number: 5,
      title: "Изготовление мебели",
      description: "Изготовление мебели на нашем производстве"
    },
    {
      number: 6,
      title: "Монтаж под ключ",
      description: "Доставка и профессиональная сборка мебели у вас дома"
    }
  ];

  const stepDetails = {
    1: {
      title: "Знакомство",
      description: "На этом шаге мы изучаем ваши задачи и пожелания, понимаем параметры помещения, количество и возраст детей. Продумываем зонирование, расположение мебели в комнате и предлагаем концепт решения.",
      image: "https://i.postimg.cc/PxXf4pJg/image.png"
    },
    2: {
      title: "Предварительный расчет",
      description: "Делаем предварительную оценку стоимости проекта, учитывая выбранные материалы, фурнитуру и особенности конструкции. Обсуждаем возможные варианты оптимизации бюджета.",
      image: "https://i.postimg.cc/7LxMg91w/image.png"
    },
    3: {
      title: "Обмерный план",
      description: "Специалист выезжает к вам для проведения точных замеров помещения. Учитываются все нюансы: розетки, вентиляция, радиаторы и другие особенности, которые могут влиять на проект.",
      image: "https://i.postimg.cc/cLdXmdZp/image.png"
    },
    4: {
      title: "Дизайн проект",
      description: "Создаем 3D-визуализацию вашей будущей мебели, согласовываем все детали, цвета, материалы и фурнитуру. Вы получаете полное представление о конечном результате.",
      image: "/lovable-uploads/b1395111-88e3-4e79-9f7c-5de9323a0d02.png"
    },
    5: {
      title: "Изготовление мебели",
      description: "Производим мебель на собственном производстве, используя современное оборудование и качественные материалы. Контролируем каждый этап производства для гарантии качества.",
      image: "https://i.postimg.cc/CMNZ80PB/image.png"
    },
    6: {
      title: "Монтаж под ключ",
      description: "Осуществляем доставку и профессиональная сборка мебели. Проводим финальную проверку качества и убираем за собой мусор. Вы получаете полностью готовый к использованию результат.",
      image: "https://i.postimg.cc/4d4GkDzq/image.png"
    },
  };

  const handleNextStep = () => {
    if (activeStep < 6) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 1) {
      setActiveStep(prev => prev - 1);
    }
  };

  const handleStepSelect = (step: number) => {
    setActiveStep(step);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="bg-npm-light/30 py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-playfair mb-6">
            {categoryData["Название карточки"]}
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            {categoryData["Описание"]}
          </p>
          
          <Carousel className="w-full">
            <CarouselContent>
              {products.map((product, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 px-2">
                  <AspectRatio ratio={16 / 9}>
                    <img
                      src={product["Фото"]}
                      alt={product["Название"]}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </AspectRatio>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      </section>
      
      <section className="py-12">
        <div className="container-custom">
          <h2 className="section-title mb-8">Подробнее о категории</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg text-gray-700 mb-6">
                {categoryData["Детальное описание"]}
              </p>
              <ul className="list-disc list-inside text-gray-700">
                {/* Map over the details from categoryData */}
                {categoryData["Преимущества"]?.map((advantage: string, index: number) => (
                  <li key={index} className="mb-2">{advantage}</li>
                ))}
              </ul>
            </div>
            <div>
              <img
                src={categoryData["Фото детальное"]}
                alt={categoryData["Название карточки"]}
                className="w-full rounded-md shadow-md"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section id="order-schema" className="mb-16 container-custom">
          <h2 className="section-title text-center mb-8">Удобная схема заказа</h2>
          <p className="text-lg text-center mb-12 max-w-3xl mx-auto">
            Процесс выстроен так, чтобы вы были услышаны, а мы преобразовали ваши идеи в конечный проект.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left side - Steps list with updated styling */}
            <div className="flex flex-col space-y-3">
              {orderSteps.map((step) => (
                <div 
                  key={step.number}
                  onClick={() => handleStepSelect(step.number)}
                  className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all ${
                    activeStep === step.number 
                      ? "bg-white shadow-md" 
                      : "bg-[rgb(245,245,245)] hover:bg-[rgb(240,240,240)]"
                  }`}
                >
                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">
                    {step.number}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{step.title}</h3>
                  </div>
                  <div className={`w-7 h-7 rounded-full ${activeStep === step.number ? "bg-[#b3c9dd]" : "bg-gray-200"} flex items-center justify-center`}>
                    <ChevronRight className={`h-5 w-5 transition-colors text-white`} />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Right side - Step details */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Step detail information */}
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-medium mb-4">
                      {activeStep}. {stepDetails[activeStep as keyof typeof stepDetails]?.title}
                    </h3>
                    <p className="text-gray-700 mb-8">
                      {stepDetails[activeStep as keyof typeof stepDetails]?.description}
                    </p>
                  </div>
                  
                  <div className="mt-auto flex justify-between items-center">
                    <Button
                      variant="outline"
                      onClick={handlePrevStep}
                      disabled={activeStep === 1}
                      className={activeStep === 1 ? "opacity-50 cursor-not-allowed" : ""}
                    >
                      Предыдущий шаг
                    </Button>
                    
                    {activeStep < 6 && (
                      <Button 
                        className="flex items-center gap-2 bg-[#b3c9dd] text-black hover:bg-[#b3c9dd]/80"
                        onClick={handleNextStep}
                      >
                        Следующий шаг <ArrowRight className="h-4 w-4" />
                      </Button>
                    )}
                    
                    {activeStep === 6 && (
                      <Button 
                        className="flex items-center gap-2 bg-[#b3c9dd] text-black hover:bg-[#b3c9dd]/80"
                        onClick={() => window.open("https://wa.me/message/CHYQHBO6KIQMP1", "_blank")}
                      >
                        Связаться с нами <MessageCircle className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                
                {/* Step image with consistent sizing */}
                <div className="h-full flex items-center justify-center">
                  <div className="w-full h-full">
                    <AspectRatio ratio={4/3} className="h-full">
                      <img 
                        src={stepDetails[activeStep as keyof typeof stepDetails]?.image} 
                        alt={`Шаг ${activeStep}`}
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      
      <section className="py-16 bg-npm-light/30">
        <div className="container-custom">
          <h2 className="section-title text-center mb-8">Свяжитесь с нами</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow-md rounded-xl p-6">
              <ContactForm sourcePageType="category" category={category} />
            </div>
            <div>
              <img
                src="https://i.postimg.cc/6320TYhF/Qnez6ad-RP3.png"
                alt="Связаться с нами"
                className="w-full h-auto object-cover rounded-xl shadow-md"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Add the Testimonials component before the Footer */}
      <Testimonials className="bg-npm-light/30" />
      
      <Footer />
    </div>
  );
};

export default CategoryDetail;
