
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ClipboardCheck, Truck, ShieldCheck, CheckCircle2, MessageCircle, ChevronRight, ArrowRight } from "lucide-react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactFormDialog from '@/components/ContactFormDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ContactForm from '@/components/ContactForm';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const getCategoryData = (categoryName: string) => {
  // This data would ideally come from a database or API
  const categoryDescriptions: Record<string, string> = {
    'прихожая': 'Создаем функциональные и стильные прихожие, которые делают первое впечатление от вашего дома незабываемым. Мы учитываем все особенности помещения и ваши пожелания по хранению и дизайну.',
    'гостиная': 'Проектируем и изготавливаем эргономичную мебель для гостиных, которая становится центром вашего дома. Наши решения сочетают комфорт, стиль и функциональность.',
    'кухня': 'Разрабатываем кухонные гарнитуры, которые делают процесс приготовления пищи удобным и приятным. Используем качественные материалы и фурнитуру для долговечности и функциональности.',
    'детская': 'Мы создаем решения для комфорта, здоровья и развития ваших детей. Наша мебель для детских комнат безопасна, функциональна и способствует гармоничному развитию ребенка.',
    'спальня': 'Создаем уютные и функциональные интерьеры для спален, где каждая деталь продумана для вашего комфортного отдыха и релаксации.',
    'гардероб': 'Проектируем системы хранения, которые помогают организовать пространство и сделать вашу жизнь более упорядоченной. Гардеробные на заказ максимально используют доступное пространство.',
    'шкафы': 'Изготавливаем шкафы на заказ, которые идеально вписываются в интерьер и отвечают всем вашим требованиям к организации хранения.',
    'ванна': 'Создаем мебель для ванных комнат, устойчивую к влаге и долговечную. Наши решения помогают организовать пространство даже в небольших помещениях.',
    'мягкая мебель': 'Производим комфортную мягкую мебель, которая становится центральным элементом интерьера. Используем качественные материалы для долговечности и уюта.',
    'отели': 'Разрабатываем комплексные решения для гостиничного бизнеса, создавая уникальную атмосферу и обеспечивая комфорт гостей.',
    'перегородки из мебели': 'Создаем функциональные перегородки, которые помогают зонировать пространство и при этом служат как мебель для хранения или декоративный элемент.',
    'комплексная меблировка': 'Предлагаем полный цикл создания интерьера от проектирования до реализации. Наши решения учитывают все аспекты функциональности и эстетики.',
  };

  const categoryImages: Record<string, string> = {
    'прихожая': 'https://i.postimg.cc/sXRBKY6D/2-P5-Z3-R2o0t.png',
    'гостиная': 'https://i.postimg.cc/2j1tDn2S/w-XOps33y-Lh.png',
    'кухня': 'https://i.postimg.cc/DyXGPN0K/bfl8-HSy-URY.png',
    'детская': 'https://i.postimg.cc/SQXDYk0S/c-COii-RTOMr.png',
    'спальня': 'https://i.postimg.cc/FRZBHxwY/hbi6-LHogp-Q.png',
    'гардероб': 'https://i.postimg.cc/CMf9Tjxs/k3u1-F9-Odg0.png',
    'шкафы': 'https://i.postimg.cc/W457YmfV/1b-F5-JIOCs-V-1.png',
    'ванна': 'https://i.postimg.cc/G3kT55GP/0-T2p-Iwn3-Cf.png',
    'мягкая мебель': 'https://i.postimg.cc/fyPz8PYd/AErw-XCs-HOn.png',
    'отели': 'https://i.postimg.cc/x8BWBV8K/4-KM0-OH6-Myn.png',
    'перегородки из мебели': 'https://i.postimg.cc/wB8HrJZ1/3-DZ5-Nk948-L.png',
    'комплексная меблировка': 'https://i.postimg.cc/V6tKV0yk/aeog-UZSa-Uz.png',
  };

  return {
    name: categoryName.charAt(0).toUpperCase() + categoryName.slice(1),
    description: categoryDescriptions[categoryName.toLowerCase()] || 'Мебель на заказ по индивидуальным размерам',
    image: categoryImages[categoryName.toLowerCase()] || 'https://i.postimg.cc/DyXGPN0K/bfl8-HSy-URY.png',
    additionalText: 'Мы создаем мебель, которая соответствует вашим потребностям и стилю жизни. Наши проекты разрабатываются с учетом всех особенностей вашего помещения.'
  };
};

