
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Универсальная функция для навигации к разделам
  const scrollToSection = (sectionClass: string, e: React.MouseEvent) => {
    e.preventDefault();
    
    // Если мы уже на главной странице
    if (location.pathname === '/') {
      const section = document.querySelector(`.${sectionClass}`);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Если мы не на главной странице, переходим на главную
      // и задаем функцию для выполнения после загрузки страницы
      navigate('/', { state: { scrollTo: sectionClass } });
    }
  };

  return (
    <header 
      className={`navbar ${scrolled ? 'bg-npm-blue/90' : 'bg-transparent'} transition-all duration-300 rounded-b-2xl shadow-lg backdrop-blur-sm`}
    >
      <div className="container-custom py-4 md:py-6 flex items-center justify-between">
        <Link to="/" className="z-10 flex items-center gap-2 text-black">
          <img 
            src="https://i.postimg.cc/vmJS9BL5/1.png" 
            alt="НПМ Логотип" 
            className="h-10 w-auto"
          />
        </Link>
        
        <nav className="hidden md:flex items-center space-x-1">
          <a 
            href="#catalog" 
            onClick={(e) => scrollToSection('catalog-section', e)}
            className={`nav-link relative px-4 py-2 text-black hover:text-black/90 transition-colors ${location.pathname === '/catalog' ? 'after:w-2/3' : ''}`}
          >
            Каталог
          </a>
          <a 
            href="#customers" 
            onClick={(e) => scrollToSection('customers-section', e)}
            className={`nav-link relative px-4 py-2 text-black hover:text-black/90 transition-colors ${location.pathname === '/customers' ? 'after:w-2/3' : ''}`}
          >
            Покупателям
          </a>
          <a 
            href="#designers" 
            onClick={(e) => scrollToSection('designers-section', e)}
            className={`nav-link relative px-4 py-2 text-black hover:text-black/90 transition-colors ${location.pathname === '/designers' ? 'after:w-2/3' : ''}`}
          >
            Дизайнерам
          </a>
          <DropdownMenu>
            <DropdownMenuTrigger className={`nav-link relative px-4 py-2 text-black hover:text-black/90 transition-colors ${location.pathname === '/information' || location.pathname === '/blog' ? 'after:w-2/3' : ''}`}>
              Информация
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border border-npm-blue/20 shadow-md mt-2">
              <DropdownMenuItem asChild>
                <a 
                  href="#about-us" 
                  onClick={(e) => scrollToSection('about-us-section', e)}
                  className="flex px-4 py-2 hover:bg-npm-light cursor-pointer text-black"
                >
                  О нас
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link 
                  to="/blog"
                  className="flex px-4 py-2 hover:bg-npm-light cursor-pointer text-black"
                >
                  Блог
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link 
                  to="/information"
                  className="flex px-4 py-2 hover:bg-npm-light cursor-pointer text-black"
                >
                  Контакты
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        
        <button className="md:hidden text-black">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
