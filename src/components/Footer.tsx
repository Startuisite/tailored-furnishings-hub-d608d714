
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[rgb(230,237,243)] text-black py-12 rounded-t-2xl shadow-lg mt-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl mb-4 font-medium">Каталог</h3>
            <ul className="space-y-2">
              <li><Link to="/catalog" className="text-gray-700 hover:text-black transition-colors">Кухня</Link></li>
              <li><Link to="/catalog" className="text-gray-700 hover:text-black transition-colors">Гардероб</Link></li>
              <li><Link to="/catalog" className="text-gray-700 hover:text-black transition-colors">Шкафы</Link></li>
              <li><Link to="/catalog" className="text-gray-700 hover:text-black transition-colors">Спальня</Link></li>
              <li><Link to="/catalog" className="text-gray-700 hover:text-black transition-colors">Гостиная</Link></li>
              <li><Link to="/catalog" className="text-gray-700 hover:text-black transition-colors">Детская</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl mb-4 font-medium">Покупателям</h3>
            <ul className="space-y-2">
              <li><Link to="/customers" className="text-gray-700 hover:text-black transition-colors">Доставка и оплата</Link></li>
              <li><Link to="/customers" className="text-gray-700 hover:text-black transition-colors">Схема заказа</Link></li>
              <li><Link to="/customers" className="text-gray-700 hover:text-black transition-colors">Гарантия</Link></li>
              <li><Link to="/customers" className="text-gray-700 hover:text-black transition-colors">Часто задаваемые вопросы</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl mb-4 font-medium">Дизайнерам</h3>
            <ul className="space-y-2">
              <li><Link to="/designers" className="text-gray-700 hover:text-black transition-colors">Сотрудничество</Link></li>
              <li><Link to="/designers" className="text-gray-700 hover:text-black transition-colors">Материалы</Link></li>
              <li><Link to="/designers" className="text-gray-700 hover:text-black transition-colors">Портфолио</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl mb-4 font-medium">Контакты</h3>
            <ul className="space-y-2">
              <li className="text-gray-700">+7 (999) 123-45-67</li>
              <li className="text-gray-700">info@npm-mebel.ru</li>
              <li className="text-gray-700">г. Москва, ул. Примерная, д. 123</li>
            </ul>
            
            <div className="mt-6 flex space-x-4">
              <a href="#" className="bg-[rgb(252,247,241)] p-2 rounded-full hover:bg-gray-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="bg-[rgb(252,247,241)] p-2 rounded-full hover:bg-gray-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="bg-[rgb(252,247,241)] p-2 rounded-full hover:bg-gray-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
            
            {/* Write to Director Button */}
            <div className="mt-6">
              <Button 
                variant="outline" 
                className="w-full bg-[rgb(252,247,241)] hover:bg-gray-200 text-black border-gray-300 flex items-center justify-center gap-2"
                onClick={() => window.location.href = "mailto:director@npm-mebel.ru"}
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
