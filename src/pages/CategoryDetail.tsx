
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactFormDialog from '@/components/ContactFormDialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, MessageSquare } from 'lucide-react';

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

  useEffect(() => {
    if (category) {
      const data = getCategoryData(category);
      setCategoryData(data);
      // Set page title
      document.title = `${data.name} мебель на заказ | НПМ`;
    }
  }, [category]);

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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Block 1: Title and Description */}
            <div className="lg:col-span-6 bg-[#F5F5F5] rounded-xl p-8">
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
            <div className="lg:col-span-6 bg-[#F5F5F5] rounded-xl p-8 flex flex-col justify-between">
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
            
            {/* Block 3: Category Image */}
            <div className="lg:col-span-12">
              <Card className="overflow-hidden border-0 shadow-md">
                <div className="relative">
                  <img 
                    src={categoryData.image} 
                    alt={categoryData.name} 
                    className="w-full h-[60vh] object-cover"
                  />
                  
                  {/* Overlay with promotional text */}
                  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-8">
                    <div className="text-center max-w-4xl">
                      <h3 className="text-4xl md:text-6xl font-bold mb-6">СКИДКА НА МЕБЕЛЬ ДО 20%</h3>
                      <p className="text-xl md:text-2xl mb-4">3D визуализация в подарок!</p>
                      <p className="text-lg md:text-xl mb-8">Оставьте заявку и фиксируйте скидку</p>
                      
                      <ContactFormDialog
                        trigger={
                          <Button 
                            size="lg"
                            className="bg-[#82D6E1] hover:bg-[#6BC3CE] text-black font-medium px-8 py-6 h-auto"
                          >
                            Получить каталог
                            <ArrowRight className="ml-2" />
                          </Button>
                        }
                        title="Получить каталог"
                        description="Оставьте свои контактные данные, и мы отправим вам каталог"
                        sourcePageType="default"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryDetail;
