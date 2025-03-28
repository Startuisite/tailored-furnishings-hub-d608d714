
import { MapPin, Phone, Mail, FileText, Award, Clock, Info } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Information = () => {
  // Information cards data
  const infoCards = [
    {
      icon: <Award className="h-10 w-10 text-black" />,
      title: "Гарантия качества",
      description: "Мы предоставляем гарантию на всю нашу мебель в течение 2 лет с момента покупки. Используем только проверенные и качественные материалы."
    },
    {
      icon: <Clock className="h-10 w-10 text-black" />,
      title: "Сроки изготовления",
      description: "Стандартный срок изготовления мебели составляет от 2 до 4 недель. Точные сроки определяются после согласования всех деталей заказа."
    },
    {
      icon: <FileText className="h-10 w-10 text-black" />,
      title: "Документация",
      description: "Вся наша мебель сертифицирована и соответствует российским и международным стандартам качества и безопасности."
    }
  ];

  // Menu links for quick navigation
  const menuLinks = [
    { title: "Главная страница", link: "/" },
    { title: "Каталог продукции", link: "/catalog" },
    { title: "Для дизайнеров", link: "/designers" },
    { title: "Для покупателей", link: "/customers" },
    { title: "Политика конфиденциальности", link: "#privacy" },
    { title: "Публичная оферта", link: "#offer" }
  ];

  return (
    <div className="min-h-screen bg-[rgb(252,247,241)]/30">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-custom">
          {/* About Us Section */}
          <section className="mb-16">
            <h2 className="section-title text-center mb-8">О нас</h2>
            <div className="text-lg max-w-4xl mx-auto text-center">
              <p className="mb-4">
                Компания НПМ ("Не Просто Мебель") – это команда профессионалов с многолетним опытом, 
                создающая качественную и функциональную мебель на заказ.
              </p>
              <p className="mb-4">
                Мы специализируемся на изготовлении индивидуальной мебели для дома и офиса: 
                кухни, гардеробные, шкафы-купе, спальни, детские, гостиные и другие предметы интерьера.
              </p>
              <p>
                Наша миссия – создавать не просто мебель, а функциональное и эстетичное пространство, 
                идеально соответствующее вашим потребностям и стилю жизни.
              </p>
            </div>
          </section>

          {/* Information Cards */}
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {infoCards.map((card, index) => (
                <Card key={index} className="border-0 shadow-md overflow-hidden bg-white">
                  <CardContent className="p-6">
                    <div className="mb-4 flex justify-center">
                      {card.icon}
                    </div>
                    <h3 className="text-xl font-medium mb-3 text-center">{card.title}</h3>
                    <p className="text-center">{card.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Contacts and Menu Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contacts */}
            <Card className="border-0 shadow-md overflow-hidden bg-white">
              <CardContent className="p-6">
                <h3 className="text-2xl font-medium mb-6">Контакты</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">Адрес</p>
                      <p>г. Москва, ул. Примерная, д. 123</p>
                      <p className="text-sm text-gray-500 mt-1">Пн-Пт: 9:00-18:00, Сб: 10:00-16:00</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">Телефон</p>
                      <p>+7 (999) 123-45-67</p>
                      <p className="text-sm text-gray-500 mt-1">Ежедневно с 9:00 до 20:00</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p>info@npm-mebel.ru</p>
                      <p className="text-sm text-gray-500 mt-1">Мы отвечаем в течение 24 часов</p>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-6 flex items-center justify-center gap-2 bg-[rgb(230,237,243)] text-black hover:bg-[rgb(230,237,243)]/80"
                  onClick={() => window.open("https://t.me/npmfurniture", "_blank")}
                >
                  Написать нам
                </Button>
              </CardContent>
            </Card>
            
            {/* Quick Menu */}
            <Card className="border-0 shadow-md overflow-hidden bg-white">
              <CardContent className="p-6">
                <h3 className="text-2xl font-medium mb-6">Меню</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {menuLinks.map((link, index) => (
                    <a 
                      key={index} 
                      href={link.link} 
                      className="flex items-center gap-2 hover:text-gray-600 transition-colors"
                    >
                      <Info className="h-4 w-4" />
                      <span>{link.title}</span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Information;
