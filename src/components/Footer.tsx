
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const Footer = () => {
  return (
    <footer className="bg-npm-blue text-black py-12 rounded-t-2xl shadow-lg mt-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl mb-4 font-medium">Каталог</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (window.location.pathname === '/') {
                      // If already on the main page, scroll to catalog section
                      const catalogSection = document.querySelector('.catalog-section');
                      catalogSection?.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      // If on another page, navigate to main page and add #catalog hash
                      window.location.href = '/#catalog';
                    }
                  }}
                  className="text-gray-700 hover:text-black transition-colors"
                >
                  Каталог
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl mb-4 font-medium">Покупателям</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (window.location.pathname === '/') {
                      const orderSchemaSection = document.querySelector('#order-schema');
                      orderSchemaSection?.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.location.href = '/#order-schema';
                    }
                  }}
                  className="text-gray-700 hover:text-black transition-colors"
                >
                  Схема заказа
                </Link>
              </li>
              <li>
                <Link 
                  to="/" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (window.location.pathname === '/') {
                      const warrantySection = document.querySelector('#warranty');
                      warrantySection?.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.location.href = '/#warranty';
                    }
                  }}
                  className="text-gray-700 hover:text-black transition-colors"
                >
                  Гарантия
                </Link>
              </li>
              <li>
                <Link 
                  to="/" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (window.location.pathname === '/') {
                      const faqSection = document.querySelector('#faq');
                      faqSection?.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.location.href = '/#faq';
                    }
                  }}
                  className="text-gray-700 hover:text-black transition-colors"
                >
                  Часто задаваемые вопросы
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl mb-4 font-medium">Дизайнерам</h3>
            <ul className="space-y-2">
              <li><Link to="/#designers" className="text-gray-700 hover:text-black transition-colors">Сотрудничество</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl mb-4 font-medium">Контакты</h3>
            <ul className="space-y-2">
              <li>
                <a href="tel:+79180584061" className="text-gray-700 hover:text-black transition-colors">
                  +7 918 058-40-61
                </a>
              </li>
              <li className="text-gray-700">npm.neprostomebel@mail.ru</li>
            </ul>
            
            <div className="mt-6 flex space-x-4">
              <a href="https://vk.com/npmmebel" target="_blank" rel="noopener noreferrer" className="bg-npm-light p-2 rounded-full hover:bg-npm-beige transition-colors">
                <Avatar className="h-5 w-5">
                  <AvatarImage src="https://mywebicons.ru/i/png/c6ba21b652e197f7a182c9554c2c9796.png" alt="VK" />
                </Avatar>
              </a>
              <a href="https://t.me/NPM_MEBEL" target="_blank" rel="noopener noreferrer" className="bg-npm-light p-2 rounded-full hover:bg-npm-beige transition-colors">
                <Avatar className="h-5 w-5">
                  <AvatarImage src="https://cdn-icons-png.flaticon.com/512/87/87413.png" alt="Telegram" />
                </Avatar>
              </a>
            </div>
            
            {/* Write to Director Button */}
            <div className="mt-6">
              <Button 
                variant="outline" 
                className="w-full bg-npm-light hover:bg-npm-beige text-black border-gray-300 flex items-center justify-center gap-2"
                onClick={() => window.location.href = "mailto:npm.neprostomebel@mail.ru"}
              >
                <Mail className="h-4 w-4" />
                Написать директору
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-300 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-700 text-sm">© 2025 NPM. Все права защищены</p>
          <div className="mt-4 md:mt-0">
            <Link to="/information" className="text-gray-700 hover:text-black text-sm mr-4 transition-colors">Политика конфиденциальности</Link>
            <Link to="/information" className="text-gray-700 hover:text-black text-sm transition-colors">Публичная оферта</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
