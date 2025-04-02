
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactFormDialog from '@/components/ContactFormDialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

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
            
            {/* Customers section */}
            <div className="mb-16">
              <h2 className="text-3xl font-playfair mb-8">Покупателям</h2>
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
              <h2 className="text-3xl font-playfair mb-8">Дизайнерам</h2>
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryDetail;