const CategoryDetail = () => {
  const { category } = useParams<{ category: string }>();
  const [categoryData, setCategoryData] = useState<ReturnType<typeof getCategoryData> | null>(null);
  const [activeStep, setActiveStep] = useState(1);
  
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

  // Order steps data
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

  // Detailed information for each step
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

  // Benefits data
  const benefits = [
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
  ];

  // FAQ data
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

  useEffect(() => {
    if (category) {
      const data = getCategoryData(category);
      setCategoryData(data);
      // Set page title
      document.title = `${data.name} мебель на заказ | НПМ`;
    }
  }, [category]);

  // Handle step selection
  const handleStepSelect = (step: number) => {
    setActiveStep(step);
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

  const onDesignerSubmit = async (data: any) => {
    try {
      console.log(data);
      
      // Prepare data for Supabase
      const formData = {
        "Имя": data.name,
        "Телефон": data.phone,
        "Email": data.email,
        "Сообщение": data.message,
        "Тип клиента": "Дизайнер",
        "Статус": "Новая"
      };
      
      // Insert data into Supabase
      const { error } = await supabase
        .from("Заявки")
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

  if (!categoryData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-custom">
          {/* Main content: Two columns with text blocks on left and image on right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="grid grid-cols-1 gap-6">
                {/* Block 1: Title and Description */}
                <div className="bg-[#F5F5F5] rounded-xl p-8">
                  <h1 className="text-4xl font-playfair mb-6">
                    {categoryData.name} мебель на заказ по индивидуальным размерам
                  </h1>
                  <p className="text-lg mb-6">
                    {categoryData.description}
                  </p>
                  <p className="text-lg">
                    {categoryData.additionalText}
                  </p>
                </div>
                
                {/* Block 2: CTA Question */}
                <div className="bg-[#F5F5F5] rounded-xl p-8 flex flex-col justify-between">
                  <div className="mb-6">
                    <h2 className="text-3xl font-medium mb-4">
                      Нужна мебель {category && `в ${category.toLowerCase()}`}?
                    </h2>
                  </div>
                  <div>
                    <ContactFormDialog
                      trigger={
                        <Button 
                          size="lg"
                          className="bg-[#82D6E1] hover:bg-[#6BC3CE] text-black font-medium px-8 py-6 h-auto"
                        >
                          Да, нужна
                        </Button>
                      }
                      title={`Заказать мебель ${category && `в ${category.toLowerCase()}`}`}
                      description="Оставьте свои контактные данные, и наш менеджер свяжется с вами в ближайшее время"
                      sourcePageType="default"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Block 3: Category Image - right side */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <Card className="overflow-hidden border-0 shadow-md h-full">
                <div className="h-full">
                  <img 
                    src={categoryData.image} 
                    alt={categoryData.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </Card>
            </div>
          </div>
          
          {/* Information sections */}
          <div className="mt-16">
            <Separator className="mb-12" />
            
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
            
            {/* Customers and Designers sections */}
            <div>
              {/* Customers section */}
              <div className="mb-16">
                <h2 className="section-title mb-8">Покупателям</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="bg-[#F5F5F5] p-6 rounded-xl">
                    <h3 className="text-xl font-medium mb-4">Доставка и оплата</h3>
                    <p>Мы предлагаем гибкие условия оплаты и доставки. Доставка осуществляется по всей России. Возможна оплата частями и беспроцентная рассрочка до 12 месяцев.</p>
                  </div>
                  <div className="bg-[#F5F5F5] p-6 rounded-xl">
                    <h3 className="text-xl font-medium mb-4">Схема заказа</h3>
                    <p>Процесс заказа включает в себя консультацию, замеры, разработку дизайн-проекта, согласование, производство и доставку с установкой мебели.</p>
                  </div>
                  <div className="bg-[#F5F5F5] p-6 rounded-xl">
                    <h3 className="text-xl font-medium mb-4">Гарантия</h3>
                    <p>Мы предоставляем гарантию на всю нашу мебель сроком на 24 месяца. В течение этого времени все обнаруженные дефекты будут устранены бесплатно.</p>
                  </div>
                </div>
              </div>
              
              {/* Designers section */}
              <div>
                <h2 className="section-title mb-8">Дизайнерам</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="bg-[#F5F5F5] p-6 rounded-xl">
                    <h3 className="text-xl font-medium mb-4">Сотрудничество</h3>
                    <p>Мы предлагаем выгодные условия сотрудничества для дизайнеров и архитекторов. Индивидуальный подход к каждому проекту и специальные условия для постоянных партнеров.</p>
                  </div>
                  <div className="bg-[#F5F5F5] p-6 rounded-xl">
                    <h3 className="text-xl font-medium mb-4">Материалы</h3>
                    <p>Мы работаем только с проверенными поставщиками материалов, что позволяет нам гарантировать высокое качество готовой продукции. Большой выбор материалов и фурнитуры.</p>
                  </div>
                  <div className="bg-[#F5F5F5] p-6 rounded-xl">
                    <h3 className="text-xl font-medium mb-4">Портфолио</h3>
                    <p>В нашем портфолио представлены проекты различной сложности и стилистики. Мы готовы реализовать любые дизайнерские идеи и воплотить их в жизнь.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form for Customers */}
            <section className="mt-16">
              <h2 className="section-title text-center mb-8">Свяжитесь с нами</h2>
              <div className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6">
                <ContactForm sourcePageType="customers" />
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryDetail;
