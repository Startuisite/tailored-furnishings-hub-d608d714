
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardCheck, MessageCircle, ShieldCheck, Truck, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import ContactFormDialog from "@/components/ContactFormDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import ContactForm from "@/components/ContactForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const CategoryDetail = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  // Order steps data with updated titles to match step details
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

  // Detailed information for each step with updated external image links
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
  
  // Designer FAQs state
  const faqs = [
    {
      question: "Как начать сотрудничество с вашей компанией?",
      answer: "Для начала сотрудничества отправьте заявку через форму на нашем сайте или свяжитесь с нами по телефону. Наш менеджер свяжется с вами для обсуждения деталей."
    },
    {
      question: "Какие материалы вы используете для производства мебели?",
      answer: "Мы используем различные высококачественные материалы, включая натуральное дерево, МДФ, ДСП премиум-класса, качественную фурнитуру и комплектующие от проверенных производителей."
    },
    {
      question: "Какие сроки изготовления мебели на заказ?",
      answer: "Сроки зависят от сложности проекта и загруженности производства. Обычно от 2 до 6 недель. Точные сроки обсуждаются индивидуально при оформлении заказа."
    },
    {
      question: "Предоставляете ли вы техническую документацию для дизайнеров?",
      answer: "Да, мы предоставляем всю необходимую техническую документацию, включая чертежи, спецификации и инструкции по монтажу."
    },
    {
      question: "Есть ли у вас партнерская программа для дизайнеров?",
      answer: "Да, у нас есть выгодная партнерская программа для дизайнеров. Мы предлагаем специальные условия, комиссионные выплаты и информационную поддержку для наших партнеров."
    }
  ];

  // Handle next step
  const handleNextStep = () => {
    if (activeStep < 6) {
      setActiveStep(prev => prev + 1);
    }
  };

  // Handle previous step
  const handlePrevStep = () => {
    if (activeStep > 1) {
      setActiveStep(prev => prev - 1);
    }
  };

  // Handle step selection
  const handleStepSelect = (step: number) => {
    setActiveStep(step);
  };

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

          {/* Product Details - Original cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
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

          {/* Content from main page - Customers section */}
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-xl overflow-hidden shadow-md">
              <div className="h-full">
                <img 
                  src="https://i.postimg.cc/FKFwCjbV/image.png" 
                  alt="Комфортный интерьер" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  ПОЛНОСТЬЮ берем весь процесс разработки и реализации проекта на себя
                </h2>
              </div>
            </div>
          </section>

          {/* About Us Section */}
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div>
                <h2 className="section-title mb-6">О нас</h2>
                <div className="space-y-4 text-lg">
                  <p>
                    Наша компания специализируется на производстве высококачественной 
                    мебели на заказ для вашего дома и офиса. Мы используем только 
                    проверенные материалы и современные технологии производства.
                  </p>
                  <p>
                    Работая с нами, вы получаете:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-black mt-0.5" />
                      <span>Индивидуальный подход к каждому клиенту</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-black mt-0.5" />
                      <span>Качественную мебель, произведенную с учетом всех ваших пожеланий</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-black mt-0.5" />
                      <span>Профессиональную доставку и сборку</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-black mt-0.5" />
                      <span>Гарантию на всю нашу продукцию</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <Card className="border-0 shadow-md h-full">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-4">Корпоративным клиентам</h3>
                    <p className="text-lg mb-4">
                      Мы предлагаем особые условия для корпоративных клиентов:
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#b3c9dd] flex items-center justify-center flex-shrink-0">
                          <ShieldCheck className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-medium">Расширенная гарантия</h4>
                          <p>Специальные условия обслуживания для бизнеса</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#b3c9dd] flex items-center justify-center flex-shrink-0">
                          <Truck className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-medium">Быстрая доставка</h4>
                          <p>Приоритетная доставка для корпоративных заказов</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#b3c9dd] flex items-center justify-center flex-shrink-0">
                          <ClipboardCheck className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-medium">Специальные условия</h4>
                          <p>Гибкие системы оплаты и индивидуальные предложения</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Interactive Order Schema Section */}
          <section className="mb-16">
            <h2 className="section-title text-center mb-8">Удобная схема заказа</h2>
            <p className="text-lg text-center mb-12 max-w-3xl mx-auto">
              Процесс выстроен так, чтобы вы были услышаны, а мы преобразовали ваши идеи в конечный проект.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left side - Steps list */}
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
                    <div className="w-10 h-10 rounded-full bg-[#b3c9dd] flex items-center justify-center flex-shrink-0">
                      <span className="font-bold">{step.number}</span>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">{step.title}</h3>
                    </div>
                    <ChevronRight className={`h-5 w-5 transition-colors ${
                      activeStep === step.number ? "text-[rgb(0,0,0)]" : "text-[rgb(180,180,180)]"
                    }`} />
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
          
          {/* Quality Statement */}
          <section className="mb-20">
            <h2 className="section-title text-center mb-4">Качество без компромиссов, а так же сервис высокого уровня - это про нас</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <Card className="border-0 shadow-md overflow-hidden h-full flex flex-col">
                <div className="p-6 bg-[rgb(242,237,231)] flex-1 flex flex-col">
                  <h3 className="text-xl font-medium mb-4">Качественные материалы</h3>
                  <p className="text-gray-700 flex-grow">Мы используем только высококачественные материалы от проверенных поставщиков, что гарантирует долговечность и надежность нашей мебели.</p>
                </div>
              </Card>
              <Card className="border-0 shadow-md overflow-hidden h-full flex flex-col">
                <div className="p-6 bg-[rgb(242,237,231)] flex-1 flex flex-col">
                  <h3 className="text-xl font-medium mb-4">Доставка и сборка</h3>
                  <p className="text-gray-700 flex-grow">Мы обеспечиваем доставку и профессиональную сборку мебели, чтобы гарантировать правильную установку и удовлетворение клиента.</p>
                </div>
              </Card>
              <Card className="border-0 shadow-md overflow-hidden h-full flex flex-col">
                <div className="p-6 bg-[rgb(242,237,231)] flex-1 flex flex-col">
                  <h3 className="text-xl font-medium mb-4">Гарантия</h3>
                  <p className="text-gray-700 flex-grow">На всю нашу мебель предоставляется гарантия, подтверждающая уверенность в ее качестве и долговечности.</p>
                </div>
              </Card>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <h2 className="section-title mb-6">Ответы на частые вопросы</h2>
                <Accordion type="single" collapsible className="w-full bg-white rounded-xl shadow-md p-6">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-b last:border-b-0">
                      <AccordionTrigger className="py-4 hover:no-underline font-medium">
                        <div className="flex items-center gap-2 text-left">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[rgb(242,237,231)] flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </div>
                          <span>{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pl-8">
                        <p className="text-gray-700">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
              
              {/* Contact Form */}
              <div>
                <h2 className="section-title mb-6">Свяжитесь с нами</h2>
                <Card className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <ContactForm sourcePageType="customers" />
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
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
