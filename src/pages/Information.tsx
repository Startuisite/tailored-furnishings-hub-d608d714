
import { MapPin, Phone, Mail } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import YandexMap from "../components/YandexMap";
import ContactForm from "../components/ContactForm";

const Information = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-npm-blue to-npm-light">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-custom">
          {/* Contact Form and Map/Contacts Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Contact Form */}
            <Card className="border border-border/40 shadow-sm overflow-hidden bg-white flex flex-col h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <h3 className="text-2xl font-medium mb-6">Заполните заявку</h3>
                <div className="flex-grow">
                  <ContactForm customButtonClass="mt-auto" showDesignerCheckbox={true} />
                </div>
              </CardContent>
            </Card>
            
            {/* Map and Contacts combined in one card */}
            <Card className="border border-border/40 shadow-sm overflow-hidden bg-white flex flex-col h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <h3 className="text-2xl font-medium mb-6">Наши контакты</h3>
                
                {/* Map */}
                <div className="h-[250px] mb-6 rounded-lg overflow-hidden">
                  <YandexMap />
                </div>
                
                {/* Contacts */}
                <div className="space-y-4 flex-grow">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 flex-shrink-0 mt-1 text-npm-blue" />
                    <div>
                      <p className="font-medium">Адрес</p>
                      <p>г. Анапа, ул. Гребенская, д. 92</p>
                      <p className="text-sm text-muted-foreground mt-1">Пн-Пт: 9:00-18:00, Сб: 10:00-16:00</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 flex-shrink-0 mt-1 text-npm-blue" />
                    <div>
                      <p className="font-medium">Телефон</p>
                      <p>+7 918 058-40-61</p>
                      <p className="text-sm text-muted-foreground mt-1">Ежедневно с 9:00 до 20:00</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 flex-shrink-0 mt-1 text-npm-blue" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p>npm.neprostomebel@mail.ru</p>
                      <p className="text-sm text-muted-foreground mt-1">Мы отвечаем в течение 24 часов</p>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-6 flex items-center justify-center gap-2 bg-npm-beige hover:bg-npm-blue text-black" 
                  onClick={() => window.open("https://t.me/NPM_MEBEL", "_blank")}
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
