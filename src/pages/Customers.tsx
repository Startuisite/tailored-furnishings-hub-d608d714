
import { ClipboardCheck, Truck, ShieldCheck, CheckCircle2, MessageCircle } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Customers = () => {
  // Order steps data
  const orderSteps = [
    {
      number: 1,
      title: "Консультация",
      description: "Обсуждение ваших пожеланий и требований к мебели"
    },
    {
      number: 2,
      title: "Замер",
      description: "Выезд специалиста для точных замеров помещения"
    },
    {
      number: 3,
      title: "Проектирование",
      description: "Создание 3D-макета и согласование всех деталей"
    },
    {
      number: 4,
      title: "Договор",
      description: "Подписание договора и внесение предоплаты"
    },
    {
      number: 5,
      title: "Производство",
      description: "Изготовление мебели на нашем производстве"
    },
    {
      number: 6,
      title: "Доставка и сборка",
      description: "Доставка и профессиональная сборка мебели у вас дома"
    }
  ];

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

          {/* Hero Section with Warranty and Image */}
          <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <div className="bg-[rgb(230,237,243)] p-8 rounded-xl flex flex-col">
              <h1 className="section-title mb-6">Гарантия</h1>
              <p className="text-lg mb-6">
                Полностью берем весь цикл работ на себя и реализуем ваши идеи точно в срок.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-medium">Гарантийное обслуживание на всю продукцию</p>
              </div>
            </div>
            <div className="bg-white shadow-md overflow-hidden flex items-center justify-center h-full">
              <img 
                src="/lovable-uploads/a0cbbe3e-8fcc-4edb-8a5f-976e93fd21e6.png" 
                alt="Изображение мебели" 
                className="w-full h-full object-cover"
              />
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

          {/* Order Schema Section */}
          <section className="mb-16">
            <h2 className="section-title text-center mb-12">Удобная схема заказа</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {orderSteps.map((step, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[rgb(230,237,243)] flex items-center justify-center flex-shrink-0">
                      <span className="font-bold">{step.number}</span>
                    </div>
                    <h3 className="text-xl font-medium">{step.title}</h3>
                  </div>
                  <p className="text-gray-700">{step.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Customers;
