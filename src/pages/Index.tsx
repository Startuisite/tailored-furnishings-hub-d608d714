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
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import ContactFormDialog from '@/components/ContactFormDialog';
import Testimonials from '@/components/Testimonials';

type CategoryProps = {
  title: string;
  image: string;
  subtitle: string;
};

const CategoryCard = ({ title, image, subtitle }: CategoryProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <Link to={`/catalog/${title}`}>
        <CardContent className="p-0">
          <AspectRatio ratio={16 / 9}>
            <img
              src={image}
              alt={title}
              className="object-cover rounded-md"
            />
          </AspectRatio>
          <div className="p-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

const Index = () => {
  const heroImages = [
    "https://i.postimg.cc/j291Q480/image.png",
    "https://i.postimg.cc/j291Q480/image.png",
    "https://i.postimg.cc/j291Q480/image.png",
  ];

  const categoriesData = [
    {
      "Название карточки": "Кухни",
      "Фото в каталоге": "https://i.postimg.cc/j291Q480/image.png",
    },
    {
      "Название карточки": "Шкафы",
      "Фото в каталоге": "https://i.postimg.cc/j291Q480/image.png",
    },
    {
      "Название карточки": "Гардеробные",
      "Фото в каталоге": "https://i.postimg.cc/j291Q480/image.png",
    },
    {
      "Название карточки": "Тумбы",
      "Фото в каталоге": "https://i.postimg.cc/j291Q480/image.png",
    },
    {
      "Название карточки": "Столы",
      "Фото в каталоге": "https://i.postimg.cc/j291Q480/image.png",
    },
    {
      "Название карточки": "Кровати",
      "Фото в каталоге": "https://i.postimg.cc/j291Q480/image.png",
    },
  ];

  const [activeStep, setActiveStep] = useState(1);

  const orderSteps = [
    { number: 1, title: "Заявка" },
    { number: 2, title: "Замер" },
    { number: 3, title: "Дизайн-проект" },
    { number: 4, title: "Производство" },
    { number: 5, title: "Доставка" },
    { number: 6, title: "Установка" },
  ];

  const stepDetails = {
    1: {
      title: "Оставьте заявку",
      description: "Свяжитесь с нами любым удобным способом: по телефону, через форму на сайте или в социальных сетях. Наш менеджер проконсультирует вас и поможет сформулировать основные требования к проекту.",
      image: "https://i.postimg.cc/j291Q480/image.png",
    },
    2: {
      title: "Бесплатный замер",
      description: "Наш специалист приедет к вам в удобное время для проведения замеров помещения. Точные измерения — основа идеальной мебели, которая гармонично впишется в ваше пространство.",
      image: "https://i.postimg.cc/j291Q480/image.png",
    },
    3: {
      title: "Дизайн-проект",
      description: "На основе ваших пожеланий и размеров помещения наши дизайнеры разработают индивидуальный дизайн-проект мебели. Вы сможете увидеть, как будет выглядеть ваша мебель еще до начала производства.",
      image: "https://i.postimg.cc/j291Q480/image.png",
    },
    4: {
      title: "Производство",
      description: "Мы используем современное оборудование и качественные материалы, чтобы ваша мебель была не только красивой, но и долговечной. Каждый этап производства контролируется нашими специалистами.",
      image: "https://i.postimg.cc/j291Q480/image.png",
    },
    5: {
      title: "Доставка",
      description: "Мы бережно доставим вашу мебель в удобное для вас время. Наша служба доставки гарантирует сохранность мебели при транспортировке.",
      image: "https://i.postimg.cc/j291Q480/image.png",
    },
    6: {
      title: "Профессиональная установка",
      description: "Наши опытные монтажники быстро и качественно установят мебель в вашем доме или офисе. Мы гарантируем, что мебель будет установлена правильно и прослужит вам долгие годы.",
      image: "https://i.postimg.cc/j291Q480/image.png",
    },
  };

  const handleStepSelect = (stepNumber: number) => {
    setActiveStep(stepNumber);
  };

  const handleNextStep = () => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, 6));
  };

  const handlePrevStep = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const designerFormSchema = z.object({
    name: z.string().min(2, {
      message: "Имя должно содержать минимум 2 символа",
    }),
    email: z.string().email({
      message: "Введите корректный email",
    }),
    phone: z.string().min(6, {
      message: "Введите корректный номер телефона",
    }),
    message: z.string().optional(),
    agreement: z.literal(true, {
      errorMap: () => ({ message: "Необходимо согласие на обработку персональных данных" }),
    }),
  });

  type DesignerFormValues = z.infer<typeof designerFormSchema>;

  const designerForm = useForm<DesignerFormValues>({
    resolver: zodResolver(designerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      agreement: true,
    },
  });

  const onDesignerSubmit = async (data: DesignerFormValues) => {
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
      
      // Insert data into Supabase
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

  const benefits = [
    {
      title: "Индивидуальный дизайн",
      description: "Разрабатываем уникальные проекты, учитывая все ваши пожелания и особенности помещения.",
    },
    {
      title: "Качественные материалы",
      description: "Используем только проверенные и экологически чистые материалы от надежных поставщиков.",
    },
    {
      title: "Современное оборудование",
      description: "Применяем передовые технологии и оборудование для производства мебели высокого качества.",
    },
    {
      title: "Профессиональная установка",
      description: "Наши опытные монтажники гарантируют быструю и качественную установку мебели.",
    },
  ];

  const faqs = [
    {
      question: "Какие материалы вы используете для изготовления мебели?",
      answer: "Мы используем широкий спектр материалов, включая массив дерева, МДФ, ЛДСП, шпон, пластик и стекло. Все материалы сертифицированы и соответствуют высоким стандартам качества.",
    },
    {
      question: "Сколько времени занимает изготовление мебели на заказ?",
      answer: "Сроки изготовления зависят от сложности проекта и выбранных материалов. В среднем, процесс занимает от 2 до 6 недель.",
    },
    {
      question: "Предоставляете ли вы гарантию на мебель?",
      answer: "Да, на всю нашу мебель предоставляется гарантия от 12 до 24 месяцев. В случае обнаружения дефектов мы бесплатно устраним их или заменим дефектные элементы.",
    },
    {
      question: "Как происходит процесс оплаты?",
      answer: "Мы работаем по предоплате в размере 70% от стоимости заказа. Оставшиеся 30% оплачиваются после установки мебели.",
    },
    {
      question: "Выезжает ли дизайнер на замер помещения?",
      answer: "Да, выезд дизайнера на замер помещения осуществляется бесплатно. Наш специалист поможет вам определиться с размерами и конфигурацией будущей мебели.",
    },
  ];

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
          {categoriesData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoriesData.map((category, index) => (
                <CategoryCard
                  key={index}
                  title={category["Название карточки"] || ""}
                  image={category["Фото в каталоге"] || ""}
                  subtitle="на заказ"
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center min-h-[200px]">
              <p className="text-lg">Загрузка каталога...</p>
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

        {/* About Us Section - Updated to fix equal heights between text and image */}
        <section className="mb-16 container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col md:h-[450px]">
              <h2 className="section-title mb-6">О нас</h2>
              <div className="space-y-4 text-lg flex-grow">
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
            <div className="md:h-[450px]">
              <img 
                src="https://i.postimg.cc/kXvJrDs0/0-NVcqry-Z2q.png" 
                alt="О нас" 
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </section>

        {/* Interactive Order Schema Section */}
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
        
        {/* Contact Form for Customers - Updated to show the top of the image */}
        <section className="mb-16 container-custom">
          <h2 className="section-title text-center mb-8">Свяжитесь с нами</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow-md rounded-xl p-6">
              <ContactForm sourcePageType="customers" />
            </div>
            <div className="h-auto">
              <div className="w-full h-full max-h-[600px] relative rounded-lg shadow-md">
                <img 
                  src="https://i.postimg.cc/6320TYhF/Qnez6ad-RP3.png" 
                  alt="Связаться с нами" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
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
                  <div className="w-5 h-5 rounded bg-[rgb(242,237,243)] flex items-center justify-center">
                    <Check size={16} />
                  </div>
                  <p>Клиенты, которым нужна мебель на заказ</p>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-5 h-5 rounded bg-[rgb(242,237,243)] flex items-center justify-center">
                    <Check size={16} />
                  </div>
                  <p>Проекты, требующие качественной реализации</p>
                </div>
                
                {/* Add "Да" button with popup form */}
                <ContactFormDialog
                  trigger={
                    <Button
                      className="bg-[#e5dbb7] text-black hover:bg-[#e5dbb7]/80 font-medium"
                    >
                      Да
                    </Button>
                  }
                  title="Заявка дизайнера"
                  description="Оставьте свои контактные данные, и мы свяжемся с вами для обсуждения сотрудничества"
                  showDesignerCheckbox={false}
                  sourcePageType="designers"
                />
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

          {/* Quality Statement - Updated with new styling and image */}
          <section className="mb-20">
            <h2 className="section-title text-center mb-10">Качество без компромиссов, а так же сервис высокого уровня - это про нас</h2>
            
            {/* Main image above text with updated URL */}
            <div className="mb-8">
              <img 
                src="https://i.postimg.cc/HLFPRmf1/rw-WKn-NH7q-X.jpg"
                alt="Качество без компромиссов"
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            </div>
            
            {/* Updated to remove the left image and make the text container full width with new color */}
            <div className="bg-[#b3c9dd] p-8 rounded-lg shadow-md flex flex-col justify-center space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="text-xl font-medium">{benefit.title}</h3>
                  <p className="text-gray-700">{benefit.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Add Testimonials section here before the FAQ */}
          <Testimonials className="mb-20" />

          {/* FAQ Section - Updated styling for numbers and arrow */}
          <section className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="section-title mb-6">Ответы на частые вопросы</h2>
              <Accordion type="single" collapsible className="w-full bg-white rounded-xl shadow-md p-6">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b last:border-b-0">
                    <AccordionTrigger className="py-4 hover:no-underline font-medium">
                      <div className="flex items-center gap-2 text-left w-full">
                        <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </div>
                        <span className="flex-grow">{faq.question}</span>
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
              <h2 className="section-title mb-6">Не нашли ответа? Задайте свой вопрос</h2>
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
                              <Textarea placeholder="Введите ваше сообщение" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={designerForm.control}
                        name="agreement"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                Согласие на обработку персональных данных
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-[#e5dbb7] text-black hover:bg-[#e5dbb7]/80"
                      >
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
