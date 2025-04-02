
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-npm-blue text-black py-12 rounded-t-2xl shadow-lg mt-8">
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
              <li className="text-gray-700">+7 918 058-40-61</li>
              <li className="text-gray-700">npm.neprostomebel@mail.ru</li>
              <li className="text-gray-700">г. Москва, ул. Примерная, д. 123</li>
            </ul>
            
            <div className="mt-6 flex space-x-4">
              <a href="https://vk.com/npmmebel" target="_blank" rel="noopener noreferrer" className="bg-npm-light p-2 rounded-full hover:bg-npm-beige transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M14.83 12.83a2.83 2.83 0 1 0 0-5.66 2.83 2.83 0 0 0 0 5.66Z"></path>
                  <path d="M11.66 12.83H5.83a2.83 2.83 0 0 0 0 5.66h5.83"></path>
                  <path d="M14.83 18.5a2.83 2.83 0 1 0 0-5.66"></path>
                </svg>
              </a>
              <a href="https://t.me/NPM_MEBEL" target="_blank" rel="noopener noreferrer" className="bg-npm-light p-2 rounded-full hover:bg-npm-beige transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="m22 5-11 7L2 5"></path>
                  <path d="M6 9v9a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9"></path>
                </svg>
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
