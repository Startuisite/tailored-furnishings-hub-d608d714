import { useState } from 'react';
import { Check } from 'lucide-react';
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import ContactFormDialog from '@/components/ContactFormDialog';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  email: z.string().email("Введите корректный email").optional(),
  phone: z.string().min(5, "Телефон должен содержать минимум 5 символов"),
  message: z.string().optional(),
  agreement: z.boolean().refine(val => val === true, {
    message: "Вы должны согласиться с политикой конфиденциальности"
  })
});

const DesignerSection = () => {
  // Designer form state and handler
  const designerForm = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      agreement: false,
    },
  });

  const onDesignerSubmit = async (data: z.infer<typeof formSchema>) => {
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

  // Designer benefits state
  const [benefits] = useState([
    {
      title: "Качественные материалы",
      description: "Мы используем только высококачественные материалы от проверенных поставщиков, что гарантирует долговечность и надежность нашей мебели.",
      icon: "/pictures/79705624-800c-45dd-aa32-96cd9357b606.png"
    },
    {
      title: "Доставка и сборка",
      description: "Мы обеспечиваем доставку и профессиональную сборку мебели, чтобы гарантировать правильную установку и удовлетворение клиента.",
      icon: "/pictures/79705624-800c-45dd-aa32-96cd9357b606.png"
    },
    {
      title: "Гарантия",
      description: "На всю нашу мебель предоставляется гарантия, подтверждающая уверенность в ее качестве и долговечности.",
      icon: "/pictures/79705624-800c-45dd-aa32-96cd9357b606.png"
    }
  ]);

  // Designer FAQs state
  const [faqs] = useState([
    {
      question: "Какие размеры мебели мы делаем?",
      answer: "Каждая комната индивидуальна, поэтому мы не ограничиваемся стандартными размерами мебели. Мы делаем любые размеры кроватей и матрасов к ним. Адаптируем мебель под ваш размер комнаты и высоту потолка. Учитываем высоту плинтуса, расположение батарей, розеток и выключателей."
    },
    {
      question: "Какие сроки изготовления?",
      answer: "Срок изготовления зависит от количества и стоимости мебели. В среднем изготовление занимает от 30 до 60 рабочих дней. Точные сроки на данный момент можно уточнить у наших менеджеров. Предварительный этап от проектирования занимает от 7 дней, до согласования проекта. Сложные проекты с нестандартными решениями, подсветкой, подбором цвета всегда требуют больше времени на согласование. Мы рекомендуем закладывать несколько месяцев на все циклы: от дизайн проекта до монтажа мебели."
    },
    {
      question: "Какие материалы и фурнитура используются?",
      answer: "Мы используем эколологические чистые материалы. Это массив дерева, фанера, мдф. В редких случаях мы используем ЛДСП Еггер, но следим за тем что бы все кромки включая задние были заклеены и толщина плит была не менее 18 мм. Устанавливаем качественную фурнитуру мировых производителей. Так же вы можете сделать заказ с фурнитурой премиум класса, BLUM и Hettich. Мы разработали собственную коллекцию зацепок для скаладромов, адаптированную под детские руки."
    },
    {
      question: "Чем покрывается мебель?",
      answer: "Мы используем многослойные профессиональные системы покрытия мебели на полиуретановой основе из итальянских составляющих, и натуральные масла OSMO. В нашей стандартной палитре более 30 цветов и оттенков, которые хорошо сочетаются друг с другом. Так же мы колеруем эмаль в любой цвет по палитре RAL, WCP и NCSS."
    },
    {
      question: "Есть ли у вас доставка в другие города?",
      answer: "ОТПРАВЛЯЕМ МЕБЕЛЬ ПО ВСЕЙ РОССИИ. Мы отправляем мебель в другие города через транспортные компании. Всю мебель мы предварительно собираем, делаем фото отчет, пакуем в дополнительную упаковку и отвозим в транспортную компанию. Стоимость услуги 5% от стоимости мебели. Минимальная стоимость услуги 5000 руб."
    }
  ]);

  return (
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
                          <FormLabel>Email (необязательно)</FormLabel>
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
                            <Textarea placeholder="Ваше сообщение" {...field} />
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
                              Я согласен с политикой конфиденциальности
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full bg-[#b3c9dd] text-black hover:bg-[#b3c9dd]/80">
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
  );
};

export default DesignerSection;
