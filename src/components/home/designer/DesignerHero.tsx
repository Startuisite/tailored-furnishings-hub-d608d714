
import { Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ContactFormDialog from '@/components/ContactFormDialog';

const DesignerHero = () => {
  return (
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
          
          <ContactFormDialog 
            trigger={
              <Button className="bg-[#e5dbb7] text-black hover:bg-[#e5dbb7]/80 font-medium">
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
          src="https://i.postimg.cc/kXXYKZ5K/image.avif" 
          alt="Дизайнер за работой" 
          className="w-full h-full object-cover rounded-lg" 
        />
      </div>
    </section>
  );
};

export default DesignerHero;
