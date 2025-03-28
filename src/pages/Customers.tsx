
import { ClipboardCheck, Truck, ShieldCheck, CheckCircle2, MessageCircle, ChevronRight, ArrowRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Customers = () => {
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

  // Detailed information for each step with updated images
  const stepDetails = {
    1: {
      title: "Знакомство",
      description: "На этом шаге мы изучаем ваши задачи и пожелания, понимаем параметры помещения, количество и возраст детей. Продумываем зонирование, расположение мебели в комнате и предлагаем концепт решения.",
      image: "/lovable-uploads/e0177671-9ff7-4a70-ab7e-f3fef986148a.png"
    },
    2: {
      title: "Предварительный расчет",
      description: "Делаем предварительную оценку стоимости проекта, учитывая выбранные материалы, фурнитуру и особенности конструкции. Обсуждаем возможные варианты оптимизации бюджета.",
      image: "/lovable-uploads/de646832-bfa5-4fd9-8ad2-61ce418ea0ef.png"
    },
    3: {
      title: "Обмерный план",
      description: "Специалист выезжает к вам для проведения точных замеров помещения. Учитываются все нюансы: розетки, вентиляция, радиаторы и другие особенности, которые могут влиять на проект.",
      image: "/lovable-uploads/c1f7eb82-b777-4097-94e4-727fd136286a.png"
    },
    4: {
      title: "Дизайн проект",
      description: "Создаем 3D-визуализацию вашей будущей мебели, согласовываем все детали, цвета, материалы и фурнитуру. Вы получаете полное представление о конечном результате.",
      image: "/lovable-uploads/b1395111-88e3-4e79-9f7c-5de9323a0d02.png"
    },
    5: {
      title: "Изготовление мебели",
      description: "Производим мебель на собственном производстве, используя современное оборудование и качественные материалы. Контролируем каждый этап производства для гарантии качества.",
      image: "/lovable-uploads/f886d12c-466b-43bf-80a0-0fc6b512d5f9.png"
    },
    6: {
      title: "Монтаж под ключ",
      description: "Осуществляем доставку и профессиональную сборку мебели. Проводим финальную проверку качества и убираем за собой мусор. Вы получаете полностью готовый к использованию результат.",
      image: "/lovable-uploads/6be290da-fdcf-4e5b-a684-89489fa8b203.png"
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
    <div className="min-h-screen bg-[rgb(252,247,241)]/30">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-custom">
          {/* Hero Section with Image and CTA */}
          <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-xl overflow-hidden shadow-md">
            <div className="h-full">
              <img 
                src="/lovable-uploads/55faea24-7c9e-4657-8a85-4d7c0e54bf48.png" 
                alt="Комфортный интерьер" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                ПОЛНОСТЬЮ берем весь процесс разработки и реализации проекта на себя
              </h2>
              <Button 
                className="flex items-center gap-2 text-base bg-[rgb(230,237,243)] text-black hover:bg-[rgb(230,237,243)]/80 rounded-lg self-start"
                size="lg"
                onClick={() => window.open("https://t.me/npmfurniture", "_blank")}
              >
                <MessageCircle className="h-5 w-5" />
                Написать нам в телеграмм
              </Button>
            </div>
          </section>

          {/* About Us Section */}
          <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
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
                      <div className="w-12 h-12 rounded-full bg-[rgb(230,237,243)] flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-medium">Расширенная гарантия</h4>
                        <p>Специальные условия обслуживания для бизнеса</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-[rgb(230,237,243)] flex items-center justify-center flex-shrink-0">
                        <Truck className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-medium">Быстрая доставка</h4>
                        <p>Приоритетная доставка для корпоративных заказов</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-[rgb(230,237,243)] flex items-center justify-center flex-shrink-0">
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
                    <div className="w-10 h-10 rounded-full bg-[rgb(230,237,243)] flex items-center justify-center flex-shrink-0">
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
                          className="flex items-center gap-2 bg-[rgb(230,237,243)] text-black hover:bg-[rgb(230,237,243)]/80"
                          onClick={handleNextStep}
                        >
                          Следующий шаг <ArrowRight className="h-4 w-4" />
                        </Button>
                      )}
                      
                      {activeStep === 6 && (
                        <Button 
                          className="flex items-center gap-2 bg-[rgb(230,237,243)] text-black hover:bg-[rgb(230,237,243)]/80"
                          onClick={() => window.open("https://t.me/npmfurniture", "_blank")}
                        >
                          Связаться с нами <MessageCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {/* Step image */}
                  <div className="h-full">
                    <img 
                      src={stepDetails[activeStep as keyof typeof stepDetails]?.image} 
                      alt={`Шаг ${activeStep}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Customers;
