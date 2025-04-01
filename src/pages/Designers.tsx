
import { useState } from "react";
import { Check, Plus, MessageSquare } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";

const Designers = () => {
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

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      agreement: false,
    },
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      // Convert the form data to match our submitContactForm function requirements
      await submitContactForm({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        isDesigner: true, // This is from designers page, so set as designer
        source: 'designers_page'
      });
      
      toast({
        title: "Форма отправлена",
        description: "Мы свяжемся с вами в ближайшее время",
      });
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Ошибка отправки",
        description: "Пожалуйста, попробуйте позже",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(252,247,241)]/30">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-custom">
          {/* Hero Section */}
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
                src="/lovable-uploads/56b0e29d-bfe5-4160-9b67-42170d60054e.png" 
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
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
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
                        control={form.control}
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
                        control={form.control}
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
                        control={form.control}
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
                        control={form.control}
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
      </main>
      <Footer />
    </div>
  );
};

export default Designers;
