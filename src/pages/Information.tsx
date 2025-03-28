
import { MapPin, Phone, Mail, FileText, Award, Clock, Info, Star, BadgeCheck } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import YandexMap from "../components/YandexMap";
import ContactForm from "../components/ContactForm";

const Information = () => {
  // Information cards data
  const infoCards = [
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: "Гарантия качества",
      description: "Мы предоставляем гарантию на всю нашу мебель в течение 2 лет с момента покупки. Используем только проверенные и качественные материалы."
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "Сроки изготовления",
      description: "Стандартный срок изготовления мебели составляет от 2 до 4 недель. Точные сроки определяются после согласования всех деталей заказа."
    },
    {
      icon: <FileText className="h-10 w-10 text-primary" />,
      title: "Документация",
      description: "Вся наша мебель сертифицирована и соответствует российским и международным стандартам качества и безопасности."
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Анна Петрова",
      position: "Дизайнер интерьера",
      text: "Уже более 5 лет сотрудничаю с НПМ и могу с уверенностью сказать, что это одни из лучших производителей мебели. Высокое качество, точность исполнения и внимание к деталям отличает их от многих других.",
      rating: 5
    },
    {
      name: "Сергей Иванов",
      position: "Клиент",
      text: "Заказывали кухню и гардеробную. Результат превзошел все ожидания! Отличное качество материалов, идеальная сборка и монтаж. Рекомендую всем, кто ценит функциональность и эстетику.",
      rating: 5
    },
    {
      name: "Марина Сидорова",
      position: "Архитектор",
      text: "Компания НПМ - это надежный партнер для реализации сложных и нестандартных решений. Всегда предлагают оптимальные варианты по соотношению цена-качество. Наше сотрудничество всегда приносит отличные результаты.",
      rating: 4
    }
  ];

  // Certificates data
  const certificates = [
    {
      title: "ISO 9001:2015",
      description: "Сертификат системы менеджмента качества"
    },
    {
      title: "ГОСТ Р 56599-2015",
      description: "Соответствие стандартам безопасности мебельной продукции"
    },
    {
      title: "Экологический сертификат",
      description: "Подтверждение экологичности используемых материалов"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e6edf3] to-[#fcf7f1]">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-custom">
          {/* About Us Section */}
          <section className="mb-16 bg-white/80 p-8 rounded-xl shadow-md">
            <h2 className="section-title text-center mb-8">О нас</h2>
            <div className="text-lg max-w-4xl mx-auto text-center">
              <p className="mb-4 text-foreground">
                Компания НПМ ("Не Просто Мебель") – это команда профессионалов с многолетним опытом, 
                создающая качественную и функциональную мебель на заказ.
              </p>
              <p className="mb-4 text-foreground">
                Мы специализируемся на изготовлении индивидуальной мебели для дома и офиса: 
                кухни, гардеробные, шкафы-купе, спальни, детские, гостиные и другие предметы интерьера.
              </p>
              <p className="text-foreground">
                Наша миссия – создавать не просто мебель, а функциональное и эстетичное пространство, 
                идеально соответствующее вашим потребностям и стилю жизни.
              </p>
            </div>
          </section>

          {/* Information Cards */}
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {infoCards.map((card, index) => (
                <Card key={index} className="border border-border/40 shadow-sm overflow-hidden bg-white hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="mb-4 flex justify-center bg-[#fcf7f1] p-3 rounded-full w-16 h-16 mx-auto">
                      {card.icon}
                    </div>
                    <h3 className="text-xl font-medium mb-3 text-center">{card.title}</h3>
                    <p className="text-center text-foreground">{card.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="mb-16 bg-[#fcf7f1] p-8 rounded-xl shadow-md">
            <h2 className="section-title text-center mb-8">Отзывы наших клиентов</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border border-border/40 shadow-sm overflow-hidden bg-white hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex mb-4 justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 ${i < testimonial.rating ? 'text-[#FFD700] fill-[#FFD700]' : 'text-muted-foreground'}`}
                        />
                      ))}
                    </div>
                    <p className="text-foreground italic mb-4 text-center">"{testimonial.text}"</p>
                    <div className="text-center">
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Certificates Section */}
          <section className="mb-16 bg-[#e6edf3] p-8 rounded-xl shadow-md">
            <h2 className="section-title text-center mb-8">Наши сертификаты</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {certificates.map((certificate, index) => (
                <Card key={index} className="border border-border/40 shadow-sm overflow-hidden bg-white hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="mb-4 flex justify-center bg-[#fcf7f1] p-3 rounded-full w-16 h-16 mx-auto">
                      <BadgeCheck className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium mb-3 text-center">{certificate.title}</h3>
                    <p className="text-center text-foreground">{certificate.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Contact Form and Map Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Contact Form */}
            <Card className="border border-border/40 shadow-sm overflow-hidden bg-white">
              <CardContent className="p-6">
                <h3 className="text-2xl font-medium mb-6">Заполните заявку</h3>
                <ContactForm />
              </CardContent>
            </Card>
            
            {/* Map */}
            <Card className="border border-border/40 shadow-sm overflow-hidden bg-white">
              <CardContent className="p-6">
                <h3 className="text-2xl font-medium mb-6">Карта</h3>
                <div className="h-[300px]">
                  <YandexMap />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Contacts Section */}
          <section>
            <Card className="border border-border/40 shadow-sm overflow-hidden bg-white">
              <CardContent className="p-6">
                <h3 className="text-2xl font-medium mb-6">Контакты</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 flex-shrink-0 mt-1 text-primary" />
                    <div>
                      <p className="font-medium">Адрес</p>
                      <p>г. Москва, ул. Примерная, д. 123</p>
                      <p className="text-sm text-muted-foreground mt-1">Пн-Пт: 9:00-18:00, Сб: 10:00-16:00</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 flex-shrink-0 mt-1 text-primary" />
                    <div>
                      <p className="font-medium">Телефон</p>
                      <p>+7 (999) 123-45-67</p>
                      <p className="text-sm text-muted-foreground mt-1">Ежедневно с 9:00 до 20:00</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 flex-shrink-0 mt-1 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p>info@npm-mebel.ru</p>
                      <p className="text-sm text-muted-foreground mt-1">Мы отвечаем в течение 24 часов</p>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-6 flex items-center justify-center gap-2"
                  onClick={() => window.open("https://t.me/npmfurniture", "_blank")}
                >
                  Написать нам
                </Button>
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
