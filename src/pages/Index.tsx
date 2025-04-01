import { useState } from 'react';
import { ClipboardCheck, Truck, ShieldCheck, CheckCircle2, MessageCircle, ChevronRight, ArrowRight } from "lucide-react";
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

const Index = () => {
  // Массив изображений для слайдера с внешними ссылками для более быстрой загрузки
  const heroImages = [
    "https://i.postimg.cc/44DsS9HD/0-T2p-Iwn3-Cf.png", // Ванная комната
    "https://i.postimg.cc/MTZvXjmP/bfl8-HSy-URY.png", // Кухня
    "https://i.postimg.cc/sfqgCLq0/hbi6-LHogp-Q.png"  // Спальня/кабинет
  ];

  const [categories] = useState<CategoryProps[]>([
    {
      title: "Прихожая",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04", 
      subtitle: "под заказ"
    },
    {
      title: "Гостиная",
      image: "/lovable-uploads/b6d95516-3e92-4f36-be7e-ebe9684d3cc9.png",
      subtitle: "под заказ"
    },
    {
      title: "Кухня",
      image: "/lovable-uploads/b6d95516-3e92-4f36-be7e-ebe9684d3cc9.png",
      subtitle: "под заказ"
    },
    {
      title: "Детская",
      image: "/lovable-uploads/5722e33c-6e2b-4d06-aa5c-5404f2aba4bd.png",
      subtitle: "под заказ"
    },
    {
      title: "Спальня",
      image: "/lovable-uploads/5722e33c-6e2b-4d06-aa5c-5404f2aba4bd.png", 
      subtitle: "под заказ"
    },
    {
      title: "Гардероб",
      image: "/lovable-uploads/5722e33c-6e2b-4d06-aa5c-5404f2aba4bd.png",
      subtitle: "под заказ"
    },
    {
      title: "Шкафы",
      image: "/lovable-uploads/99ae9dcd-dc47-4f26-b39c-0590b4e44498.png",
      subtitle: "под заказ"
    },
    {
      title: "Ванна", 
      image: "/lovable-uploads/99ae9dcd-dc47-4f26-b39c-0590b4e44498.png",
      subtitle: "под заказ"
    },
    {
      title: "Мягкая мебель",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04", 
      subtitle: "под заказ"
    },
    {
      title: "Отели",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04", 
      subtitle: "под заказ"
    },
    {
      title: "Перегородки из мебели", 
      image: "/lovable-uploads/da406eaa-f6f8-4df1-8439-cce21af967c0.png",
      subtitle: "под заказ" 
    },
    {
      title: "Комплексная меблировка",
      image: "/lovable-uploads/da406eaa-f6f8-4df1-8439-cce21af967c0.png",
      subtitle: "под заказ"
    },
  ]);

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
      
      {/* Catalog section - добавлен идентификатор для навигации */}
      <section id="catalog" className="catalog-section py-16 bg-npm-light/30">
        <div className="container-custom">
          <h1 className="section-title mb-10 text-center">Каталог</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                title={category.title}
                image={category.image}
                subtitle={category.subtitle}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Content from Customers page - добавлен идентификатор для навигации */}
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
      
      <Footer />
    </div>
  );
};

export default Index;
