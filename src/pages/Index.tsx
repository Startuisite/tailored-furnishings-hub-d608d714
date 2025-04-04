
import { useState, useEffect } from 'react';
import { ClipboardCheck, Truck, ShieldCheck, CheckCircle2, MessageCircle, ChevronRight, ArrowRight, Check, MessageSquare } from "lucide-react";
import { ArrowRight as ArrowRightIcon, BadgeCheck } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import ContactForm from '@/components/ContactForm';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

type CategoryProps = {
  title: string;
  image: string;
  subtitle: string;
};

const CategoryCard = ({ title, image, subtitle }: CategoryProps) => {
  return (
    <Link to={`/catalog/${title.toLowerCase()}`}>
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
        <CardContent className="flex items-center justify-between p-3 bg-[#fbf6f0]">
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

const Index = () => {
  // Массив изображений для слайдера с внешними ссылками для более быстрой загрузки
  const heroImages = [
    "https://i.postimg.cc/44DsS9HD/0-T2p-Iwn3-Cf.png", // Ванная комната
    "https://i.postimg.cc/MTZvXjmP/bfl8-HSy-URY.png", // Кухня
    "https://i.postimg.cc/sfqgCLq0/hbi6-LHogp-Q.png"  // Спальня/кабинет
  ];

  const [categoriesData] = useState<CategoryProps[]>([
    {
      title: "Прихожая",
      image: "https://i.postimg.cc/sXRBKY6D/2-P5-Z3-R2o0t.png", 
      subtitle: "на заказ"
    },
    {
      title: "Гостиная",
      image: "https://i.postimg.cc/2j1tDn2S/w-XOps33y-Lh.png",
      subtitle: "на заказ"
    },
    {
      title: "Кухня",
      image: "https://i.postimg.cc/DyXGPN0K/bfl8-HSy-URY.png",
      subtitle: "на заказ"
    },
    {
      title: "Детская",
      image: "https://i.postimg.cc/SQXDYk0S/c-COii-RTOMr.png",
      subtitle: "на заказ"
    },
    {
      title: "Спальня",
      image: "https://i.postimg.cc/FRZBHxwY/hbi6-LHogp-Q.png", 
      subtitle: "на заказ"
    },
    {
      title: "Гардероб",
      image: "https://i.postimg.cc/CMf9Tjxs/k3u1-F9-Odg0.png",
      subtitle: "на заказ"
    },
    {
      title: "Шкафы",
      image: "https://i.postimg.cc/W457YmfV/1b-F5-JIOCs-V-1.png",
      subtitle: "на заказ"
    },
    {
      title: "Ванна", 
      image: "https://i.postimg.cc/G3kT55GP/0-T2p-Iwn3-Cf.png",
      subtitle: "на заказ"
    },
    {
      title: "Мягкая мебель",
      image: "https://i.postimg.cc/fyPz8PYd/AErw-XCs-HOn.png", 
      subtitle: "на заказ"
    },
    {
      title: "Отели",
      image: "https://i.postimg.cc/x8BWBV8K/4-KM0-OH6-Myn.png", 
      subtitle: "на заказ"
    },
    {
      title: "Перегородки из мебели", 
      image: "https://i.postimg.cc/wB8HrJZ1/3-DZ5-Nk948-L.png",
      subtitle: "на заказ" 
    },
    {
      title: "Комплексная меблировка",
      image: "https://i.postimg.cc/V6tKV0yk/aeog-UZSa-Uz.png",
      subtitle: "на заказ"
    },
  ]);

  // Replace the static categories with data from Supabase
  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ['catalog'],
    queryFn: async () => {
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
  
  // State for the active step in the order schema
  const [activeStep, setActiveStep] = useState(1);

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
  
  // Designer form state and handler
  const designerForm = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      agreement: false,
    },
  });

  const onDesignerSubmit = async (data: any) => {
    try {
      console.log(data);
      
      // Prepare data for Supabase
      const formData = {
        "Имя": data.name,
        "Телефон": data.phone,
        "Email": data.email,
        "Сообщение": data.message,
        "Тип клиента": "Дизайнер", // Fixed value since this is the Designers page
        "Статус": "Новая"
      };
      
      // Insert data into Supabase - исправляем название таблицы на client_requests
      const { error } = await supabase
        .from("client_requests")
        .insert(formData);
      
      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }
      
      toast.success("Ваша заявка успешно отправлена!");
      designerForm.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Ошибка при отправке. Пожалуйста, попробуйте позже.");
    }
  };

  // Designer benefits state
  const [benefits] = useState([
    {
      title: "Качественные материалы",
      description: "Мы используем только высококачественные материалы от проверенных поставщиков, что гарантирует долговечность и надежность нашей мебели.",
      icon: "/lovable-uploads/79705624-800c-45dd-aa32-96cd9357b606.png"
    },
    {
      title: "Доставка и сборка",
      description: "Мы обеспечиваем доставку и профессиональную сборку мебели, чтобы гарантировать правильную установку и удовлетворение клиента.",
      icon: "/lovable-uploads/79705624-800c-45dd-aa32-96cd9357b606.png"
    },
    {
      title: "Гарантия",
      description: "На всю нашу мебель предоставляется гарантия, подтверждающая уверенность в ее качестве и долговечности.",
      icon: "/lovable-uploads/79705624-800c-45dd-aa32-96cd9357b606.png"
    }
  ]);

  // Designer FAQs state
  const [faqs] = useState([
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
  ]);

  return (
    <div className="min-h-screen">
      <Header />
      <Hero images={heroImages} showDesignerCheckbox={true} />
      
      {/* Added slogan above catalog section */}
      <div className="bg-npm-light py-12 text-center">
        <h2 className="text-4xl md:text-6xl font-playfair">
          Твоя мебель – твои правила
        </h2>
      </div>
      
      {/* Catalog section - идентификатор для навигации */}
      <section id="catalog" className="catalog-section py-16 bg-npm-light/30">
        <div className="container-custom">
          <h1 className="section-title mb-10 text-left">Каталог</h1>
          {isLoadingCategories ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <p className="text-lg">Загрузка каталога...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <CategoryCard
                  key={index}
                  title={category["Название карточки"] || ""}
                  image={category["Фото в каталоге"] || ""}
                  subtitle="на заказ"
                />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Content from Customers page - идентификатор для навигации */}
      <div id="customers" className="customers-section">
        {/* Hero Section with Image and CTA - Updated with external image link */}
        <section className="mb-16 container-custom">
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
        <section className="mb-16 container-custom">
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
        <section className="mb-16 container-custom">
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
        
        {/* Contact Form for Customers */}
        <section className="mb-16 container-custom">
          <h2 className="section-title text-center mb-8">Свяжитесь с нами</h2>
          <div className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6">
            <ContactForm sourcePageType="customers" />
          </div>
        </section>
      </div>

      {/* Content from Designers page */}
      <div id="designers" className="designers-section bg-[rgb(252,247,241)]/30 py-16">
        <div className="container-custom">
          {/* Hero Section for Designers */}
          <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
            <div className="bg-[rgb(230,237,243)] p-8 rounded-xl flex flex-col justify-between">
              <div>
                <h1 className="section-title mb-6">Вы дизайнер</h1>
                <p className="text-lg">
                  Приглашаем к сотрудничеству дизайнеров интерьеров. Мы предлагаем выгодные условия 
                  партнерства, профессиональную поддержку и качественное исполнение ваших проектов.
                </p>
              </div>
              <div className="mt-8">
                <p className="font-medium mb-2">У вас есть?</p>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-5 h-5 rounded bg-[rgb(242,237,231)] flex items-center justify-center">
                    <Check size={16} />
                  </div>
                  <p>Клиенты, которым нужна мебель на заказ</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded bg-[rgb(242,237,231)] flex items-center justify-center">
                    <Check size={16} />
                  </div>
                  <p>Проекты, требующие качественной реализации</p>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-md overflow-hidden flex items-center justify-center h-full">
              <img 
                src="https://i.postimg.cc/DZMXMJ0M/image.png" 
                alt="Дизайнер за работой" 
                className="w-full h-full object-cover"
              />
            </div>
          </section>

          {/* Quality Statement */}
          <section className="mb-20">
            <h2 className="section-title text-center mb-4">Качество без компромиссов, а так же сервис высокого уровня - это про нас</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-0 shadow-md overflow-hidden h-full flex flex-col">
                  <div className="p-6 bg-[rgb(242,237,231)] flex-1 flex flex-col">
                    <h3 className="text-xl font-medium mb-4">{benefit.title}</h3>
                    <p className="text-gray-700 flex-grow">{benefit.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-10">
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
            <div>
              <h2 className="section-title mb-6">Обратная связь</h2>
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <Form {...designerForm}>
                    <form onSubmit={designerForm.handleSubmit(onDesignerSubmit)} className="space-y-4">
                      <FormField
                        control={designerForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Имя</FormLabel>
                            <FormControl>
                              <Input placeholder="Введите ваше имя" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={designerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Введите ваш email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={designerForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Телефон</FormLabel>
                            <FormControl>
                              <Input placeholder="Введите ваш телефон" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={designerForm.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Сообщение</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Опишите ваш запрос" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={designerForm.control}
                        name="agreement"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox 
                                checked={field.value} 
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                Я согласен на обработку персональных данных
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full bg-black text-white hover:bg-black/80">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Отправить
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
