
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import ContactForm from '@/components/ContactForm';

const FAQSection = () => {
  const faqItems = [
    {
      question: "Какие материалы вы используете для изготовления мебели?",
      answer: "Мы используем только высококачественные материалы от проверенных поставщиков. В нашем ассортименте экологичные ДСП и МДФ, натуральный шпон, массив дерева, высококачественная фурнитура от ведущих производителей и различные виды стекла и зеркал."
    },
    {
      question: "Как долго изготавливается мебель на заказ?",
      answer: "Срок изготовления мебели зависит от сложности проекта, объема работ и загруженности производства. В среднем, от момента подписания договора до установки мебели проходит 4-6 недель. Точные сроки изготовления мы обговариваем индивидуально и фиксируем в договоре."
    },
    {
      question: "Предоставляете ли вы гарантию на мебель?",
      answer: "Да, мы предоставляем гарантию на всю нашу продукцию. Стандартный гарантийный срок составляет 12 месяцев с момента установки мебели. Гарантия распространяется на качество материалов, сборки и фурнитуры при условии правильной эксплуатации."
    },
    {
      question: "Можно ли заказать мебель по индивидуальным размерам?",
      answer: "Да, изготовление мебели по индивидуальным размерам — это наша специализация. Мы учитываем особенности вашего помещения, ваши пожелания и потребности, чтобы создать идеально подходящую мебель."
    },
    {
      question: "Как происходит оплата заказа?",
      answer: "Оплата заказа происходит в два этапа: предоплата (как правило, 50% от стоимости) при подписании договора и окончательный расчет после установки мебели. Возможны другие варианты оплаты, которые обсуждаются индивидуально."
    }
  ];

  return (
    <section id="faq" className="py-16 mb-16 bg-[#fbf6f0]">
      <div className="container-custom">
        <h2 className="section-title text-center mb-12">Часто задаваемые вопросы</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* FAQ Accordion */}
          <div>
            <Accordion type="single" collapsible className="bg-white p-6 rounded-lg shadow-md">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200 last:border-0">
                  <AccordionTrigger className="text-left font-medium py-4">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          {/* Contact Form */}
          <div>
            <Card className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-4">Не нашли ответа? Задайте свой вопрос</h3>
              <p className="text-gray-700 mb-6">
                Оставьте ваш вопрос, и наш специалист свяжется с вами в ближайшее время.
              </p>
              <ContactForm sourcePageType="faq" />
              
              <div className="mt-6 flex justify-center">
                <Button 
                  className="flex items-center gap-2 bg-[#b3c9dd] text-black hover:bg-[#b3c9dd]/80"
                  onClick={() => window.open("https://wa.me/message/CHYQHBO6KIQMP1", "_blank")}
                >
                  Напишите нам в WhatsApp <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
