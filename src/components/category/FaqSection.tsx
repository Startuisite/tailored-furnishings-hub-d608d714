
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const faqs = [
  {
    question: "Какие размеры мебели мы делаем?",
    answer: "Каждая комната индивидуальна, поэтому мы не ограничиваемся стандартными размерами мебели. Мы делаем любые размеры кроватей и матрасов к ним. Адаптируем мебель под ваш размер комнаты и высоту потолка. Учитываем высоту плинтуса, расположение батарей, розеток и выключателей."
  },
  {
    question: "Какие сроки изготовления?",
    answer: "Срок изготовления зависит от количества и стоимости мебели. В среднем изготовление занимает от 30 до 60 рабочих дней. Точные сроки на данный момент можно уточнить у наших менеджеров. Предварительный этап от проектирования занимает от 7 дней, до согласования проекта. ..."
  },
  {
    question: "Какие материалы и фурнитура используются?",
    answer: "Мы используем эколологические чистые материалы. Это массив дерева, фанера, мдф. В редких случаях мы используем ЛДСП Еггер, но следим за тем что бы все кромки включая задние были заклеены и толщина плит была не менее 18 мм. Устанавливаем качественную фурнитуру мировых производителей. ..."
  },
  {
    question: "Чем покрывается мебель?",
    answer: "Мы используем многослойные профессиональные системы покрытия мебели на полиуретановой основе из итальянских составляющих, и натуральные масла OSMO. В нашей стандартной палитре более 30 цветов и оттенков, которые хорошо сочетаются друг с другом. ..."
  },
  {
    question: "Есть ли у вас доставка в другие города?",
    answer: "ОТПРАВЛЯЕМ МЕБЕЛЬ ПО ВСЕЙ РОССИИ. Мы отправляем мебель в другие города через транспортные компании. Всю мебель мы предварительно собираем, делаем фото отчет, пакуем в дополнительную упаковку и отвозим в транспортную компанию. Стоимость услуги 5% от стоимости мебели. Минимальная стоимость услуги 5000 руб."
  }
];

const FaqSection = () => (
  <div>
    <h2 className="section-title mb-6">Ответы на частые вопросы</h2>
    <Accordion type="single" collapsible className="w-full bg-white rounded-xl shadow-md p-6">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`} className="border-b last:border-b-0">
          <AccordionTrigger className="py-4 hover:no-underline font-medium bg-npm-blue px-4 rounded-md text-white">
            <div className="flex items-center gap-2 text-left w-full">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[rgb(242,237,231)] flex items-center justify-center text-xs font-bold">
                {index + 1}
              </div>
              <span className="flex-grow">{faq.question}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pl-8 bg-[#d1d1d1] rounded-b-md">
            <p className="text-gray-700">{faq.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
);
export default FaqSection;
